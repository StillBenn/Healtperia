/* ============================================================
   Healthperia — Treatment Index translations (HP_I18N)
   Cascading finder: country → city → unit → treatment → method → price.
   UI chrome is translated here; the catalog data (country/city/unit/
   treatment/method names) comes from js/treatment-data.js in Turkish.
   (page title/breadcrumb reuse card.treatment.title; footer reuses footer.*)
   ============================================================ */
window.HP_I18N = window.HP_I18N || {};
(function (I) {
  I.tr = {
    'ti.lead':'Ülke, şehir ve uzmanlık alanına göre adım adım ilerleyin; size en uygun tedavileri ve yöntemleri keşfedin.',
    'ti.step.country':'Ülke','ti.step.city':'Şehir','ti.step.unit':'Tıbbi Birim','ti.step.treatment':'Tedavi','ti.step.method':'Yöntem',
    'ti.choose':'Seçiniz','ti.searchIn':'Ara…','ti.reset':'Sıfırla',
    'ti.resultsHead':'Tedaviler','ti.resultsWord':'sonuç','ti.cta':'Detayları İncele →','ti.noResults':'Eşleşen sonuç bulunamadı.',
    'ti.hintCountry':'Başlamak için bir ülke seçin.','ti.hintCity':'Devam etmek için bir şehir seçin.','ti.hintUnit':'Tedavileri görmek için bir tıbbi birim seçin.',
    'ti.priceLabel':'Tahmini fiyat aralığı'
  };
  I.en = {
    'ti.lead':'Proceed step by step by country, city and specialty; discover the treatments and methods that suit you best.',
    'ti.step.country':'Country','ti.step.city':'City','ti.step.unit':'Medical Unit','ti.step.treatment':'Treatment','ti.step.method':'Method',
    'ti.choose':'Select','ti.searchIn':'Search…','ti.reset':'Reset',
    'ti.resultsHead':'Treatments','ti.resultsWord':'results','ti.cta':'View details →','ti.noResults':'No matching results found.',
    'ti.hintCountry':'Select a country to begin.','ti.hintCity':'Select a city to continue.','ti.hintUnit':'Select a medical unit to see treatments.',
    'ti.priceLabel':'Estimated price range'
  };
  I.de = {
    'ti.lead':'Gehen Sie Schritt für Schritt nach Land, Stadt und Fachgebiet vor und entdecken Sie die für Sie am besten geeigneten Behandlungen und Methoden.',
    'ti.step.country':'Land','ti.step.city':'Stadt','ti.step.unit':'Fachabteilung','ti.step.treatment':'Behandlung','ti.step.method':'Methode',
    'ti.choose':'Auswählen','ti.searchIn':'Suchen…','ti.reset':'Zurücksetzen',
    'ti.resultsHead':'Behandlungen','ti.resultsWord':'Ergebnisse','ti.cta':'Details ansehen →','ti.noResults':'Keine passenden Ergebnisse gefunden.',
    'ti.hintCountry':'Wählen Sie ein Land, um zu beginnen.','ti.hintCity':'Wählen Sie eine Stadt, um fortzufahren.','ti.hintUnit':'Wählen Sie eine Fachabteilung, um Behandlungen zu sehen.',
    'ti.priceLabel':'Geschätzte Preisspanne'
  };
  I.ru = {
    'ti.lead':'Двигайтесь шаг за шагом по стране, городу и специализации; найдите наиболее подходящие вам методы лечения.',
    'ti.step.country':'Страна','ti.step.city':'Город','ti.step.unit':'Отделение','ti.step.treatment':'Лечение','ti.step.method':'Метод',
    'ti.choose':'Выберите','ti.searchIn':'Поиск…','ti.reset':'Сбросить',
    'ti.resultsHead':'Лечение','ti.resultsWord':'результатов','ti.cta':'Подробнее →','ti.noResults':'Совпадений не найдено.',
    'ti.hintCountry':'Выберите страну, чтобы начать.','ti.hintCity':'Выберите город, чтобы продолжить.','ti.hintUnit':'Выберите отделение, чтобы увидеть методы лечения.',
    'ti.priceLabel':'Ориентировочный диапазон цен'
  };
  I.fr = {
    'ti.lead':'Avancez étape par étape par pays, ville et spécialité ; découvrez les traitements et méthodes qui vous conviennent le mieux.',
    'ti.step.country':'Pays','ti.step.city':'Ville','ti.step.unit':'Service médical','ti.step.treatment':'Traitement','ti.step.method':'Méthode',
    'ti.choose':'Sélectionner','ti.searchIn':'Rechercher…','ti.reset':'Réinitialiser',
    'ti.resultsHead':'Traitements','ti.resultsWord':'résultats','ti.cta':'Voir les détails →','ti.noResults':'Aucun résultat correspondant.',
    'ti.hintCountry':'Sélectionnez un pays pour commencer.','ti.hintCity':'Sélectionnez une ville pour continuer.','ti.hintUnit':'Sélectionnez un service médical pour voir les traitements.',
    'ti.priceLabel':'Fourchette de prix estimée'
  };
  I.es = {
    'ti.lead':'Avance paso a paso por país, ciudad y especialidad; descubra los tratamientos y métodos que mejor se adaptan a usted.',
    'ti.step.country':'País','ti.step.city':'Ciudad','ti.step.unit':'Unidad médica','ti.step.treatment':'Tratamiento','ti.step.method':'Método',
    'ti.choose':'Seleccionar','ti.searchIn':'Buscar…','ti.reset':'Restablecer',
    'ti.resultsHead':'Tratamientos','ti.resultsWord':'resultados','ti.cta':'Ver detalles →','ti.noResults':'No se encontraron resultados.',
    'ti.hintCountry':'Seleccione un país para comenzar.','ti.hintCity':'Seleccione una ciudad para continuar.','ti.hintUnit':'Seleccione una unidad médica para ver los tratamientos.',
    'ti.priceLabel':'Rango de precio estimado'
  };
  I.pt = {
    'ti.lead':'Avance passo a passo por país, cidade e especialidade; descubra os tratamentos e métodos mais adequados para você.',
    'ti.step.country':'País','ti.step.city':'Cidade','ti.step.unit':'Unidade médica','ti.step.treatment':'Tratamento','ti.step.method':'Método',
    'ti.choose':'Selecionar','ti.searchIn':'Pesquisar…','ti.reset':'Redefinir',
    'ti.resultsHead':'Tratamentos','ti.resultsWord':'resultados','ti.cta':'Ver detalhes →','ti.noResults':'Nenhum resultado encontrado.',
    'ti.hintCountry':'Selecione um país para começar.','ti.hintCity':'Selecione uma cidade para continuar.','ti.hintUnit':'Selecione uma unidade médica para ver os tratamentos.',
    'ti.priceLabel':'Faixa de preço estimada'
  };
  I.ar = {
    'ti.lead':'تقدّم خطوة بخطوة حسب الدولة والمدينة والتخصص؛ واكتشف العلاجات والطرق الأنسب لك.',
    'ti.step.country':'الدولة','ti.step.city':'المدينة','ti.step.unit':'الوحدة الطبية','ti.step.treatment':'العلاج','ti.step.method':'الطريقة',
    'ti.choose':'اختر','ti.searchIn':'ابحث…','ti.reset':'إعادة تعيين',
    'ti.resultsHead':'العلاجات','ti.resultsWord':'نتيجة','ti.cta':'عرض التفاصيل →','ti.noResults':'لا توجد نتائج مطابقة.',
    'ti.hintCountry':'اختر دولة للبدء.','ti.hintCity':'اختر مدينة للمتابعة.','ti.hintUnit':'اختر وحدة طبية لعرض العلاجات.',
    'ti.priceLabel':'نطاق السعر التقديري'
  };
  I.nl = {
    'ti.lead':'Ga stap voor stap te werk op land, stad en specialisme; ontdek de behandelingen en methoden die het best bij u passen.',
    'ti.step.country':'Land','ti.step.city':'Stad','ti.step.unit':'Medische afdeling','ti.step.treatment':'Behandeling','ti.step.method':'Methode',
    'ti.choose':'Selecteren','ti.searchIn':'Zoeken…','ti.reset':'Opnieuw instellen',
    'ti.resultsHead':'Behandelingen','ti.resultsWord':'resultaten','ti.cta':'Details bekijken →','ti.noResults':'Geen overeenkomende resultaten gevonden.',
    'ti.hintCountry':'Selecteer een land om te beginnen.','ti.hintCity':'Selecteer een stad om door te gaan.','ti.hintUnit':'Selecteer een medische afdeling om behandelingen te zien.',
    'ti.priceLabel':'Geschatte prijsklasse'
  };

  /* listing card: "Send Message" CTA + listing code label */
  var TI_EXTRA = {
    tr:['Mesaj Gönder','Kod','Ara'], en:['Send Message','Code','Search'], de:['Nachricht senden','Code','Suchen'],
    ru:['Написать сообщение','Код','Поиск'], fr:['Envoyer un message','Code','Rechercher'], es:['Enviar mensaje','Código','Buscar'],
    pt:['Enviar mensagem','Código','Buscar'], ar:['إرسال رسالة','الرمز','بحث'], nl:['Bericht sturen','Code','Zoeken']
  };
  Object.keys(TI_EXTRA).forEach(function (l) {
    if (I[l]) { I[l]['ti.message'] = TI_EXTRA[l][0]; I[l]['ti.code'] = TI_EXTRA[l][1]; I[l]['ti.search'] = TI_EXTRA[l][2]; }
  });
})(window.HP_I18N);
