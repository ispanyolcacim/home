(() => {
  'use strict';

  const levels = {
    'a11.html': 'A1.1',
    'a12.html': 'A1.2',
    'a21.html': 'A2.1',
    'a22.html': 'A2.2',
    'b11.html': 'B1.1'
  };
  const file = window.location.pathname.split('/').pop().toLowerCase();
  const level = levels[file];
  if (!level || document.getElementById('sw-level-menu')) return;

  const styles = document.createElement('style');
  styles.id = 'sw-menu-styles';
  styles.textContent = [
    'body.sw-menu-active{overflow:hidden}',
    '.sw-level-menu{position:fixed;inset:0;z-index:2147483000;overflow-y:auto;background:radial-gradient(circle at 0 0,#fff0f5 0,transparent 40%),radial-gradient(circle at 100% 100%,#edf8ff 0,transparent 45%),#fffaf5;color:#20304a;font-family:"Trebuchet MS","Segoe UI",Arial,sans-serif}',
    '.sw-level-menu *,.sw-topic-return *{box-sizing:border-box}',
    '.sw-inner{width:min(1050px,calc(100% - 34px));margin:0 auto;padding:36px 0 70px}',
    '.sw-top{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;margin-bottom:56px}',
    '.sw-brand{background:#fff;border-radius:999px;padding:9px 16px;font-size:13px;font-weight:900;box-shadow:0 8px 30px #20304a12}',
    '.sw-nav{display:inline-block;color:#98375d;font-weight:800;text-decoration:none;border:1px solid #f2cbdc;background:#fff;padding:11px 16px;border-radius:999px;font-size:14px}',
    '.sw-title{font-size:clamp(31px,5.5vw,52px);font-weight:900;line-height:1.15;letter-spacing:-.035em;text-align:center;margin:0 0 12px}',
    '.sw-lead{font-size:17px;font-weight:700;text-align:center;color:#65748a;margin:0 auto 35px;max-width:700px;line-height:1.55}',
    '.sw-choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:21px}',
    '.sw-choice{min-height:230px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;text-align:left;border:1px solid #e9d9df;box-shadow:0 14px 35px #20304a16;border-radius:27px;padding:29px;cursor:pointer;color:#20304a;font-family:inherit;transition:transform .18s,box-shadow .18s}',
    '.sw-choice:hover{transform:translateY(-4px);box-shadow:0 22px 44px #20304a20}',
    '.sw-choice:focus-visible,.sw-mini-back:focus-visible,.sw-topic-return:focus-visible{outline:3px solid #a93b6b;outline-offset:3px}',
    '.sw-topic-choice{background:linear-gradient(145deg,#fff1f6,#ffd9e8)}',
    '.sw-file-choice{background:linear-gradient(145deg,#eff8ff,#dbeeff)}',
    '.sw-emoji{font-size:38px;margin-bottom:15px}',
    '.sw-choice-name{font-size:clamp(20px,2.7vw,27px);font-weight:900;line-height:1.25}',
    '.sw-choice-hint{margin-top:10px;color:#536479;font-size:14px;font-weight:700;line-height:1.4}',
    '.sw-mini-back{border:0;background:#fff;padding:12px 18px;border-radius:999px;color:#8f2f58;cursor:pointer;font:800 14px "Trebuchet MS","Segoe UI",Arial,sans-serif;margin-bottom:29px;box-shadow:0 5px 18px #20304a14}',
    '.sw-weeks{display:grid;grid-template-columns:1fr;gap:11px;max-width:800px;margin:0 auto}',
    '.sw-week{background:#fff;box-shadow:0 5px 18px #20304a0d;border:1px solid #e8e8ee;border-radius:16px;padding:19px 20px;display:flex;align-items:center;gap:16px}',
    '.sw-week-link{text-decoration:none;color:#20304a;cursor:pointer;transition:transform .18s,box-shadow .18s,border-color .18s}',
    '.sw-week-link:hover{transform:translateY(-2px);box-shadow:0 10px 22px #20304a19;border-color:#78bad7}',
    '.sw-week-link:focus-visible{outline:3px solid #a93b6b;outline-offset:3px}',
    '.sw-week-ready{background:#e5f7ef!important;color:#146b3a!important}',
    '.sw-week-icon{font-size:23px;flex-shrink:0}',
    '.sw-week-main{display:flex;flex:1;min-width:0;flex-direction:column;gap:5px}',
    '.sw-week-title{font-size:16px;font-weight:900;line-height:1.4}',
    '.sw-week-dates{font-size:13px;color:#60718a;font-weight:800;line-height:1.4}',
    '.sw-week-state{border-radius:100px;background:#fff4e5;color:#905715;font-weight:800;font-size:12px;padding:7px 11px;white-space:nowrap}',
    '.sw-coming{margin:25px auto;max-width:680px;background:#fff;border:1px solid #eee3e9;border-radius:20px;padding:30px;text-align:center;color:#64748b;font-weight:700}',
    '.sw-topic-return{position:fixed;bottom:23px;right:22px;z-index:2147482999;border:0;border-radius:999px;padding:15px 20px;background:#b72f63;color:#fff;box-shadow:0 10px 30px #20304a30;font:900 14px "Trebuchet MS","Segoe UI",Arial,sans-serif;cursor:pointer}',
    '[hidden].sw-panel{display:none!important}',
    '@media(max-width:640px){.sw-inner{padding-top:23px}.sw-top{margin-bottom:38px}.sw-choices{grid-template-columns:1fr}.sw-choice{min-height:170px;padding:23px}.sw-week{padding:15px 13px;gap:10px;flex-wrap:wrap}.sw-week-title{font-size:14px}.sw-week-state{margin-left:35px}.sw-topic-return{bottom:14px;right:14px;padding:13px 16px}}'
  ].join('');
  document.head.appendChild(styles);

  const root = document.createElement('div');
  root.id = 'sw-level-menu';
  root.className = 'sw-level-menu';
  root.setAttribute('role', 'region');
  root.setAttribute('aria-label', level + ' öğrenci seçenekleri');
  // PDF'ler Drive'da kalır; GitHub'da yalnızca hafif bağlantılar saklanır.
  const pdfsByLevel = {
    'A1.1': ["https://drive.google.com/file/d/1Xdwpq0BXj4KCPs9gbXKxw1gnqkjzlA3s/view?usp=drivesdk","https://drive.google.com/file/d/1raatJysRX7_A10gbQMoTHTYFgGz95c6Z/view?usp=drivesdk","https://drive.google.com/file/d/18gURRfucsp9vi4V1swcOGwVrg_jk4ZqD/view?usp=drivesdk","https://drive.google.com/file/d/1Z43IQTFljq2ryWbmIzWCfe8jIad3mxu8/view?usp=drivesdk","https://drive.google.com/file/d/1AOcNtwIE5mauBKgRF7F8X138D4iJwh5F/view?usp=drivesdk","https://drive.google.com/file/d/1LaqtTrxaVfsgBoIx6k0vA8-8Ll5MuJiB/view?usp=drivesdk","https://drive.google.com/file/d/1mzAGaZ4DQx-UoWyjeDwqr7JrtgeZ-vO9/view?usp=drivesdk","https://drive.google.com/file/d/1u47dvAJ9Qv1ztUrQKf0tWr-njGYAlskH/view?usp=drivesdk"],
    'A1.2': ["https://drive.google.com/file/d/1uOOn4LhixYUvisZwDoegJ2itZVishuxa/view?usp=drivesdk","https://drive.google.com/file/d/1Me7V8at7SsP22AheBCNiL-p2NSCO7RQY/view?usp=drivesdk","https://drive.google.com/file/d/1NktlAaqdvGDlPN3-JFXsngEL-XB4sJaq/view?usp=drivesdk","https://drive.google.com/file/d/1TNP1NDE25vzb68n-TFjMpMLTf-68p3Dz/view?usp=drivesdk","https://drive.google.com/file/d/1fR2CyS4bp3oHsn8W9wwMVY7xiOlDZhy4/view?usp=drivesdk","https://drive.google.com/file/d/1JjYC3tF_lN6Ws4wlZ6oKVTOUiKd8fpYO/view?usp=drivesdk","https://drive.google.com/file/d/19VTUbU2PNF5aWT-5o0xt5RGGOC_bCuxu/view?usp=drivesdk","https://drive.google.com/file/d/1gUg77DkK0HwrL-dfSx0QRg55Sxhqd68C/view?usp=drivesdk"]
  };
  const files = pdfsByLevel[level] || [];
  // Takvimde haftalar pazartesi başlayıp pazar biter. Son hafta 21–27 Aralık;
  // canlı dersler 24 Aralık Perşembe günü sona erer.
  const weekDates = [
    '2–8 Kasım 2026',
    '9–15 Kasım 2026',
    '16–22 Kasım 2026',
    '23–29 Kasım 2026',
    '30 Kasım – 6 Aralık 2026',
    '7–13 Aralık 2026',
    '14–20 Aralık 2026',
    '21–27 Aralık 2026'
  ];
  const weeks = Array.from({length: 8}, (_, i) => {
    const title = (i + 1) + '. Hafta – Haftalık Çalışma Dosyası';
    const dateRange = weekDates[i];
    const content = '<span class="sw-week-icon" aria-hidden="true">📄</span>' +
      '<span class="sw-week-main"><span class="sw-week-title">' + title + '</span>' +
      '<span class="sw-week-dates">📅 ' + dateRange + '</span></span>';
    const url = files[i];
    return url
      ? '<a class="sw-week sw-week-link" href="' + url + '" target="_blank" rel="noopener noreferrer" aria-label="' + title + ', ' + dateRange + ', PDF dosyasını Google Drive üzerinden aç">' +
          content + '<span class="sw-week-state sw-week-ready">PDF\'yi Aç ↗</span></a>'
      : '<div class="sw-week">' + content + '<span class="sw-week-state">Hazırlanıyor</span></div>';
  }).join('');

  root.innerHTML =
    '<div class="sw-inner">' +
      '<div class="sw-top"><span class="sw-brand">🇪🇸 @ispanyolcacim · Profe Hazel</span>' +
        '<a class="sw-nav" href="ogrenci-portali.html">← Öğrenci Portalına Dön</a></div>' +
      '<section id="sw-choose" class="sw-panel">' +
        '<h1 class="sw-title">' + level + ' · Öğrenci Alanı</h1>' +
        '<p class="sw-lead">Devam etmek istediğin bölümü seç. 🌸</p>' +
        '<div class="sw-choices">' +
          '<button class="sw-choice sw-topic-choice" id="sw-open-topics" type="button">' +
            '<span class="sw-emoji" aria-hidden="true">📚</span>' +
            '<span class="sw-choice-name">' + level + ' Konuları</span>' +
            '<span class="sw-choice-hint">Derslerde işlediğimiz konular ve açıklamalar</span></button>' +
          '<button class="sw-choice sw-file-choice" id="sw-open-weeks" type="button">' +
            '<span class="sw-emoji" aria-hidden="true">🗓️</span>' +
            '<span class="sw-choice-name">' + level + ' Haftalık Çalışma Dosyaları</span>' +
            '<span class="sw-choice-hint">8 haftalık çalışma programı ve PDF dosyaları</span></button>' +
        '</div></section>' +
      '<section id="sw-files" class="sw-panel" hidden>' +
        '<button class="sw-mini-back" type="button" data-sw-back>← Seçeneklere Dön</button>' +
        '<h2 class="sw-title">' + level + ' · Haftalık Çalışma Dosyaları</h2>' +
        '<p class="sw-lead">8 haftalık çalışma programı</p>' +
        '<div class="sw-weeks">' + weeks + '</div></section>' +
      '<section id="sw-empty" class="sw-panel" hidden>' +
        '<button class="sw-mini-back" type="button" data-sw-back>← Seçeneklere Dön</button>' +
        '<h2 class="sw-title">' + level + ' Konuları</h2>' +
        '<div class="sw-coming">📚 Bu seviyenin konu içerikleri hazırlanıyor.</div></section>' +
    '</div>';
  document.body.prepend(root);

  const topicReturn = document.createElement('button');
  topicReturn.type = 'button';
  topicReturn.className = 'sw-topic-return';
  topicReturn.textContent = '← ' + level + ' Seçeneklerine Dön';
  topicReturn.hidden = true;
  document.body.appendChild(topicReturn);

  const panels = ['sw-choose', 'sw-files', 'sw-empty'];
  function showPanel(id) {
    root.style.display = '';
    document.body.classList.add('sw-menu-active');
    for (const pid of panels) document.getElementById(pid).hidden = pid !== id;
    topicReturn.hidden = true;
    root.scrollTop = 0;
  }
  document.getElementById('sw-open-weeks').addEventListener('click', () => showPanel('sw-files'));
  document.getElementById('sw-open-topics').addEventListener('click', () => {
    if (level === 'B1.1') {
      showPanel('sw-empty');
      return;
    }
    root.style.display = 'none';
    document.body.classList.remove('sw-menu-active');
    topicReturn.hidden = false;
    window.scrollTo({top: 0, behavior: 'instant'});
  });
  root.querySelectorAll('[data-sw-back]').forEach(button => button.addEventListener('click', () => showPanel('sw-choose')));
  topicReturn.addEventListener('click', () => showPanel('sw-choose'));
  showPanel('sw-choose');
})();