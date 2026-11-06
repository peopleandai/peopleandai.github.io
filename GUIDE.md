# PANDA Lab 홈페이지 수정 설명서

직접 고칠 때 **어느 파일의 어디를 어떻게** 바꾸면 되는지 정리한 문서입니다.
대부분은 **내용(YAML) → `src/_data/`**, **모양(색·크기) → `src/assets/css/style.css`** 두 곳만 보면 됩니다.

---

## 0. 고치기 전에: 내 컴퓨터에서 미리 보기

VS Code에서 이 폴더를 열고 터미널(``Ctrl + ` ``)에서:

```bash
npm install   # 처음 한 번만
npm start     # http://localhost:8080/ 에서 미리보기. 파일을 저장하면 자동 새로고침
```

> 빨간 에러가 나오면 대부분 **YAML 들여쓰기**(스페이스 개수) 문제입니다. → [7. 문제 해결](#7-문제-해결)

---

## 1. 폴더 지도

```
.
├─ src/
│  ├─ _data/                 ← ★ 글 내용 (여기만 고쳐도 대부분 해결)
│  │   ├─ site.yml           연구실 이름·이메일·주소·모집 배너 on/off
│  │   ├─ nav.yml            상단 메뉴
│  │   ├─ research.yml       연구 비전·핵심 가치·연구 주제
│  │   ├─ people.yml         교수·학생·졸업생
│  │   ├─ publications.yml   논문
│  │   ├─ news.yml           소식
│  │   └─ join.yml           함께하기(모집) 페이지
│  │
│  ├─ index.njk              홈 화면 구조
│  ├─ research.njk / people.njk / publications.njk / news.njk / join.njk / 404.njk
│  │
│  ├─ _includes/
│  │   ├─ base.njk           모든 페이지 공통 틀 (<head>, 헤더, 푸터 포함)
│  │   ├─ macros.njk         반복되는 조각 (논문 한 줄, 멤버 카드, 모집 배너 등)
│  │   └─ partials/
│  │       ├─ header.njk     상단 메뉴바
│  │       ├─ footer.njk     하단 정보
│  │       ├─ wordmark.njk   PANDA 로고 글자
│  │       └─ icons.njk      아이콘 모음
│  │
│  └─ assets/
│      ├─ css/style.css      ★ 디자인 전체 (색·크기·모바일)
│      ├─ js/main.js         KO/EN 전환, 모바일 메뉴, 논문 필터
│      ├─ img/               이미지 (people/, research/ 하위 폴더)
│      └─ fonts/             로고 글꼴(Montserrat)
│
├─ eleventy.config.js        빌드 설정 (보통 건드릴 일 없음)
├─ .github/workflows/deploy.yml  push하면 자동 배포
└─ CNAME                     도메인 (panda.hanyang.ac.kr)
```

`.njk` 파일은 HTML에 `{{ 변수 }}`, `{% for %}` 같은 문법을 더한 것(Nunjucks)입니다.

---

## 2. 내용 고치기 (YAML)

### 2-1. 한국어 / 영어

```yaml
summary:
  ko: 한국어 문장
  en: English sentence
```

두 언어를 적으면 오른쪽 위 KO/EN 버튼으로 바뀝니다. 한쪽만 적으면 두 언어 모두 그 문장이 나옵니다.

**규칙:** 화면에 보이는 글은 템플릿(`.njk`)에서 항상 `{{ 값 | t | safe }}`로 출력합니다. 그래야 KO 화면엔 한국어만, EN 화면엔 영어만 나옵니다.
템플릿에 글을 직접 쓸 때는 `<span class="l-ko">한국어</span><span class="l-en">English</span>`처럼 두 언어를 함께 적습니다.
(논문 제목·저자·학회 이름 같은 고유명사는 원문 그대로 두었습니다.)

### 2-2. 자주 하는 작업

| 하고 싶은 일 | 파일 | 방법 |
|---|---|---|
| 소식 추가 | `news.yml` | 블록 하나 복사해서 날짜·내용 수정. 날짜순 자동 정렬, 홈에는 최신 3개 |
| 논문 추가 | `publications.yml` | 블록 복사. `topics:`에 연구 주제 `id`를 적으면 연구 페이지 "관련 논문"·논문 필터에 자동 연결 |
| 학생 추가 | `people.yml` | 해당 그룹 `members:` 아래에 추가. 사진은 `src/assets/img/people/`에 넣고 `photo:`에 파일 이름 |
| 연구 주제 추가 | `research.yml` | `topics:`에 블록 추가. 이미지는 `src/assets/img/research/` |
| 끝난 연구 주제 | `research.yml` | `status: past`로 바꾸면 "이전 연구"로 이동 |
| 모집 배너 끄기 | `site.yml` | `recruiting: false` |
| 메뉴 순서/이름 | `nav.yml` | 순서 바꾸기, `ko`/`en` 수정 |
| 논문에서 굵게 할 이름 | `site.yml` | `highlight_authors:`에 이름 추가 |

각 YAML 파일 맨 위에 **복사해서 쓰는 예시**가 주석(`#`)으로 있습니다.

### 2-3. 색 이름 (`color:`)

`research.yml`, `people.yml` 등에서 쓰는 `color:` 값은 아래 5개 중 하나입니다.

| 값 | 실제 색 | 바꾸는 곳 (`style.css` 맨 위) |
|---|---|---|
| `navy` | 플럼 | `--c-navy` |
| `green` | 세이지 그린 | `--c-green` |
| `blue` | 더스티 블루 | `--c-blue` |
| `yellow` | 샌드 | `--c-yellow` |
| `red` | 테라코타 | `--c-red` |

실제 색은 `style.css` `:root`의 `--c-*` 값입니다.

---

## 3. 디자인 고치기 (`src/assets/css/style.css`)

### 3-1. 색상 — `style.css` 맨 위 `:root { ... }`만 바꾸면 사이트 전체에 반영

기본은 **흰 바탕 + 다크 네이비**이고, 하이라이트 2색(샌드, 웜그레이)은 꼭 필요한 곳에만 씁니다.

| 변수 | 현재 값 | 쓰이는 곳 |
|---|---|---|
| `--primary` | `#141B34` 다크 네이비 | 제목, 버튼, 푸터 배경 |
| `--accent` | `#262B4A` | 링크, 강조 글자 |
| `--tint` | `#DCBC98` 샌드 | **하이라이트** — 로고의 AND |
| `--tint-soft` | `#E8E5DD` 웜그레이 | **하이라이트** — 태그·키워드·모집 배너 배경 |
| `--bg-alt` | `#F8F7F4` | 거의 흰색 — 교차 섹션, 서브페이지 제목 띠 |
| `--ink` / `--muted` | `#1F2437` / `#5F6478` | 본문 글자 / 보조 글자 |
| `--line` | `#E6E4DE` | 구분선, 카드 테두리 |
| `--hero-*` | | 홈 배너 배경·글자 (지금은 흰 바탕) |
| `--footer-*` | | 푸터 배경·글자 |
| `--logo-1` / `-2` / `-3` | 선명한 블루 `#0474C4` / 중간 블루 `#5379AE` / 딥 블루 `#06457F` | 로고 **P**(People) / **AND** / **A**(AI). |
| `--logo-footer-*` | `#5AA7E6` / `#A8C4EC` / `#7FA3DB` | 네이비 푸터 위 로고 색 (밝은 블루) |
| `--hl-blue` `--hl-clay` `--hl-sage` `--hl-sand` `--hl-plum` | 블루 / 테라코타 / 세이지 / 샌드 / 플럼 | **포인트 5색** — 핵심 가치 아이콘, 연구 카드 윗선, 로고 |
| `--c-navy` … `--c-red` | 위 포인트 5색에 연결 | yml의 `color:` 값 (위 2-3) |

예) 하이라이트를 더 진한 샌드로: `--tint: #C9A57C;`

