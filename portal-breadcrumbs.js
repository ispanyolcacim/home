(() => {
  'use strict';
  if(window.parent !== window || document.getElementById('portalBreadcrumbBar')) return;
  const file=location.pathname.split('/').pop().toLowerCase();
  const levels={'a11.html':'A1.1','a12.html':'A1.2','a21.html':'A2.1','a22.html':'A2.2','b11.html':'B1.1'};
  const inPortal=file==='ogrenci-portali.html';
  const level=levels[file];
  const style=document.createElement('style');
  style.textContent=`
    .portal-breadcrumb-bar{position:sticky;top:0;z-index:2147483500;background:#fffaf8f5;backdrop-filter:blur(12px);border-bottom:1px solid #e7e1ec;color:#262b4c;font-family:'Trebuchet MS','Segoe UI',sans-serif}
    .portal-breadcrumb-list{max-width:1180px;box-sizing:border-box;margin:0 auto;padding:13px 18px;list-style:none;display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-height:58px}
    .portal-breadcrumb-list li{display:flex;align-items:center;gap:8px;min-width:0}
    .portal-breadcrumb-separator{color:#b5aec5;font-size:21px;font-weight:900;line-height:1}
    .portal-breadcrumb-link{font:800 14px/1.35 'Trebuchet MS','Segoe UI',sans-serif;text-decoration:none;color:#292d51;display:inline-flex;align-items:center;gap:5px;border:0;border-radius:999px;padding:9px 14px;background:#ece7f6;cursor:pointer}
    .portal-breadcrumb-link:hover{background:#ded4ef}
    .portal-breadcrumb-link:focus-visible{outline:3px solid #596caf;outline-offset:3px}
    .portal-breadcrumb-current{font-size:14px;font-weight:900;line-height:1.4;color:#716886;padding:6px 3px;overflow-wrap:anywhere}
    .topbar{top:var(--portal-breadcrumb-height,58px)}
    .sw-level-menu{top:var(--portal-breadcrumb-height,58px)!important}
    @media(max-width:600px){.portal-breadcrumb-list{padding:10px 12px;gap:5px}.portal-breadcrumb-list li{gap:5px}.portal-breadcrumb-link{font-size:12px;padding:8px 10px}.portal-breadcrumb-current{font-size:12px}.portal-breadcrumb-separator{font-size:18px}}
  `;
  document.head.appendChild(style);
  const nav=document.createElement('nav');nav.id='portalBreadcrumbBar';nav.className='portal-breadcrumb-bar';nav.setAttribute('aria-label','Sayfa yolu');
  const list=document.createElement('ol');list.className='portal-breadcrumb-list';nav.append(list);document.body.prepend(nav);
  const height=()=>document.documentElement.style.setProperty('--portal-breadcrumb-height',nav.offsetHeight+'px');
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(height).observe(nav);window.addEventListener('resize',height);
  function go(destination,selectedLevel){
    if(inPortal){
      if(destination==='portal')window.leavePortalResource('home');
      else if(destination==='student')window.leavePortalResource('tracker');
      else if(destination==='level')window.openPortalResource(selectedLevel);
    }else if(destination==='portal')location.href='ogrenci-portali.html';
    else if(destination==='student')location.href='ogrenci-portali.html?view=student';
    else if(destination==='level')window.dispatchEvent(new CustomEvent('ispanyolcacim-course-nav',{detail:{section:'choose'}}));
  }
  function set(state={}){
    const view=state.view||'home';const selected=state.level||level;
    const items=[{label:'🏠 Ana sayfa',href:'/'}];
    if(view==='home')items.push({label:'Portal',current:true});
    else{
      items.push({label:'Portal',destination:'portal'});
      if(view==='tracker'&&!selected)items.push({label:'Öğrenci Portalı',current:true});
      else{
        items.push({label:'Öğrenci Portalı',destination:'student'});
        if(selected==='toolbox'||view==='toolbox')items.push({label:'İspanyolca Araç Kutusu',current:true});
        else if(selected){
          const current=view==='tracker'||state.section==='choose';
          items.push({label:selected,destination:'level',selectedLevel:selected,current});
          if(state.lesson)items.push({label:state.lesson+'. Ders',current:false,destination:'student'});
          if(!current)items.push({label:state.section==='notes'?'Ders notun':state.section==='weeks'?'Haftalık Çalışma Dosyaları':'Konular',current:true});
        }
      }
    }
    list.replaceChildren();
    for(const[i,item]of items.entries()){
      const li=document.createElement('li');
      if(i){const separator=document.createElement('span');separator.className='portal-breadcrumb-separator';separator.textContent='›';separator.setAttribute('aria-hidden','true');li.append(separator);}
      let element;
      if(item.current){element=document.createElement('span');element.className='portal-breadcrumb-current';element.setAttribute('aria-current','page');}
      else if(item.href){element=document.createElement('a');element.href=item.href;element.className='portal-breadcrumb-link';}
      else{element=document.createElement('button');element.type='button';element.className='portal-breadcrumb-link';element.addEventListener('click',()=>go(item.destination,item.selectedLevel));}
      element.textContent=item.label;li.append(element);list.append(li);
    }
    height();
  }
  window.portalBreadcrumbs={set};
  set(inPortal?{view:'home'}:file==='toolbox.html'?{view:'toolbox',level:'toolbox'}:{view:'resource',level,section:'choose'});
})();
