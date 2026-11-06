# PANDA Lab 홈페이지

PANDA Lab(People AND AI Lab, 한양대학교 ERICA 컴퓨터학부) 홈페이지 소스입니다.
[Eleventy](https://www.11ty.dev/)로 만든 정적 사이트이고, GitHub에 올리면 GitHub Actions가 자동으로 빌드해서 GitHub Pages에 공개합니다.

- 공개 주소: `https://panda.hanyang.ac.kr/`
- 한국어/영어 전환(KO/EN 버튼), PC·태블릿·모바일 화면 모두 지원

---

## 1. 배포

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 빌드해서 GitHub Pages에 공개합니다.
공개 주소는 `https://panda.hanyang.ac.kr/` (`CNAME` 파일, Settings → Pages → Source는 **GitHub Actions**).

---

## 2. 내용 고치기 — 대부분 `src/_data/` 폴더의 YAML 파일만 고치면 됩니다

| 고칠 내용 | 파일 |
|---|---|
| 연구실 이름, 이메일, 주소, 모집 배너 on/off | `src/_data/site.yml` |
| 상단 메뉴 | `src/_data/nav.yml` |
| 연구 비전, 핵심 가치, 연구 주제 카드 | `src/_data/research.yml` |
| 교수 소개, 학생/졸업생 | `src/_data/people.yml` |
| 논문 | `src/_data/publications.yml` |
| 소식 | `src/_data/news.yml` |
| 함께하기(모집) 페이지 | `src/_data/join.yml` |

각 파일 맨 위에 **복사해서 쓰는 예시**가 주석으로 적혀 있습니다.

### 한국어 / 영어
```yaml
summary:
  ko: 한국어 문장
  en: English sentence
```
처럼 두 언어를 적으면 KO/EN 버튼으로 바뀝니다. 한쪽만 적으면 두 언어 모두 그 문장이 보입니다.

### 자주 하는 작업
- **소식 추가**: `news.yml` 에 블록 하나 추가 (날짜만 맞으면 자동 정렬, 홈에는 최신 3개)
- **논문 추가**: `publications.yml` 에 블록 추가. `topics:` 에 연구 주제 id를 적으면 연구 페이지의 "관련 논문"과 논문 필터에 자동으로 연결됩니다.
- **학생 추가**: `people.yml` 의 해당 그룹 `members:` 아래에 추가하고, 사진은 `src/assets/img/people/` 에 넣습니다. 멤버가 없는 그룹은 화면에 나타나지 않습니다.
- **연구 주제 추가**: `research.yml` 의 `topics:` 에 블록 추가, 이미지는 `src/assets/img/research/` 에. 끝난 주제는 `status: past` 로 바꾸면 "이전 연구"로 이동합니다.
- **색상 바꾸기**: `src/assets/css/style.css` 맨 위 `:root { ... }` 의 색상 값만 바꾸면 사이트 전체에 반영됩니다.

### 새 페이지 추가 (예: Teaching)
1. `src/news.njk` 를 복사해 `src/teaching.njk` 를 만들고 `permalink: /teaching/` 과 제목을 바꿉니다.
2. `src/_data/nav.yml` 에 메뉴 항목을 추가합니다.

---

## 3. 내 컴퓨터에서 미리 보기 (선택)

[Node.js](https://nodejs.org/) (20 이상)가 필요합니다.
```bash
npm install      # 처음 한 번
npm start        # → http://localhost:8080/ 에서 미리보기 (고치면 자동 새로고침)
```

---

## 폴더 구조
```
.
├─ src/
│  ├─ _data/          ← 내용 (YAML)
│  ├─ _includes/      ← 공통 레이아웃, 헤더/푸터, 재사용 조각(macros.njk)
│  ├─ assets/         ← CSS, JS, 이미지, 폰트
│  ├─ index.njk       ← 홈
│  ├─ research.njk / people.njk / publications.njk / news.njk / join.njk
│  └─ 404.njk
├─ eleventy.config.js ← 빌드 설정
└─ .github/workflows/deploy.yml ← GitHub Pages 자동 배포
```

## Credits
- 로고 글꼴: Fredoka (SIL Open Font License) · 본문 글꼴: Pretendard (SIL Open Font License)
- 일러스트: PANDA Lab 포스터 및 도효진 교수 개인 홈페이지
