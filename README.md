# İspanyolcacım web sitesi

## Öğrenci portalı

- `ogrenci-portali.html`: seviye seçimi, mevcut Araç Kutusu ve Ödev Takip Merkezi.
- `a11.html`, `a12.html`, `a21.html`, `a22.html`: her biri kendi seviye şifresiyle StatiCrypt 3.5.4 kullanılarak şifrelenmiştir.
- Ödev Takip Merkezi ve 4 haneli öğrenci kodlarının doğrulanması mevcut Apps Script üzerinden çalışır.

### Seviye içeriğini güncelleme

Şifrelenmemiş dosyaları ve şifreleri bu herkese açık repoya eklemeyin. İlgili HTML dosyasını ve ona ait `staticrypt-a11.json` yapılandırmasını repo dışında özel bir çalışma klasörüne kopyalayın. Bu yapılandırma yalnızca gizli olmayan salt değerini içerir. StatiCrypt 3.5.4 ile `npx staticrypt a11.html --decrypt --config staticrypt-a11.json` komutunu çalıştırın; sorulduğunda seviye şifresini girin. Oluşan `decrypted/a11.html` dosyasını düzenleyin. `npx staticrypt decrypted/a11.html -d encrypted --config staticrypt-a11.json --remember false` ile yeniden şifreleyin. Şifre giriş ekranının Türkçe metinlerini StatiCrypt `--template-*` seçenekleriyle ayarlayabilirsiniz. Yalnızca `encrypted/a11.html` çıktısını repodaki aynı dosyanın yerine koyun. Diğer seviyelerde aynı işlemi ilgili dosya adıyla uygulayın.

Şifre değişikliği için mevcut dosyayı eski şifreyle çözün ve yeni şifreyle tekrar şifreleyin. Ana portal dosyasına ders içeriklerini geri eklemeyin.
