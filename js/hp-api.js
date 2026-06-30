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
    ['name', 'phone', 'country', 'city', 'specialty', 'license', 'bio', 'academic'].forEach(function (f) {
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

  /* ---------- UPLOADS (Supabase Storage) ---------- */
  function fileExt(file) {
    var n = (file && file.name) || '';
    var e = n.indexOf('.') !== -1 ? n.split('.').pop() : '';
    return (e || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  }
  /* upload an avatar image → set profiles.avatar_url, return the public URL */
  HP.uploadAvatar = function (file) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    if (!file) return Promise.resolve(fail('err.account'));
    var path = p.id + '/avatar-' + Date.now() + '.' + fileExt(file);
    return sb.storage.from('avatars').upload(path, file, { cacheControl: '3600', upsert: true }).then(function (r) {
      if (r.error) return fail('err.account', r.error.message);
      var url = sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
      return sb.from('profiles').update({ avatar_url: url }).eq('id', p.id).select().single().then(function (u) {
        if (u.error) return fail('err.account', u.error.message);
        HP._profile = u.data;
        return ok({ url: url, user: u.data });
      });
    });
  };
  /* upload a chat attachment (document/photo) → return { url, name } */
  HP.uploadChatFile = function (file) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    if (!file) return Promise.resolve(fail('err.account'));
    var safe = ((file.name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_')).slice(-60);
    var path = p.id + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '-' + safe;
    return sb.storage.from('chat-uploads').upload(path, file, { cacheControl: '3600' }).then(function (r) {
      if (r.error) return fail('err.account', r.error.message);
      var url = sb.storage.from('chat-uploads').getPublicUrl(path).data.publicUrl;
      return ok({ url: url, name: file.name || safe });
    });
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
  /* opts: { attachmentUrl, attachmentType, attachmentName, listingCode, listingLabel } */
  HP.sendMessage = function (receiverId, body, opts) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    opts = opts || {};
    body = String(body == null ? '' : body).trim();
    if (!body && !opts.attachmentUrl) return Promise.resolve(fail('err.account'));
    var row = { sender_id: p.id, receiver_id: receiverId, body: body };
    if (opts.attachmentUrl) {
      row.attachment_url  = opts.attachmentUrl;
      row.attachment_type = opts.attachmentType || 'document';
      row.attachment_name = opts.attachmentName || null;
    }
    if (opts.listingCode) { row.listing_code = opts.listingCode; row.listing_label = opts.listingLabel || null; }
    return sb.from('messages').insert(row).select().single()
      .then(function (r) { return r.error ? fail('err.account', r.error.message) : ok({ data: r.data }); });
  };
  HP.conversation = function (otherId) {
    var p = HP._profile; if (!p) return Promise.resolve([]);
    /* respect a per-user "delete chat": hide messages on/before cleared_at */
    return sb.from('conversation_state').select('cleared_at')
      .eq('user_id', p.id).eq('peer_id', otherId).maybeSingle()
      .then(function (cs) {
        var clearedAt = cs && cs.data && cs.data.cleared_at;
        var q = sb.from('messages').select('*')
          .or('and(sender_id.eq.' + p.id + ',receiver_id.eq.' + otherId + '),and(sender_id.eq.' + otherId + ',receiver_id.eq.' + p.id + ')');
        if (clearedAt) q = q.gt('created_at', clearedAt);
        return q.order('created_at', { ascending: true }).then(function (r) { return r.data || []; });
      });
  };
  HP.inbox = function () {
    var p = HP._profile; if (!p) return Promise.resolve([]);
    return sb.from('messages')
      .select('*, sender:sender_id(name,role,avatar_url), receiver:receiver_id(name,role,avatar_url)')
      .or('sender_id.eq.' + p.id + ',receiver_id.eq.' + p.id)
      .order('created_at', { ascending: false }).then(function (r) { return r.data || []; });
  };
  HP.markRead = function (otherId) {
    var p = HP._profile; if (!p) return Promise.resolve();
    return sb.from('messages').update({ read: true }).eq('receiver_id', p.id).eq('sender_id', otherId);
  };
  /* per-user thread prefs (mute + cleared_at) → { peerId: {muted, cleared_at} } */
  HP.threadStates = function () {
    var p = HP._profile; if (!p) return Promise.resolve({});
    return sb.from('conversation_state').select('peer_id,muted,cleared_at').eq('user_id', p.id)
      .then(function (r) {
        var map = {};
        (r.data || []).forEach(function (s) { map[s.peer_id] = { muted: s.muted, cleared_at: s.cleared_at }; });
        return map;
      });
  };
  HP.muteThread = function (peerId, muted) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    return sb.from('conversation_state')
      .upsert({ user_id: p.id, peer_id: peerId, muted: !!muted, updated_at: new Date().toISOString() }, { onConflict: 'user_id,peer_id' })
      .then(function (r) { return { ok: !r.error }; });
  };
  HP.clearConversation = function (peerId) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    return sb.from('conversation_state')
      .upsert({ user_id: p.id, peer_id: peerId, cleared_at: new Date().toISOString(), updated_at: new Date().toISOString() }, { onConflict: 'user_id,peer_id' })
      .then(function (r) { return { ok: !r.error }; });
  };
  /* emoji reaction (one per user per message; '' clears it) via SECURITY DEFINER RPC */
  HP.reactToMessage = function (messageId, emoji) {
    return sb.rpc('react_to_message', { p_message_id: messageId, p_emoji: emoji || '' })
      .then(function (r) { return { ok: !r.error, error: r.error && r.error.message }; });
  };
  HP.subscribeMessages = function (cb, tag) {
    var p = HP._profile; if (!p) return null;
    return sb.channel('msgs-' + p.id + (tag ? '-' + tag : ''))
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: 'receiver_id=eq.' + p.id }, cb)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: 'sender_id=eq.' + p.id }, cb)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages', filter: 'receiver_id=eq.' + p.id }, cb)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages', filter: 'sender_id=eq.' + p.id }, cb)
      .subscribe();
  };

  /* ---------- REPORTS (a user reports another, e.g. patient → doctor) ---------- */
  HP.reportUser = function (data) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    if (!data || !data.reportedId) return Promise.resolve(fail('err.account'));
    return sb.from('reports').insert({
      reporter_id: p.id, reported_id: data.reportedId,
      reason: data.reason || null, detail: data.detail || null
    }).then(function (r) { return r.error ? fail('err.account', r.error.message) : ok(); });
  };
  HP.listReports = function () {
    return sb.from('reports')
      .select('*, reporter:reporter_id(name,email,role), reported:reported_id(name,email,role,specialty)')
      .order('created_at', { ascending: false }).then(function (r) { return r.data || []; });
  };
  HP.setReportStatus = function (id, status) {
    return sb.from('reports').update({ status: status }).eq('id', id).then(function (r) { return { ok: !r.error }; });
  };

  /* ---------- BLOG ---------- */
  HP.listPosts = function () {
    return sb.from('blog_posts').select('*, author:author_id(name)').order('created_at', { ascending: false })
      .then(function (r) { return r.data || []; });
  };
  /* public reads (no profiles join → works for logged-out visitors under RLS) */
  HP.listPublishedPosts = function () {
    return sb.from('blog_posts').select('id,title,body,section,image_url,created_at').eq('status', 'published')
      .order('created_at', { ascending: false }).then(function (r) { return r.data || []; });
  };
  HP.getPost = function (id) {
    return sb.from('blog_posts').select('id,title,body,section,image_url,created_at,status').eq('id', id).single()
      .then(function (r) { return r.data || null; });
  };
  HP.createPost = function (post) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    return sb.from('blog_posts').insert({
      author_id: p.id, title: post.title, body: post.body || null,
      section: post.section || 'Blog', status: post.status || 'draft',
      image_url: post.image_url || null
    }).select().single().then(function (r) { return r.error ? fail('err.account', r.error.message) : ok({ data: r.data }); });
  };
  HP.updatePost = function (id, patch) {
    return sb.from('blog_posts').update(patch).eq('id', id).then(function (r) { return { ok: !r.error }; });
  };
  HP.deletePost = function (id) {
    return sb.from('blog_posts').delete().eq('id', id).then(function (r) { return { ok: !r.error }; });
  };
  /* upload a blog cover image → return its public URL */
  HP.uploadBlogImage = function (file) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    if (!file) return Promise.resolve(fail('err.account'));
    var safe = ((file.name || 'image').replace(/[^a-zA-Z0-9._-]/g, '_')).slice(-50);
    var path = p.id + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '-' + safe;
    return sb.storage.from('blog-images').upload(path, file, { cacheControl: '3600' }).then(function (r) {
      if (r.error) return fail('err.account', r.error.message);
      return ok({ url: sb.storage.from('blog-images').getPublicUrl(path).data.publicUrl });
    });
  };

  /* ---------- ANNOUNCEMENTS (admin → broadcast, read-only for recipients) ---------- */
  HP.createAnnouncement = function (a) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    if (!String((a && a.body) || '').trim()) return Promise.resolve(fail('err.account'));
    var aud = ['all', 'doctors', 'patients'].indexOf(a.audience) !== -1 ? a.audience : 'all';
    return sb.from('announcements').insert({ author_id: p.id, title: a.title || null, body: a.body.trim(), audience: aud })
      .select().single().then(function (r) { return r.error ? fail('err.account', r.error.message) : ok({ data: r.data }); });
  };
  /* RLS returns only the announcements the caller may see (admin → all) */
  HP.listAnnouncements = function () {
    return sb.from('announcements').select('*').order('created_at', { ascending: false })
      .then(function (r) { return r.data || []; });
  };
  HP.deleteAnnouncement = function (id) {
    return sb.from('announcements').delete().eq('id', id).then(function (r) { return { ok: !r.error }; });
  };

  /* the platform admin (support contact for doctors) */
  HP.getAdmin = function () {
    return sb.from('profiles').select('id,name,avatar_url').eq('role', 'admin').eq('status', 'active')
      .order('created_at').limit(1).then(function (r) { return (r.data && r.data[0]) || null; });
  };

  /* ---------- TREATMENT LISTINGS ---------- */
  function mapListing(d) {
    var m = {
      code: d.code, status: d.status,
      country_id: d.countryId, city_id: d.cityId, unit_id: d.unitId, treatment_id: d.treatmentId, method_id: d.methodId,
      headline: d.headline, process: d.process, hospital_id: d.hospitalId, hotel_id: d.hotelId,
      location_name: d.locationName, location_maps_url: d.locationMapsUrl,
      transport_title: d.transportTitle, transport_desc: d.transportDesc, transport_image: d.transportImage,
      advantages: d.advantages, price_amount: d.priceAmount, price_currency: d.priceCurrency,
      price_installments: d.priceInstallments, price_monthly: d.priceMonthly, photos: d.photos,
      section_photos: d.sectionPhotos
    };
    var out = {};
    Object.keys(m).forEach(function (k) { if (m[k] !== undefined) out[k] = m[k]; });
    if (out.photos) out.photos = out.photos.slice(0, 8);
    return out;
  }
  function genListingCode() { return 'HP-' + Math.random().toString(36).slice(2, 8).toUpperCase(); }

  /* finder: published listings filtered by the taxonomy cascade */
  HP.listListings = function (f) {
    f = f || {};
    var q = sb.from('listings')
      .select('*, doctor:doctor_id(name,avatar_url,specialty), hospital:hospital_id(name,city)')
      .eq('status', 'published');
    if (f.doctorId)            q = q.eq('doctor_id', f.doctorId);
    if (f.countryId)           q = q.eq('country_id', f.countryId);
    if (f.cityId)              q = q.eq('city_id', f.cityId);
    if (f.unitId)              q = q.eq('unit_id', f.unitId);
    if (f.treatmentId && f.treatmentId > 0) q = q.eq('treatment_id', f.treatmentId);   // -1 = "Hepsi"
    if (f.methodId && f.methodId > 0)       q = q.eq('method_id', f.methodId);
    return q.order('created_at', { ascending: false }).then(function (r) { return r.data || []; });
  };
  /* doctor directory (filtered) + single doctor + a doctor's published listings */
  HP.searchDoctors = function (f) {
    f = f || {};
    var q = sb.from('public_doctors').select('id,name,specialty,city,country,avatar_url,bio');
    if (f.country) q = q.ilike('country', '%' + f.country + '%');
    if (f.city)    q = q.ilike('city', '%' + f.city + '%');
    if (f.specialty) q = q.ilike('specialty', '%' + f.specialty + '%');
    if (f.name)    q = q.ilike('name', '%' + f.name + '%');
    return q.order('name').then(function (r) { return r.data || []; });
  };
  HP.getDoctor = function (id) {
    return sb.from('public_doctors').select('id,name,specialty,city,country,avatar_url,bio,academic')
      .eq('id', id).maybeSingle().then(function (r) { return r.data || null; });
  };
  HP.doctorListings = function (doctorId) {
    return sb.from('listings').select('*, hospital:hospital_id(name,city)')
      .eq('doctor_id', doctorId).eq('status', 'published').order('created_at', { ascending: false })
      .then(function (r) { return r.data || []; });
  };
  HP.favoriteCount = function (kind, refId) {
    return sb.from('favorites').select('*', { count: 'exact', head: true }).eq('kind', kind).eq('ref_id', String(refId))
      .then(function (r) { return r.count || 0; });
  };
  /* detail page: full listing + doctor profile + hospital + hotel */
  HP.getListing = function (idOrCode) {
    var sel = '*, doctor:doctor_id(id,name,avatar_url,specialty,bio,country,city), hospital:hospital_id(*), hotel:hotel_id(*)';
    var isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(String(idOrCode || ''));
    var q = sb.from('listings').select(sel);
    q = isUuid ? q.eq('id', idOrCode) : q.eq('code', idOrCode);
    return q.limit(1).maybeSingle().then(function (r) { return r.data || null; });
  };
  HP.myListings = function () {
    var p = HP._profile; if (!p) return Promise.resolve([]);
    return sb.from('listings').select('*, hospital:hospital_id(name), hotel:hotel_id(name)')
      .eq('doctor_id', p.id).order('created_at', { ascending: false }).then(function (r) { return r.data || []; });
  };
  HP.createListing = function (d) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    var row = mapListing(d);
    row.doctor_id = p.id;
    row.code = d.code || genListingCode();
    row.status = d.status || 'draft';
    return sb.from('listings').insert(row).select().single()
      .then(function (r) { return r.error ? fail('err.account', r.error.message) : ok({ data: r.data }); });
  };
  HP.updateListing = function (id, d) {
    return sb.from('listings').update(mapListing(d)).eq('id', id)
      .then(function (r) { return { ok: !r.error, error: r.error && r.error.message }; });
  };
  HP.deleteListing = function (id) {
    return sb.from('listings').delete().eq('id', id).then(function (r) { return { ok: !r.error }; });
  };

  /* ---------- HOSPITALS / HOTELS (catalog) + photo upload ---------- */
  HP.listHospitals = function () { return sb.from('hospitals').select('*').order('name').then(function (r) { return r.data || []; }); };
  HP.listHotels    = function () { return sb.from('hotels').select('*').order('name').then(function (r) { return r.data || []; }); };
  function createPlace(table, d) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    if (!String((d && d.name) || '').trim()) return Promise.resolve(fail('err.account'));
    return sb.from(table).insert({
      name: d.name, city: d.city || null, country: d.country || null,
      maps_url: d.mapsUrl || null, description: d.description || null, image_url: d.imageUrl || null, created_by: p.id
    }).select().single().then(function (r) { return r.error ? fail('err.account', r.error.message) : ok({ data: r.data }); });
  }
  HP.createHospital = function (d) { return createPlace('hospitals', d); };
  HP.createHotel    = function (d) { return createPlace('hotels', d); };

  /* ---------- HOSPITAL DIRECTORY (index/detail) ---------- */
  HP.searchHospitals = function (f) {
    f = f || {};
    var q = sb.from('hospitals').select('id,name,type,city,country,logo_url,photos');
    if (f.country) q = q.ilike('country', '%' + f.country + '%');
    if (f.city)    q = q.ilike('city', '%' + f.city + '%');
    if (f.type)    q = q.ilike('type', '%' + f.type + '%');
    if (f.name)    q = q.ilike('name', '%' + f.name + '%');
    return q.order('name').then(function (r) { return r.data || []; });
  };
  HP.getHospital = function (id) {
    return sb.from('hospitals').select('*').eq('id', id).maybeSingle().then(function (r) { return r.data || null; });
  };
  HP.hospitalListings = function (hospitalId) {
    return sb.from('listings').select('*, doctor:doctor_id(name,avatar_url,specialty), hospital:hospital_id(name,city)')
      .eq('hospital_id', hospitalId).eq('status', 'published').order('created_at', { ascending: false })
      .then(function (r) { return r.data || []; });
  };

  /* ---------- CLINIC DIRECTORY (index/detail) ---------- */
  HP.listClinics  = function () { return sb.from('clinics').select('*').order('name').then(function (r) { return r.data || []; }); };
  HP.createClinic = function (d) { return createPlace('clinics', d); };
  HP.searchClinics = function (f) {
    f = f || {};
    var q = sb.from('clinics').select('id,name,unit,city,country,logo_url,photos');
    if (f.country) q = q.ilike('country', '%' + f.country + '%');
    if (f.city)    q = q.ilike('city', '%' + f.city + '%');
    if (f.unit)    q = q.ilike('unit', '%' + f.unit + '%');
    if (f.name)    q = q.ilike('name', '%' + f.name + '%');
    return q.order('name').then(function (r) { return r.data || []; });
  };
  HP.getClinic = function (id) {
    return sb.from('clinics').select('*').eq('id', id).maybeSingle().then(function (r) { return r.data || null; });
  };
  HP.clinicListings = function (clinicId) {
    return sb.from('listings').select('*, doctor:doctor_id(name,avatar_url,specialty), hospital:hospital_id(name,city)')
      .eq('clinic_id', clinicId).eq('status', 'published').order('created_at', { ascending: false })
      .then(function (r) { return r.data || []; });
  };
  HP.uploadListingPhoto = function (file) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    if (!file) return Promise.resolve(fail('err.account'));
    var safe = ((file.name || 'photo').replace(/[^a-zA-Z0-9._-]/g, '_')).slice(-40);
    var path = p.id + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '-' + safe;
    return sb.storage.from('listing-photos').upload(path, file, { cacheControl: '3600' }).then(function (r) {
      if (r.error) return fail('err.account', r.error.message);
      return ok({ url: sb.storage.from('listing-photos').getPublicUrl(path).data.publicUrl });
    });
  };

  /* ---------- FAVORITES ---------- */
  HP.addFavorite = function (d) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    return sb.from('favorites').upsert({ user_id: p.id, kind: d.kind, ref_id: String(d.refId), label: d.label || null, meta: d.meta || null }, { onConflict: 'user_id,kind,ref_id' })
      .then(function (r) { return { ok: !r.error }; });
  };
  HP.removeFavorite = function (kind, refId) {
    var p = HP._profile; if (!p) return Promise.resolve(fail('err.session'));
    return sb.from('favorites').delete().eq('user_id', p.id).eq('kind', kind).eq('ref_id', String(refId))
      .then(function (r) { return { ok: !r.error }; });
  };
  HP.listFavorites = function () {
    var p = HP._profile; if (!p) return Promise.resolve([]);
    return sb.from('favorites').select('*').eq('user_id', p.id).order('created_at', { ascending: false })
      .then(function (r) { return r.data || []; });
  };

  /* convenience labels (kept for parity with old auth.js callers) */
  HP.roleLabel = function (role) { return role === 'doctor' ? 'Doktor' : role === 'admin' ? 'Yönetici' : 'Hasta'; };
  HP.statusLabel = function (s) { return ({ active: 'Aktif', pending: 'Onay Bekliyor', suspended: 'Askıda', deleted: 'Silindi' })[s] || s; };
})();
