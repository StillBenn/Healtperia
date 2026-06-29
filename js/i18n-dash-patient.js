/* ============================================================
   Healthperia — i18n-dash-patient.js  (patient panel strings)
   Merge-style; loaded with i18n-account.js before i18n-core.js.
   Demo sample data (person names, clinic brand names and dates)
   is intentionally left untranslated.
   ============================================================ */
window.HP_I18N = window.HP_I18N || {};
(function (I) {
  'use strict';
  function add(lang, obj) { I[lang] = Object.assign(I[lang] || {}, obj); }

  add('tr', {
    'dp.group.menu': 'Menü',
    'dp.nav.appts': 'Randevularım', 'dp.nav.records': 'Tıbbi Kayıtlar', 'dp.nav.findDoc': 'Doktor Bul',
    'dp.search': 'Doktor, klinik veya tedavi ara…',
    'dp.welcome': 'Hoş geldiniz 👋',
    'dp.welcomeText': 'Bugün sağlığınız için ne yapmak istersiniz? Yaklaşan randevularınızı ve mesajlarınızı buradan takip edin.',
    'dp.bookAppt': 'Randevu Al', 'dp.myRecords': 'Tıbbi Kayıtlarım',
    'dp.stat.upcoming': 'Yaklaşan Randevu', 'dp.stat.unread': 'Okunmamış Mesaj', 'dp.stat.records': 'Tıbbi Kayıt', 'dp.stat.favDoc': 'Favori Doktor', 'dp.stat.total': 'Toplam Randevu', 'dp.stat.doctors': 'Doktorlar',
    'dp.upcomingTitle': 'Yaklaşan Randevular', 'dp.seeAll': 'Tümünü gör',
    'dp.spec.cardiology': 'Kardiyoloji', 'dp.spec.dermatology': 'Dermatoloji', 'dp.spec.internal': 'Dahiliye', 'dp.spec.orthopedics': 'Ortopedi',
    'dp.mode.online': 'Çevrimiçi görüşme', 'dp.loc.acibadem': 'Acıbadem Kliniği', 'dp.loc.memorial': 'Memorial Hastanesi', 'dp.loc.liv': 'Liv Hospital',
    'dp.badge.confirmed': 'Onaylandı', 'dp.badge.pending': 'Bekliyor', 'dp.badge.completed': 'Tamamlandı', 'dp.badge.cancelled': 'İptal Edildi',
    'dp.tipsTitle': 'Sağlık İpuçları',
    'dp.tip1': 'Günde en az 2 litre su içmeyi unutmayın.', 'dp.tip2': 'Yıllık genel sağlık kontrolünüzü ihmal etmeyin.',
    'dp.tip3': 'İlaçlarınızı düzenli saatlerde almaya özen gösterin.', 'dp.tip4': 'Haftada 150 dakika orta tempolu egzersiz hedefleyin.',
    'dp.newAppt': 'Yeni Randevu', 'dp.tab.upcoming': 'Yaklaşan', 'dp.tab.past': 'Geçmiş', 'dp.tab.cancelled': 'İptal',
    'dp.act.cancel': 'İptal', 'dp.act.detail': 'Detay', 'dp.act.rebook': 'Tekrar Al',
    'dp.support': 'Healthperia Destek',
    'dp.msg1': 'Tahlil sonuçlarınız hazır, görüşmede değerlendireceğiz.', 'dp.msg2': 'Randevu hatırlatması: 28 Haziran 14:30.',
    'dp.msg3': 'Krem reçetenizi profilinize ekledim.', 'dp.msg4': 'Geçmiş olsun, kontrol için bekleriz.',
    'dp.t.2h': '2 sa', 'dp.t.5h': '5 sa', 'dp.t.1d': '1 gün', 'dp.t.3d': '3 gün',
    'dp.uploadDoc': 'Belge Yükle', 'dp.rec.blood': 'Kan Tahlili', 'dp.rec.ecg': 'EKG Raporu', 'dp.rec.cream': 'Reçete — Krem', 'dp.rec.xray': 'Röntgen',
    'dp.searchDoc': 'Branş veya isim ara…',
    'dp.f.city': 'Şehir', 'dp.ph.phone': '+90 5xx xxx xx xx', 'dp.ph.country': 'Türkiye', 'dp.ph.city': 'İstanbul',
    'dp.notifTitle': 'Bildirim Tercihleri', 'dp.notif.email': 'E-posta bildirimleri', 'dp.notif.appt': 'Randevu hatırlatmaları', 'dp.notif.promo': 'Kampanya ve duyurular'
  });

  add('en', {
    'dp.group.menu': 'Menu',
    'dp.nav.appts': 'My Appointments', 'dp.nav.records': 'Medical Records', 'dp.nav.findDoc': 'Find a Doctor',
    'dp.search': 'Search doctor, clinic or treatment…',
    'dp.welcome': 'Welcome 👋',
    'dp.welcomeText': 'What would you like to do for your health today? Track your upcoming appointments and messages here.',
    'dp.bookAppt': 'Book Appointment', 'dp.myRecords': 'My Medical Records',
    'dp.stat.upcoming': 'Upcoming Appointment', 'dp.stat.unread': 'Unread Message', 'dp.stat.records': 'Medical Record', 'dp.stat.favDoc': 'Favorite Doctor', 'dp.stat.total': 'Total Appointments', 'dp.stat.doctors': 'Doctors',
    'dp.upcomingTitle': 'Upcoming Appointments', 'dp.seeAll': 'See all',
    'dp.spec.cardiology': 'Cardiology', 'dp.spec.dermatology': 'Dermatology', 'dp.spec.internal': 'Internal Medicine', 'dp.spec.orthopedics': 'Orthopedics',
    'dp.mode.online': 'Online consultation', 'dp.loc.acibadem': 'Acıbadem Clinic', 'dp.loc.memorial': 'Memorial Hospital', 'dp.loc.liv': 'Liv Hospital',
    'dp.badge.confirmed': 'Confirmed', 'dp.badge.pending': 'Pending', 'dp.badge.completed': 'Completed', 'dp.badge.cancelled': 'Cancelled',
    'dp.tipsTitle': 'Health Tips',
    'dp.tip1': 'Remember to drink at least 2 liters of water a day.', 'dp.tip2': 'Don’t skip your annual general health check-up.',
    'dp.tip3': 'Be careful to take your medication at regular times.', 'dp.tip4': 'Aim for 150 minutes of moderate exercise per week.',
    'dp.newAppt': 'New Appointment', 'dp.tab.upcoming': 'Upcoming', 'dp.tab.past': 'Past', 'dp.tab.cancelled': 'Cancelled',
    'dp.act.cancel': 'Cancel', 'dp.act.detail': 'Details', 'dp.act.rebook': 'Rebook',
    'dp.support': 'Healthperia Support',
    'dp.msg1': 'Your test results are ready, we’ll review them during the consultation.', 'dp.msg2': 'Appointment reminder: June 28, 14:30.',
    'dp.msg3': 'I’ve added your cream prescription to your profile.', 'dp.msg4': 'Get well soon, we’ll see you for the follow-up.',
    'dp.t.2h': '2h', 'dp.t.5h': '5h', 'dp.t.1d': '1d', 'dp.t.3d': '3d',
    'dp.uploadDoc': 'Upload Document', 'dp.rec.blood': 'Blood Test', 'dp.rec.ecg': 'ECG Report', 'dp.rec.cream': 'Prescription — Cream', 'dp.rec.xray': 'X-ray',
    'dp.searchDoc': 'Search by specialty or name…',
    'dp.f.city': 'City', 'dp.ph.phone': '+1 555 000 0000', 'dp.ph.country': 'United States', 'dp.ph.city': 'New York',
    'dp.notifTitle': 'Notification Preferences', 'dp.notif.email': 'Email notifications', 'dp.notif.appt': 'Appointment reminders', 'dp.notif.promo': 'Campaigns and announcements'
  });

  add('de', {
    'dp.group.menu': 'Menü',
    'dp.nav.appts': 'Meine Termine', 'dp.nav.records': 'Medizinische Unterlagen', 'dp.nav.findDoc': 'Arzt finden',
    'dp.search': 'Arzt, Klinik oder Behandlung suchen…',
    'dp.welcome': 'Willkommen 👋',
    'dp.welcomeText': 'Was möchten Sie heute für Ihre Gesundheit tun? Verfolgen Sie hier Ihre anstehenden Termine und Nachrichten.',
    'dp.bookAppt': 'Termin buchen', 'dp.myRecords': 'Meine medizinischen Unterlagen',
    'dp.stat.upcoming': 'Anstehender Termin', 'dp.stat.unread': 'Ungelesene Nachricht', 'dp.stat.records': 'Medizinische Akte', 'dp.stat.favDoc': 'Favorisierter Arzt', 'dp.stat.total': 'Termine gesamt', 'dp.stat.doctors': 'Ärzte',
    'dp.upcomingTitle': 'Anstehende Termine', 'dp.seeAll': 'Alle anzeigen',
    'dp.spec.cardiology': 'Kardiologie', 'dp.spec.dermatology': 'Dermatologie', 'dp.spec.internal': 'Innere Medizin', 'dp.spec.orthopedics': 'Orthopädie',
    'dp.mode.online': 'Online-Beratung', 'dp.loc.acibadem': 'Acıbadem Klinik', 'dp.loc.memorial': 'Memorial Krankenhaus', 'dp.loc.liv': 'Liv Hospital',
    'dp.badge.confirmed': 'Bestätigt', 'dp.badge.pending': 'Ausstehend', 'dp.badge.completed': 'Abgeschlossen', 'dp.badge.cancelled': 'Storniert',
    'dp.tipsTitle': 'Gesundheitstipps',
    'dp.tip1': 'Denken Sie daran, täglich mindestens 2 Liter Wasser zu trinken.', 'dp.tip2': 'Versäumen Sie nicht Ihre jährliche Gesundheitsuntersuchung.',
    'dp.tip3': 'Achten Sie darauf, Ihre Medikamente regelmäßig einzunehmen.', 'dp.tip4': 'Streben Sie 150 Minuten moderate Bewegung pro Woche an.',
    'dp.newAppt': 'Neuer Termin', 'dp.tab.upcoming': 'Anstehend', 'dp.tab.past': 'Vergangen', 'dp.tab.cancelled': 'Storniert',
    'dp.act.cancel': 'Stornieren', 'dp.act.detail': 'Details', 'dp.act.rebook': 'Neu buchen',
    'dp.support': 'Healthperia Support',
    'dp.msg1': 'Ihre Testergebnisse sind fertig, wir besprechen sie in der Beratung.', 'dp.msg2': 'Terminerinnerung: 28. Juni, 14:30.',
    'dp.msg3': 'Ich habe Ihr Cremerezept zu Ihrem Profil hinzugefügt.', 'dp.msg4': 'Gute Besserung, wir sehen uns zur Kontrolle.',
    'dp.t.2h': '2 Std', 'dp.t.5h': '5 Std', 'dp.t.1d': '1 T', 'dp.t.3d': '3 T',
    'dp.uploadDoc': 'Dokument hochladen', 'dp.rec.blood': 'Bluttest', 'dp.rec.ecg': 'EKG-Bericht', 'dp.rec.cream': 'Rezept — Creme', 'dp.rec.xray': 'Röntgen',
    'dp.searchDoc': 'Nach Fachgebiet oder Name suchen…',
    'dp.f.city': 'Stadt', 'dp.ph.phone': '+49 151 0000000', 'dp.ph.country': 'Deutschland', 'dp.ph.city': 'Berlin',
    'dp.notifTitle': 'Benachrichtigungseinstellungen', 'dp.notif.email': 'E-Mail-Benachrichtigungen', 'dp.notif.appt': 'Terminerinnerungen', 'dp.notif.promo': 'Kampagnen und Ankündigungen'
  });

  add('ru', {
    'dp.group.menu': 'Меню',
    'dp.nav.appts': 'Мои записи', 'dp.nav.records': 'Медкарта', 'dp.nav.findDoc': 'Найти врача',
    'dp.search': 'Поиск врача, клиники или лечения…',
    'dp.welcome': 'Добро пожаловать 👋',
    'dp.welcomeText': 'Что вы хотите сделать для своего здоровья сегодня? Отслеживайте предстоящие записи и сообщения здесь.',
    'dp.bookAppt': 'Записаться', 'dp.myRecords': 'Моя медкарта',
    'dp.stat.upcoming': 'Предстоящая запись', 'dp.stat.unread': 'Непрочитанное сообщение', 'dp.stat.records': 'Медицинская запись', 'dp.stat.favDoc': 'Избранный врач', 'dp.stat.total': 'Всего записей', 'dp.stat.doctors': 'Врачи',
    'dp.upcomingTitle': 'Предстоящие записи', 'dp.seeAll': 'Смотреть все',
    'dp.spec.cardiology': 'Кардиология', 'dp.spec.dermatology': 'Дерматология', 'dp.spec.internal': 'Терапия', 'dp.spec.orthopedics': 'Ортопедия',
    'dp.mode.online': 'Онлайн-консультация', 'dp.loc.acibadem': 'Клиника Acıbadem', 'dp.loc.memorial': 'Больница Memorial', 'dp.loc.liv': 'Liv Hospital',
    'dp.badge.confirmed': 'Подтверждено', 'dp.badge.pending': 'Ожидает', 'dp.badge.completed': 'Завершено', 'dp.badge.cancelled': 'Отменено',
    'dp.tipsTitle': 'Советы по здоровью',
    'dp.tip1': 'Не забывайте пить не менее 2 литров воды в день.', 'dp.tip2': 'Не пропускайте ежегодный общий медосмотр.',
    'dp.tip3': 'Старайтесь принимать лекарства в одно и то же время.', 'dp.tip4': 'Старайтесь уделять умеренным нагрузкам 150 минут в неделю.',
    'dp.newAppt': 'Новая запись', 'dp.tab.upcoming': 'Предстоящие', 'dp.tab.past': 'Прошедшие', 'dp.tab.cancelled': 'Отменённые',
    'dp.act.cancel': 'Отменить', 'dp.act.detail': 'Подробнее', 'dp.act.rebook': 'Записаться снова',
    'dp.support': 'Поддержка Healthperia',
    'dp.msg1': 'Ваши результаты анализов готовы, обсудим их на консультации.', 'dp.msg2': 'Напоминание о записи: 28 июня, 14:30.',
    'dp.msg3': 'Я добавил рецепт на крем в ваш профиль.', 'dp.msg4': 'Выздоравливайте, ждём вас на контроль.',
    'dp.t.2h': '2 ч', 'dp.t.5h': '5 ч', 'dp.t.1d': '1 д', 'dp.t.3d': '3 д',
    'dp.uploadDoc': 'Загрузить документ', 'dp.rec.blood': 'Анализ крови', 'dp.rec.ecg': 'Отчёт ЭКГ', 'dp.rec.cream': 'Рецепт — крем', 'dp.rec.xray': 'Рентген',
    'dp.searchDoc': 'Поиск по специальности или имени…',
    'dp.f.city': 'Город', 'dp.ph.phone': '+7 900 000 00 00', 'dp.ph.country': 'Россия', 'dp.ph.city': 'Москва',
    'dp.notifTitle': 'Настройки уведомлений', 'dp.notif.email': 'Уведомления по эл. почте', 'dp.notif.appt': 'Напоминания о записях', 'dp.notif.promo': 'Акции и объявления'
  });

  add('fr', {
    'dp.group.menu': 'Menu',
    'dp.nav.appts': 'Mes rendez-vous', 'dp.nav.records': 'Dossiers médicaux', 'dp.nav.findDoc': 'Trouver un médecin',
    'dp.search': 'Rechercher un médecin, une clinique ou un traitement…',
    'dp.welcome': 'Bienvenue 👋',
    'dp.welcomeText': 'Que souhaitez-vous faire pour votre santé aujourd’hui ? Suivez vos rendez-vous et messages à venir ici.',
    'dp.bookAppt': 'Prendre rendez-vous', 'dp.myRecords': 'Mes dossiers médicaux',
    'dp.stat.upcoming': 'Rendez-vous à venir', 'dp.stat.unread': 'Message non lu', 'dp.stat.records': 'Dossier médical', 'dp.stat.favDoc': 'Médecin favori', 'dp.stat.total': 'Total des rendez-vous', 'dp.stat.doctors': 'Médecins',
    'dp.upcomingTitle': 'Rendez-vous à venir', 'dp.seeAll': 'Tout voir',
    'dp.spec.cardiology': 'Cardiologie', 'dp.spec.dermatology': 'Dermatologie', 'dp.spec.internal': 'Médecine interne', 'dp.spec.orthopedics': 'Orthopédie',
    'dp.mode.online': 'Consultation en ligne', 'dp.loc.acibadem': 'Clinique Acıbadem', 'dp.loc.memorial': 'Hôpital Memorial', 'dp.loc.liv': 'Liv Hospital',
    'dp.badge.confirmed': 'Confirmé', 'dp.badge.pending': 'En attente', 'dp.badge.completed': 'Terminé', 'dp.badge.cancelled': 'Annulé',
    'dp.tipsTitle': 'Conseils santé',
    'dp.tip1': 'Pensez à boire au moins 2 litres d’eau par jour.', 'dp.tip2': 'Ne négligez pas votre bilan de santé annuel.',
    'dp.tip3': 'Veillez à prendre vos médicaments à heures régulières.', 'dp.tip4': 'Visez 150 minutes d’exercice modéré par semaine.',
    'dp.newAppt': 'Nouveau rendez-vous', 'dp.tab.upcoming': 'À venir', 'dp.tab.past': 'Passés', 'dp.tab.cancelled': 'Annulés',
    'dp.act.cancel': 'Annuler', 'dp.act.detail': 'Détails', 'dp.act.rebook': 'Reprendre RDV',
    'dp.support': 'Assistance Healthperia',
    'dp.msg1': 'Vos résultats d’analyses sont prêts, nous les examinerons en consultation.', 'dp.msg2': 'Rappel de rendez-vous : 28 juin, 14h30.',
    'dp.msg3': 'J’ai ajouté votre ordonnance de crème à votre profil.', 'dp.msg4': 'Bon rétablissement, nous vous attendons pour le contrôle.',
    'dp.t.2h': '2 h', 'dp.t.5h': '5 h', 'dp.t.1d': '1 j', 'dp.t.3d': '3 j',
    'dp.uploadDoc': 'Téléverser un document', 'dp.rec.blood': 'Analyse de sang', 'dp.rec.ecg': 'Rapport ECG', 'dp.rec.cream': 'Ordonnance — Crème', 'dp.rec.xray': 'Radiographie',
    'dp.searchDoc': 'Rechercher par spécialité ou nom…',
    'dp.f.city': 'Ville', 'dp.ph.phone': '+33 6 00 00 00 00', 'dp.ph.country': 'France', 'dp.ph.city': 'Paris',
    'dp.notifTitle': 'Préférences de notification', 'dp.notif.email': 'Notifications par e-mail', 'dp.notif.appt': 'Rappels de rendez-vous', 'dp.notif.promo': 'Campagnes et annonces'
  });

  add('es', {
    'dp.group.menu': 'Menú',
    'dp.nav.appts': 'Mis citas', 'dp.nav.records': 'Historial médico', 'dp.nav.findDoc': 'Buscar médico',
    'dp.search': 'Buscar médico, clínica o tratamiento…',
    'dp.welcome': 'Bienvenido 👋',
    'dp.welcomeText': '¿Qué desea hacer hoy por su salud? Siga sus próximas citas y mensajes aquí.',
    'dp.bookAppt': 'Reservar cita', 'dp.myRecords': 'Mi historial médico',
    'dp.stat.upcoming': 'Próxima cita', 'dp.stat.unread': 'Mensaje sin leer', 'dp.stat.records': 'Registro médico', 'dp.stat.favDoc': 'Médico favorito', 'dp.stat.total': 'Total de citas', 'dp.stat.doctors': 'Médicos',
    'dp.upcomingTitle': 'Próximas citas', 'dp.seeAll': 'Ver todo',
    'dp.spec.cardiology': 'Cardiología', 'dp.spec.dermatology': 'Dermatología', 'dp.spec.internal': 'Medicina interna', 'dp.spec.orthopedics': 'Ortopedia',
    'dp.mode.online': 'Consulta en línea', 'dp.loc.acibadem': 'Clínica Acıbadem', 'dp.loc.memorial': 'Hospital Memorial', 'dp.loc.liv': 'Liv Hospital',
    'dp.badge.confirmed': 'Confirmada', 'dp.badge.pending': 'Pendiente', 'dp.badge.completed': 'Completada', 'dp.badge.cancelled': 'Cancelada',
    'dp.tipsTitle': 'Consejos de salud',
    'dp.tip1': 'Recuerde beber al menos 2 litros de agua al día.', 'dp.tip2': 'No descuide su chequeo de salud anual.',
    'dp.tip3': 'Procure tomar sus medicamentos a horas regulares.', 'dp.tip4': 'Procure 150 minutos de ejercicio moderado a la semana.',
    'dp.newAppt': 'Nueva cita', 'dp.tab.upcoming': 'Próximas', 'dp.tab.past': 'Pasadas', 'dp.tab.cancelled': 'Canceladas',
    'dp.act.cancel': 'Cancelar', 'dp.act.detail': 'Detalles', 'dp.act.rebook': 'Reservar de nuevo',
    'dp.support': 'Soporte de Healthperia',
    'dp.msg1': 'Sus resultados están listos, los revisaremos en la consulta.', 'dp.msg2': 'Recordatorio de cita: 28 de junio, 14:30.',
    'dp.msg3': 'He añadido su receta de crema a su perfil.', 'dp.msg4': 'Que se mejore, le esperamos para el control.',
    'dp.t.2h': '2 h', 'dp.t.5h': '5 h', 'dp.t.1d': '1 d', 'dp.t.3d': '3 d',
    'dp.uploadDoc': 'Subir documento', 'dp.rec.blood': 'Análisis de sangre', 'dp.rec.ecg': 'Informe ECG', 'dp.rec.cream': 'Receta — Crema', 'dp.rec.xray': 'Radiografía',
    'dp.searchDoc': 'Buscar por especialidad o nombre…',
    'dp.f.city': 'Ciudad', 'dp.ph.phone': '+34 600 000 000', 'dp.ph.country': 'España', 'dp.ph.city': 'Madrid',
    'dp.notifTitle': 'Preferencias de notificación', 'dp.notif.email': 'Notificaciones por correo', 'dp.notif.appt': 'Recordatorios de citas', 'dp.notif.promo': 'Campañas y anuncios'
  });

  add('pt', {
    'dp.group.menu': 'Menu',
    'dp.nav.appts': 'Minhas consultas', 'dp.nav.records': 'Registros médicos', 'dp.nav.findDoc': 'Encontrar médico',
    'dp.search': 'Buscar médico, clínica ou tratamento…',
    'dp.welcome': 'Bem-vindo 👋',
    'dp.welcomeText': 'O que você gostaria de fazer pela sua saúde hoje? Acompanhe suas próximas consultas e mensagens aqui.',
    'dp.bookAppt': 'Agendar consulta', 'dp.myRecords': 'Meus registros médicos',
    'dp.stat.upcoming': 'Próxima consulta', 'dp.stat.unread': 'Mensagem não lida', 'dp.stat.records': 'Registro médico', 'dp.stat.favDoc': 'Médico favorito', 'dp.stat.total': 'Total de consultas', 'dp.stat.doctors': 'Médicos',
    'dp.upcomingTitle': 'Próximas consultas', 'dp.seeAll': 'Ver tudo',
    'dp.spec.cardiology': 'Cardiologia', 'dp.spec.dermatology': 'Dermatologia', 'dp.spec.internal': 'Clínica geral', 'dp.spec.orthopedics': 'Ortopedia',
    'dp.mode.online': 'Consulta on-line', 'dp.loc.acibadem': 'Clínica Acıbadem', 'dp.loc.memorial': 'Hospital Memorial', 'dp.loc.liv': 'Liv Hospital',
    'dp.badge.confirmed': 'Confirmada', 'dp.badge.pending': 'Pendente', 'dp.badge.completed': 'Concluída', 'dp.badge.cancelled': 'Cancelada',
    'dp.tipsTitle': 'Dicas de saúde',
    'dp.tip1': 'Lembre-se de beber pelo menos 2 litros de água por dia.', 'dp.tip2': 'Não deixe de fazer seu check-up anual.',
    'dp.tip3': 'Tenha cuidado de tomar seus medicamentos em horários regulares.', 'dp.tip4': 'Tente fazer 150 minutos de exercício moderado por semana.',
    'dp.newAppt': 'Nova consulta', 'dp.tab.upcoming': 'Próximas', 'dp.tab.past': 'Anteriores', 'dp.tab.cancelled': 'Canceladas',
    'dp.act.cancel': 'Cancelar', 'dp.act.detail': 'Detalhes', 'dp.act.rebook': 'Reagendar',
    'dp.support': 'Suporte Healthperia',
    'dp.msg1': 'Seus resultados estão prontos, vamos avaliá-los na consulta.', 'dp.msg2': 'Lembrete de consulta: 28 de junho, 14:30.',
    'dp.msg3': 'Adicionei sua receita de creme ao seu perfil.', 'dp.msg4': 'Melhoras, esperamos você para o acompanhamento.',
    'dp.t.2h': '2 h', 'dp.t.5h': '5 h', 'dp.t.1d': '1 d', 'dp.t.3d': '3 d',
    'dp.uploadDoc': 'Enviar documento', 'dp.rec.blood': 'Exame de sangue', 'dp.rec.ecg': 'Relatório ECG', 'dp.rec.cream': 'Receita — Creme', 'dp.rec.xray': 'Raio-X',
    'dp.searchDoc': 'Buscar por especialidade ou nome…',
    'dp.f.city': 'Cidade', 'dp.ph.phone': '+55 11 90000 0000', 'dp.ph.country': 'Brasil', 'dp.ph.city': 'São Paulo',
    'dp.notifTitle': 'Preferências de notificação', 'dp.notif.email': 'Notificações por e-mail', 'dp.notif.appt': 'Lembretes de consulta', 'dp.notif.promo': 'Campanhas e anúncios'
  });

  add('ar', {
    'dp.group.menu': 'القائمة',
    'dp.nav.appts': 'مواعيدي', 'dp.nav.records': 'السجلات الطبية', 'dp.nav.findDoc': 'ابحث عن طبيب',
    'dp.search': 'ابحث عن طبيب أو عيادة أو علاج…',
    'dp.welcome': 'مرحبًا 👋',
    'dp.welcomeText': 'ماذا تريد أن تفعل لصحتك اليوم؟ تابع مواعيدك ورسائلك القادمة من هنا.',
    'dp.bookAppt': 'احجز موعدًا', 'dp.myRecords': 'سجلاتي الطبية',
    'dp.stat.upcoming': 'موعد قادم', 'dp.stat.unread': 'رسالة غير مقروءة', 'dp.stat.records': 'سجل طبي', 'dp.stat.favDoc': 'طبيب مفضّل', 'dp.stat.total': 'إجمالي المواعيد', 'dp.stat.doctors': 'الأطباء',
    'dp.upcomingTitle': 'المواعيد القادمة', 'dp.seeAll': 'عرض الكل',
    'dp.spec.cardiology': 'أمراض القلب', 'dp.spec.dermatology': 'الأمراض الجلدية', 'dp.spec.internal': 'الطب الباطني', 'dp.spec.orthopedics': 'جراحة العظام',
    'dp.mode.online': 'استشارة عبر الإنترنت', 'dp.loc.acibadem': 'عيادة أجي بادم', 'dp.loc.memorial': 'مستشفى ميموريال', 'dp.loc.liv': 'مستشفى ليف',
    'dp.badge.confirmed': 'مؤكَّد', 'dp.badge.pending': 'قيد الانتظار', 'dp.badge.completed': 'مكتمل', 'dp.badge.cancelled': 'ملغى',
    'dp.tipsTitle': 'نصائح صحية',
    'dp.tip1': 'تذكر شرب لترين من الماء على الأقل يوميًا.', 'dp.tip2': 'لا تهمل الفحص الصحي العام السنوي.',
    'dp.tip3': 'احرص على تناول أدويتك في أوقات منتظمة.', 'dp.tip4': 'استهدف 150 دقيقة من التمارين المعتدلة أسبوعيًا.',
    'dp.newAppt': 'موعد جديد', 'dp.tab.upcoming': 'القادمة', 'dp.tab.past': 'السابقة', 'dp.tab.cancelled': 'الملغاة',
    'dp.act.cancel': 'إلغاء', 'dp.act.detail': 'التفاصيل', 'dp.act.rebook': 'إعادة الحجز',
    'dp.support': 'دعم Healthperia',
    'dp.msg1': 'نتائج تحاليلك جاهزة، سنراجعها أثناء الاستشارة.', 'dp.msg2': 'تذكير بالموعد: 28 يونيو، 14:30.',
    'dp.msg3': 'أضفت وصفة الكريم إلى ملفك الشخصي.', 'dp.msg4': 'سلامتك، ننتظرك للمتابعة.',
    'dp.t.2h': '2 س', 'dp.t.5h': '5 س', 'dp.t.1d': '1 ي', 'dp.t.3d': '3 ي',
    'dp.uploadDoc': 'رفع مستند', 'dp.rec.blood': 'تحليل دم', 'dp.rec.ecg': 'تقرير تخطيط القلب', 'dp.rec.cream': 'وصفة — كريم', 'dp.rec.xray': 'أشعة سينية',
    'dp.searchDoc': 'ابحث بالتخصص أو الاسم…',
    'dp.f.city': 'المدينة', 'dp.ph.phone': '+90 5xx xxx xx xx', 'dp.ph.country': 'تركيا', 'dp.ph.city': 'إسطنبول',
    'dp.notifTitle': 'تفضيلات الإشعارات', 'dp.notif.email': 'إشعارات البريد الإلكتروني', 'dp.notif.appt': 'تذكيرات المواعيد', 'dp.notif.promo': 'الحملات والإعلانات'
  });

  add('nl', {
    'dp.group.menu': 'Menu',
    'dp.nav.appts': 'Mijn afspraken', 'dp.nav.records': 'Medische dossiers', 'dp.nav.findDoc': 'Arts zoeken',
    'dp.search': 'Zoek arts, kliniek of behandeling…',
    'dp.welcome': 'Welkom 👋',
    'dp.welcomeText': 'Wat wilt u vandaag voor uw gezondheid doen? Volg hier uw komende afspraken en berichten.',
    'dp.bookAppt': 'Afspraak maken', 'dp.myRecords': 'Mijn medische dossiers',
    'dp.stat.upcoming': 'Komende afspraak', 'dp.stat.unread': 'Ongelezen bericht', 'dp.stat.records': 'Medisch dossier', 'dp.stat.favDoc': 'Favoriete arts', 'dp.stat.total': 'Totaal afspraken', 'dp.stat.doctors': 'Artsen',
    'dp.upcomingTitle': 'Komende afspraken', 'dp.seeAll': 'Alles bekijken',
    'dp.spec.cardiology': 'Cardiologie', 'dp.spec.dermatology': 'Dermatologie', 'dp.spec.internal': 'Interne geneeskunde', 'dp.spec.orthopedics': 'Orthopedie',
    'dp.mode.online': 'Online consult', 'dp.loc.acibadem': 'Acıbadem Kliniek', 'dp.loc.memorial': 'Memorial Ziekenhuis', 'dp.loc.liv': 'Liv Hospital',
    'dp.badge.confirmed': 'Bevestigd', 'dp.badge.pending': 'In afwachting', 'dp.badge.completed': 'Voltooid', 'dp.badge.cancelled': 'Geannuleerd',
    'dp.tipsTitle': 'Gezondheidstips',
    'dp.tip1': 'Vergeet niet om minstens 2 liter water per dag te drinken.', 'dp.tip2': 'Sla uw jaarlijkse algemene gezondheidscheck niet over.',
    'dp.tip3': 'Let erop uw medicijnen op vaste tijden in te nemen.', 'dp.tip4': 'Streef naar 150 minuten matige beweging per week.',
    'dp.newAppt': 'Nieuwe afspraak', 'dp.tab.upcoming': 'Komend', 'dp.tab.past': 'Verleden', 'dp.tab.cancelled': 'Geannuleerd',
    'dp.act.cancel': 'Annuleren', 'dp.act.detail': 'Details', 'dp.act.rebook': 'Opnieuw boeken',
    'dp.support': 'Healthperia Support',
    'dp.msg1': 'Uw testresultaten zijn klaar, we bespreken ze tijdens het consult.', 'dp.msg2': 'Afspraakherinnering: 28 juni, 14:30.',
    'dp.msg3': 'Ik heb uw crèmerecept aan uw profiel toegevoegd.', 'dp.msg4': 'Beterschap, we zien u voor de controle.',
    'dp.t.2h': '2 u', 'dp.t.5h': '5 u', 'dp.t.1d': '1 d', 'dp.t.3d': '3 d',
    'dp.uploadDoc': 'Document uploaden', 'dp.rec.blood': 'Bloedtest', 'dp.rec.ecg': 'ECG-rapport', 'dp.rec.cream': 'Recept — Crème', 'dp.rec.xray': 'Röntgenfoto',
    'dp.searchDoc': 'Zoek op specialisme of naam…',
    'dp.f.city': 'Stad', 'dp.ph.phone': '+31 6 00000000', 'dp.ph.country': 'Nederland', 'dp.ph.city': 'Amsterdam',
    'dp.notifTitle': 'Meldingsvoorkeuren', 'dp.notif.email': 'E-mailmeldingen', 'dp.notif.appt': 'Afspraakherinneringen', 'dp.notif.promo': 'Campagnes en aankondigingen'
  });

  /* ===== favorites (Favorilerim) ===== */
  add('tr', { 'fav.nav':'Favorilerim','fav.title':'Favorilerim','fav.empty':'Henüz favoriniz yok. Tedavi ilanlarındaki kalp ile favorilere ekleyebilirsiniz.','fav.g.listing':'Tedavi İlanları','fav.g.treatment':'Tedaviler','fav.g.doctor':'Doktorlar','fav.g.hospital':'Hastaneler','fav.g.clinic':'Klinikler' });
  add('en', { 'fav.nav':'My Favorites','fav.title':'My Favorites','fav.empty':'No favorites yet. Tap the heart on treatment listings to add them.','fav.g.listing':'Treatment Listings','fav.g.treatment':'Treatments','fav.g.doctor':'Doctors','fav.g.hospital':'Hospitals','fav.g.clinic':'Clinics' });
  add('de', { 'fav.nav':'Meine Favoriten','fav.title':'Meine Favoriten','fav.empty':'Noch keine Favoriten. Tippen Sie auf das Herz bei Behandlungsanzeigen.','fav.g.listing':'Behandlungsanzeigen','fav.g.treatment':'Behandlungen','fav.g.doctor':'Ärzte','fav.g.hospital':'Krankenhäuser','fav.g.clinic':'Kliniken' });
  add('ru', { 'fav.nav':'Избранное','fav.title':'Избранное','fav.empty':'Пока нет избранного. Нажмите на сердечко в объявлениях о лечении.','fav.g.listing':'Объявления о лечении','fav.g.treatment':'Лечение','fav.g.doctor':'Врачи','fav.g.hospital':'Больницы','fav.g.clinic':'Клиники' });
  add('fr', { 'fav.nav':'Mes favoris','fav.title':'Mes favoris','fav.empty':'Aucun favori. Touchez le cœur sur les annonces de traitement.','fav.g.listing':'Annonces de traitement','fav.g.treatment':'Traitements','fav.g.doctor':'Médecins','fav.g.hospital':'Hôpitaux','fav.g.clinic':'Cliniques' });
  add('es', { 'fav.nav':'Mis favoritos','fav.title':'Mis favoritos','fav.empty':'Aún no hay favoritos. Toca el corazón en los anuncios de tratamiento.','fav.g.listing':'Anuncios de tratamiento','fav.g.treatment':'Tratamientos','fav.g.doctor':'Médicos','fav.g.hospital':'Hospitales','fav.g.clinic':'Clínicas' });
  add('pt', { 'fav.nav':'Meus favoritos','fav.title':'Meus favoritos','fav.empty':'Ainda não há favoritos. Toque no coração nos anúncios de tratamento.','fav.g.listing':'Anúncios de tratamento','fav.g.treatment':'Tratamentos','fav.g.doctor':'Médicos','fav.g.hospital':'Hospitais','fav.g.clinic':'Clínicas' });
  add('ar', { 'fav.nav':'المفضلة','fav.title':'المفضلة','fav.empty':'لا توجد مفضلات بعد. اضغط على القلب في إعلانات العلاج لإضافتها.','fav.g.listing':'إعلانات العلاج','fav.g.treatment':'العلاجات','fav.g.doctor':'الأطباء','fav.g.hospital':'المستشفيات','fav.g.clinic':'العيادات' });
  add('nl', { 'fav.nav':'Mijn favorieten','fav.title':'Mijn favorieten','fav.empty':'Nog geen favorieten. Tik op het hartje bij behandelingsadvertenties.','fav.g.listing':'Behandelingsadvertenties','fav.g.treatment':'Behandelingen','fav.g.doctor':'Artsen','fav.g.hospital':'Ziekenhuizen','fav.g.clinic':'Klinieken' });
})(window.HP_I18N);
