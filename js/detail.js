"use strict";
(()=>{
  const ui=HSJUI,esc=ui.escape,type=document.body.dataset.detailType,id=new URLSearchParams(location.search).get("id"),p=HSJ.projects.find(x=>x.id===id&&x.type===type),main=document.querySelector("#detail");if(!p){
    main.innerHTML='<div class="empty-state"><h1>작품을 찾을 수 없습니다.</h1><a class="primary-button" href="index.html#works">BACK TO WORKS</a></div>';return;
  }
  document.title=`${p.detailTitle||p.title} | HSJ`;const notice=p.sample?'<p class="sample-notice">교체용 예시 미디어입니다. 실제 작품 영상·이미지가 아닙니다.</p>':"";let content; if(type==="video"){
    const player=p.video?`<div class="player-wrap"><video class="detail-player" controls playsinline preload="metadata" poster="${esc(p.thumbnail)}"><source src="${esc(p.video)}"></video></div><p id="video-status" class="sample-notice" role="status"></p>`:`<img class="main-mockup" src="${esc(p.thumbnail)}" alt="${esc(p.title)} 대표 이미지"><p class="muted">로컬 영상이 등록되지 않았습니다.</p>`; content=`<h1>${esc(p.title)}</h1><p class="detail-subtitle">${ui.category(p.category)}${p.year?` · ${
      esc(p.year)
    }
    `:""}</p>${notice}${player}<div class="detail-links">${ui.external(p.youtube,"YouTube에서 보기","youtube")||'<span class="muted">YouTube 링크 준비 중</span>'}</div><h2>OVERVIEW</h2><p class="detail-description">${esc(p.description)}</p><h2>MY ROLE</h2><p>${esc(p.role||"담당 역할 입력")}</p><h2>TOOLS</h2><p>${esc(p.tools||"사용 도구 입력")}</p>${(p.process||[]).map(s=>`<section><h2>${
      esc(s.title)
    }
    </h2><p class="detail-description">${
      esc(s.description)
    }
    </p>${
      s.image?`<img class="main-mockup" src="${esc(s.image)}" alt="${esc(s.title)}">`:""
    }
    </section>`).join("")}`;
  } else{
    content=`<h1>${esc(p.detailTitle||p.title)}</h1><p class="detail-subtitle">UI/UX DESIGN${p.year?` · ${
      esc(p.year)
    }
    `:""}</p>${notice}<img class="main-mockup" src="${esc(p.mockup||p.thumbnail)}" alt="${esc(p.title)} 메인 목업${p.sample?' · 교체용 예시':''}"><h2>PROJECT OVERVIEW</h2><p class="detail-description">${esc(p.description)}</p><h2>DESIGN DETAILS</h2><div class="detail-images">${(p.images||[]).map((src,i)=>`<img src="${esc(src)}" alt="${esc(p.title)} 전체 디자인 ${i+1}${p.sample?' · 교체용 예시':''}" loading="lazy">`).join("")}</div><h2>INTERACTIVE PROTOTYPE</h2>${ui.external(p.figma,"TRY FIGMA PROTOTYPE","figma","primary-button prototype-link")||'<div class="link-pending">TRY FIGMA PROTOTYPE · 실제 공유 링크 등록 후 활성화</div>'}`;
  }
  main.innerHTML=content;const v=main.querySelector("video");const failed=()=>document.querySelector("#video-status").textContent="영상을 불러오지 못했습니다. 파일 경로와 영상 형식을 확인해 주세요.";v?.addEventListener("error",failed);v?.querySelector("source")?.addEventListener("error",failed);
}
)();
