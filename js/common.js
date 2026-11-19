/* 공통: 문자열/링크 검증, 아이콘, 분류 이름 */
"use strict";
window.HSJUI = {
  escape: value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
  url(value) {
    try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.href : ''; }
    catch { return ''; }
  },
  category: value => ({video:'VIDEO',ai:'AI',design:'DESIGN',team:'TEAM PROJECT'}[value] || value),
  icon(name) {
    const paths = {
      zoom:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6M10 7v6"/>',
      mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
      youtube:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/>',
      instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.01"/>',
      facebook:'<path d="M14 22V12h4l1-4h-5V6c0-2 1-3 3-3h2V0h-3c-4 0-6 2-6 6v2H7v4h3v10"/>',
      x:'<path d="M4 3h5l12 18h-5L4 3ZM20 3 4 21"/>'
    };
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.zoom}</svg>`;
  },
  external(value,label,name='zoom',classes='primary-button') {
    const safe = this.url(value);
    return safe ? `<a class="${classes}" href="${this.escape(safe)}" target="_blank" rel="noopener noreferrer">${this.icon(name)}<span>${this.escape(label)}</span></a>` : '';
  }
};
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
// 없는 이미지는 추가 파일을 요청하지 않고 텍스트 대체로 안내합니다.
document.addEventListener('error', event => {
  const image = event.target;
  if (image instanceof HTMLImageElement) image.alt = '이미지를 불러오지 못했습니다.';
}, true);
