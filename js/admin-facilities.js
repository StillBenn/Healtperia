/* ============================================================
   Healthperia — admin-facilities.js
   Admin "Tesisler" paneli: Hastane / Klinik / Acente için
   sekmeli liste + oluştur/düzenle formu (tüm zengin alanlar +
   logo & foto yükleme). window.HP kullanır.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP;
  var root = document.getElementById('facilitiesRoot');
  if (!root || !H) return;

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }

  /* alan tanımları (textarea = satır-satır listeler; cap = "Etiket|Değer") */
  var COMMON = [
    { n:'maps_url', l:'Google Maps Linki', t:'text' },
    { n:'description', l:'Açıklama', t:'area', rows:4 }
  ];
  var TYPES = {
    hospital: { label:'Hastaneler', list:H.listHospitals, create:H.createHospital, update:H.updateHospital,
      typeField:{ n:'type', l:'Hastane Türü' },
      fields:[ { n:'units', l:'Tıbbi Birimler (her satıra bir tane)', t:'area', rows:5 },
               { n:'capacity', l:'Kapasite (her satır: Etiket|Değer)', t:'area', rows:5 },
               { n:'comfort', l:'Konfor (her satıra bir tane)', t:'area', rows:4 },
               { n:'standards', l:'Standartlar (her satıra bir tane)', t:'area', rows:4 } ] },
    clinic: { label:'Klinikler', list:H.listClinics, create:H.createClinic, update:H.updateClinic,
      typeField:{ n:'unit', l:'Tıbbi Birim' },
      fields:[ { n:'units', l:'Tıbbi Birimler (her satıra bir tane)', t:'area', rows:4 },
               { n:'treatments', l:'Tedaviler (her satıra bir tane)', t:'area', rows:6 } ] }
  };
  var ORDER = ['hospital', 'clinic'];
  var current = 'hospital';

  function camel(n){ return n.replace(/_([a-z])/g, function(_, c){ return c.toUpperCase(); }); }

  /* ---------- list view ---------- */
  function renderTabs() {
    return '<div class="fac-tabs">' + ORDER.map(function (k) {
      return '<button class="fac-tab' + (k === current ? ' is-active' : '') + '" data-k="' + k + '">' + esc(TYPES[k].label) + '</button>';
    }).join('') + '</div>';
  }
  function renderList() {
    var cfg = TYPES[current];
    root.innerHTML = '<div class="card">' + renderTabs() +
      '<div class="card-head" style="margin-top:14px"><h3>' + esc(cfg.label) + '</h3><button class="btn-primary sm" id="facNew">Yeni Ekle</button></div>' +
      '<div id="facList"><div class="empty-state sm"><p>Yükleniyor…</p></div></div></div>';
    bindTabs();
    document.getElementById('facNew').addEventListener('click', function () { openEditor(null); });
    cfg.list().then(function (rows) {
      var el = document.getElementById('facList');
      if (!rows || !rows.length) { el.innerHTML = '<div class="empty-state sm"><p>Henüz kayıt yok. "Yeni Ekle" ile oluşturun.</p></div>'; return; }
      el.innerHTML = '<div class="table-wrap"><table class="data-table"><thead><tr><th>Ad</th><th>Tür/Birim</th><th>Şehir</th><th>İşlem</th></tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr><td>' + esc(r.name) + '</td><td>' + esc(r.type || r.unit || '—') + '</td><td>' + esc([r.city, r.country].filter(Boolean).join(', ') || '—') + '</td>' +
            '<td><button class="btn-ghost xs fac-edit" data-id="' + esc(r.id) + '">Düzenle</button></td></tr>';
        }).join('') + '</tbody></table></div>';
      el.querySelectorAll('.fac-edit').forEach(function (b) {
        b.addEventListener('click', function () { var row = rows.filter(function(x){return x.id===b.dataset.id;})[0]; openEditor(row); });
      });
    });
  }
  function bindTabs() {
    root.querySelectorAll('.fac-tab').forEach(function (t) {
      t.addEventListener('click', function () { current = t.dataset.k; renderList(); });
    });
  }

  /* ---------- editor ---------- */
  var photos = [], logoUrl = '';
  function field(f, val) {
    if (f.t === 'area') return '<label class="field span-2"><span class="field-label">' + esc(f.l) + '</span><span class="field-box"><textarea name="' + f.n + '" rows="' + (f.rows||3) + '">' + esc(val) + '</textarea></span></label>';
    return '<label class="field"><span class="field-label">' + esc(f.l) + '</span><span class="field-box"><input name="' + f.n + '" type="text" value="' + esc(val) + '" /></span></label>';
  }
  function openEditor(row) {
    var cfg = TYPES[current];
    row = row || {};
    photos = Array.isArray(row.photos) ? row.photos.slice() : [];
    logoUrl = row.logo_url || '';
    var head = (row.id ? 'Düzenle: ' : 'Yeni ') + cfg.label.replace(/ler$|lar$/, '');
    var html = '<div class="card"><div class="card-head"><h3>' + esc(head) + '</h3><button class="btn-ghost sm" id="facBack">← Geri</button></div>' +
      '<form id="facForm" class="form-grid">' +
        '<label class="field"><span class="field-label">Ad</span><span class="field-box"><input name="name" type="text" value="' + esc(row.name) + '" required /></span></label>' +
        field(cfg.typeField, row[cfg.typeField.n]) +
        '<label class="field"><span class="field-label">Ülke</span><span class="field-box"><input name="country" type="text" value="' + esc(row.country) + '" /></span></label>' +
        '<label class="field"><span class="field-label">Şehir</span><span class="field-box"><input name="city" type="text" value="' + esc(row.city) + '" /></span></label>' +
        COMMON.map(function (f) { return field(f, row[f.n]); }).join('') +
        cfg.fields.map(function (f) { return field(f, row[f.n]); }).join('') +
        '<div class="field"><span class="field-label">Logo</span><div class="fac-logo" id="facLogo"></div><label class="btn-ghost xs fac-up">Logo Yükle<input type="file" id="facLogoInp" accept="image/*" hidden></label></div>' +
        '<div class="field"><span class="field-label">Fotoğraflar</span><div class="fac-photos" id="facPhotos"></div><label class="btn-ghost xs fac-up">Foto Ekle<input type="file" id="facPhotoInp" accept="image/*" multiple hidden></label></div>' +
        '<div class="form-actions span-2"><button type="submit" class="btn-primary sm">Kaydet</button><span class="save-ok" id="facSaved" hidden>Kaydedildi ✓</span><span class="save-err" id="facErr" hidden></span></div>' +
      '</form></div>';
    root.innerHTML = html;
    document.getElementById('facBack').addEventListener('click', renderList);
    renderLogo(); renderPhotos();
    wireUploads();
    document.getElementById('facForm').addEventListener('submit', function (e) { e.preventDefault(); save(e.target, row.id, cfg); });
  }
  function renderLogo() {
    document.getElementById('facLogo').innerHTML = logoUrl ? '<div class="fac-thumb"><img src="' + esc(logoUrl) + '"><button type="button" class="fac-rm" data-logo>×</button></div>' : '<span class="muted-line sm">Logo yok</span>';
    var rm = document.querySelector('[data-logo]'); if (rm) rm.addEventListener('click', function () { logoUrl = ''; renderLogo(); });
  }
  function renderPhotos() {
    document.getElementById('facPhotos').innerHTML = photos.length ? photos.map(function (u, i) {
      return '<div class="fac-thumb"><img src="' + esc(u) + '"><button type="button" class="fac-rm" data-i="' + i + '">×</button></div>';
    }).join('') : '<span class="muted-line sm">Foto yok</span>';
    document.querySelectorAll('#facPhotos .fac-rm').forEach(function (b) { b.addEventListener('click', function () { photos.splice(parseInt(b.dataset.i, 10), 1); renderPhotos(); }); });
  }
  function wireUploads() {
    document.getElementById('facLogoInp').addEventListener('change', function (e) {
      var file = e.target.files[0]; if (!file) return;
      H.uploadPlacePhoto(file).then(function (r) { if (r && r.ok) { logoUrl = r.url; renderLogo(); } });
    });
    document.getElementById('facPhotoInp').addEventListener('change', function (e) {
      var files = [].slice.call(e.target.files); if (!files.length) return;
      Promise.all(files.map(function (f) { return H.uploadPlacePhoto(f); })).then(function (res) {
        res.forEach(function (r) { if (r && r.ok && r.url) photos.push(r.url); });
        renderPhotos();
      });
    });
  }
  function save(f, id, cfg) {
    var err = document.getElementById('facErr'); err.hidden = true;
    var d = { name: f.name.value.trim(), country: f.country.value.trim(), city: f.city.value.trim(),
      mapsUrl: f.maps_url.value.trim(), description: f.description.value.trim(), logoUrl: logoUrl, photos: photos };
    d[camel(cfg.typeField.n)] = f[cfg.typeField.n].value.trim();
    cfg.fields.forEach(function (fl) { d[camel(fl.n)] = f[fl.n].value.trim(); });
    if (!d.name) { err.textContent = 'Ad zorunlu.'; err.hidden = false; return; }
    var btn = f.querySelector('button[type="submit"]'); btn.disabled = true;
    var done = function (ok2) {
      btn.disabled = false;
      if (!ok2) { err.textContent = 'Kaydedilemedi.'; err.hidden = false; return; }
      var ok = document.getElementById('facSaved'); ok.hidden = false; setTimeout(function () { renderList(); }, 700);
    };
    if (id) { cfg.update(id, d).then(function (r) { done(r && r.ok); }); }
    else { cfg.create({ name: d.name }).then(function (r) {
      if (!r || !r.ok) return done(false);
      cfg.update(r.data.id, d).then(function (u) { done(u && u.ok); });
    }); }
  }

  /* ilk render — panel gizli olsa da hazır */
  if (H.ready && H.ready.then) H.ready.then(renderList); else renderList();
})();
