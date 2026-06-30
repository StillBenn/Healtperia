/* ============================================================
   Healthperia — Facility dashboard translations (df.*)
   TR + EN tam; diğer diller yapısal anahtarlar (alan etiketleri TR fallback).
   ============================================================ */
window.HP_I18N = window.HP_I18N || {};
(function (I) {
  function add(lang, obj) { I[lang] = Object.assign(I[lang] || {}, obj); }

  add('tr', {
    'df.group':'Tesis','df.crumb':'Tesis Paneli','df.nav.profile':'Tesis Profilim',
    'df.welcome':'Hoş geldiniz 🏥','df.intro':'Tesis profilinizi düzenleyin; admin onayından sonra indekste yayınlanır.',
    'df.editProfile':'Tesis Profilini Düzenle','df.statusTitle':'Yayın Durumu',
    'df.status.published':'Yayında','df.status.pending':'Onay Bekliyor',
    'df.curStatus':'Mevcut durum','df.pendingHint':'Profiliniz admin onayını bekliyor.','df.publishedHint':'Profiliniz indekste yayında.',
    'df.noFacility':'Henüz tesis profiliniz yok. "Tesis Profilim"den oluşturun.',
    'df.f.name':'Tesis Adı','df.f.type':'Hastane Türü','df.f.unit':'Tıbbi Birim','df.f.country':'Ülke','df.f.city':'Şehir','df.f.maps':'Google Maps Linki','df.f.desc':'Açıklama',
    'df.f.units':'Tıbbi Birimler (her satıra bir)','df.f.capacity':'Kapasite (her satır: Etiket|Değer)','df.f.comfort':'Konfor (her satıra bir)','df.f.standards':'Standartlar (her satıra bir)','df.f.treatments':'Tedaviler (her satıra bir)',
    'df.f.logo':'Logo','df.f.photos':'Fotoğraflar','df.upLogo':'Logo Yükle','df.upPhoto':'Foto Ekle','df.noLogo':'Logo yok','df.noPhoto':'Foto yok',
    'df.saveNote':'Kaydettiğinizde profiliniz admin onayına gönderilir; onaylanınca indekste yayınlanır.','df.save':'Kaydet ve Onaya Gönder',
    'df.errName':'Tesis adı zorunlu.','df.errSave':'Kaydedilemedi.','df.noMsg':'Henüz mesajınız yok.'
  });
  add('en', {
    'df.group':'Facility','df.crumb':'Facility Panel','df.nav.profile':'My Facility',
    'df.welcome':'Welcome 🏥','df.intro':'Edit your facility profile; it appears in the index after admin approval.',
    'df.editProfile':'Edit Facility Profile','df.statusTitle':'Publication Status',
    'df.status.published':'Published','df.status.pending':'Pending Approval',
    'df.curStatus':'Current status','df.pendingHint':'Your profile is awaiting admin approval.','df.publishedHint':'Your profile is live in the index.',
    'df.noFacility':'You have no facility profile yet. Create one under "My Facility".',
    'df.f.name':'Facility Name','df.f.type':'Hospital Type','df.f.unit':'Medical Unit','df.f.country':'Country','df.f.city':'City','df.f.maps':'Google Maps Link','df.f.desc':'Description',
    'df.f.units':'Medical Units (one per line)','df.f.capacity':'Capacity (each line: Label|Value)','df.f.comfort':'Comfort (one per line)','df.f.standards':'Standards (one per line)','df.f.treatments':'Treatments (one per line)',
    'df.f.logo':'Logo','df.f.photos':'Photos','df.upLogo':'Upload Logo','df.upPhoto':'Add Photo','df.noLogo':'No logo','df.noPhoto':'No photos',
    'df.saveNote':'When you save, your profile is sent for admin approval; once approved it is published in the index.','df.save':'Save & Submit for Approval',
    'df.errName':'Facility name is required.','df.errSave':'Could not save.','df.noMsg':'No messages yet.'
  });
  /* diğer diller: yapısal anahtarlar (alan etiketleri TR fallback) */
  add('de', { 'df.group':'Einrichtung','df.crumb':'Einrichtungspanel','df.nav.profile':'Meine Einrichtung','df.welcome':'Willkommen 🏥','df.intro':'Bearbeiten Sie Ihr Profil; nach Freigabe erscheint es im Index.','df.editProfile':'Profil bearbeiten','df.statusTitle':'Veröffentlichungsstatus','df.status.published':'Veröffentlicht','df.status.pending':'Wartet auf Freigabe','df.curStatus':'Aktueller Status','df.save':'Speichern & einreichen','df.saveNote':'Nach dem Speichern wird Ihr Profil zur Freigabe gesendet.' });
  add('ru', { 'df.group':'Объект','df.crumb':'Панель объекта','df.nav.profile':'Мой объект','df.welcome':'Добро пожаловать 🏥','df.intro':'Отредактируйте профиль; после одобрения он появится в каталоге.','df.editProfile':'Редактировать профиль','df.statusTitle':'Статус публикации','df.status.published':'Опубликовано','df.status.pending':'Ожидает одобрения','df.curStatus':'Текущий статус','df.save':'Сохранить и отправить','df.saveNote':'После сохранения профиль отправляется на одобрение.' });
  add('fr', { 'df.group':'Établissement','df.crumb':'Panneau établissement','df.nav.profile':'Mon établissement','df.welcome':'Bienvenue 🏥','df.intro':"Modifiez votre profil ; il apparaît dans l'index après approbation.",'df.editProfile':'Modifier le profil','df.statusTitle':'Statut de publication','df.status.published':'Publié','df.status.pending':'En attente','df.curStatus':'Statut actuel','df.save':'Enregistrer et soumettre','df.saveNote':"Après l'enregistrement, votre profil est envoyé pour approbation." });
  add('es', { 'df.group':'Instalación','df.crumb':'Panel de instalación','df.nav.profile':'Mi instalación','df.welcome':'Bienvenido 🏥','df.intro':'Edita tu perfil; aparece en el índice tras la aprobación.','df.editProfile':'Editar perfil','df.statusTitle':'Estado de publicación','df.status.published':'Publicado','df.status.pending':'Pendiente','df.curStatus':'Estado actual','df.save':'Guardar y enviar','df.saveNote':'Al guardar, tu perfil se envía para aprobación.' });
  add('pt', { 'df.group':'Instalação','df.crumb':'Painel da instalação','df.nav.profile':'Minha instalação','df.welcome':'Bem-vindo 🏥','df.intro':'Edite seu perfil; aparece no índice após aprovação.','df.editProfile':'Editar perfil','df.statusTitle':'Status de publicação','df.status.published':'Publicado','df.status.pending':'Aguardando','df.curStatus':'Status atual','df.save':'Salvar e enviar','df.saveNote':'Ao salvar, seu perfil é enviado para aprovação.' });
  add('ar', { 'df.group':'المنشأة','df.crumb':'لوحة المنشأة','df.nav.profile':'منشأتي','df.welcome':'مرحبًا 🏥','df.intro':'حرّر ملفك؛ يظهر في الدليل بعد موافقة الإدارة.','df.editProfile':'تحرير الملف','df.statusTitle':'حالة النشر','df.status.published':'منشور','df.status.pending':'بانتظار الموافقة','df.curStatus':'الحالة الحالية','df.save':'حفظ وإرسال','df.saveNote':'عند الحفظ يُرسَل ملفك للموافقة.' });
  add('nl', { 'df.group':'Faciliteit','df.crumb':'Faciliteitspaneel','df.nav.profile':'Mijn faciliteit','df.welcome':'Welkom 🏥','df.intro':'Bewerk uw profiel; na goedkeuring verschijnt het in de index.','df.editProfile':'Profiel bewerken','df.statusTitle':'Publicatiestatus','df.status.published':'Gepubliceerd','df.status.pending':'Wacht op goedkeuring','df.curStatus':'Huidige status','df.save':'Opslaan en indienen','df.saveNote':'Na opslaan wordt uw profiel ter goedkeuring verzonden.' });
})(window.HP_I18N);
