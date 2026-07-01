/* ============================================================
   Healthperia — admin-owner.js
   Kurucu (owner) katmanı: sistem geneli sayımlar, yetki-kapısı
   (adminler yalnız yetkili sekmeleri görür) ve OWNER-only Admin
   Yönetimi (admin oluştur / yetki ver / kaldır). Yalnız owner
   admin atayabilir/silebilir (server-side guard ile de korunur).
   window.HP + Dashboard shell. admin.html'de hp-api'den sonra yüklenir.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP; if (!H) return;
  function T(k, fb){ return (window.HPI && HPI.t) ? HPI.t(k, fb) : (fb || k); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }

  var PERMS = ['approve_accounts', 'manage_users', 'approve_listings', 'approve_facilities', 'manage_facilities', 'manage_blog', 'manage_announcements', 'view_reports'];
  var PERM_LABEL = {
    approve_accounts:    ['ad.perm.approve_accounts', 'Hesap Onayı'],
    manage_users:        ['ad.perm.manage_users', 'Kullanıcı Yönetimi'],
    approve_listings:    ['ad.perm.approve_listings', 'İlan Onayı'],
    approve_facilities:  ['ad.perm.approve_facilities', 'Tesis Onayı'],
    manage_facilities:   ['ad.perm.manage_facilities', 'Tesis Yönetimi'],
    manage_blog:         ['ad.perm.manage_blog', 'Blog Yönetimi'],
    manage_announcements:['ad.perm.manage_announcements', 'Duyuru Yönetimi'],
    view_reports:        ['ad.perm.view_reports', 'Şikâyet Görüntüleme']
  };
  /* sidebar bölümü → gerekli yetki (owner hepsini görür; overview/messages/settings herkese açık) */
  var SEC_PERM = {
    pending: 'approve_accounts', users: 'manage_users', doctors: 'manage_users', patients: 'manage_users',
    content: 'manage_blog', facilities: 'manage_facilities', approvals: 'approve_listings',
    reports: 'view_reports', announcements: 'manage_announcements'
  };

  H.ready.then(function (p) {
    if (!p || (p.role !== 'admin' && p.role !== 'owner')) return;
    var owner = p.role === 'owner';

    /* yetki kapısı: yetkisiz sekmeleri gizle (owner hepsini görür) */
    if (!owner) {
      Object.keys(SEC_PERM).forEach(function (sec) {
        if (H.can(SEC_PERM[sec])) return;
        var link = document.querySelector('.side-link[data-section="' + sec + '"]'); if (link) link.style.display = 'none';
        var dd = document.querySelector('.user-dropdown a[data-section="' + sec + '"]'); if (dd) dd.style.display = 'none';
        var jmp = document.querySelector('[data-jump="' + sec + '"]'); if (jmp) jmp.style.display = 'none';
      });
    }

    renderOverview();
    if (owner) {
      document.querySelectorAll('[data-owner-only]').forEach(function (el){ el.hidden = false; el.style.display = ''; });
      wireAdminMgmt();
      renderAdmins();
    }
    if (window.HPI && HPI.onChange) HPI.onChange(function () { renderOverview(); if (owner) renderAdmins(); });
  });

  /* ---------- sistem geneli sayımlar (owner/admin denetim) ---------- */
  function renderOverview() {
    var box = document.getElementById('ownerOverview'); if (!box) return;
    H.adminOverview().then(function (s) {
      if (!s || !Object.keys(s).length) { box.innerHTML = ''; return; }
      var cards = [
        ['ad.ov.hospitals', 'Hastaneler', s.hospitals], ['ad.ov.clinics', 'Klinikler', s.clinics],
        ['ad.ov.listings', 'Yayında İlan', s.listings_published], ['ad.ov.listingsPending', 'Bekleyen İlan', s.listings_pending],
        ['ad.ov.facilities', 'Tesis Kaydı', s.facilities], ['ad.ov.messages', 'Toplam Mesaj', s.messages],
        ['ad.ov.reports', 'Açık Şikâyet', s.reports_open], ['ad.ov.admins', 'Admin', s.admins]
      ];
      box.innerHTML = cards.map(function (c) {
        return '<div class="stat-card mini"><strong>' + (c[2] == null ? 0 : c[2]) + '</strong><span>' + esc(T(c[0], c[1])) + '</span></div>';
      }).join('');
    });
  }

  /* ---------- OWNER: admin yönetimi ---------- */
  function permChips(perms) {
    perms = Array.isArray(perms) ? perms : [];
    if (!perms.length) return '<span class="muted-line sm">' + esc(T('ad.admins.noPerm', 'Yetki yok')) + '</span>';
    return perms.map(function (k) { var l = PERM_LABEL[k]; return '<span class="badge badge-blue">' + esc(l ? T(l[0], l[1]) : k) + '</span>'; }).join(' ');
  }
  function renderAdmins() {
    var box = document.getElementById('adminMgmtBody'); if (!box) return;
    H.listAdmins().then(function (rows) {
      box.innerHTML = '<div class="table-wrap"><table class="data-table"><thead><tr>' +
        '<th>' + esc(T('ad.admins.name', 'Ad')) + '</th><th>' + esc(T('ad.th.role', 'Rol')) + '</th>' +
        '<th>' + esc(T('ad.admins.perms', 'Yetkiler')) + '</th><th>' + esc(T('acc.actions', 'İşlemler')) + '</th></tr></thead><tbody>' +
        rows.map(function (a) {
          var isOwnerRow = a.role === 'owner';
          var roleB = isOwnerRow ? '<span class="badge badge-amber">' + esc(T('acc.role.owner', 'Kurucu')) + '</span>' : '<span class="badge badge-green">' + esc(T('acc.role.admin', 'Yönetici')) + '</span>';
          var act = isOwnerRow ? '<span class="muted-line sm">—</span>'
            : '<button class="btn-mini ok" data-edit="' + a.id + '">' + esc(T('ad.admins.edit', 'Yetki')) + '</button> <button class="btn-mini no" data-del="' + a.id + '">' + esc(T('ad.admins.remove', 'Kaldır')) + '</button>';
          return '<tr><td><span class="cell-user"><strong>' + esc(a.name || '—') + '</strong></span><div class="muted-line sm">' + esc(a.email || '') + '</div></td>' +
            '<td>' + roleB + '</td><td>' + permChips(a.permissions) + '</td><td><div class="row-actions">' + act + '</div></td></tr>';
        }).join('') + '</tbody></table></div>';
      box.querySelectorAll('[data-del]').forEach(function (b){ b.addEventListener('click', function(){ if (confirm(T('ad.admins.confirmDel', 'Bu admini kaldırmak istiyor musunuz?'))) H.removeAdmin(b.dataset.del).then(renderAdmins); }); });
      box.querySelectorAll('[data-edit]').forEach(function (b){ b.addEventListener('click', function(){ var a = rows.filter(function(x){ return x.id === b.dataset.edit; })[0]; openEditor(a); }); });
    });
  }
  function permBoxes(selected) {
    selected = Array.isArray(selected) ? selected : [];
    return '<div class="perm-grid">' + PERMS.map(function (k) {
      var l = PERM_LABEL[k];
      return '<label class="perm-check"><input type="checkbox" value="' + k + '"' + (selected.indexOf(k) >= 0 ? ' checked' : '') + '><span>' + esc(l ? T(l[0], l[1]) : k) + '</span></label>';
    }).join('') + '</div>';
  }
  function collectPerms(form) {
    return [].slice.call(form.querySelectorAll('.perm-check input:checked')).map(function (i){ return i.value; });
  }
  function openEditor(admin) {
    var card = document.getElementById('adminEditorCard'); if (!card) return;
    var creating = !admin;
    card.hidden = false;
    card.innerHTML = '<form id="adminForm" class="form-grid">' +
      '<div class="card-head span-2"><h4>' + esc(creating ? T('ad.admins.new', 'Yeni Admin') : (T('ad.admins.editTitle', 'Yetkileri Düzenle') + ' — ' + (admin.name || admin.email))) + '</h4></div>' +
      (creating
        ? '<label class="field"><span class="field-label">' + esc(T('ad.admins.name', 'Ad')) + '</span><span class="field-box"><input name="name" type="text" required></span></label>' +
          '<label class="field"><span class="field-label">' + esc(T('acc.f.email', 'E-posta')) + '</span><span class="field-box"><input name="email" type="email" required></span></label>' +
          '<label class="field span-2"><span class="field-label">' + esc(T('acc.f.password', 'Şifre (min 6)')) + '</span><span class="field-box"><input name="password" type="text" required minlength="6"></span></label>'
        : '') +
      '<div class="field span-2"><span class="field-label">' + esc(T('ad.admins.perms', 'Yetkiler')) + '</span>' + permBoxes(creating ? [] : admin.permissions) + '</div>' +
      '<div class="form-actions span-2"><button type="button" class="btn-ghost sm" id="adminCancel">' + esc(T('acc.cancel', 'İptal')) + '</button><button type="submit" class="btn-primary sm">' + esc(creating ? T('ad.admins.create', 'Oluştur') : T('acc.save', 'Kaydet')) + '</button><span class="save-err" id="adminErr" hidden></span></div>' +
    '</form>';
    var form = document.getElementById('adminForm');
    document.getElementById('adminCancel').addEventListener('click', function(){ card.hidden = true; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = document.getElementById('adminErr'); err.hidden = true;
      var perms = collectPerms(form);
      var btn = form.querySelector('button[type="submit"]'); btn.disabled = true;
      var pr = creating
        ? H.createAdmin({ name: form.name.value, email: form.email.value, password: form.password.value, permissions: perms })
        : H.setAdminPermissions(admin.id, perms);
      pr.then(function (r) {
        btn.disabled = false;
        if (!r || r.ok === false) { err.textContent = (r && (r.key ? T(r.key, r.error) : r.error)) || T('ad.admins.errSave', 'İşlem başarısız.'); err.hidden = false; return; }
        card.hidden = true; renderAdmins();
      });
    });
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  function wireAdminMgmt() {
    var nb = document.getElementById('newAdminBtn');
    if (nb) nb.addEventListener('click', function(){ openEditor(null); });
  }
})();