### 3-3. 그 밖에 자주 바꾸는 값

| 바꾸고 싶은 것 | 찾을 곳 (Cmd+F로 검색) | 바꿀 값 |
|---|---|---|
| 모서리 둥글기 | `--radius` | `8px` → `0`(각진) / `16px`(더 둥글게) |
| 전체 폭 | `--container` | `1120px` |
| 본문 글꼴 | `--font` | 맨 앞 글꼴 이름 |
| 홈 배너 로고 크기 | `.hero-wordmark {` | `clamp(최소, 화면비례, 최대)` |
| 배너 높이 | `.hero {` 의 `height` | `clamp(420px, 42.4vw, 640px)` (최소 420px, 화면 폭의 42.4% = 사진 원래 비율, 최대 640px) |
| 배너 사진 바꾸기 | `src/assets/img/hero-photo.jpg` | 같은 이름으로 덮어쓰기 (가로 2400px 정도, 가로로 긴 사진). 사진이 배너 가로 전체를 채움 |
| 사진에서 보여줄 위치 | `.hero-photo {` 의 `object-position` | `70% center` (화면이 좁아져 사진 옆이 잘릴 때 어느 쪽을 남길지. 0% = 왼쪽, 100% = 오른쪽) |
| 글 뒤 흰 그라데이션 | `.hero::before {` 의 `background` | `.95`/`.88` = 흰색 진하기, `32%`/`58%` = 어디까지 덮을지 |
| 배너 글 폭 | `.hero-content {` 의 `max-width` | `500px` |
| 헤더 로고 크기 | `.brand {` | `font-size: 22px` |
| 섹션 사이 간격 | `.section {` | `padding: 68px 0` |
| 섹션 제목 크기 | `.sec-tab {` | `font-size: 26px` |

