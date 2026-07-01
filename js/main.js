/* ============================================================
   Healthperia — main.js
   Header state · mobile nav · i18n (20 languages)
   language switcher · premium smooth scrolling
   ============================================================ */

(function () {
  'use strict';

  const header   = document.getElementById('siteHeader');
  const toggle   = document.getElementById('navToggle');
  const nav      = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const yearEl   = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Header is non-sticky now — it lives inside the hero and scrolls away naturally */

  /* ---------- Mobile nav toggle ---------- */
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ============================================================
     Translations (professional / placeholder)
     ============================================================ */
  const t = {
    en: {
      'nav.home':'Home','nav.about':'About Us','nav.blog':'Blog','nav.help':'Help Center','nav.account':'My Account',
      'hero.title':'Worldwide Health',
      'hero.subtitle':'Discover trusted treatments, clinics, doctors, agencies and hospitals worldwide!',
      'contact.name':'Your Name','contact.email':'Email','contact.message':'Your Message','contact.send':'Send Message',
      'card.clinic.title':'Clinic Index','card.clinic.desc':'Accredited clinics worldwide',
      'card.doctor.title':'Doctor Index','card.doctor.desc':'Verified specialists by field',
      'card.agency.title':'Agency Index','card.agency.desc':'Trusted medical travel agencies',
      'card.hospital.title':'Hospital Index','card.hospital.desc':'Internationally recognized hospitals',
      'card.treatment.title':'Treatment Index','card.treatment.desc':'Browse treatments and procedures',
      'scroll':'Scroll',
      'trust.eyebrow':'Our Promise','trust.title':'Why Trust Us?',
      'trust.lead':'Built on transparency, verified credentials, and a commitment to global patient safety.',
      'trust.verified.title':'Verified Healthcare Providers','trust.verified.desc':'Every clinic, doctor and hospital is reviewed and credentialed before being listed.',
      'trust.support.title':'International Patient Support','trust.support.desc':'End-to-end coordination for travel, treatment, and post-care follow-up.',
      'trust.transparent.title':'Transparent Treatment Information','trust.transparent.desc':'Clear, upfront details on procedures, timelines, and costs — no hidden fees.',
      'trust.multi.title':'Multilingual Communication','trust.multi.desc':'Patient coordinators available in multiple languages, around the clock.',
      'app.eyebrow':'Healthperia Mobile','app.title':'Healthcare in your pocket',
      'app.lead':'Discover providers, manage appointments, and connect with care teams from anywhere in the world.',
      'app.download':'Download on the','app.getiton':'Get it on','app.book':'Book Appointment',
      'footer.question':'Have a question?','footer.haveQuestion':'Have a question?','footer.follow':'Follow us','footer.contactHeading':'Get in Touch With Us','footer.tagline':'International Healthcare Library — trusted access to global care.','footer.contactCol':'Contact','footer.companyCol':'Company','footer.copy':'All rights reserved.',
      'footer.terms':'Terms','footer.privacy':'Privacy','footer.compliance':'Compliance'
    },
    tr: {
      'nav.home':'Anasayfa','nav.about':'Hakkımızda','nav.blog':'Blog','nav.help':'Yardım Merkezi','nav.account':'Hesabım',
      'hero.title':'Küresel Çapta Sağlık',
      'hero.subtitle':'Küresel çapta güvenilir tedavi, klinikleri, doktorları, acenteleri ve hastaneleri keşfedin!',
      'contact.name':'Adınız','contact.email':'E-posta','contact.message':'Mesajınız','contact.send':'Mesajı Gönder',
      'card.clinic.title':'Klinik İndeksi','card.clinic.desc':'Dünya çapında akredite klinikler',
      'card.doctor.title':'Doktor İndeksi','card.doctor.desc':'Alanında doğrulanmış uzmanlar',
      'card.agency.title':'Acente İndeksi','card.agency.desc':'Güvenilir tıbbi seyahat acenteleri',
      'card.hospital.title':'Hastane İndeksi','card.hospital.desc':'Uluslararası tanınmış hastaneler',
      'card.treatment.title':'Tedavi İndeksi','card.treatment.desc':'Tedavi ve prosedürlere göz atın',
      'scroll':'Kaydır',
      'trust.eyebrow':'Sözümüz','trust.title':'Neden Bize Güvenmelisiniz?',
      'trust.lead':'Şeffaflık, doğrulanmış kimlik bilgileri ve küresel hasta güvenliği taahhüdü üzerine kuruludur.',
      'trust.verified.title':'Doğrulanmış Sağlık Sağlayıcıları','trust.verified.desc':'Her klinik, doktor ve hastane listelenmeden önce incelenir ve onaylanır.',
      'trust.support.title':'Uluslararası Hasta Desteği','trust.support.desc':'Seyahat, tedavi ve tedavi sonrası takip için uçtan uca koordinasyon.',
      'trust.transparent.title':'Şeffaf Tedavi Bilgileri','trust.transparent.desc':'İşlemler, süreler ve maliyetler hakkında net, açık bilgiler — gizli ücret yok.',
      'trust.multi.title':'Çok Dilli İletişim','trust.multi.desc':'Birden fazla dilde, 7/24 hasta koordinatörleri.',
      'app.eyebrow':'Healthperia Mobil','app.title':'Cebinizdeki sağlık',
      'app.lead':'Sağlayıcıları keşfedin, randevularınızı yönetin ve dünyanın her yerinden bakım ekipleriyle bağlantı kurun.',
      'app.download':'İndir','app.getiton':'Edinin','app.book':'Randevu Al',
      'footer.question':'Bir sorunuz mu var?','footer.haveQuestion':'Bir sorum var?','footer.follow':'Bizi takip edin','footer.contactHeading':'Bizimle İletişime Geçin','footer.tagline':'Uluslararası Sağlık Kütüphanesi — güvenilir küresel sağlık hizmetlerine erişim.','footer.contactCol':'İletişim','footer.companyCol':'Şirket','footer.copy':'Tüm Hakları Saklıdır.',
      'footer.terms':'Şartlar','footer.privacy':'Gizlilik','footer.compliance':'Uyumluluklar'
    },
    de: {
      'nav.home':'Startseite','nav.about':'Über uns','nav.blog':'Blog','nav.help':'Hilfecenter','nav.account':'Mein Konto',
      'hero.title':'Weltweite Gesundheit',
      'hero.subtitle':'Entdecken Sie weltweit vertrauenswürdige Behandlungen, Kliniken, Ärzte, Agenturen und Krankenhäuser!',
      'contact.name':'Ihr Name','contact.email':'E-Mail','contact.message':'Ihre Nachricht','contact.send':'Nachricht senden',
      'card.clinic.title':'Klinik-Index','card.clinic.desc':'Akkreditierte Kliniken weltweit',
      'card.doctor.title':'Arzt-Index','card.doctor.desc':'Geprüfte Fachärzte nach Bereich',
      'card.agency.title':'Agentur-Index','card.agency.desc':'Vertrauenswürdige Medizintourismus-Agenturen',
      'card.hospital.title':'Krankenhaus-Index','card.hospital.desc':'International anerkannte Krankenhäuser',
      'card.treatment.title':'Behandlungs-Index','card.treatment.desc':'Behandlungen und Verfahren durchsuchen',
      'scroll':'Scrollen',
      'trust.eyebrow':'Unser Versprechen','trust.title':'Warum uns vertrauen?',
      'trust.lead':'Aufgebaut auf Transparenz, geprüften Qualifikationen und einem Bekenntnis zur globalen Patientensicherheit.',
      'trust.verified.title':'Geprüfte Anbieter','trust.verified.desc':'Jede Klinik, jeder Arzt und jedes Krankenhaus wird vor der Aufnahme geprüft und zertifiziert.',
      'trust.support.title':'Internationale Patientenbetreuung','trust.support.desc':'Komplette Koordination für Reise, Behandlung und Nachsorge.',
      'trust.transparent.title':'Transparente Behandlungsinformationen','trust.transparent.desc':'Klare, offene Angaben zu Verfahren, Zeitrahmen und Kosten — keine versteckten Gebühren.',
      'trust.multi.title':'Mehrsprachige Kommunikation','trust.multi.desc':'Patientenkoordinatoren rund um die Uhr in mehreren Sprachen verfügbar.',
      'app.eyebrow':'Healthperia Mobile','app.title':'Gesundheit in Ihrer Tasche',
      'app.lead':'Anbieter entdecken, Termine verwalten und von überall mit Behandlungsteams in Kontakt treten.',
      'app.download':'Laden im','app.getiton':'Jetzt bei','app.book':'Termin buchen',
      'footer.question':'Haben Sie eine Frage?','footer.haveQuestion':'Eine Frage?','footer.follow':'Folgen Sie uns','footer.contactHeading':'Kontaktieren Sie uns','footer.tagline':'Internationale Gesundheitsbibliothek — vertrauensvoller Zugang zu globaler Versorgung.','footer.contactCol':'Kontakt','footer.companyCol':'Unternehmen','footer.copy':'Alle Rechte vorbehalten.',
      'footer.terms':'Bedingungen','footer.privacy':'Datenschutz','footer.compliance':'Compliance'
    },
    ru: {
      'nav.home':'Главная','nav.about':'О нас','nav.blog':'Блог','nav.help':'Центр помощи','nav.account':'Мой аккаунт',
      'hero.title':'Здоровье по всему миру',
      'hero.subtitle':'Откройте надёжные методы лечения, клиники, врачей, агентства и больницы по всему миру!',
      'contact.name':'Ваше имя','contact.email':'Эл. почта','contact.message':'Ваше сообщение','contact.send':'Отправить сообщение',
      'card.clinic.title':'Каталог клиник','card.clinic.desc':'Аккредитованные клиники по всему миру',
      'card.doctor.title':'Каталог врачей','card.doctor.desc':'Проверенные специалисты по направлениям',
      'card.agency.title':'Каталог агентств','card.agency.desc':'Надёжные медицинские турагентства',
      'card.hospital.title':'Каталог больниц','card.hospital.desc':'Международно признанные больницы',
      'card.treatment.title':'Каталог лечения','card.treatment.desc':'Просмотр методов лечения и процедур',
      'scroll':'Прокрутить',
      'trust.eyebrow':'Наше обещание','trust.title':'Почему нам доверять?',
      'trust.lead':'Основано на прозрачности, проверенных полномочиях и приверженности безопасности пациентов.',
      'trust.verified.title':'Проверенные поставщики','trust.verified.desc':'Каждая клиника, врач и больница проверяются и сертифицируются перед размещением.',
      'trust.support.title':'Международная поддержка пациентов','trust.support.desc':'Полная координация поездки, лечения и постлечебного ухода.',
      'trust.transparent.title':'Прозрачная информация о лечении','trust.transparent.desc':'Чёткие сведения о процедурах, сроках и стоимости — без скрытых платежей.',
      'trust.multi.title':'Многоязычная коммуникация','trust.multi.desc':'Координаторы доступны круглосуточно на нескольких языках.',
      'app.eyebrow':'Healthperia Mobile','app.title':'Здоровье в кармане',
      'app.lead':'Открывайте поставщиков, управляйте записями и связывайтесь с командой ухода из любой точки мира.',
      'app.download':'Загрузить в','app.getiton':'Доступно в','app.book':'Записаться',
      'footer.question':'Есть вопрос?','footer.haveQuestion':'Есть вопрос?','footer.follow':'Следите за нами','footer.contactHeading':'Свяжитесь с нами','footer.tagline':'Международная Библиотека Здравоохранения — надёжный доступ к глобальной помощи.','footer.contactCol':'Контакты','footer.companyCol':'Компания','footer.copy':'Все права защищены.',
      'footer.terms':'Условия','footer.privacy':'Конфиденциальность','footer.compliance':'Соответствие'
    },
    fr: {
      'nav.home':'Accueil','nav.about':'À propos','nav.blog':'Blog','nav.help':"Centre d'aide",'nav.account':'Mon compte',
      'hero.title':'Santé Mondiale',
      'hero.subtitle':'Découvrez des traitements, cliniques, médecins, agences et hôpitaux de confiance dans le monde entier !',
      'contact.name':'Votre nom','contact.email':'E-mail','contact.message':'Votre message','contact.send':'Envoyer le message',
      'card.clinic.title':'Index des Cliniques','card.clinic.desc':'Cliniques accréditées dans le monde entier',
      'card.doctor.title':'Index des Médecins','card.doctor.desc':'Spécialistes vérifiés par domaine',
      'card.agency.title':'Index des Agences','card.agency.desc':'Agences de tourisme médical de confiance',
      'card.hospital.title':'Index des Hôpitaux','card.hospital.desc':'Hôpitaux reconnus internationalement',
      'card.treatment.title':'Index des Traitements','card.treatment.desc':'Parcourir les traitements et procédures',
      'scroll':'Défiler',
      'trust.eyebrow':'Notre promesse','trust.title':'Pourquoi nous faire confiance ?',
      'trust.lead':'Construit sur la transparence, des qualifications vérifiées et un engagement pour la sécurité des patients.',
      'trust.verified.title':'Prestataires vérifiés','trust.verified.desc':'Chaque clinique, médecin et hôpital est examiné et accrédité avant d’être référencé.',
      'trust.support.title':'Soutien international aux patients','trust.support.desc':'Coordination complète pour le voyage, le traitement et le suivi.',
      'trust.transparent.title':'Informations transparentes','trust.transparent.desc':'Détails clairs et anticipés sur les procédures, délais et coûts — sans frais cachés.',
      'trust.multi.title':'Communication multilingue','trust.multi.desc':'Coordinateurs disponibles dans plusieurs langues, 24h/24.',
      'app.eyebrow':'Healthperia Mobile','app.title':'La santé dans votre poche',
      'app.lead':'Découvrez les prestataires, gérez vos rendez-vous et connectez-vous aux équipes de soins partout dans le monde.',
      'app.download':'Télécharger sur','app.getiton':'Disponible sur','app.book':'Prendre rendez-vous',
      'footer.question':'Une question ?','footer.haveQuestion':'Une question ?','footer.follow':'Suivez-nous','footer.contactHeading':'Contactez-nous','footer.tagline':'Bibliothèque Internationale de Santé — accès de confiance aux soins mondiaux.','footer.contactCol':'Contact','footer.companyCol':'Entreprise','footer.copy':'Tous droits réservés.',
      'footer.terms':'Conditions','footer.privacy':'Confidentialité','footer.compliance':'Conformité'
    },
    es: {
      'nav.home':'Inicio','nav.about':'Sobre nosotros','nav.blog':'Blog','nav.help':'Centro de ayuda','nav.account':'Mi cuenta',
      'hero.title':'Salud Mundial',
      'hero.subtitle':'¡Descubra tratamientos, clínicas, médicos, agencias y hospitales de confianza en todo el mundo!',
      'contact.name':'Su nombre','contact.email':'Correo electrónico','contact.message':'Su mensaje','contact.send':'Enviar mensaje',
      'card.clinic.title':'Índice de Clínicas','card.clinic.desc':'Clínicas acreditadas en todo el mundo',
      'card.doctor.title':'Índice de Médicos','card.doctor.desc':'Especialistas verificados por campo',
      'card.agency.title':'Índice de Agencias','card.agency.desc':'Agencias de turismo médico confiables',
      'card.hospital.title':'Índice de Hospitales','card.hospital.desc':'Hospitales reconocidos internacionalmente',
      'card.treatment.title':'Índice de Tratamientos','card.treatment.desc':'Explore tratamientos y procedimientos',
      'scroll':'Desplazar',
      'trust.eyebrow':'Nuestra promesa','trust.title':'¿Por qué confiar en nosotros?',
      'trust.lead':'Construido sobre transparencia, credenciales verificadas y un compromiso con la seguridad del paciente.',
      'trust.verified.title':'Proveedores verificados','trust.verified.desc':'Cada clínica, médico y hospital es revisado y acreditado antes de ser listado.',
      'trust.support.title':'Soporte internacional al paciente','trust.support.desc':'Coordinación integral para viaje, tratamiento y seguimiento.',
      'trust.transparent.title':'Información transparente','trust.transparent.desc':'Detalles claros y previos sobre procedimientos, plazos y costes — sin tarifas ocultas.',
      'trust.multi.title':'Comunicación multilingüe','trust.multi.desc':'Coordinadores disponibles en varios idiomas, las 24 horas.',
      'app.eyebrow':'Healthperia Móvil','app.title':'Salud en tu bolsillo',
      'app.lead':'Descubra proveedores, gestione citas y conecte con equipos de atención desde cualquier lugar.',
      'app.download':'Descargar en','app.getiton':'Disponible en','app.book':'Reservar cita',
      'footer.question':'¿Tiene una pregunta?','footer.haveQuestion':'¿Tiene una pregunta?','footer.follow':'Síguenos','footer.contactHeading':'Contáctenos','footer.tagline':'Biblioteca Internacional de Salud — acceso confiable a la atención global.','footer.contactCol':'Contacto','footer.companyCol':'Empresa','footer.copy':'Todos los derechos reservados.',
      'footer.terms':'Términos','footer.privacy':'Privacidad','footer.compliance':'Cumplimiento'
    },
    it: {
      'nav.home':'Home','nav.about':'Chi siamo','nav.blog':'Blog','nav.help':'Centro assistenza','nav.account':'Il mio account',
      'hero.title':'Salute Mondiale',
      'hero.subtitle':'Scopri trattamenti, cliniche, medici, agenzie e ospedali affidabili in tutto il mondo!',
      'contact.name':'Il tuo nome','contact.email':'Email','contact.message':'Il tuo messaggio','contact.send':'Invia messaggio',
      'card.clinic.title':'Indice Cliniche','card.clinic.desc':'Cliniche accreditate in tutto il mondo',
      'card.doctor.title':'Indice Medici','card.doctor.desc':'Specialisti verificati per settore',
      'card.agency.title':'Indice Agenzie','card.agency.desc':'Agenzie di turismo medico affidabili',
      'card.hospital.title':'Indice Ospedali','card.hospital.desc':'Ospedali riconosciuti a livello internazionale',
      'card.treatment.title':'Indice Trattamenti','card.treatment.desc':'Sfoglia trattamenti e procedure',
      'scroll':'Scorri',
      'trust.eyebrow':'La nostra promessa','trust.title':'Perché fidarsi di noi?',
      'trust.lead':'Costruito su trasparenza, credenziali verificate e impegno per la sicurezza dei pazienti.',
      'trust.verified.title':'Fornitori verificati','trust.verified.desc':'Ogni clinica, medico e ospedale viene esaminato e accreditato prima di essere elencato.',
      'trust.support.title':'Supporto internazionale ai pazienti','trust.support.desc':'Coordinamento completo per viaggio, trattamento e follow-up.',
      'trust.transparent.title':'Informazioni trasparenti','trust.transparent.desc':'Dettagli chiari e anticipati su procedure, tempi e costi — senza costi nascosti.',
      'trust.multi.title':'Comunicazione multilingue','trust.multi.desc':'Coordinatori disponibili in più lingue, 24 ore su 24.',
      'app.eyebrow':'Healthperia Mobile','app.title':'La salute in tasca',
      'app.lead':'Scopri i fornitori, gestisci gli appuntamenti e connettiti con i team di cura ovunque nel mondo.',
      'app.download':'Scarica su','app.getiton':'Disponibile su','app.book':'Prenota visita',
      'footer.question':'Hai una domanda?','footer.haveQuestion':'Hai una domanda?','footer.follow':'Seguici','footer.contactHeading':'Contattaci','footer.tagline':'Biblioteca Internazionale della Salute — accesso affidabile alle cure globali.','footer.contactCol':'Contatti','footer.companyCol':'Azienda','footer.copy':'Tutti i diritti riservati.',
      'footer.terms':'Termini','footer.privacy':'Privacy','footer.compliance':'Conformità'
    },
    ar: {
      'nav.home':'الرئيسية','nav.about':'من نحن','nav.blog':'المدونة','nav.help':'مركز المساعدة','nav.account':'حسابي',
      'hero.title':'صحة عالمية',
      'hero.subtitle':'اكتشف علاجات وعيادات وأطباء ووكالات ومستشفيات موثوقة حول العالم!',
      'contact.name':'اسمك','contact.email':'البريد الإلكتروني','contact.message':'رسالتك','contact.send':'إرسال الرسالة',
      'card.clinic.title':'فهرس العيادات','card.clinic.desc':'عيادات معتمدة حول العالم',
      'card.doctor.title':'فهرس الأطباء','card.doctor.desc':'أخصائيون موثقون حسب التخصص',
      'card.agency.title':'فهرس الوكالات','card.agency.desc':'وكالات سفر طبية موثوقة',
      'card.hospital.title':'فهرس المستشفيات','card.hospital.desc':'مستشفيات معترف بها دوليًا',
      'card.treatment.title':'فهرس العلاجات','card.treatment.desc':'تصفح العلاجات والإجراءات',
      'scroll':'تمرير',
      'trust.eyebrow':'وعدنا','trust.title':'لماذا تثق بنا؟',
      'trust.lead':'مبني على الشفافية والاعتمادات الموثقة والالتزام بسلامة المرضى عالميًا.',
      'trust.verified.title':'مزودو رعاية صحية موثقون','trust.verified.desc':'تتم مراجعة واعتماد كل عيادة وطبيب ومستشفى قبل إدراجهم.',
      'trust.support.title':'دعم دولي للمرضى','trust.support.desc':'تنسيق شامل للسفر والعلاج والمتابعة بعد الرعاية.',
      'trust.transparent.title':'معلومات علاجية شفافة','trust.transparent.desc':'تفاصيل واضحة ومسبقة عن الإجراءات والمواعيد والتكاليف — بدون رسوم خفية.',
      'trust.multi.title':'تواصل متعدد اللغات','trust.multi.desc':'منسقو المرضى متاحون بعدة لغات على مدار الساعة.',
      'app.eyebrow':'Healthperia للجوال','app.title':'الرعاية الصحية في جيبك',
      'app.lead':'اكتشف مقدمي الخدمة وأدر مواعيدك وتواصل مع فرق الرعاية من أي مكان في العالم.',
      'app.download':'حمّل من','app.getiton':'احصل عليه على','app.book':'احجز موعدًا',
      'footer.question':'هل لديك سؤال؟','footer.haveQuestion':'هل لديك سؤال؟','footer.follow':'تابعنا','footer.contactHeading':'تواصل معنا','footer.tagline':'المكتبة الدولية للرعاية الصحية — وصول موثوق إلى الرعاية العالمية.','footer.contactCol':'اتصل بنا','footer.companyCol':'الشركة','footer.copy':'جميع الحقوق محفوظة.',
      'footer.terms':'الشروط','footer.privacy':'الخصوصية','footer.compliance':'الامتثال'
    },
    zh: {
      'nav.home':'首页','nav.about':'关于我们','nav.blog':'博客','nav.help':'帮助中心','nav.account':'我的账户',
      'hero.title':'全球健康',
      'hero.subtitle':'探索全球值得信赖的治疗、诊所、医生、机构和医院！',
      'contact.name':'您的姓名','contact.email':'电子邮件','contact.message':'您的留言','contact.send':'发送留言',
      'card.clinic.title':'诊所索引','card.clinic.desc':'全球认证的诊所',
      'card.doctor.title':'医生索引','card.doctor.desc':'经认证的领域专家',
      'card.agency.title':'机构索引','card.agency.desc':'可信赖的医疗旅行机构',
      'card.hospital.title':'医院索引','card.hospital.desc':'国际认可的医院',
      'card.treatment.title':'治疗索引','card.treatment.desc':'浏览治疗和程序',
      'scroll':'滚动',
      'trust.eyebrow':'我们的承诺','trust.title':'为何信赖我们？',
      'trust.lead':'建立在透明度、经过验证的资质以及对全球患者安全的承诺之上。',
      'trust.verified.title':'已验证的医疗服务提供者','trust.verified.desc':'每家诊所、医生和医院在上线前均经过审核和资质认证。',
      'trust.support.title':'国际患者支持','trust.support.desc':'提供旅行、治疗和术后随访的全程协调服务。',
      'trust.transparent.title':'透明的治疗信息','trust.transparent.desc':'清晰、提前告知的程序、时间和费用 — 无隐藏费用。',
      'trust.multi.title':'多语言沟通','trust.multi.desc':'提供多种语言、全天候的患者协调员服务。',
      'app.eyebrow':'Healthperia 移动版','app.title':'随身健康助手',
      'app.lead':'发现服务提供者、管理预约，并随时随地与护理团队联系。',
      'app.download':'下载于','app.getiton':'获取于','app.book':'预约挂号',
      'footer.question':'有问题吗？','footer.haveQuestion':'有问题吗？','footer.follow':'关注我们','footer.contactHeading':'联系我们','footer.tagline':'国际医疗图书馆 — 可信赖的全球医疗服务。','footer.contactCol':'联系','footer.companyCol':'公司','footer.copy':'保留所有权利。',
      'footer.terms':'条款','footer.privacy':'隐私','footer.compliance':'合规'
    },
    hi: {
      'nav.home':'होम','nav.about':'हमारे बारे में','nav.blog':'ब्लॉग','nav.help':'सहायता केंद्र','nav.account':'मेरा खाता',
      'hero.title':'विश्वव्यापी स्वास्थ्य',
      'hero.subtitle':'दुनिया भर के विश्वसनीय उपचार, क्लीनिक, डॉक्टर, एजेंसियाँ और अस्पताल खोजें!',
      'contact.name':'आपका नाम','contact.email':'ईमेल','contact.message':'आपका संदेश','contact.send':'संदेश भेजें',
      'card.clinic.title':'क्लिनिक सूचकांक','card.clinic.desc':'विश्व भर के मान्यता प्राप्त क्लीनिक',
      'card.doctor.title':'डॉक्टर सूचकांक','card.doctor.desc':'क्षेत्र के अनुसार सत्यापित विशेषज्ञ',
      'card.agency.title':'एजेंसी सूचकांक','card.agency.desc':'विश्वसनीय मेडिकल ट्रैवल एजेंसियाँ',
      'card.hospital.title':'अस्पताल सूचकांक','card.hospital.desc':'अंतर्राष्ट्रीय स्तर पर मान्यता प्राप्त अस्पताल',
      'card.treatment.title':'उपचार सूचकांक','card.treatment.desc':'उपचार और प्रक्रियाएँ देखें',
      'scroll':'स्क्रॉल',
      'trust.eyebrow':'हमारा वादा','trust.title':'हम पर क्यों भरोसा करें?',
      'trust.lead':'पारदर्शिता, सत्यापित प्रमाण-पत्र और वैश्विक रोगी सुरक्षा के लिए प्रतिबद्धता पर निर्मित।',
      'trust.verified.title':'सत्यापित स्वास्थ्य सेवा प्रदाता','trust.verified.desc':'सूचीबद्ध करने से पहले हर क्लिनिक, डॉक्टर और अस्पताल की समीक्षा की जाती है।',
      'trust.support.title':'अंतर्राष्ट्रीय रोगी सहायता','trust.support.desc':'यात्रा, उपचार और देखभाल के बाद के लिए संपूर्ण समन्वय।',
      'trust.transparent.title':'पारदर्शी उपचार जानकारी','trust.transparent.desc':'प्रक्रियाओं, समय-सीमा और लागत पर स्पष्ट जानकारी — कोई छिपा शुल्क नहीं।',
      'trust.multi.title':'बहुभाषी संचार','trust.multi.desc':'कई भाषाओं में चौबीसों घंटे रोगी समन्वयक उपलब्ध।',
      'app.eyebrow':'Healthperia मोबाइल','app.title':'आपकी जेब में स्वास्थ्य',
      'app.lead':'सेवा प्रदाताओं की खोज करें, अपॉइंटमेंट प्रबंधित करें और दुनिया में कहीं से भी देखभाल टीमों से जुड़ें।',
      'app.download':'डाउनलोड करें','app.getiton':'प्राप्त करें','app.book':'अपॉइंटमेंट लें',
      'footer.question':'कोई प्रश्न है?','footer.haveQuestion':'कोई प्रश्न है?','footer.follow':'हमें फ़ॉलो करें','footer.contactHeading':'हमसे संपर्क करें','footer.tagline':'अंतर्राष्ट्रीय स्वास्थ्य पुस्तकालय — वैश्विक देखभाल तक विश्वसनीय पहुँच।','footer.contactCol':'संपर्क','footer.companyCol':'कंपनी','footer.copy':'सर्वाधिकार सुरक्षित।',
      'footer.terms':'नियम','footer.privacy':'गोपनीयता','footer.compliance':'अनुपालन'
    },
    ko: {
      'nav.home':'홈','nav.about':'회사 소개','nav.blog':'블로그','nav.help':'도움말 센터','nav.account':'내 계정',
      'hero.title':'전 세계 헬스케어',
      'hero.subtitle':'전 세계의 신뢰할 수 있는 치료, 클리닉, 의사, 에이전시, 병원을 만나보세요!',
      'contact.name':'이름','contact.email':'이메일','contact.message':'메시지','contact.send':'메시지 보내기',
      'card.clinic.title':'클리닉 인덱스','card.clinic.desc':'전 세계 인증 클리닉',
      'card.doctor.title':'의사 인덱스','card.doctor.desc':'분야별 검증된 전문의',
      'card.agency.title':'에이전시 인덱스','card.agency.desc':'신뢰할 수 있는 의료 여행 에이전시',
      'card.hospital.title':'병원 인덱스','card.hospital.desc':'국제적으로 인정된 병원',
      'card.treatment.title':'치료 인덱스','card.treatment.desc':'치료 및 시술 둘러보기',
      'scroll':'스크롤',
      'trust.eyebrow':'약속','trust.title':'왜 우리를 신뢰해야 할까요?',
      'trust.lead':'투명성, 검증된 자격, 글로벌 환자 안전에 대한 약속 위에 구축되었습니다.',
      'trust.verified.title':'검증된 의료 제공자','trust.verified.desc':'모든 클리닉, 의사, 병원은 등재 전 검토 및 인증을 거칩니다.',
      'trust.support.title':'국제 환자 지원','trust.support.desc':'여행, 치료, 사후 관리를 위한 전 과정 조정.',
      'trust.transparent.title':'투명한 치료 정보','trust.transparent.desc':'시술, 일정, 비용에 대한 명확한 사전 안내 — 숨겨진 비용 없음.',
      'trust.multi.title':'다국어 커뮤니케이션','trust.multi.desc':'여러 언어로 24시간 환자 코디네이터 이용 가능.',
      'app.eyebrow':'Healthperia 모바일','app.title':'주머니 속의 의료',
      'app.lead':'제공자를 찾고, 예약을 관리하고, 어디서나 케어 팀과 연결하세요.',
      'app.download':'다운로드','app.getiton':'다운로드','app.book':'예약하기',
      'footer.question':'질문이 있으신가요?','footer.haveQuestion':'질문이 있으신가요?','footer.follow':'팔로우','footer.contactHeading':'문의하기','footer.tagline':'국제 의료 라이브러리 — 글로벌 케어에 대한 신뢰할 수 있는 접근.','footer.contactCol':'연락처','footer.companyCol':'회사','footer.copy':'판권 소유.',
      'footer.terms':'약관','footer.privacy':'개인정보','footer.compliance':'컴플라이언스'
    },
    ja: {
      'nav.home':'ホーム','nav.about':'会社概要','nav.blog':'ブログ','nav.help':'ヘルプセンター','nav.account':'マイアカウント',
      'hero.title':'世界の医療',
      'hero.subtitle':'世界中の信頼できる治療、クリニック、医師、エージェンシー、病院を見つけよう！',
      'contact.name':'お名前','contact.email':'メール','contact.message':'メッセージ','contact.send':'メッセージを送信',
      'card.clinic.title':'クリニック索引','card.clinic.desc':'世界中の認定クリニック',
      'card.doctor.title':'医師索引','card.doctor.desc':'分野別の認証済み専門医',
      'card.agency.title':'エージェンシー索引','card.agency.desc':'信頼できる医療旅行エージェンシー',
      'card.hospital.title':'病院索引','card.hospital.desc':'国際的に認められた病院',
      'card.treatment.title':'治療索引','card.treatment.desc':'治療と処置を閲覧',
      'scroll':'スクロール',
      'trust.eyebrow':'私たちの約束','trust.title':'なぜ私たちを信頼するのか？',
      'trust.lead':'透明性、検証された資格、そして世界的な患者の安全への取り組みに基づいています。',
      'trust.verified.title':'検証済みの医療提供者','trust.verified.desc':'すべてのクリニック、医師、病院は掲載前に審査と認証を受けます。',
      'trust.support.title':'国際患者サポート','trust.support.desc':'渡航、治療、アフターケアまで一貫した調整。',
      'trust.transparent.title':'透明性のある治療情報','trust.transparent.desc':'手順、期間、費用に関する明確な事前情報 — 隠れた費用なし。',
      'trust.multi.title':'多言語コミュニケーション','trust.multi.desc':'複数の言語で24時間対応の患者コーディネーター。',
      'app.eyebrow':'Healthperia モバイル','app.title':'ポケットの中の医療',
      'app.lead':'提供者を見つけ、予約を管理し、世界中どこからでもケアチームとつながります。',
      'app.download':'ダウンロード','app.getiton':'入手する','app.book':'予約する',
      'footer.question':'ご質問がありますか？','footer.haveQuestion':'ご質問がありますか？','footer.follow':'フォローする','footer.contactHeading':'お問い合わせ','footer.tagline':'国際ヘルスケアライブラリ — 世界中のケアへの信頼できるアクセス。','footer.contactCol':'連絡先','footer.companyCol':'会社','footer.copy':'無断複写・転載を禁じます。',
      'footer.terms':'利用規約','footer.privacy':'プライバシー','footer.compliance':'コンプライアンス'
    },
    pt: {
      'nav.home':'Início','nav.about':'Sobre nós','nav.blog':'Blog','nav.help':'Central de ajuda','nav.account':'Minha conta',
      'hero.title':'Saúde Mundial',
      'hero.subtitle':'Descubra tratamentos, clínicas, médicos, agências e hospitais confiáveis em todo o mundo!',
      'contact.name':'Seu nome','contact.email':'E-mail','contact.message':'Sua mensagem','contact.send':'Enviar mensagem',
      'card.clinic.title':'Índice de Clínicas','card.clinic.desc':'Clínicas credenciadas em todo o mundo',
      'card.doctor.title':'Índice de Médicos','card.doctor.desc':'Especialistas verificados por área',
      'card.agency.title':'Índice de Agências','card.agency.desc':'Agências de turismo médico confiáveis',
      'card.hospital.title':'Índice de Hospitais','card.hospital.desc':'Hospitais reconhecidos internacionalmente',
      'card.treatment.title':'Índice de Tratamentos','card.treatment.desc':'Explore tratamentos e procedimentos',
      'scroll':'Rolar',
      'trust.eyebrow':'Nossa promessa','trust.title':'Por que confiar em nós?',
      'trust.lead':'Construído sobre transparência, credenciais verificadas e um compromisso com a segurança do paciente.',
      'trust.verified.title':'Prestadores verificados','trust.verified.desc':'Cada clínica, médico e hospital é revisado e credenciado antes de ser listado.',
      'trust.support.title':'Apoio internacional ao paciente','trust.support.desc':'Coordenação completa para viagem, tratamento e acompanhamento.',
      'trust.transparent.title':'Informações transparentes','trust.transparent.desc':'Detalhes claros e antecipados sobre procedimentos, prazos e custos — sem taxas ocultas.',
      'trust.multi.title':'Comunicação multilíngue','trust.multi.desc':'Coordenadores disponíveis em vários idiomas, 24 horas por dia.',
      'app.eyebrow':'Healthperia Mobile','app.title':'Saúde no seu bolso',
      'app.lead':'Descubra prestadores, gerencie consultas e conecte-se com equipes de cuidado de qualquer lugar.',
      'app.download':'Baixar na','app.getiton':'Disponível no','app.book':'Agendar consulta',
      'footer.question':'Tem uma pergunta?','footer.haveQuestion':'Tem uma pergunta?','footer.follow':'Siga-nos','footer.contactHeading':'Fale Conosco','footer.tagline':'Biblioteca Internacional de Saúde — acesso confiável a cuidados globais.','footer.contactCol':'Contato','footer.companyCol':'Empresa','footer.copy':'Todos os direitos reservados.',
      'footer.terms':'Termos','footer.privacy':'Privacidade','footer.compliance':'Conformidade'
    },
    nl: {
      'nav.home':'Home','nav.about':'Over ons','nav.blog':'Blog','nav.help':'Helpcentrum','nav.account':'Mijn account',
      'hero.title':'Wereldwijde Zorg',
      'hero.subtitle':'Ontdek wereldwijd betrouwbare behandelingen, klinieken, artsen, bureaus en ziekenhuizen!',
      'contact.name':'Uw naam','contact.email':'E-mail','contact.message':'Uw bericht','contact.send':'Bericht versturen',
      'card.clinic.title':'Kliniek-index','card.clinic.desc':'Geaccrediteerde klinieken wereldwijd',
      'card.doctor.title':'Artsen-index','card.doctor.desc':'Geverifieerde specialisten per vakgebied',
      'card.agency.title':'Bureau-index','card.agency.desc':'Betrouwbare medische reisbureaus',
      'card.hospital.title':'Ziekenhuis-index','card.hospital.desc':'Internationaal erkende ziekenhuizen',
      'card.treatment.title':'Behandel-index','card.treatment.desc':'Bekijk behandelingen en procedures',
      'scroll':'Scrollen',
      'trust.eyebrow':'Onze belofte','trust.title':'Waarom ons vertrouwen?',
      'trust.lead':'Gebouwd op transparantie, geverifieerde kwalificaties en toewijding aan patiëntveiligheid.',
      'trust.verified.title':'Geverifieerde aanbieders','trust.verified.desc':'Elke kliniek, arts en ziekenhuis wordt beoordeeld en geaccrediteerd voor vermelding.',
      'trust.support.title':'Internationale patiëntondersteuning','trust.support.desc':'Volledige coördinatie voor reis, behandeling en nazorg.',
      'trust.transparent.title':'Transparante behandelinformatie','trust.transparent.desc':'Duidelijke, vooraf gegeven details over procedures, tijdlijnen en kosten — geen verborgen kosten.',
      'trust.multi.title':'Meertalige communicatie','trust.multi.desc':'Patiëntcoördinatoren beschikbaar in meerdere talen, de klok rond.',
      'app.eyebrow':'Healthperia Mobiel','app.title':'Zorg in je zak',
      'app.lead':'Ontdek aanbieders, beheer afspraken en verbind met zorgteams vanaf elke locatie.',
      'app.download':'Download in de','app.getiton':'Ontdek het op','app.book':'Afspraak maken',
      'footer.question':'Heeft u een vraag?','footer.haveQuestion':'Heeft u een vraag?','footer.follow':'Volg ons','footer.contactHeading':'Neem contact op','footer.tagline':'Internationale Zorgbibliotheek — vertrouwde toegang tot wereldwijde zorg.','footer.contactCol':'Contact','footer.companyCol':'Bedrijf','footer.copy':'Alle rechten voorbehouden.',
      'footer.terms':'Voorwaarden','footer.privacy':'Privacy','footer.compliance':'Naleving'
    },
    pl: {
      'nav.home':'Strona główna','nav.about':'O nas','nav.blog':'Blog','nav.help':'Centrum pomocy','nav.account':'Moje konto',
      'hero.title':'Zdrowie na Świecie',
      'hero.subtitle':'Odkryj sprawdzone metody leczenia, kliniki, lekarzy, agencje i szpitale na całym świecie!',
      'contact.name':'Twoje imię','contact.email':'E-mail','contact.message':'Twoja wiadomość','contact.send':'Wyślij wiadomość',
      'card.clinic.title':'Indeks Klinik','card.clinic.desc':'Akredytowane kliniki na całym świecie',
      'card.doctor.title':'Indeks Lekarzy','card.doctor.desc':'Zweryfikowani specjaliści według dziedziny',
      'card.agency.title':'Indeks Agencji','card.agency.desc':'Zaufane agencje turystyki medycznej',
      'card.hospital.title':'Indeks Szpitali','card.hospital.desc':'Uznane międzynarodowo szpitale',
      'card.treatment.title':'Indeks Leczenia','card.treatment.desc':'Przeglądaj leczenie i procedury',
      'scroll':'Przewiń',
      'trust.eyebrow':'Nasza obietnica','trust.title':'Dlaczego nam zaufać?',
      'trust.lead':'Zbudowane na przejrzystości, zweryfikowanych kwalifikacjach i trosce o bezpieczeństwo pacjentów.',
      'trust.verified.title':'Zweryfikowani dostawcy','trust.verified.desc':'Każda klinika, lekarz i szpital są sprawdzane i akredytowane przed dodaniem.',
      'trust.support.title':'Międzynarodowe wsparcie pacjenta','trust.support.desc':'Kompleksowa koordynacja podróży, leczenia i opieki po zabiegu.',
      'trust.transparent.title':'Przejrzyste informacje o leczeniu','trust.transparent.desc':'Jasne, podane z góry szczegóły procedur, terminów i kosztów — bez ukrytych opłat.',
      'trust.multi.title':'Komunikacja wielojęzyczna','trust.multi.desc':'Koordynatorzy pacjentów dostępni w wielu językach, całą dobę.',
      'app.eyebrow':'Healthperia Mobile','app.title':'Zdrowie w kieszeni',
      'app.lead':'Odkrywaj dostawców, zarządzaj wizytami i łącz się z zespołami opieki z dowolnego miejsca.',
      'app.download':'Pobierz z','app.getiton':'Pobierz z','app.book':'Umów wizytę',
      'footer.question':'Masz pytanie?','footer.haveQuestion':'Masz pytanie?','footer.follow':'Obserwuj nas','footer.contactHeading':'Skontaktuj się z nami','footer.tagline':'Międzynarodowa Biblioteka Zdrowia — zaufany dostęp do globalnej opieki.','footer.contactCol':'Kontakt','footer.companyCol':'Firma','footer.copy':'Wszelkie prawa zastrzeżone.',
      'footer.terms':'Warunki','footer.privacy':'Prywatność','footer.compliance':'Zgodność'
    },
    uk: {
      'nav.home':'Головна','nav.about':'Про нас','nav.blog':'Блог','nav.help':'Центр допомоги','nav.account':'Мій кабінет',
      'hero.title':'Здоровʼя у Світі',
      'hero.subtitle':'Відкрийте надійні методи лікування, клініки, лікарів, агентства та лікарні по всьому світу!',
      'contact.name':'Ваше імʼя','contact.email':'Електронна пошта','contact.message':'Ваше повідомлення','contact.send':'Надіслати повідомлення',
      'card.clinic.title':'Каталог клінік','card.clinic.desc':'Акредитовані клініки по всьому світу',
      'card.doctor.title':'Каталог лікарів','card.doctor.desc':'Перевірені фахівці за напрямами',
      'card.agency.title':'Каталог агентств','card.agency.desc':'Надійні медичні турагентства',
      'card.hospital.title':'Каталог лікарень','card.hospital.desc':'Міжнародно визнані лікарні',
      'card.treatment.title':'Каталог лікування','card.treatment.desc':'Перегляд методів лікування та процедур',
      'scroll':'Прокрутити',
      'trust.eyebrow':'Наша обіцянка','trust.title':'Чому варто нам довіряти?',
      'trust.lead':'Побудовано на прозорості, перевірених кваліфікаціях та відданості безпеці пацієнтів.',
      'trust.verified.title':'Перевірені надавачі','trust.verified.desc':'Кожна клініка, лікар і лікарня перевіряються та акредитуються перед розміщенням.',
      'trust.support.title':'Міжнародна підтримка пацієнтів','trust.support.desc':'Повна координація подорожі, лікування та подальшого догляду.',
      'trust.transparent.title':'Прозора інформація про лікування','trust.transparent.desc':'Чіткі, заздалегідь надані деталі про процедури, терміни та вартість — без прихованих платежів.',
      'trust.multi.title':'Багатомовне спілкування','trust.multi.desc':'Координатори пацієнтів доступні багатьма мовами, цілодобово.',
      'app.eyebrow':'Healthperia Mobile','app.title':'Здоровʼя у кишені',
      'app.lead':'Відкривайте надавачів, керуйте записами та звʼязуйтеся з командами догляду звідусіль.',
      'app.download':'Завантажити в','app.getiton':'Доступно в','app.book':'Записатися',
      'footer.question':'Маєте запитання?','footer.haveQuestion':'Маєте запитання?','footer.follow':'Стежте за нами','footer.contactHeading':'Звʼяжіться з нами','footer.tagline':'Міжнародна Бібліотека Охорони Здоровʼя — надійний доступ до глобальної допомоги.','footer.contactCol':'Контакти','footer.companyCol':'Компанія','footer.copy':'Усі права захищено.',
      'footer.terms':'Умови','footer.privacy':'Конфіденційність','footer.compliance':'Відповідність'
    },
    ro: {
      'nav.home':'Acasă','nav.about':'Despre noi','nav.blog':'Blog','nav.help':'Centru de ajutor','nav.account':'Contul meu',
      'hero.title':'Sănătate Mondială',
      'hero.subtitle':'Descoperiți tratamente, clinici, medici, agenții și spitale de încredere din întreaga lume!',
      'contact.name':'Numele dvs.','contact.email':'E-mail','contact.message':'Mesajul dvs.','contact.send':'Trimiteți mesajul',
      'card.clinic.title':'Index Clinici','card.clinic.desc':'Clinici acreditate din întreaga lume',
      'card.doctor.title':'Index Medici','card.doctor.desc':'Specialiști verificați pe domenii',
      'card.agency.title':'Index Agenții','card.agency.desc':'Agenții de turism medical de încredere',
      'card.hospital.title':'Index Spitale','card.hospital.desc':'Spitale recunoscute internațional',
      'card.treatment.title':'Index Tratamente','card.treatment.desc':'Răsfoiți tratamente și proceduri',
      'scroll':'Derulați',
      'trust.eyebrow':'Promisiunea noastră','trust.title':'De ce să aveți încredere în noi?',
      'trust.lead':'Construit pe transparență, acreditări verificate și un angajament pentru siguranța pacienților.',
      'trust.verified.title':'Furnizori verificați','trust.verified.desc':'Fiecare clinică, medic și spital este revizuit și acreditat înainte de a fi listat.',
      'trust.support.title':'Sprijin internațional pentru pacienți','trust.support.desc':'Coordonare completă pentru călătorie, tratament și îngrijire ulterioară.',
      'trust.transparent.title':'Informații transparente','trust.transparent.desc':'Detalii clare și anticipate despre proceduri, termene și costuri — fără taxe ascunse.',
      'trust.multi.title':'Comunicare multilingvă','trust.multi.desc':'Coordonatori de pacienți disponibili în mai multe limbi, non-stop.',
      'app.eyebrow':'Healthperia Mobile','app.title':'Sănătatea în buzunar',
      'app.lead':'Descoperiți furnizori, gestionați programări și conectați-vă cu echipele de îngrijire de oriunde.',
      'app.download':'Descărcați din','app.getiton':'Disponibil pe','app.book':'Programare',
      'footer.question':'Aveți o întrebare?','footer.haveQuestion':'Aveți o întrebare?','footer.follow':'Urmăriți-ne','footer.contactHeading':'Contactați-ne','footer.tagline':'Biblioteca Internațională de Sănătate — acces de încredere la îngrijirea globală.','footer.contactCol':'Contact','footer.companyCol':'Companie','footer.copy':'Toate drepturile rezervate.',
      'footer.terms':'Termeni','footer.privacy':'Confidențialitate','footer.compliance':'Conformitate'
    },
    bg: {
      'nav.home':'Начало','nav.about':'За нас','nav.blog':'Блог','nav.help':'Помощен център','nav.account':'Моят профил',
      'hero.title':'Световно Здраве',
      'hero.subtitle':'Открийте надеждни лечения, клиники, лекари, агенции и болници по целия свят!',
      'contact.name':'Вашето име','contact.email':'Имейл','contact.message':'Вашето съобщение','contact.send':'Изпратете съобщението',
      'card.clinic.title':'Индекс на клиники','card.clinic.desc':'Акредитирани клиники по света',
      'card.doctor.title':'Индекс на лекари','card.doctor.desc':'Проверени специалисти по област',
      'card.agency.title':'Индекс на агенции','card.agency.desc':'Надеждни агенции за медицински туризъм',
      'card.hospital.title':'Индекс на болници','card.hospital.desc':'Международно признати болници',
      'card.treatment.title':'Индекс на лечения','card.treatment.desc':'Прегледайте лечения и процедури',
      'scroll':'Превъртете',
      'trust.eyebrow':'Нашето обещание','trust.title':'Защо да ни се доверите?',
      'trust.lead':'Изградено върху прозрачност, проверени квалификации и ангажимент към безопасността на пациентите.',
      'trust.verified.title':'Проверени доставчици','trust.verified.desc':'Всяка клиника, лекар и болница се проверяват и акредитират преди включване.',
      'trust.support.title':'Международна подкрепа за пациенти','trust.support.desc':'Пълна координация за пътуване, лечение и последващи грижи.',
      'trust.transparent.title':'Прозрачна информация за лечението','trust.transparent.desc':'Ясни, предварителни детайли за процедури, срокове и разходи — без скрити такси.',
      'trust.multi.title':'Многоезична комуникация','trust.multi.desc':'Координатори на пациенти на няколко езика, денонощно.',
      'app.eyebrow':'Healthperia Мобайл','app.title':'Здраве в джоба ви',
      'app.lead':'Открийте доставчици, управлявайте срещи и се свържете с екипи за грижа отвсякъде.',
      'app.download':'Изтеглете от','app.getiton':'Налично в','app.book':'Запазете час',
      'footer.question':'Имате въпрос?','footer.haveQuestion':'Имате въпрос?','footer.follow':'Последвайте ни','footer.contactHeading':'Свържете се с нас','footer.tagline':'Международна Здравна Библиотека — надежден достъп до глобална грижа.','footer.contactCol':'Контакт','footer.companyCol':'Компания','footer.copy':'Всички права запазени.',
      'footer.terms':'Условия','footer.privacy':'Поверителност','footer.compliance':'Съответствие'
    },
    az: {
      'nav.home':'Ana səhifə','nav.about':'Haqqımızda','nav.blog':'Bloq','nav.help':'Yardım mərkəzi','nav.account':'Hesabım',
      'hero.title':'Qlobal Səhiyyə',
      'hero.subtitle':'Dünya üzrə etibarlı müalicələri, klinikaları, həkimləri, agentlikləri və xəstəxanaları kəşf edin!',
      'contact.name':'Adınız','contact.email':'E-poçt','contact.message':'Mesajınız','contact.send':'Mesajı göndər',
      'card.clinic.title':'Klinika İndeksi','card.clinic.desc':'Dünya üzrə akkreditə olunmuş klinikalar',
      'card.doctor.title':'Həkim İndeksi','card.doctor.desc':'Sahə üzrə təsdiqlənmiş mütəxəssislər',
      'card.agency.title':'Agentlik İndeksi','card.agency.desc':'Etibarlı tibbi səyahət agentlikləri',
      'card.hospital.title':'Xəstəxana İndeksi','card.hospital.desc':'Beynəlxalq səviyyədə tanınmış xəstəxanalar',
      'card.treatment.title':'Müalicə İndeksi','card.treatment.desc':'Müalicə və prosedurları nəzərdən keçirin',
      'scroll':'Sürüşdür',
      'trust.eyebrow':'Vədimiz','trust.title':'Niyə bizə etibar etməlisiniz?',
      'trust.lead':'Şəffaflıq, təsdiqlənmiş etimadnamələr və qlobal pasiyent təhlükəsizliyinə sadiqlik üzərində qurulub.',
      'trust.verified.title':'Təsdiqlənmiş təminatçılar','trust.verified.desc':'Hər klinika, həkim və xəstəxana siyahıya alınmazdan əvvəl yoxlanılır və akkreditə edilir.',
      'trust.support.title':'Beynəlxalq pasiyent dəstəyi','trust.support.desc':'Səyahət, müalicə və müalicədən sonrakı qayğı üçün tam koordinasiya.',
      'trust.transparent.title':'Şəffaf müalicə məlumatı','trust.transparent.desc':'Prosedurlar, müddətlər və xərclər barədə aydın, əvvəlcədən məlumat — gizli ödəniş yoxdur.',
      'trust.multi.title':'Çoxdilli ünsiyyət','trust.multi.desc':'Bir neçə dildə, gecə-gündüz pasiyent koordinatorları.',
      'app.eyebrow':'Healthperia Mobil','app.title':'Cibinizdə səhiyyə',
      'app.lead':'Təminatçıları kəşf edin, görüşləri idarə edin və dünyanın istənilən yerindən qayğı komandaları ilə əlaqə saxlayın.',
      'app.download':'Yükləyin','app.getiton':'Əldə edin','app.book':'Görüş təyin et',
      'footer.question':'Sualınız var?','footer.haveQuestion':'Sualınız var?','footer.follow':'Bizi izləyin','footer.contactHeading':'Bizimlə əlaqə saxlayın','footer.tagline':'Beynəlxalq Səhiyyə Kitabxanası — qlobal qayğıya etibarlı çıxış.','footer.contactCol':'Əlaqə','footer.companyCol':'Şirkət','footer.copy':'Bütün hüquqlar qorunur.',
      'footer.terms':'Şərtlər','footer.privacy':'Məxfilik','footer.compliance':'Uyğunluq'
    },
    fa: {
      'nav.home':'خانه','nav.about':'درباره ما','nav.blog':'وبلاگ','nav.help':'مرکز پشتیبانی','nav.account':'حساب من',
      'hero.title':'سلامت جهانی',
      'hero.subtitle':'درمان‌ها، کلینیک‌ها، پزشکان، آژانس‌ها و بیمارستان‌های معتبر در سراسر جهان را کشف کنید!',
      'contact.name':'نام شما','contact.email':'ایمیل','contact.message':'پیام شما','contact.send':'ارسال پیام',
      'card.clinic.title':'فهرست کلینیک‌ها','card.clinic.desc':'کلینیک‌های معتبر در سراسر جهان',
      'card.doctor.title':'فهرست پزشکان','card.doctor.desc':'متخصصان تأییدشده بر اساس حوزه',
      'card.agency.title':'فهرست آژانس‌ها','card.agency.desc':'آژانس‌های گردشگری پزشکی معتبر',
      'card.hospital.title':'فهرست بیمارستان‌ها','card.hospital.desc':'بیمارستان‌های شناخته‌شده بین‌المللی',
      'card.treatment.title':'فهرست درمان‌ها','card.treatment.desc':'مرور درمان‌ها و روش‌ها',
      'scroll':'پیمایش',
      'trust.eyebrow':'تعهد ما','trust.title':'چرا به ما اعتماد کنید؟',
      'trust.lead':'بر پایه شفافیت، مدارک تأییدشده و تعهد به ایمنی بیماران در سطح جهانی ساخته شده است.',
      'trust.verified.title':'ارائه‌دهندگان تأییدشده','trust.verified.desc':'هر کلینیک، پزشک و بیمارستان پیش از فهرست شدن بررسی و تأیید می‌شود.',
      'trust.support.title':'پشتیبانی بین‌المللی بیماران','trust.support.desc':'هماهنگی کامل برای سفر، درمان و پیگیری پس از مراقبت.',
      'trust.transparent.title':'اطلاعات درمانی شفاف','trust.transparent.desc':'جزئیات روشن و از پیش‌اعلام‌شده درباره روش‌ها، زمان‌بندی و هزینه‌ها — بدون هزینه پنهان.',
      'trust.multi.title':'ارتباط چندزبانه','trust.multi.desc':'هماهنگ‌کنندگان بیمار به چند زبان، شبانه‌روزی در دسترس.',
      'app.eyebrow':'Healthperia موبایل','app.title':'سلامت در جیب شما',
      'app.lead':'ارائه‌دهندگان را کشف کنید، نوبت‌ها را مدیریت کنید و از هر کجای جهان با تیم‌های مراقبت ارتباط بگیرید.',
      'app.download':'دانلود از','app.getiton':'دریافت از','app.book':'رزرو نوبت',
      'footer.question':'سؤالی دارید؟','footer.haveQuestion':'سؤالی دارید؟','footer.follow':'ما را دنبال کنید','footer.contactHeading':'با ما در تماس باشید','footer.tagline':'کتابخانه بین‌المللی سلامت — دسترسی مطمئن به مراقبت‌های جهانی.','footer.contactCol':'تماس','footer.companyCol':'شرکت','footer.copy':'تمامی حقوق محفوظ است.',
      'footer.terms':'شرایط','footer.privacy':'حریم خصوصی','footer.compliance':'انطباق'
    }
  };

  const rtlLangs = ['ar', 'fa'];

  /* ================================================================
     AUTO-FIT — keep layouts identical across languages.
     When a translation needs more lines than another (e.g. 3 in
     German vs 2 in Turkish) we DON'T grow the component; we shrink
     its text just enough to fit, so the design/proportions stay put.

     Two modes:
       fixed → the box has a fixed height in CSS (e.g. .card-body);
               we only shrink the text to fit it.
       lock  → the box has no fixed height; we capture its natural
               "design" height (per width) and lock it, then shrink
               longer translations to fit that locked height.
     Add a component to FIT_GROUPS to cover it — no HTML changes.
     ================================================================ */
  const FIT_GROUPS = [
    { box: '.card-body',  texts: ['.card-desc', '.card-title'], min: 10.5, mode: 'fixed' },
    { box: '.trust-card', texts: ['p', 'h3'],                   min: 11,   mode: 'lock'  }
  ];

  const shrinkToFit = (box, texts, min) => {
    texts.forEach((sel) => { const e = box.querySelector(sel); if (e) e.style.fontSize = ''; });
    const overflowing = () => box.scrollHeight > box.clientHeight + 1;
    texts.forEach((sel) => {
      const el = box.querySelector(sel);
      if (!el) return;
      let s = parseFloat(getComputedStyle(el).fontSize);
      let guard = 0;
      while (overflowing() && s > min && guard++ < 60) { s -= 0.5; el.style.fontSize = s + 'px'; }
    });
  };

  const fitGroup = (g, force) => {
    const boxes = Array.prototype.slice.call(document.querySelectorAll(g.box));
    if (!boxes.length) return;
    if (g.mode === 'lock') {
      /* (re)capture the natural design height on width change or when forced */
      const needCapture = force || boxes.some((b) => b.dataset.fitW !== String(b.clientWidth));
      if (needCapture) {
        boxes.forEach((b) => {
          b.style.height = ''; b.style.overflow = '';
          g.texts.forEach((sel) => { const e = b.querySelector(sel); if (e) e.style.fontSize = ''; });
        });
        boxes.forEach((b) => { b.dataset.fitH = b.offsetHeight; b.dataset.fitW = String(b.clientWidth); });
      }
      boxes.forEach((b) => { b.style.height = b.dataset.fitH + 'px'; b.style.overflow = 'hidden'; });
    }
    boxes.forEach((b) => shrinkToFit(b, g.texts, g.min));
  };

  const fitAll = (force) => { FIT_GROUPS.forEach((g) => fitGroup(g, force)); };

  /* small public hook for JS-built/dynamic strings on public pages
     (mirrors i18n-core's window.HPI used by the account pages — only one of
     the two ever loads per page, so they never clash) */
  const langSubs = [];
  window.HPI = window.HPI || {
    lang: 'tr',
    _dict: {},
    t: function (key, fb) { return this._dict[key] !== undefined ? this._dict[key] : (fb !== undefined ? fb : key); },
    onChange: function (cb) { if (typeof cb === 'function') langSubs.push(cb); }
  };

  const applyTranslations = (lang) => {
    /* base (shared) strings + any page-specific dictionary a page registered
       on window.HP_I18N — so each page ships only its own content translations */
    const page = (window.HP_I18N && (window.HP_I18N[lang] || window.HP_I18N.tr)) || {};
    const dict = Object.assign({}, t[lang] || t.tr, page);
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', rtlLangs.indexOf(lang) !== -1 ? 'rtl' : 'ltr');
    /* expose current language + dict, then notify dynamic-content subscribers */
    window.HPI.lang = lang;
    window.HPI._dict = dict;
    langSubs.forEach(function (cb) { try { cb(lang); } catch (_) {} });
    /* refit after the new text lands — setTimeout (not rAF) so we never pass a
       timestamp arg (which would read as "force recapture") and so layout has
       settled before we measure */
    setTimeout(function () { fitAll(); }, 70);
  };

  /* refit on resize (debounced) and once web fonts are ready (force a fresh
     design-height capture after fonts load so the lock uses real metrics) */
  let fitTimer;
  window.addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(fitAll, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fitAll(true));
  window.addEventListener('load', () => fitAll(true));

  /* ============================================================
     Language switcher
     ============================================================ */
  const langWrap = document.querySelector('[data-lang-switch]');
  if (langWrap) {
    const trigger = langWrap.querySelector('.lang-trigger');
    const menu    = langWrap.querySelector('.lang-menu');
    const flagEl  = langWrap.querySelector('[data-lang-flag]');
    const nameEl  = langWrap.querySelector('[data-lang-name]');

    const setLanguage = (code) => {
      let opt = menu.querySelector(`li[data-lang="${code}"]`);
      if (!opt) { code = 'tr'; opt = menu.querySelector('li[data-lang="tr"]'); }   /* fall back if the saved language is no longer offered */
      if (!opt) return;
      menu.querySelectorAll('li.selected').forEach((el) => el.classList.remove('selected'));
      opt.classList.add('selected');
      if (flagEl) flagEl.className = 'flag flag-' + code;
      if (nameEl) nameEl.textContent = opt.dataset.short;
      applyTranslations(code);
      try { localStorage.setItem('treatperia.lang', code); } catch (_) {}
    };

    const closeMenu = () => { langWrap.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); };
    const toggleMenu = () => {
      const open = langWrap.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(open));
    };

    trigger.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
    menu.addEventListener('click', (e) => {
      const opt = e.target.closest('li[role="option"]');
      if (!opt) return;
      setLanguage(opt.dataset.lang);
      closeMenu();
    });
    document.addEventListener('click', (e) => { if (!langWrap.contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

    /* One-time reset: clear any previously-saved language so everyone starts
       fresh on Turkish (older builds could leave a non-TR value stuck). New
       choices made after this still persist across pages/reloads. */
    try {
      if (localStorage.getItem('treatperia.langv') !== '2') {
        localStorage.removeItem('treatperia.lang');
        localStorage.setItem('treatperia.langv', '2');
      }
    } catch (_) {}

    /* First visit (no saved language) → Turkish; otherwise keep the user's
       chosen language across page reloads. (Browser auto-translate is disabled
       via translate="no", so this never starts in a browser-influenced lang.) */
    let saved = 'tr';
    try { saved = localStorage.getItem('treatperia.lang') || 'tr'; } catch (_) {}
    if (!t[saved]) saved = 'tr';
    setLanguage(saved);
  }

  /* ============================================================
     Signed-in header state
     If a valid Supabase session exists (read lightweight from
     localStorage — no SDK needed on public pages), the "Hesabım"
     pill becomes the user's name + a person glyph, signalling the
     account is open. It keeps linking to auth.html, which already
     redirects a logged-in visitor to their dashboard. The name is
     clamped (ellipsis) so any length never collides with the lang
     switch. data-i18n is dropped so applyTranslations won't undo it.
     ============================================================ */
  (function () {
    const PROJECT_REF = 'hrnqllnrobtxcjsspasy';
    let user = null;
    try {
      const raw = localStorage.getItem('sb-' + PROJECT_REF + '-auth-token');
      if (raw) {
        const s = JSON.parse(raw);
        const notExpired = !s.expires_at || (s.expires_at * 1000 > Date.now());
        if (s && s.user && notExpired) user = s.user;
      }
    } catch (_) { user = null; }
    if (!user) return;

    const meta = user.user_metadata || {};
    const name = (meta.name && String(meta.name).trim()) || user.email || '';
    if (!name) return;

    const PERSON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c0-3.4 3.1-5.5 7-5.5s7 2.1 7 5.5"/></svg>';
    document.querySelectorAll('.nav-cta').forEach((cta) => {
      cta.removeAttribute('data-i18n');
      cta.classList.add('is-authed');
      cta.setAttribute('aria-label', name);
      cta.setAttribute('title', name);
      cta.innerHTML = '<span class="nav-cta-ic" aria-hidden="true">' + PERSON_SVG + '</span><span class="nav-cta-name"></span>';
      cta.querySelector('.nav-cta-name').textContent = name;
    });
  })();

  /* ============================================================
     Premium smooth scrolling
     ============================================================ */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer    = window.matchMedia('(pointer: fine)').matches;
  const smoothEnabled  = finePointer && !prefersReduced;

  const docEl = document.documentElement;
  let targetY  = window.scrollY || 0;
  let currentY = targetY;
  let animating = false;

  const maxScroll = () => Math.max(0, docEl.scrollHeight - window.innerHeight);
  const clampY = (v) => Math.max(0, Math.min(v, maxScroll()));

  const loop = () => {
    const diff = targetY - currentY;
    if (Math.abs(diff) < 0.4) {
      currentY = targetY;
      window.scrollTo(0, currentY);
      animating = false;
      return;
    }
    currentY += diff * 0.12;          // easing — soft, Apple-like
    window.scrollTo(0, currentY);
    requestAnimationFrame(loop);
  };
  const startLoop = () => { if (!animating) { animating = true; requestAnimationFrame(loop); } };

  const scrollToY = (y) => {
    const dest = clampY(y);
    if (!smoothEnabled) { window.scrollTo({ top: dest, behavior: 'smooth' }); return; }
    currentY = window.scrollY;
    targetY = dest;
    startLoop();
  };

  if (smoothEnabled) {
    docEl.style.scrollBehavior = 'auto';   // JS engine takes over from CSS
    window.addEventListener('wheel', (e) => {
      if (e.ctrlKey) return;                                   // pinch-zoom
      // let inner scroll areas use the wheel natively
      if (e.target.closest && e.target.closest('.lang-menu, .hc-right, .hc-left, .ti-pop-list')) return;
      e.preventDefault();
      if (!animating) { currentY = window.scrollY; targetY = currentY; }
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      else if (e.deltaMode === 2) delta *= window.innerHeight;
      targetY = clampY(targetY + delta);
      startLoop();
    }, { passive: false });

    window.addEventListener('scroll', () => {
      if (!animating) { currentY = window.scrollY; targetY = currentY; }
    }, { passive: true });
    window.addEventListener('resize', () => { targetY = clampY(targetY); });
  }

  /* ---- premium soft wheel scrolling for inner scroll panes (e.g. Help Center) ---- */
  const attachSoftScroll = (el) => {
    if (!smoothEnabled) return;                 // touch / reduced-motion → native
    let target = el.scrollTop, current = el.scrollTop, running = false;
    const maxS = () => el.scrollHeight - el.clientHeight;
    const clampS = (v) => Math.max(0, Math.min(v, maxS()));
    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.5) { current = target; el.scrollTop = current; running = false; return; }
      current += diff * 0.11;                    // easing — soft, gradual
      el.scrollTop = current;
      requestAnimationFrame(tick);
    };
    const run = () => { if (!running) { running = true; requestAnimationFrame(tick); } };
    el.addEventListener('wheel', (e) => {
      if (e.ctrlKey) return;
      if (maxS() <= 0) return;                   // nothing to scroll
      e.preventDefault();
      if (!running) { current = el.scrollTop; target = current; }
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 16;
      else if (e.deltaMode === 2) d *= el.clientHeight;
      target = clampS(target + d);
      run();
    }, { passive: false });
    el.addEventListener('scroll', () => { if (!running) { current = el.scrollTop; target = current; } }, { passive: true });
  };
  document.querySelectorAll('.hc-right').forEach(attachSoftScroll);

  /* smooth in-page anchor links */
  const anchorOffset = () => (header ? header.offsetHeight : 0) + 12;
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute('href');
    if (!id || id.length < 2) return;
    a.addEventListener('click', (e) => {
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const y = id === '#home' ? 0 : el.getBoundingClientRect().top + window.scrollY - anchorOffset();
      scrollToY(y);
    });
  });

  /* logo → smooth scroll to top when already on the homepage */
  const logo = document.getElementById('logoHome');
  if (logo && document.getElementById('home')) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToY(0);
    });
  }

  /* back-to-top button — appears after scrolling down, soft scroll to top */
  const toTop = document.getElementById('scrollTop');
  if (toTop) {
    const toggleToTop = () => {
      if (window.scrollY > window.innerHeight * 0.9) toTop.classList.add('visible');
      else toTop.classList.remove('visible');
    };
    window.addEventListener('scroll', toggleToTop, { passive: true });
    toggleToTop();
    toTop.addEventListener('click', () => scrollToY(0));
  }

  /* ---------- Video autoplay safety ---------- */
  const video = document.querySelector('.hero-video');
  if (video) {
    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    /* reveal the video only once it can actually play — before that the hero
       shows ONLY the dark navy gradient, never any image or first frame */
    const reveal = () => {
      video.classList.add('video-ready');
      tryPlay();
    };

    if (video.readyState >= 3) {
      reveal();                                  // already buffered enough
    } else {
      video.addEventListener('canplay', reveal, { once: true });
      video.addEventListener('loadeddata', reveal, { once: true });
      /* safety net: never leave the hero blank if the events don't fire */
      setTimeout(reveal, 5000);
    }

    document.addEventListener('visibilitychange', () => { if (!document.hidden) tryPlay(); });
  }

  /* ============================================================
     Scroll reveal — applied to FOREGROUND elements only so the
     section backgrounds stay perfectly static during scroll.
     ============================================================ */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealSelectors = [
    '.why-trust .section-head',
    '.why-trust .trust-card',
    '.mobile-app .app-text',
    '.mobile-app .app-visual',
    '.page-hero .page-hero-inner',
    '.results-section .results-head',
    '.results-section .result-card'
  ];
  const revealTargets = Array.prototype.slice.call(
    document.querySelectorAll(revealSelectors.join(','))
  );

  /* stagger siblings inside the same parent for a soft cascade */
  const staggerGroups = {};
  revealTargets.forEach((el) => {
    const parentKey = el.parentNode ? (el.parentNode.className || '__root') : '__root';
    const tag = el.className.split(/\s+/)[0] + '|' + parentKey;
    staggerGroups[tag] = (staggerGroups[tag] || 0);
    const idx = staggerGroups[tag];
    if (idx > 0 && idx <= 4) el.classList.add('delay-' + idx);
    staggerGroups[tag] = idx + 1;
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('reveal-item', 'is-visible'));
  } else {
    revealTargets.forEach((el) => el.classList.add('reveal-item'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealTargets.forEach((el) => io.observe(el));
  }

  /* ---------- About-page finale: hands glide in when it enters view ---------- */
  const finale = document.querySelector('[data-finale]');
  if (finale) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      finale.classList.add('in');
    } else {
      const fo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            finale.classList.add('in');
            fo.unobserve(finale);
          }
        });
      }, { threshold: 0.25 });
      fo.observe(finale);
    }
  }

})();
