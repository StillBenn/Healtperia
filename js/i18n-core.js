/* ============================================================
   Healthperia — i18n-core.js
   Standalone translation engine for the account / panel pages
   (auth, forgot-password, dashboards, admin).
   ------------------------------------------------------------
   These pages do NOT load main.js (its smooth-scroll wheel hijack
   would fight the panel scroll areas), so this lean module ships
   the same i18n behaviour the public site uses:
     • translates [data-i18n] (textContent),
       [data-i18n-placeholder] (placeholder) and
       [data-i18n-html] (innerHTML — for strings with markup)
     • wires the flag language switcher
     • RTL handling + localStorage persistence on the SAME
       'treatperia.lang' key, so the chosen language carries
       across the whole site
     • exposes window.HPI for dynamic, JS-generated strings:
         HPI.t(key, fallback)   → current-language string
         HPI.lang               → current language code
         HPI.onChange(cb)       → re-render hook on language change

   Each page registers its strings on window.HP_I18N BEFORE this
   file loads (merge-style, so a shared + a per-page file coexist).
   ============================================================ */

(function () {
  'use strict';

  var STORE   = 'treatperia.lang';
  var OFFERED = ['tr', 'en', 'de', 'ru', 'fr', 'es', 'pt', 'ar', 'nl'];
  var RTL     = ['ar', 'fa'];

  var HPI = window.HPI = {
    lang: 'tr',
    dict: {},
    t: function (key, fallback) {
      return this.dict[key] !== undefined ? this.dict[key]
           : (fallback !== undefined ? fallback : key);
    },
    _subs: [],
    onChange: function (cb) { if (typeof cb === 'function') this._subs.push(cb); }
  };

  function dictFor(lang) {
    var I = window.HP_I18N || {};
    return I[lang] || I.tr || {};
  }

  function apply(lang) {
    var src = dictFor(lang);
    HPI.lang = lang;
    HPI.dict = src;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (src[k] !== undefined) el.textContent = src[k];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-placeholder');
      if (src[k] !== undefined) el.setAttribute('placeholder', src[k]);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-html');
      if (src[k] !== undefined) el.innerHTML = src[k];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria');
      if (src[k] !== undefined) el.setAttribute('aria-label', src[k]);
    });

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', RTL.indexOf(lang) !== -1 ? 'rtl' : 'ltr');

    HPI._subs.forEach(function (cb) { try { cb(lang); } catch (_) {} });
  }

  var wrap    = document.querySelector('[data-lang-switch]');
  var menu    = wrap && wrap.querySelector('.lang-menu');
  var trigger = wrap && wrap.querySelector('.lang-trigger');
  var flagEl  = wrap && wrap.querySelector('[data-lang-flag]');
  var nameEl  = wrap && wrap.querySelector('[data-lang-name]');

  function setLanguage(code) {
    if (OFFERED.indexOf(code) === -1) code = 'tr';
    if (menu) {
      var opt = menu.querySelector('li[data-lang="' + code + '"]');
      menu.querySelectorAll('li.selected').forEach(function (el) { el.classList.remove('selected'); });
      if (opt) {
        opt.classList.add('selected');
        if (nameEl) nameEl.textContent = opt.dataset.short || code.toUpperCase();
      }
    }
    if (flagEl) flagEl.className = 'flag flag-' + code;
    apply(code);
    try { localStorage.setItem(STORE, code); } catch (_) {}
  }
  HPI.setLanguage = setLanguage;

  if (wrap && trigger && menu) {
    var closeMenu = function () {
      wrap.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    };
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = wrap.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) {
      var opt = e.target.closest('li[role="option"]');
      if (!opt) return;
      setLanguage(opt.dataset.lang);
      closeMenu();
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* One-time reset: clear any previously-saved language so everyone starts
     fresh on Turkish (older builds could leave a non-TR value stuck). New
     choices made after this still persist across pages/reloads. */
  try {
    if (localStorage.getItem('treatperia.langv') !== '2') {
      localStorage.removeItem(STORE);
      localStorage.setItem('treatperia.langv', '2');
    }
  } catch (_) {}

  /* First visit → Turkish; otherwise keep the user's saved choice. */
  var saved = 'tr';
  try { saved = localStorage.getItem(STORE) || 'tr'; } catch (_) {}
  if (OFFERED.indexOf(saved) === -1) saved = 'tr';
  setLanguage(saved);
})();
