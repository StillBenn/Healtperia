/* ============================================================
   Healthperia — i18n-dash-doctor.js  (doctor panel strings)
   Merge-style; loaded with i18n-account.js before i18n-core.js.
   Demo person names and calendar day numbers are left as-is.
   ============================================================ */
window.HP_I18N = window.HP_I18N || {};
(function (I) {
  'use strict';
  function add(lang, obj) { I[lang] = Object.assign(I[lang] || {}, obj); }

  add('tr', {
    'dd.group.clinic': 'Klinik',
    'dd.nav.requests': 'Randevu Talepleri', 'dd.nav.schedule': 'Takvimim', 'dd.nav.patients': 'Hastalarım', 'dd.searchPatient': 'Hasta ara…',
    'dd.welcome': 'İyi çalışmalar 🩺',
    'dd.welcomeText': 'Bugün <strong>6 randevunuz</strong> ve <strong>3 bekleyen talebiniz</strong> var. Hastalarınızı buradan yönetin.',
    'dd.reviewReq': 'Talepleri İncele', 'dd.openCal': 'Takvimi Aç',
    'dd.stat.today': 'Bugünkü Randevu', 'dd.stat.pending': 'Bekleyen Talep', 'dd.stat.total': 'Toplam Hasta',
    'dd.todayTitle': 'Bugünün Programı', 'dd.calBtn': 'Takvim',
    'dd.visit.control': 'Kontrol', 'dd.visit.first': 'İlk muayene', 'dd.visit.lab': 'Tahlil değerlendirme',
    'dd.mode.online': 'Çevrimiçi', 'dd.mode.clinic': 'Klinik',
    'dd.badge.confirmed': 'Onaylı', 'dd.badge.arrived': 'Geldi',
    'dd.thisWeek': 'Bu Hafta',
    'dd.dow.mon': 'Pzt', 'dd.dow.tue': 'Sal', 'dd.dow.wed': 'Çar', 'dd.dow.thu': 'Per', 'dd.dow.fri': 'Cum', 'dd.dow.sat': 'Cmt', 'dd.dow.sun': 'Paz',
    'dd.weekSummary': 'Toplam <strong>34 randevu</strong> · geçen haftaya göre <span class="up">+12%</span>',
    'dd.req1': 'Kardiyoloji kontrolü · 28 Haz, 14:30 talep edildi', 'dd.req2': 'İlk muayene · 29 Haz, 11:00 talep edildi', 'dd.req3': 'Tahlil değerlendirme · 30 Haz, 16:00 talep edildi',
    'dd.accept': 'Kabul', 'dd.reject': 'Reddet',
    'dd.calTitle': 'Takvimim — Haziran 2026',
    'dd.th.patient': 'Hasta', 'dd.th.lastVisit': 'Son Ziyaret', 'dd.th.status': 'Durum', 'dd.th.action': 'İşlem',
    'dd.pstat.active': 'Aktif Takip', 'dd.pstat.new': 'Yeni', 'dd.pstat.followup': 'Kontrol Bekliyor', 'dd.fileBtn': 'Dosya',
    'dd.msg1': 'Doktor bey, ilacı aç karnına mı almalıyım?', 'dd.msg2': 'Randevu için teşekkürler, görüşmek üzere.', 'dd.msg3': 'Tahlil sonuçlarımı yükledim.',
    'dd.t.1h': '1 sa', 'dd.t.4h': '4 sa', 'dd.t.1d': '1 gün',
    'dd.f.specialty': 'Uzmanlık Alanı', 'dd.f.license': 'Diploma / Lisans No', 'dd.f.bio': 'Hakkımda',
    'dd.ph.specialty': 'Kardiyoloji', 'dd.ph.bio': 'Hastalarınıza kendinizi tanıtın…',
    'dd.workPrefsTitle': 'Çalışma Tercihleri', 'dd.pref.online': 'Çevrimiçi görüşmeleri kabul et', 'dd.pref.newReq': 'Yeni randevu talebi bildirimi', 'dd.pref.weekend': 'Hafta sonu randevuları',
    'dd.reqAccepted': 'Kabul edildi ✓', 'dd.reqRejected': 'Reddedildi'
  });

  add('en', {
    'dd.group.clinic': 'Clinic',
    'dd.nav.requests': 'Appointment Requests', 'dd.nav.schedule': 'My Calendar', 'dd.nav.patients': 'My Patients', 'dd.searchPatient': 'Search patient…',
    'dd.welcome': 'Have a good day 🩺',
    'dd.welcomeText': 'Today you have <strong>6 appointments</strong> and <strong>3 pending requests</strong>. Manage your patients here.',
    'dd.reviewReq': 'Review Requests', 'dd.openCal': 'Open Calendar',
    'dd.stat.today': 'Today’s Appointments', 'dd.stat.pending': 'Pending Request', 'dd.stat.total': 'Total Patients',
    'dd.todayTitle': 'Today’s Schedule', 'dd.calBtn': 'Calendar',
    'dd.visit.control': 'Check-up', 'dd.visit.first': 'First examination', 'dd.visit.lab': 'Test review',
    'dd.mode.online': 'Online', 'dd.mode.clinic': 'Clinic',
    'dd.badge.confirmed': 'Confirmed', 'dd.badge.arrived': 'Arrived',
    'dd.thisWeek': 'This Week',
    'dd.dow.mon': 'Mon', 'dd.dow.tue': 'Tue', 'dd.dow.wed': 'Wed', 'dd.dow.thu': 'Thu', 'dd.dow.fri': 'Fri', 'dd.dow.sat': 'Sat', 'dd.dow.sun': 'Sun',
    'dd.weekSummary': '<strong>34 appointments</strong> total · <span class="up">+12%</span> vs last week',
    'dd.req1': 'Cardiology check-up · requested Jun 28, 14:30', 'dd.req2': 'First examination · requested Jun 29, 11:00', 'dd.req3': 'Test review · requested Jun 30, 16:00',
    'dd.accept': 'Accept', 'dd.reject': 'Reject',
    'dd.calTitle': 'My Calendar — June 2026',
    'dd.th.patient': 'Patient', 'dd.th.lastVisit': 'Last Visit', 'dd.th.status': 'Status', 'dd.th.action': 'Action',
    'dd.pstat.active': 'Active Follow-up', 'dd.pstat.new': 'New', 'dd.pstat.followup': 'Awaiting Check-up', 'dd.fileBtn': 'File',
    'dd.msg1': 'Doctor, should I take the medication on an empty stomach?', 'dd.msg2': 'Thanks for the appointment, see you soon.', 'dd.msg3': 'I’ve uploaded my test results.',
    'dd.t.1h': '1h', 'dd.t.4h': '4h', 'dd.t.1d': '1d',
    'dd.f.specialty': 'Specialty', 'dd.f.license': 'Diploma / License No.', 'dd.f.bio': 'About Me',
    'dd.ph.specialty': 'Cardiology', 'dd.ph.bio': 'Introduce yourself to your patients…',
    'dd.workPrefsTitle': 'Work Preferences', 'dd.pref.online': 'Accept online consultations', 'dd.pref.newReq': 'New appointment request notification', 'dd.pref.weekend': 'Weekend appointments',
    'dd.reqAccepted': 'Accepted ✓', 'dd.reqRejected': 'Rejected'
  });

  add('de', {
    'dd.group.clinic': 'Klinik',
    'dd.nav.requests': 'Terminanfragen', 'dd.nav.schedule': 'Mein Kalender', 'dd.nav.patients': 'Meine Patienten', 'dd.searchPatient': 'Patient suchen…',
    'dd.welcome': 'Einen schönen Tag 🩺',
    'dd.welcomeText': 'Heute haben Sie <strong>6 Termine</strong> und <strong>3 offene Anfragen</strong>. Verwalten Sie hier Ihre Patienten.',
    'dd.reviewReq': 'Anfragen prüfen', 'dd.openCal': 'Kalender öffnen',
    'dd.stat.today': 'Heutige Termine', 'dd.stat.pending': 'Offene Anfrage', 'dd.stat.total': 'Patienten gesamt',
    'dd.todayTitle': 'Heutiger Zeitplan', 'dd.calBtn': 'Kalender',
    'dd.visit.control': 'Kontrolle', 'dd.visit.first': 'Erstuntersuchung', 'dd.visit.lab': 'Befundbesprechung',
    'dd.mode.online': 'Online', 'dd.mode.clinic': 'Klinik',
    'dd.badge.confirmed': 'Bestätigt', 'dd.badge.arrived': 'Eingetroffen',
    'dd.thisWeek': 'Diese Woche',
    'dd.dow.mon': 'Mo', 'dd.dow.tue': 'Di', 'dd.dow.wed': 'Mi', 'dd.dow.thu': 'Do', 'dd.dow.fri': 'Fr', 'dd.dow.sat': 'Sa', 'dd.dow.sun': 'So',
    'dd.weekSummary': 'Insgesamt <strong>34 Termine</strong> · <span class="up">+12%</span> gegenüber Vorwoche',
    'dd.req1': 'Kardiologie-Kontrolle · angefragt 28. Juni, 14:30', 'dd.req2': 'Erstuntersuchung · angefragt 29. Juni, 11:00', 'dd.req3': 'Befundbesprechung · angefragt 30. Juni, 16:00',
    'dd.accept': 'Annehmen', 'dd.reject': 'Ablehnen',
    'dd.calTitle': 'Mein Kalender — Juni 2026',
    'dd.th.patient': 'Patient', 'dd.th.lastVisit': 'Letzter Besuch', 'dd.th.status': 'Status', 'dd.th.action': 'Aktion',
    'dd.pstat.active': 'Aktive Betreuung', 'dd.pstat.new': 'Neu', 'dd.pstat.followup': 'Wartet auf Kontrolle', 'dd.fileBtn': 'Akte',
    'dd.msg1': 'Herr Doktor, soll ich das Medikament auf nüchternen Magen einnehmen?', 'dd.msg2': 'Danke für den Termin, bis bald.', 'dd.msg3': 'Ich habe meine Befunde hochgeladen.',
    'dd.t.1h': '1 Std', 'dd.t.4h': '4 Std', 'dd.t.1d': '1 T',
    'dd.f.specialty': 'Fachgebiet', 'dd.f.license': 'Diplom- / Lizenznr.', 'dd.f.bio': 'Über mich',
    'dd.ph.specialty': 'Kardiologie', 'dd.ph.bio': 'Stellen Sie sich Ihren Patienten vor…',
    'dd.workPrefsTitle': 'Arbeitseinstellungen', 'dd.pref.online': 'Online-Beratungen annehmen', 'dd.pref.newReq': 'Benachrichtigung bei neuer Terminanfrage', 'dd.pref.weekend': 'Wochenend-Termine',
    'dd.reqAccepted': 'Angenommen ✓', 'dd.reqRejected': 'Abgelehnt'
  });

  add('ru', {
    'dd.group.clinic': 'Клиника',
    'dd.nav.requests': 'Запросы на приём', 'dd.nav.schedule': 'Мой календарь', 'dd.nav.patients': 'Мои пациенты', 'dd.searchPatient': 'Поиск пациента…',
    'dd.welcome': 'Хорошего дня 🩺',
    'dd.welcomeText': 'Сегодня у вас <strong>6 приёмов</strong> и <strong>3 ожидающих запроса</strong>. Управляйте пациентами здесь.',
    'dd.reviewReq': 'Просмотреть запросы', 'dd.openCal': 'Открыть календарь',
    'dd.stat.today': 'Приёмы сегодня', 'dd.stat.pending': 'Ожидающий запрос', 'dd.stat.total': 'Всего пациентов',
    'dd.todayTitle': 'Расписание на сегодня', 'dd.calBtn': 'Календарь',
    'dd.visit.control': 'Контроль', 'dd.visit.first': 'Первичный осмотр', 'dd.visit.lab': 'Разбор анализов',
    'dd.mode.online': 'Онлайн', 'dd.mode.clinic': 'Клиника',
    'dd.badge.confirmed': 'Подтверждён', 'dd.badge.arrived': 'Пришёл',
    'dd.thisWeek': 'Эта неделя',
    'dd.dow.mon': 'Пн', 'dd.dow.tue': 'Вт', 'dd.dow.wed': 'Ср', 'dd.dow.thu': 'Чт', 'dd.dow.fri': 'Пт', 'dd.dow.sat': 'Сб', 'dd.dow.sun': 'Вс',
    'dd.weekSummary': 'Всего <strong>34 приёма</strong> · <span class="up">+12%</span> к прошлой неделе',
    'dd.req1': 'Кардиологический контроль · запрос на 28 июня, 14:30', 'dd.req2': 'Первичный осмотр · запрос на 29 июня, 11:00', 'dd.req3': 'Разбор анализов · запрос на 30 июня, 16:00',
    'dd.accept': 'Принять', 'dd.reject': 'Отклонить',
    'dd.calTitle': 'Мой календарь — июнь 2026',
    'dd.th.patient': 'Пациент', 'dd.th.lastVisit': 'Последний визит', 'dd.th.status': 'Статус', 'dd.th.action': 'Действие',
    'dd.pstat.active': 'Активное наблюдение', 'dd.pstat.new': 'Новый', 'dd.pstat.followup': 'Ожидает контроля', 'dd.fileBtn': 'Карта',
    'dd.msg1': 'Доктор, мне принимать лекарство натощак?', 'dd.msg2': 'Спасибо за приём, до встречи.', 'dd.msg3': 'Я загрузил(а) результаты анализов.',
    'dd.t.1h': '1 ч', 'dd.t.4h': '4 ч', 'dd.t.1d': '1 д',
    'dd.f.specialty': 'Специализация', 'dd.f.license': 'Номер диплома / лицензии', 'dd.f.bio': 'Обо мне',
    'dd.ph.specialty': 'Кардиология', 'dd.ph.bio': 'Представьтесь своим пациентам…',
    'dd.workPrefsTitle': 'Настройки работы', 'dd.pref.online': 'Принимать онлайн-консультации', 'dd.pref.newReq': 'Уведомление о новом запросе на приём', 'dd.pref.weekend': 'Приёмы в выходные',
    'dd.reqAccepted': 'Принято ✓', 'dd.reqRejected': 'Отклонено'
  });

  add('fr', {
    'dd.group.clinic': 'Clinique',
    'dd.nav.requests': 'Demandes de rendez-vous', 'dd.nav.schedule': 'Mon calendrier', 'dd.nav.patients': 'Mes patients', 'dd.searchPatient': 'Rechercher un patient…',
    'dd.welcome': 'Bonne journée 🩺',
    'dd.welcomeText': 'Aujourd’hui vous avez <strong>6 rendez-vous</strong> et <strong>3 demandes en attente</strong>. Gérez vos patients ici.',
    'dd.reviewReq': 'Examiner les demandes', 'dd.openCal': 'Ouvrir le calendrier',
    'dd.stat.today': 'Rendez-vous du jour', 'dd.stat.pending': 'Demande en attente', 'dd.stat.total': 'Total des patients',
    'dd.todayTitle': 'Programme du jour', 'dd.calBtn': 'Calendrier',
    'dd.visit.control': 'Contrôle', 'dd.visit.first': 'Première consultation', 'dd.visit.lab': 'Analyse des résultats',
    'dd.mode.online': 'En ligne', 'dd.mode.clinic': 'Clinique',
    'dd.badge.confirmed': 'Confirmé', 'dd.badge.arrived': 'Arrivé',
    'dd.thisWeek': 'Cette semaine',
    'dd.dow.mon': 'Lun', 'dd.dow.tue': 'Mar', 'dd.dow.wed': 'Mer', 'dd.dow.thu': 'Jeu', 'dd.dow.fri': 'Ven', 'dd.dow.sat': 'Sam', 'dd.dow.sun': 'Dim',
    'dd.weekSummary': '<strong>34 rendez-vous</strong> au total · <span class="up">+12%</span> vs semaine dernière',
    'dd.req1': 'Contrôle cardiologie · demandé le 28 juin, 14h30', 'dd.req2': 'Première consultation · demandée le 29 juin, 11h00', 'dd.req3': 'Analyse des résultats · demandée le 30 juin, 16h00',
    'dd.accept': 'Accepter', 'dd.reject': 'Refuser',
    'dd.calTitle': 'Mon calendrier — Juin 2026',
    'dd.th.patient': 'Patient', 'dd.th.lastVisit': 'Dernière visite', 'dd.th.status': 'Statut', 'dd.th.action': 'Action',
    'dd.pstat.active': 'Suivi actif', 'dd.pstat.new': 'Nouveau', 'dd.pstat.followup': 'En attente de contrôle', 'dd.fileBtn': 'Dossier',
    'dd.msg1': 'Docteur, dois-je prendre le médicament à jeun ?', 'dd.msg2': 'Merci pour le rendez-vous, à bientôt.', 'dd.msg3': 'J’ai téléversé mes résultats d’analyses.',
    'dd.t.1h': '1 h', 'dd.t.4h': '4 h', 'dd.t.1d': '1 j',
    'dd.f.specialty': 'Spécialité', 'dd.f.license': 'N° de diplôme / licence', 'dd.f.bio': 'À propos de moi',
    'dd.ph.specialty': 'Cardiologie', 'dd.ph.bio': 'Présentez-vous à vos patients…',
    'dd.workPrefsTitle': 'Préférences de travail', 'dd.pref.online': 'Accepter les consultations en ligne', 'dd.pref.newReq': 'Notification de nouvelle demande de rendez-vous', 'dd.pref.weekend': 'Rendez-vous le week-end',
    'dd.reqAccepted': 'Accepté ✓', 'dd.reqRejected': 'Refusé'
  });

  add('es', {
    'dd.group.clinic': 'Clínica',
    'dd.nav.requests': 'Solicitudes de cita', 'dd.nav.schedule': 'Mi calendario', 'dd.nav.patients': 'Mis pacientes', 'dd.searchPatient': 'Buscar paciente…',
    'dd.welcome': 'Que tenga un buen día 🩺',
    'dd.welcomeText': 'Hoy tiene <strong>6 citas</strong> y <strong>3 solicitudes pendientes</strong>. Gestione a sus pacientes aquí.',
    'dd.reviewReq': 'Revisar solicitudes', 'dd.openCal': 'Abrir calendario',
    'dd.stat.today': 'Citas de hoy', 'dd.stat.pending': 'Solicitud pendiente', 'dd.stat.total': 'Total de pacientes',
    'dd.todayTitle': 'Programa de hoy', 'dd.calBtn': 'Calendario',
    'dd.visit.control': 'Control', 'dd.visit.first': 'Primera consulta', 'dd.visit.lab': 'Revisión de análisis',
    'dd.mode.online': 'En línea', 'dd.mode.clinic': 'Clínica',
    'dd.badge.confirmed': 'Confirmado', 'dd.badge.arrived': 'Llegó',
    'dd.thisWeek': 'Esta semana',
    'dd.dow.mon': 'Lun', 'dd.dow.tue': 'Mar', 'dd.dow.wed': 'Mié', 'dd.dow.thu': 'Jue', 'dd.dow.fri': 'Vie', 'dd.dow.sat': 'Sáb', 'dd.dow.sun': 'Dom',
    'dd.weekSummary': '<strong>34 citas</strong> en total · <span class="up">+12%</span> vs semana pasada',
    'dd.req1': 'Control de cardiología · solicitado 28 jun, 14:30', 'dd.req2': 'Primera consulta · solicitada 29 jun, 11:00', 'dd.req3': 'Revisión de análisis · solicitada 30 jun, 16:00',
    'dd.accept': 'Aceptar', 'dd.reject': 'Rechazar',
    'dd.calTitle': 'Mi calendario — Junio 2026',
    'dd.th.patient': 'Paciente', 'dd.th.lastVisit': 'Última visita', 'dd.th.status': 'Estado', 'dd.th.action': 'Acción',
    'dd.pstat.active': 'Seguimiento activo', 'dd.pstat.new': 'Nuevo', 'dd.pstat.followup': 'Esperando control', 'dd.fileBtn': 'Ficha',
    'dd.msg1': 'Doctor, ¿debo tomar el medicamento en ayunas?', 'dd.msg2': 'Gracias por la cita, hasta pronto.', 'dd.msg3': 'He subido mis resultados de análisis.',
    'dd.t.1h': '1 h', 'dd.t.4h': '4 h', 'dd.t.1d': '1 d',
    'dd.f.specialty': 'Especialidad', 'dd.f.license': 'N.º de diploma / licencia', 'dd.f.bio': 'Sobre mí',
    'dd.ph.specialty': 'Cardiología', 'dd.ph.bio': 'Preséntese a sus pacientes…',
    'dd.workPrefsTitle': 'Preferencias de trabajo', 'dd.pref.online': 'Aceptar consultas en línea', 'dd.pref.newReq': 'Notificación de nueva solicitud de cita', 'dd.pref.weekend': 'Citas de fin de semana',
    'dd.reqAccepted': 'Aceptado ✓', 'dd.reqRejected': 'Rechazado'
  });

  add('pt', {
    'dd.group.clinic': 'Clínica',
    'dd.nav.requests': 'Solicitações de consulta', 'dd.nav.schedule': 'Meu calendário', 'dd.nav.patients': 'Meus pacientes', 'dd.searchPatient': 'Buscar paciente…',
    'dd.welcome': 'Tenha um bom dia 🩺',
    'dd.welcomeText': 'Hoje você tem <strong>6 consultas</strong> e <strong>3 solicitações pendentes</strong>. Gerencie seus pacientes aqui.',
    'dd.reviewReq': 'Analisar solicitações', 'dd.openCal': 'Abrir calendário',
    'dd.stat.today': 'Consultas de hoje', 'dd.stat.pending': 'Solicitação pendente', 'dd.stat.total': 'Total de pacientes',
    'dd.todayTitle': 'Programação de hoje', 'dd.calBtn': 'Calendário',
    'dd.visit.control': 'Acompanhamento', 'dd.visit.first': 'Primeira consulta', 'dd.visit.lab': 'Análise de exames',
    'dd.mode.online': 'On-line', 'dd.mode.clinic': 'Clínica',
    'dd.badge.confirmed': 'Confirmado', 'dd.badge.arrived': 'Chegou',
    'dd.thisWeek': 'Esta semana',
    'dd.dow.mon': 'Seg', 'dd.dow.tue': 'Ter', 'dd.dow.wed': 'Qua', 'dd.dow.thu': 'Qui', 'dd.dow.fri': 'Sex', 'dd.dow.sat': 'Sáb', 'dd.dow.sun': 'Dom',
    'dd.weekSummary': '<strong>34 consultas</strong> no total · <span class="up">+12%</span> vs semana passada',
    'dd.req1': 'Acompanhamento de cardiologia · solicitado 28 jun, 14:30', 'dd.req2': 'Primeira consulta · solicitada 29 jun, 11:00', 'dd.req3': 'Análise de exames · solicitada 30 jun, 16:00',
    'dd.accept': 'Aceitar', 'dd.reject': 'Recusar',
    'dd.calTitle': 'Meu calendário — Junho 2026',
    'dd.th.patient': 'Paciente', 'dd.th.lastVisit': 'Última visita', 'dd.th.status': 'Status', 'dd.th.action': 'Ação',
    'dd.pstat.active': 'Acompanhamento ativo', 'dd.pstat.new': 'Novo', 'dd.pstat.followup': 'Aguardando acompanhamento', 'dd.fileBtn': 'Ficha',
    'dd.msg1': 'Doutor, devo tomar o medicamento em jejum?', 'dd.msg2': 'Obrigado pela consulta, até breve.', 'dd.msg3': 'Enviei meus resultados de exames.',
    'dd.t.1h': '1 h', 'dd.t.4h': '4 h', 'dd.t.1d': '1 d',
    'dd.f.specialty': 'Especialidade', 'dd.f.license': 'N.º de diploma / licença', 'dd.f.bio': 'Sobre mim',
    'dd.ph.specialty': 'Cardiologia', 'dd.ph.bio': 'Apresente-se aos seus pacientes…',
    'dd.workPrefsTitle': 'Preferências de trabalho', 'dd.pref.online': 'Aceitar consultas on-line', 'dd.pref.newReq': 'Notificação de nova solicitação de consulta', 'dd.pref.weekend': 'Consultas de fim de semana',
    'dd.reqAccepted': 'Aceito ✓', 'dd.reqRejected': 'Recusado'
  });

  add('ar', {
    'dd.group.clinic': 'العيادة',
    'dd.nav.requests': 'طلبات المواعيد', 'dd.nav.schedule': 'تقويمي', 'dd.nav.patients': 'مرضاي', 'dd.searchPatient': 'ابحث عن مريض…',
    'dd.welcome': 'يومًا سعيدًا 🩺',
    'dd.welcomeText': 'لديك اليوم <strong>6 مواعيد</strong> و<strong>3 طلبات معلّقة</strong>. أدِر مرضاك من هنا.',
    'dd.reviewReq': 'مراجعة الطلبات', 'dd.openCal': 'فتح التقويم',
    'dd.stat.today': 'مواعيد اليوم', 'dd.stat.pending': 'طلب معلّق', 'dd.stat.total': 'إجمالي المرضى',
    'dd.todayTitle': 'برنامج اليوم', 'dd.calBtn': 'التقويم',
    'dd.visit.control': 'متابعة', 'dd.visit.first': 'فحص أولي', 'dd.visit.lab': 'مراجعة التحاليل',
    'dd.mode.online': 'عبر الإنترنت', 'dd.mode.clinic': 'العيادة',
    'dd.badge.confirmed': 'مؤكَّد', 'dd.badge.arrived': 'وصل',
    'dd.thisWeek': 'هذا الأسبوع',
    'dd.dow.mon': 'إثن', 'dd.dow.tue': 'ثلا', 'dd.dow.wed': 'أرب', 'dd.dow.thu': 'خمي', 'dd.dow.fri': 'جمع', 'dd.dow.sat': 'سبت', 'dd.dow.sun': 'أحد',
    'dd.weekSummary': 'إجمالي <strong>34 موعدًا</strong> · <span class="up">+12%</span> عن الأسبوع الماضي',
    'dd.req1': 'متابعة أمراض القلب · طُلب في 28 يونيو، 14:30', 'dd.req2': 'فحص أولي · طُلب في 29 يونيو، 11:00', 'dd.req3': 'مراجعة التحاليل · طُلب في 30 يونيو، 16:00',
    'dd.accept': 'قبول', 'dd.reject': 'رفض',
    'dd.calTitle': 'تقويمي — يونيو 2026',
    'dd.th.patient': 'المريض', 'dd.th.lastVisit': 'آخر زيارة', 'dd.th.status': 'الحالة', 'dd.th.action': 'إجراء',
    'dd.pstat.active': 'متابعة نشطة', 'dd.pstat.new': 'جديد', 'dd.pstat.followup': 'بانتظار المتابعة', 'dd.fileBtn': 'الملف',
    'dd.msg1': 'دكتور، هل آخذ الدواء على معدة فارغة؟', 'dd.msg2': 'شكرًا على الموعد، إلى اللقاء.', 'dd.msg3': 'لقد رفعت نتائج تحاليلي.',
    'dd.t.1h': '1 س', 'dd.t.4h': '4 س', 'dd.t.1d': '1 ي',
    'dd.f.specialty': 'التخصص', 'dd.f.license': 'رقم الدبلوم / الترخيص', 'dd.f.bio': 'نبذة عني',
    'dd.ph.specialty': 'أمراض القلب', 'dd.ph.bio': 'عرّف بنفسك لمرضاك…',
    'dd.workPrefsTitle': 'تفضيلات العمل', 'dd.pref.online': 'قبول الاستشارات عبر الإنترنت', 'dd.pref.newReq': 'إشعار بطلب موعد جديد', 'dd.pref.weekend': 'مواعيد نهاية الأسبوع',
    'dd.reqAccepted': 'تم القبول ✓', 'dd.reqRejected': 'تم الرفض'
  });

  add('nl', {
    'dd.group.clinic': 'Kliniek',
    'dd.nav.requests': 'Afspraakverzoeken', 'dd.nav.schedule': 'Mijn agenda', 'dd.nav.patients': 'Mijn patiënten', 'dd.searchPatient': 'Patiënt zoeken…',
    'dd.welcome': 'Een fijne dag 🩺',
    'dd.welcomeText': 'Vandaag heeft u <strong>6 afspraken</strong> en <strong>3 openstaande verzoeken</strong>. Beheer hier uw patiënten.',
    'dd.reviewReq': 'Verzoeken bekijken', 'dd.openCal': 'Agenda openen',
    'dd.stat.today': 'Afspraken vandaag', 'dd.stat.pending': 'Openstaand verzoek', 'dd.stat.total': 'Totaal patiënten',
    'dd.todayTitle': 'Programma van vandaag', 'dd.calBtn': 'Agenda',
    'dd.visit.control': 'Controle', 'dd.visit.first': 'Eerste onderzoek', 'dd.visit.lab': 'Uitslagbespreking',
    'dd.mode.online': 'Online', 'dd.mode.clinic': 'Kliniek',
    'dd.badge.confirmed': 'Bevestigd', 'dd.badge.arrived': 'Aangekomen',
    'dd.thisWeek': 'Deze week',
    'dd.dow.mon': 'Ma', 'dd.dow.tue': 'Di', 'dd.dow.wed': 'Wo', 'dd.dow.thu': 'Do', 'dd.dow.fri': 'Vr', 'dd.dow.sat': 'Za', 'dd.dow.sun': 'Zo',
    'dd.weekSummary': 'In totaal <strong>34 afspraken</strong> · <span class="up">+12%</span> t.o.v. vorige week',
    'dd.req1': 'Cardiologie-controle · aangevraagd 28 jun, 14:30', 'dd.req2': 'Eerste onderzoek · aangevraagd 29 jun, 11:00', 'dd.req3': 'Uitslagbespreking · aangevraagd 30 jun, 16:00',
    'dd.accept': 'Accepteren', 'dd.reject': 'Weigeren',
    'dd.calTitle': 'Mijn agenda — Juni 2026',
    'dd.th.patient': 'Patiënt', 'dd.th.lastVisit': 'Laatste bezoek', 'dd.th.status': 'Status', 'dd.th.action': 'Actie',
    'dd.pstat.active': 'Actieve opvolging', 'dd.pstat.new': 'Nieuw', 'dd.pstat.followup': 'Wacht op controle', 'dd.fileBtn': 'Dossier',
    'dd.msg1': 'Dokter, moet ik het medicijn op een lege maag innemen?', 'dd.msg2': 'Bedankt voor de afspraak, tot snel.', 'dd.msg3': 'Ik heb mijn testresultaten geüpload.',
    'dd.t.1h': '1 u', 'dd.t.4h': '4 u', 'dd.t.1d': '1 d',
    'dd.f.specialty': 'Specialisme', 'dd.f.license': 'Diploma- / licentienr.', 'dd.f.bio': 'Over mij',
    'dd.ph.specialty': 'Cardiologie', 'dd.ph.bio': 'Stel uzelf voor aan uw patiënten…',
    'dd.workPrefsTitle': 'Werkvoorkeuren', 'dd.pref.online': 'Online consulten accepteren', 'dd.pref.newReq': 'Melding bij nieuw afspraakverzoek', 'dd.pref.weekend': 'Weekendafspraken',
    'dd.reqAccepted': 'Geaccepteerd ✓', 'dd.reqRejected': 'Geweigerd'
  });

  /* ===== doctor listings (İlanlarım) ===== */
  add('tr', { 'dl.nav':'İlanlarım', 'dl.title':'İlanlarım', 'dl.new':'Yeni İlan' });
  add('en', { 'dl.nav':'My Listings', 'dl.title':'My Listings', 'dl.new':'New Listing' });
  add('de', { 'dl.nav':'Meine Anzeigen', 'dl.title':'Meine Anzeigen', 'dl.new':'Neue Anzeige' });
  add('ru', { 'dl.nav':'Мои объявления', 'dl.title':'Мои объявления', 'dl.new':'Новое объявление' });
  add('fr', { 'dl.nav':'Mes annonces', 'dl.title':'Mes annonces', 'dl.new':'Nouvelle annonce' });
  add('es', { 'dl.nav':'Mis anuncios', 'dl.title':'Mis anuncios', 'dl.new':'Nuevo anuncio' });
  add('pt', { 'dl.nav':'Meus anúncios', 'dl.title':'Meus anúncios', 'dl.new':'Novo anúncio' });
  add('ar', { 'dl.nav':'إعلاناتي', 'dl.title':'إعلاناتي', 'dl.new':'إعلان جديد' });
  add('nl', { 'dl.nav':'Mijn advertenties', 'dl.title':'Mijn advertenties', 'dl.new':'Nieuwe advertentie' });
})(window.HP_I18N);
