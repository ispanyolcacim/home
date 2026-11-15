# İspanyolcacım web sitesi

## Öğrenci portalı

- `ogrenci-portali.html`: seviye seçimi, mevcut Araç Kutusu ve Ödev Takip Merkezi.
- `a11.html`, `a12.html`, `a21.html`, `a22.html`: her biri kendi seviye şifresiyle StatiCrypt 3.5.4 kullanılarak şifrelenmiştir.
- Ödev Takip Merkezi ve 4 haneli öğrenci kodlarının doğrulanması mevcut Apps Script üzerinden çalışır.
- `ogretmen-paneli.html`: öğretmen şifresiyle açılan ders içi etkinlik indeksi; ana portaldaki Öğretmen Paneli kartından erişilir.

### Öğretmen panelini güncelleme

Öğretmen panelinin tamamı AES-256-GCM ile şifrelenmiştir. Anahtar, kullanıcı tarafından girilen şifreden PBKDF2-HMAC-SHA-256 ile 600.000 yinelemede türetilir. Dosyadaki salt (32 bayt), IV (12 bayt), AAD, yineleme sayısı ve ciphertext gizli değildir. GCM doğrulama etiketi ciphertext'in son 16 baytıdır. Şifre, türetilmiş anahtar ve açık panel içeriği repoda bulunmaz. Şifre tarayıcı depolamasına, URL'ye veya ağ isteğine yazılmaz; yeniden yükleme ve Kilitle işlemi giriş ekranını açar.

İçeriği güncellemek için mevcut dosyayı öğretmen şifresiyle repo dışındaki özel bir çalışma klasöründe çözün. Mevcut ders eşlemesini ve seviyelerin renklerini koruyarak düzenleyin; bağlantıları gerçek etkinliklerden doğrulayın ve URL'lere bölüm fragmenti eklemeyin. Aynı şifreyle, kriptografik olarak rastgele üretilmiş yeni salt ve IV kullanarak yeniden şifreleyin. AAD değeri `ispanyolcacim-teacher-panel-v1` olarak korunur. Yalnız şifreli `ogretmen-paneli.html` çıktısını yayınlayın. Mevcut şifre olmadan paneli sessizce sıfırlamayın veya başka bir şifreye geçirmeyin.

Bu koruma panel içeriğine aittir; bağlantı verilen mevcut GitHub Pages etkinliklerinin erişim izinlerini değiştirmez.

### Seviye içeriğini güncelleme

Şifrelenmemiş dosyaları ve şifreleri bu herkese açık repoya eklemeyin. İlgili HTML dosyasını ve ona ait `staticrypt-a11.json` yapılandırmasını repo dışında özel bir çalışma klasörüne kopyalayın. Bu yapılandırma yalnızca gizli olmayan salt değerini içerir. StatiCrypt 3.5.4 ile `npx staticrypt a11.html --decrypt --config staticrypt-a11.json` komutunu çalıştırın; sorulduğunda seviye şifresini girin. Oluşan `decrypted/a11.html` dosyasını düzenleyin. `npx staticrypt decrypted/a11.html -d encrypted --config staticrypt-a11.json --remember false` ile yeniden şifreleyin. Şifre giriş ekranının Türkçe metinlerini StatiCrypt `--template-*` seçenekleriyle ayarlayabilirsiniz. Yalnızca `encrypted/a11.html` çıktısını repodaki aynı dosyanın yerine koyun. Diğer seviyelerde aynı işlemi ilgili dosya adıyla uygulayın.

Şifre değişikliği için mevcut dosyayı eski şifreyle çözün ve yeni şifreyle tekrar şifreleyin. Ana portal dosyasına ders içeriklerini geri eklemeyin.

