const TIME_ZONE = 'Europe/Istanbul';
const DAY_MS = 86400000;

export function getSelection(bank, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const part = key => parts.find(p => p.type === key).value;
  const key = `${part('year')}-${part('month')}-${part('day')}`;
  const today = Date.UTC(Number(part('year')),Number(part('month'))-1,Number(part('day')));
  const [year,month,day] = bank.startDate.split('-').map(Number);
  const offset = Math.floor((today-Date.UTC(year,month-1,day))/DAY_MS);
  const index = ((offset % bank.entries.length)+bank.entries.length)%bank.entries.length;
  return {key,index,entry:bank.entries[index],dateText:new Intl.DateTimeFormat('tr-TR',{timeZone:TIME_ZONE,day:'numeric',month:'long',year:'numeric'}).format(now)};
}

export function validateBank(bank) {
  if(bank?.timeZone!==TIME_ZONE || !/^\d{4}-\d{2}-\d{2}$/.test(bank.startDate) || bank.entries?.length!==365) throw new Error('Invalid daily word calendar');
  const ids = new Set();
  for(const e of bank.entries) {
    if(!e.id || ids.has(e.id) || !['isim','fiil','sıfat','zarf'].includes(e.kind)) throw new Error('Invalid or duplicate entry');
    for(const s of [e.word,e.tr,e.en,e.example?.es,e.example?.tr,e.example?.en]) if(typeof s!=='string' || !s.trim()) throw new Error('Incomplete daily word');
    ids.add(e.id);
  }
  return bank;
}

function mountDailyWord() {
  const card = document.getElementById('dailyWordCard');
  if(!card) return;
  const $ = id => document.getElementById(id);
  const wordButton = $('dailyWordSpeak');
  const sentenceButton = $('dailyWordSentenceSpeak');
  const buttons = [wordButton,sentenceButton];
  const speech = window.speechSynthesis;
  let bank,selection,activeSpeech=null,activeButton=null,speechAttempt=0,startWatchdog;

  function status(message) {
    $('dailyWordStatus').textContent=message;
    $('dailyWordStatus').hidden=!message;
  }
  function resetSpeechUI() {
    for(const b of buttons) b.setAttribute('aria-pressed','false');
    wordButton.setAttribute('aria-label','İspanyolca kelimeyi dinle');
    wordButton.title='Kelimeyi dinle';
    sentenceButton.setAttribute('aria-label','İspanyolca örnek cümleyi dinle');
    sentenceButton.querySelector('.daily-word-audio-label').textContent='Cümleyi dinle';
    activeSpeech=null;activeButton=null;clearTimeout(startWatchdog);
  }
  function stopSpeech() {
    speechAttempt++;
    if(activeSpeech && speech) speech.cancel();
    resetSpeechUI();
  }
  function speak(button,text) {
    if(activeButton===button) {stopSpeech();status('');return;}
    stopSpeech();status('');
    if(!speech || !window.SpeechSynthesisUtterance) {status('Bu tarayıcı sesli okumayı desteklemiyor.');return;}
    const voices = speech.getVoices();
    const voice = voices.find(v=>/^es[-_]ES$/i.test(v.lang)) || voices.find(v=>/^es(?:[-_]|$)/i.test(v.lang));
    if(voices.length && !voice) {status('Bu cihazda İspanyolca ses bulunamadı. Konuşma ayarlarına İspanyolca sesi ekleyerek tekrar deneyebilirsin.');return;}
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang=voice?.lang || 'es-ES';
    if(voice) utterance.voice=voice;
    utterance.rate=.88;utterance.pitch=1;
    const attempt=++speechAttempt;
    activeSpeech=utterance;activeButton=button;
    button.setAttribute('aria-pressed','true');
    button.setAttribute('aria-label','Sesli okumayı durdur');
    if(button===wordButton) button.title='Durdur';
    else sentenceButton.querySelector('.daily-word-audio-label').textContent='Durdur';
    utterance.onstart=()=>{if(attempt===speechAttempt)clearTimeout(startWatchdog);};
    utterance.onend=()=>{if(attempt===speechAttempt)resetSpeechUI();};
    utterance.onerror=event=>{
      if(attempt!==speechAttempt)return;
      resetSpeechUI();
      if(!['interrupted','canceled'].includes(event.error))status('Ses başlatılamadı. Cihazında İspanyolca konuşma sesinin kullanılabilir olduğunu kontrol edip tekrar deneyebilirsin.');
    };
    startWatchdog=setTimeout(()=>{if(attempt===speechAttempt){stopSpeech();status('Ses başlatılamadı. İspanyolca konuşma sesini etkinleştirip tekrar deneyebilirsin.');}},8000);
    try {speech.speak(utterance);} catch {stopSpeech();status('Sesli okuma bu cihazda başlatılamadı.');}
  }
  function render(now=new Date()) {
    const next=getSelection(bank,now);
    if(selection?.key===next.key)return;
    stopSpeech();status('');selection=next;
    const e=selection.entry;
    $('dailyWordDate').textContent=selection.dateText;
    $('dailyWordDate').dateTime=selection.key;
    $('dailyWordText').textContent=e.word;
    $('dailyWordTurkish').textContent=e.tr;
    $('dailyWordEnglish').textContent=e.en;
    $('dailyWordExampleSpanish').textContent=e.example.es;
    $('dailyWordExampleTurkish').textContent=e.example.tr;
    $('dailyWordExampleEnglish').textContent=e.example.en;
    $('dailyWordLoading').hidden=true;$('dailyWordContent').hidden=false;$('dailyWordFooter').hidden=false;
    $('dailyWordRetry').hidden=true;card.setAttribute('aria-busy','false');
    if(!speech || !window.SpeechSynthesisUtterance) {
      buttons.forEach(b=>b.disabled=true);status('Bu tarayıcı sesli okumayı desteklemiyor.');
    }
  }
  async function loadWords() {
    card.setAttribute('aria-busy','true');$('dailyWordRetry').hidden=true;$('dailyWordLoading').hidden=false;status('');
    try {
      const response=await fetch(new URL('./words.json?v=1',import.meta.url));
      if(!response.ok)throw new Error('Daily words unavailable');
      bank=validateBank(await response.json());selection=null;render();
    } catch {
      $('dailyWordLoading').hidden=true;card.setAttribute('aria-busy','false');
      status('Günün kelimesi şu anda yüklenemedi. Yeniden deneyebilirsin.');$('dailyWordRetry').hidden=false;
    }
  }
  wordButton.addEventListener('click',()=>{if(selection)speak(wordButton,selection.entry.word);});
  sentenceButton.addEventListener('click',()=>{if(selection)speak(sentenceButton,selection.entry.example.es);});
  $('dailyWordRetry').addEventListener('click',loadWords);
  window.addEventListener('pagehide',stopSpeech);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopSpeech();else if(bank)render();});
  const home=document.getElementById('home');
  if(home)new MutationObserver(()=>{if(!home.classList.contains('active'))stopSpeech();else if(bank)render();}).observe(home,{attributes:true,attributeFilter:['class']});
  setInterval(()=>{if(bank && !document.hidden)render();},60000);
  loadWords();
}

if(typeof document!=='undefined')mountDailyWord();

