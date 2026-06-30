/* ============================================================
   Healthperia — treatment-i18n.js
   Tedavi kataloğu (treatment-data.js, TR) için çok-dilli ÖRTÜ.
   Şimdilik 11 tıbbi BİRİM 9 dile çevrilidir (demo). Tedavi/yöntem
   adları gerçek çeviri gelene dek TR kalır; altyapı hazırdır.
   Kullanım: window.HP_unitName(trName) → aktif dildeki birim adı.
   ============================================================ */
(function () {
  var U = {
    'Obezite ve Metabolik Cerrahi': { en:'Bariatric & Metabolic Surgery', de:'Bariatrische & metabolische Chirurgie', ru:'Бариатрическая и метаболическая хирургия', fr:'Chirurgie bariatrique et métabolique', es:'Cirugía bariátrica y metabólica', pt:'Cirurgia bariátrica e metabólica', ar:'جراحة السمنة والأيض', nl:'Bariatrische & metabole chirurgie' },
    'Kardiyoloji': { en:'Cardiology', de:'Kardiologie', ru:'Кардиология', fr:'Cardiologie', es:'Cardiología', pt:'Cardiologia', ar:'أمراض القلب', nl:'Cardiologie' },
    'Kozmetik Dermatoloji': { en:'Cosmetic Dermatology', de:'Kosmetische Dermatologie', ru:'Косметическая дерматология', fr:'Dermatologie esthétique', es:'Dermatología cosmética', pt:'Dermatologia cosmética', ar:'الأمراض الجلدية التجميلية', nl:'Cosmetische dermatologie' },
    'Ağız ve Diş Sağlığı': { en:'Oral & Dental Health', de:'Mund- & Zahngesundheit', ru:'Стоматология', fr:'Santé bucco-dentaire', es:'Salud bucodental', pt:'Saúde bucal e dentária', ar:'صحة الفم والأسنان', nl:'Mond- & tandgezondheid' },
    'Genital Estetik Cerrahi': { en:'Genital Aesthetic Surgery', de:'Genitale ästhetische Chirurgie', ru:'Интимная эстетическая хирургия', fr:'Chirurgie esthétique génitale', es:'Cirugía estética genital', pt:'Cirurgia estética genital', ar:'جراحة التجميل التناسلية', nl:'Genitale esthetische chirurgie' },
    'Göz Sağlığı': { en:'Eye Health', de:'Augengesundheit', ru:'Офтальмология', fr:'Santé oculaire', es:'Salud ocular', pt:'Saúde ocular', ar:'صحة العين', nl:'Ooggezondheid' },
    'Ortopedi ve Travmatoloji': { en:'Orthopedics & Traumatology', de:'Orthopädie & Traumatologie', ru:'Ортопедия и травматология', fr:'Orthopédie et traumatologie', es:'Ortopedia y traumatología', pt:'Ortopedia e traumatologia', ar:'جراحة العظام والإصابات', nl:'Orthopedie & traumatologie' },
    'Ağrı Polikliniği': { en:'Pain Clinic', de:'Schmerzklinik', ru:'Клиника боли', fr:'Clinique de la douleur', es:'Clínica del dolor', pt:'Clínica da dor', ar:'عيادة الألم', nl:'Pijnkliniek' },
    'Plastik ve Estetik Cerrahi': { en:'Plastic & Aesthetic Surgery', de:'Plastische & ästhetische Chirurgie', ru:'Пластическая и эстетическая хирургия', fr:'Chirurgie plastique et esthétique', es:'Cirugía plástica y estética', pt:'Cirurgia plástica e estética', ar:'الجراحة التجميلية والترميمية', nl:'Plastische & esthetische chirurgie' },
    'Üreme Endokrinolojisi': { en:'Reproductive Endocrinology', de:'Reproduktionsendokrinologie', ru:'Репродуктивная эндокринология', fr:'Endocrinologie de la reproduction', es:'Endocrinología reproductiva', pt:'Endocrinologia reprodutiva', ar:'الغدد الصماء التناسلية', nl:'Reproductieve endocrinologie' },
    'Üroloji': { en:'Urology', de:'Urologie', ru:'Урология', fr:'Urologie', es:'Urología', pt:'Urologia', ar:'المسالك البولية', nl:'Urologie' }
  };
  function lang(){ return (window.HPI && HPI.lang) || (window.localStorage && (localStorage.getItem('treatperia.lang') || localStorage.getItem('healthperia.lang'))) || 'tr'; }
  window.HP_unitName = function (trName) {
    var l = lang(); if (!l || l === 'tr') return trName;
    var e = U[trName]; return (e && e[l]) || trName;
  };
  window.HP_TREATMENT_I18N = { units: U };
})();
