/* 메인 화면: 작품 목록 → 메뉴 → 연락처 → HOME 영상 */
"use strict";
(()=>{
  const ui=HSJUI,esc=ui.escape,grid=document.querySelector("#project-grid"),pages=document.querySelector("#pagination"),mobile=matchMedia("(max-width:575px)"),reduced=matchMedia("(prefers-reduced-motion:reduce)"); let filter="all",page=1;try{
    const s=JSON.parse(sessionStorage.getItem("hsj-plan-work")||"{}");filter=["all","video","ai","design"].includes(s.filter)?s.filter:"all";page=Number(s.page)||1;
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
  // 선택된 분류의 작품을 PC 6개 / 모바일 4개씩 표시합니다.
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
  // 분류 및 페이지 이동 이벤트
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
  )); // 연락처: data/projects.js의 profile 값을 사용합니다.
  const contacts=[],profile=HSJ.profile;if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email))contacts.push(`<a href="mailto:${esc(profile.email)}">${ui.icon("mail")}${esc(profile.email)}</a>`);else contacts.push(`<span class="unavailable">${ui.icon("mail")}이메일 · 미등록</span>`);for(const k of ["instagram"]){
    const names={
      youtube:"YouTube",instagram:"인스타그램",figma:"Figma"
    }
    ;contacts.push(ui.external(profile[k],names[k],k,"")||`<span class="unavailable" aria-label="${names[k]} 주소 미등록">${ui.icon(k)}<span>${names[k]} · 미등록</span></span>`);
  }
  document.querySelector("#contact-links").innerHTML=contacts.join(""); 
})();
