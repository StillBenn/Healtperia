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

  /* Overview stat kartları + Doktorlarım bölümü (9 dil) */
  add('tr', {
    'df.stat.docs':'Toplam Doktor','df.stat.approved':'Onaylı Doktor','df.stat.pending':'Onay Bekleyen','df.stat.unread':'Okunmamış Mesaj','df.createProfile':'Tesis Profili Oluştur',
    'df.nav.doctors':'Doktorlarım',
    'df.doctors.intro':'Kayıt sırasında tesisinizi seçen doktorlar burada listelenir. Onaylayın; her doktora gelen ve doktorun cevapladığı mesaj sayısını görün (sohbet içeriği görünmez).',
    'df.doctors.empty':'Henüz sizi seçen bir doktor yok. Doktorlar kayıt olurken tesisinizi seçtiğinde burada görünür.',
    'df.doctors.name':'Doktor','df.doctors.status':'Durum','df.doctors.msgs':'Mesaj İstatistiği','df.doctors.approved':'Onaylı','df.doctors.rejected':'Reddedildi','df.doctors.pending':'Onay Bekliyor','df.doctors.received':'Gelen','df.doctors.replied':'Cevaplanan','df.doctors.approveToSee':'Onaylayınca görünür','df.doctors.remove':'Kaldır','df.doctors.approve':'Onayla','df.doctors.reject':'Reddet'
  });
  add('en', {
    'df.stat.docs':'Total Doctors','df.stat.approved':'Approved Doctors','df.stat.pending':'Pending Approval','df.stat.unread':'Unread Messages','df.createProfile':'Create Facility Profile',
    'df.nav.doctors':'My Doctors',
    'df.doctors.intro':'Doctors who selected your facility during registration are listed here. Approve them; see how many messages each doctor received and replied to (chat content is hidden).',
    'df.doctors.empty':'No doctor has selected you yet. They appear here when a doctor selects your facility during registration.',
    'df.doctors.name':'Doctor','df.doctors.status':'Status','df.doctors.msgs':'Message Stats','df.doctors.approved':'Approved','df.doctors.rejected':'Rejected','df.doctors.pending':'Pending','df.doctors.received':'Received','df.doctors.replied':'Replied','df.doctors.approveToSee':'Visible after approval','df.doctors.remove':'Remove','df.doctors.approve':'Approve','df.doctors.reject':'Reject'
  });
  add('de', {
    'df.stat.docs':'Ärzte gesamt','df.stat.approved':'Bestätigte Ärzte','df.stat.pending':'Ausstehend','df.stat.unread':'Ungelesene Nachrichten','df.createProfile':'Einrichtungsprofil erstellen',
    'df.nav.doctors':'Meine Ärzte',
    'df.doctors.intro':'Ärzte, die bei der Registrierung Ihre Einrichtung ausgewählt haben, werden hier aufgeführt. Bestätigen Sie sie; sehen Sie, wie viele Nachrichten jeder Arzt erhalten und beantwortet hat (Chat-Inhalt ist verborgen).',
    'df.doctors.empty':'Noch kein Arzt hat Sie ausgewählt. Sie erscheinen hier, wenn ein Arzt bei der Registrierung Ihre Einrichtung wählt.',
    'df.doctors.name':'Arzt','df.doctors.status':'Status','df.doctors.msgs':'Nachrichtenstatistik','df.doctors.approved':'Bestätigt','df.doctors.rejected':'Abgelehnt','df.doctors.pending':'Ausstehend','df.doctors.received':'Erhalten','df.doctors.replied':'Beantwortet','df.doctors.approveToSee':'Nach Bestätigung sichtbar','df.doctors.remove':'Entfernen','df.doctors.approve':'Bestätigen','df.doctors.reject':'Ablehnen'
  });
  add('ru', {
    'df.stat.docs':'Всего врачей','df.stat.approved':'Одобренные врачи','df.stat.pending':'Ожидают одобрения','df.stat.unread':'Непрочитанные сообщения','df.createProfile':'Создать профиль объекта',
    'df.nav.doctors':'Мои врачи',
    'df.doctors.intro':'Здесь перечислены врачи, выбравшие ваш объект при регистрации. Одобрите их; смотрите, сколько сообщений получил и на сколько ответил каждый врач (содержимое чата скрыто).',
    'df.doctors.empty':'Пока вас никто не выбрал. Врачи появятся здесь, когда выберут ваш объект при регистрации.',
    'df.doctors.name':'Врач','df.doctors.status':'Статус','df.doctors.msgs':'Статистика сообщений','df.doctors.approved':'Одобрен','df.doctors.rejected':'Отклонён','df.doctors.pending':'Ожидает','df.doctors.received':'Получено','df.doctors.replied':'Отвечено','df.doctors.approveToSee':'Видно после одобрения','df.doctors.remove':'Удалить','df.doctors.approve':'Одобрить','df.doctors.reject':'Отклонить'
  });
  add('fr', {
    'df.stat.docs':'Total médecins','df.stat.approved':'Médecins approuvés','df.stat.pending':'En attente','df.stat.unread':'Messages non lus','df.createProfile':"Créer le profil de l'établissement",
    'df.nav.doctors':'Mes médecins',
    'df.doctors.intro':"Les médecins ayant choisi votre établissement lors de l'inscription sont listés ici. Approuvez-les ; voyez combien de messages chaque médecin a reçus et auxquels il a répondu (le contenu du chat est masqué).",
    'df.doctors.empty':"Aucun médecin ne vous a encore choisi. Ils apparaissent ici lorsqu'un médecin choisit votre établissement lors de l'inscription.",
    'df.doctors.name':'Médecin','df.doctors.status':'Statut','df.doctors.msgs':'Statistiques des messages','df.doctors.approved':'Approuvé','df.doctors.rejected':'Refusé','df.doctors.pending':'En attente','df.doctors.received':'Reçus','df.doctors.replied':'Répondus','df.doctors.approveToSee':'Visible après approbation','df.doctors.remove':'Retirer','df.doctors.approve':'Approuver','df.doctors.reject':'Refuser'
  });
  add('es', {
    'df.stat.docs':'Total de médicos','df.stat.approved':'Médicos aprobados','df.stat.pending':'Pendientes','df.stat.unread':'Mensajes no leídos','df.createProfile':'Crear perfil de instalación',
    'df.nav.doctors':'Mis médicos',
    'df.doctors.intro':'Aquí se listan los médicos que eligieron tu instalación al registrarse. Apruébalos; ve cuántos mensajes recibió y respondió cada médico (el contenido del chat está oculto).',
    'df.doctors.empty':'Ningún médico te ha elegido todavía. Aparecerán aquí cuando un médico elija tu instalación al registrarse.',
    'df.doctors.name':'Médico','df.doctors.status':'Estado','df.doctors.msgs':'Estadísticas de mensajes','df.doctors.approved':'Aprobado','df.doctors.rejected':'Rechazado','df.doctors.pending':'Pendiente','df.doctors.received':'Recibidos','df.doctors.replied':'Respondidos','df.doctors.approveToSee':'Visible tras aprobar','df.doctors.remove':'Quitar','df.doctors.approve':'Aprobar','df.doctors.reject':'Rechazar'
  });
  add('pt', {
    'df.stat.docs':'Total de médicos','df.stat.approved':'Médicos aprovados','df.stat.pending':'Pendentes','df.stat.unread':'Mensagens não lidas','df.createProfile':'Criar perfil da instalação',
    'df.nav.doctors':'Meus médicos',
    'df.doctors.intro':'Os médicos que escolheram sua instalação ao se registrar são listados aqui. Aprove-os; veja quantas mensagens cada médico recebeu e respondeu (o conteúdo do chat fica oculto).',
    'df.doctors.empty':'Nenhum médico escolheu você ainda. Eles aparecem aqui quando um médico escolhe sua instalação no registro.',
    'df.doctors.name':'Médico','df.doctors.status':'Estado','df.doctors.msgs':'Estatísticas de mensagens','df.doctors.approved':'Aprovado','df.doctors.rejected':'Rejeitado','df.doctors.pending':'Pendente','df.doctors.received':'Recebidas','df.doctors.replied':'Respondidas','df.doctors.approveToSee':'Visível após aprovação','df.doctors.remove':'Remover','df.doctors.approve':'Aprovar','df.doctors.reject':'Rejeitar'
  });
  add('ar', {
    'df.stat.docs':'إجمالي الأطباء','df.stat.approved':'الأطباء المعتمدون','df.stat.pending':'بانتظار الموافقة','df.stat.unread':'رسائل غير مقروءة','df.createProfile':'إنشاء ملف المنشأة',
    'df.nav.doctors':'أطبائي',
    'df.doctors.intro':'تُدرج هنا الأطباء الذين اختاروا منشأتك عند التسجيل. اعتمدهم؛ وشاهد عدد الرسائل التي استلمها وردّ عليها كل طبيب (محتوى المحادثة مخفي).',
    'df.doctors.empty':'لم يخترك أي طبيب بعد. يظهرون هنا عندما يختار طبيب منشأتك أثناء التسجيل.',
    'df.doctors.name':'طبيب','df.doctors.status':'الحالة','df.doctors.msgs':'إحصاءات الرسائل','df.doctors.approved':'معتمد','df.doctors.rejected':'مرفوض','df.doctors.pending':'قيد الانتظار','df.doctors.received':'مستلمة','df.doctors.replied':'تم الرد','df.doctors.approveToSee':'يظهر بعد الاعتماد','df.doctors.remove':'إزالة','df.doctors.approve':'اعتماد','df.doctors.reject':'رفض'
  });
  add('nl', {
    'df.stat.docs':'Totaal artsen','df.stat.approved':'Goedgekeurde artsen','df.stat.pending':'In afwachting','df.stat.unread':'Ongelezen berichten','df.createProfile':'Faciliteitsprofiel aanmaken',
    'df.nav.doctors':'Mijn artsen',
    'df.doctors.intro':'Artsen die bij registratie uw faciliteit hebben gekozen, staan hier. Keur ze goed; zie hoeveel berichten elke arts heeft ontvangen en beantwoord (chatinhoud is verborgen).',
    'df.doctors.empty':'Nog geen arts heeft u gekozen. Ze verschijnen hier wanneer een arts bij registratie uw faciliteit kiest.',
    'df.doctors.name':'Arts','df.doctors.status':'Status','df.doctors.msgs':'Berichtstatistieken','df.doctors.approved':'Goedgekeurd','df.doctors.rejected':'Afgewezen','df.doctors.pending':'In afwachting','df.doctors.received':'Ontvangen','df.doctors.replied':'Beantwoord','df.doctors.approveToSee':'Zichtbaar na goedkeuring','df.doctors.remove':'Verwijderen','df.doctors.approve':'Goedkeuren','df.doctors.reject':'Afwijzen'
  });
})(window.HP_I18N);
