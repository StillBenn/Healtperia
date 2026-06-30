/* ============================================================
   Healthperia — treatment-index.js
   Cascading treatment finder:
     country → city → unit → treatment → method → (price)
   Each step unlocks the next; the results grid narrows live.
   Catalog data: window.HP_TREATMENT_DATA (js/treatment-data.js, TR).
   UI strings: window.HPI.t (main.js merges js/i18n-treatment.js).
   Doctor names & prices are DEMO, generated deterministically per
   method so they stay stable — swap for real data when available.
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.HP_TREATMENT_DATA;
  var cascade = document.getElementById('tiCascade');
  if (!DATA || !cascade) return;

  var T = function (k, fb) { return window.HPI ? window.HPI.t(k, fb) : (fb || k); };

  /* ---------- indexes ---------- */
  var byId = function (arr) { var m = {}; arr.forEach(function (x) { m[x.id] = x; }); return m; };
  var units = byId(DATA.units);
  var treatments = byId(DATA.treatments);
  var countries = byId(DATA.countries);
  var cities = byId(DATA.cities);
  var methodsById = byId(DATA.methods);

  /* ---------- demo doctor + price (deterministic, swap later) ---------- */
  var DOC_TITLES = ['Op. Dr.', 'Uzm. Dr.', 'Prof. Dr.', 'Doç. Dr.', 'Dr.'];
  var DOC_NAMES = ['Bünyamin Katkat', 'Elif Yılmaz', 'Murat Kaya', 'Selin Aydın', 'Ahmet Demir',
    'Zeynep Acar', 'Can Öztürk', 'Merve Şahin', 'Emre Çelik', 'Deniz Arslan', 'Burak Doğan',
    'Aslı Yıldız', 'Kerem Aksoy', 'Naz Polat', 'Cem Erdoğan', 'Gizem Korkmaz'];
  function demoDoctor(methodId) {
    return DOC_TITLES[methodId % DOC_TITLES.length] + ' ' + DOC_NAMES[(methodId * 7) % DOC_NAMES.length];
  }
  function demoPrice(treatmentId, methodId) {
    var seed = treatmentId * 131 + methodId * 17;
    var min = 500 + (seed % 38) * 250;          // 500 .. ~10.000
    var max = min + (1 + (seed % 4)) * 500;      // +500 .. +2.000
    return [min, max];
  }
  function fmtMoney(n) { return n.toLocaleString('de-DE'); }   // dotted thousands

  /* deterministic listing code (stable per unit/treatment/method) */
  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function listingCode(unitId, treatmentId, methodId) {
    return 'HP-' + pad(unitId, 2) + '-' + pad(treatmentId, 3) + '-' + pad(methodId, 3);
  }

  /* ---------- state ---------- */
  var state = { countryId: null, cityId: null, unitId: null, treatmentId: null, methodId: null };
  var STEP_ORDER = ['country', 'city', 'unit', 'treatment', 'method'];
  var steps = {};
  STEP_ORDER.forEach(function (key) {
    var el = cascade.querySelector('.ti-step[data-step="' + key + '"]');
    if (!el) return;
    steps[key] = {
      el: el,
      trigger: el.querySelector('.ti-step-trigger'),
      value: el.querySelector('.ti-step-value'),
      list: el.querySelector('.ti-pop-list'),
      search: el.querySelector('.ti-pop-search input')
    };
  });

  /* which options each step offers given current state */
  function optionsFor(key) {
    switch (key) {
      case 'country':   return DATA.countries;
      case 'city':      return state.countryId ? DATA.cities.filter(function (c) { return c.countryId === state.countryId; }) : [];
      case 'unit':      return state.cityId ? DATA.units : [];
      case 'treatment': return state.unitId ? [{ id: -1, name: T('ti.all', 'Hepsi') }].concat(DATA.treatments.filter(function (t) { return t.unitId === state.unitId; })) : [];
      case 'method':    return state.treatmentId ? [{ id: -1, name: T('ti.all', 'Hepsi') }].concat(state.treatmentId > 0 ? DATA.methods.filter(function (m) { return m.treatmentId === state.treatmentId; }) : []) : [];
    }
    return [];
  }
  var STATE_KEY = { country: 'countryId', city: 'cityId', unit: 'unitId', treatment: 'treatmentId', method: 'methodId' };
  function isLocked(key) {
    if (key === 'country') return false;
    if (key === 'city') return !state.countryId;
    if (key === 'unit') return !state.cityId;
    if (key === 'treatment') return !state.unitId;
    if (key === 'method') return !state.treatmentId;
    return true;
  }

  /* ---------- rendering ---------- */
  /* boxes stay a fixed equal size — shrink the value font (not the box) so a
     long selection still fits; ellipsis is only the last resort */
  function fitValue(el) {
    if (!el) return;
    el.style.fontSize = '';
    var max = 14, min = 10.5, size = max, guard = 0;
    el.style.fontSize = size + 'px';
    if (!el.clientWidth) return;
    while (el.scrollWidth > el.clientWidth + 0.5 && size > min && guard < 14) {
      size -= 0.5; el.style.fontSize = size + 'px'; guard++;
    }
  }

  function renderStep(key) {
    var s = steps[key]; if (!s) return;
    var locked = isLocked(key);
    s.el.classList.toggle('is-locked', locked);
    if (s.trigger) s.trigger.disabled = locked;

    var selId = state[STATE_KEY[key]];
    var opts = optionsFor(key);
    var sel = selId != null ? opts.filter(function (o) { return o.id === selId; })[0] : null;

    /* trigger value text */
    s.el.classList.toggle('is-filled', !!sel);
    s.value.textContent = sel ? sel.name : T('ti.choose', 'Seçiniz');
    fitValue(s.value);

    /* list items */
    var q = (s.search && s.search.value || '').trim().toLocaleLowerCase('tr');
    var html = '';
    opts.forEach(function (o) {
      if (q && o.name.toLocaleLowerCase('tr').indexOf(q) === -1) return;
      html += '<li role="option" class="ti-opt' + (o.id === selId ? ' is-selected' : '') +
        '" data-id="' + o.id + '"><span>' + esc(o.name) + '</span>' +
        '<svg class="ti-opt-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></li>';
    });
    s.list.innerHTML = html;
  }

  function renderAll() {
    STEP_ORDER.forEach(renderStep);
    renderResults();
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- results ---------- */
  var resultsEl = document.getElementById('tiResults');
  var emptyEl = document.getElementById('tiEmpty');
  var countEl = document.getElementById('tiCount');
  var headEl = document.getElementById('tiResultsHead');

  function currentMethods() {
    if (state.methodId)    return DATA.methods.filter(function (m) { return m.id === state.methodId; });
    if (state.treatmentId) return DATA.methods.filter(function (m) { return m.treatmentId === state.treatmentId; });
    if (state.unitId)      return DATA.methods.filter(function (m) { return treatments[m.treatmentId] && treatments[m.treatmentId].unitId === state.unitId; });
    return [];
  }

  function locationLabel() {
    var parts = [];
    if (state.countryId && countries[state.countryId]) parts.push(countries[state.countryId].name);
    if (state.cityId && cities[state.cityId]) parts.push(cities[state.cityId].name);
    return parts.join(', ');
  }

  /* favorites (heart state) + result fetch guard */
  var favCodes = {};
  var resToken = 0;
  function curSym(c){ return ({ EUR:'€', USD:'$', TRY:'₺', GBP:'£' })[c] || (c ? (' ' + c) : ''); }
  var SVG_DOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M12 8v6M9 11h6"/></svg>';
  var SVG_LOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var SVG_HEART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
  var SVG_EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>';

  function renderResults() {
    /* gated empty states until the location + unit are known */
    if (!state.unitId) {
      resultsEl.innerHTML = ''; resultsEl.hidden = true; countEl.textContent = '';
      var hint = !state.countryId ? 'ti.hintCountry' : !state.cityId ? 'ti.hintCity' : 'ti.hintUnit';
      emptyEl.hidden = false; emptyEl.querySelector('p').textContent = T(hint, '');
      return;
    }
    if (!window.HP || !HP.listListings) { resultsEl.hidden = true; emptyEl.hidden = false; emptyEl.querySelector('p').textContent = T('ti.noResults', ''); return; }

    var token = ++resToken;
    HP.listListings({ countryId: state.countryId, cityId: state.cityId, unitId: state.unitId, treatmentId: state.treatmentId, methodId: state.methodId })
      .then(function (list) {
        if (token !== resToken) return;
        if (!list.length) {
          resultsEl.innerHTML = ''; resultsEl.hidden = true; countEl.textContent = '';
          emptyEl.hidden = false; emptyEl.querySelector('p').textContent = T('ti.noResults', 'Eşleşen sonuç bulunamadı.');
          return;
        }
        emptyEl.hidden = true; resultsEl.hidden = false;
        countEl.textContent = list.length + ' ' + T('ti.resultsWord', 'sonuç');
        resultsEl.innerHTML = list.map(cardHtml).join('');
        wireCards();
      });
  }

  function cardHtml(l, i) {
    var trName = (treatments[l.treatment_id] || {}).name || l.headline || '';
    var meName = (methodsById[l.method_id] || {}).name || '';
    var loc = [(countries[l.country_id] || {}).name, (cities[l.city_id] || {}).name].filter(Boolean).join(', ');
    var doc = (l.doctor && l.doctor.name) || '';
    var price = l.price_amount != null ? fmtMoney(l.price_amount) + ' ' + curSym(l.price_currency) : '';
    var sp = l.section_photos || {};
    var photo = (Array.isArray(l.photos) && l.photos[0]) || (sp.process && sp.process[0]) || (sp.place && sp.place[0]) || (sp.doctor && sp.doctor[0]) || '';
    var href = 'treatment-detail.html?id=' + encodeURIComponent(l.id);
    var faved = !!favCodes[l.code];
    return '<article class="result-card" style="--i:' + (i % 12) + '">' +
      '<button class="result-fav' + (faved ? ' is-on' : '') + '" type="button" data-fav="' + esc(l.code) + '" aria-label="' + esc(T('td.fav', 'Favorilere Ekle')) + '">' + SVG_HEART + '</button>' +
      '<div class="result-media"' + (photo ? ' style="background-image:url(' + esc(photo) + ');background-size:cover;background-position:center"' : '') + '></div>' +
      '<div class="result-body">' +
        '<h3 class="result-name">' + esc(trName) + '</h3>' +
        (meName ? '<p class="result-method">' + esc(meName) + '</p>' : '') +
        (doc ? '<p class="result-doc">' + SVG_DOC + esc(doc) + '</p>' : '') +
        (loc ? '<p class="result-loc">' + SVG_LOC + esc(loc) + '</p>' : '') +
        '<p class="result-code"><span>' + esc(T('ti.code', 'Kod')) + ': ' + esc(l.code) + '</span></p>' +
        '<div class="result-foot">' +
          (price ? '<span class="result-price">' + esc(price) + '</span>' : '<span></span>') +
          '<a href="' + href + '" class="result-cta">' + esc(T('ti.cta', 'Detayları İncele →')) + '</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function wireCards() {
    /* whole card is clickable → detail (heart and links excluded) */
    resultsEl.querySelectorAll('.result-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('.result-fav') || e.target.closest('a')) return;
        var link = card.querySelector('.result-cta');
        if (link && link.getAttribute('href')) location.href = link.getAttribute('href');
      });
    });
    resultsEl.querySelectorAll('.result-fav').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        if (!window.HP || !HP.currentUser || !HP.currentUser()) { location.href = 'auth.html'; return; }
        var code = b.dataset.fav;
        if (favCodes[code]) { HP.removeFavorite('listing', code).then(function () { delete favCodes[code]; b.classList.remove('is-on'); }); }
        else { HP.addFavorite({ kind: 'listing', refId: code, label: b.closest('.result-card').querySelector('.result-name').textContent })
          .then(function () { favCodes[code] = 1; b.classList.add('is-on'); }); }
      });
    });
  }

  /* load the user's favorites (for hearts) then refresh once ready */
  if (window.HP && HP.ready) {
    HP.ready.then(function () {
      if (!HP.currentUser || !HP.currentUser()) return;
      HP.listFavorites().then(function (favs) {
        favs.forEach(function (f) { if (f.kind === 'listing') favCodes[f.ref_id] = 1; });
        if (state.unitId) renderResults();
      });
    });
  }

  /* ---------- popover open/close ---------- */
  /* dim + blur the result cards behind an open dropdown popover */
  function reflectDim() {
    var anyOpen = cascade.querySelector('.ti-step.is-open');
    var rs = document.querySelector('.results-section');
    if (rs) rs.classList.toggle('ti-dimmed', !!anyOpen);
  }
  function closeAll(except) {
    STEP_ORDER.forEach(function (k) {
      if (k === except) return;
      var s = steps[k]; if (!s) return;
      s.el.classList.remove('is-open');
      if (s.trigger) s.trigger.setAttribute('aria-expanded', 'false');
    });
    reflectDim();
  }
  function openStep(key) {
    var s = steps[key]; if (!s || isLocked(key)) return;
    var willOpen = !s.el.classList.contains('is-open');
    closeAll(key);
    s.el.classList.toggle('is-open', willOpen);
    s.trigger.setAttribute('aria-expanded', String(willOpen));
    if (willOpen && s.search) { s.search.value = ''; renderStep(key); setTimeout(function () { s.search.focus(); }, 30); }
    reflectDim();
  }

  /* ---------- selection ---------- */
  function selectOption(key, id) {
    state[STATE_KEY[key]] = id;
    /* clear everything downstream */
    var idx = STEP_ORDER.indexOf(key);
    for (var i = idx + 1; i < STEP_ORDER.length; i++) {
      state[STATE_KEY[STEP_ORDER[i]]] = null;
    }
    closeAll();
    renderAll();
    /* auto-open the next step if it just unlocked and isn't chosen yet */
    var next = STEP_ORDER[idx + 1];
    if (next && !isLocked(next)) openStep(next);
  }

  function resetAll() {
    state = { countryId: null, cityId: null, unitId: null, treatmentId: null, methodId: null };
    closeAll();
    Object.keys(steps).forEach(function (k) { if (steps[k].search) steps[k].search.value = ''; });
    renderAll();
  }

  /* ---------- wiring ---------- */
  STEP_ORDER.forEach(function (key) {
    var s = steps[key]; if (!s) return;
    if (s.trigger) s.trigger.addEventListener('click', function (e) { e.stopPropagation(); openStep(key); });
    if (s.list) s.list.addEventListener('click', function (e) {
      var li = e.target.closest('.ti-opt'); if (!li) return;
      selectOption(key, parseInt(li.dataset.id, 10));
    });
    if (s.search) s.search.addEventListener('input', function () { renderStep(key); });
    /* keep clicks inside the popover from bubbling to the document closer */
    var pop = s.el.querySelector('.ti-pop');
    if (pop) pop.addEventListener('click', function (e) { e.stopPropagation(); });
  });

  var searchBtn = document.getElementById('tiSearch');
  if (searchBtn) searchBtn.addEventListener('click', function (e) {
    e.stopPropagation(); closeAll(); renderResults();
    var rs = document.querySelector('.results-section'); if (rs) rs.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.addEventListener('click', function () { closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  /* re-render on language change (values, hints, card chrome) */
  if (window.HPI && window.HPI.onChange) window.HPI.onChange(function () { renderAll(); });

  /* re-fit the value fonts when the boxes change width */
  var fitTO;
  window.addEventListener('resize', function () {
    clearTimeout(fitTO);
    fitTO = setTimeout(function () {
      STEP_ORDER.forEach(function (k) { if (steps[k]) fitValue(steps[k].value); });
    }, 150);
  });

  renderAll();
})();
