/* ============================================================
   Healthperia — auth.js
   Client-side authentication engine (localStorage based)
   ------------------------------------------------------------
   NOTE: This is a front-end DEMO auth layer for a static site
   (GitHub Pages, no backend). Passwords are salted + hashed
   locally; this is NOT production-grade security. When a real
   backend is added, swap the storage/crypto calls here only.
   ============================================================ */

(function (global) {
  'use strict';

  var USERS_KEY   = 'healthperia.users';
  var SESSION_KEY = 'healthperia.session';
  var RESET_KEY   = 'healthperia.reset';

  /* ---------- low-level storage ---------- */
  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (_) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (_) {}
  }

  /* ---------- helpers ---------- */
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
  function randSalt() {
    return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
  }
  /* FNV-1a style hash — deterministic, fast, DEMO only */
  function hash(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16);
  }
  function hashPw(pw, salt) {
    return hash(salt + '::' + pw + '::healthperia.v1');
  }
  function normEmail(e) { return String(e || '').trim().toLowerCase(); }

  /* ---------- users ---------- */
  function getUsers()  { return read(USERS_KEY, []); }
  function saveUsers(u){ write(USERS_KEY, u); }

  function findByEmail(email) {
    email = normEmail(email);
    return getUsers().filter(function (u) { return u.email === email; })[0] || null;
  }
  function findById(id) {
    return getUsers().filter(function (u) { return u.id === id; })[0] || null;
  }

  /* ---------- seed demo accounts (idempotent) ---------- */
  function makeUser(role, name, email, password, extra) {
    var salt = randSalt();
    var u = {
      id: uid(),
      role: role,
      name: name,
      email: normEmail(email),
      salt: salt,
      pass: hashPw(password, salt),
      status: role === 'doctor' ? 'pending' : 'active',
      createdAt: Date.now()
    };
    if (extra) for (var k in extra) if (extra.hasOwnProperty(k)) u[k] = extra[k];
    return u;
  }

  function seed() {
    var users = getUsers();
    var changed = false;
    var ensure = function (email, build) {
      if (!users.some(function (u) { return u.email === normEmail(email); })) {
        users.push(build());
        changed = true;
      }
    };

    ensure('admin@healthperia.com', function () {
      return makeUser('admin', 'Healthperia Yönetim', 'admin@healthperia.com', 'admin123', { status: 'active' });
    });
    ensure('doktor@healthperia.com', function () {
      return makeUser('doctor', 'Dr. Elif Yılmaz', 'doktor@healthperia.com', 'doktor123', {
        status: 'active', specialty: 'Kardiyoloji', license: 'TR-KD-48217',
        country: 'Türkiye', phone: '+90 532 000 00 00'
      });
    });
    ensure('hasta@healthperia.com', function () {
      return makeUser('patient', 'Ahmet Demir', 'hasta@healthperia.com', 'hasta123', {
        status: 'active', country: 'Türkiye', phone: '+90 533 000 00 00'
      });
    });

    if (changed) saveUsers(users);
  }

  /* ---------- session ---------- */
  function getSession() { return read(SESSION_KEY, null); }
  function setSession(user) {
    write(SESSION_KEY, { id: user.id, role: user.role, email: user.email, name: user.name, at: Date.now() });
  }
  function clearSession() { try { localStorage.removeItem(SESSION_KEY); } catch (_) {} }

  function currentUser() {
    var s = getSession();
    if (!s) return null;
    var u = findById(s.id);
    return u && u.status !== 'deleted' ? u : null;
  }

  /* ---------- public dashboard route for a role ---------- */
  function dashboardFor(role) {
    if (role === 'doctor') return 'dashboard-doctor.html';
    if (role === 'admin')  return 'admin.html';
    return 'dashboard-patient.html';
  }

  /* ============================================================
     API
     ============================================================ */
  function register(data) {
    var role  = data.role === 'doctor' ? 'doctor' : 'patient';
    var name  = String(data.name || '').trim();
    var email = normEmail(data.email);
    var pw    = String(data.password || '');

    if (name.length < 2)  return { ok: false, error: 'Lütfen geçerli bir ad soyad girin.' };
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: 'Lütfen geçerli bir e-posta adresi girin.' };
    if (pw.length < 6)    return { ok: false, error: 'Şifre en az 6 karakter olmalıdır.' };
    if (data.confirm !== undefined && pw !== data.confirm) return { ok: false, error: 'Şifreler eşleşmiyor.' };
    if (findByEmail(email)) return { ok: false, error: 'Bu e-posta ile bir hesap zaten mevcut.' };
    if (role === 'doctor') {
      if (!String(data.specialty || '').trim()) return { ok: false, error: 'Lütfen uzmanlık alanınızı girin.' };
      if (!String(data.license || '').trim())   return { ok: false, error: 'Lütfen diploma / lisans numaranızı girin.' };
    }

    var users = getUsers();
    var user = makeUser(role, name, email, pw, {
      phone:   String(data.phone || '').trim(),
      country: String(data.country || '').trim(),
      specialty: role === 'doctor' ? String(data.specialty || '').trim() : undefined,
      license:   role === 'doctor' ? String(data.license || '').trim()   : undefined
    });
    users.push(user);
    saveUsers(users);

    if (role === 'doctor') {
      return { ok: true, pending: true, user: user,
        message: 'Hesabınız oluşturuldu. Doktor hesapları, güvenlik için ekibimiz tarafından onaylandıktan sonra aktif olur.' };
    }
    setSession(user);
    return { ok: true, user: user };
  }

  function login(email, password, role) {
    var u = findByEmail(email);
    if (!u) return { ok: false, error: 'Bu e-posta ile kayıtlı bir hesap bulunamadı.' };
    if (u.pass !== hashPw(String(password || ''), u.salt)) return { ok: false, error: 'E-posta veya şifre hatalı.' };
    if (role && u.role !== role) return { ok: false, error: 'Bu hesap "' + roleLabel(u.role) + '" türünde. Lütfen doğru sekmeyi seçin.' };
    if (u.status === 'pending')   return { ok: false, error: 'Doktor hesabınız henüz onay bekliyor. Onaylandığında bilgilendirileceksiniz.' };
    if (u.status === 'suspended') return { ok: false, error: 'Hesabınız askıya alınmış. Lütfen destek ekibiyle iletişime geçin.' };
    if (u.status === 'deleted')   return { ok: false, error: 'Bu hesap mevcut değil.' };
    setSession(u);
    return { ok: true, user: u };
  }

  function logout(redirect) {
    clearSession();
    if (redirect !== false) {
      var prefix = location.pathname.indexOf('/pages/') !== -1 ? '' : 'pages/';
      location.href = prefix + 'auth.html';
    }
  }

  /* ---------- password reset (simulated, no email backend) ---------- */
  function requestReset(email) {
    var u = findByEmail(email);
    /* Always behave the same to avoid account enumeration, but for this
       demo we surface the code on-screen so the flow is testable. */
    var code = String(Math.floor(100000 + Math.random() * 900000));
    if (u) {
      write(RESET_KEY, { email: u.email, code: code, at: Date.now() });
    } else {
      write(RESET_KEY, { email: normEmail(email), code: code, at: Date.now(), unknown: true });
    }
    return { ok: true, code: code, exists: !!u };
  }
  function verifyReset(email, code) {
    var r = read(RESET_KEY, null);
    if (!r || r.email !== normEmail(email)) return { ok: false, error: 'Sıfırlama isteği bulunamadı. Lütfen tekrar deneyin.' };
    if (String(code).trim() !== r.code)     return { ok: false, error: 'Doğrulama kodu hatalı.' };
    if (Date.now() - r.at > 1000 * 60 * 30)  return { ok: false, error: 'Kodun süresi doldu. Lütfen yeni kod isteyin.' };
    return { ok: true };
  }
  function resetPassword(email, code, newPassword) {
    var v = verifyReset(email, code);
    if (!v.ok) return v;
    if (String(newPassword || '').length < 6) return { ok: false, error: 'Yeni şifre en az 6 karakter olmalıdır.' };
    var users = getUsers();
    var found = false;
    users.forEach(function (u) {
      if (u.email === normEmail(email)) {
        u.salt = randSalt();
        u.pass = hashPw(newPassword, u.salt);
        found = true;
      }
    });
    if (!found) return { ok: false, error: 'Hesap bulunamadı.' };
    saveUsers(users);
    try { localStorage.removeItem(RESET_KEY); } catch (_) {}
    return { ok: true };
  }

  /* ---------- profile ---------- */
  function updateProfile(patch) {
    var s = getSession();
    if (!s) return { ok: false, error: 'Oturum bulunamadı.' };
    var users = getUsers();
    var updated = null;
    users.forEach(function (u) {
      if (u.id === s.id) {
        ['name', 'phone', 'country', 'specialty', 'license', 'bio', 'city'].forEach(function (f) {
          if (patch[f] !== undefined) u[f] = patch[f];
        });
        updated = u;
      }
    });
    if (!updated) return { ok: false, error: 'Hesap bulunamadı.' };
    saveUsers(users);
    setSession(updated);
    return { ok: true, user: updated };
  }
  function changePassword(oldPw, newPw) {
    var u = currentUser();
    if (!u) return { ok: false, error: 'Oturum bulunamadı.' };
    if (u.pass !== hashPw(String(oldPw || ''), u.salt)) return { ok: false, error: 'Mevcut şifre hatalı.' };
    if (String(newPw || '').length < 6) return { ok: false, error: 'Yeni şifre en az 6 karakter olmalıdır.' };
    var users = getUsers();
    users.forEach(function (x) {
      if (x.id === u.id) { x.salt = randSalt(); x.pass = hashPw(newPw, x.salt); }
    });
    saveUsers(users);
    return { ok: true };
  }

  /* ---------- admin operations ---------- */
  function listUsers() {
    return getUsers().filter(function (u) { return u.status !== 'deleted'; });
  }
  function setStatus(id, status) {
    var users = getUsers(), done = false;
    users.forEach(function (u) { if (u.id === id) { u.status = status; done = true; } });
    if (done) saveUsers(users);
    return { ok: done };
  }
  function approveDoctor(id) { return setStatus(id, 'active'); }
  function rejectDoctor(id)  { return setStatus(id, 'suspended'); }
  function removeUser(id)    { return setStatus(id, 'deleted'); }

  /* ---------- route guard ---------- */
  function guard(roles) {
    if (typeof roles === 'string') roles = [roles];
    var u = currentUser();
    if (!u) { location.replace('auth.html'); return null; }
    if (roles && roles.indexOf(u.role) === -1) {
      location.replace(dashboardFor(u.role));
      return null;
    }
    return u;
  }

  function roleLabel(role) {
    return role === 'doctor' ? 'Doktor' : role === 'admin' ? 'Yönetici' : 'Hasta';
  }
  function statusLabel(status) {
    return { active: 'Aktif', pending: 'Onay Bekliyor', suspended: 'Askıda', deleted: 'Silindi' }[status] || status;
  }

  /* ---------- boot ---------- */
  seed();

  global.Healthperia = {
    register: register,
    login: login,
    logout: logout,
    currentUser: currentUser,
    getSession: getSession,
    requestReset: requestReset,
    verifyReset: verifyReset,
    resetPassword: resetPassword,
    updateProfile: updateProfile,
    changePassword: changePassword,
    listUsers: listUsers,
    setStatus: setStatus,
    approveDoctor: approveDoctor,
    rejectDoctor: rejectDoctor,
    removeUser: removeUser,
    guard: guard,
    dashboardFor: dashboardFor,
    roleLabel: roleLabel,
    statusLabel: statusLabel,
    findById: findById
  };
})(window);