### 3-4. CSS 파일 구성 (위에서 아래 순서)

파일 안에 `/* ---------- 이름 ---------- */` 주석으로 구역이 나뉘어 있습니다. 구역 이름으로 검색하세요.

| 구역 | 내용 |
|---|---|
| `:root` | 색·글꼴·크기 변수 |
| Base | 기본 글자, 링크, 공통 레이아웃 |
| Wordmark | PANDA LAB 로고 글자 |
| Header | 상단 메뉴바 |
| Buttons / links | 버튼, 칩(작은 태그) |
| Hero (home) | 홈 상단 배너 |
| Page hero | 서브페이지 상단 제목 띠 |
| Sections | 섹션 제목, 카드 공통 |
| Vision / Topic cards / Build / methods | 홈 화면 블록들 |
| News / Publications | 소식·논문 목록 |
| Research page / People / Recruit / Join | 각 페이지 전용 |
| Footer / 404 | 하단, 404 페이지 |
| Responsive | **모바일·태블릿** 설정 (아래 4번) |

---

## 4. 모바일 화면

`style.css` 맨 아래 **Responsive** 구역에서 화면 폭에 따라 바뀝니다.

| 조건 | 대상 | 주요 변화 |
|---|---|---|
| `max-width: 1080px` | 작은 노트북 | 메뉴 간격 축소, 가치 아이콘 3열 |
| `max-width: 960px` | 태블릿 | 햄버거 메뉴(☰)로 전환, 2열 → 1열, 배너 세로 배치 |
| `max-width: 640px` | 휴대폰 | 글자·여백 축소, 카드 안쪽 여백 축소 |

모바일에서만 무언가를 바꾸려면 해당 `@media (...) { ... }` 블록 **안에** 규칙을 추가하세요.

```css
@media (max-width: 640px) {
  .hero-wordmark { font-size: 36px; }   /* 휴대폰에서 로고 더 작게 */
}
```

