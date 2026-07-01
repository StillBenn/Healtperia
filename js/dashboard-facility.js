/* ============================================================
   Healthperia — dashboard-facility.js
   Hastane/Klinik paneli. Tesis profilini düzenler → admin onayından
   sonra indekste yayınlanır. + mesajlaşma + ayarlar.
   window.HP + window.Dashboard + window.HPChat.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP;
  if (!H) return;
  function T(k, fb){ return (window.HPI && HPI.t) ? HPI.t(k, fb) : (fb || k); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }

  var me = null, facility = null, photos = [], logoUrl = '';

  function fieldsFor(role) {
    var common = [
      ['country', T('df.f.country','Ülke'), 'text'],
      ['city', T('df.f.city','Şehir'), 'text'],
      ['maps_url', T('df.f.maps','Google Maps Linki'), 'text'],
      ['description', T('df.f.desc','Açıklama'), 'area', 4]
    ];
    if (role === 'clinic') {
      return { typeField: ['unit', T('df.f.unit','Tıbbi Birim')], extra: [
        ['units', T('df.f.units','Tıbbi Birimler (her satıra bir)'), 'area', 4],
        ['treatments', T('df.f.treatments','Tedaviler (her satıra bir)'), 'area', 6]
      ], common: common };
    }
    return { typeField: ['type', T('df.f.type','Hastane Türü')], extra: [
      ['units', T('df.f.units','Tıbbi Birimler (her satıra bir)'), 'area', 5],
      ['capacity', T('df.f.capacity','Kapasite (her satır: Etiket|Değer)'), 'area', 5],
      ['comfort', T('df.f.comfort','Konfor (her satıra bir)'), 'area', 4],
      ['standards', T('df.f.standards','Standartlar (her satıra bir)'), 'area', 4]
    ], common: common };
  }
  function fld(name, label, type, rows, val) {
    if (type === 'area') return '<label class="field span-2"><span class="field-label">' + esc(label) + '</span><span class="field-box"><textarea name="' + name + '" rows="' + (rows||3) + '">' + esc(val) + '</textarea></span></label>';
    return '<label class="field"><span class="field-label">' + esc(label) + '</span><span class="field-box"><input name="' + name + '" type="text" value="' + esc(val) + '" /></span></label>';
  }
  function camel(n){ return n.replace(/_([a-z])/g, function(_, c){ return c.toUpperCase(); }); }

  function statusBadge(s) {
    return s === 'published'
      ? '<span class="badge badge-green">' + esc(T('df.status.published','Yayında')) + '</span>'
      : '<span class="badge badge-blue">' + esc(T('df.status.pending','Onay Bekliyor')) + '</span>';
  }

  function renderEditor() {
    var role = me.role, cfg = fieldsFor(role), f = facility || {};
    photos = Array.isArray(f.photos) ? f.photos.slice() : [];
    logoUrl = f.logo_url || '';
    var box = document.getElementById('facilityForm');
    box.innerHTML = '<form id="facForm" class="form-grid">' +
      '<label class="field"><span class="field-label">' + esc(T('df.f.name','Tesis Adı')) + '</span><span class="field-box"><input name="name" type="text" value="' + esc(f.name) + '" required /></span></label>' +
      fld(cfg.typeField[0], cfg.typeField[1], 'text', 0, f[cfg.typeField[0]]) +
      cfg.common.map(function (c){ return fld(c[0], c[1], c[2], c[3], f[c[0]]); }).join('') +
      cfg.extra.map(function (c){ return fld(c[0], c[1], c[2], c[3], f[c[0]]); }).join('') +
      '<div class="field"><span class="field-label">' + esc(T('df.f.logo','Logo')) + '</span><div class="fac-logo" id="facLogo"></div><label class="btn-ghost xs fac-up">' + esc(T('df.upLogo','Logo Yükle')) + '<input type="file" id="facLogoInp" accept="image/*" hidden></label></div>' +
      '<div class="field"><span class="field-label">' + esc(T('df.f.photos','Fotoğraflar')) + '</span><div class="fac-photos" id="facPhotos"></div><label class="btn-ghost xs fac-up">' + esc(T('df.upPhoto','Foto Ekle')) + '<input type="file" id="facPhotoInp" accept="image/*" multiple hidden></label></div>' +
      '<p class="legal-note span-2">' + esc(T('df.saveNote','Kaydettiğinizde profiliniz admin onayına gönderilir; onaylanınca indekste yayınlanır.')) + '</p>' +
      '<div class="form-actions span-2"><button type="submit" class="btn-primary sm">' + esc(T('df.save','Kaydet ve Onaya Gönder')) + '</button><span class="save-ok" id="facSaved" hidden data-i18n="acc.saved">Kaydedildi ✓</span><span class="save-err" id="facErr" hidden></span></div>' +
    '</form>';
    renderLogo(); renderPhotos(); wireUploads();
    document.getElementById('facForm').addEventListener('submit', save);
  }
  function renderLogo() {
    var el = document.getElementById('facLogo'); if (!el) return;
    el.innerHTML = logoUrl ? '<div class="fac-thumb"><img src="' + esc(logoUrl) + '"><button type="button" class="fac-rm" data-logo>×</button></div>' : '<span class="muted-line sm">' + esc(T('df.noLogo','Logo yok')) + '</span>';
    var rm = el.querySelector('[data-logo]'); if (rm) rm.addEventListener('click', function (){ logoUrl=''; renderLogo(); });
  }
  function renderPhotos() {
    var el = document.getElementById('facPhotos'); if (!el) return;
    el.innerHTML = photos.length ? photos.map(function (u,i){ return '<div class="fac-thumb"><img src="' + esc(u) + '"><button type="button" class="fac-rm" data-i="' + i + '">×</button></div>'; }).join('') : '<span class="muted-line sm">' + esc(T('df.noPhoto','Foto yok')) + '</span>';
    el.querySelectorAll('.fac-rm').forEach(function (b){ b.addEventListener('click', function (){ photos.splice(parseInt(b.dataset.i,10),1); renderPhotos(); }); });
  }
  function wireUploads() {
    document.getElementById('facLogoInp').addEventListener('change', function (e){ var file=e.target.files[0]; if(!file)return; H.uploadPlacePhoto(file).then(function(r){ if(r&&r.ok){ logoUrl=r.url; renderLogo(); } }); });
    document.getElementById('facPhotoInp').addEventListener('change', function (e){ var files=[].slice.call(e.target.files); if(!files.length)return;
      Promise.all(files.map(function(f){ return H.uploadPlacePhoto(f); })).then(function(res){ res.forEach(function(r){ if(r&&r.ok&&r.url) photos.push(r.url); }); renderPhotos(); }); });
  }
  function save(e) {
    e.preventDefault();
    var f = e.target, cfg = fieldsFor(me.role), err = document.getElementById('facErr'); err.hidden = true;
    var d = { id: facility && facility.id, name: f.name.value.trim(), logoUrl: logoUrl, photos: photos };
    d[camel(cfg.typeField[0])] = f[cfg.typeField[0]].value.trim();
    cfg.common.concat(cfg.extra).forEach(function (c){ d[camel(c[0])] = f[c[0]].value.trim(); });
    if (!d.name) { err.textContent = T('df.errName','Tesis adı zorunlu.'); err.hidden = false; return; }
    var btn = f.querySelector('button[type="submit"]'); btn.disabled = true;
    H.saveMyFacility(d).then(function (r) {
      btn.disabled = false;
      if (!r || !r.ok) { err.textContent = (r && r.error) || T('df.errSave','Kaydedilemedi.'); err.hidden = false; return; }
      facility = r.data;
      var ok = document.getElementById('facSaved'); ok.hidden = false; setTimeout(function(){ ok.hidden = true; }, 2500);
      paintStatus();
    });
  }

  function paintStatus() {
    var card = document.getElementById('facStatusCard');
    if (card) card.innerHTML = facility
      ? '<p>' + esc(T('df.curStatus','Mevcut durum')) + ': ' + statusBadge(facility.status) + '</p>' +
        (facility.status === 'pending' ? '<p class="muted-line sm">' + esc(T('df.pendingHint','Profiliniz admin onayını bekliyor.')) + '</p>' : '<p class="muted-line sm">' + esc(T('df.publishedHint','Profiliniz indekste yayında.')) + '</p>')
      : '<div class="empty-state sm"><p>' + esc(T('df.noFacility','Henüz tesis profiliniz yok. "Tesis Profilim"den oluşturun.')) + '</p></div>';
    var fs = document.getElementById('facFormStatus'); if (fs && facility) fs.innerHTML = statusBadge(facility.status);
  }

  /* ---------- Doktorlarım: tesisi seçen doktorlar + mesaj sayaçları (içerik YOK) ---------- */
  function renderDoctors() {
    var box = document.getElementById('facDoctorsBody'); if (!box) return;
    Promise.all([H.myFacilityDoctors(), H.facilityDoctorStats()]).then(function (r) {
      var docs = r[0] || [], stats = r[1] || [], sm = {};
      stats.forEach(function (s){ sm[s.doctor_id] = s; });
      var badge = document.getElementById('facDocBadge');
      var pendingN = docs.filter(function (d){ return d.facility_status === 'pending'; }).length;
      if (badge) { badge.textContent = pendingN; badge.style.display = pendingN ? '' : 'none'; }
      if (!docs.length) { box.innerHTML = '<div class="empty-state sm"><p>' + esc(T('df.doctors.empty','Henüz sizi seçen bir doktor yok. Doktorlar kayıt olurken tesisinizi seçtiğinde burada görünür.')) + '</p></div>'; return; }
      box.innerHTML = '<div class="table-wrap"><table class="data-table"><thead><tr>' +
        '<th>' + esc(T('df.doctors.name','Doktor')) + '</th><th>' + esc(T('df.doctors.status','Durum')) + '</th>' +
        '<th>' + esc(T('df.doctors.msgs','Mesaj İstatistiği')) + '</th><th>' + esc(T('acc.actions','İşlemler')) + '</th></tr></thead><tbody>' +
        docs.map(function (d) {
          var st = sm[d.id];
          var b = d.facility_status === 'approved' ? '<span class="badge badge-green">' + esc(T('df.doctors.approved','Onaylı')) + '</span>'
            : d.facility_status === 'rejected' ? '<span class="badge badge-amber">' + esc(T('df.doctors.rejected','Reddedildi')) + '</span>'
            : '<span class="badge badge-blue">' + esc(T('df.doctors.pending','Onay Bekliyor')) + '</span>';
          var msgs = (d.facility_status === 'approved' && st)
            ? '<span class="badge badge-blue">' + esc(T('df.doctors.received','Gelen')) + ': ' + st.received + '</span> ' +
              '<span class="badge badge-green">' + esc(T('df.doctors.replied','Cevaplanan')) + ': ' + st.replied + '</span>'
            : '<span class="muted-line sm">' + esc(T('df.doctors.approveToSee','Onaylayınca görünür')) + '</span>';
          var act = d.facility_status === 'approved'
            ? '<button class="btn-mini no" data-rej="' + d.id + '">' + esc(T('df.doctors.remove','Kaldır')) + '</button>'
            : '<button class="btn-mini ok" data-appr="' + d.id + '">' + esc(T('df.doctors.approve','Onayla')) + '</button>' +
              (d.facility_status !== 'rejected' ? ' <button class="btn-mini no" data-rej="' + d.id + '">' + esc(T('df.doctors.reject','Reddet')) + '</button>' : '');
          return '<tr><td><span class="cell-user"><strong>' + esc(d.name || '—') + '</strong></span><div class="muted-line sm">' + esc([d.specialty, [d.city, d.country].filter(Boolean).join(', ')].filter(Boolean).join(' · ')) + '</div></td>' +
            '<td>' + b + '</td><td>' + msgs + '</td><td><div class="row-actions">' + act + '</div></td></tr>';
        }).join('') + '</tbody></table></div>';
      box.querySelectorAll('[data-appr]').forEach(function (x){ x.addEventListener('click', function(){ H.facilitySetDoctorStatus(x.dataset.appr, 'approved').then(renderDoctors); }); });
      box.querySelectorAll('[data-rej]').forEach(function (x){ x.addEventListener('click', function(){ H.facilitySetDoctorStatus(x.dataset.rej, 'rejected').then(renderDoctors); }); });
    });
  }

  H.guard(['hospital', 'clinic']).then(function (user) {
    if (!user) return;
    me = user;
    Dashboard.init(user, { role: user.role === 'clinic' ? 'Klinik' : 'Hastane' });
    var navSpec = document.getElementById('navSpec'); if (navSpec) navSpec.textContent = T('acc.role.' + user.role, user.role === 'clinic' ? 'Klinik' : 'Hastane');
    if (Dashboard.refreshIdentity) Dashboard.refreshIdentity();

    H.myFacility().then(function (fac) {
      facility = fac;
      paintStatus();
      renderEditor();
    });

    renderDoctors();

    /* messaging */
    if (window.HPChat) HPChat.mount(document.getElementById('facilityChat'), { excludeRole: 'admin', emptyText: T('df.noMsg','Henüz mesajınız yok.') });

    /* password */
    var pw = document.getElementById('pwForm');
    pw.addEventListener('submit', function (e) {
      e.preventDefault();
      var er = document.getElementById('pwErr'), ok = document.getElementById('pwSaved'); er.hidden = true; ok.hidden = true;
      if (pw.new.value !== pw.confirm.value) { er.textContent = T('acc.pw.mismatch','Yeni şifreler eşleşmiyor.'); er.hidden = false; return; }
      var b = pw.querySelector('button[type="submit"]'); b.disabled = true;
      H.changePassword(pw.old.value, pw.new.value).then(function (r) {
        b.disabled = false;
        if (!r.ok) { er.textContent = r.key ? T(r.key, r.error) : r.error; er.hidden = false; return; }
        pw.reset(); ok.hidden = false; setTimeout(function(){ ok.hidden = true; }, 2500);
      });
    });

    /* notification prefs */
    var e1 = document.getElementById('prefNotifEmail'), e2 = document.getElementById('prefNotifAppt'), e3 = document.getElementById('prefNotifPromo');
    if (e1) e1.checked = user.pref_notif_email !== false;
    if (e2) e2.checked = user.pref_notif_appt !== false;
    if (e3) e3.checked = user.pref_notif_promo === true;
    var sv = document.getElementById('prefSave');
    if (sv) sv.addEventListener('click', function () {
      sv.disabled = true;
      H.updateProfile({ pref_notif_email: e1.checked, pref_notif_appt: e2.checked, pref_notif_promo: e3.checked }).then(function () {
        sv.disabled = false; var ok = document.getElementById('prefSaved'); ok.hidden = false; setTimeout(function(){ ok.hidden = true; }, 2500);
      });
    });

    if (window.HPI && HPI.onChange) HPI.onChange(function () { paintStatus(); renderEditor(); renderDoctors(); });
  });
})();
