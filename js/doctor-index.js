/* ============================================================
   Healthperia — doctor-index.js
   Doctor directory. Search bar works like the treatment finder:
   Ülke / Şehir / Branş are cascading DROPDOWN menus (options come
   from the real doctors); "Doktor İsmi" is a live TEXT filter that
   only reshapes the results (prefix match, no dropdown). All client
   side over the loaded doctor list. Public page; uses window.HP.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP;
  var grid = document.getElementById('dxGrid'), countEl = document.getElementById('dxCount');
  var bar = document.getElementById('dxSearch'), nameInput = document.getElementById('dxName');
  if (!H || !grid) return;

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function T(k, fb){ return (window.HPI && HPI.t) ? HPI.t(k, fb) : (fb || k); }
  function lower(s){ return String(s || '').toLocaleLowerCase('tr'); }
  function stripTitle(name){ return String(name || '').replace(/^(op\.|uzm\.|prof\.|doç\.|dr\.|\s)+/ig, '').trim(); }
  function initials(name){ var p = stripTitle(name).split(/\s+/); return (((p[0]||'')[0]||'')+((p[1]||'')[0]||'')).toUpperCase()||'?'; }
  function uniqSorted(a){ var seen = {}, out = []; a.forEach(function (x){ if (x && !seen[lower(x)]) { seen[lower(x)] = 1; out.push(x); } }); return out.sort(function (x, y){ return lower(x) < lower(y) ? -1 : 1; }); }

  var ARROW = '<svg class="dx-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
  var LABELS = { country: 'dx.country', city: 'dx.city', specialty: 'dx.specialty' };
  var FIELD  = { country: 'country', city: 'city', specialty: 'specialty' };

  var allDocs = [];
  var state = { country: '', city: '', specialty: '', name: '' };

  H.ready.then(function () {
    H.searchDoctors({}).then(function (docs) { allDocs = docs || []; buildDrop('country'); buildDrop('city'); buildDrop('specialty'); apply(); });
  });
  if (window.HPI && HPI.onChange) HPI.onChange(function () { buildDrop('country'); buildDrop('city'); buildDrop('specialty'); apply(); });

  /* options for a level, narrowed by the levels above it */
  function optionsFor(key) {
    var pool = allDocs.filter(function (d) {
      if (key !== 'country' && state.country && lower(d.country) !== lower(state.country)) return false;
      if (key === 'specialty' && state.city && lower(d.city) !== lower(state.city)) return false;
      return true;
    });
    return uniqSorted(pool.map(function (d) { return d[FIELD[key]]; }));
  }

  function buildDrop(key) {
    var step = bar.querySelector('.dx-drop[data-key="' + key + '"]'); if (!step) return;
    var val = step.querySelector('.dx-drop-val'), list = step.querySelector('.dx-drop-list');
    /* trigger text: selection or placeholder */
    if (state[key]) { val.textContent = state[key]; val.removeAttribute('data-ph'); }
    else { val.textContent = T(LABELS[key], val.textContent); val.setAttribute('data-ph', ''); }
    /* list: "Tümü" + options */
    var opts = optionsFor(key);
    list.innerHTML = '<li class="dx-opt' + (!state[key] ? ' is-selected' : '') + '" data-val="">' + esc(T('ti.all', 'Hepsi')) + '</li>' +
      opts.map(function (o) { return '<li class="dx-opt' + (lower(o) === lower(state[key]) ? ' is-selected' : '') + '" data-val="' + esc(o) + '">' + esc(o) + '</li>'; }).join('');
  }

  function apply() {
    var nq = lower(state.name);
    var list = allDocs.filter(function (d) {
      if (state.country && lower(d.country) !== lower(state.country)) return false;
      if (state.city && lower(d.city) !== lower(state.city)) return false;
      if (state.specialty && lower(d.specialty) !== lower(state.specialty)) return false;
      if (nq && lower(stripTitle(d.name)).indexOf(nq) !== 0) return false;   // name STARTS WITH typed letters
      return true;
    });
    countEl.textContent = list.length + ' ' + T('dx.results', 'doktor');
    if (!list.length) { grid.innerHTML = '<div class="td-empty"><p>' + esc(T('dx.empty', 'Eşleşen doktor bulunamadı.')) + '</p></div>'; return; }
    grid.innerHTML = list.map(card).join('');
  }

  function card(d) {
    var photo = d.avatar_url
      ? '<span class="dx-card-photo"><img src="' + esc(d.avatar_url) + '" alt="" loading="lazy"></span>'
      : '<span class="dx-card-photo is-ph">' + esc(initials(d.name)) + '</span>';
    var loc = [d.city, d.country].filter(Boolean).join('/');
    return '<a class="dx-card" href="doctor-detail.html?id=' + encodeURIComponent(d.id) + '">' + photo +
      '<div class="dx-card-box"><strong>' + esc(d.name || '—') + '</strong>' +
        (d.specialty ? '<span class="dx-card-spec">' + esc(d.specialty) + '</span>' : '') +
        (loc ? '<span class="dx-card-loc">' + esc(loc) + '</span>' : '') + ARROW +
      '</div></a>';
  }

  /* ---------- dropdown open/close + selection ---------- */
  function reflectDim() {
    var anyOpen = !!bar.querySelector('.dx-drop.is-open');
    grid.style.filter = anyOpen ? 'blur(4px)' : '';
    grid.style.opacity = anyOpen ? '0.4' : '';
    grid.style.pointerEvents = anyOpen ? 'none' : '';
    var rs = document.querySelector('.results-section');
    if (rs) rs.classList.toggle('ti-dimmed', anyOpen);
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
    step.querySelector('.dx-drop-trigger').addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !step.classList.contains('is-open'); closeAll(step);
      step.classList.toggle('is-open', open); this.setAttribute('aria-expanded', String(open));
      reflectDim();
    });
    step.querySelector('.dx-drop-list').addEventListener('click', function (e) {
      var li = e.target.closest('.dx-opt'); if (!li) return;
      state[key] = li.dataset.val || '';
      if (key === 'country') { state.city = ''; state.specialty = ''; }
      if (key === 'city') { state.specialty = ''; }
      closeAll();
      buildDrop('country'); buildDrop('city'); buildDrop('specialty');
      apply();
    });
  });
  document.addEventListener('click', function () { closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  /* name = live text filter (results only, no dropdown) */
  if (nameInput) nameInput.addEventListener('input', function () { state.name = nameInput.value.trim(); apply(); });
  var sBtn = document.getElementById('dxSearchBtn');
  if (sBtn) sBtn.addEventListener('click', function () { apply(); grid.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
})();
