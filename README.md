# İspanyolcacım web sitesi

## Öğrenci portalı

- `ogrenci-portali.html`: girişte solda Öğretmen Portalı, sağda Öğrenci Ödev/Ders Takip Merkezi bulunur.
- Öğrenci adı, seviye ve 4 haneli öğrenci kodu mevcut Apps Script üzerinden doğrulanır. Kişisel ödev ve gelişim sonuçlarının altında öğrencinin kendi seviyesi ve önceki seviyelerin kaynak kartları görünür.
- `a11.html`, `a12.html`, `a21.html`, `a22.html`, `b11.html` ve `toolbox.html`: kullanıcının 15 Kasım 2026 talebiyle ayrı kaynak şifreleri kaldırılmış ortak ders içerikleri. Doğrudan bağlantıları da şifresiz açılır; kişisel ödev ve gelişim bilgileri bu dosyalara taşınmaz.
- `ogretmen-paneli.html`: öğretmen şifresiyle açılan ders içi etkinlik indeksi; ana portaldaki Öğretmen Portalı kartından erişilir. Şifreleme korunur.

| Öğrencinin seviyesi | Gelişim kartının altındaki seviye kartları | Ortak kaynak |
| --- | --- | --- |
| A1.1 | A1.1 | Araç Kutusu |
| A1.2 | A1.1, A1.2 | Araç Kutusu |
| A2.1 | A1.1, A1.2, A2.1 | Araç Kutusu |
| A2.2 | A1.1, A1.2, A2.1, A2.2 | Araç Kutusu |
| B1.1 | A1.1, A1.2, A2.1, A2.2, B1.1 | Araç Kutusu |

### Öğretmen panelini güncelleme

Öğretmen panelinin tamamı AES-256-GCM ile şifrelenmiştir. Anahtar, kullanıcı tarafından girilen şifreden PBKDF2-HMAC-SHA-256 ile 600.000 yinelemede türetilir. Dosyadaki salt (32 bayt), IV (12 bayt), AAD, yineleme sayısı ve ciphertext gizli değildir. GCM doğrulama etiketi ciphertext'in son 16 baytıdır. Şifre, türetilmiş anahtar ve açık panel içeriği repoda bulunmaz. Şifre tarayıcı depolamasına, URL'ye veya ağ isteğine yazılmaz; yeniden yükleme ve Kilitle işlemi giriş ekranını açar.

İçeriği güncellemek için mevcut dosyayı öğretmen şifresiyle repo dışındaki özel bir çalışma klasöründe çözün. Mevcut ders eşlemesini ve seviyelerin renklerini koruyarak düzenleyin; bağlantıları gerçek etkinliklerden doğrulayın ve URL'lere bölüm fragmenti eklemeyin. Aynı şifreyle, kriptografik olarak rastgele üretilmiş yeni salt ve IV kullanarak yeniden şifreleyin. AAD değeri `ispanyolcacim-teacher-panel-v1` olarak korunur. Yalnız şifreli `ogretmen-paneli.html` çıktısını yayınlayın. Mevcut şifre olmadan paneli sessizce sıfırlamayın veya başka bir şifreye geçirmeyin.

Bu koruma panel içeriğine aittir; bağlantı verilen mevcut GitHub Pages etkinliklerinin erişim izinlerini değiştirmez.

### Seviye içeriğini güncelleme

Seviye HTML dosyalarını doğrudan düzenleyin; kullanıcı yeniden istemedikçe ayrı seviye şifresi eklemeyin. Mevcut konu özetlerini, gömülü kaynakları ve depolama anahtarlarını koruyun. `seviye-menu.js`, her seviyede Konular ve Haftalık Çalışma Dosyaları seçeneklerini, 8 haftalık Google Drive PDF bağlantılarını sağlar. Araç Kutusu bütün seviyelerde görünür. Ana portala ders içeriklerini kopyalamayın; gelişim kartının altındaki bağlantıları koruyun.


