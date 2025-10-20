# 피플파이 마케팅 자동화 프론트엔드

## Vercel 배포 가이드

### 1. Vercel 계정 생성
1. https://vercel.com 접속
2. "Start Deploying" 클릭
3. GitHub 계정으로 로그인

### 2. 프로젝트 Import
1. Dashboard → "Add New..." → "Project"
2. GitHub 저장소 선택
3. "Import" 클릭

### 3. 프로젝트 설정
- **Framework Preset**: `Create React App`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### 4. 환경 변수 설정
Environment Variables 섹션에서:

```
REACT_APP_API_URL=https://peoplepie-marketing-api.onrender.com
```

⚠️ **중요**: 백엔드 배포 후 실제 URL로 변경하세요!

### 5. 배포
"Deploy" 클릭 → 자동 배포 시작 (약 2~3분)

### 6. 배포 완료
- URL: `https://peoplepie-marketing.vercel.app`
- 상태: "Ready"로 표시되면 완료!

### 7. 커스텀 도메인 (선택사항)
Settings → Domains에서 원하는 도메인 추가 가능

---

## 배포 후 테스트

1. 배포된 URL 접속
2. 로그인 화면 확인
3. 마케팅 계획 생성 테스트

---

## 자동 재배포

GitHub에 Push하면 Vercel이 자동으로:
- 새 코드 감지
- 빌드 시작
- 배포 완료

---

## 문제 해결

### 빌드 실패
1. Deployments 탭에서 로그 확인
2. package.json 확인
3. 환경 변수 확인

### API 연결 오류
- 환경 변수의 REACT_APP_API_URL 확인
- 백엔드 URL이 올바른지 확인
- CORS 설정 확인

### 흰 화면만 보임
- 브라우저 콘솔에서 오류 확인
- 네트워크 탭에서 API 호출 확인
