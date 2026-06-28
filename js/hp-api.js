/* ============================================================
   Healthperia — hp-api.js
   Real backend layer over Supabase (auth + Postgres + realtime).
   Exposes window.HP (all methods async, return {ok,...} objects).
   Requires the supabase-js UMD bundle loaded first:
     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   Error returns carry a `key` that maps to the existing i18n err.* /
   msg.* strings so pages can localize via tErr().
   ============================================================ */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://hrnqllnrobtxcjsspasy.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_fK6FzPD8pWluyPO2e6OuXA_OzxlCXcd'; // public (RLS-protected)

  if (!window.supabase || !window.supabase.createClient) {
    console.error('[HP] supabase-js not loaded'); return;
  }
  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true }
  });

  var HP = window.HP = { sb: sb };
  HP._profile = null;

  /* ---------- helpers ---------- */
  function ok(extra) { return Object.assign({ ok: true }, extra || {}); }
  function fail(key, error) { return { ok: false, key: key, error: error || key }; }

  function mapAuthError(msg) {
    msg = (msg || '').toLowerCase();
    if (msg.indexOf('already registered') !== -1 || msg.indexOf('already been registered') !== -1) return 'err.emailExists';
    if (msg.indexOf('invalid login') !== -1 || msg.indexOf('invalid credentials') !== -1) return 'err.badCreds';
    if (msg.indexOf('password') !== -1 && msg.indexOf('6') !== -1) return 'err.pwLen';
    if (msg.indexOf('email') !== -1 && msg.indexOf('valid') !== -1) return 'err.emailInvalid';
    if (msg.indexOf('not confirmed') !== -1) return 'err.emailNotConfirmed';
    return null;
  }

  function loadProfile(id) {
    return sb.from('profiles').select('*').eq('id', id).single().then(function (r) {
      HP._profile = r.data || null;
      return HP._profile;
    });
  }

  /* ---------- session boot ---------- */
  HP.ready = sb.auth.getSession().then(function (r) {
    var s = r.data && r.data.session;
    if (s && s.user) return loadProfile(s.user.id).then(function () { return HP._profile; });
    HP._profile = null; return null;
  }).catch(function () { HP._profile = null; return null; });

  /* re-load profile on auth changes (login/logout/refresh) */
  sb.auth.onAuthStateChange(function (_evt, session) {
    if (session && session.user) { loadProfile(session.user.id); }
    else { HP._profile = null; }
  });

  HP.currentUser = function () { return HP._profile; };
  HP.dashboardFor = function (role) {
    return role === 'doctor' ? 'dashboard-doctor.html' : role === 'admin' ? 'admin.html' : 'dashboard-patient.html';
  };

  /* ---------- AUTH ---------- */
  HP.register = function (data) {
    var role = data.role === 'doctor' ? 'doctor' : 'patient';
    var email = String(data.email || '').trim().toLowerCase();
    var pw = String(data.password || '');
    var name = String(data.name || '').trim();

    if (name.length < 2) return Promise.resolve(fail('err.nameInvalid'));
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Promise.resolve(fail('err.emailInvalid'));
    if (pw.length < 6) return Promise.resolve(fail('err.pwLen'));
    if (data.confirm !== undefined && pw !== data.confirm) return Promise.resolve(fail('err.pwMismatch'));
    if (role === 'doctor') {
      if (!String(data.specialty || '').trim()) return Promise.resolve(fail('err.specialty'));
      if (!String(data.license || '').trim()) return Promise.resolve(fail('err.license'));
    }

    var meta = {
      role: role, name: name,
      phone: String(data.phone || '').trim(),
      country: String(data.country || '').trim()
    };
    if (role === 'doctor') { meta.specialty = String(data.specialty || '').trim(); meta.license = String(data.license || '').trim(); }

    return sb.auth.signUp({ email: email, password: pw, options: { data: meta } }).then(function (r) {
      if (r.error) return fail(mapAuthError(r.error.message) || 'err.emailExists', r.error.message);
      if (role === 'doctor') {
        /* doctors wait for admin approval — don't keep them signed in */
        return sb.auth.signOut().then(function () { return ok({ pending: true, key: 'msg.docPending' }); });
      }
      /* patient: trigger created an active profile; load it */
      var uid = r.data && r.data.user && r.data.user.id;
      if (!uid) return ok({ pending: false, needsLogin: true });
      return loadProfile(uid).then(function (p) { return ok({ user: p }); });
    });
  };

  HP.login = function (email, password, role) {
    email = String(email || '').trim().toLowerCase();
    return sb.auth.signInWithPassword({ email: email, password: String(password || '') }).then(function (r) {
      if (r.error) return fail(mapAuthError(r.error.message) || 'err.badCreds', r.error.message);
      return loadProfile(r.data.user.id).then(function (p) {
        if (!p) return sb.auth.signOut().then(function () { return fail('err.account'); });
        if (role && p.role !== role) return sb.auth.signOut().then(function () { return { ok: false, key: 'err.wrongTab', data: { role: p.role } }; });
        if (p.status === 'pending')   return sb.auth.signOut().then(function () { return fail('err.pending'); });
        if (p.status === 'suspended') return sb.auth.signOut().then(function () { return fail('err.suspended'); });
        if (p.status === 'deleted')   return sb.auth.signOut().then(function () { return fail('err.deleted'); });
        return ok({ user: p });
      });
    });
  };

  HP.logout = function (redirect) {
    return sb.auth.signOut().then(function () {
      HP._profile = null;
      if (redirect !== false) {
        var prefix = location.pathname.indexOf('/pages/') !== -1 ? '' : 'pages/';
        location.href = prefix + 'auth.html';
      }
    });
  };

  /* route guard — await HP.guard([...]) inside each panel */
  HP.guard = function (roles) {
    if (typeof roles === 'string') roles = [roles];
    return HP.ready.then(function () {
      var p = HP._profile;
      if (!p) { location.replace('auth.html'); return null; }
      if (roles && roles.indexOf(p.role) === -1) { location.replace(HP.dashboardFor(p.role)); return null; }
      return p;
    });
  };

  /* ---------- PROFILE ---------- */
  HP.updateProfile = function (patch) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    var clean = {};
    ['name', 'phone', 'country', 'city', 'specialty', 'license', 'bio'].forEach(function (f) {
      if (patch[f] !== undefined) clean[f] = patch[f];
    });
    return sb.from('profiles').update(clean).eq('id', p.id).select().single().then(function (r) {
      if (r.error) return fail('err.account', r.error.message);
      HP._profile = r.data;
      return ok({ user: r.data });
    });
  };

  HP.changePassword = function (oldPw, newPw) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    if (String(newPw || '').length < 6) return Promise.resolve(fail('err.newPwLen'));
    /* verify the current password by re-authenticating, then update */
    return sb.auth.signInWithPassword({ email: p.email, password: String(oldPw || '') }).then(function (r) {
      if (r.error) return fail('err.currentPw');
      return sb.auth.updateUser({ password: newPw }).then(function (u) {
        if (u.error) return fail('err.newPwLen', u.error.message);
        return ok();
      });
    });
  };

  HP.requestReset = function (email) {
    var redirect = location.origin + location.pathname.replace(/[^/]*$/, '') + 'forgot-password.html';
    return sb.auth.resetPasswordForEmail(String(email || '').trim().toLowerCase(), { redirectTo: redirect })
      .then(function () { return ok(); });
  };

  /* ---------- ADMIN: users ---------- */
  HP.listUsers = function () {
    return sb.from('profiles').select('*').neq('status', 'deleted').order('created_at', { ascending: false })
      .then(function (r) { return r.data || []; });
  };
  HP.setStatus = function (id, status) {
    return sb.from('profiles').update({ status: status }).eq('id', id).then(function (r) { return { ok: !r.error }; });
  };
  HP.approveDoctor = function (id) { return HP.setStatus(id, 'active'); };
  HP.rejectDoctor = function (id) { return HP.setStatus(id, 'suspended'); };
  HP.removeUser = function (id) { return HP.setStatus(id, 'deleted'); };

  /* ---------- DOCTORS list (for patients) ---------- */
  HP.listDoctors = function () {
    return sb.from('profiles').select('*').eq('role', 'doctor').eq('status', 'active').order('name')
      .then(function (r) { return r.data || []; });
  };

  /* ---------- APPOINTMENTS ---------- */
  HP.createAppointment = function (a) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    return sb.from('appointments').insert({
      patient_id: p.id, doctor_id: a.doctorId, treatment: a.treatment || null,
      note: a.note || null, scheduled_at: a.scheduledAt || null
    }).select().single().then(function (r) {
      return r.error ? fail('err.account', r.error.message) : ok({ data: r.data });
    });
  };
  HP.myAppointments = function () {
    var p = HP._profile; if (!p) return Promise.resolve([]);
    var col = p.role === 'doctor' ? 'doctor_id' : 'patient_id';
    return sb.from('appointments')
      .select('*, patient:patient_id(name,email,country,city), doctor:doctor_id(name,specialty)')
      .eq(col, p.id).order('created_at', { ascending: false })
      .then(function (r) { return r.data || []; });
  };
  HP.setAppointmentStatus = function (id, status) {
    return sb.from('appointments').update({ status: status }).eq('id', id).then(function (r) { return { ok: !r.error }; });
  };

  /* ---------- MESSAGES ---------- */
  HP.sendMessage = function (receiverId, body) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    if (!String(body || '').trim()) return Promise.resolve(fail('err.account'));
    return sb.from('messages').insert({ sender_id: p.id, receiver_id: receiverId, body: body.trim() })
      .select().single().then(function (r) { return r.error ? fail('err.account', r.error.message) : ok({ data: r.data }); });
  };
  HP.conversation = function (otherId) {
    var p = HP._profile; if (!p) return Promise.resolve([]);
    return sb.from('messages').select('*')
      .or('and(sender_id.eq.' + p.id + ',receiver_id.eq.' + otherId + '),and(sender_id.eq.' + otherId + ',receiver_id.eq.' + p.id + ')')
      .order('created_at', { ascending: true }).then(function (r) { return r.data || []; });
  };
  HP.inbox = function () {
    var p = HP._profile; if (!p) return Promise.resolve([]);
    return sb.from('messages')
      .select('*, sender:sender_id(name,role), receiver:receiver_id(name,role)')
      .or('sender_id.eq.' + p.id + ',receiver_id.eq.' + p.id)
      .order('created_at', { ascending: false }).then(function (r) { return r.data || []; });
  };
  HP.markRead = function (otherId) {
    var p = HP._profile; if (!p) return Promise.resolve();
    return sb.from('messages').update({ read: true }).eq('receiver_id', p.id).eq('sender_id', otherId);
  };
  HP.subscribeMessages = function (cb) {
    var p = HP._profile; if (!p) return null;
    return sb.channel('msgs-' + p.id)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: 'receiver_id=eq.' + p.id }, cb)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: 'sender_id=eq.' + p.id }, cb)
      .subscribe();
  };

  /* ---------- BLOG ---------- */
  HP.listPosts = function () {
    return sb.from('blog_posts').select('*, author:author_id(name)').order('created_at', { ascending: false })
      .then(function (r) { return r.data || []; });
  };
  HP.createPost = function (post) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    return sb.from('blog_posts').insert({
      author_id: p.id, title: post.title, body: post.body || null,
      section: post.section || 'Blog', status: post.status || 'draft'
    }).select().single().then(function (r) { return r.error ? fail('err.account', r.error.message) : ok({ data: r.data }); });
  };
  HP.updatePost = function (id, patch) {
    return sb.from('blog_posts').update(patch).eq('id', id).then(function (r) { return { ok: !r.error }; });
  };
  HP.deletePost = function (id) {
    return sb.from('blog_posts').delete().eq('id', id).then(function (r) { return { ok: !r.error }; });
  };

  /* convenience labels (kept for parity with old auth.js callers) */
  HP.roleLabel = function (role) { return role === 'doctor' ? 'Doktor' : role === 'admin' ? 'Yönetici' : 'Hasta'; };
  HP.statusLabel = function (s) { return ({ active: 'Aktif', pending: 'Onay Bekliyor', suspended: 'Askıda', deleted: 'Silindi' })[s] || s; };
})();
