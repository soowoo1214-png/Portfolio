/* 메인: 스크롤 목록, 반응형 표시 수, 메뉴, 연락처 */
"use strict";
(() => {
  const ui = HSJUI;
  const grid = document.querySelector('#project-grid');
  const more = document.querySelector('#load-more');
  const status = document.querySelector('#load-status');
  const desktop = matchMedia('(min-width: 992px)');
  const tablet = matchMedia('(min-width: 576px)');
  const batchSize = () => desktop.matches ? 12 : tablet.matches ? 9 : 6;
  let filter = 'all';
  let visibleCount = batchSize();
  let revealedExtra = false;
  let busy = false;

  function selectedWorks() {
    return HSJ.projects.filter(project => filter === 'all' || project.category === filter);
  }
  function projectCard(project) {
    const popup = project.type === 'design';
    const tag = popup ? 'button' : 'a';
    const action = popup
      ? `type="button" data-project="${ui.escape(project.id)}"`
      : `href="${project.type === 'figma' ? 'figma' : 'video'}.html?id=${encodeURIComponent(project.id)}"`;
    const labels = [ui.category(project.category), ...(project.tags || [])].join(' · ');
    return `<div class="col-12 col-sm-6 col-lg-4"><article class="project-card">
      <div class="project-media"><${tag} class="project-open" ${action} aria-label="${ui.escape(project.title)} 상세 보기">
      <img src="${ui.escape(project.thumbnail)}" width="1080" height="1080" alt="${ui.escape(project.title)}" loading="lazy"></${tag}></div>
      <div class="project-info"><h3>${ui.escape(project.title)}</h3><p>${ui.escape(labels)}</p></div>
      </article></div>`;
  }
  function updateStatus(items) {
    const shown = Math.min(visibleCount, items.length);
    more.hidden = shown >= items.length;
    status.textContent = `${shown} / ${items.length} WORKS`;
    document.querySelector('#result-count').textContent = `${items.length} WORKS`;
    document.querySelectorAll('[data-filter]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    });
  }
  function render() {
    const items = selectedWorks();
    grid.innerHTML = items.slice(0,visibleCount).map(projectCard).join('');
    updateStatus(items);
  }
  function loadMore() {
    if (busy || more.hidden) return;
    busy = true;
    const items = selectedWorks();
    const previousCount = visibleCount;
    visibleCount += batchSize();
    revealedExtra = true;
    // 이미 보던 카드를 다시 만들지 않아 초점과 스크롤 위치를 유지합니다.
    grid.insertAdjacentHTML('beforeend', items.slice(previousCount,visibleCount).map(projectCard).join(''));
    updateStatus(items);
    busy = false;
  }
  document.querySelector('.filters').addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filter = button.dataset.filter;
    visibleCount = batchSize();
    revealedExtra = false;
    render();
  });
  more.addEventListener('click', () => {
    const firstNew = grid.children.length;
    loadMore();
    grid.children[firstNew]?.querySelector('.project-open')?.focus({preventScroll:true});
  });
  // 목록 끝이 화면에 들어오면 다음 묶음을 자동으로 이어 붙입니다.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) loadMore();
    }, {rootMargin:'0px 0px 120px 0px'});
    observer.observe(more);
  }
  function onResize() {
    visibleCount = revealedExtra ? Math.max(visibleCount,batchSize()) : batchSize();
    render();
  }
  desktop.addEventListener('change', onResize);
  tablet.addEventListener('change', onResize);
  render();

  const header = document.querySelector('#header');
  const updateHeader = () => header.classList.toggle('scrolled',scrollY > 30);
  addEventListener('scroll',updateHeader,{passive:true});
  updateHeader();
  document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
    const nav = document.querySelector('#main-nav');
    if (nav.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  }));

  // SNS 주소는 data/projects.js > profile에서 수정합니다.
  const profile = HSJ.profile;
  const contacts = [`<a href="mailto:${ui.escape(profile.email)}">${ui.icon('mail')}${ui.escape(profile.email)}</a>`];
  const channels = {instagram:'Instagram',youtube:'YouTube · 임시',facebook:'Facebook',x:'X'};
  for (const [key,label] of Object.entries(channels)) {
    contacts.push(ui.external(profile[key],label,key,'') || `<span class="unavailable">${ui.icon(key)}${label} · 미등록</span>`);
  }
  document.querySelector('#contact-links').innerHTML = contacts.join('');
})();
