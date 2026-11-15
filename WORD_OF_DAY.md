# Öğrenci portalı · Günün kelimesi

Kullanıcı talebi, 15 Kasım 2026: 365 farklı kelime / sözlük birimi; hedef aralık A2+–B1.1. Kelimeler bu hedefe göre pedagojik olarak seçilmiştir; tek tek resmî CEFR sertifikalı bir kelime listesi olarak sunulmaz.

- Kart `ogrenci-portali.html` içinde hoş geldin yazısının hemen altında, portalın giriş kartlarından önce bulunur; açılır pencere kullanılmaz.
- İspanyolca sözlük biçimi (isimlerde artikel), kelime türü, Türkçe ve İngilizce anlam; özgün İspanyolca örnek ve aynı örneğin Türkçe / İngilizce çevirisi gösterilir.
- `assets/word-of-day/words.json` 365 benzersiz kayıt içerir. Örnekler ve çeviriler bu portal için hazırlanmıştır; SpanishDict içeriği çekilmez veya kopyalanmaz.
- Konular: günlük kararlar, iş, öğrenme, ilişkiler, duygular, seyahat, şehir, ev, alışveriş, sağlık, çevre, kültür ve dijital yaşam. Yayımlanan sıra sabittir ve konular karıştırılmıştır.
- İlk döngü: 15 Kasım 2026–14 Kasım 2027. Her takvim gününde tek kayıt, tüm öğrenciler için aynı seçim; saat dilimi `Europe/Istanbul`. 365 gün sonra aynı sıra yeniden başlar. Kullanıcının konumu veya cihaz dili seçimi değiştirmez.
- Tarih, sekmeye geri dönüldüğünde ve açık sayfada dakikada bir kontrol edilir. Kayıt sırasını veya başlangıç tarihini değiştirmek takvim eşleşmesini değiştirir; rastgele yeniden sıralamayın.
- Kelime ve İspanyolca örnek cümle ayrı düğmelerle, sadece kullanıcı basınca okunur. Web Speech API ile önce `es-ES`, sonra başka bir İspanyolca ses seçilir. Seslerin varlığı cihaz / tarayıcıya bağlıdır; İngilizce sese sessizce geçilmez. Eksik ses veya hata durumunda açıklama gösterilir. Düğmeye tekrar basınca durur; sayfadan / portal ana ekranından ayrılınca durdurulur.
- Kart mevcut portal girişlerini, öğrenci kayıtlarını, teslim uçlarını ve şifreli öğretmen panelini değiştirmez. Dosyalar yalnızca genel kelime içeriği içerir.

## Bakım ve doğrulama

- Her kayıtta benzersiz `id`, `word`, `kind`, `theme`, `tr`, `en` ve `example.es/tr/en` bulunur. Adlar aynı sözlük biriminin farklı anlamlarıyla sayıyı doldurmamalıdır.
- Kelime sayısı 365 kalmalı; her örnek kendi kelimesinin doğal kullanımını göstermeli ve iki çeviri aynı anlamı vermelidir.
- Veri yüklenemezse kart portalın kalanını engellemez; yeniden yükleme düğmesi sunar.
- Takvim testleri: 365 günün tamamı, İstanbul gece yarısı sınırı, yıl sonu ve döngü tekrarı. Ses testleri: İspanyolca ses seçimi, metin, durdurma, bitiş / hata geri dönüşü. Tarayıcı kontrolü: masaüstü ve 390 px görünüm, yeniden yükleme, eski portal kontrolleri.

Başvuru çerçevesi: Instituto Cervantes Plan Curricular, iletişimsel konu alanları (A1–A2 / B1–B2). Bu çerçeve, yukarıdaki daha dar ders hedefi için editoryal seçim yaparken kullanılmıştır; örnek cümlelerin kaynağı değildir.
