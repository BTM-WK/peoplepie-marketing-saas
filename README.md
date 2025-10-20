# 피플파이 마케팅 계획 자동화 SaaS

AI 기반 마케팅 계획 자동 생성 시스템

## 🚀 주요 기능

- ✅ GPT-4 기반 월별 마케팅 계획 자동 생성
- ✅ 8개 브랜드 데이터베이스 내장
- ✅ 팀원 계정 관리 및 권한 설정
- ✅ 과거 계획 조회/편집
- ✅ Excel/PDF 내보내기

## 📁 프로젝트 구조

```
peoplepie-marketing-saas/
├── backend/           # Node.js + Express 백엔드
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── marketing.js
│   │   └── brands.js
│   └── package.json
├── frontend/          # React 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔧 설치 방법

### 1. 사전 요구사항

- Node.js 16.x 이상
- PostgreSQL 14.x 이상 (선택사항)
- OpenAI API 키

### 2. 백엔드 설정

```bash
cd backend
npm install
```

.env 파일 생성:
```
OPENAI_API_KEY=your_openai_api_key
PORT=3001
JWT_SECRET=your_secret_key
```

백엔드 실행:
```bash
npm start
```

### 3. 프론트엔드 설정

```bash
cd frontend
npm install
```
 `/api/marketing/plans` - 전체 계획 조회
- GET `/api/marketing/plans/:id` - 특정 계획 조회

### 브랜드
- GET `/api/brands` - 전체 브랜드 조회
- GET `/api/brands/:id` - 특정 브랜드 조회

## 🎨 화면 구성

### 1. 로그인 화면
- 이메일/비밀번호 입력
- JWT 토큰 발급

### 2. 대시보드
- 새 마케팅 계획 생성
- 과거 계획 조회
- 브랜드 관리

### 3. 마케팅 계획 생성기
- 기간 선택 (년/월)
- 브랜드 선택 (다중 선택 가능)
- AI 생성 실행
- 결과 미리보기 및 다운로드

### 4. 과거 계획 내역
- 날짜별 정렬
- 상세 보기
- 편집/삭제

## 🔒 보안

- JWT 기반 인증
- 비밀번호 bcrypt 해싱
- CORS 설정
- 환경 변수 분리

## 🚢 배포 가이드

### Vercel (프론트엔드)

```bash
cd frontend
vercel deploy
```

### Heroku (백엔드)

```bash
cd backend
heroku create peoplepie-marketing-api
heroku config:set OPENAI_API_KEY=your_key
git push heroku main
```

### AWS EC2 (전체 스택)

1. EC2 인스턴스 생성 (Ubuntu 22.04)
2. Node.js 설치
3. PM2로 프로세스 관리
4. Nginx 리버스 프록시 설정

상세 가이드는 `/docs/deployment.md` 참조

## 📊 데이터베이스 스키마

### users 테이블
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### marketing_plans 테이블
```sql
CREATE TABLE marketing_plans (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  brands JSONB NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### brands 테이블
```sql
CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  textbook_path VARCHAR(255),
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🧪 테스트

백엔드 테스트:
```bash
cd backend
npm test
```

프론트엔드 테스트:
```bash
cd frontend
npm test
```

## 🔄 업데이트 로그

### v1.0.0 (2025-10-20)
- ✅ 초기 릴리즈
- ✅ GPT-4 기반 마케팅 계획 생성
- ✅ 8개 브랜드 데이터 통합
- ✅ 사용자 인증 시스템

## 🤝 기여

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 지원

- 이메일: support@peoplepie.com
- 문서: https://docs.peoplepie.com

## 📝 라이선스

Copyright © 2025 피플파이. All rights reserved.

---

**Made with ❤️ by PeoplePie Team**
