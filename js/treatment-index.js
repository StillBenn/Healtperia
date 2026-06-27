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
      case 'treatment': return state.unitId ? DATA.treatments.filter(function (t) { return t.unitId === state.unitId; }) : [];
      case 'method':    return state.treatmentId ? DATA.methods.filter(function (m) { return m.treatmentId === state.treatmentId; }) : [];
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

  function renderResults() {
    var methods = currentMethods();

    /* guided empty states while the cascade is incomplete */
    if (!methods.length) {
      resultsEl.innerHTML = '';
      resultsEl.hidden = true;
      countEl.textContent = '';
      var hint = !state.countryId ? 'ti.hintCountry'
               : !state.cityId ? 'ti.hintCity'
               : !state.unitId ? 'ti.hintUnit'
               : 'ti.noResults';
      emptyEl.hidden = false;
      emptyEl.querySelector('p').textContent = T(hint, '');
      return;
    }

    emptyEl.hidden = true;
    resultsEl.hidden = false;
    countEl.textContent = methods.length + ' ' + T('ti.resultsWord', 'sonuç');

    var loc = locationLabel();
    var cta = T('ti.cta', 'Detayları gör →');
    var priceLabel = T('ti.priceLabel', '');
    var html = methods.map(function (m, i) {
      var tr = treatments[m.treatmentId] || { name: '' };
      var unit = units[tr.unitId] || { name: '' };
      var pr = demoPrice(tr.id, m.id);
      var doc = demoDoctor(m.id);
      return '<article class="result-card" style="--i:' + (i % 12) + '">' +
        '<div class="result-media"></div>' +
        '<div class="result-body">' +
          '<h3 class="result-name">' + esc(tr.name) + '</h3>' +
          '<p class="result-method">' + esc(m.name) + '</p>' +
          '<p class="result-doc">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M12 8v6M9 11h6"/></svg>' +
            esc(doc) + '</p>' +
          (loc ? '<p class="result-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>' + esc(loc) + '</p>' : '') +
          '<div class="result-foot">' +
            '<span class="result-price" title="' + esc(priceLabel) + '">' + fmtMoney(pr[0]) + ' $ – ' + fmtMoney(pr[1]) + ' $</span>' +
            '<a href="#" class="result-cta">' + esc(cta) + '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
    resultsEl.innerHTML = html;
  }

  /* ---------- popover open/close ---------- */
  function closeAll(except) {
    STEP_ORDER.forEach(function (k) {
      if (k === except) return;
      var s = steps[k]; if (!s) return;
      s.el.classList.remove('is-open');
      if (s.trigger) s.trigger.setAttribute('aria-expanded', 'false');
    });
  }
  function openStep(key) {
    var s = steps[key]; if (!s || isLocked(key)) return;
    var willOpen = !s.el.classList.contains('is-open');
    closeAll(key);
    s.el.classList.toggle('is-open', willOpen);
    s.trigger.setAttribute('aria-expanded', String(willOpen));
    if (willOpen && s.search) { s.search.value = ''; renderStep(key); setTimeout(function () { s.search.focus(); }, 30); }
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

  var resetBtn = document.getElementById('tiReset');
  if (resetBtn) resetBtn.addEventListener('click', resetAll);

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
