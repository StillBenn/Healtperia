/* ============================================================
   Healthperia — hp-chat.js
   Lightweight realtime chat used in the patient & doctor panels.
   Renders an inbox (threads) + a conversation view into a container.
   Requires window.HP (hp-api.js) + a logged-in session.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP;
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function initials(name){
    if (!name) return '?';
    var p = String(name).replace(/^Dr\.?\s*/i,'').trim().split(/\s+/);
    return (((p[0]||'')[0]||'') + ((p[1]||'')[0]||'')).toUpperCase() || '?';
  }
  function timeShort(ts){
    try {
      var d = new Date(ts), now = new Date();
      if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit' });
      return d.toLocaleDateString('tr-TR', { day:'2-digit', month:'2-digit' });
    } catch (_) { return ''; }
  }

  var Chat = window.HPChat = {};
  var root, me, peerId = null, peerName = '', sub = null, emptyText = 'Henüz mesaj yok.';

  Chat.mount = function (container, opts) {
    opts = opts || {};
    root = container;
    me = H.currentUser();
    emptyText = opts.emptyText || emptyText;
    root.classList.add('hp-chat');
    renderInbox();
    /* realtime: any new message involving me → refresh */
    if (sub) { try { H.sb.removeChannel(sub); } catch (_) {} }
    sub = H.subscribeMessages(function (payload) {
      var m = payload && payload.new; if (!m) return;
      var other = m.sender_id === me.id ? m.receiver_id : m.sender_id;
      if (peerId && other === peerId) { appendBubble(m); H.markRead(peerId); }
      else { renderInbox(); }
    });
  };

  /* open a conversation directly (e.g. from the doctor list "Message" button) */
  Chat.openWith = function (id, name) {
    if (window.Dashboard && Dashboard.showSection) Dashboard.showSection('messages');
    openConversation(id, name);
  };

  function renderInbox() {
    peerId = null;
    root.innerHTML = '<div class="chat-loading">…</div>';
    H.inbox().then(function (msgs) {
      var threads = {};
      msgs.forEach(function (m) {
        var mineSent = m.sender_id === me.id;
        var other = mineSent ? m.receiver : m.sender;
        var otherId = mineSent ? m.receiver_id : m.sender_id;
        if (!otherId) return;
        if (!threads[otherId]) {
          threads[otherId] = { id: otherId, name: (other && other.name) || '—', last: m.body, at: m.created_at, unread: 0 };
        }
        if (!mineSent && !m.read) threads[otherId].unread++;
      });
      var list = Object.keys(threads).map(function (k){ return threads[k]; });
      if (!list.length) {
        root.innerHTML = '<div class="chat-empty"><p>' + esc(emptyText) + '</p></div>';
        return;
      }
      root.innerHTML = '<ul class="chat-threads">' + list.map(function (t) {
        return '<li class="chat-thread" data-id="' + t.id + '" data-name="' + esc(t.name) + '">' +
          '<span class="appt-avatar">' + esc(initials(t.name)) + '</span>' +
          '<div class="chat-thread-meta"><strong>' + esc(t.name) + '</strong><span>' + esc(t.last) + '</span></div>' +
          '<div class="chat-thread-side"><time>' + timeShort(t.at) + '</time>' +
          (t.unread ? '<span class="chat-unread">' + t.unread + '</span>' : '') + '</div></li>';
      }).join('') + '</ul>';
      root.querySelectorAll('.chat-thread').forEach(function (li) {
        li.addEventListener('click', function () { openConversation(li.dataset.id, li.dataset.name); });
      });
    });
  }

  function openConversation(id, name) {
    peerId = id; peerName = name || '—';
    root.innerHTML =
      '<div class="chat-head"><button class="chat-back" type="button" aria-label="Geri">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<span class="appt-avatar">' + esc(initials(peerName)) + '</span><strong>' + esc(peerName) + '</strong></div>' +
      '<div class="chat-stream" id="chatStream"></div>' +
      '<form class="chat-input" id="chatInput"><input type="text" placeholder="Mesaj yazın…" autocomplete="off" />' +
        '<button type="submit" aria-label="Gönder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form>';
    root.querySelector('.chat-back').addEventListener('click', renderInbox);
    var form = root.querySelector('#chatInput');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var inp = form.querySelector('input'); var body = inp.value.trim();
      if (!body) return;
      inp.value = '';
      H.sendMessage(peerId, body).then(function (r) {
        if (r && r.ok && r.data) appendBubble(r.data);
      });
    });
    H.conversation(id).then(function (msgs) {
      var s = root.querySelector('#chatStream');
      s.innerHTML = msgs.map(bubbleHtml).join('') || '<div class="chat-empty sm"><p>' + esc(emptyText) + '</p></div>';
      s.scrollTop = s.scrollHeight;
    });
    H.markRead(id);
  }

  function bubbleHtml(m) {
    var mine = m.sender_id === me.id;
    return '<div class="chat-bubble ' + (mine ? 'mine' : 'theirs') + '"><p>' + esc(m.body) + '</p><time>' + timeShort(m.created_at) + '</time></div>';
  }
  function appendBubble(m) {
    var s = root.querySelector('#chatStream'); if (!s) return;
    var empty = s.querySelector('.chat-empty'); if (empty) s.innerHTML = '';
    s.insertAdjacentHTML('beforeend', bubbleHtml(m));
    s.scrollTop = s.scrollHeight;
  }
})();
