/* ============================================================
   Healthperia — dashboard.js
   Shared shell behaviour for patient / doctor / admin panels:
   section routing, sidebar, user menu, logout, identity.
   Requires auth.js (window.Healthperia) loaded first.
   ============================================================ */

(function (global) {
  'use strict';
  var H = global.Healthperia;

  function initials(name) {
    if (!name) return 'HP';
    var p = String(name).replace(/^Dr\.?\s*/i, '').trim().split(/\s+/);
    return ((p[0] || '')[0] || '' ) + ((p[1] || '')[0] || (p[0] || '')[1] || '');
  }

  var els = {};
  var currentSection = 'overview';

  function setTitle(section) {
    var link = document.querySelector('.side-link[data-section="' + section + '"]');
    if (link && els.pageTitle) {
      /* prefer the dedicated label span (so the badge number isn't swept in);
         fall back to the link's text minus any trailing badge digits */
      var label = link.querySelector('.side-label');
      els.pageTitle.textContent = label ? label.textContent.trim()
                                        : link.textContent.replace(/\d+$/, '').trim();
    }
  }

  function showSection(section) {
    currentSection = section;
    document.querySelectorAll('.panel').forEach(function (p) {
      p.classList.toggle('is-active', p.dataset.panel === section);
    });
    document.querySelectorAll('.side-link').forEach(function (l) {
      l.classList.toggle('is-active', l.dataset.section === section);
    });
    setTitle(section);
    closeSidebar();
    if (els.content) els.content.scrollTop = 0;
    if (location.hash !== '#' + section) history.replaceState(null, '', '#' + section);
  }

  function openSidebar()  { document.body.classList.add('sidebar-open'); }
  function closeSidebar() { document.body.classList.remove('sidebar-open'); }

  function refreshIdentity() {
    var u = H.currentUser();
    if (!u) return;
    var ini = initials(u.name);
    document.querySelectorAll('[id="navAvatar"], #profAvatar').forEach(function (el) { el.textContent = ini; });
    var navName = document.getElementById('navName'); if (navName) navName.textContent = u.name || '';
    var welcome = document.getElementById('welcomeName'); if (welcome) welcome.textContent = u.name || '';
    var na = document.getElementById('navAvatar'); if (na) na.textContent = ini;
  }

  function init(user, opts) {
    opts = opts || {};
    els.pageTitle = document.getElementById('pageTitle');
    els.content   = document.querySelector('.app-content');

    /* identity */
    refreshIdentity();
    /* page crumb is translated via data-i18n in the HTML / i18n-core, so we
       no longer overwrite it here. */

    /* section navigation (sidebar + any [data-section] + [data-jump]) */
    document.addEventListener('click', function (e) {
      var nav = e.target.closest('[data-section]');
      if (nav) { e.preventDefault(); showSection(nav.dataset.section); return; }
      var jump = e.target.closest('[data-jump]');
      if (jump) { e.preventDefault(); showSection(jump.dataset.jump); }
    });

    /* sidebar open/close */
    var burger  = document.getElementById('burger');
    var closeBt = document.getElementById('sidebarClose');
    var overlay = document.getElementById('appOverlay');
    if (burger)  burger.addEventListener('click', openSidebar);
    if (closeBt) closeBt.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    /* user dropdown */
    var userMenu = document.getElementById('userMenu');
    if (userMenu) {
      var trg = document.getElementById('userTrigger');
      trg.addEventListener('click', function (e) { e.stopPropagation(); userMenu.classList.toggle('open'); });
      document.addEventListener('click', function (e) { if (!userMenu.contains(e.target)) userMenu.classList.remove('open'); });
    }

    /* logout */
    ['logoutBtn', 'logoutBtn2'].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.addEventListener('click', function () { H.logout(); });
    });

    /* deep link via hash */
    var initial = (location.hash || '').replace('#', '');
    if (initial && document.querySelector('.panel[data-panel="' + initial + '"]')) {
      showSection(initial);
    }

    /* esc closes sidebar */
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSidebar(); });

    /* reflect the current section in the page title (the HTML default is just
       a Turkish placeholder); then keep it in sync when the language changes */
    setTitle(currentSection);
    if (global.HPI && typeof global.HPI.onChange === 'function') {
      global.HPI.onChange(function () { setTitle(currentSection); });
    }
  }

  global.Dashboard = {
    init: init,
    initials: initials,
    showSection: showSection,
    refreshIdentity: refreshIdentity
  };
})(window);
