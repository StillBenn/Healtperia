/* ============================================================
   Healthperia — clinic-index.js
   Klinik dizini. Ülke / Şehir / Tıbbi Birim kaskad dropdown'lar +
   canlı "Klinik İsmi" text filtresi. Çerçeveli result-card.
   Public sayfa; window.HP kullanır.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP;
  var grid = document.getElementById('cxGrid'), countEl = document.getElementById('cxCount'), emptyEl = document.getElementById('cxEmpty');
  var bar = document.getElementById('cxSearch'), nameInput = document.getElementById('cxName');
  if (!H || !grid) return;

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function T(k, fb){ return (window.HPI && HPI.t) ? HPI.t(k, fb) : (fb || k); }
  function up(s){ return String(s || '').toLocaleUpperCase('tr'); }
  function lower(s){ return String(s || '').toLocaleLowerCase('tr'); }
  function uniqSorted(a){ var seen = {}, out = []; a.forEach(function (x){ if (x && !seen[lower(x)]) { seen[lower(x)] = 1; out.push(x); } }); return out.sort(function (x, y){ return lower(x) < lower(y) ? -1 : 1; }); }

  var SVG_LOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var SVG_HEART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
  var CHECK = '<svg class="dx-opt-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

  var FIELD = { country: 'country', city: 'city', unit: 'unit' };
  var LABEL = { country: 'cli.country', city: 'cli.city', unit: 'cli.unit' };
  var all = [], me = null, favIds = {};
  var state = { country: '', city: '', unit: '', name: '' };

  H.ready.then(function () {
    me = H.currentUser();
    var favP = me ? H.listFavorites() : Promise.resolve([]);
    Promise.all([H.searchClinics({}), favP]).then(function (r) {
      all = r[0] || [];
      (r[1] || []).forEach(function (f){ if (f.kind === 'clinic') favIds[f.ref_id] = 1; });
      buildDrop('country'); buildDrop('city'); buildDrop('unit'); apply();
    });
  });
  if (window.HPI && HPI.onChange) HPI.onChange(function () { buildDrop('country'); buildDrop('city'); buildDrop('unit'); apply(); });

  function optionsFor(key) {
    var pool = all.filter(function (d) {
      if (key !== 'country' && state.country && lower(d.country) !== lower(state.country)) return false;
      if (key === 'unit' && state.city && lower(d.city) !== lower(state.city)) return false;
      return true;
    });
    return uniqSorted(pool.map(function (d) { return d[FIELD[key]]; }));
  }
  function buildDrop(key) {
    var step = bar.querySelector('.dx-drop[data-key="' + key + '"]'); if (!step) return;
    var val = step.querySelector('.dx-drop-val'), list = step.querySelector('.dx-drop-list');
    var searchEl = step.querySelector('.dx-drop-search input');
    if (state[key]) { val.textContent = state[key]; val.removeAttribute('data-ph'); }
    else { val.textContent = T(LABEL[key], val.textContent); val.setAttribute('data-ph', ''); }
    var q = (searchEl && searchEl.value || '').trim().toLocaleLowerCase('tr');
    var opts = optionsFor(key).filter(function (o) { return !q || lower(o).indexOf(q) !== -1; });
    list.innerHTML = '<li class="dx-opt' + (!state[key] ? ' is-selected' : '') + '" data-val=""><span>' + esc(T('cli.all', 'Hepsi')) + '</span>' + CHECK + '</li>' +
      opts.map(function (o) { return '<li class="dx-opt' + (lower(o) === lower(state[key]) ? ' is-selected' : '') + '" data-val="' + esc(o) + '"><span>' + esc(o) + '</span>' + CHECK + '</li>'; }).join('');
  }

  function apply() {
    var nq = lower(state.name);
    var list = all.filter(function (d) {
      if (state.country && lower(d.country) !== lower(state.country)) return false;
      if (state.city && lower(d.city) !== lower(state.city)) return false;
      if (state.unit && lower(d.unit) !== lower(state.unit)) return false;
      if (nq && lower(d.name).indexOf(nq) < 0) return false;
      return true;
    });
    countEl.textContent = list.length + ' ' + T('cli.results', 'klinik');
    if (!list.length) { grid.innerHTML = ''; grid.hidden = true; emptyEl.hidden = false; emptyEl.querySelector('p').textContent = T('cli.empty', 'Eşleşen klinik bulunamadı.'); return; }
    emptyEl.hidden = true; grid.hidden = false;
    grid.innerHTML = list.map(card).join('');
    wireCards();
  }

  function card(d) {
    var photo = (Array.isArray(d.photos) && d.photos[0]) || d.logo_url || '';
    var loc = [d.country, d.city].filter(Boolean).join(', ');
    var faved = !!favIds[d.id];
    return '<article class="result-card" data-id="' + esc(d.id) + '">' +
      '<button class="result-fav' + (faved ? ' is-on' : '') + '" type="button" data-fav="' + esc(d.id) + '" aria-label="' + esc(T('cli.fav', 'Favorilere Ekle')) + '">' + SVG_HEART + '</button>' +
      '<div class="result-media"' + (photo ? ' style="background-image:url(' + esc(photo) + ');background-size:cover;background-position:center"' : '') + '></div>' +
      '<div class="result-body">' +
        '<h3 class="result-name">' + esc(up(d.name)) + '</h3>' +
        (d.unit ? '<p class="result-method">' + esc(d.unit) + '</p>' : '') +
        (loc ? '<p class="result-loc">' + SVG_LOC + esc(loc) + '</p>' : '') +
        '<div class="result-foot"><span></span>' +
          '<a href="clinic-detail.html?id=' + encodeURIComponent(d.id) + '" class="result-cta">' + esc(T('cli.cta', 'Detayları İncele →')) + '</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function wireCards() {
    grid.querySelectorAll('.result-card').forEach(function (c) {
      c.addEventListener('click', function (e) {
        if (e.target.closest('.result-fav') || e.target.closest('a')) return;
        location.href = 'clinic-detail.html?id=' + encodeURIComponent(c.getAttribute('data-id'));
      });
    });
    grid.querySelectorAll('.result-fav').forEach(function (b) {
      b.addEventListener('click', function (e) { e.stopPropagation(); toggleFav(b); });
    });
  }
  function toggleFav(btn) {
    if (!me) { location.href = 'auth.html'; return; }
    var id = btn.getAttribute('data-fav'), on = btn.classList.contains('is-on');
    if (on) { H.removeFavorite('clinic', id).then(function (){ delete favIds[id]; btn.classList.remove('is-on'); }); }
    else { var d = all.filter(function(x){return x.id===id;})[0] || {};
      H.addFavorite({ kind: 'clinic', refId: id, label: d.name, meta: { loc: [d.country, d.city].filter(Boolean).join(', ') } })
        .then(function (){ favIds[id] = 1; btn.classList.add('is-on'); }); }
  }

  /* ---------- dropdown open/close ---------- */
  function reflectDim() {
    var anyOpen = !!bar.querySelector('.dx-drop.is-open');
    grid.style.filter = anyOpen ? 'blur(4px)' : '';
    grid.style.opacity = anyOpen ? '0.4' : '';
    grid.style.pointerEvents = anyOpen ? 'none' : '';
  }
  function closeAll(except) {
    bar.querySelectorAll('.dx-drop').forEach(function (s) {
      if (s === except) return;
      s.classList.remove('is-open'); s.querySelector('.dx-drop-trigger').setAttribute('aria-expanded', 'false');
    });
    reflectDim();
  }
  bar.querySelectorAll('.dx-drop').forEach(function (step) {
    var key = step.dataset.key;
    var searchEl = step.querySelector('.dx-drop-search input');
    step.querySelector('.dx-drop-trigger').addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !step.classList.contains('is-open'); closeAll(step);
      step.classList.toggle('is-open', open); this.setAttribute('aria-expanded', String(open));
      if (open && searchEl) { searchEl.value = ''; buildDrop(key); setTimeout(function () { searchEl.focus(); }, 30); }
      reflectDim();
    });
    var pop = step.querySelector('.dx-drop-pop');
    if (pop) pop.addEventListener('click', function (e) { e.stopPropagation(); });
    if (searchEl) searchEl.addEventListener('input', function () { buildDrop(key); });
    step.querySelector('.dx-drop-list').addEventListener('click', function (e) {
      var li = e.target.closest('.dx-opt'); if (!li) return;
      state[key] = li.dataset.val || '';
      if (key === 'country') { state.city = ''; state.unit = ''; }
      if (key === 'city') { state.unit = ''; }
      closeAll();
      buildDrop('country'); buildDrop('city'); buildDrop('unit');
      apply();
    });
  });
  document.addEventListener('click', function () { closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  if (nameInput) nameInput.addEventListener('input', function () { state.name = nameInput.value.trim(); apply(); });
  var sBtn = document.getElementById('cxSearchBtn');
  if (sBtn) sBtn.addEventListener('click', function () { apply(); grid.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
})();
