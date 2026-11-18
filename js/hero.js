/* HOME: 실제 작품을 일정 구간씩 순환합니다. 목록은 data/projects.js에서 수정합니다. */
"use strict";
(() => {
  const video = document.querySelector('#hero-video');
  const toggle = document.querySelector('#motion-toggle');
  const poster = document.querySelector('.hero > img');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const playlist = HSJ.hero.projectIds.map(id => HSJ.projects.find(p => p.id === id)).filter(p => p?.video);
  let index = 0;
  let changing = false;
  let failedCount = 0;
  let userPaused = reducedMotion.matches;
  video.removeAttribute('loop');
  video.muted = true;
  video.querySelector('source')?.remove();

  function updateButton() {
    toggle.textContent = video.paused ? '▷' : 'Ⅱ';
    toggle.setAttribute('aria-label', video.paused ? '배경 영상 재생' : '배경 영상 정지');
    toggle.setAttribute('aria-pressed', String(!video.paused));
  }
  function loadClip() {
    if (!playlist.length) return;
    changing = true;
    const project = playlist[index];
    video.poster = project.thumbnail;
    poster.src = project.thumbnail;
    video.src = project.video;
    video.load();
    if (!userPaused) video.play().catch(() => { userPaused = true; updateButton(); });
  }
  function nextClip() {
    if (changing || userPaused) return;
    index = (index + 1) % playlist.length;
    loadClip();
  }
  video.addEventListener('loadedmetadata', () => { video.currentTime = Math.min(HSJ.hero.startSeconds || 0, Math.max(0, video.duration - 1)); });
  video.addEventListener('loadeddata', () => { changing = false; failedCount = 0; });
  video.addEventListener('timeupdate', () => {
    if (video.currentTime >= (HSJ.hero.startSeconds || 0) + HSJ.hero.clipSeconds) nextClip();
  });
  video.addEventListener('ended', nextClip);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('error', () => {
    failedCount++;
    if (failedCount >= playlist.length) { userPaused = true; updateButton(); return; }
    changing = false;
    nextClip();
  });
  toggle.addEventListener('click', () => {
    userPaused = !video.paused;
    if (userPaused) video.pause();
    else video.play().catch(updateButton);
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) { userPaused = true; video.pause(); }
  });
  loadClip();
})();
