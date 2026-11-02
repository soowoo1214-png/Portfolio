# HSJ 포트폴리오 — 기획안 기준 수정본

`docs/hsj-plan.pdf`의 확정된 문구, 분류, 와이어프레임과 색상에 맞춰 수정했습니다. 이전에 전달한 임의 구성의 ZIP 대신 이 프로젝트를 사용하세요.

**실제 작품 파일·최종 소개·연락처·YouTube/Figma 링크는 아직 제공되지 않았습니다. 포함된 이미지와 영상은 교체용 예시입니다.** PDF에 기록된 작품명은 유지했으며, 실제 작업물이나 성과로 오해되지 않도록 예시 표시를 붙였습니다. PDF에서 아직 확정하지 않은 고해상도 시안이 따로 있다면 추가 대조가 필요합니다.

## 1. Windows에서 바로 열기

1. ZIP 오른쪽 클릭 → **모두 압축 풀기**.
2. 압축을 푼 폴더에서 **index.html**을 Edge 또는 Chrome으로 엽니다.
3. Bootstrap·이미지·샘플 영상이 폴더에 포함되어 오프라인에서도 동작합니다.

ZIP 안에서 직접 열지 말고 압축을 먼저 풀어 주세요.

## 2. VS Code에서 수정하기

1. VS Code → **파일 → 폴더 열기** → 압축을 푼 프로젝트 폴더 선택.
2. `README.md`를 열고 `Ctrl+Shift+V`를 누르면 안내를 편하게 볼 수 있습니다.
3. 파일을 수정한 뒤 `Ctrl+S`, 브라우저에서 `Ctrl+R`로 새로 고침합니다.
4. 자동 새로 고침은 VS Code의 Live Server 확장을 사용해도 됩니다.

Node.js가 설치되어 있으면 터미널에서 아래 명령으로도 열 수 있습니다. 추가 패키지 설치는 필요하지 않습니다.

```powershell
node preview.cjs
```

`http://127.0.0.1:5173` 접속. 종료는 `Ctrl+C`입니다.

## 3. 기획안과 같은 파일 구조

```text
index.html                 HOME / WORKS / ABOUT / CONTACT
video.html                 영상 상세 페이지
figma.html                 앱 디자인 상세 페이지
css/style.css              색상·배치·반응형·등장 효과
js/                        동작 코드
data/projects.js           ★ 작품 데이터·소개·연락처
MY-PORTFOLIO-FILES/         ★ 사용자 교체 전용
  01-thumbnails/           1080×1080 정사각형 썸네일
  02-design-images/        원본 디자인·목업·긴 이미지
  03-videos/               실제 작업 영상
  04-home-video/           HOME 영상·정적 대체 이미지
  05-branding/             로고·파비콘
docs/hsj-plan.pdf           사용자 제공 원본 기획안
docs/PLAN-CHECKLIST.md      원안과의 대조표
vendor/                    Bootstrap 5.3.8 및 라이선스
README.md                  사용 안내
QA.md                      검증 범위
```

같은 이름과 경로의 파일을 교체하면 코드 수정 없이 바뀝니다. **파일 확장자가 바뀌면 경로도 수정**해야 합니다. SVG를 JPG로 바꾸면서 이름만 `.svg`로 유지하지 마세요. 파일명은 영문 소문자·숫자·하이픈을 권장합니다.

## 4. 내 작품으로 교체하는 순서

1. `MY-PORTFOLIO-FILES` 안의 해당 폴더에 실제 파일을 넣습니다.
2. `data/projects.js`에서 해당 작품의 경로와 설명을 수정합니다.
3. 모든 미디어가 실제 작품으로 교체된 항목만 `sample: false`로 바꿉니다.
4. 소개·이메일·SNS도 같은 파일 위쪽 `profile`에서 수정합니다.

현재 첫 페이지 순서는 기획안과 같습니다: **동백커피 → 동래읍성축제 → 부산 관광 → 리조트 → LifePick → 앱 디자인**. 뒤쪽에는 기획안에 나온 다른 작품과 디자인 등록 예시가 있습니다. 불필요한 예시 항목은 삭제하세요.

## 5. category와 type의 차이

| 필드 | 값 | 뜻 |
|---|---|---|
| category | video | VIDEO 분류 |
| category | ai | AI CREATIVE 분류 |
| category | design | DESIGN 분류 |
| type | video | 영상 상세 페이지로 이동 |
| type | design | 이미지 팝업 열기 |
| type | figma | Figma 상세 페이지로 이동 |

**앱 디자인은 `category: "design"`, `type: "figma"`입니다. UI/UX 대분류를 따로 만들지 않습니다.** AI를 보조로만 쓴 일반 영상은 `category: "video"`를 유지하고 `tags: ["AI-Assisted"]`를 추가할 수 있습니다. 중복 등록하지 않아도 됩니다.

## 6. 새 영상 추가 예시

`projects` 배열에 아래처럼 한 항목을 추가하세요. 객체 사이 쉼표를 잊지 마세요.

```javascript
{
  id: "my-video",                 // 중복 없는 영문 ID
  title: "실제 작품 제목",
  category: "video", type: "video",
  year: "2026",                   // 실제 제작 연도만 입력
  thumbnail: "MY-PORTFOLIO-FILES/01-thumbnails/my-video.jpg",
  description: "실제 작업의 짧은 개요",
  role: "실제 담당 역할",
  tools: "실제 사용한 도구",
  video: "MY-PORTFOLIO-FILES/03-videos/my-video.mp4",
  youtube: "",                    // 실제 YouTube URL
  tags: [],
  process: [],
  sample: false
},
```

