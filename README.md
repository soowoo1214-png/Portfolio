# HSJ PORTFOLIO · Light

기존 HSJ-PORTFOLIO-PROJECTS-EDITABLE의 구성과 동작을 유지한 수정본입니다.

## 실행
1. ZIP을 모두 압축 해제합니다.
2. VS Code에서 이 폴더를 엽니다.
3. index.html을 브라우저에서 열거나, 터미널에서 node preview.cjs를 실행하고 http://127.0.0.1:5173을 엽니다.

## 수정 위치
- data/projects.js: 작품 제목, 분류, 상세 미디어, 설명과 연락처
- MY-PORTFOLIO-FILES/01-thumbnails/: 분류별 썸네일
- MY-PORTFOLIO-FILES/02-design-images/: 분류별 상세 이미지
- MY-PORTFOLIO-FILES/03-videos/: 분류별 영상
- MY-PORTFOLIO-FILES/04-home-video/: 기존 HOME 배경 영상과 대체 이미지
- MY-PORTFOLIO-FILES/05-branding/: 기존 파비콘
- css/style.css: 맨 위 색상 변수 및 화면별 스타일
- js/main.js: 목록, 분류, 페이지 이동, 이미지 팝업
- js/detail.js: 영상/UI·UX 상세 화면
- js/common.js: 공통 아이콘, 링크, 이미지 오류 처리
- docs/CONTENT-MAP.md: 원본 파일과 실제 연결 경로

## 작품 추가
파일을 해당 폴더에 넣고 data/projects.js의 비슷한 객체를 복사해 고유한 id와 경로를 수정합니다. 파일만 넣어서는 카드가 생기지 않습니다. images 배열에 여러 경로를 넣으면 화살표·스와이프로 넘깁니다. 기존 파일과 이름/확장자를 똑같이 맞춰 교체하면 코드 변경 없이 갱신됩니다.

## 이번 수정
흰 배경, 레몬크림 버튼/CONTACT, 라벤더 필터를 적용했습니다. ABOUT 메뉴·구역과 팀프로젝트 탭·데이터를 제거했습니다. 영상 8개, AI 6개, 디자인 7개의 제공 자료를 연결했습니다. 카드뉴스는 제공된 긴 PNG 원본을 스크롤로 봅니다. AI 광고는 확인된 LIME TIDE MP4로 재생됩니다.

본인의 역할·도구·외부 링크·연락처는 제공되지 않아 만들지 않았습니다. data/projects.js에서 입력하면 됩니다. HOME은 data/projects.js의 hero.projectIds에 등록된 실제 작품을 순환 재생합니다. startSeconds부터 clipSeconds 동안 음소거 재생한 뒤 다음 작품으로 이동합니다. vendor의 Bootstrap MIT 라이선스를 보존하세요.

팝업 동작은 js/gallery.js에 분리했습니다. 화면 구역은 HTML, 작품 내용은 data, 색상은 CSS에서 각각 수정하세요.

## 영상 중심 수정
- js/hero.js: 실제 작품 순환, 재생/정지, 동작 줄이기 설정
- 영상 썸네일 14개: 영상썸네일.zip의 재생표시 없는 이미지로 교체
- 북커버: 첨부 Frame 107.png 원본 1200×5598을 재압축 없이 사용
- 팝업 확대 아이콘: 원본 픽셀 크기로 표시 (임의 160% 확대 제거)
- YouTube 등 미등록 외부 채널 안내, 빈 설명 구역, 팝업 사용법 문구 제거
