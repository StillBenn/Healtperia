/* ============================================================
   Healthperia — doctor-detail.js
   Doctor profile page: code, CV/academic/specialties/treatments
   (left), identity card with photo + favorite (crown) + share +
   "İletişime Geç" (right), and the doctor's published listing
   cards (bottom, left-aligned with content). Reads ?id=.
   Public page; uses window.HP + HP_TREATMENT_DATA.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP, DATA = window.HP_TREATMENT_DATA || {};
  var root = document.getElementById('ddRoot');
  if (!root || !H) return;

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function T(k, fb){ return (window.HPI && HPI.t) ? HPI.t(k, fb) : (fb || k); }
  function byId(arr){ var m = {}; (arr || []).forEach(function (x){ m[x.id] = x; }); return m; }
  var U = byId(DATA.units), TRm = byId(DATA.treatments), C = byId(DATA.countries), CT = byId(DATA.cities), ME = byId(DATA.methods);
  function nm(map, id){ return (map[id] && map[id].name) || ''; }
  function initials(name){ if (!name) return '?'; var p = String(name).replace(/^(Op\.|Uzm\.|Prof\.|Doç\.|Dr\.)\s*/ig,'').trim().split(/\s+/); return (((p[0]||'')[0]||'')+((p[1]||'')[0]||'')).toUpperCase()||'?'; }
  function money(n){ try { return Number(n).toLocaleString('de-DE'); } catch(_) { return n; } }
  function curSym(c){ return ({ EUR:'€', USD:'$', TRY:'₺', GBP:'£' })[c] || (c ? (' ' + c) : ''); }
  function doctorCode(id){ var d = String(id || '').replace(/[^0-9a-f]/gi, ''); var n = parseInt(d.slice(0, 8), 16) || 0; return 'HP' + (1000 + (n % 9000)); }
  function uniq(a){ var seen = {}, out = []; a.forEach(function (x){ if (x && !seen[x]) { seen[x] = 1; out.push(x); } }); return out; }

  function qs(name){ return new URLSearchParams(location.search).get(name); }
  var id = qs('id');
  var doctor = null, listings = [], favCount = 0, isFav = false, me = null;

  H.ready.then(function () { me = H.currentUser(); load(); });

  function load(){
    if (!id) { root.innerHTML = empty(); return; }
    Promise.all([H.getDoctor(id), H.doctorListings(id), H.favoriteCount('doctor', id)]).then(function (r) {
      doctor = r[0]; listings = r[1] || []; favCount = r[2] || 0;
      if (!doctor) { root.innerHTML = empty(); return; }
      if (me) H.listFavorites().then(function (favs) { isFav = favs.some(function (f){ return f.kind === 'doctor' && f.ref_id === id; }); render(); });
      else render();
    });
    if (window.HPI && HPI.onChange) HPI.onChange(function () { if (doctor) render(); });
  }
  function empty(){ return '<div class="td-empty"><p>' + esc(T('dd.notFound','Doktor bulunamadı.')) + '</p><a class="btn-ghost sm" href="doctor-index.html">' + esc(T('dd.back','Doktor İndeksine dön')) + '</a></div>'; }

  /* Şimdilik tüm doktorlar için tek sabit görsel (gerçek fotolar yüklenene dek) — indeksle aynı. */
  var DOCTOR_IMG = '../assets/images/doctor.png';
  function avatarHtml(name, url){
    return '<div class="dd-photo"><img src="' + DOCTOR_IMG + '" alt=""></div>';
  }
  function bullets(text){ return '<ul class="dd-bullets">' + String(text).split(/\n+/).filter(function (x){ return x.trim(); }).map(function (t){ return '<li>' + esc(t.replace(/^[-•\s]+/, '').trim()) + '</li>'; }).join('') + '</ul>'; }
  function paras(text){ return String(text).split(/\n{2,}|\n/).filter(function (x){ return x.trim(); }).map(function (t){ return '<p>' + esc(t.trim()) + '</p>'; }).join(''); }

  function render(){
    var d = doctor;
    var branslar = uniq([d.specialty].concat(listings.map(function (l){ return nm(U, l.unit_id); })));
    var tedaviler = uniq(listings.map(function (l){ return nm(TRm, l.treatment_id); }));
    var loc = [d.city, d.country].filter(Boolean).join(' / ');

    var left =
      '<div class="dd-col-left">' +
        (d.bio ? sec(T('dd.cv','Özgeçmiş'), '<div class="dd-rich">' + paras(d.bio) + '</div>') : '') +
        (d.academic ? sec(T('dd.academic','Akademik Bilgi'), bullets(d.academic)) : '') +
        (branslar.length ? sec(T('dd.specialties','Branşlar'), bullets(branslar.join('\n'))) : '') +
        (tedaviler.length ? sec(T('dd.treatments','Tedaviler'), '<div class="dd-treat-cols">' + bullets(tedaviler.join('\n')) + '</div>') : '') +
      '</div>';

    var right =
      '<aside class="dd-col-right"><div class="dd-id">' +
        avatarHtml(d.name, d.avatar_url) +
        '<h2 class="dd-name">' + esc(d.name || '—') + '</h2>' +
        (loc ? '<div class="dd-loc">' + esc(loc) + '</div>' : '') +
        '<div class="dd-actbar">' +
          '<div class="dd-actrow">' +
            '<button class="td-act dd-share" type="button">' + ICON.share + '<span>' + esc(T('td.share','Paylaş')) + '</span></button>' +
            '<button class="td-act dd-fav' + (isFav ? ' is-on' : '') + '" type="button">' + ICON.heart + '<span>' + esc(isFav ? T('td.favOn','Favorilerde') : T('td.fav','Favorilere Ekle')) + '</span><i class="dd-favc">' + favCount + '</i></button>' +
          '</div>' +
          '<button class="btn-primary dd-contact" type="button">' + ICON.msg + '<span>' + esc(T('dd.contact','İletişime Geç')) + '</span></button>' +
        '</div>' +
      '</div></aside>';

    var bottom = listings.length
      ? '<section class="dd-listings"><h3 class="dd-listings-head">' + esc(T('dd.listingsHead','Healthperia Tedavileri')) + '</h3>' +
          '<div class="dd-listings-grid">' + listings.map(listingCard).join('') + '</div></section>'
      : '';

    root.innerHTML = '<div class="dd-code">' + esc(doctorCode(d.id)) + '</div>' +
      '<div class="dd-layout">' + left + right + '</div>' + bottom;
    wire();
  }

  function sec(title, body){ return '<section class="dd-sec"><h3 class="dd-sec-head">' + esc(title) + '</h3>' + body + '</section>'; }

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
    var loc = [nm(C, l.country_id), nm(CT, l.city_id)].filter(Boolean).join(', ');
    var price = priceRange(l);
    var sp = l.section_photos || {};
    var photo = (sp.process && sp.process[0]) || (sp.place && sp.place[0]) || '';
    return '<a class="result-card dd-lcard" href="treatment-detail.html?id=' + encodeURIComponent(l.id) + '">' +
      '<div class="result-media"' + (photo ? ' style="background-image:url(' + esc(photo) + ');background-size:cover;background-position:center"' : '') + '></div>' +
      '<div class="result-body">' +
        '<h3 class="result-name">' + esc(trName) + '</h3>' +
        (meName ? '<p class="result-method">' + esc(meName) + '</p>' : '') +
        (loc ? '<p class="result-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>' + esc(loc) + '</p>' : '') +
        '<div class="result-foot">' + (price ? '<span class="result-price">' + esc(price) + '</span>' : '<span></span>') +
          '<span class="result-cta">' + esc(T('ti.cta','Detayları İncele →')) + '</span></div>' +
      '</div></a>';
  }

  function wire(){
    var c = root.querySelector('.dd-contact');
    if (c) c.addEventListener('click', function () { location.href = 'dashboard-patient.html?msgDoctor=' + encodeURIComponent(doctor.id) + '&name=' + encodeURIComponent(doctor.name || ''); });
    var sh = root.querySelector('.dd-share');
    if (sh) sh.addEventListener('click', function () { if (window.HPShare) HPShare.open(location.href, doctor.name || 'Healthperia'); });
    var fav = root.querySelector('.dd-fav');
    if (fav) fav.addEventListener('click', toggleFav);
  }
  function toggleFav(){
    if (!me) { location.href = 'auth.html'; return; }
    var fav = root.querySelector('.dd-fav');
    if (isFav) { H.removeFavorite('doctor', doctor.id).then(function (){ isFav = false; favCount = Math.max(0, favCount - 1); paintFav(fav); }); }
    else { H.addFavorite({ kind: 'doctor', refId: doctor.id, label: doctor.name, meta: { specialty: doctor.specialty, loc: [doctor.city, doctor.country].filter(Boolean).join(', ') } })
      .then(function (){ isFav = true; favCount += 1; paintFav(fav); }); }
  }
  function paintFav(fav){ if (!fav) return; fav.classList.toggle('is-on', isFav); var c = fav.querySelector('.dd-favc'); if (c) c.textContent = favCount; }
  function copy(text, btn){
    var ok = function (){ if (btn) { btn.classList.add('copied'); setTimeout(function (){ btn.classList.remove('copied'); }, 1200); } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, ok);
    else { try { var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); ok(); } catch(_){} }
  }

  var ICON = {
    msg:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
    crown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l4.5 4L12 5l4.5 6L21 7l-1.7 11H4.7L3 7z"/></svg>',
    heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>'
  };
})();
