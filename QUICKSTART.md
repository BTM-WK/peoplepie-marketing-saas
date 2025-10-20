# 🚀 빠른 시작 가이드

## 5분 안에 실행하기

### 1단계: 프로젝트 다운로드

이미 폴더에 있습니다!
```
C:\Users\yso\OneDrive\Documents\WK_피플파이\peoplepie-marketing-saas
```

### 2단계: OpenAI API 키 준비

1. https://platform.openai.com/api-keys 방문
2. API 키 생성
3. 복사해두기

### 3단계: 백엔드 실행

```bash
# 1. 백엔드 폴더로 이동
cd backend

# 2. 패키지 설치
npm install

# 3. .env 파일 생성
# .env.example을 복사하여 .env로 만들고 다음 내용 입력:

OPENAI_API_KEY=sk-your-api-key-here
PORT=3001
JWT_SECRET=your-super-secret-key-change-this

# 4. 서버 실행
npm start
```

✅ 브라우저에서 http://localhost:3001/health 접속하여 확인

### 4단계: 프론트엔드 실행

새 터미널 창을 열고:

```bash
# 1. 프론트엔드 폴더로 이동
cd frontend

# 2. 패키지 설치
npm install

# 3. .env 파일 생성
# 다음 내용으로 .env 파일 생성:

REACT_APP_API_URL=http://localhost:3001

# 4. 앱 실행
npm start
```

✅ 자동으로 http://localhost:3000 이 열립니다!

### 5단계: 로그인

**기본 계정 (데이터베이스 없이 테스트)**
- 이메일: admin@peoplepie.com
- 비밀번호: admin123

### 6단계: 마케팅 계획 생성 테스트

1. 대시보드에서 "새 마케팅 계획 생성" 클릭
2. 2025년 11월 선택
3. 브랜드 2-3개 선택 (예: 메디힐리, 아이온팩)
4. "마케팅 계획 생성" 버튼 클릭
5. 약 30초 대기
6. 결과 확인! 🎉

## 🔧 문제 해결

### 포트 충돌 시
```bash
# 백엔드 포트 변경
PORT=3002

# 프론트엔드는 .env에서 자동 업데이트
REACT_APP_API_URL=http://localhost:3002
```

### OpenAI API 오류
- API 키가 올바른지 확인
- 계정에 크레딧이 있는지 확인
- GPT-4 접근 권한 확인

### 패키지 설치 오류
```bash
# 캐시 삭제 후 재설치
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📦 데이터베이스 설정 (선택사항)

더 많은 기능을 위해 PostgreSQL 설정:

```bash
# 1. PostgreSQL 설치 (Windows)
# https://www.postgresql.org/download/windows/

# 2. 데이터베이스 생성
createdb peoplepie_marketing

# 3. 스키마 적용
psql peoplepie_marketing < backend/schema.sql

# 4. .env 업데이트
DATABASE_URL=postgresql://username:password@localhost:5432/peoplepie_marketing
```

## 🎯 다음 단계

- [ ] 팀원 계정 추가
- [ ] 브랜드 데이터 업데이트
- [ ] 과거 마케팅 데이터 입력
- [ ] 프로모션 템플릿 커스터마이징

## 💡 팁

**더 나은 결과를 위해:**
1. 브랜드 텍스트북을 최신 상태로 유지
2. 과거 성과 데이터 입력
3. 소비자 후기/댓글 데이터 제공
4. 시즌별 트렌드 정보 업데이트

**속도 향상:**
- GPT-4 대신 GPT-3.5-turbo 사용 (저렴하고 빠름)
- 생성된 계획 캐싱
- 브랜드별 템플릿 미리 작성

## 📞 도움이 필요하신가요?

- README.md 참조
- 이슈 생성
- support@peoplepie.com

---

**축하합니다! 이제 AI 마케팅 어시스턴트를 사용할 준비가 되었습니다! 🎉**
