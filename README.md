# 🛠️ 수예산업 (Suyea Industry) - Frontend

**Atlas Copco 공식 대리점 수예산업**의 공식 웹사이트 프론트엔드 저장소입니다.  
Vite + React 환경으로 구성되었으며, Headless CMS인 Sanity와 연동되어 실시간 데이터(회사 소개, 제품 정보)를 동적으로 렌더링합니다.

- **라이브 주소:** [https://suyea.vercel.app](https://suyea.vercel.app)
- **관리자 시스템:** [https://3z8xucvt.sanity.studio](https://3z8xucvt.sanity.studio)

---

## 🚀 Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS (또는 CSS/SCSS 등 실제 사용한 기술 기재)
- **Data Fetching:** `@sanity/client`, `@sanity/image-url`
- **Deployment:** Vercel

---

## 📦 설치 및 실행 방법

### 1. 의존성 패키지 설치
```bash
npm install

### 2. 로컬 개발서버 실행
npm run dev

### 프로젝트 구조 (Core)
suyea/
├── src/
│   ├── components/     # UI 공통 컴포넌트 (ContactForm, Header 등)
│   ├── sanity.js       # Sanity Client 및 이미지 빌더 설정 파일 ⭐
│   ├── App.jsx         # 메인 로직 및 GROQ 쿼리 데이터 호출
│   └── main.jsx        # 진입점
├── public/             # 정적 자산 (파비콘, 기본 로고 등)
└── vite.config.js      # Vite 설정 파일
