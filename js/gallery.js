/* 디자인 팝업: 원본 비율, 확대, 키보드·드래그·스와이프 */
"use strict";
(() => {
  const dialog = document.querySelector('#design-dialog');
  const viewport = document.querySelector('#design-viewport');
  const image = document.querySelector('#design-image');
  const previous = document.querySelector('#slide-prev');
  const next = document.querySelector('#slide-next');
  const zoom = document.querySelector('#zoom-toggle');
  let project, slide = 0, opener, drag;
  function showSlide() {
    const images = project.images || [];
    slide = Math.max(0,Math.min(slide,images.length-1));
    image.style.removeProperty('--natural-width');
    image.onload = () => image.style.setProperty('--natural-width',`${image.naturalWidth}px`);
    image.src = images[slide];
    image.alt = `${project.title} ${slide+1}번째 이미지`;
    document.querySelector('#slide-status').textContent = `${slide+1} / ${images.length}`;
    previous.disabled = slide === 0;
    next.disabled = slide === images.length-1;
    viewport.scrollTo(0,0);
  }
  function changeSlide(delta) { slide += delta; showSlide(); }
  document.querySelector('#project-grid').addEventListener('click',event => {
    const button = event.target.closest('[data-project]');
    if (!button) return;
    project = HSJ.projects.find(item => item.id === button.dataset.project);
    opener = button;
    slide = 0;
    viewport.classList.remove('zoomed');
    zoom.setAttribute('aria-pressed','false');
    zoom.setAttribute('aria-label','원본 크기로 보기');
    zoom.textContent = '⤢';
    document.querySelector('#design-title').textContent = project.title;
    showSlide();
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
  document.querySelector('#dialog-close').addEventListener('click',() => dialog.close());
  dialog.addEventListener('close',() => { document.body.style.overflow = ''; opener?.focus({preventScroll:true}); });
  previous.addEventListener('click',() => changeSlide(-1));
  next.addEventListener('click',() => changeSlide(1));
  zoom.addEventListener('click',() => {
    const expanded = viewport.classList.toggle('zoomed');
    zoom.setAttribute('aria-pressed',String(expanded));
    zoom.setAttribute('aria-label',expanded ? '너비에 맞추기' : '원본 크기로 보기');
    zoom.textContent = expanded ? '⤡' : '⤢';
    viewport.scrollTo(0,0);
  });
  dialog.addEventListener('keydown',event => {
    if (event.target === viewport && viewport.classList.contains('zoomed')) return;
    if (['ArrowLeft','ArrowRight'].includes(event.key)) {
      event.preventDefault(); changeSlide(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  viewport.addEventListener('pointerdown',event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    drag = {x:event.clientX,y:event.clientY,left:viewport.scrollLeft,top:viewport.scrollTop,mouse:event.pointerType==='mouse'};
    if (drag.mouse) { viewport.setPointerCapture(event.pointerId); viewport.classList.add('dragging'); event.preventDefault(); }
  });
  viewport.addEventListener('pointermove',event => {
    if (!drag?.mouse) return;
    viewport.scrollTop = drag.top + drag.y - event.clientY;
    if (viewport.classList.contains('zoomed')) viewport.scrollLeft = drag.left + drag.x - event.clientX;
  });
  viewport.addEventListener('pointerup',event => {
    if (drag && !viewport.classList.contains('zoomed')) {
      const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
      if (Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)*1.4) changeSlide(dx<0 ? 1 : -1);
    }
    drag = null; viewport.classList.remove('dragging');
  });
  ['pointercancel','lostpointercapture'].forEach(name => viewport.addEventListener(name,() => { drag = null; viewport.classList.remove('dragging'); }));
})();
