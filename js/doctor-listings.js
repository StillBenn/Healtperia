/* ============================================================
   Healthperia — doctor-listings.js
   Doctor "İlanlarım" panel: list + create/edit a treatment
   listing (taxonomy cascade, hospital/hotel select+add, ≤8
   photos, transport / advantages / price / maps). Turkish UI.
   Requires window.HP (hp-api.js) + window.HP_TREATMENT_DATA.
   Call HPListings.init() after the doctor guard resolves.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP, D = window.HP_TREATMENT_DATA || {};
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function byId(a){ var m={}; (a||[]).forEach(function(x){m[x.id]=x;}); return m; }
  var U=byId(D.units), TRm=byId(D.treatments), ME=byId(D.methods), C=byId(D.countries), CT=byId(D.cities);
  function nm(m,id){ return (m[id]&&m[id].name)||''; }
  function money(n){ try { return Number(n).toLocaleString('de-DE'); } catch(_){ return n; } }
  function curSym(c){ return ({EUR:'€',USD:'$',TRY:'₺',GBP:'£'})[c]||c; }

  var listEl, editorEl, hospitals = [], hotels = [], editing = null, sectionPhotos = {};
  var PHOTO_SECTIONS = [['process','Süreç'], ['place','Tedavi Yeri'], ['transport','Ulaşım'], ['hotel','Otel']];

  var Listings = window.HPListings = {};
  Listings.init = function () {
    listEl = document.getElementById('myListingsBody');
    editorEl = document.getElementById('listingEditorCard');
    if (!listEl || !editorEl) return;
    document.getElementById('newListingBtn').addEventListener('click', function () { openEditor(null); });
    Promise.all([H.listHospitals(), H.listHotels()]).then(function (r) { hospitals = r[0]; hotels = r[1]; });
    renderList();
  };

  function renderList() {
    H.myListings().then(function (rows) {
      if (!rows.length) { listEl.innerHTML = '<div class="empty-state sm"><p>Henüz ilanınız yok. "Yeni İlan" ile oluşturun.</p></div>'; return; }
      listEl.innerHTML = '<div class="table-wrap"><table class="data-table"><thead><tr>' +
        '<th>İlan</th><th>Kod</th><th>Durum</th><th>İşlemler</th></tr></thead><tbody>' +
        rows.map(function (l) {
          var title = nm(TRm, l.treatment_id) || l.headline || '—';
          var sub = [nm(C, l.country_id), nm(CT, l.city_id), nm(ME, l.method_id)].filter(Boolean).join(' · ');
          var badge = l.status === 'published' ? '<span class="badge badge-green">Yayında</span>' : '<span class="badge badge-amber">Taslak</span>';
          var pubBtn = l.status === 'published'
            ? '<button class="btn-mini warn" data-unpub="' + l.id + '">Yayından Kaldır</button>'
            : '<button class="btn-mini ok" data-pub="' + l.id + '">Yayınla</button>';
          return '<tr><td><span class="cell-user"><strong>' + esc(title) + '</strong></span><div class="muted-line sm">' + esc(sub) + '</div></td>' +
            '<td>' + esc(l.code) + '</td><td>' + badge + '</td>' +
            '<td><div class="row-actions">' + pubBtn +
              '<button class="btn-mini ok" data-edit="' + l.id + '">Düzenle</button>' +
              '<button class="btn-mini no" data-del="' + l.id + '">Sil</button></div></td></tr>';
        }).join('') + '</tbody></table></div>';
      listEl.querySelectorAll('[data-edit]').forEach(function (b){ b.addEventListener('click', function(){ var l = rows.filter(function(x){return x.id===b.dataset.edit;})[0]; openEditor(l); }); });
      listEl.querySelectorAll('[data-del]').forEach(function (b){ b.addEventListener('click', function(){ if (confirm('Bu ilanı silmek istiyor musunuz?')) H.deleteListing(b.dataset.del).then(renderList); }); });
      listEl.querySelectorAll('[data-pub]').forEach(function (b){ b.addEventListener('click', function(){ H.updateListing(b.dataset.pub, { status:'published' }).then(renderList); }); });
      listEl.querySelectorAll('[data-unpub]').forEach(function (b){ b.addEventListener('click', function(){ H.updateListing(b.dataset.unpub, { status:'draft' }).then(renderList); }); });
    });
  }

  function opts(arr, sel, ph) {
    return '<option value="">' + esc(ph || 'Seçiniz') + '</option>' + (arr || []).map(function (x) {
      return '<option value="' + x.id + '"' + (String(sel) === String(x.id) ? ' selected' : '') + '>' + esc(x.name) + '</option>';
    }).join('');
  }
  function placeOpts(arr, sel) {
    return '<option value="">Seçiniz</option>' + (arr || []).map(function (x) {
      return '<option value="' + x.id + '"' + (sel === x.id ? ' selected' : '') + '>' + esc(x.name) + (x.city ? ' — ' + esc(x.city) : '') + '</option>';
    }).join('') + '<option value="__new">+ Yeni ekle…</option>';
  }

  function openEditor(l) {
    editing = l;
    sectionPhotos = (l && l.section_photos && typeof l.section_photos === 'object') ? JSON.parse(JSON.stringify(l.section_photos)) : {};
    var v = function (k, d){ return (l && l[k] != null) ? l[k] : (d == null ? '' : d); };
    editorEl.hidden = false;
    editorEl.innerHTML =
      '<div class="card-head"><h3>' + (l ? 'İlanı Düzenle' : 'Yeni İlan') + '</h3></div>' +
      '<form id="listingForm" class="form-grid">' +
        '<label class="field"><span class="field-label">Ülke</span><span class="field-box"><select name="country">' + opts(D.countries, v('country_id')) + '</select></span></label>' +
        '<label class="field"><span class="field-label">Şehir</span><span class="field-box"><select name="city"></select></span></label>' +
        '<label class="field"><span class="field-label">Tıbbi Birim</span><span class="field-box"><select name="unit">' + opts(D.units, v('unit_id')) + '</select></span></label>' +
        '<label class="field"><span class="field-label">Tedavi</span><span class="field-box"><select name="treatment"></select></span></label>' +
        '<label class="field"><span class="field-label">Yöntem</span><span class="field-box"><select name="method"></select></span></label>' +
        '<label class="field"><span class="field-label">Üst Başlık</span><span class="field-box"><input name="headline" type="text" value="' + esc(v('headline')) + '" placeholder="Örn. Lazer Teknolojisi ile Ağrısız Tedavi" /></span></label>' +
        '<label class="field span-2"><span class="field-label">Tedavi Süreci</span><span class="field-box"><textarea name="process" rows="6" placeholder="Süreç açıklaması… (alt başlıkları ? ile bitirin)">' + esc(v('process')) + '</textarea></span></label>' +
        '<label class="field"><span class="field-label">Hastane</span><span class="field-box"><select name="hospital">' + placeOpts(hospitals, v('hospital_id')) + '</select></span></label>' +
        '<label class="field"><span class="field-label">Otel</span><span class="field-box"><select name="hotel">' + placeOpts(hotels, v('hotel_id')) + '</select></span></label>' +
        '<label class="field"><span class="field-label">Tedavi Yeri (konum adı)</span><span class="field-box"><input name="locName" type="text" value="' + esc(v('location_name')) + '" /></span></label>' +
        '<label class="field"><span class="field-label">Google Maps Linki</span><span class="field-box"><input name="locMaps" type="url" value="' + esc(v('location_maps_url')) + '" placeholder="https://maps.app.goo.gl/…" /></span></label>' +
        '<label class="field"><span class="field-label">Ulaşım Başlığı</span><span class="field-box"><input name="trTitle" type="text" value="' + esc(v('transport_title')) + '" placeholder="Örn. Full Transfer Hizmeti" /></span></label>' +
        '<label class="field"><span class="field-label">Ulaşım Görseli (URL)</span><span class="field-box"><input name="trImage" type="url" value="' + esc(v('transport_image')) + '" /></span></label>' +
        '<label class="field span-2"><span class="field-label">Ulaşım Açıklaması</span><span class="field-box"><textarea name="trDesc" rows="3">' + esc(v('transport_desc')) + '</textarea></span></label>' +
        '<label class="field span-2"><span class="field-label">Ek Avantajlar</span><span class="field-box"><textarea name="advantages" rows="2">' + esc(v('advantages')) + '</textarea></span></label>' +
        '<label class="field"><span class="field-label">Fiyat</span><span class="field-box"><input name="priceAmount" type="number" step="1" value="' + esc(v('price_amount')) + '" /></span></label>' +
        '<label class="field"><span class="field-label">Para Birimi</span><span class="field-box"><select name="priceCurrency">' +
          ['EUR','USD','TRY','GBP'].map(function(c){ return '<option value="'+c+'"'+((v('price_currency','EUR'))===c?' selected':'')+'>'+c+'</option>'; }).join('') + '</select></span></label>' +
        '<label class="field"><span class="field-label">Taksit Sayısı</span><span class="field-box"><input name="priceInstallments" type="number" step="1" value="' + esc(v('price_installments')) + '" /></span></label>' +
        '<label class="field"><span class="field-label">Aylık Ödeme</span><span class="field-box"><input name="priceMonthly" type="number" step="1" value="' + esc(v('price_monthly')) + '" /></span></label>' +
        '<div class="field span-2"><span class="field-label">Bölüm Fotoğrafları (her bölüm için en fazla 4 — detay sayfasında ilgili barın yanında görünür)</span>' +
          '<div id="dlSecPhotos"></div><span class="muted-line sm" id="dlPhotoStatus"></span></div>' +
        '<label class="field"><span class="field-label">Durum</span><span class="field-box"><select name="status"><option value="draft"' + (v('status','draft')==='draft'?' selected':'') + '>Taslak</option><option value="published"' + (v('status')==='published'?' selected':'') + '>Yayında</option></select></span></label>' +
        '<div class="form-actions span-2"><button type="button" class="btn-ghost sm" id="listingCancel">İptal</button><button type="submit" class="btn-primary sm">Kaydet</button><span class="save-ok" id="listingSaved" hidden>Kaydedildi ✓</span><span class="save-err" id="listingErr" hidden></span></div>' +
      '</form>';

    var f = document.getElementById('listingForm');
    /* cascade selects */
    function fillCity(){ f.city.innerHTML = opts(D.cities.filter(function(c){ return c.countryId === parseInt(f.country.value,10); }), l && l.city_id); }
    function fillTreat(){ f.treatment.innerHTML = opts(D.treatments.filter(function(t){ return t.unitId === parseInt(f.unit.value,10); }), l && l.treatment_id); fillMethod(); }
    function fillMethod(){ f.method.innerHTML = opts(D.methods.filter(function(m){ return m.treatmentId === parseInt(f.treatment.value,10); }), l && l.method_id); }
    fillCity(); fillTreat();
    f.country.addEventListener('change', fillCity);
    f.unit.addEventListener('change', fillTreat);
    f.treatment.addEventListener('change', fillMethod);
    /* hospital/hotel "+ new" */
    [['hospital', 'hospitals'], ['hotel', 'hotels']].forEach(function (pair) {
      f[pair[0]].addEventListener('change', function () {
        if (f[pair[0]].value !== '__new') return;
        var name = prompt('Yeni ' + (pair[0] === 'hospital' ? 'hastane' : 'otel') + ' adı:'); if (!name) { f[pair[0]].value = ''; return; }
        var maps = prompt('Google Maps linki (opsiyonel):') || '';
        var city = prompt('Şehir (opsiyonel):') || '';
        var fn = pair[0] === 'hospital' ? H.createHospital : H.createHotel;
        fn({ name: name, mapsUrl: maps, city: city }).then(function (r) {
          if (r && r.ok) {
            if (pair[0] === 'hospital') { hospitals.push(r.data); f.hospital.innerHTML = placeOpts(hospitals, r.data.id); }
            else { hotels.push(r.data); f.hotel.innerHTML = placeOpts(hotels, r.data.id); }
          } else { f[pair[0]].value = ''; alert('Eklenemedi.'); }
        });
      });
    });
    /* per-section photos */
    renderSectionPhotos();
    document.getElementById('dlSecPhotos').addEventListener('change', function (e) {
      var inp = e.target.closest('input[type=file]'); if (!inp) return;
      var key = inp.dataset.key, st = document.getElementById('dlPhotoStatus');
      var files = [].slice.call(inp.files || []);
      sectionPhotos[key] = sectionPhotos[key] || [];
      files = files.slice(0, Math.max(0, 4 - sectionPhotos[key].length));
      if (!files.length) { st.textContent = 'Her bölüm için en fazla 4 fotoğraf.'; return; }
      st.textContent = 'Yükleniyor…';
      Promise.all(files.map(function (file) { return H.uploadListingPhoto(file); })).then(function (res) {
        res.forEach(function (r) { if (r && r.ok && r.url) sectionPhotos[key].push(r.url); });
        st.textContent = ''; inp.value = ''; renderSectionPhotos();
      });
    });
    document.getElementById('listingCancel').addEventListener('click', function () { editorEl.hidden = true; });
    f.addEventListener('submit', onSave);
    editorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderSectionPhotos() {
    var box = document.getElementById('dlSecPhotos'); if (!box) return;
    box.innerHTML = PHOTO_SECTIONS.map(function (s) {
      var key = s[0], a = sectionPhotos[key] || [];
      var tiles = a.map(function (u, i) {
        return '<div class="dl-photo"><img src="' + esc(u) + '" alt=""><button type="button" class="dl-photo-x" data-key="' + key + '" data-i="' + i + '" aria-label="Kaldır">×</button></div>';
      }).join('');
      var addTile = a.length < 4 ? '<label class="dl-addtile"><input type="file" data-key="' + key + '" accept="image/*" multiple hidden>+</label>' : '';
      return '<div class="dl-secblock"><div class="dl-secblock-head">' + esc(s[1]) + ' <span>(' + a.length + '/4)</span></div>' +
        '<div class="dl-photos">' + tiles + addTile + '</div></div>';
    }).join('');
    box.querySelectorAll('.dl-photo-x').forEach(function (b) {
      b.addEventListener('click', function () { (sectionPhotos[b.dataset.key] || []).splice(parseInt(b.dataset.i, 10), 1); renderSectionPhotos(); });
    });
  }

  function num(v){ return v === '' || v == null ? null : Number(v); }
  function onSave(e) {
    e.preventDefault();
    var f = e.target;
    var data = {
      headline: f.headline.value.trim(), process: f.process.value.trim(),
      countryId: num(f.country.value), cityId: num(f.city.value), unitId: num(f.unit.value),
      treatmentId: num(f.treatment.value), methodId: num(f.method.value),
      hospitalId: f.hospital.value && f.hospital.value !== '__new' ? f.hospital.value : null,
      hotelId: f.hotel.value && f.hotel.value !== '__new' ? f.hotel.value : null,
      locationName: f.locName.value.trim(), locationMapsUrl: f.locMaps.value.trim(),
      transportTitle: f.trTitle.value.trim(), transportDesc: f.trDesc.value.trim(), transportImage: f.trImage.value.trim(),
      advantages: f.advantages.value.trim(),
      priceAmount: num(f.priceAmount.value), priceCurrency: f.priceCurrency.value,
      priceInstallments: num(f.priceInstallments.value), priceMonthly: num(f.priceMonthly.value),
      sectionPhotos: sectionPhotos, status: f.status.value
    };
    var err = document.getElementById('listingErr'); err.hidden = true;
    if (!data.unitId || !data.treatmentId) { err.textContent = 'Lütfen en az Tıbbi Birim ve Tedavi seçin.'; err.hidden = false; return; }
    var btn = f.querySelector('button[type="submit"]'); btn.disabled = true;
    var p = editing ? H.updateListing(editing.id, data) : H.createListing(data);
    p.then(function (r) {
      btn.disabled = false;
      if (r && r.ok === false) { err.textContent = r.error || 'Kaydedilemedi.'; err.hidden = false; return; }
      var ok = document.getElementById('listingSaved'); ok.hidden = false; setTimeout(function(){ ok.hidden = true; }, 2000);
      editorEl.hidden = true; renderList();
    });
  }
})();
