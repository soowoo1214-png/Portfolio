"use strict";
window.HSJUI={
  escape:value=>String(value??"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
 url(value){try{const u=new URL(value);return /^https?:$/.test(u.protocol)?u.href:"";}catch{return "";}},
 icon(name){const p={zoom:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6M10 7v6"/>',link:'<path d="m10 13 4-4M9 15l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 3 2-2a4 4 0 1 1 6 6l-5 5a4 4 0 0 1-6 0"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',youtube:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/>',instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.01"/>',figma:'<path d="M12 2v16.5a3.5 3.5 0 1 1-3.5-3.5H12M12 2H8.5a3.5 3.5 0 0 0 0 7H12M12 2h3.5a3.5 3.5 0 0 1 0 7h-7a3.5 3.5 0 0 0 0 7"/><circle cx="15.5" cy="12.5" r="3.5"/>'};return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${p[name]||p.link}</svg>`;},
 external(value,label,name="link",classes="primary-button"){const ui=window.HSJUI,safe=ui.url(value);return safe?`<a class="${
    classes
  }
  " href="${
    ui.escape(safe)
  }
  " target="_blank" rel="noopener noreferrer">${ui.icon(name)}<span>${ui.escape(label)}</span></a>`:"";},
 category:value=>({video:"VIDEO",ai:"AI CREATIVE",design:"DESIGN",team:"팀프로젝트"}[value]||value)
};
document.querySelectorAll("[data-year]").forEach(e=>e.textContent=new Date().getFullYear());
document.addEventListener("error",e=>{if(e.target instanceof HTMLImageElement&&!e.target.dataset.fallback){e.target.dataset.fallback="true";e.target.src="MY-PORTFOLIO-FILES/02-design-images/missing.jpg";e.target.alt="이미지를 불러오지 못했습니다. 파일 경로를 확인해 주세요.";}},true);
