/* 상세: 영상은 처음부터 실제 화면비를 확보하고 썸네일 없이 재생합니다. */
"use strict";
(() => {
  const ui = HSJUI;
  const type = document.body.dataset.detailType;
  const id = new URLSearchParams(location.search).get('id');
  const project = HSJ.projects.find(item => item.id === id && item.type === type);
  const main = document.querySelector('#detail');
  if (!project) {
    main.innerHTML = '<h1>작품을 찾을 수 없습니다.</h1><a href="index.html#works">작업 목록으로</a>';
    return;
  }
  document.title = `${project.title} | HSJ`;
  const labels = [ui.category(project.category),...(project.tags || [])].join(' · ');
  main.innerHTML = `<h1>${ui.escape(project.title)}</h1><p class="detail-subtitle">${ui.escape(labels)}</p>`;
  if (type === 'video') {
    const ratio = (project.width || 16) / (project.height || 9);
    main.insertAdjacentHTML('beforeend',`<div class="player-wrap" style="--video-ratio:${ratio}"><video class="detail-player" controls playsinline autoplay muted preload="metadata" width="${project.width || 1920}" height="${project.height || 1080}"><source src="${ui.escape(project.video)}" type="video/mp4"></video></div><p id="video-status" role="status" hidden></p>`);
    const video = main.querySelector('video');
    video.muted = true;
    // 소리 있는 자동 재생은 브라우저가 막으므로 무음으로 시작합니다. 기본 컨트롤로 소리를 켤 수 있습니다.
    video.play().catch(() => {});
    const failed = () => { const status = document.querySelector('#video-status'); status.hidden = false; status.textContent = '영상을 불러오지 못했습니다.'; };
    video.addEventListener('error',failed);
    video.querySelector('source').addEventListener('error',failed);
  } else {
    main.insertAdjacentHTML('beforeend',`<div class="detail-images">${(project.images || []).map((src,i) => `<img src="${ui.escape(src)}" alt="${ui.escape(project.title)} 상세 ${i+1}" loading="lazy">`).join('')}</div>`);
  }
  if (project.description) main.insertAdjacentHTML('beforeend',`<p class="detail-description">${ui.escape(project.description)}</p>`);
  if (project.figma) main.insertAdjacentHTML('beforeend',ui.external(project.figma,'프로토타입 보기'));
})();
