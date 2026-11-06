# PANDA Lab 홈페이지

PANDA Lab(People AND AI Lab, 한양대학교 ERICA 컴퓨터학부) 홈페이지 소스입니다.
[Eleventy](https://www.11ty.dev/)로 만든 정적 사이트이며, `main`에 push하면 GitHub Actions가 자동으로 빌드해 GitHub Pages에 공개합니다.

- 공개 주소: https://panda.hanyang.ac.kr/
- 한국어/영어 전환(KO/EN), PC·태블릿·모바일 지원

## 빠른 시작

[Node.js](https://nodejs.org/) 20 이상이 필요합니다.

```bash
npm install   # 처음 한 번
npm start     # http://localhost:8080/ 미리보기
```

## 수정하기

👉 **[GUIDE.md](GUIDE.md)** — 내용·색상·로고·모바일·페이지 구조를 어디서 어떻게 고치는지 정리한 설명서

- 글 내용: `src/_data/*.yml`
- 디자인: `src/assets/css/style.css` (맨 위 `:root` 색상 변수)

## 배포 설정

- GitHub 저장소 Settings → Pages → Source: **GitHub Actions**
- 도메인: `CNAME` (`panda.hanyang.ac.kr`)

## Credits

- 로고 글꼴: Montserrat (SIL Open Font License) · 본문 글꼴: Pretendard (SIL Open Font License)
- 일러스트: PANDA Lab 포스터 및 도효진 교수 개인 홈페이지
