/* ============================================================
   Healthperia — i18n-account.js  (SHARED account/panel strings)
   Loaded on every account page before i18n-core.js.
   Merge-style registration so a page-specific i18n file can add
   to the same window.HP_I18N without clobbering these keys.
   Covers: role/status labels, shared sidebar + topbar chrome,
   profile / password forms, and the auth-engine error messages
   (err.* / msg.*) returned by js/auth.js.
   ============================================================ */
window.HP_I18N = window.HP_I18N || {};
(function (I) {
  'use strict';
  function add(lang, obj) { I[lang] = Object.assign(I[lang] || {}, obj); }

  add('tr', {
    'acc.role.patient': 'Hasta', 'acc.role.doctor': 'Doktor', 'acc.role.admin': 'Yönetici',
    'acc.status.active': 'Aktif', 'acc.status.pending': 'Onay Bekliyor', 'acc.status.suspended': 'Askıda', 'acc.status.deleted': 'Silindi',
    'acc.crumb.patient': 'Hasta Paneli', 'acc.crumb.doctor': 'Doktor Paneli', 'acc.crumb.admin': 'Yönetim Paneli',
    'acc.group.account': 'Hesap',
    'acc.nav.overview': 'Genel Bakış', 'acc.nav.messages': 'Mesajlar', 'acc.nav.profile': 'Profilim', 'acc.nav.settings': 'Ayarlar',
    'acc.logout': 'Çıkış Yap',
    'acc.aria.closeMenu': 'Menüyü kapat', 'acc.aria.menu': 'Menü', 'acc.aria.notifications': 'Bildirimler', 'acc.aria.lang': 'Dil seçimi',
    'acc.f.name': 'Ad Soyad', 'acc.f.email': 'E-posta', 'acc.f.phone': 'Telefon', 'acc.f.country': 'Ülke',
    'acc.save': 'Değişiklikleri Kaydet', 'acc.saved': 'Kaydedildi ✓',
    'acc.pw.title': 'Şifre Değiştir', 'acc.pw.current': 'Mevcut Şifre', 'acc.pw.new': 'Yeni Şifre', 'acc.pw.confirm': 'Yeni Şifre (tekrar)',
    'acc.pw.update': 'Şifreyi Güncelle', 'acc.pw.updated': 'Güncellendi ✓', 'acc.pw.mismatch': 'Yeni şifreler eşleşmiyor.',
    'err.session': 'Oturum bulunamadı.', 'err.account': 'Hesap bulunamadı.',
    'err.currentPw': 'Mevcut şifre hatalı.', 'err.newPwLen': 'Yeni şifre en az 6 karakter olmalıdır.',
    'err.noAccount': 'Bu e-posta ile kayıtlı bir hesap bulunamadı.', 'err.badCreds': 'E-posta veya şifre hatalı.',
    'err.wrongTab': 'Bu hesap "{role}" türünde. Lütfen doğru sekmeyi seçin.',
    'err.pending': 'Doktor hesabınız henüz onay bekliyor. Onaylandığında bilgilendirileceksiniz.',
    'err.suspended': 'Hesabınız askıya alınmış. Lütfen destek ekibiyle iletişime geçin.', 'err.deleted': 'Bu hesap mevcut değil.',
    'err.nameInvalid': 'Lütfen geçerli bir ad soyad girin.', 'err.emailInvalid': 'Lütfen geçerli bir e-posta adresi girin.',
    'err.pwLen': 'Şifre en az 6 karakter olmalıdır.', 'err.pwMismatch': 'Şifreler eşleşmiyor.',
    'err.emailExists': 'Bu e-posta ile bir hesap zaten mevcut.',
    'err.specialty': 'Lütfen uzmanlık alanınızı girin.', 'err.license': 'Lütfen diploma / lisans numaranızı girin.',
    'err.resetNotFound': 'Sıfırlama isteği bulunamadı. Lütfen tekrar deneyin.',
    'err.codeWrong': 'Doğrulama kodu hatalı.', 'err.codeExpired': 'Kodun süresi doldu. Lütfen yeni kod isteyin.',
    'msg.docPending': 'Hesabınız oluşturuldu. Doktor hesapları, güvenlik için ekibimiz tarafından onaylandıktan sonra aktif olur.'
  });

  add('en', {
    'acc.role.patient': 'Patient', 'acc.role.doctor': 'Doctor', 'acc.role.admin': 'Administrator',
    'acc.status.active': 'Active', 'acc.status.pending': 'Pending Approval', 'acc.status.suspended': 'Suspended', 'acc.status.deleted': 'Deleted',
    'acc.crumb.patient': 'Patient Panel', 'acc.crumb.doctor': 'Doctor Panel', 'acc.crumb.admin': 'Admin Panel',
    'acc.group.account': 'Account',
    'acc.nav.overview': 'Overview', 'acc.nav.messages': 'Messages', 'acc.nav.profile': 'My Profile', 'acc.nav.settings': 'Settings',
    'acc.logout': 'Log Out',
    'acc.aria.closeMenu': 'Close menu', 'acc.aria.menu': 'Menu', 'acc.aria.notifications': 'Notifications', 'acc.aria.lang': 'Language selection',
    'acc.f.name': 'Full Name', 'acc.f.email': 'Email', 'acc.f.phone': 'Phone', 'acc.f.country': 'Country',
    'acc.save': 'Save Changes', 'acc.saved': 'Saved ✓',
    'acc.pw.title': 'Change Password', 'acc.pw.current': 'Current Password', 'acc.pw.new': 'New Password', 'acc.pw.confirm': 'New Password (repeat)',
    'acc.pw.update': 'Update Password', 'acc.pw.updated': 'Updated ✓', 'acc.pw.mismatch': 'New passwords do not match.',
    'err.session': 'Session not found.', 'err.account': 'Account not found.',
    'err.currentPw': 'Current password is incorrect.', 'err.newPwLen': 'New password must be at least 6 characters.',
    'err.noAccount': 'No account found with this email.', 'err.badCreds': 'Email or password is incorrect.',
    'err.wrongTab': 'This account is of type "{role}". Please select the correct tab.',
    'err.pending': 'Your doctor account is still awaiting approval. You will be notified once approved.',
    'err.suspended': 'Your account has been suspended. Please contact our support team.', 'err.deleted': 'This account does not exist.',
    'err.nameInvalid': 'Please enter a valid full name.', 'err.emailInvalid': 'Please enter a valid email address.',
    'err.pwLen': 'Password must be at least 6 characters.', 'err.pwMismatch': 'Passwords do not match.',
    'err.emailExists': 'An account with this email already exists.',
    'err.specialty': 'Please enter your specialty.', 'err.license': 'Please enter your diploma / license number.',
    'err.resetNotFound': 'No reset request found. Please try again.',
    'err.codeWrong': 'The verification code is incorrect.', 'err.codeExpired': 'The code has expired. Please request a new one.',
    'msg.docPending': 'Your account has been created. Doctor accounts become active once approved by our team for security.'
  });

  add('de', {
    'acc.role.patient': 'Patient', 'acc.role.doctor': 'Arzt', 'acc.role.admin': 'Administrator',
    'acc.status.active': 'Aktiv', 'acc.status.pending': 'Wartet auf Freigabe', 'acc.status.suspended': 'Gesperrt', 'acc.status.deleted': 'Gelöscht',
    'acc.crumb.patient': 'Patientenbereich', 'acc.crumb.doctor': 'Arztbereich', 'acc.crumb.admin': 'Verwaltungsbereich',
    'acc.group.account': 'Konto',
    'acc.nav.overview': 'Übersicht', 'acc.nav.messages': 'Nachrichten', 'acc.nav.profile': 'Mein Profil', 'acc.nav.settings': 'Einstellungen',
    'acc.logout': 'Abmelden',
    'acc.aria.closeMenu': 'Menü schließen', 'acc.aria.menu': 'Menü', 'acc.aria.notifications': 'Benachrichtigungen', 'acc.aria.lang': 'Sprachauswahl',
    'acc.f.name': 'Vor- und Nachname', 'acc.f.email': 'E-Mail', 'acc.f.phone': 'Telefon', 'acc.f.country': 'Land',
    'acc.save': 'Änderungen speichern', 'acc.saved': 'Gespeichert ✓',
    'acc.pw.title': 'Passwort ändern', 'acc.pw.current': 'Aktuelles Passwort', 'acc.pw.new': 'Neues Passwort', 'acc.pw.confirm': 'Neues Passwort (wiederholen)',
    'acc.pw.update': 'Passwort aktualisieren', 'acc.pw.updated': 'Aktualisiert ✓', 'acc.pw.mismatch': 'Die neuen Passwörter stimmen nicht überein.',
    'err.session': 'Sitzung nicht gefunden.', 'err.account': 'Konto nicht gefunden.',
    'err.currentPw': 'Das aktuelle Passwort ist falsch.', 'err.newPwLen': 'Das neue Passwort muss mindestens 6 Zeichen haben.',
    'err.noAccount': 'Mit dieser E-Mail wurde kein Konto gefunden.', 'err.badCreds': 'E-Mail oder Passwort ist falsch.',
    'err.wrongTab': 'Dieses Konto ist vom Typ „{role}“. Bitte wählen Sie den richtigen Tab.',
    'err.pending': 'Ihr Arztkonto wartet noch auf die Freigabe. Sie werden nach der Freigabe benachrichtigt.',
    'err.suspended': 'Ihr Konto wurde gesperrt. Bitte kontaktieren Sie unser Support-Team.', 'err.deleted': 'Dieses Konto existiert nicht.',
    'err.nameInvalid': 'Bitte geben Sie einen gültigen Namen ein.', 'err.emailInvalid': 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    'err.pwLen': 'Das Passwort muss mindestens 6 Zeichen haben.', 'err.pwMismatch': 'Die Passwörter stimmen nicht überein.',
    'err.emailExists': 'Ein Konto mit dieser E-Mail existiert bereits.',
    'err.specialty': 'Bitte geben Sie Ihr Fachgebiet an.', 'err.license': 'Bitte geben Sie Ihre Diplom- / Lizenznummer an.',
    'err.resetNotFound': 'Keine Zurücksetzungsanfrage gefunden. Bitte erneut versuchen.',
    'err.codeWrong': 'Der Bestätigungscode ist falsch.', 'err.codeExpired': 'Der Code ist abgelaufen. Bitte fordern Sie einen neuen an.',
    'msg.docPending': 'Ihr Konto wurde erstellt. Arztkonten werden aus Sicherheitsgründen erst nach Freigabe durch unser Team aktiv.'
  });

  add('ru', {
    'acc.role.patient': 'Пациент', 'acc.role.doctor': 'Врач', 'acc.role.admin': 'Администратор',
    'acc.status.active': 'Активен', 'acc.status.pending': 'Ожидает одобрения', 'acc.status.suspended': 'Заблокирован', 'acc.status.deleted': 'Удалён',
    'acc.crumb.patient': 'Панель пациента', 'acc.crumb.doctor': 'Панель врача', 'acc.crumb.admin': 'Панель управления',
    'acc.group.account': 'Аккаунт',
    'acc.nav.overview': 'Обзор', 'acc.nav.messages': 'Сообщения', 'acc.nav.profile': 'Мой профиль', 'acc.nav.settings': 'Настройки',
    'acc.logout': 'Выйти',
    'acc.aria.closeMenu': 'Закрыть меню', 'acc.aria.menu': 'Меню', 'acc.aria.notifications': 'Уведомления', 'acc.aria.lang': 'Выбор языка',
    'acc.f.name': 'Имя и фамилия', 'acc.f.email': 'Эл. почта', 'acc.f.phone': 'Телефон', 'acc.f.country': 'Страна',
    'acc.save': 'Сохранить изменения', 'acc.saved': 'Сохранено ✓',
    'acc.pw.title': 'Сменить пароль', 'acc.pw.current': 'Текущий пароль', 'acc.pw.new': 'Новый пароль', 'acc.pw.confirm': 'Новый пароль (повтор)',
    'acc.pw.update': 'Обновить пароль', 'acc.pw.updated': 'Обновлено ✓', 'acc.pw.mismatch': 'Новые пароли не совпадают.',
    'err.session': 'Сессия не найдена.', 'err.account': 'Аккаунт не найден.',
    'err.currentPw': 'Текущий пароль неверен.', 'err.newPwLen': 'Новый пароль должен содержать не менее 6 символов.',
    'err.noAccount': 'Аккаунт с такой почтой не найден.', 'err.badCreds': 'Неверная почта или пароль.',
    'err.wrongTab': 'Этот аккаунт имеет тип «{role}». Пожалуйста, выберите правильную вкладку.',
    'err.pending': 'Ваш аккаунт врача ещё ожидает одобрения. Вы получите уведомление после одобрения.',
    'err.suspended': 'Ваш аккаунт заблокирован. Пожалуйста, свяжитесь со службой поддержки.', 'err.deleted': 'Этот аккаунт не существует.',
    'err.nameInvalid': 'Пожалуйста, введите корректное имя.', 'err.emailInvalid': 'Пожалуйста, введите корректный адрес эл. почты.',
    'err.pwLen': 'Пароль должен содержать не менее 6 символов.', 'err.pwMismatch': 'Пароли не совпадают.',
    'err.emailExists': 'Аккаунт с такой почтой уже существует.',
    'err.specialty': 'Пожалуйста, укажите вашу специализацию.', 'err.license': 'Пожалуйста, укажите номер диплома / лицензии.',
    'err.resetNotFound': 'Запрос на сброс не найден. Пожалуйста, попробуйте снова.',
    'err.codeWrong': 'Код подтверждения неверен.', 'err.codeExpired': 'Срок действия кода истёк. Запросите новый.',
    'msg.docPending': 'Ваш аккаунт создан. Аккаунты врачей активируются после проверки нашей командой в целях безопасности.'
  });

  add('fr', {
    'acc.role.patient': 'Patient', 'acc.role.doctor': 'Médecin', 'acc.role.admin': 'Administrateur',
    'acc.status.active': 'Actif', 'acc.status.pending': 'En attente d’approbation', 'acc.status.suspended': 'Suspendu', 'acc.status.deleted': 'Supprimé',
    'acc.crumb.patient': 'Espace patient', 'acc.crumb.doctor': 'Espace médecin', 'acc.crumb.admin': 'Espace d’administration',
    'acc.group.account': 'Compte',
    'acc.nav.overview': 'Aperçu', 'acc.nav.messages': 'Messages', 'acc.nav.profile': 'Mon profil', 'acc.nav.settings': 'Paramètres',
    'acc.logout': 'Déconnexion',
    'acc.aria.closeMenu': 'Fermer le menu', 'acc.aria.menu': 'Menu', 'acc.aria.notifications': 'Notifications', 'acc.aria.lang': 'Choix de la langue',
    'acc.f.name': 'Nom complet', 'acc.f.email': 'E-mail', 'acc.f.phone': 'Téléphone', 'acc.f.country': 'Pays',
    'acc.save': 'Enregistrer les modifications', 'acc.saved': 'Enregistré ✓',
    'acc.pw.title': 'Changer le mot de passe', 'acc.pw.current': 'Mot de passe actuel', 'acc.pw.new': 'Nouveau mot de passe', 'acc.pw.confirm': 'Nouveau mot de passe (répéter)',
    'acc.pw.update': 'Mettre à jour le mot de passe', 'acc.pw.updated': 'Mis à jour ✓', 'acc.pw.mismatch': 'Les nouveaux mots de passe ne correspondent pas.',
    'err.session': 'Session introuvable.', 'err.account': 'Compte introuvable.',
    'err.currentPw': 'Le mot de passe actuel est incorrect.', 'err.newPwLen': 'Le nouveau mot de passe doit comporter au moins 6 caractères.',
    'err.noAccount': 'Aucun compte trouvé avec cet e-mail.', 'err.badCreds': 'E-mail ou mot de passe incorrect.',
    'err.wrongTab': 'Ce compte est de type « {role} ». Veuillez sélectionner le bon onglet.',
    'err.pending': 'Votre compte médecin est encore en attente d’approbation. Vous serez informé une fois approuvé.',
    'err.suspended': 'Votre compte a été suspendu. Veuillez contacter notre équipe d’assistance.', 'err.deleted': 'Ce compte n’existe pas.',
    'err.nameInvalid': 'Veuillez saisir un nom valide.', 'err.emailInvalid': 'Veuillez saisir une adresse e-mail valide.',
    'err.pwLen': 'Le mot de passe doit comporter au moins 6 caractères.', 'err.pwMismatch': 'Les mots de passe ne correspondent pas.',
    'err.emailExists': 'Un compte avec cet e-mail existe déjà.',
    'err.specialty': 'Veuillez indiquer votre spécialité.', 'err.license': 'Veuillez indiquer votre numéro de diplôme / licence.',
    'err.resetNotFound': 'Aucune demande de réinitialisation trouvée. Veuillez réessayer.',
    'err.codeWrong': 'Le code de vérification est incorrect.', 'err.codeExpired': 'Le code a expiré. Veuillez en demander un nouveau.',
    'msg.docPending': 'Votre compte a été créé. Les comptes médecins sont activés après validation par notre équipe pour des raisons de sécurité.'
  });

  add('es', {
    'acc.role.patient': 'Paciente', 'acc.role.doctor': 'Médico', 'acc.role.admin': 'Administrador',
    'acc.status.active': 'Activo', 'acc.status.pending': 'Pendiente de aprobación', 'acc.status.suspended': 'Suspendido', 'acc.status.deleted': 'Eliminado',
    'acc.crumb.patient': 'Panel del paciente', 'acc.crumb.doctor': 'Panel del médico', 'acc.crumb.admin': 'Panel de administración',
    'acc.group.account': 'Cuenta',
    'acc.nav.overview': 'Resumen', 'acc.nav.messages': 'Mensajes', 'acc.nav.profile': 'Mi perfil', 'acc.nav.settings': 'Ajustes',
    'acc.logout': 'Cerrar sesión',
    'acc.aria.closeMenu': 'Cerrar menú', 'acc.aria.menu': 'Menú', 'acc.aria.notifications': 'Notificaciones', 'acc.aria.lang': 'Selección de idioma',
    'acc.f.name': 'Nombre completo', 'acc.f.email': 'Correo electrónico', 'acc.f.phone': 'Teléfono', 'acc.f.country': 'País',
    'acc.save': 'Guardar cambios', 'acc.saved': 'Guardado ✓',
    'acc.pw.title': 'Cambiar contraseña', 'acc.pw.current': 'Contraseña actual', 'acc.pw.new': 'Nueva contraseña', 'acc.pw.confirm': 'Nueva contraseña (repetir)',
    'acc.pw.update': 'Actualizar contraseña', 'acc.pw.updated': 'Actualizado ✓', 'acc.pw.mismatch': 'Las nuevas contraseñas no coinciden.',
    'err.session': 'Sesión no encontrada.', 'err.account': 'Cuenta no encontrada.',
    'err.currentPw': 'La contraseña actual es incorrecta.', 'err.newPwLen': 'La nueva contraseña debe tener al menos 6 caracteres.',
    'err.noAccount': 'No se encontró ninguna cuenta con este correo.', 'err.badCreds': 'Correo o contraseña incorrectos.',
    'err.wrongTab': 'Esta cuenta es de tipo «{role}». Por favor, seleccione la pestaña correcta.',
    'err.pending': 'Su cuenta de médico aún está pendiente de aprobación. Se le notificará una vez aprobada.',
    'err.suspended': 'Su cuenta ha sido suspendida. Por favor, contacte con nuestro equipo de soporte.', 'err.deleted': 'Esta cuenta no existe.',
    'err.nameInvalid': 'Por favor, introduzca un nombre válido.', 'err.emailInvalid': 'Por favor, introduzca un correo electrónico válido.',
    'err.pwLen': 'La contraseña debe tener al menos 6 caracteres.', 'err.pwMismatch': 'Las contraseñas no coinciden.',
    'err.emailExists': 'Ya existe una cuenta con este correo.',
    'err.specialty': 'Por favor, indique su especialidad.', 'err.license': 'Por favor, indique su número de diploma / licencia.',
    'err.resetNotFound': 'No se encontró ninguna solicitud de restablecimiento. Inténtelo de nuevo.',
    'err.codeWrong': 'El código de verificación es incorrecto.', 'err.codeExpired': 'El código ha caducado. Solicite uno nuevo.',
    'msg.docPending': 'Su cuenta ha sido creada. Las cuentas de médico se activan una vez aprobadas por nuestro equipo por seguridad.'
  });

  add('pt', {
    'acc.role.patient': 'Paciente', 'acc.role.doctor': 'Médico', 'acc.role.admin': 'Administrador',
    'acc.status.active': 'Ativo', 'acc.status.pending': 'Aguardando aprovação', 'acc.status.suspended': 'Suspenso', 'acc.status.deleted': 'Excluído',
    'acc.crumb.patient': 'Painel do paciente', 'acc.crumb.doctor': 'Painel do médico', 'acc.crumb.admin': 'Painel de administração',
    'acc.group.account': 'Conta',
    'acc.nav.overview': 'Visão geral', 'acc.nav.messages': 'Mensagens', 'acc.nav.profile': 'Meu perfil', 'acc.nav.settings': 'Configurações',
    'acc.logout': 'Sair',
    'acc.aria.closeMenu': 'Fechar menu', 'acc.aria.menu': 'Menu', 'acc.aria.notifications': 'Notificações', 'acc.aria.lang': 'Seleção de idioma',
    'acc.f.name': 'Nome completo', 'acc.f.email': 'E-mail', 'acc.f.phone': 'Telefone', 'acc.f.country': 'País',
    'acc.save': 'Salvar alterações', 'acc.saved': 'Salvo ✓',
    'acc.pw.title': 'Alterar senha', 'acc.pw.current': 'Senha atual', 'acc.pw.new': 'Nova senha', 'acc.pw.confirm': 'Nova senha (repetir)',
    'acc.pw.update': 'Atualizar senha', 'acc.pw.updated': 'Atualizado ✓', 'acc.pw.mismatch': 'As novas senhas não coincidem.',
    'err.session': 'Sessão não encontrada.', 'err.account': 'Conta não encontrada.',
    'err.currentPw': 'A senha atual está incorreta.', 'err.newPwLen': 'A nova senha deve ter pelo menos 6 caracteres.',
    'err.noAccount': 'Nenhuma conta encontrada com este e-mail.', 'err.badCreds': 'E-mail ou senha incorretos.',
    'err.wrongTab': 'Esta conta é do tipo "{role}". Por favor, selecione a aba correta.',
    'err.pending': 'Sua conta de médico ainda aguarda aprovação. Você será notificado quando for aprovada.',
    'err.suspended': 'Sua conta foi suspensa. Por favor, entre em contato com nossa equipe de suporte.', 'err.deleted': 'Esta conta não existe.',
    'err.nameInvalid': 'Por favor, insira um nome válido.', 'err.emailInvalid': 'Por favor, insira um endereço de e-mail válido.',
    'err.pwLen': 'A senha deve ter pelo menos 6 caracteres.', 'err.pwMismatch': 'As senhas não coincidem.',
    'err.emailExists': 'Já existe uma conta com este e-mail.',
    'err.specialty': 'Por favor, informe sua especialidade.', 'err.license': 'Por favor, informe seu número de diploma / licença.',
    'err.resetNotFound': 'Nenhum pedido de redefinição encontrado. Tente novamente.',
    'err.codeWrong': 'O código de verificação está incorreto.', 'err.codeExpired': 'O código expirou. Solicite um novo.',
    'msg.docPending': 'Sua conta foi criada. As contas de médico são ativadas após aprovação da nossa equipe por segurança.'
  });

  add('ar', {
    'acc.role.patient': 'مريض', 'acc.role.doctor': 'طبيب', 'acc.role.admin': 'مسؤول',
    'acc.status.active': 'نشط', 'acc.status.pending': 'بانتظار الموافقة', 'acc.status.suspended': 'موقوف', 'acc.status.deleted': 'محذوف',
    'acc.crumb.patient': 'لوحة المريض', 'acc.crumb.doctor': 'لوحة الطبيب', 'acc.crumb.admin': 'لوحة الإدارة',
    'acc.group.account': 'الحساب',
    'acc.nav.overview': 'نظرة عامة', 'acc.nav.messages': 'الرسائل', 'acc.nav.profile': 'ملفي الشخصي', 'acc.nav.settings': 'الإعدادات',
    'acc.logout': 'تسجيل الخروج',
    'acc.aria.closeMenu': 'إغلاق القائمة', 'acc.aria.menu': 'القائمة', 'acc.aria.notifications': 'الإشعارات', 'acc.aria.lang': 'اختيار اللغة',
    'acc.f.name': 'الاسم الكامل', 'acc.f.email': 'البريد الإلكتروني', 'acc.f.phone': 'الهاتف', 'acc.f.country': 'الدولة',
    'acc.save': 'حفظ التغييرات', 'acc.saved': 'تم الحفظ ✓',
    'acc.pw.title': 'تغيير كلمة المرور', 'acc.pw.current': 'كلمة المرور الحالية', 'acc.pw.new': 'كلمة المرور الجديدة', 'acc.pw.confirm': 'كلمة المرور الجديدة (تكرار)',
    'acc.pw.update': 'تحديث كلمة المرور', 'acc.pw.updated': 'تم التحديث ✓', 'acc.pw.mismatch': 'كلمتا المرور الجديدتان غير متطابقتين.',
    'err.session': 'الجلسة غير موجودة.', 'err.account': 'الحساب غير موجود.',
    'err.currentPw': 'كلمة المرور الحالية غير صحيحة.', 'err.newPwLen': 'يجب أن تتكون كلمة المرور الجديدة من 6 أحرف على الأقل.',
    'err.noAccount': 'لا يوجد حساب بهذا البريد الإلكتروني.', 'err.badCreds': 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    'err.wrongTab': 'هذا الحساب من نوع «{role}». يرجى اختيار التبويب الصحيح.',
    'err.pending': 'حساب الطبيب الخاص بك لا يزال بانتظار الموافقة. سيتم إعلامك عند الموافقة.',
    'err.suspended': 'تم إيقاف حسابك. يرجى التواصل مع فريق الدعم.', 'err.deleted': 'هذا الحساب غير موجود.',
    'err.nameInvalid': 'يرجى إدخال اسم صحيح.', 'err.emailInvalid': 'يرجى إدخال بريد إلكتروني صحيح.',
    'err.pwLen': 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.', 'err.pwMismatch': 'كلمتا المرور غير متطابقتين.',
    'err.emailExists': 'يوجد حساب بهذا البريد الإلكتروني بالفعل.',
    'err.specialty': 'يرجى إدخال تخصصك.', 'err.license': 'يرجى إدخال رقم الدبلوم / الترخيص.',
    'err.resetNotFound': 'لم يتم العثور على طلب إعادة تعيين. يرجى المحاولة مرة أخرى.',
    'err.codeWrong': 'رمز التحقق غير صحيح.', 'err.codeExpired': 'انتهت صلاحية الرمز. يرجى طلب رمز جديد.',
    'msg.docPending': 'تم إنشاء حسابك. تُفعّل حسابات الأطباء بعد موافقة فريقنا لأسباب أمنية.'
  });

  add('nl', {
    'acc.role.patient': 'Patiënt', 'acc.role.doctor': 'Arts', 'acc.role.admin': 'Beheerder',
    'acc.status.active': 'Actief', 'acc.status.pending': 'Wacht op goedkeuring', 'acc.status.suspended': 'Geschorst', 'acc.status.deleted': 'Verwijderd',
    'acc.crumb.patient': 'Patiëntpaneel', 'acc.crumb.doctor': 'Artsenpaneel', 'acc.crumb.admin': 'Beheerpaneel',
    'acc.group.account': 'Account',
    'acc.nav.overview': 'Overzicht', 'acc.nav.messages': 'Berichten', 'acc.nav.profile': 'Mijn profiel', 'acc.nav.settings': 'Instellingen',
    'acc.logout': 'Uitloggen',
    'acc.aria.closeMenu': 'Menu sluiten', 'acc.aria.menu': 'Menu', 'acc.aria.notifications': 'Meldingen', 'acc.aria.lang': 'Taalkeuze',
    'acc.f.name': 'Volledige naam', 'acc.f.email': 'E-mail', 'acc.f.phone': 'Telefoon', 'acc.f.country': 'Land',
    'acc.save': 'Wijzigingen opslaan', 'acc.saved': 'Opgeslagen ✓',
    'acc.pw.title': 'Wachtwoord wijzigen', 'acc.pw.current': 'Huidig wachtwoord', 'acc.pw.new': 'Nieuw wachtwoord', 'acc.pw.confirm': 'Nieuw wachtwoord (herhalen)',
    'acc.pw.update': 'Wachtwoord bijwerken', 'acc.pw.updated': 'Bijgewerkt ✓', 'acc.pw.mismatch': 'De nieuwe wachtwoorden komen niet overeen.',
    'err.session': 'Sessie niet gevonden.', 'err.account': 'Account niet gevonden.',
    'err.currentPw': 'Het huidige wachtwoord is onjuist.', 'err.newPwLen': 'Het nieuwe wachtwoord moet minstens 6 tekens bevatten.',
    'err.noAccount': 'Geen account gevonden met dit e-mailadres.', 'err.badCreds': 'E-mail of wachtwoord is onjuist.',
    'err.wrongTab': 'Dit account is van het type "{role}". Selecteer het juiste tabblad.',
    'err.pending': 'Uw artsenaccount wacht nog op goedkeuring. U wordt op de hoogte gesteld zodra het is goedgekeurd.',
    'err.suspended': 'Uw account is geschorst. Neem contact op met ons supportteam.', 'err.deleted': 'Dit account bestaat niet.',
    'err.nameInvalid': 'Voer een geldige naam in.', 'err.emailInvalid': 'Voer een geldig e-mailadres in.',
    'err.pwLen': 'Het wachtwoord moet minstens 6 tekens bevatten.', 'err.pwMismatch': 'De wachtwoorden komen niet overeen.',
    'err.emailExists': 'Er bestaat al een account met dit e-mailadres.',
    'err.specialty': 'Voer uw specialisme in.', 'err.license': 'Voer uw diploma- / licentienummer in.',
    'err.resetNotFound': 'Geen herstelverzoek gevonden. Probeer het opnieuw.',
    'err.codeWrong': 'De verificatiecode is onjuist.', 'err.codeExpired': 'De code is verlopen. Vraag een nieuwe aan.',
    'msg.docPending': 'Uw account is aangemaakt. Artsenaccounts worden om veiligheidsredenen geactiveerd na goedkeuring door ons team.'
  });

  /* ===== CHAT (messaging UI: attachments, reactions, mute/delete, report) ===== */
  add('tr', {
    'chat.yesterday': 'Dün', 'chat.today': 'Bugün', 'chat.options': 'Seçenekler',
    'chat.mute': 'Bildirimi Kapat', 'chat.unmute': 'Bildirimi Aç', 'chat.delete': 'Sohbeti Sil',
    'chat.deleteConfirm': 'Bu sohbet sizin için silinecek. Devam edilsin mi?',
    'chat.back': 'Geri', 'chat.send': 'Gönder', 'chat.placeholder': 'Mesaj yazın…',
    'chat.attach': 'Ekle', 'chat.document': 'Belge', 'chat.photo': 'Fotoğraf', 'chat.react': 'Tepki ver',
    'chat.uploading': 'Yükleniyor…', 'chat.uploadErr': 'Dosya yüklenemedi.',
    'chat.listing': 'Tedavi İlanı', 'chat.listingFrom': 'Bu görüşme bir tedavi ilanından başladı', 'chat.code': 'Kod',
    'chat.reportDoctor': 'Doktoru Şikâyet Et', 'chat.reportPatient': 'Hastayı Şikâyet Et', 'chat.reportReason': 'Sebep',
    'chat.reportR1': 'Uygunsuz davranış', 'chat.reportR2': 'Yanıltıcı / yanlış bilgi', 'chat.reportR3': 'Spam / istenmeyen mesaj', 'chat.reportR4': 'Diğer',
    'chat.reportDetail': 'Açıklama (isteğe bağlı)', 'chat.reportPh': 'Olayı kısaca açıklayın…', 'chat.reportSend': 'Şikâyet Gönder', 'chat.cancel': 'İptal',
    'chat.reportDoneT': 'Şikâyetiniz alındı', 'chat.reportDone': 'Ekibimiz en kısa sürede inceleyecek. Teşekkürler.', 'chat.reportErr': 'Bir hata oluştu, lütfen tekrar deneyin.',
    'chat.close': 'Kapat', 'chat.changePhoto': 'Fotoğrafı değiştir', 'chat.noDoctor': 'Şu an mesaj gönderilebilecek aktif doktor bulunmuyor.'
  });
  add('en', {
    'chat.yesterday': 'Yesterday', 'chat.today': 'Today', 'chat.options': 'Options',
    'chat.mute': 'Mute', 'chat.unmute': 'Unmute', 'chat.delete': 'Delete chat',
    'chat.deleteConfirm': 'This chat will be deleted for you. Continue?',
    'chat.back': 'Back', 'chat.send': 'Send', 'chat.placeholder': 'Type a message…',
    'chat.attach': 'Attach', 'chat.document': 'Document', 'chat.photo': 'Photo', 'chat.react': 'React',
    'chat.uploading': 'Uploading…', 'chat.uploadErr': 'File could not be uploaded.',
    'chat.listing': 'Treatment Listing', 'chat.listingFrom': 'This conversation started from a treatment listing', 'chat.code': 'Code',
    'chat.reportDoctor': 'Report Doctor', 'chat.reportPatient': 'Report Patient', 'chat.reportReason': 'Reason',
    'chat.reportR1': 'Inappropriate behaviour', 'chat.reportR2': 'Misleading / false information', 'chat.reportR3': 'Spam / unwanted messages', 'chat.reportR4': 'Other',
    'chat.reportDetail': 'Description (optional)', 'chat.reportPh': 'Briefly describe what happened…', 'chat.reportSend': 'Send Report', 'chat.cancel': 'Cancel',
    'chat.reportDoneT': 'Your report has been received', 'chat.reportDone': 'Our team will review it shortly. Thank you.', 'chat.reportErr': 'An error occurred, please try again.',
    'chat.close': 'Close', 'chat.changePhoto': 'Change photo', 'chat.noDoctor': 'There is currently no active doctor to message.'
  });
  add('de', {
    'chat.yesterday': 'Gestern', 'chat.today': 'Heute', 'chat.options': 'Optionen',
    'chat.mute': 'Stummschalten', 'chat.unmute': 'Stummschaltung aufheben', 'chat.delete': 'Chat löschen',
    'chat.deleteConfirm': 'Dieser Chat wird für Sie gelöscht. Fortfahren?',
    'chat.back': 'Zurück', 'chat.send': 'Senden', 'chat.placeholder': 'Nachricht schreiben…',
    'chat.attach': 'Anhängen', 'chat.document': 'Dokument', 'chat.photo': 'Foto', 'chat.react': 'Reagieren',
    'chat.uploading': 'Wird hochgeladen…', 'chat.uploadErr': 'Datei konnte nicht hochgeladen werden.',
    'chat.listing': 'Behandlungsanzeige', 'chat.listingFrom': 'Dieses Gespräch begann über eine Behandlungsanzeige', 'chat.code': 'Code',
    'chat.reportDoctor': 'Arzt melden', 'chat.reportPatient': 'Patient melden', 'chat.reportReason': 'Grund',
    'chat.reportR1': 'Unangemessenes Verhalten', 'chat.reportR2': 'Irreführende / falsche Informationen', 'chat.reportR3': 'Spam / unerwünschte Nachrichten', 'chat.reportR4': 'Sonstiges',
    'chat.reportDetail': 'Beschreibung (optional)', 'chat.reportPh': 'Beschreiben Sie kurz, was passiert ist…', 'chat.reportSend': 'Meldung senden', 'chat.cancel': 'Abbrechen',
    'chat.reportDoneT': 'Ihre Meldung ist eingegangen', 'chat.reportDone': 'Unser Team wird sie in Kürze prüfen. Danke.', 'chat.reportErr': 'Ein Fehler ist aufgetreten, bitte erneut versuchen.',
    'chat.close': 'Schließen', 'chat.changePhoto': 'Foto ändern', 'chat.noDoctor': 'Derzeit ist kein aktiver Arzt zum Schreiben verfügbar.'
  });
  add('ru', {
    'chat.yesterday': 'Вчера', 'chat.today': 'Сегодня', 'chat.options': 'Опции',
    'chat.mute': 'Отключить уведомления', 'chat.unmute': 'Включить уведомления', 'chat.delete': 'Удалить чат',
    'chat.deleteConfirm': 'Этот чат будет удалён для вас. Продолжить?',
    'chat.back': 'Назад', 'chat.send': 'Отправить', 'chat.placeholder': 'Введите сообщение…',
    'chat.attach': 'Прикрепить', 'chat.document': 'Документ', 'chat.photo': 'Фото', 'chat.react': 'Реакция',
    'chat.uploading': 'Загрузка…', 'chat.uploadErr': 'Не удалось загрузить файл.',
    'chat.listing': 'Объявление о лечении', 'chat.listingFrom': 'Этот разговор начался с объявления о лечении', 'chat.code': 'Код',
    'chat.reportDoctor': 'Пожаловаться на врача', 'chat.reportPatient': 'Пожаловаться на пациента', 'chat.reportReason': 'Причина',
    'chat.reportR1': 'Неподобающее поведение', 'chat.reportR2': 'Вводящая в заблуждение / ложная информация', 'chat.reportR3': 'Спам / нежелательные сообщения', 'chat.reportR4': 'Другое',
    'chat.reportDetail': 'Описание (необязательно)', 'chat.reportPh': 'Кратко опишите, что произошло…', 'chat.reportSend': 'Отправить жалобу', 'chat.cancel': 'Отмена',
    'chat.reportDoneT': 'Ваша жалоба получена', 'chat.reportDone': 'Наша команда скоро её рассмотрит. Спасибо.', 'chat.reportErr': 'Произошла ошибка, попробуйте снова.',
    'chat.close': 'Закрыть', 'chat.changePhoto': 'Изменить фото', 'chat.noDoctor': 'Сейчас нет активного врача для сообщения.'
  });
  add('fr', {
    'chat.yesterday': 'Hier', 'chat.today': "Aujourd'hui", 'chat.options': 'Options',
    'chat.mute': 'Couper les notifications', 'chat.unmute': 'Activer les notifications', 'chat.delete': 'Supprimer la conversation',
    'chat.deleteConfirm': 'Cette conversation sera supprimée pour vous. Continuer ?',
    'chat.back': 'Retour', 'chat.send': 'Envoyer', 'chat.placeholder': 'Écrivez un message…',
    'chat.attach': 'Joindre', 'chat.document': 'Document', 'chat.photo': 'Photo', 'chat.react': 'Réagir',
    'chat.uploading': 'Téléversement…', 'chat.uploadErr': "Le fichier n'a pas pu être téléversé.",
    'chat.listing': 'Annonce de traitement', 'chat.listingFrom': "Cette conversation a commencé à partir d'une annonce de traitement", 'chat.code': 'Code',
    'chat.reportDoctor': 'Signaler le médecin', 'chat.reportPatient': 'Signaler le patient', 'chat.reportReason': 'Motif',
    'chat.reportR1': 'Comportement inapproprié', 'chat.reportR2': 'Informations trompeuses / fausses', 'chat.reportR3': 'Spam / messages indésirables', 'chat.reportR4': 'Autre',
    'chat.reportDetail': 'Description (facultatif)', 'chat.reportPh': "Décrivez brièvement ce qui s'est passé…", 'chat.reportSend': 'Envoyer le signalement', 'chat.cancel': 'Annuler',
    'chat.reportDoneT': 'Votre signalement a été reçu', 'chat.reportDone': "Notre équipe l'examinera sous peu. Merci.", 'chat.reportErr': "Une erreur s'est produite, veuillez réessayer.",
    'chat.close': 'Fermer', 'chat.changePhoto': 'Changer la photo', 'chat.noDoctor': "Aucun médecin actif n'est disponible pour le moment."
  });
  add('es', {
    'chat.yesterday': 'Ayer', 'chat.today': 'Hoy', 'chat.options': 'Opciones',
    'chat.mute': 'Silenciar', 'chat.unmute': 'Activar notificaciones', 'chat.delete': 'Eliminar chat',
    'chat.deleteConfirm': 'Este chat se eliminará para ti. ¿Continuar?',
    'chat.back': 'Atrás', 'chat.send': 'Enviar', 'chat.placeholder': 'Escribe un mensaje…',
    'chat.attach': 'Adjuntar', 'chat.document': 'Documento', 'chat.photo': 'Foto', 'chat.react': 'Reaccionar',
    'chat.uploading': 'Subiendo…', 'chat.uploadErr': 'No se pudo subir el archivo.',
    'chat.listing': 'Anuncio de tratamiento', 'chat.listingFrom': 'Esta conversación comenzó desde un anuncio de tratamiento', 'chat.code': 'Código',
    'chat.reportDoctor': 'Denunciar al médico', 'chat.reportPatient': 'Denunciar al paciente', 'chat.reportReason': 'Motivo',
    'chat.reportR1': 'Comportamiento inapropiado', 'chat.reportR2': 'Información engañosa / falsa', 'chat.reportR3': 'Spam / mensajes no deseados', 'chat.reportR4': 'Otro',
    'chat.reportDetail': 'Descripción (opcional)', 'chat.reportPh': 'Describe brevemente lo ocurrido…', 'chat.reportSend': 'Enviar denuncia', 'chat.cancel': 'Cancelar',
    'chat.reportDoneT': 'Tu denuncia ha sido recibida', 'chat.reportDone': 'Nuestro equipo la revisará pronto. Gracias.', 'chat.reportErr': 'Ocurrió un error, inténtalo de nuevo.',
    'chat.close': 'Cerrar', 'chat.changePhoto': 'Cambiar foto', 'chat.noDoctor': 'No hay ningún médico activo disponible para enviar mensajes.'
  });
  add('pt', {
    'chat.yesterday': 'Ontem', 'chat.today': 'Hoje', 'chat.options': 'Opções',
    'chat.mute': 'Silenciar', 'chat.unmute': 'Ativar notificações', 'chat.delete': 'Excluir conversa',
    'chat.deleteConfirm': 'Esta conversa será excluída para você. Continuar?',
    'chat.back': 'Voltar', 'chat.send': 'Enviar', 'chat.placeholder': 'Escreva uma mensagem…',
    'chat.attach': 'Anexar', 'chat.document': 'Documento', 'chat.photo': 'Foto', 'chat.react': 'Reagir',
    'chat.uploading': 'Enviando…', 'chat.uploadErr': 'Não foi possível enviar o arquivo.',
    'chat.listing': 'Anúncio de tratamento', 'chat.listingFrom': 'Esta conversa começou a partir de um anúncio de tratamento', 'chat.code': 'Código',
    'chat.reportDoctor': 'Denunciar médico', 'chat.reportPatient': 'Denunciar paciente', 'chat.reportReason': 'Motivo',
    'chat.reportR1': 'Comportamento inadequado', 'chat.reportR2': 'Informações enganosas / falsas', 'chat.reportR3': 'Spam / mensagens indesejadas', 'chat.reportR4': 'Outro',
    'chat.reportDetail': 'Descrição (opcional)', 'chat.reportPh': 'Descreva brevemente o que aconteceu…', 'chat.reportSend': 'Enviar denúncia', 'chat.cancel': 'Cancelar',
    'chat.reportDoneT': 'Sua denúncia foi recebida', 'chat.reportDone': 'Nossa equipe irá analisá-la em breve. Obrigado.', 'chat.reportErr': 'Ocorreu um erro, tente novamente.',
    'chat.close': 'Fechar', 'chat.changePhoto': 'Alterar foto', 'chat.noDoctor': 'No momento não há médico ativo para enviar mensagem.'
  });
  add('ar', {
    'chat.yesterday': 'أمس', 'chat.today': 'اليوم', 'chat.options': 'خيارات',
    'chat.mute': 'كتم الإشعارات', 'chat.unmute': 'تشغيل الإشعارات', 'chat.delete': 'حذف المحادثة',
    'chat.deleteConfirm': 'سيتم حذف هذه المحادثة بالنسبة لك. هل تريد المتابعة؟',
    'chat.back': 'رجوع', 'chat.send': 'إرسال', 'chat.placeholder': 'اكتب رسالة…',
    'chat.attach': 'إرفاق', 'chat.document': 'مستند', 'chat.photo': 'صورة', 'chat.react': 'تفاعل',
    'chat.uploading': 'جارٍ الرفع…', 'chat.uploadErr': 'تعذّر رفع الملف.',
    'chat.listing': 'إعلان علاج', 'chat.listingFrom': 'بدأت هذه المحادثة من إعلان علاج', 'chat.code': 'الرمز',
    'chat.reportDoctor': 'الإبلاغ عن الطبيب', 'chat.reportPatient': 'الإبلاغ عن المريض', 'chat.reportReason': 'السبب',
    'chat.reportR1': 'سلوك غير لائق', 'chat.reportR2': 'معلومات مضللة / خاطئة', 'chat.reportR3': 'رسائل مزعجة / غير مرغوبة', 'chat.reportR4': 'أخرى',
    'chat.reportDetail': 'الوصف (اختياري)', 'chat.reportPh': 'صف ما حدث باختصار…', 'chat.reportSend': 'إرسال البلاغ', 'chat.cancel': 'إلغاء',
    'chat.reportDoneT': 'تم استلام بلاغك', 'chat.reportDone': 'سيراجعه فريقنا قريبًا. شكرًا لك.', 'chat.reportErr': 'حدث خطأ، يرجى المحاولة مرة أخرى.',
    'chat.close': 'إغلاق', 'chat.changePhoto': 'تغيير الصورة', 'chat.noDoctor': 'لا يوجد طبيب نشط لإرسال رسالة إليه حاليًا.'
  });
  add('nl', {
    'chat.yesterday': 'Gisteren', 'chat.today': 'Vandaag', 'chat.options': 'Opties',
    'chat.mute': 'Dempen', 'chat.unmute': 'Dempen opheffen', 'chat.delete': 'Chat verwijderen',
    'chat.deleteConfirm': 'Deze chat wordt voor jou verwijderd. Doorgaan?',
    'chat.back': 'Terug', 'chat.send': 'Verzenden', 'chat.placeholder': 'Typ een bericht…',
    'chat.attach': 'Bijvoegen', 'chat.document': 'Document', 'chat.photo': 'Foto', 'chat.react': 'Reageren',
    'chat.uploading': 'Uploaden…', 'chat.uploadErr': 'Bestand kon niet worden geüpload.',
    'chat.listing': 'Behandelingsadvertentie', 'chat.listingFrom': 'Dit gesprek begon vanuit een behandelingsadvertentie', 'chat.code': 'Code',
    'chat.reportDoctor': 'Arts melden', 'chat.reportPatient': 'Patiënt melden', 'chat.reportReason': 'Reden',
    'chat.reportR1': 'Ongepast gedrag', 'chat.reportR2': 'Misleidende / onjuiste informatie', 'chat.reportR3': 'Spam / ongewenste berichten', 'chat.reportR4': 'Overig',
    'chat.reportDetail': 'Beschrijving (optioneel)', 'chat.reportPh': 'Beschrijf kort wat er is gebeurd…', 'chat.reportSend': 'Melding verzenden', 'chat.cancel': 'Annuleren',
    'chat.reportDoneT': 'Je melding is ontvangen', 'chat.reportDone': 'Ons team bekijkt het binnenkort. Bedankt.', 'chat.reportErr': 'Er is een fout opgetreden, probeer het opnieuw.',
    'chat.close': 'Sluiten', 'chat.changePhoto': 'Foto wijzigen', 'chat.noDoctor': 'Er is momenteel geen actieve arts om te berichten.'
  });

  /* ===== ANNOUNCEMENTS (ann.*) + ADMIN SUPPORT (sup.*) ===== */
  add('tr', {
    'ann.title': 'Yönetim Duyuruları', 'ann.nav': 'Duyurular', 'ann.compose': 'Yeni Duyuru', 'ann.listTitle': 'Yayınlanan Duyurular',
    'ann.f.title': 'Başlık (isteğe bağlı)', 'ann.ph.title': 'Duyuru başlığı', 'ann.f.audience': 'Hedef Kitle', 'ann.f.body': 'İçerik', 'ann.ph.body': 'Duyuru metni…',
    'ann.aud.all': 'Herkes', 'ann.aud.doctors': 'Doktorlar', 'ann.aud.patients': 'Hastalar',
    'ann.send': 'Duyuruyu Yayınla', 'ann.sent': 'Yayınlandı ✓', 'ann.empty': 'Henüz duyuru yok.', 'ann.delConfirm': 'Bu duyuruyu silmek istiyor musunuz?',
    'sup.nav': 'Yönetime Ulaş', 'sup.title': 'Yönetime Ulaş', 'sup.desc': 'İstek, öneri ve sorularınızı doğrudan yönetim ekibine iletin.', 'sup.none': 'Şu an ulaşılabilir bir yönetici bulunmuyor.', 'sup.admin': 'Yönetim', 'sup.empty': 'İstek ve dileklerinizi buradan iletebilirsiniz.'
  });
  add('en', {
    'ann.title': 'Announcements', 'ann.nav': 'Announcements', 'ann.compose': 'New Announcement', 'ann.listTitle': 'Published Announcements',
    'ann.f.title': 'Title (optional)', 'ann.ph.title': 'Announcement title', 'ann.f.audience': 'Audience', 'ann.f.body': 'Content', 'ann.ph.body': 'Announcement text…',
    'ann.aud.all': 'Everyone', 'ann.aud.doctors': 'Doctors', 'ann.aud.patients': 'Patients',
    'ann.send': 'Publish Announcement', 'ann.sent': 'Published ✓', 'ann.empty': 'No announcements yet.', 'ann.delConfirm': 'Delete this announcement?',
    'sup.nav': 'Contact Admin', 'sup.title': 'Contact Admin', 'sup.desc': 'Send your requests, suggestions and questions directly to the management team.', 'sup.none': 'No administrator is available right now.', 'sup.admin': 'Management', 'sup.empty': 'Share your requests and wishes here.'
  });
  add('de', {
    'ann.title': 'Ankündigungen', 'ann.nav': 'Ankündigungen', 'ann.compose': 'Neue Ankündigung', 'ann.listTitle': 'Veröffentlichte Ankündigungen',
    'ann.f.title': 'Titel (optional)', 'ann.ph.title': 'Titel der Ankündigung', 'ann.f.audience': 'Zielgruppe', 'ann.f.body': 'Inhalt', 'ann.ph.body': 'Ankündigungstext…',
    'ann.aud.all': 'Alle', 'ann.aud.doctors': 'Ärzte', 'ann.aud.patients': 'Patienten',
    'ann.send': 'Ankündigung veröffentlichen', 'ann.sent': 'Veröffentlicht ✓', 'ann.empty': 'Noch keine Ankündigungen.', 'ann.delConfirm': 'Diese Ankündigung löschen?',
    'sup.nav': 'Verwaltung kontaktieren', 'sup.title': 'Verwaltung kontaktieren', 'sup.desc': 'Senden Sie Ihre Anliegen, Vorschläge und Fragen direkt an das Verwaltungsteam.', 'sup.none': 'Derzeit ist kein Administrator verfügbar.', 'sup.admin': 'Verwaltung', 'sup.empty': 'Teilen Sie hier Ihre Anliegen und Wünsche mit.'
  });
  add('ru', {
    'ann.title': 'Объявления', 'ann.nav': 'Объявления', 'ann.compose': 'Новое объявление', 'ann.listTitle': 'Опубликованные объявления',
    'ann.f.title': 'Заголовок (необязательно)', 'ann.ph.title': 'Заголовок объявления', 'ann.f.audience': 'Аудитория', 'ann.f.body': 'Содержание', 'ann.ph.body': 'Текст объявления…',
    'ann.aud.all': 'Все', 'ann.aud.doctors': 'Врачи', 'ann.aud.patients': 'Пациенты',
    'ann.send': 'Опубликовать объявление', 'ann.sent': 'Опубликовано ✓', 'ann.empty': 'Объявлений пока нет.', 'ann.delConfirm': 'Удалить это объявление?',
    'sup.nav': 'Связаться с админом', 'sup.title': 'Связаться с админом', 'sup.desc': 'Отправляйте свои запросы, предложения и вопросы напрямую команде управления.', 'sup.none': 'Сейчас нет доступного администратора.', 'sup.admin': 'Управление', 'sup.empty': 'Оставьте здесь свои запросы и пожелания.'
  });
  add('fr', {
    'ann.title': 'Annonces', 'ann.nav': 'Annonces', 'ann.compose': 'Nouvelle annonce', 'ann.listTitle': 'Annonces publiées',
    'ann.f.title': 'Titre (facultatif)', 'ann.ph.title': "Titre de l'annonce", 'ann.f.audience': 'Public', 'ann.f.body': 'Contenu', 'ann.ph.body': "Texte de l'annonce…",
    'ann.aud.all': 'Tout le monde', 'ann.aud.doctors': 'Médecins', 'ann.aud.patients': 'Patients',
    'ann.send': "Publier l'annonce", 'ann.sent': 'Publié ✓', 'ann.empty': 'Aucune annonce pour le moment.', 'ann.delConfirm': 'Supprimer cette annonce ?',
    'sup.nav': "Contacter l'administration", 'sup.title': "Contacter l'administration", 'sup.desc': "Envoyez vos demandes, suggestions et questions directement à l'équipe de gestion.", 'sup.none': "Aucun administrateur n'est disponible pour le moment.", 'sup.admin': 'Administration', 'sup.empty': 'Partagez ici vos demandes et souhaits.'
  });
  add('es', {
    'ann.title': 'Anuncios', 'ann.nav': 'Anuncios', 'ann.compose': 'Nuevo anuncio', 'ann.listTitle': 'Anuncios publicados',
    'ann.f.title': 'Título (opcional)', 'ann.ph.title': 'Título del anuncio', 'ann.f.audience': 'Audiencia', 'ann.f.body': 'Contenido', 'ann.ph.body': 'Texto del anuncio…',
    'ann.aud.all': 'Todos', 'ann.aud.doctors': 'Médicos', 'ann.aud.patients': 'Pacientes',
    'ann.send': 'Publicar anuncio', 'ann.sent': 'Publicado ✓', 'ann.empty': 'Aún no hay anuncios.', 'ann.delConfirm': '¿Eliminar este anuncio?',
    'sup.nav': 'Contactar administración', 'sup.title': 'Contactar administración', 'sup.desc': 'Envía tus solicitudes, sugerencias y preguntas directamente al equipo de gestión.', 'sup.none': 'No hay ningún administrador disponible ahora.', 'sup.admin': 'Administración', 'sup.empty': 'Comparte aquí tus solicitudes y deseos.'
  });
  add('pt', {
    'ann.title': 'Anúncios', 'ann.nav': 'Anúncios', 'ann.compose': 'Novo anúncio', 'ann.listTitle': 'Anúncios publicados',
    'ann.f.title': 'Título (opcional)', 'ann.ph.title': 'Título do anúncio', 'ann.f.audience': 'Público', 'ann.f.body': 'Conteúdo', 'ann.ph.body': 'Texto do anúncio…',
    'ann.aud.all': 'Todos', 'ann.aud.doctors': 'Médicos', 'ann.aud.patients': 'Pacientes',
    'ann.send': 'Publicar anúncio', 'ann.sent': 'Publicado ✓', 'ann.empty': 'Ainda não há anúncios.', 'ann.delConfirm': 'Excluir este anúncio?',
    'sup.nav': 'Contatar administração', 'sup.title': 'Contatar administração', 'sup.desc': 'Envie suas solicitações, sugestões e perguntas diretamente à equipe de gestão.', 'sup.none': 'Nenhum administrador disponível no momento.', 'sup.admin': 'Administração', 'sup.empty': 'Compartilhe aqui suas solicitações e desejos.'
  });
  add('ar', {
    'ann.title': 'الإعلانات', 'ann.nav': 'الإعلانات', 'ann.compose': 'إعلان جديد', 'ann.listTitle': 'الإعلانات المنشورة',
    'ann.f.title': 'العنوان (اختياري)', 'ann.ph.title': 'عنوان الإعلان', 'ann.f.audience': 'الجمهور', 'ann.f.body': 'المحتوى', 'ann.ph.body': 'نص الإعلان…',
    'ann.aud.all': 'الجميع', 'ann.aud.doctors': 'الأطباء', 'ann.aud.patients': 'المرضى',
    'ann.send': 'نشر الإعلان', 'ann.sent': 'تم النشر ✓', 'ann.empty': 'لا توجد إعلانات بعد.', 'ann.delConfirm': 'حذف هذا الإعلان؟',
    'sup.nav': 'التواصل مع الإدارة', 'sup.title': 'التواصل مع الإدارة', 'sup.desc': 'أرسل طلباتك واقتراحاتك وأسئلتك مباشرة إلى فريق الإدارة.', 'sup.none': 'لا يوجد مسؤول متاح حاليًا.', 'sup.admin': 'الإدارة', 'sup.empty': 'شارك طلباتك ورغباتك هنا.'
  });
  add('nl', {
    'ann.title': 'Aankondigingen', 'ann.nav': 'Aankondigingen', 'ann.compose': 'Nieuwe aankondiging', 'ann.listTitle': 'Gepubliceerde aankondigingen',
    'ann.f.title': 'Titel (optioneel)', 'ann.ph.title': 'Titel van aankondiging', 'ann.f.audience': 'Doelgroep', 'ann.f.body': 'Inhoud', 'ann.ph.body': 'Aankondigingstekst…',
    'ann.aud.all': 'Iedereen', 'ann.aud.doctors': 'Artsen', 'ann.aud.patients': 'Patiënten',
    'ann.send': 'Aankondiging publiceren', 'ann.sent': 'Gepubliceerd ✓', 'ann.empty': 'Nog geen aankondigingen.', 'ann.delConfirm': 'Deze aankondiging verwijderen?',
    'sup.nav': 'Beheer contacteren', 'sup.title': 'Beheer contacteren', 'sup.desc': 'Stuur uw verzoeken, suggesties en vragen rechtstreeks naar het beheerteam.', 'sup.none': 'Er is momenteel geen beheerder beschikbaar.', 'sup.admin': 'Beheer', 'sup.empty': 'Deel hier uw verzoeken en wensen.'
  });
})(window.HP_I18N);
