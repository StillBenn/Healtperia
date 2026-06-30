/* ============================================================
   Healthperia — hp-share.js
   One share modal used SITE-WIDE (treatment detail, doctor
   profile, …): window.HPShare.open(url, title).
   WhatsApp / Facebook / X / Telegram / Instagram(copy) + copy link.
   Styling reuses the .td-share-* classes in css/style.css.
   ============================================================ */
(function () {
  'use strict';
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function T(k, fb){ return (window.HPI && HPI.t) ? HPI.t(k, fb) : (fb || k); }

  var ICONS = {
    wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11.9a8 8 0 0 1-11.9 7L4 20l1.2-4a8 8 0 1 1 14.8-4.1zM12 5.6A6.3 6.3 0 0 0 6.6 15l-.7 2.4 2.5-.7A6.3 6.3 0 1 0 12 5.6zm3.6 8c-.2.5-1 .9-1.4.9-.4 0-.9.1-2.6-.6-2.2-.9-3.6-3.1-3.7-3.3-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.8c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.6 1.5c.1.1.1.3 0 .5l-.3.4-.3.3c-.1.1-.2.2-.1.4.1.2.6 1 1.3 1.6.9.8 1.6 1 1.8 1.1.2.1.3.1.4-.1l.6-.7c.2-.2.3-.2.5-.1l1.4.7c.2.1.4.2.4.3.1.1.1.6-.1 1z"/></svg>',
    fb:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>',
    x:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2H21l-6.6 7.6L22 22h-6.3l-4.9-6.4L5 22H2.2l7.1-8.1L2 2h6.5l4.5 5.9L18.2 2zm-2.2 18h1.7L8.1 3.7H6.3L16 20z"/></svg>',
    tg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 4.3 2.6 11.8c-.9.4-.9 1 .1 1.3l4.9 1.5 1.9 5.8c.2.6.6.7 1.1.3l2.7-2.1 4.6 3.4c.6.4 1.1.2 1.3-.6L23 5.2c.2-.9-.3-1.3-1-.9zM18.6 7.8l-7.9 7.2-.3 3.3-1.6-4.9 9.4-5.9c.3-.2.7.1.4.3z"/></svg>',
    ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>'
  };

  function copy(text, btn) {
    var done = function () { if (btn) { var o = btn.textContent; btn.textContent = T('td.copied', 'Kopyalandı ✓'); setTimeout(function () { btn.textContent = o; }, 1500); } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
    else { try { var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); done(); } catch (_) {} }
  }

  window.HPShare = {
    open: function (url, title) {
      url = url || location.href;
      var u = encodeURIComponent(url), t = encodeURIComponent((title || 'Healthperia') + ' — Healthperia');
      var items = [
        ['WhatsApp', 'wa', 'https://wa.me/?text=' + t + '%20' + u],
        ['Facebook', 'fb', 'https://www.facebook.com/sharer/sharer.php?u=' + u],
        ['X', 'x', 'https://twitter.com/intent/tweet?text=' + t + '&url=' + u],
        ['Telegram', 'tg', 'https://t.me/share/url?url=' + u + '&text=' + t],
        ['Instagram', 'ig', null]
      ];
      var ov = document.createElement('div');
      ov.className = 'td-share-overlay';
      ov.innerHTML = '<div class="td-share-modal" role="dialog" aria-modal="true">' +
        '<button class="td-share-x" type="button" aria-label="' + esc(T('chat.close', 'Kapat')) + '">×</button>' +
        '<h4>' + esc(T('td.shareTitle', 'Bu sayfayı paylaş')) + '</h4>' +
        '<div class="td-share-grid">' + items.map(function (it) {
          return '<button class="td-share-btn ' + it[1] + '" type="button" data-href="' + (it[2] || '') + '">' + (ICONS[it[1]] || '') + '<span>' + esc(it[0]) + '</span></button>';
        }).join('') + '</div>' +
        '<div class="td-share-copy"><input type="text" readonly value="' + esc(url) + '" /><button type="button" class="btn-primary sm td-copy">' + esc(T('td.copy', 'Kopyala')) + '</button></div>' +
      '</div>';
      document.body.appendChild(ov);
      function close() { ov.remove(); }
      ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
      ov.querySelector('.td-share-x').addEventListener('click', close);
      ov.querySelectorAll('.td-share-btn').forEach(function (b) {
        b.addEventListener('click', function () { var href = b.dataset.href; if (href) window.open(href, '_blank', 'noopener,width=620,height=520'); else copy(url, b); });
      });
      var inp = ov.querySelector('.td-share-copy input');
      ov.querySelector('.td-copy').addEventListener('click', function (e) { copy(url, e.currentTarget); inp.select(); });
    }
  };
})();
