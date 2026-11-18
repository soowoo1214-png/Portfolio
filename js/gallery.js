/* 디자인 팝업: 이미지 순서, 확대, 드래그, 스와이프, 키보드 조작 */
"use strict";
(() => {
  const grid = document.querySelector("#project-grid");
  const dialog=document.querySelector("#design-dialog"),viewport=document.querySelector("#design-viewport"),image=document.querySelector("#design-image"),prev=document.querySelector("#slide-prev"),next=document.querySelector("#slide-next"),zoom=document.querySelector("#zoom-toggle");let current,slide=0,opener,drag; function showSlide(){
    const images=current.images?.length?current.images:["MY-PORTFOLIO-FILES/02-design-images/missing.jpg"];slide=Math.max(0,Math.min(slide,images.length-1));image.onload=()=>image.style.setProperty("--natural-width",`${image.naturalWidth}px`);delete image.dataset.fallback;image.src=images[slide];image.alt=`${current.title} ${slide+1}번째 이미지${current.sample?' · 교체용 예시':''}`;document.querySelector("#slide-status").textContent=`${slide+1} / ${images.length}`;prev.disabled=slide===0;next.disabled=slide===images.length-1;viewport.scrollTo(0,0);
  }
  function changeSlide(delta){
    slide+=delta;showSlide();
  }
  grid.addEventListener("click",e=>{
    const b=e.target.closest("[data-project]");if(!b)return;current=HSJ.projects.find(p=>p.id===b.dataset.project);opener=b;slide=0;viewport.classList.remove("zoomed");zoom.setAttribute("aria-pressed","false");zoom.textContent="⤢";document.querySelector("#design-title").textContent=current.title;showSlide();dialog.showModal();document.body.style.overflow="hidden";
  }
  );document.querySelector("#dialog-close").addEventListener("click",()=>dialog.close());dialog.addEventListener("close",()=>{
    document.body.style.overflow="";opener?.focus({
      preventScroll:true
    }
    );
  }
  );prev.addEventListener("click",()=>changeSlide(-1));next.addEventListener("click",()=>changeSlide(1));zoom.addEventListener("click",()=>{
    const on=viewport.classList.toggle("zoomed");zoom.setAttribute("aria-pressed",String(on));zoom.textContent=on?"⤡":"⤢";zoom.setAttribute("aria-label",on?"너비에 맞추기":"원본 크기로 보기");viewport.scrollTo(0,0);
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

})();