**모바일 확인 방법:** 크롬에서 미리보기를 열고 `Cmd + Option + I` → 왼쪽 위 휴대폰 아이콘(Toggle device toolbar) → iPhone 등 선택.

---

## 5. 로고

- 로고 글자 구성: `src/_includes/partials/wordmark.njk` — 윗줄 `P` · `AND` · `A` · `LAB`, 아랫줄 막대 + 작은 글씨 `People AND AI`
  - 아랫줄 글씨 바꾸기: `wordmark.njk`의 `<span class="wm-tag">` 안 글자
  - 막대 두께·색: `style.css`의 `.wm-bar {` (`height: .13em`, `background`) / 작은 글씨 크기·간격: `.wm-tag {` (`font-size: max(.2em, 7px)`, `letter-spacing`)
  - 헤더·푸터·홈 배너·404 모두 이 파일 하나를 씁니다.
- 글자 색: 3-1 표의 `--logo-*` 변수 (`LAB`은 네이비 `--primary`, 푸터에서는 흰색)
- 글꼴: Montserrat ExtraBold(800) — `src/assets/fonts/montserrat-*.woff2`, `style.css` 맨 위 `@font-face`
  - 다른 글꼴로 바꾸려면 `--font-logo`의 맨 앞 이름을 바꾸고, 글꼴 파일을 `fonts/`에 넣은 뒤 `@font-face`도 바꿉니다.
- 크기: 헤더 `.brand {`, 푸터 `.footer-brand .wordmark {`, 홈 배너 `.hero-wordmark {`
- 브라우저 탭 아이콘: `src/assets/img/favicon.svg` (네이비 바탕 + 블루 P). PNG(`favicon-32.png`, `apple-touch-icon.png`)는 이 SVG를 같은 모양으로 저장한 것이라, SVG를 바꾸면 PNG도 다시 만들어야 합니다.

---

## 6. 페이지 구조 바꾸기

- **홈 화면 순서/구성**: `src/index.njk` — `<section>` 하나가 화면의 한 덩어리입니다. 순서를 바꾸려면 `<section> ... </section>` 통째로 잘라 옮기면 됩니다.
- **반복 조각** (논문 한 줄, 멤버 카드, 모집 배너 등): `src/_includes/macros.njk` — 한 번 고치면 쓰이는 모든 곳에 반영됩니다.
- **헤더/푸터**: `src/_includes/partials/header.njk`, `footer.njk`

### 새 페이지 추가 (예: Teaching)
1. `src/news.njk`를 복사해 `src/teaching.njk`로 만들고, 맨 위 `permalink: /teaching/`과 제목을 바꿉니다.
2. `src/_data/nav.yml`에 메뉴 항목을 추가합니다.

---

## 7. 문제 해결

| 증상 | 원인 / 해결 |
|---|---|
| `npm start`에서 YAML 에러 | 들여쓰기는 **스페이스 2칸**, 탭 금지. `:` 뒤에 한 칸 띄우기. 문장에 `:`나 `#`이 있으면 `"따옴표"`로 감싸기 |
| 이미지가 안 보임 | 파일 이름 대소문자 확인 (`Photo.JPG` ≠ `photo.jpg`), 폴더 위치 확인 |
| 고쳤는데 화면이 그대로 | 브라우저 강력 새로고침 `Cmd + Shift + R` |
| 사이트에 반영이 안 됨 | GitHub 저장소 **Actions** 탭에서 빨간 ✗인지 확인 → 눌러서 에러 메시지 확인 |

---

## 8. 사이트에 공개하기

```bash
git add .
git commit -m "무엇을 바꿨는지 한 줄"
git push
```

push하면 GitHub Actions가 자동으로 빌드해서 1~2분 뒤 https://panda.hanyang.ac.kr/ 에 반영됩니다.
GitHub 웹사이트에서 파일을 직접 고쳐 Commit해도 똑같이 반영됩니다.
