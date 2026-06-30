/* ============================================================
   Healthperia — admin-approvals.js
   Admin "İçerik Onayları" paneli: doktorların yayına gönderdiği
   bekleyen İLANLAR + hastane/klinik hesaplarının yayına gönderdiği
   bekleyen TESİSLER. Onayla → published / Reddet. window.HP.
   ============================================================ */
(function () {
  'use strict';
  var H = window.HP;
  var root = document.getElementById('approvalsRoot');
  if (!root || !H) return;

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function T(k, fb){ return (window.HPI && HPI.t) ? HPI.t(k, fb) : (fb || k); }

  function render() {
    return Promise.all([H.listPendingListings(), H.listPendingFacilities()]).then(function (r) {
      var listings = r[0] || [], facs = r[1] || [];
      var total = listings.length + facs.length;
      var badge = document.getElementById('approvalsBadge');
      if (badge) { badge.textContent = total; badge.style.display = total ? '' : 'none'; }

      var lHtml = listings.length
        ? '<ul class="req-list">' + listings.map(function (l) {
            return '<li data-lid="' + esc(l.id) + '"><span class="appt-avatar sm">İ</span>' +
              '<div class="appt-info"><strong>' + esc(l.headline || l.code) + '</strong><span>' + esc(T('ad.appr.code','Kod')) + ': ' + esc(l.code) + ' · ' + esc((l.doctor && l.doctor.name) || '—') + '</span></div>' +
              '<div class="req-actions"><a class="btn-mini" href="treatment-detail.html?id=' + esc(l.id) + '" target="_blank" rel="noopener">' + esc(T('ad.appr.view','İncele')) + '</a>' +
              '<button class="btn-mini ok" data-appr-listing="' + esc(l.id) + '">' + esc(T('ad.approve','Onayla')) + '</button>' +
              '<button class="btn-mini no" data-rej-listing="' + esc(l.id) + '">' + esc(T('ad.reject','Reddet')) + '</button></div></li>';
          }).join('') + '</ul>'
        : '<div class="empty-state sm"><p>' + esc(T('ad.appr.noListings','Onay bekleyen ilan yok.')) + '</p></div>';

      var fHtml = facs.length
        ? '<ul class="req-list">' + facs.map(function (f) {
            var typ = f.kind === 'clinic' ? T('acc.role.clinic','Klinik') : T('acc.role.hospital','Hastane');
            return '<li data-fid="' + esc(f.id) + '"><span class="appt-avatar sm">' + (f.kind === 'clinic' ? 'K' : 'H') + '</span>' +
              '<div class="appt-info"><strong>' + esc(f.name) + '</strong><span><span class="badge badge-blue" style="margin-right:6px">' + esc(typ) + '</span>' + esc([f.city, f.country].filter(Boolean).join(', ') || '—') + '</span></div>' +
              '<div class="req-actions"><button class="btn-mini ok" data-appr-fac="' + esc(f.id) + '" data-kind="' + esc(f.kind) + '">' + esc(T('ad.approve','Onayla')) + '</button>' +
              '<button class="btn-mini no" data-rej-fac="' + esc(f.id) + '" data-kind="' + esc(f.kind) + '">' + esc(T('ad.reject','Reddet')) + '</button></div></li>';
          }).join('') + '</ul>'
        : '<div class="empty-state sm"><p>' + esc(T('ad.appr.noFacilities','Onay bekleyen tesis yok.')) + '</p></div>';

      root.innerHTML =
        '<div class="card"><div class="card-head"><h3>' + esc(T('ad.appr.listings','Bekleyen İlanlar')) + '</h3></div>' + lHtml + '</div>' +
        '<div class="card" style="margin-top:18px"><div class="card-head"><h3>' + esc(T('ad.appr.facilities','Bekleyen Tesisler')) + '</h3></div>' + fHtml + '</div>';
      wire();
    });
  }

  function wire() {
    root.querySelectorAll('[data-appr-listing]').forEach(function (b){ b.addEventListener('click', function(){ H.approveListing(b.dataset.apprListing).then(render); }); });
    root.querySelectorAll('[data-rej-listing]').forEach(function (b){ b.addEventListener('click', function(){ H.rejectListing(b.dataset.rejListing).then(render); }); });
    root.querySelectorAll('[data-appr-fac]').forEach(function (b){ b.addEventListener('click', function(){ H.approveFacility(b.dataset.kind, b.dataset.apprFac).then(render); }); });
    root.querySelectorAll('[data-rej-fac]').forEach(function (b){ b.addEventListener('click', function(){ if (confirm(T('ad.appr.confirmReject','Bu tesisi reddedip silmek istiyor musunuz?'))) H.rejectFacility(b.dataset.kind, b.dataset.rejFac).then(render); }); });
  }

  if (H.ready && H.ready.then) H.ready.then(render); else render();
  if (window.HPI && HPI.onChange) HPI.onChange(render);
})();
