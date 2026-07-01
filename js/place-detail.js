/* ============================================================
   Healthperia — place-detail.js
   Hastane & Klinik DETAY sayfası (tek dosya; root id'sinden tip algılar).
   - #hdRoot → hastane (kod HP####, Kapasitemiz/Konfor/Standartlar)
   - #cdRoot → klinik  (kod TP####, Tedavilerimiz)
   Sol: ad + açıklama + Neredeyiz + Tıbbi Birimlerimiz + [tip bölümleri].
   Sağ: logo + foto galerisi (lightbox) + paylaş/favori sayaç + İletişime Geç.
   Alt: Healthperia Tedavileri (ilan kartları). Public; window.HP + HP_TREATMENT_DATA.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP, DATA = window.HP_TREATMENT_DATA || {};
  var hospRoot = document.getElementById('hdRoot');
  var cliRoot  = document.getElementById('cdRoot');
  var root = hospRoot || cliRoot;
  if (!root || !H) return;

  var KIND = hospRoot ? 'hospital' : 'clinic';
  var PFX  = KIND === 'hospital' ? 'HP' : 'TP';
  var P = KIND === 'hospital'
    ? { where:'hi.where', units:'hi.units', listings:'hi.listings', contact:'hi.contact', share:'hi.share', fav:'hi.fav', notFound:'hi.notFound', back:'hi.back', backHref:'hospital-index.html' }
    : { where:'cli.where', units:'cli.units', listings:'cli.listings', contact:'cli.contact', share:'cli.share', fav:'cli.fav', notFound:'cli.notFound', back:'cli.back', backHref:'clinic-index.html' };

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function T(k, fb){ return (window.HPI && HPI.t) ? HPI.t(k, fb) : (fb || k); }
  function up(s){ return String(s || '').toLocaleUpperCase('tr'); }
  function byId(arr){ var m = {}; (arr || []).forEach(function (x){ m[x.id] = x; }); return m; }
  var C = byId(DATA.countries), CT = byId(DATA.cities), TRm = byId(DATA.treatments), ME = byId(DATA.methods);
  function nm(map, id){ return (map[id] && map[id].name) || ''; }
  function money(n){ try { return Number(n).toLocaleString('de-DE'); } catch(_) { return n; } }
  function curSym(c){ return ({ EUR:'€', USD:'$', TRY:'₺', GBP:'£' })[c] || (c ? (' ' + c) : ''); }
  function lines(text){ return String(text || '').split(/\n+/).map(function (s){ return s.trim(); }).filter(Boolean); }
  function bullets(text){ return '<ul class="pd-bullets">' + lines(text).map(function (t){ return '<li>' + esc(t.replace(/^[-•\s]+/, '')) + '</li>'; }).join('') + '</ul>'; }
  function paras(text){ return String(text || '').split(/\n{2,}|\n/).filter(function (x){ return x.trim(); }).map(function (t){ return '<p>' + esc(t.trim()) + '</p>'; }).join(''); }
  function arr(x){ return Array.isArray(x) ? x : []; }
  function code(id){ var d = String(id || '').replace(/[^0-9a-f]/gi, ''); var n = parseInt(d.slice(0, 8), 16) || 0; return PFX + (1000 + (n % 9000)); }

  function qs(name){ return new URLSearchParams(location.search).get(name); }
  var id = qs('id');
  var place = null, listings = [], favCount = 0, isFav = false, me = null;

  H.ready.then(function () { me = H.currentUser(); load(); });

  function load(){
    if (!id) { root.innerHTML = empty(); return; }
    var get  = KIND === 'hospital' ? H.getHospital(id) : H.getClinic(id);
    var list = KIND === 'hospital' ? H.hospitalListings(id) : H.clinicListings(id);
    Promise.all([get, list, H.favoriteCount(KIND, id)]).then(function (r) {
      place = r[0]; listings = r[1] || []; favCount = r[2] || 0;
      if (!place) { root.innerHTML = empty(); return; }
      if (me) H.listFavorites().then(function (favs) { isFav = favs.some(function (f){ return f.kind === KIND && f.ref_id === id; }); render(); });
      else render();
    });
    if (window.HPI && HPI.onChange) HPI.onChange(function () { if (place) render(); });
  }
  function empty(){ return '<div class="td-empty"><p>' + esc(T(P.notFound,'Bulunamadı.')) + '</p><a class="btn-ghost sm" href="' + P.backHref + '">' + esc(T(P.back,'Geri dön')) + '</a></div>'; }

  function render(){
    var d = place;
    var loc = [d.country, d.city].filter(Boolean).join(' - ');

    /* sol bölümler */
    var left = '<div class="pd-col-left">' +
      '<h1 class="pd-name">' + esc(up(d.name)) + '</h1>' +
      (d.description ? '<div class="pd-rich">' + paras(d.description) + '</div>' : '') +
      sec(T(P.where,'Neredeyiz'),
        (loc ? '<p class="pd-loc-line">' + esc(loc) + '</p>' : '') +
        (d.maps_url ? '<a class="pd-maps" href="' + esc(d.maps_url) + '" target="_blank" rel="noopener">' + esc(d.maps_url) + '</a>' : '')) +
      (d.units ? sec(T(P.units,'Tıbbi Birimlerimiz'), '<div class="pd-cols">' + bullets(d.units) + '</div>') : '');

    if (KIND === 'hospital') {
      var blocks = '';
      if (d.capacity)  blocks += capBlock(T('hi.capacity','Kapasitemiz'), d.capacity);
      if (d.comfort)   blocks += '<div class="pd-mini"><h3 class="pd-sec-head">' + esc(T('hi.comfort','Konfor')) + '</h3>' + bullets(d.comfort) + '</div>';
      if (d.standards) blocks += '<div class="pd-mini"><h3 class="pd-sec-head">' + esc(T('hi.standards','Standartlar')) + '</h3>' + bullets(d.standards) + '</div>';
      if (blocks) left += '<div class="pd-trio">' + blocks + '</div>';
    } else {
      if (d.treatments) left += sec(T('cli.treatments','Tedavilerimiz'), '<div class="pd-cols">' + bullets(d.treatments) + '</div>');
    }
    left += '</div>';

    /* sağ sütun */
    var photos = arr(d.photos);
    /* foto yoksa placeholder gösterme — galeri hiç render edilmez */
    var gallery = photos.length
      ? '<div class="pd-gallery">' + photos.slice(0, 6).map(function (u, i){ return '<button class="pd-photo" type="button" data-i="' + i + '" style="background-image:url(' + esc(u) + ')"></button>'; }).join('') + '</div>'
      : '';
    var logo = d.logo_url
      ? '<div class="pd-logo"><img src="' + esc(d.logo_url) + '" alt=""></div>'
      : '<div class="pd-logo is-ph">' + ICON.building + '<span>' + esc(d.name || 'Logo') + '</span></div>';

    var right = '<aside class="pd-col-right">' + logo + gallery +
      '<div class="dd-actbar">' +
        '<div class="dd-actrow">' +
          '<button class="td-act pd-share" type="button">' + ICON.share + '<span>' + esc(T(P.share,'Paylaş')) + '</span></button>' +
          '<button class="td-act dd-fav pd-fav' + (isFav ? ' is-on' : '') + '" type="button">' + ICON.heart + '<span>' + esc(isFav ? T('td.favOn','Favorilerde') : T(P.fav,'Favorilere Ekle')) + '</span><i class="dd-favc">' + favCount + '</i></button>' +
        '</div>' +
        '<button class="btn-primary pd-contact" type="button">' + ICON.msg + '<span>' + esc(T(P.contact,'İletişime Geç')) + '</span></button>' +
      '</div>' +
    '</aside>';

    var bottom = listings.length
      ? '<section class="dd-listings"><h3 class="dd-listings-head">' + esc(T(P.listings,'Healthperia Tedavileri')) + '</h3>' +
          '<div class="dd-listings-grid">' + listings.map(listingCard).join('') + '</div></section>'
      : '';

    root.innerHTML = '<div class="pd-code">' + esc(code(d.id)) + '</div>' +
      '<div class="pd-layout">' + left + right + '</div>' + bottom;
    wire();
  }

  function sec(title, body){ return '<section class="pd-sec"><h3 class="pd-sec-head">' + esc(title) + '</h3>' + body + '</section>'; }
  function capBlock(title, text){
    var rows = lines(text).map(function (l){ var p = l.split('|'); return '<li><span>' + esc((p[0]||'').trim()) + '</span><b>' + esc((p[1]||'').trim()) + '</b></li>'; }).join('');
    return '<div class="pd-mini"><h3 class="pd-sec-head">' + esc(title) + '</h3><ul class="pd-cap">' + rows + '</ul></div>';
  }

  function priceRange(l){
    var sym = curSym(l.price_currency);
    if (l.price_min != null && l.price_max != null) return money(l.price_min) + ' – ' + money(l.price_max) + ' ' + sym;
    if (l.price_min != null) return money(l.price_min) + ' ' + sym;
    if (l.price_max != null) return money(l.price_max) + ' ' + sym;
    if (l.price_amount != null) return money(l.price_amount) + ' ' + sym;
    return '';
  }
  function listingCard(l){
    var trName = nm(TRm, l.treatment_id) || l.headline || '';
    var meName = nm(ME, l.method_id) || '';
    var doc = (l.doctor && l.doctor.name) || '';
    var loc = [nm(C, l.country_id), nm(CT, l.city_id)].filter(Boolean).join(', ');
    var price = priceRange(l);
    var sp = l.section_photos || {};
    var photo = (Array.isArray(l.photos) && l.photos[0]) || (sp.process && sp.process[0]) || (sp.place && sp.place[0]) || '';
    return '<a class="result-card dd-lcard" href="treatment-detail.html?id=' + encodeURIComponent(l.id) + '">' +
      '<div class="result-media"' + (photo ? ' style="background-image:url(' + esc(photo) + ');background-size:cover;background-position:center"' : '') + '></div>' +
      '<div class="result-body">' +
        '<h3 class="result-name">' + esc(trName) + '</h3>' +
        (meName ? '<p class="result-method">' + esc(meName) + '</p>' : '') +
        (doc ? '<p class="result-doc">' + ICON.user + esc(doc) + '</p>' : '') +
        (loc ? '<p class="result-loc">' + ICON.loc + esc(loc) + '</p>' : '') +
        '<div class="result-foot">' + (price ? '<span class="result-price">' + esc(price) + '</span>' : '<span></span>') +
          '<span class="result-cta">' + esc(T('ti.cta','Detayları İncele →')) + '</span></div>' +
      '</div></a>';
  }

  function wire(){
    var sh = root.querySelector('.pd-share');
    if (sh) sh.addEventListener('click', function () { if (window.HPShare) HPShare.open(location.href, place.name || 'Healthperia'); });
    var fav = root.querySelector('.pd-fav');
    if (fav) fav.addEventListener('click', toggleFav);
    var con = root.querySelector('.pd-contact');
    if (con) con.addEventListener('click', function () {
      if (listings.length && listings[0].doctor_id) location.href = 'dashboard-patient.html?msgDoctor=' + encodeURIComponent(listings[0].doctor_id) + '&name=' + encodeURIComponent((listings[0].doctor && listings[0].doctor.name) || '');
      else location.href = me ? 'dashboard-patient.html' : 'auth.html';
    });
    /* lightbox */
    var photos = arr(place.photos);
    root.querySelectorAll('.pd-photo:not(.is-ph)').forEach(function (b) {
      b.addEventListener('click', function () { openLightbox(photos, parseInt(b.getAttribute('data-i'), 10) || 0); });
    });
  }
  function toggleFav(){
    if (!me) { location.href = 'auth.html'; return; }
    var fav = root.querySelector('.pd-fav');
    if (isFav) { H.removeFavorite(KIND, place.id).then(function (){ isFav = false; favCount = Math.max(0, favCount - 1); paintFav(fav); }); }
    else { H.addFavorite({ kind: KIND, refId: place.id, label: place.name, meta: { loc: [place.country, place.city].filter(Boolean).join(', ') } })
      .then(function (){ isFav = true; favCount += 1; paintFav(fav); }); }
  }
  function paintFav(fav){ if (!fav) return; fav.classList.toggle('is-on', isFav); var c = fav.querySelector('.dd-favc'); if (c) c.textContent = favCount;
    var sp = fav.querySelector('span'); if (sp) sp.textContent = isFav ? T('td.favOn','Favorilerde') : T(P.fav,'Favorilere Ekle'); }

  /* ---------- lightbox ---------- */
  function openLightbox(photos, start){
    if (!photos.length) return;
    var i = start || 0;
    var lb = document.createElement('div'); lb.className = 'pd-lightbox';
    var thumbs = photos.length > 1
      ? '<div class="pd-lb-thumbs">' + photos.map(function (u, k){ return '<button class="pd-lb-thumb" type="button" data-i="' + k + '"><img src="' + esc(u) + '" alt=""></button>'; }).join('') + '</div>'
      : '';
    lb.innerHTML = '<button class="pd-lb-close" aria-label="Kapat">&times;</button>' +
      '<button class="pd-lb-nav prev" aria-label="Önceki">&#8249;</button>' +
      '<div class="pd-lb-stage"><img class="pd-lb-img" src="' + esc(photos[i]) + '" alt="">' + thumbs + '</div>' +
      '<button class="pd-lb-nav next" aria-label="Sonraki">&#8250;</button>';
    document.body.appendChild(lb);
    var img = lb.querySelector('.pd-lb-img');
    var thumbEls = [].slice.call(lb.querySelectorAll('.pd-lb-thumb'));
    function go(n){ i = (n + photos.length) % photos.length; img.src = photos[i];
      thumbEls.forEach(function (t, k){ t.classList.toggle('is-active', k === i); }); }
    thumbEls.forEach(function (t){ t.addEventListener('click', function (e){ e.stopPropagation(); go(parseInt(t.dataset.i, 10)); }); });
    go(i);
    lb.querySelector('.prev').addEventListener('click', function (e){ e.stopPropagation(); go(i - 1); });
    lb.querySelector('.next').addEventListener('click', function (e){ e.stopPropagation(); go(i + 1); });
    function close(){ lb.remove(); document.removeEventListener('keydown', onKey); }
    lb.querySelector('.pd-lb-close').addEventListener('click', close);
    lb.addEventListener('click', function (e){ if (e.target === lb) close(); });
    function onKey(e){ if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') go(i - 1); else if (e.key === 'ArrowRight') go(i + 1); }
    document.addEventListener('keydown', onKey);
  }

  var ICON = {
    msg:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
    crown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l4.5 4L12 5l4.5 6L21 7l-1.7 11H4.7L3 7z"/></svg>',
    heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    loc:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>',
    building:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 21v-4h6v4M8 7h2M14 7h2M8 11h2M14 11h2"/></svg>'
  };
})();