로컬 영상이 없다면 `video: ""`로 두고 실제 YouTube URL을 넣습니다. 영상 상세는 제목 → 플레이어/링크 → OVERVIEW → MY ROLE → TOOLS 순서입니다. 16:9 영상과 9:16 영상 모두 원본 화면비를 유지합니다.

선택적 제작 과정은 `process` 배열에 넣습니다.

```javascript
process: [
  { title: "촬영 과정", description: "실제 과정 설명", image: "MY-PORTFOLIO-FILES/02-design-images/process.jpg" }
],
```

폴더에 파일만 넣어서는 카드가 추가되지 않습니다. 반드시 데이터 항목도 추가하세요.

## 7. 디자인 팝업과 Figma

일반 디자인은 `images`에 파일을 순서대로 넣습니다.

```javascript
images: [
  "MY-PORTFOLIO-FILES/02-design-images/front.jpg",
  "MY-PORTFOLIO-FILES/02-design-images/back.jpg"
],
```

- 팝업 상단은 제목과 X만 표시합니다.
- 좌우 마우스 드래그·터치 스와이프·꺾쇠 화살표로 슬라이드를 바꿉니다.
- 세로로 긴 이미지는 원본 비율로 스크롤합니다.
- **확대** 후 마우스 드래그로 상하좌우 이동합니다. 터치에서는 손가락으로 스크롤합니다.
- PC 화살표는 가장자리 버튼 영역에 마우스를 올리거나 키보드 초점을 옮기면 나타납니다. 터치 화면에서는 계속 표시됩니다.
- `Esc`로 닫으면 원래 카드로 초점이 돌아갑니다.

Figma는 `mockup`에 대표 목업, `images`에 긴 설명 이미지, `figma`에 실제 프로토타입 URL을 넣습니다. **목업 → PROJECT OVERVIEW → DESIGN DETAILS → INTERACTIVE PROTOTYPE** 순서입니다. 프로토타입 영상 플레이어는 없습니다. 링크가 비어 있으면 준비 중 안내가 나타납니다.

## 8. HOME 영상 바꾸기

확정 문구는 이미 원안대로 들어 있습니다.

- VIDEO EDITOR & AI CREATOR
- Ideas into Motion.
- 아이디어를 영상으로, 상상을 콘텐츠로.
- VIEW MY WORK

현재 `04-home-video/highlight-sample.mp4`은 **20초짜리 도식 샘플**입니다. 실제 작품 몽타주가 아닙니다. 기획안대로 여러 실제 작품을 교차 편집한 **18~24초 하이라이트**로 교체하세요.

`index.html`의 `<source>`를 실제 파일과 형식으로 바꿉니다.

```html
<source src="MY-PORTFOLIO-FILES/04-home-video/highlight.mp4" type="video/mp4">
```

정적 대체 이미지 경로는 Hero의 `<img src>`와 `<video poster>` 두 군데를 함께 수정합니다. 배경은 무음·반복·인라인 재생이며 브라우저가 자동 재생을 제한하면 정적 이미지가 남습니다. “동작 줄이기”에서는 처음부터 멈춥니다. 하단 재생/정지 아이콘으로 제어할 수 있습니다.

## 9. 소개·연락처

`profile.about`, `profile.capabilities`, `profile.tools`에 실제 내용을 입력하세요. 최종 소개 문구가 없어 임의의 자기소개나 역량을 만들지 않았습니다. `index.html`의 소개 입력 안내는 작성 완료 후 제거하세요.

`profile.email`, `youtube`, `instagram`, `figma`에 실제 주소를 넣으면 아이콘 링크가 연결됩니다. 비어 있으면 클릭할 수 없는 “미등록” 표시가 나옵니다. 문의 폼·이력서 페이지는 없습니다. 이메일은 `mailto:` 방식입니다.

## 10. 화면·디자인 규칙

- PC ≥992px: 3열×2행 / 태블릿 576~991px: 2열×3행 / 모바일 ≤575px: 1열×4행.
- 모바일 숫자 페이지 버튼은 최대 2개. 나머지는 이전/다음 화살표로 이동합니다.
- 페이지 번호에는 배경을 넣지 않고 활성 번호 아래에만 얇은 밑줄을 표시합니다.
- 카드 정사각형, 모서리 8px, 간격 24px. 좌→우 약 0.2초 간격 등장.
- 색상은 `#1E1B28`, `#2B2538`, `#CBB8FF`, `#81709F`, `#FFFFFF`입니다.
- 폰트는 PDF에서 제안된 Montserrat/Pretendard를 우선 지정했습니다. 폰트 파일은 미포함이며 설치되어 있지 않으면 맑은 고딕/Arial 등 시스템 산세리프를 사용합니다. 별도 폰트 파일을 배포할 때 해당 라이선스와 `@font-face`를 함께 설정하세요.
- Bootstrap 5.3.8은 기존 제작 시 공식 안정 버전으로 확인하여 포함한 버전을 유지했습니다. 라이선스는 `vendor/BOOTSTRAP-LICENSE.txt`입니다.

## 11. 공개 전 확인

실제 미디어, 역할, 연도, 소개, 이메일, SNS를 확인하세요. YouTube/Figma 공유 권한도 확인해야 합니다. 모든 샘플을 교체했다면 메인 예시 안내와 메타 설명도 함께 수정하세요. 이 프로젝트는 로컬 ZIP이며 아직 웹에 배포하지 않았습니다.


## 작품 관리
`data/projects.js`의 `window.HSJ.projects` 배열에서 작품을 추가, 삭제, 수정합니다. `index.html`은 수정할 필요가 없습니다.
