/* ============================================================
   Healthperia — i18n-forgot.js  (password reset page strings)
   Merge-style; loaded with i18n-account.js before i18n-core.js.
   ============================================================ */
window.HP_I18N = window.HP_I18N || {};
(function (I) {
  'use strict';
  function add(lang, obj) { I[lang] = Object.assign(I[lang] || {}, obj); }

  add('tr', {
    'fp.badge': 'Güvenli Kurtarma',
    'fp.asideTitle': 'Şifrenizi mi<br><span>unuttunuz?</span>',
    'fp.asideLead': 'Endişelenmeyin — birkaç adımda hesabınıza güvenli bir şekilde yeniden erişin. E-postanıza bir doğrulama kodu göndereceğiz.',
    'fp.card.protected': 'Şifreniz korunuyor', 'fp.card.e2e': 'Uçtan uca şifreli kurtarma',
    'fp.card.valid': '30 dk geçerli', 'fp.card.once': 'Tek kullanımlık kod',
    'fp.feat1': 'E-postanıza <strong>doğrulama kodu</strong>', 'fp.feat2': 'Kod <strong>30 dakika</strong> geçerlidir', 'fp.feat3': 'Yeni şifreniz <strong>şifreli</strong> saklanır',
    'fp.trust': 'Dünya genelinde <strong>120.000+</strong> hasta tarafından güveniliyor.',
    'fp.back': 'Girişe dön',
    'fp.step1': 'E-posta', 'fp.step2': 'Doğrulama', 'fp.step3': 'Yeni Şifre',
    'fp.s1.title': 'Şifre sıfırlama', 'fp.s1.sub': 'Hesabınıza bağlı e-posta adresini girin.', 'fp.s1.submit': 'Doğrulama Kodu Gönder',
    'fp.s2.title': 'E-postanızı kontrol edin', 'fp.s2.subDefault': 'E-posta adresinize gönderilen 6 haneli kodu girin.', 'fp.s2.sub': '{email} adresine gönderilen 6 haneli kodu girin.',
    'fp.resend.q': 'Kod gelmedi mi?', 'fp.resend.btn': 'Tekrar gönder', 'fp.s2.submit': 'Kodu Doğrula',
    'fp.s3.title': 'Yeni şifre belirleyin', 'fp.s3.sub': 'Güçlü ve daha önce kullanmadığınız bir şifre seçin.', 'fp.s3.confirm': 'Yeni Şifre (tekrar)', 'fp.s3.submit': 'Şifreyi Güncelle',
    'fp.ph.pwNew': 'En az 6 karakter', 'fp.ph.pwConfirm': 'Şifrenizi tekrar girin', 'fp.eye.show': 'Şifreyi göster',
    'fp.done.title': 'Şifreniz güncellendi', 'fp.done.sub': 'Yeni şifrenizle giriş yapabilirsiniz.', 'fp.done.login': 'Giriş Yap',
    'fp.remember.q': 'Hesabınızı hatırladınız mı?', 'fp.remember.btn': 'Girişe dönün',
    'fp.alert.email': 'Lütfen geçerli bir e-posta girin.', 'fp.alert.code6': 'Lütfen 6 haneli kodu eksiksiz girin.',
    'fp.demoCode': 'Demo modu: doğrulama kodunuz {code} (gerçek sürümde e-posta ile gönderilir).'
  });

  add('en', {
    'fp.badge': 'Secure Recovery',
    'fp.asideTitle': 'Forgot your<br><span>password?</span>',
    'fp.asideLead': 'Don’t worry — regain secure access to your account in a few steps. We’ll send a verification code to your email.',
    'fp.card.protected': 'Your password is protected', 'fp.card.e2e': 'End-to-end encrypted recovery',
    'fp.card.valid': 'Valid for 30 min', 'fp.card.once': 'One-time code',
    'fp.feat1': '<strong>Verification code</strong> to your email', 'fp.feat2': 'The code is valid for <strong>30 minutes</strong>', 'fp.feat3': 'Your new password is stored <strong>encrypted</strong>',
    'fp.trust': 'Trusted by <strong>120,000+</strong> patients worldwide.',
    'fp.back': 'Back to login',
    'fp.step1': 'Email', 'fp.step2': 'Verification', 'fp.step3': 'New Password',
    'fp.s1.title': 'Reset password', 'fp.s1.sub': 'Enter the email address linked to your account.', 'fp.s1.submit': 'Send Verification Code',
    'fp.s2.title': 'Check your email', 'fp.s2.subDefault': 'Enter the 6-digit code sent to your email.', 'fp.s2.sub': 'Enter the 6-digit code sent to {email}.',
    'fp.resend.q': 'Didn’t receive the code?', 'fp.resend.btn': 'Resend', 'fp.s2.submit': 'Verify Code',
    'fp.s3.title': 'Set a new password', 'fp.s3.sub': 'Choose a strong password you haven’t used before.', 'fp.s3.confirm': 'New Password (repeat)', 'fp.s3.submit': 'Update Password',
    'fp.ph.pwNew': 'At least 6 characters', 'fp.ph.pwConfirm': 'Re-enter your password', 'fp.eye.show': 'Show password',
    'fp.done.title': 'Your password has been updated', 'fp.done.sub': 'You can now log in with your new password.', 'fp.done.login': 'Log In',
    'fp.remember.q': 'Remembered your account?', 'fp.remember.btn': 'Back to login',
    'fp.alert.email': 'Please enter a valid email.', 'fp.alert.code6': 'Please enter the full 6-digit code.',
    'fp.demoCode': 'Demo mode: your verification code is {code} (sent by email in the real version).'
  });

  add('de', {
    'fp.badge': 'Sichere Wiederherstellung',
    'fp.asideTitle': 'Passwort<br><span>vergessen?</span>',
    'fp.asideLead': 'Keine Sorge — erhalten Sie in wenigen Schritten sicheren Zugriff auf Ihr Konto. Wir senden einen Bestätigungscode an Ihre E-Mail.',
    'fp.card.protected': 'Ihr Passwort ist geschützt', 'fp.card.e2e': 'Durchgängig verschlüsselte Wiederherstellung',
    'fp.card.valid': '30 Min. gültig', 'fp.card.once': 'Einmalcode',
    'fp.feat1': '<strong>Bestätigungscode</strong> an Ihre E-Mail', 'fp.feat2': 'Der Code ist <strong>30 Minuten</strong> gültig', 'fp.feat3': 'Ihr neues Passwort wird <strong>verschlüsselt</strong> gespeichert',
    'fp.trust': 'Von über <strong>120.000</strong> Patienten weltweit vertraut.',
    'fp.back': 'Zurück zur Anmeldung',
    'fp.step1': 'E-Mail', 'fp.step2': 'Bestätigung', 'fp.step3': 'Neues Passwort',
    'fp.s1.title': 'Passwort zurücksetzen', 'fp.s1.sub': 'Geben Sie die mit Ihrem Konto verknüpfte E-Mail-Adresse ein.', 'fp.s1.submit': 'Bestätigungscode senden',
    'fp.s2.title': 'Prüfen Sie Ihre E-Mails', 'fp.s2.subDefault': 'Geben Sie den 6-stelligen Code ein, der an Ihre E-Mail gesendet wurde.', 'fp.s2.sub': 'Geben Sie den 6-stelligen Code ein, der an {email} gesendet wurde.',
    'fp.resend.q': 'Code nicht erhalten?', 'fp.resend.btn': 'Erneut senden', 'fp.s2.submit': 'Code bestätigen',
    'fp.s3.title': 'Neues Passwort festlegen', 'fp.s3.sub': 'Wählen Sie ein starkes Passwort, das Sie noch nicht verwendet haben.', 'fp.s3.confirm': 'Neues Passwort (wiederholen)', 'fp.s3.submit': 'Passwort aktualisieren',
    'fp.ph.pwNew': 'Mindestens 6 Zeichen', 'fp.ph.pwConfirm': 'Passwort erneut eingeben', 'fp.eye.show': 'Passwort anzeigen',
    'fp.done.title': 'Ihr Passwort wurde aktualisiert', 'fp.done.sub': 'Sie können sich jetzt mit Ihrem neuen Passwort anmelden.', 'fp.done.login': 'Anmelden',
    'fp.remember.q': 'Konto wieder eingefallen?', 'fp.remember.btn': 'Zurück zur Anmeldung',
    'fp.alert.email': 'Bitte geben Sie eine gültige E-Mail ein.', 'fp.alert.code6': 'Bitte geben Sie den vollständigen 6-stelligen Code ein.',
    'fp.demoCode': 'Demo-Modus: Ihr Bestätigungscode ist {code} (in der echten Version per E-Mail gesendet).'
  });

  add('ru', {
    'fp.badge': 'Безопасное восстановление',
    'fp.asideTitle': 'Забыли<br><span>пароль?</span>',
    'fp.asideLead': 'Не волнуйтесь — восстановите безопасный доступ к аккаунту за несколько шагов. Мы отправим код подтверждения на вашу почту.',
    'fp.card.protected': 'Ваш пароль защищён', 'fp.card.e2e': 'Сквозное шифрованное восстановление',
    'fp.card.valid': 'Действует 30 мин', 'fp.card.once': 'Одноразовый код',
    'fp.feat1': '<strong>Код подтверждения</strong> на вашу почту', 'fp.feat2': 'Код действует <strong>30 минут</strong>', 'fp.feat3': 'Ваш новый пароль хранится <strong>зашифрованным</strong>',
    'fp.trust': 'Нам доверяют более <strong>120 000</strong> пациентов по всему миру.',
    'fp.back': 'Назад ко входу',
    'fp.step1': 'Почта', 'fp.step2': 'Подтверждение', 'fp.step3': 'Новый пароль',
    'fp.s1.title': 'Сброс пароля', 'fp.s1.sub': 'Введите адрес эл. почты, привязанный к вашему аккаунту.', 'fp.s1.submit': 'Отправить код подтверждения',
    'fp.s2.title': 'Проверьте почту', 'fp.s2.subDefault': 'Введите 6-значный код, отправленный на вашу почту.', 'fp.s2.sub': 'Введите 6-значный код, отправленный на {email}.',
    'fp.resend.q': 'Не получили код?', 'fp.resend.btn': 'Отправить снова', 'fp.s2.submit': 'Подтвердить код',
    'fp.s3.title': 'Задайте новый пароль', 'fp.s3.sub': 'Выберите надёжный пароль, который вы ещё не использовали.', 'fp.s3.confirm': 'Новый пароль (повтор)', 'fp.s3.submit': 'Обновить пароль',
    'fp.ph.pwNew': 'Не менее 6 символов', 'fp.ph.pwConfirm': 'Повторите пароль', 'fp.eye.show': 'Показать пароль',
    'fp.done.title': 'Ваш пароль обновлён', 'fp.done.sub': 'Теперь вы можете войти с новым паролем.', 'fp.done.login': 'Войти',
    'fp.remember.q': 'Вспомнили аккаунт?', 'fp.remember.btn': 'Назад ко входу',
    'fp.alert.email': 'Пожалуйста, введите корректную почту.', 'fp.alert.code6': 'Пожалуйста, введите полный 6-значный код.',
    'fp.demoCode': 'Демо-режим: ваш код подтверждения {code} (в реальной версии отправляется по почте).'
  });

  add('fr', {
    'fp.badge': 'Récupération sécurisée',
    'fp.asideTitle': 'Mot de passe<br><span>oublié ?</span>',
    'fp.asideLead': 'Pas d’inquiétude — récupérez un accès sécurisé à votre compte en quelques étapes. Nous enverrons un code de vérification à votre e-mail.',
    'fp.card.protected': 'Votre mot de passe est protégé', 'fp.card.e2e': 'Récupération chiffrée de bout en bout',
    'fp.card.valid': 'Valable 30 min', 'fp.card.once': 'Code à usage unique',
    'fp.feat1': '<strong>Code de vérification</strong> par e-mail', 'fp.feat2': 'Le code est valable <strong>30 minutes</strong>', 'fp.feat3': 'Votre nouveau mot de passe est stocké <strong>chiffré</strong>',
    'fp.trust': 'Approuvé par plus de <strong>120 000</strong> patients dans le monde.',
    'fp.back': 'Retour à la connexion',
    'fp.step1': 'E-mail', 'fp.step2': 'Vérification', 'fp.step3': 'Nouveau mot de passe',
    'fp.s1.title': 'Réinitialiser le mot de passe', 'fp.s1.sub': 'Saisissez l’adresse e-mail liée à votre compte.', 'fp.s1.submit': 'Envoyer le code de vérification',
    'fp.s2.title': 'Vérifiez votre e-mail', 'fp.s2.subDefault': 'Saisissez le code à 6 chiffres envoyé à votre e-mail.', 'fp.s2.sub': 'Saisissez le code à 6 chiffres envoyé à {email}.',
    'fp.resend.q': 'Vous n’avez pas reçu le code ?', 'fp.resend.btn': 'Renvoyer', 'fp.s2.submit': 'Vérifier le code',
    'fp.s3.title': 'Définir un nouveau mot de passe', 'fp.s3.sub': 'Choisissez un mot de passe fort que vous n’avez pas déjà utilisé.', 'fp.s3.confirm': 'Nouveau mot de passe (répéter)', 'fp.s3.submit': 'Mettre à jour le mot de passe',
    'fp.ph.pwNew': 'Au moins 6 caractères', 'fp.ph.pwConfirm': 'Ressaisissez votre mot de passe', 'fp.eye.show': 'Afficher le mot de passe',
    'fp.done.title': 'Votre mot de passe a été mis à jour', 'fp.done.sub': 'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.', 'fp.done.login': 'Se connecter',
    'fp.remember.q': 'Vous vous souvenez de votre compte ?', 'fp.remember.btn': 'Retour à la connexion',
    'fp.alert.email': 'Veuillez saisir un e-mail valide.', 'fp.alert.code6': 'Veuillez saisir le code complet à 6 chiffres.',
    'fp.demoCode': 'Mode démo : votre code de vérification est {code} (envoyé par e-mail dans la version réelle).'
  });

  add('es', {
    'fp.badge': 'Recuperación segura',
    'fp.asideTitle': '¿Olvidó su<br><span>contraseña?</span>',
    'fp.asideLead': 'No se preocupe: recupere el acceso seguro a su cuenta en unos pasos. Enviaremos un código de verificación a su correo.',
    'fp.card.protected': 'Su contraseña está protegida', 'fp.card.e2e': 'Recuperación cifrada de extremo a extremo',
    'fp.card.valid': 'Válido 30 min', 'fp.card.once': 'Código de un solo uso',
    'fp.feat1': '<strong>Código de verificación</strong> a su correo', 'fp.feat2': 'El código es válido durante <strong>30 minutos</strong>', 'fp.feat3': 'Su nueva contraseña se almacena <strong>cifrada</strong>',
    'fp.trust': 'Con la confianza de más de <strong>120.000</strong> pacientes en todo el mundo.',
    'fp.back': 'Volver al inicio de sesión',
    'fp.step1': 'Correo', 'fp.step2': 'Verificación', 'fp.step3': 'Nueva contraseña',
    'fp.s1.title': 'Restablecer contraseña', 'fp.s1.sub': 'Introduzca el correo vinculado a su cuenta.', 'fp.s1.submit': 'Enviar código de verificación',
    'fp.s2.title': 'Revise su correo', 'fp.s2.subDefault': 'Introduzca el código de 6 dígitos enviado a su correo.', 'fp.s2.sub': 'Introduzca el código de 6 dígitos enviado a {email}.',
    'fp.resend.q': '¿No recibió el código?', 'fp.resend.btn': 'Reenviar', 'fp.s2.submit': 'Verificar código',
    'fp.s3.title': 'Establecer una nueva contraseña', 'fp.s3.sub': 'Elija una contraseña segura que no haya usado antes.', 'fp.s3.confirm': 'Nueva contraseña (repetir)', 'fp.s3.submit': 'Actualizar contraseña',
    'fp.ph.pwNew': 'Al menos 6 caracteres', 'fp.ph.pwConfirm': 'Vuelva a introducir su contraseña', 'fp.eye.show': 'Mostrar contraseña',
    'fp.done.title': 'Su contraseña ha sido actualizada', 'fp.done.sub': 'Ya puede iniciar sesión con su nueva contraseña.', 'fp.done.login': 'Iniciar sesión',
    'fp.remember.q': '¿Recordó su cuenta?', 'fp.remember.btn': 'Volver al inicio de sesión',
    'fp.alert.email': 'Por favor, introduzca un correo válido.', 'fp.alert.code6': 'Por favor, introduzca el código completo de 6 dígitos.',
    'fp.demoCode': 'Modo demo: su código de verificación es {code} (se envía por correo en la versión real).'
  });

  add('pt', {
    'fp.badge': 'Recuperação segura',
    'fp.asideTitle': 'Esqueceu sua<br><span>senha?</span>',
    'fp.asideLead': 'Não se preocupe — recupere o acesso seguro à sua conta em poucos passos. Enviaremos um código de verificação para o seu e-mail.',
    'fp.card.protected': 'Sua senha está protegida', 'fp.card.e2e': 'Recuperação criptografada de ponta a ponta',
    'fp.card.valid': 'Válido por 30 min', 'fp.card.once': 'Código de uso único',
    'fp.feat1': '<strong>Código de verificação</strong> para o seu e-mail', 'fp.feat2': 'O código é válido por <strong>30 minutos</strong>', 'fp.feat3': 'Sua nova senha é armazenada <strong>criptografada</strong>',
    'fp.trust': 'Com a confiança de mais de <strong>120.000</strong> pacientes em todo o mundo.',
    'fp.back': 'Voltar ao login',
    'fp.step1': 'E-mail', 'fp.step2': 'Verificação', 'fp.step3': 'Nova senha',
    'fp.s1.title': 'Redefinir senha', 'fp.s1.sub': 'Insira o e-mail vinculado à sua conta.', 'fp.s1.submit': 'Enviar código de verificação',
    'fp.s2.title': 'Verifique seu e-mail', 'fp.s2.subDefault': 'Insira o código de 6 dígitos enviado ao seu e-mail.', 'fp.s2.sub': 'Insira o código de 6 dígitos enviado para {email}.',
    'fp.resend.q': 'Não recebeu o código?', 'fp.resend.btn': 'Reenviar', 'fp.s2.submit': 'Verificar código',
    'fp.s3.title': 'Defina uma nova senha', 'fp.s3.sub': 'Escolha uma senha forte que você não tenha usado antes.', 'fp.s3.confirm': 'Nova senha (repetir)', 'fp.s3.submit': 'Atualizar senha',
    'fp.ph.pwNew': 'Pelo menos 6 caracteres', 'fp.ph.pwConfirm': 'Digite sua senha novamente', 'fp.eye.show': 'Mostrar senha',
    'fp.done.title': 'Sua senha foi atualizada', 'fp.done.sub': 'Agora você pode entrar com sua nova senha.', 'fp.done.login': 'Entrar',
    'fp.remember.q': 'Lembrou da sua conta?', 'fp.remember.btn': 'Voltar ao login',
    'fp.alert.email': 'Por favor, insira um e-mail válido.', 'fp.alert.code6': 'Por favor, insira o código completo de 6 dígitos.',
    'fp.demoCode': 'Modo demo: seu código de verificação é {code} (enviado por e-mail na versão real).'
  });

  add('ar', {
    'fp.badge': 'استعادة آمنة',
    'fp.asideTitle': 'هل نسيت<br><span>كلمة المرور؟</span>',
    'fp.asideLead': 'لا تقلق — استعد الوصول الآمن إلى حسابك في خطوات قليلة. سنرسل رمز تحقق إلى بريدك الإلكتروني.',
    'fp.card.protected': 'كلمة مرورك محمية', 'fp.card.e2e': 'استعادة مشفّرة من طرف إلى طرف',
    'fp.card.valid': 'صالح لمدة 30 دقيقة', 'fp.card.once': 'رمز لمرة واحدة',
    'fp.feat1': '<strong>رمز تحقق</strong> إلى بريدك الإلكتروني', 'fp.feat2': 'الرمز صالح لمدة <strong>30 دقيقة</strong>', 'fp.feat3': 'تُخزَّن كلمة مرورك الجديدة <strong>مشفّرة</strong>',
    'fp.trust': 'موثوق به من قبل أكثر من <strong>120,000</strong> مريض حول العالم.',
    'fp.back': 'العودة إلى تسجيل الدخول',
    'fp.step1': 'البريد الإلكتروني', 'fp.step2': 'التحقق', 'fp.step3': 'كلمة مرور جديدة',
    'fp.s1.title': 'إعادة تعيين كلمة المرور', 'fp.s1.sub': 'أدخل البريد الإلكتروني المرتبط بحسابك.', 'fp.s1.submit': 'إرسال رمز التحقق',
    'fp.s2.title': 'تحقق من بريدك الإلكتروني', 'fp.s2.subDefault': 'أدخل الرمز المكوّن من 6 أرقام المرسل إلى بريدك الإلكتروني.', 'fp.s2.sub': 'أدخل الرمز المكوّن من 6 أرقام المرسل إلى {email}.',
    'fp.resend.q': 'لم تستلم الرمز؟', 'fp.resend.btn': 'إعادة الإرسال', 'fp.s2.submit': 'تحقق من الرمز',
    'fp.s3.title': 'تعيين كلمة مرور جديدة', 'fp.s3.sub': 'اختر كلمة مرور قوية لم تستخدمها من قبل.', 'fp.s3.confirm': 'كلمة المرور الجديدة (تكرار)', 'fp.s3.submit': 'تحديث كلمة المرور',
    'fp.ph.pwNew': '6 أحرف على الأقل', 'fp.ph.pwConfirm': 'أعد إدخال كلمة المرور', 'fp.eye.show': 'إظهار كلمة المرور',
    'fp.done.title': 'تم تحديث كلمة المرور', 'fp.done.sub': 'يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.', 'fp.done.login': 'تسجيل الدخول',
    'fp.remember.q': 'تذكرت حسابك؟', 'fp.remember.btn': 'العودة إلى تسجيل الدخول',
    'fp.alert.email': 'يرجى إدخال بريد إلكتروني صحيح.', 'fp.alert.code6': 'يرجى إدخال الرمز كاملاً المكوّن من 6 أرقام.',
    'fp.demoCode': 'الوضع التجريبي: رمز التحقق الخاص بك هو {code} (يُرسل عبر البريد الإلكتروني في النسخة الحقيقية).'
  });

  add('nl', {
    'fp.badge': 'Veilig herstel',
    'fp.asideTitle': 'Wachtwoord<br><span>vergeten?</span>',
    'fp.asideLead': 'Geen zorgen — krijg in enkele stappen weer veilig toegang tot uw account. We sturen een verificatiecode naar uw e-mail.',
    'fp.card.protected': 'Uw wachtwoord is beschermd', 'fp.card.e2e': 'End-to-end versleuteld herstel',
    'fp.card.valid': '30 min geldig', 'fp.card.once': 'Eenmalige code',
    'fp.feat1': '<strong>Verificatiecode</strong> naar uw e-mail', 'fp.feat2': 'De code is <strong>30 minuten</strong> geldig', 'fp.feat3': 'Uw nieuwe wachtwoord wordt <strong>versleuteld</strong> opgeslagen',
    'fp.trust': 'Vertrouwd door meer dan <strong>120.000</strong> patiënten wereldwijd.',
    'fp.back': 'Terug naar inloggen',
    'fp.step1': 'E-mail', 'fp.step2': 'Verificatie', 'fp.step3': 'Nieuw wachtwoord',
    'fp.s1.title': 'Wachtwoord opnieuw instellen', 'fp.s1.sub': 'Voer het e-mailadres in dat aan uw account is gekoppeld.', 'fp.s1.submit': 'Verificatiecode verzenden',
    'fp.s2.title': 'Controleer uw e-mail', 'fp.s2.subDefault': 'Voer de 6-cijferige code in die naar uw e-mail is verzonden.', 'fp.s2.sub': 'Voer de 6-cijferige code in die naar {email} is verzonden.',
    'fp.resend.q': 'Geen code ontvangen?', 'fp.resend.btn': 'Opnieuw verzenden', 'fp.s2.submit': 'Code verifiëren',
    'fp.s3.title': 'Stel een nieuw wachtwoord in', 'fp.s3.sub': 'Kies een sterk wachtwoord dat u nog niet eerder hebt gebruikt.', 'fp.s3.confirm': 'Nieuw wachtwoord (herhalen)', 'fp.s3.submit': 'Wachtwoord bijwerken',
    'fp.ph.pwNew': 'Minstens 6 tekens', 'fp.ph.pwConfirm': 'Voer uw wachtwoord opnieuw in', 'fp.eye.show': 'Wachtwoord tonen',
    'fp.done.title': 'Uw wachtwoord is bijgewerkt', 'fp.done.sub': 'U kunt nu inloggen met uw nieuwe wachtwoord.', 'fp.done.login': 'Inloggen',
    'fp.remember.q': 'Uw account weer te binnen geschoten?', 'fp.remember.btn': 'Terug naar inloggen',
    'fp.alert.email': 'Voer een geldig e-mailadres in.', 'fp.alert.code6': 'Voer de volledige 6-cijferige code in.',
    'fp.demoCode': 'Demomodus: uw verificatiecode is {code} (in de echte versie per e-mail verzonden).'
  });
})(window.HP_I18N);
