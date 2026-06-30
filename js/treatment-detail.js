/* ============================================================
   Healthperia — treatment-detail.js
   Premium treatment listing detail page. Summary card, an action
   bar BELOW the card (İletişime Geç / Favori / Paylaş), and
   accordion sections where EACH section has its own text + photo
   column (photos hidden with the text when collapsed). Reads
   ?id=<uuid> or ?code=<HP-..>. Public page (anon RLS reads
   published) + HP_TREATMENT_DATA.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP, DATA = window.HP_TREATMENT_DATA || {};
  var root = document.getElementById('tdRoot');
  if (!root || !H) return;

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function T(k, fb){ return (window.HPI && HPI.t) ? HPI.t(k, fb) : (fb || k); }
  function byId(arr){ var m = {}; (arr || []).forEach(function (x){ m[x.id] = x; }); return m; }
  var C = byId(DATA.countries), CT = byId(DATA.cities), U = byId(DATA.units), TRm = byId(DATA.treatments), ME = byId(DATA.methods);
  function nm(map, id){ return (map[id] && map[id].name) || ''; }
  function initials(name){ if (!name) return '?'; var p = String(name).replace(/^Dr\.?\s*/i,'').trim().split(/\s+/); return (((p[0]||'')[0]||'')+((p[1]||'')[0]||'')).toUpperCase()||'?'; }
  function money(n){ try { return Number(n).toLocaleString('de-DE'); } catch(_) { return n; } }
  function curSym(c){ return ({ EUR:'€', USD:'$', TRY:'₺', GBP:'£' })[c] || (c ? (' ' + c) : ''); }
  function arr(x){ return Array.isArray(x) ? x : []; }

  var SVG = {
    msg:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
    maps: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5L5 20"/></svg>',
    chev: '<svg class="td-acc-caret" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    /* section icons */
    process:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2 6 4-14 2 8h6"/></svg>',
    doctor:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M12 8v6M9 11h6"/></svg>',
    place:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    transport:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14M5 17a2 2 0 0 1-2-2v-3l2-5h12l2 5v3a2 2 0 0 1-2 2M7 17v2M17 17v2"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/></svg>',
    hotel:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 14h18M7 8V6M3 18v2M21 18v2"/><path d="M7 14v-2a2 2 0 0 1 2-2h2v4"/></svg>',
    adv:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.5 5.2 5.5.8-4 3.9 1 5.6L12 16l-5 2.5 1-5.6-4-3.9 5.5-.8z"/></svg>',
    price:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="M16 12h4M16 16h4M9 9h.01"/></svg>'
  };

  function qs(name){ return new URLSearchParams(location.search).get(name); }
  var listingRef = qs('id') || qs('code');
  var listing = null, isFav = false, me = null, photoSets = {};

  H.ready.then(function () { me = H.currentUser(); load(); });

  function load(){
    if (!listingRef) { root.innerHTML = empty(T('td.notFound','İlan bulunamadı.')); return; }
    H.getListing(listingRef).then(function (l) {
      if (!l) { root.innerHTML = empty(T('td.notFound','İlan bulunamadı.')); return; }
      listing = l;
      if (me) H.listFavorites().then(function (favs) {
        isFav = favs.some(function (f){ return f.kind === 'listing' && (f.ref_id === l.code || f.ref_id === l.id); });
        render();
      }); else render();
    });
    if (window.HPI && HPI.onChange) HPI.onChange(function () { if (listing) render(); });
  }
  function empty(msg){ return '<div class="td-empty"><p>' + esc(msg) + '</p><a class="btn-ghost sm" href="treatment-index.html">' + esc(T('td.backToIndex','Tedavi İndeksine dön')) + '</a></div>'; }

  function avatarHtml(name, url){
    if (url) return '<span class="hp-avatar lg"><img src="' + esc(url) + '" alt="" loading="lazy"></span>';
    return '<span class="hp-avatar lg is-initials">' + esc(initials(name)) + '</span>';
  }
  function paras(text){ return String(text).split(/\n{2,}|\n/).filter(function (x){ return x.trim(); }).map(function (t){ return '<p>' + esc(t.trim()) + '</p>'; }).join(''); }
  function processHtml(text){
    return String(text).split(/\n+/).filter(function (x){ return x.trim(); })
      .map(function (line){ line = line.trim(); return /\?\s*$/.test(line) ? '<h4>' + esc(line) + '</h4>' : '<p>' + esc(line) + '</p>'; }).join('');
  }

  /* ---------- render ---------- */
  function render(){
    var l = listing, doc = l.doctor || {}, sp = l.section_photos || {};
    photoSets = {};
    var firstPhoto = arr(sp.process)[0] || arr(sp.place)[0] || arr(l.photos)[0] || doc.avatar_url || '';

    var chips = [
      [T('ti.step.country','Ülke'), nm(C, l.country_id)],
      [T('ti.step.city','Şehir'), nm(CT, l.city_id)],
      [T('ti.step.unit','Tıbbi Birim'), nm(U, l.unit_id)],
      [T('ti.step.treatment','Tedavi'), nm(TRm, l.treatment_id)],
      [T('ti.step.method','Yöntem'), nm(ME, l.method_id)],
      [T('ti.code','Kod'), l.code]
    ].filter(function (c){ return c[1]; });

    var thumb = firstPhoto
      ? '<span class="td-sum-thumb"><img src="' + esc(firstPhoto) + '" alt="" /></span>'
      : '<span class="td-sum-thumb is-ph">' + SVG.doctor + '</span>';

    var summary =
      '<section class="td-summary">' + thumb +
        '<div class="td-sum-main">' +
          '<h1 class="td-headline">' + esc(l.headline || nm(TRm, l.treatment_id) || T('card.treatment.title','Tedavi')) + '</h1>' +
          '<div class="td-chips">' + chips.map(function (c){ return '<span class="td-chip"><b>' + esc(c[0]) + '</b><i>' + esc(c[1]) + '</i></span>'; }).join('') + '</div>' +
        '</div>' +
      '</section>' +
      /* actions BELOW the card, aligned right */
      '<div class="td-actbar">' +
        '<button class="btn-primary td-msg" type="button">' + SVG.msg + '<span>' + esc(T('td.contact','İletişime Geç')) + '</span></button>' +
        '<button class="td-act td-fav' + (isFav ? ' is-on' : '') + '" type="button">' + SVG.heart + '<span>' + esc(isFav ? T('td.favOn','Favorilerde') : T('td.fav','Favorilere Ekle')) + '</span></button>' +
        '<button class="td-act td-share" type="button">' + SVG.share + '<span>' + esc(T('td.share','Paylaş')) + '</span></button>' +
      '</div>';

    /* ---- accordion sections; each carries its own photo column ---- */
    var secs = [];
    if (l.process) secs.push(sec('process', SVG.process, T('td.s.process','Tedavi Süreci'), '<div class="td-rich">' + processHtml(l.process) + '</div>', arr(sp.process), true));
    if (doc.name || doc.bio) secs.push(sec('doctor', SVG.doctor, T('td.s.doctor','Doktor Bilgisi'),
      '<div class="td-doc">' + avatarHtml(doc.name, doc.avatar_url) + '<div class="td-doc-meta"><strong>' + esc(doc.name || '') + '</strong>' +
        (doc.specialty ? '<span class="td-doc-spec">' + esc(doc.specialty) + '</span>' : '') + '</div></div>' +
        (doc.bio ? '<div class="td-rich">' + paras(doc.bio) + '</div>' : ''),
      [], false));
    var hospName = (l.hospital && l.hospital.name) || l.location_name;
    var hospMaps = (l.hospital && l.hospital.maps_url) || l.location_maps_url;
    var hospDesc = (l.hospital && l.hospital.description) || '';
    if (hospName) secs.push(sec('place', SVG.place, T('td.s.place','Tedavi Yeri'),
      placeBody(hospName, hospMaps, hospDesc), mergeImgs(sp.place, l.hospital && l.hospital.image_url), true));
    if (l.transport_title || l.transport_desc) secs.push(sec('transport', SVG.transport, T('td.s.transport','Ulaşım Bilgisi'),
      placeBody(l.transport_title, null, l.transport_desc), mergeImgs(sp.transport, l.transport_image), true));
    if (l.hotel && l.hotel.name) secs.push(sec('hotel', SVG.hotel, T('td.s.hotel','Otel Bilgisi'),
      placeBody(l.hotel.name, l.hotel.maps_url, l.hotel.description), mergeImgs(sp.hotel, l.hotel.image_url), true));
    if (l.advantages) secs.push(sec('adv', SVG.adv, T('td.s.adv','Ek Avantajlar'), '<div class="td-rich">' + paras(l.advantages) + '</div>', [], false));
    if (l.price_amount != null) secs.push(sec('price', SVG.price, T('td.s.price','Fiyat Bilgisi'), priceHtml(l), [], false));

    root.innerHTML = summary + '<div class="td-acc-list">' + secs.map(function (s, i){ return s.replace('{{open}}', i === 0 ? ' is-open' : ''); }).join('') + '</div>';
    wire();
  }

  /* builds one accordion section; photos column hides with the body */
  function sec(key, icon, title, contentHtml, photos, canHavePhotos){
    photoSets[key] = photos;
    var photoCol = canHavePhotos ? photoColHtml(key, photos) : '';
    return '<section class="td-acc{{open}}" data-key="' + key + '">' +
      '<button class="td-acc-head" type="button"><span class="td-acc-ic">' + icon + '</span><span class="td-acc-title">' + esc(title) + '</span>' + SVG.chev + '</button>' +
      '<div class="td-acc-body"><div class="td-sec' + (canHavePhotos ? ' has-photos' : '') + '">' +
        '<div class="td-sec-text">' + contentHtml + '</div>' + photoCol +
      '</div></div></section>';
  }
  function photoColHtml(key, photos){
    if (photos.length) {
      return '<div class="td-sec-photos">' + photos.map(function (u, i){
        return '<button class="td-ph" type="button" data-set="' + key + '" data-i="' + i + '"><img src="' + esc(u) + '" alt="" loading="lazy"></button>'; }).join('') + '</div>';
    }
    /* empty → premium decorative placeholders so the layout is visible */
    return '<div class="td-sec-photos is-ph">' + '<div class="td-ph-tile">' + SVG.image + '</div><div class="td-ph-tile">' + SVG.image + '</div>' +
      '<small>' + esc(T('td.noPhotos','Doktor henüz fotoğraf eklememiş.')) + '</small></div>';
  }
  function mergeImgs(sectionArr, single){
    var out = arr(sectionArr).slice();
    if (single && out.indexOf(single) === -1) out.unshift(single);
    return out;
  }

  function placeBody(name, maps, desc){
    return (name ? '<strong class="td-place-name">' + esc(name) + '</strong>' : '') +
      (maps ? '<a class="td-maps" href="' + esc(maps) + '" target="_blank" rel="noopener">' + SVG.maps + esc(T('td.openMaps','Haritada Aç')) + '</a>' : '') +
      (desc ? '<div class="td-rich">' + paras(desc) + '</div>' : '');
  }
  function priceHtml(l){
    var rows = [[T('td.price.amount','Fiyat'), money(l.price_amount) + ' ' + curSym(l.price_currency)]];
    if (l.price_installments) rows.push([T('td.price.installments','Taksit Sayısı'), l.price_installments]);
    if (l.price_monthly != null) rows.push([T('td.price.monthly','Aylık Ödeme'), money(l.price_monthly) + ' ' + curSym(l.price_currency)]);
    return '<div class="td-price">' + rows.map(function (r){ return '<div class="td-price-row"><span>' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b></div>'; }).join('') + '</div>';
  }

  /* ---------- interactions ---------- */
  function wire(){
    root.querySelectorAll('.td-acc-head').forEach(function (h){ h.addEventListener('click', function (){ h.closest('.td-acc').classList.toggle('is-open'); }); });
    var msgBtn = root.querySelector('.td-msg'); if (msgBtn) msgBtn.addEventListener('click', contactDoctor);
    var favBtn = root.querySelector('.td-fav'); if (favBtn) favBtn.addEventListener('click', toggleFav);
    var shBtn = root.querySelector('.td-share'); if (shBtn) shBtn.addEventListener('click', openShare);
    root.querySelectorAll('.td-ph').forEach(function (b){ b.addEventListener('click', function (){ openLightbox(photoSets[b.dataset.set] || [], parseInt(b.dataset.i, 10)); }); });
  }

  function contactDoctor(){
    var l = listing, doc = l.doctor || {};
    var label = [nm(TRm, l.treatment_id), nm(ME, l.method_id), [nm(C, l.country_id), nm(CT, l.city_id)].filter(Boolean).join(', ')].filter(Boolean).join(' · ');
    location.href = 'dashboard-patient.html?openListing=' + encodeURIComponent(l.code) + '&label=' + encodeURIComponent(label) + (doc.id ? '&doctor=' + encodeURIComponent(doc.id) : '');
  }
  function toggleFav(){
    if (!me) { location.href = 'auth.html'; return; }
    var l = listing, btn = root.querySelector('.td-fav');
    if (isFav) { H.removeFavorite('listing', l.code).then(function (){ isFav = false; paintFav(btn); }); }
    else { H.addFavorite({ kind: 'listing', refId: l.code, label: l.headline || nm(TRm, l.treatment_id),
      meta: { id: l.id, code: l.code, treatment: nm(TRm, l.treatment_id), method: nm(ME, l.method_id), loc: [nm(C, l.country_id), nm(CT, l.city_id)].filter(Boolean).join(', '), doctor: (l.doctor && l.doctor.name) || '' } })
      .then(function (){ isFav = true; paintFav(btn); }); }
  }
  function paintFav(btn){ if (!btn) return; btn.classList.toggle('is-on', isFav); var sp = btn.querySelector('span'); if (sp) sp.textContent = isFav ? T('td.favOn','Favorilerde') : T('td.fav','Favorilere Ekle'); }

  /* ---------- share modal (shared site-wide via hp-share.js) ---------- */
  function openShare(){
    var title = listing.headline || nm(TRm, listing.treatment_id) || 'Healthperia';
    if (window.HPShare) HPShare.open(location.href, title);
  }

  /* ---------- lightbox (per-section photo set) ---------- */
  function openLightbox(photos, i){
    photos = arr(photos); if (!photos.length) return;
    var idx = i || 0;
    var ov = document.createElement('div'); ov.className = 'td-lb-overlay';
    ov.innerHTML = '<button class="td-lb-x" type="button" aria-label="' + esc(T('chat.close','Kapat')) + '">×</button>' +
      (photos.length > 1 ? '<button class="td-lb-nav prev" type="button" aria-label="prev">‹</button>' : '') +
      '<img class="td-lb-img" src="" alt="" />' +
      (photos.length > 1 ? '<button class="td-lb-nav next" type="button" aria-label="next">›</button>' : '');
    document.body.appendChild(ov); document.body.classList.add('td-lb-open');
    var img = ov.querySelector('.td-lb-img');
    function show(n){ idx = (n + photos.length) % photos.length; img.src = photos[idx]; }
    show(idx);
    function close(){ ov.remove(); document.body.classList.remove('td-lb-open'); document.removeEventListener('keydown', key); }
    function key(e){ if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') show(idx + 1); else if (e.key === 'ArrowLeft') show(idx - 1); }
    ov.addEventListener('click', function (e){ if (e.target === ov) close(); });
    ov.querySelector('.td-lb-x').addEventListener('click', close);
    var nx = ov.querySelector('.next'), pv = ov.querySelector('.prev');
    if (nx) nx.addEventListener('click', function (){ show(idx + 1); });
    if (pv) pv.addEventListener('click', function (){ show(idx - 1); });
    document.addEventListener('keydown', key);
    var sx = 0;
    ov.addEventListener('touchstart', function (e){ sx = e.touches[0].clientX; }, { passive: true });
    ov.addEventListener('touchend', function (e){ var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1)); }, { passive: true });
  }
})();
