# 피플파이 마케팅 자동화 백엔드

## Render 배포 가이드

### 1. Render 계정 생성
1. https://render.com 접속
2. "Get Started for Free" 클릭
3. GitHub 계정으로 로그인 (추천)

### 2. 새 Web Service 생성
1. Dashboard → "New +" → "Web Service" 클릭
2. GitHub 저장소 연결
3. 또는 "Public Git repository" 선택하고 저장소 URL 입력

### 3. 설정
- **Name**: `peoplepie-marketing-api`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Plan**: `Free`

### 4. 환경 변수 설정
Settings → Environment → Add Environment Variable:

```
OPENAI_API_KEY=여기에_실제_OpenAI_API_키_입력

JWT_SECRET=peoplepie_marketing_jwt_secret_key_2025_very_secure_random_string

PORT=3001

NODE_ENV=production
```

⚠️ **중요**: OpenAI API 키는 실제 배포 시 Render 대시보드에서 직접 입력하세요!

### 5. 배포
"Create Web Service" 클릭 → 자동 배포 시작

### 6. 배포 완료
- URL: `https://peoplepie-marketing-api.onrender.com`
- 상태: "Live"로 표시되면 완료!

### 7. 테스트
```
GET https://peoplepie-marketing-api.onrender.com/health
```

---

## 주의사항

### 무료 플랜 제한
- 15분 동안 요청이 없으면 서버 슬립
- 첫 요청 시 30초 정도 웨이크업 시간 필요
- 월 750시간 무료 (충분함)

### CORS 설정
프론트엔드 도메인을 허용하도록 설정되어 있음

---

## 문제 해결

### 배포 실패 시
1. Logs 탭에서 오류 확인
2. package.json 확인
3. 환경 변수 확인

### API 키 오류
- Environment Variables에서 OPENAI_API_KEY 재확인
- 공백이나 특수문자 확인
