# Job Application Tracker

취업 준비 과정에서 지원한 회사들을 한눈에 관리하기 위해 만든 풀스택 웹 애플리케이션입니다.
여러 회사에 지원하다 보면 어디에 냈는지, 어떤 상태인지 추적하기 어려워서 직접 만들게 됐습니다.

## 주요 기능

- **회원가입 / 로그인** — JWT 기반 인증, 비밀번호는 bcrypt로 해싱
- **지원 현황 관리** — 회사명, 포지션, 지원 상태를 기록하고 수정
- **상태 필터링** — Wishlist / Applied / Screening / Interview / Offer / Rejected / Withdrawn
- **상태 변경 이력** — 상태가 바뀔 때마다 히스토리 기록
- **대시보드 요약** — 상태별 지원 수 집계

## 기술 스택

**Backend**
- Node.js + Express.js
- PostgreSQL (Supabase)
- JWT 인증, bcrypt 비밀번호 해싱
- Controller → Service → Repository 레이어 구조

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Axios 기반 API 클라이언트

**Testing**
- Playwright E2E 테스트

## 프로젝트 구조

```
.
├── backend/
│   ├── src/
│   │   ├── app.js                  # Express 앱 진입점
│   │   ├── config/db.js            # PostgreSQL 연결
│   │   ├── middleware/auth.js      # JWT 인증 미들웨어
│   │   ├── modules/
│   │   │   ├── auth/               # 회원가입 / 로그인
│   │   │   ├── applications/       # 지원 CRUD
│   │   │   └── dashboard/          # 요약 통계
│   │   └── utils/AppError.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx       # 로그인 / 회원가입
│   │   │   └── ApplicationsPage.jsx
│   │   ├── components/
│   │   │   └── CreateApplicationForm.jsx
│   │   ├── context/AuthContext.jsx
│   │   └── api/client.js
│   └── package.json
├── db/
│   ├── migrations/                 # 테이블 DDL SQL
│   └── seeds/                      # 샘플 데이터
├── e2e/
│   └── app.spec.js                 # Playwright E2E 테스트
└── playwright.config.js
```

## 시작하기

### 사전 요구사항

- Node.js 18+
- PostgreSQL (또는 Supabase 계정)

### 1. 데이터베이스 설정

Supabase SQL Editor에서 `db/migrations/` 폴더의 SQL 파일을 순서대로 실행합니다.

```sql
-- 001_create_users.sql
-- 002_create_applications.sql
-- 003_create_status_history.sql
-- ...
```

### 2. 백엔드 실행

```bash
cd backend
npm install
cp .env.example .env
# .env에 DATABASE_URL, JWT_SECRET 입력
npm run dev
```

백엔드는 `http://localhost:3001`에서 실행됩니다.

### 3. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

프론트엔드는 `http://localhost:5173`에서 실행됩니다.

### 4. E2E 테스트 실행

```bash
# 프로젝트 루트에서
npm install
npx playwright install chromium
npx playwright test
```

## 환경 변수

`backend/.env` 파일에 아래 값을 설정합니다.

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
PORT=3001
```

## API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| POST | `/api/auth/register` | 회원가입 |
| POST | `/api/auth/login` | 로그인 |
| GET | `/api/applications` | 지원 목록 조회 (상태 필터 가능) |
| POST | `/api/applications` | 지원 추가 |
| PATCH | `/api/applications/:id` | 지원 수정 |
| DELETE | `/api/applications/:id` | 지원 삭제 |
| GET | `/api/dashboard/summary` | 상태별 요약 통계 |

## 스크린샷

로그인 페이지에서 Sign in / Sign up 탭으로 전환하며 로그인하거나 계정을 생성할 수 있습니다.
로그인 후 지원 목록 페이지에서 회사와 포지션을 추가하고, 상태를 드롭다운으로 바로 변경할 수 있습니다.
