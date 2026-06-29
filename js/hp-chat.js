/* ============================================================
   Healthperia — hp-chat.js
   Realtime chat for the panels. WhatsApp-style. Inbox (threads)
   + conversation view rendered into a container.
   Features: round avatars, document/photo attachments, emoji
   reactions, date separators, mute / delete-chat, report peer,
   treatment-listing context. Requires window.HP (hp-api.js).

   INSTANTIABLE: window.HPChat is a default instance; call
   HPChat.create() for an extra independent instance (e.g. the
   doctor↔admin support chat alongside the patient inbox).
   - mount(container, {excludeRole, emptyText, onReadChange})
   - mountDirect(container, peerId, name, opts) → pinned single
     conversation (no inbox, no back/report), used for support.
   - openWith(id, name, opts) → jump straight into a conversation.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP;

  /* ---------- stateless helpers (shared by all instances) ---------- */
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function T(k, fb){ return (window.HPI && HPI.t) ? HPI.t(k, fb) : fb; }
  function initials(name){
    if (!name) return '?';
    var p = String(name).replace(/^Dr\.?\s*/i,'').trim().split(/\s+/);
    return (((p[0]||'')[0]||'') + ((p[1]||'')[0]||'')).toUpperCase() || '?';
  }
  function dayDiff(d, now){
    var a = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var b = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((b - a) / 86400000);
  }
  function timeShort(ts){
    try {
      var d = new Date(ts), diff = dayDiff(d, new Date());
      if (diff <= 0) return d.toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit' });
      if (diff === 1) return T('chat.yesterday', 'Dün');
      return d.toLocaleDateString('tr-TR', { day:'2-digit', month:'2-digit', year:'numeric' });
    } catch (_) { return ''; }
  }
  function bubbleTime(ts){ try { return new Date(ts).toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit' }); } catch (_) { return ''; } }
  function daySep(ts){
    var d = new Date(ts), diff = dayDiff(d, new Date());
    if (diff <= 0) return T('chat.today', 'Bugün');
    if (diff === 1) return T('chat.yesterday', 'Dün');
    return d.toLocaleDateString('tr-TR', { day:'2-digit', month:'2-digit', year:'numeric' });
  }
  function avatarHtml(name, url){
    if (url) return '<span class="hp-avatar"><img src="' + esc(url) + '" alt="" loading="lazy"></span>';
    return '<span class="hp-avatar is-initials">' + esc(initials(name)) + '</span>';
  }

  var EMOJIS = ['👍','❤️','🙏','😊','😮','😢'];
  var INSERT_EMOJIS = ['🙂','😀','😉','😍','😅','😂','😢','😮','👍','🙏','❤️','💪','🩺','💊','✅','🎉'];
  var SVG_BACK  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
  var SVG_SEND  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var SVG_DOTS  = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>';
  var SVG_MUTE  = '<svg class="chat-mute-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18M18 8a6 6 0 0 0-9-1.7M6 9v3l-2 2v1h11M9 18a2 2 0 0 0 3.5 1.3"/></svg>';
  var SVG_DOC   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>';
  var SVG_PHOTO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5L5 20"/></svg>';
  var SVG_PLUS  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>';

  /* ---------- one chat instance (own state, own realtime channel) ---------- */
  function makeChat() {
    var root, me, peerId = null, peer = null, sub = null, emptyText = 'Henüz mesaj yok.', onRead = null;
    var bubbleMsgs = {};         // mid → message (current conversation)
    var pendingListing = null;   // { code, label } attached to the next sent message
    var renderGen = 0;           // guards async renders against a later view change
    var excludeRole = null;      // hide inbox threads whose peer has this role
    var pinned = false;          // single fixed conversation (no inbox / back / report)
    var chanTag = 'i' + Math.random().toString(36).slice(2, 8);

    function mount(container, opts) {
      opts = opts || {};
      root = container; me = H.currentUser();
      emptyText = opts.emptyText || emptyText;
      onRead = opts.onReadChange || null;
      excludeRole = opts.excludeRole || null;
      pinned = false;
      root.classList.add('hp-chat');
      renderInbox();
      subscribe();
      if (window.HPI && HPI.onChange) HPI.onChange(function () { if (!peerId) renderInbox(); });
      document.addEventListener('click', closePops);
    }
    /* pinned single conversation (e.g. doctor → admin support) */
    function mountDirect(container, id, name, opts) {
      opts = opts || {};
      root = container; me = H.currentUser();
      emptyText = opts.emptyText || emptyText;
      onRead = opts.onReadChange || null;
      excludeRole = null; pinned = true;
      root.classList.add('hp-chat', 'hp-chat-pinned');
      subscribe();
      document.addEventListener('click', closePops);
      openConversation(id, name, { pinned: true });
    }
    function subscribe() {
      if (sub) { try { H.sb.removeChannel(sub); } catch (_) {} }
      sub = H.subscribeMessages(function (payload) {
        var m = payload && payload.new; if (!m) return;
        var other = m.sender_id === me.id ? m.receiver_id : m.sender_id;
        if (payload.eventType === 'UPDATE') {
          if (peerId && other === peerId) { bubbleMsgs[m.id] = m; updateBubble(m); }
          return;
        }
        if (peerId && other === peerId) { appendBubble(m); H.markRead(peerId).then(notifyRead); }
        else if (!pinned) { renderInbox(); notifyRead(); }
      }, chanTag);
    }
    function openWith(id, name, opts) {
      if (window.Dashboard && Dashboard.showSection) Dashboard.showSection('messages');
      openConversation(id, name, opts);
    }
    function notifyRead() { if (onRead) { try { onRead(); } catch (_) {} } }

    function closePops(){ if (root) root.querySelectorAll('.chat-pop').forEach(function (p) { p.remove(); }); }

    /* ---------- INBOX ---------- */
    function renderInbox() {
      var gen = ++renderGen;
      peerId = null; peer = null; bubbleMsgs = {};
      root.innerHTML = '<div class="chat-loading">…</div>';
      Promise.all([H.inbox(), H.threadStates()]).then(function (res) {
        if (gen !== renderGen) return;   // a conversation was opened meanwhile
        var msgs = res[0], states = res[1] || {};
        var threads = {};
        msgs.forEach(function (m) {
          var mineSent = m.sender_id === me.id;
          var other = mineSent ? m.receiver : m.sender;
          var otherId = mineSent ? m.receiver_id : m.sender_id;
          if (!otherId) return;
          if (!threads[otherId]) {
            threads[otherId] = {
              id: otherId, name: (other && other.name) || '—',
              avatar: (other && other.avatar_url) || '', role: (other && other.role) || '',
              last: preview(m), at: m.created_at, unread: 0, listingCode: '', listingLabel: ''
            };
          }
          if (m.listing_code && !threads[otherId].listingCode) {
            threads[otherId].listingCode = m.listing_code;
            threads[otherId].listingLabel = m.listing_label || '';
          }
          if (!mineSent && !m.read) threads[otherId].unread++;
        });
        var list = Object.keys(threads).map(function (k){ return threads[k]; }).filter(function (t) {
          if (excludeRole && t.role === excludeRole) return false;   // e.g. hide admin support from the patient inbox
          var st = states[t.id];
          if (st && st.cleared_at && new Date(t.at) <= new Date(st.cleared_at)) return false;
          t.muted = !!(st && st.muted);
          return true;
        });
        if (!list.length) { root.innerHTML = '<div class="chat-empty"><p>' + esc(emptyText) + '</p></div>'; return; }
        root.innerHTML = '<ul class="chat-threads">' + list.map(function (t) {
          return '<li class="chat-thread' + (t.unread ? ' is-unread' : '') + '" data-id="' + t.id + '" data-name="' + esc(t.name) + '" data-muted="' + (t.muted ? '1' : '0') + '">' +
            avatarHtml(t.name, t.avatar) +
            '<div class="chat-thread-meta"><strong>' + esc(t.name) + '</strong>' +
              '<span class="chat-thread-last">' + (t.listingCode ? '<i class="chat-thread-tag">' + esc(t.listingCode) + '</i> ' : '') + esc(t.last) + '</span></div>' +
            '<div class="chat-thread-side"><time>' + timeShort(t.at) + '</time>' +
              '<div class="chat-thread-flags">' + (t.muted ? SVG_MUTE : '') +
                (t.unread ? '<span class="chat-unread">' + t.unread + '</span>' : '') + '</div></div>' +
            '<button class="chat-thread-menu" type="button" aria-label="' + esc(T('chat.options', 'Seçenekler')) + '">' + SVG_DOTS + '</button>' +
          '</li>';
        }).join('') + '</ul>';
        root.querySelectorAll('.chat-thread').forEach(function (li) {
          li.addEventListener('click', function (e) {
            if (e.target.closest('.chat-thread-menu') || e.target.closest('.chat-pop')) return;
            openConversation(li.dataset.id, li.dataset.name);
          });
          li.querySelector('.chat-thread-menu').addEventListener('click', function (e) {
            e.stopPropagation(); openThreadPop(li);
          });
        });
      });
    }
    function preview(m){
      if (m.attachment_url) {
        var tag = m.attachment_type === 'photo' ? '📷 ' + T('chat.photo', 'Fotoğraf') : '📄 ' + T('chat.document', 'Belge');
        return m.body ? tag + ' · ' + m.body : tag;
      }
      return m.body || '';
    }
    function openThreadPop(li){
      var wasOpen = li.querySelector('.chat-pop'); closePops(); if (wasOpen) return;
      var muted = li.dataset.muted === '1';
      var pop = document.createElement('div');
      pop.className = 'chat-pop chat-thread-pop';
      pop.innerHTML =
        '<button type="button" data-act="mute">' + (muted ? T('chat.unmute', 'Bildirimi Aç') : T('chat.mute', 'Bildirimi Kapat')) + '</button>' +
        '<button type="button" data-act="delete" class="danger">' + T('chat.delete', 'Sohbeti Sil') + '</button>';
      li.appendChild(pop);
      pop.querySelector('[data-act=mute]').addEventListener('click', function (e) {
        e.stopPropagation(); closePops(); H.muteThread(li.dataset.id, !muted).then(renderInbox);
      });
      pop.querySelector('[data-act=delete]').addEventListener('click', function (e) {
        e.stopPropagation(); closePops();
        if (confirm(T('chat.deleteConfirm', 'Bu sohbet sizin için silinecek. Devam edilsin mi?')))
          H.clearConversation(li.dataset.id).then(renderInbox);
      });
    }

    /* ---------- CONVERSATION ---------- */
    function openConversation(id, name, opts) {
      opts = opts || {};
      renderGen++;   // invalidate any in-flight inbox render so it can't clobber us
      peerId = id; peer = { id: id, name: name || '—', avatar: '' };
      bubbleMsgs = {};
      pendingListing = opts.listingCode ? { code: opts.listingCode, label: opts.listingLabel || '' } : null;
      var reportLabel = me.role === 'doctor' ? T('chat.reportPatient', 'Hastayı Şikâyet Et') : T('chat.reportDoctor', 'Doktoru Şikâyet Et');
      var backBtn = pinned ? '' : '<button class="chat-back" type="button" aria-label="' + esc(T('chat.back','Geri')) + '">' + SVG_BACK + '</button>';
      var headMenu = pinned ? '' : '<button class="chat-head-menu" type="button" aria-label="' + esc(T('chat.options','Seçenekler')) + '">' + SVG_DOTS + '</button>';

      root.innerHTML =
        '<div class="chat-head">' + backBtn +
          avatarHtml(peer.name, '') +
          '<div class="chat-head-name"><strong>' + esc(peer.name) + '</strong></div>' +
          headMenu +
        '</div>' +
        '<div class="chat-stream" id="chatStream"></div>' +
        (pendingListing ? composeBannerHtml(pendingListing) : '') +
        '<form class="chat-input" id="chatInput">' +
          '<button type="button" class="chat-attach-btn" aria-label="' + esc(T('chat.attach','Ekle')) + '">' + SVG_PLUS + '</button>' +
          '<input type="file" class="chat-file-doc" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,image/*" hidden>' +
          '<input type="file" class="chat-file-photo" accept="image/*" hidden>' +
          '<input type="text" class="chat-text" placeholder="' + esc(T('chat.placeholder','Mesaj yazın…')) + '" autocomplete="off" />' +
          '<button type="button" class="chat-emoji-btn" aria-label="Emoji">🙂</button>' +
          '<button type="submit" aria-label="' + esc(T('chat.send','Gönder')) + '">' + SVG_SEND + '</button>' +
        '</form>';

      var bb = root.querySelector('.chat-back'); if (bb) bb.addEventListener('click', renderInbox);
      var hm = root.querySelector('.chat-head-menu'); if (hm) hm.addEventListener('click', function (e) { e.stopPropagation(); openHeadPop(reportLabel); });
      wireComposer();
      refinePeer(id);

      H.conversation(id).then(function (msgs) {
        if (peerId !== id) return;   // user navigated away before this resolved
        var s = root.querySelector('#chatStream'); if (!s) return;
        if (!msgs.length) { s.innerHTML = '<div class="chat-empty sm"><p>' + esc(emptyText) + '</p></div>'; }
        else {
          msgs.forEach(function (m) { bubbleMsgs[m.id] = m; });
          var listing = firstListing(msgs);
          var html = listing ? listingBannerHtml(listing) : '';
          var lastDay = null;
          msgs.forEach(function (m) {
            var dk = new Date(m.created_at).toDateString();
            if (dk !== lastDay) { html += '<div class="chat-daysep"><span>' + esc(daySep(m.created_at)) + '</span></div>'; lastDay = dk; }
            html += bubbleHtml(m);
          });
          s.innerHTML = html;
        }
        s.scrollTop = s.scrollHeight;
      });
      H.markRead(id).then(notifyRead);
    }

    function refinePeer(id){
      H.sb.from('profiles').select('name,avatar_url,role').eq('id', id).single().then(function (r) {
        if (!r.data || peerId !== id) return;
        peer.avatar = r.data.avatar_url || '';
        if (r.data.name) peer.name = r.data.name;
        var head = root.querySelector('.chat-head');
        if (head) {
          var av = head.querySelector('.hp-avatar');
          if (av) av.outerHTML = avatarHtml(peer.name, peer.avatar);
          var nm = head.querySelector('.chat-head-name strong'); if (nm) nm.textContent = peer.name;
        }
      });
    }

    function firstListing(msgs){
      for (var i = 0; i < msgs.length; i++) if (msgs[i].listing_code) return { code: msgs[i].listing_code, label: msgs[i].listing_label || '' };
      return null;
    }
    function listingBannerHtml(l){
      return '<div class="chat-listing-banner">' +
        '<span class="cl-ic">🏷️</span><div><strong>' + esc(l.label || T('chat.listing','Tedavi İlanı')) + '</strong>' +
        '<small>' + esc(T('chat.listingFrom','Bu görüşme bir tedavi ilanından başladı')) + ' · ' + T('chat.code','Kod') + ': ' + esc(l.code) + '</small></div></div>';
    }
    function composeBannerHtml(l){
      return '<div class="chat-compose-banner"><span>🏷️ ' + esc(l.label || T('chat.listing','Tedavi İlanı')) + ' · ' + T('chat.code','Kod') + ': ' + esc(l.code) +
        '</span><button type="button" class="ccb-x" aria-label="Kaldır">×</button></div>';
    }

    /* ---------- header menu → report ---------- */
    function openHeadPop(reportLabel){
      var head = root.querySelector('.chat-head');
      var wasOpen = head.querySelector('.chat-pop'); closePops(); if (wasOpen) return;
      var pop = document.createElement('div');
      pop.className = 'chat-pop chat-head-pop';
      pop.innerHTML = '<button type="button" data-act="report" class="danger">' + esc(reportLabel) + '</button>';
      head.appendChild(pop);
      pop.querySelector('[data-act=report]').addEventListener('click', function (e) { e.stopPropagation(); closePops(); openReportModal(); });
    }

    function openReportModal(){
      var who = me.role === 'doctor' ? T('chat.reportPatient', 'Hastayı Şikâyet Et') : T('chat.reportDoctor', 'Doktoru Şikâyet Et');
      var reasons = [
        ['conduct',  T('chat.reportR1', 'Uygunsuz davranış')],
        ['misinfo',  T('chat.reportR2', 'Yanıltıcı / yanlış bilgi')],
        ['spam',     T('chat.reportR3', 'Spam / istenmeyen mesaj')],
        ['other',    T('chat.reportR4', 'Diğer')]
      ];
      var ov = document.createElement('div');
      ov.className = 'chat-report-overlay';
      ov.innerHTML =
        '<div class="chat-report-modal" role="dialog" aria-modal="true">' +
          '<h4>' + esc(who) + '</h4>' +
          '<p>' + esc(peer.name) + '</p>' +
          '<label>' + esc(T('chat.reportReason','Sebep')) + '</label>' +
          '<select class="cr-reason">' + reasons.map(function (r){ return '<option value="' + r[0] + '">' + esc(r[1]) + '</option>'; }).join('') + '</select>' +
          '<label>' + esc(T('chat.reportDetail','Açıklama (isteğe bağlı)')) + '</label>' +
          '<textarea class="cr-detail" rows="3" placeholder="' + esc(T('chat.reportPh','Olayı kısaca açıklayın…')) + '"></textarea>' +
          '<div class="cr-actions"><button type="button" class="cr-cancel">' + esc(T('chat.cancel','İptal')) + '</button>' +
            '<button type="button" class="cr-submit">' + esc(T('chat.reportSend','Şikâyet Gönder')) + '</button></div>' +
        '</div>';
      document.body.appendChild(ov);
      function close(){ ov.remove(); }
      ov.addEventListener('click', function (e){ if (e.target === ov) close(); });
      ov.querySelector('.cr-cancel').addEventListener('click', close);
      ov.querySelector('.cr-submit').addEventListener('click', function () {
        var reason = ov.querySelector('.cr-reason').value;
        var detail = ov.querySelector('.cr-detail').value.trim();
        var label = reasons.filter(function (r){ return r[0] === reason; })[0];
        H.reportUser({ reportedId: peerId, reason: label ? label[1] : reason, detail: detail }).then(function (r) {
          ov.querySelector('.chat-report-modal').innerHTML =
            '<h4>' + esc(T('chat.reportDoneT','Şikâyetiniz alındı')) + '</h4>' +
            '<p>' + esc(r && r.ok ? T('chat.reportDone','Ekibimiz en kısa sürede inceleyecek. Teşekkürler.') : T('chat.reportErr','Bir hata oluştu, lütfen tekrar deneyin.')) + '</p>' +
            '<div class="cr-actions"><button type="button" class="cr-close">' + esc(T('chat.close','Kapat')) + '</button></div>';
          ov.querySelector('.cr-close').addEventListener('click', close);
        });
      });
    }

    /* ---------- bubbles + reactions ---------- */
    function bubbleHtml(m) {
      var mine = m.sender_id === me.id;
      var inner = '';
      if (m.attachment_url) {
        if (m.attachment_type === 'photo') {
          inner += '<a class="chat-att-photo" href="' + esc(m.attachment_url) + '" target="_blank" rel="noopener"><img src="' + esc(m.attachment_url) + '" alt="" loading="lazy"></a>';
        } else {
          inner += '<a class="chat-att-doc" href="' + esc(m.attachment_url) + '" target="_blank" rel="noopener" download>' + SVG_DOC +
            '<span>' + esc(m.attachment_name || T('chat.document','Belge')) + '</span></a>';
        }
      }
      if (m.body) inner += '<p>' + esc(m.body) + '</p>';
      var myReact = (m.reactions && m.reactions[me.id]) || '';
      return '<div class="chat-bubble ' + (mine ? 'mine' : 'theirs') + '" data-mid="' + m.id + '" data-myreact="' + esc(myReact) + '">' +
        inner + '<time>' + bubbleTime(m.created_at) + '</time>' +
        reactionsHtml(m) +
        '<button class="chat-react-btn" type="button" aria-label="' + esc(T('chat.react','Tepki ver')) + '">🙂</button>' +
      '</div>';
    }
    function reactionsHtml(m){
      var r = m.reactions || {}; var keys = Object.keys(r); if (!keys.length) return '';
      var counts = {}; keys.forEach(function (k){ counts[r[k]] = (counts[r[k]] || 0) + 1; });
      var mineEmoji = r[me.id];
      return '<div class="chat-reacts">' + Object.keys(counts).map(function (e) {
        return '<span class="chat-react' + (mineEmoji === e ? ' is-mine' : '') + '">' + e + (counts[e] > 1 ? '<i>' + counts[e] + '</i>' : '') + '</span>';
      }).join('') + '</div>';
    }
    function appendBubble(m) {
      var s = root.querySelector('#chatStream'); if (!s) return;
      if (m.id && s.querySelector('[data-mid="' + m.id + '"]')) return;
      bubbleMsgs[m.id] = m;
      var empty = s.querySelector('.chat-empty'); if (empty) s.innerHTML = '';
      var last = s.querySelector('.chat-bubble:last-of-type');
      var needSep = true;
      if (last && bubbleMsgs[last.dataset.mid]) needSep = new Date(bubbleMsgs[last.dataset.mid].created_at).toDateString() !== new Date(m.created_at).toDateString();
      if (needSep) s.insertAdjacentHTML('beforeend', '<div class="chat-daysep"><span>' + esc(daySep(m.created_at)) + '</span></div>');
      s.insertAdjacentHTML('beforeend', bubbleHtml(m));
      s.scrollTop = s.scrollHeight;
    }
    function updateBubble(m){
      var s = root.querySelector('#chatStream'); if (!s) return;
      var el = s.querySelector('[data-mid="' + m.id + '"]'); if (!el) return;
      el.outerHTML = bubbleHtml(m);
    }

    /* reaction picker (event-delegated on the stream) */
    function onStreamClick(e){
      var rbtn = e.target.closest('.chat-react-btn');
      if (rbtn) { e.stopPropagation(); openReactPop(rbtn.closest('.chat-bubble')); return; }
      var emo = e.target.closest('.chat-pop.chat-react-pop button');
      if (emo) {
        e.stopPropagation();
        var bubble = emo.closest('.chat-bubble'); var mid = bubble.dataset.mid;
        var chosen = emo.dataset.emoji;
        var m = bubbleMsgs[mid]; if (m) {
          m.reactions = m.reactions || {};
          if (m.reactions[me.id] === chosen) delete m.reactions[me.id]; else m.reactions[me.id] = chosen;
          H.reactToMessage(mid, m.reactions[me.id] || '');
          updateBubble(m);
        }
        closePops();
      }
    }
    function openReactPop(bubble){
      var wasOpen = bubble.querySelector('.chat-react-pop'); closePops(); if (wasOpen) return;
      var mine = bubble.dataset.myreact;
      var pop = document.createElement('div');
      pop.className = 'chat-pop chat-react-pop';
      pop.innerHTML = EMOJIS.map(function (e){ return '<button type="button" data-emoji="' + e + '"' + (mine === e ? ' class="on"' : '') + '>' + e + '</button>'; }).join('');
      bubble.appendChild(pop);
    }

    /* ---------- composer (text, attachments, emoji insert) ---------- */
    function wireComposer(){
      var form = root.querySelector('#chatInput');
      var text = form.querySelector('.chat-text');
      var stream = root.querySelector('#chatStream');
      stream.addEventListener('click', onStreamClick);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var body = text.value.trim(); if (!body) return;
        text.value = '';
        send(body, {});
      });

      var ccx = root.querySelector('.ccb-x');
      if (ccx) ccx.addEventListener('click', function () { clearPendingListing(); });

      form.querySelector('.chat-attach-btn').addEventListener('click', function (e) { e.stopPropagation(); openAttachPop(form); });
      var docInp = form.querySelector('.chat-file-doc'), phInp = form.querySelector('.chat-file-photo');
      docInp.addEventListener('change', function () { if (docInp.files[0]) sendAttachment(docInp.files[0], 'document'); docInp.value = ''; });
      phInp.addEventListener('change', function () { if (phInp.files[0]) sendAttachment(phInp.files[0], 'photo'); phInp.value = ''; });

      form.querySelector('.chat-emoji-btn').addEventListener('click', function (e) { e.stopPropagation(); openEmojiPop(form, text); });
    }
    function openAttachPop(form){
      var wasOpen = form.querySelector('.chat-attach-pop'); closePops(); if (wasOpen) return;
      var pop = document.createElement('div');
      pop.className = 'chat-pop chat-attach-pop';
      pop.innerHTML =
        '<button type="button" data-k="doc">' + SVG_DOC + '<span>' + esc(T('chat.document','Belge')) + '</span></button>' +
        '<button type="button" data-k="photo">' + SVG_PHOTO + '<span>' + esc(T('chat.photo','Fotoğraf')) + '</span></button>';
      form.appendChild(pop);
      pop.querySelector('[data-k=doc]').addEventListener('click', function (e) { e.stopPropagation(); closePops(); form.querySelector('.chat-file-doc').click(); });
      pop.querySelector('[data-k=photo]').addEventListener('click', function (e) { e.stopPropagation(); closePops(); form.querySelector('.chat-file-photo').click(); });
    }
    function openEmojiPop(form, text){
      var wasOpen = form.querySelector('.chat-emoji-pop'); closePops(); if (wasOpen) return;
      var pop = document.createElement('div');
      pop.className = 'chat-pop chat-emoji-pop';
      pop.innerHTML = INSERT_EMOJIS.map(function (e){ return '<button type="button">' + e + '</button>'; }).join('');
      form.appendChild(pop);
      pop.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function (e) { e.stopPropagation(); text.value += b.textContent; text.focus(); });
      });
    }

    function send(body, extra){
      extra = consumeListing(extra);
      H.sendMessage(peerId, body, extra).then(function (r) {
        if (r && r.ok && r.data) { appendBubble(r.data); clearPendingListing(); }
      });
    }
    function sendAttachment(file, type){
      var s = root.querySelector('#chatStream');
      var note = document.createElement('div'); note.className = 'chat-uploading'; note.textContent = T('chat.uploading','Yükleniyor…');
      if (s) { s.appendChild(note); s.scrollTop = s.scrollHeight; }
      H.uploadChatFile(file).then(function (u) {
        if (note.parentNode) note.remove();
        if (!u || !u.ok) { alert(T('chat.uploadErr','Dosya yüklenemedi.')); return; }
        var extra = consumeListing({ attachmentUrl: u.url, attachmentType: type, attachmentName: u.name });
        H.sendMessage(peerId, '', extra).then(function (r) {
          if (r && r.ok && r.data) { appendBubble(r.data); clearPendingListing(); }
        });
      });
    }
    function consumeListing(extra){
      extra = extra || {};
      if (pendingListing) { extra.listingCode = pendingListing.code; extra.listingLabel = pendingListing.label; }
      return extra;
    }
    function clearPendingListing(){
      if (!pendingListing) return;
      pendingListing = null;
      var b = root.querySelector('.chat-compose-banner'); if (b) b.remove();
    }

    return { mount: mount, mountDirect: mountDirect, openWith: openWith };
  }

  /* default instance + factory for extra instances */
  var def = makeChat();
  window.HPChat = {
    mount:       function (c, o)       { return def.mount(c, o); },
    mountDirect: function (c, i, n, o) { return def.mountDirect(c, i, n, o); },
    openWith:    function (i, n, o)    { return def.openWith(i, n, o); },
    create:      makeChat
  };
})();
