/* 상세 화면에는 등록된 작품 자료와 설명만 표시합니다. */
"use strict";
(() => {
  const ui = HSJUI;
  const esc = ui.escape;
  const type = document.body.dataset.detailType;
  const id = new URLSearchParams(location.search).get('id');
  const project = HSJ.projects.find(p => p.id === id && p.type === type);
  const main = document.querySelector('#detail');
  if (!project) {
    main.innerHTML = '<h1>작품을 찾을 수 없습니다.</h1><a href="index.html#works">작품 목록으로</a>';
    return;
  }
  document.title = `${project.title} | HSJ`;
  const heading = `<h1>${esc(project.title)}</h1><p class="detail-subtitle">${ui.category(project.category)}</p>`;
  const description = project.description ? `<p class="detail-description">${esc(project.description)}</p>` : '';
  if (type === 'video') {
    main.innerHTML = `${heading}<div class="player-wrap"><video class="detail-player" controls playsinline preload="metadata" poster="${esc(project.thumbnail)}"><source src="${esc(project.video)}" type="video/mp4"></video></div><p id="video-status" role="status" hidden></p>${description}${project.role ? `<h2>MY ROLE</h2><p>${esc(project.role)}</p>` : ''}${project.tools ? `<h2>TOOLS</h2><p>${esc(project.tools)}</p>` : ''}`;
    const video = main.querySelector('video');
    const fail = () => {
      const status = document.querySelector('#video-status');
      status.hidden = false;
      status.textContent = '영상을 불러오지 못했습니다.';
    };
    video.addEventListener('error', fail);
    video.querySelector('source').addEventListener('error', fail);
  } else {
    main.innerHTML = `${heading}${description}<div class="detail-images">${(project.images || []).map((src,i) => `<img src="${esc(src)}" alt="${esc(project.title)} 상세 ${i+1}" loading="lazy">`).join('')}</div>${project.figma ? ui.external(project.figma,'프로토타입 보기','figma') : ''}`;
  }
})();
