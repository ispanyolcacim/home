(function(){
  'use strict';
  if(window.parent===window || new URLSearchParams(location.search).get('teacherView')!=='1') return;
  const allowedLevels=new Set(['A1.1','A1.2','A2.1','A2.2','B1.1']);
  const requestId=crypto.randomUUID();
  const origin=location.origin;
  document.body.classList.add('teacher-view');
  const style=document.createElement('style');
  style.textContent='.teacher-view #tracker>.hero,.teacher-view #tracker>.topbar,.teacher-view .tracker-login{display:none!important}.teacher-view #tracker .tracker-wrap{margin-top:18px}.teacher-view .teacher-view-note{padding:13px 18px;border:1px solid #d7ceeb;background:#f5efff;border-radius:14px;color:#604681;font-size:13px;font-weight:700;margin:15px auto;max-width:1120px}.teacher-view .tracker-results{scroll-margin-top:15px}.teacher-view .tracker-profile{margin-top:0}';
  document.head.append(style);
  const note=document.createElement('div');note.className='teacher-view-note';note.setAttribute('role','status');note.textContent='Öğrenci görünümü hazırlanıyor…';
  document.getElementById('tracker').prepend(note);
  const ordinaryOpenScreen=openScreen;
  openScreen=function(id){ordinaryOpenScreen(id==='home'?'tracker':id);};
  openScreen('tracker');

  function valid(data){
    return data && data.success===true && allowedLevels.has(data.level) && typeof data.student==='string' && data.student.length<=150 && Array.isArray(data.assignments) && data.assignments.length<=500 && data.assignments.every(item=>item && typeof item.title==='string' && item.title.length<=500 && typeof item.value==='string' && item.value.length<=15000 && ['completed','missing','pending'].includes(item.status));
  }
  function clear(){
    trackerVerificationRevision++;
    resetTrackerResults();trackerAssignments=[];trackerHomeworkLevel='';
    document.getElementById('trackerResultName').textContent='Öğrenci';
    document.getElementById('trackerResultLevel').textContent='Seviye';
    document.getElementById('trackerCode').value='';
    note.textContent='Öğrenci görünümü kapatıldı.';
  }
  window.addEventListener('message',event=>{
    if(event.origin!==origin || event.source!==window.parent || !event.data || event.data.requestId!==requestId) return;
    if(event.data.type==='teacher-portal-clear'){clear();return;}
    if(event.data.type!=='teacher-portal-data' || !valid(event.data.data)) return;
    const data=event.data.data;
    trackerVerificationRevision++;clearTrackerResources();trackerHomeworkLevel=data.level;
    document.getElementById('trackerLevel').value=data.level;
    document.getElementById('trackerCode').value='';
    openScreen('tracker');renderTrackerResults(data);hideTrackerMessage();
    note.textContent='👩🏻‍💻 Öğretmen görünümü · '+data.student+' · '+data.level;
    window.parent.postMessage({type:'teacher-portal-rendered',requestId,level:data.level,student:data.student},origin);
  });
  window.addEventListener('keydown',event=>{if(event.key==='Escape')window.parent.postMessage({type:'teacher-portal-close',requestId},origin);});
  window.addEventListener('pagehide',clear);
  window.parent.postMessage({type:'teacher-portal-ready',version:1,requestId},origin);
})();
