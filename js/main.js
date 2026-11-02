"use strict";
(()=>{
  const ui=HSJUI,esc=ui.escape,grid=document.querySelector("#project-grid"),pages=document.querySelector("#pagination"),mobile=matchMedia("(max-width:575px)"),reduced=matchMedia("(prefers-reduced-motion:reduce)"); let filter="all",page=1;try{
    const s=JSON.parse(sessionStorage.getItem("hsj-plan-work")||"{}");filter=["all","video","ai","design","team"].includes(s.filter)?s.filter:"all";page=Number(s.page)||1;
  } catch{
  }
  let observer;if("IntersectionObserver"in window&&!reduced.matches){
    document.documentElement.classList.add("js-reveal");observer=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("visible");observer.unobserve(e.target);
      }
    }
    ),{
      threshold:.06
    }
    );
  }
  function render(){
    observer?.disconnect();const items=HSJ.projects.filter(p=>filter==="all"||p.category===filter),size=mobile.matches?4:6,total=Math.max(1,Math.ceil(items.length/size));page=Math.max(1,Math.min(page,total));document.querySelectorAll("[data-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.filter===filter)));document.querySelector("#result-count").textContent=`${items.length} WORKS`; grid.innerHTML=items.slice((page-1)*size,page*size).map((p,i)=>{
      const popup=p.type==="design",attrs=popup?`type="button" data-project="${esc(p.id)}"`:`href="${p.type==="figma"?"figma":"video"}.html?id=${encodeURIComponent(p.id)}"`,tag=popup?"button":"a",external=ui.url(p.youtube||p.figma||p.external);return `<div class="col-12 col-sm-6 col-lg-4 reveal" style="--delay:${(i%(mobile.matches?1:innerWidth<992?2:3))*.2}s"><article class="project-card"><div class="project-media"><${tag} class="project-open" ${attrs} aria-label="${esc(p.title)} ${popup?"이미지 열기":"상세 보기"}"><img src="${esc(p.thumbnail)}" width="1080" height="1080" alt="${esc(p.title)}${p.sample?' · 교체용 예시 이미지':''}" loading="lazy"></${tag}>${p.sample?'<span class="sample-label">예시 이미지</span>':''}<div class="card-actions"><${tag} class="icon-action" ${attrs} aria-label="${esc(p.title)} 확대·상세 보기">${ui.icon("zoom")}</${tag}>${external?`<a class="icon-action" href="${esc(external)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.title)} 외부 링크">${
        ui.icon("link")
      }
      </a>`:""}</div></div><div class="project-info"><h3>${esc(p.title)}</h3><p>${ui.category(p.category)}</p>${p.tags?.length?`<p class="project-tags">${
        p.tags.map(esc).join(" · ")
      }
      </p>`:""}</div></article></div>`;
    }
    ).join("")||'<p class="empty-state">이 분류에 등록된 작품이 없습니다.</p>'; const start=mobile.matches?Math.max(1,Math.min(page,total-1)):1,end=mobile.matches?Math.min(total,start+1):total;let numbers="";for(let n=start;n<=end;n++)numbers+=`<button data-page="${n}" aria-label="${n}페이지" ${n===page?'aria-current="page"':''}>${n}</button>`;pages.innerHTML=`<button data-page="${page-1}" aria-label="이전 페이지" ${page===1?'disabled':''}>‹</button>${numbers}<button data-page="${page+1}" aria-label="다음 페이지" ${page===total?'disabled':''}>›</button>`; try{
      sessionStorage.setItem("hsj-plan-work",JSON.stringify({
        filter,page
      }
      ));
    } catch{
    }
    grid.querySelectorAll(".reveal").forEach(el=>observer?observer.observe(el):el.classList.add("visible"));
  }
  document.querySelector(".filters").addEventListener("click",e=>{
    const b=e.target.closest("[data-filter]");if(!b)return;filter=b.dataset.filter;page=1;render();
  }
  );pages.addEventListener("click",e=>{
    const b=e.target.closest("[data-page]");if(!b||b.disabled)return;page=Number(b.dataset.page);render();pages.querySelector('[aria-current="page"]').focus({
      preventScroll:true
    }
    );document.querySelector("#works").scrollIntoView({
      behavior:reduced.matches?"instant":"smooth"
    }
    );
  }
  );mobile.addEventListener("change",()=>{
    page=1;render();
  }
  );render(); const header=document.querySelector("#header"),updateHeader=()=>header.classList.toggle("scrolled",scrollY>30);addEventListener("scroll",updateHeader,{
    passive:true
  }
  );updateHeader();document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>{
    const nav=document.querySelector("#main-nav");if(window.bootstrap&&nav.classList.contains("show"))bootstrap.Collapse.getOrCreateInstance(nav).hide();
  }
  )); document.querySelector("#about-text").textContent=HSJ.profile.about;document.querySelector("#capabilities").innerHTML=HSJ.profile.capabilities.map(t=>`<li>${esc(t)}</li>`).join("");document.querySelector("#tools-text").textContent=HSJ.profile.tools; const contacts=[],profile=HSJ.profile;if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email))contacts.push(`<a href="mailto:${esc(profile.email)}">${ui.icon("mail")}${esc(profile.email)}</a>`);else contacts.push(`<span class="unavailable">${ui.icon("mail")}이메일 준비 중</span>`);for(const k of ["youtube","instagram","figma"]){
    const names={
      youtube:"YouTube",instagram:"Instagram",figma:"Figma"
    }
    ;contacts.push(ui.external(profile[k],names[k],k,"")||`<span class="unavailable" aria-label="${names[k]} 주소 미등록">${ui.icon(k)}<span>${names[k]} · 미등록</span></span>`);
  }
  document.querySelector("#contact-links").innerHTML=contacts.join("");document.querySelector("#contact-note").textContent="이메일 및 SNS 주소는 실제 공개용 연락처를 등록한 뒤 연결됩니다."; const video=document.querySelector("#hero-video"),motion=document.querySelector("#motion-toggle");function label(){
    motion.textContent=video.paused?"▷":"Ⅱ";motion.setAttribute("aria-label",video.paused?"배경 영상 재생":"배경 영상 정지");motion.setAttribute("aria-pressed",String(!video.paused));
  }
  video.addEventListener("play",label);video.addEventListener("pause",label);const fail=()=>{
    video.hidden=true;motion.hidden=true;
  }
  ;video.addEventListener("error",fail);video.querySelector("source").addEventListener("error",fail);if(!reduced.matches){
    video.autoplay=true;video.play().catch(label);
  }
  motion.addEventListener("click",()=>video.paused?video.play().catch(fail):video.pause());reduced.addEventListener("change",()=>{
    if(reduced.matches)video.pause();
  }
  ); const dialog=document.querySelector("#design-dialog"),viewport=document.querySelector("#design-viewport"),image=document.querySelector("#design-image"),prev=document.querySelector("#slide-prev"),next=document.querySelector("#slide-next"),zoom=document.querySelector("#zoom-toggle");let current,slide=0,opener,drag; function showSlide(){
    const images=current.images?.length?current.images:["MY-PORTFOLIO-FILES/02-design-images/missing.jpg"];slide=Math.max(0,Math.min(slide,images.length-1));delete image.dataset.fallback;image.src=images[slide];image.alt=`${current.title} ${slide+1}번째 이미지${current.sample?' · 교체용 예시':''}`;document.querySelector("#slide-status").textContent=`${slide+1} / ${images.length}`;prev.disabled=slide===0;next.disabled=slide===images.length-1;viewport.scrollTo(0,0);
  }
  function changeSlide(delta){
    slide+=delta;showSlide();
  }
  grid.addEventListener("click",e=>{
    const b=e.target.closest("[data-project]");if(!b)return;current=HSJ.projects.find(p=>p.id===b.dataset.project);opener=b;slide=0;viewport.classList.remove("zoomed");zoom.setAttribute("aria-pressed","false");zoom.textContent="확대";document.querySelector("#design-title").textContent=current.title;showSlide();dialog.showModal();document.body.style.overflow="hidden";
  }
  );document.querySelector("#dialog-close").addEventListener("click",()=>dialog.close());dialog.addEventListener("close",()=>{
    document.body.style.overflow="";opener?.focus({
      preventScroll:true
    }
    );
  }
  );prev.addEventListener("click",()=>changeSlide(-1));next.addEventListener("click",()=>changeSlide(1));zoom.addEventListener("click",()=>{
    const on=viewport.classList.toggle("zoomed");zoom.setAttribute("aria-pressed",String(on));zoom.textContent=on?"너비 맞춤":"확대";viewport.scrollTo(0,0);
  }
  );dialog.addEventListener("keydown",e=>{
    if(e.target===viewport&&viewport.classList.contains("zoomed"))return;if(e.key==="ArrowLeft"){
      e.preventDefault();changeSlide(-1);
    }
    if(e.key==="ArrowRight"){
      e.preventDefault();changeSlide(1);
    }
  }
  ); viewport.addEventListener("pointerdown",e=>{
    if(e.pointerType==="mouse"&&e.button!==0)return;drag={
      x:e.clientX,y:e.clientY,left:viewport.scrollLeft,top:viewport.scrollTop,mouse:e.pointerType==="mouse"
    }
    ;if(drag.mouse){
      viewport.setPointerCapture(e.pointerId);viewport.classList.add("dragging");e.preventDefault();
    }
  }
  ); viewport.addEventListener("pointermove",e=>{
    if(drag?.mouse){
      viewport.scrollTop=drag.top+drag.y-e.clientY;if(viewport.classList.contains("zoomed"))viewport.scrollLeft=drag.left+drag.x-e.clientX;
    }
  }
  ); viewport.addEventListener("pointerup",e=>{
    if(drag&&!viewport.classList.contains("zoomed")){
      const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.4)changeSlide(dx<0?1:-1);
    }
    drag=null;viewport.classList.remove("dragging");
  }
  );["pointercancel","lostpointercapture"].forEach(t=>viewport.addEventListener(t,()=>{
    drag=null;viewport.classList.remove("dragging");
  }
  ));
}
)();
