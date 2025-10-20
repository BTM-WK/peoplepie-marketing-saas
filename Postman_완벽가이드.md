# Postman 설치 및 사용 가이드

## 1단계: 다운로드 및 설치

### 공식 사이트에서 다운로드
1. 웹브라우저에서 접속: https://www.postman.com/downloads/
2. "Download for Windows" 버튼 클릭
3. 다운로드된 파일 실행 (Postman-win64-Setup.exe)
4. 설치 진행 (자동으로 설치됨)

### 초기 설정
1. Postman 실행
2. 회원가입/로그인 화면이 나오면:
   - Option 1: 구글 계정으로 로그인 (간편)
   - Option 2: "Skip and go to the app" 클릭 (로그인 없이 사용)

---

## 2단계: Postman 화면 구성 이해하기

```
┌─────────────────────────────────────────────────────────────┐
│  File  Edit  View  Help                    [계정] [설정]     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  [New] [Import]                    [My Workspace ▼]         │
│                                                               │
├──────────────────┬──────────────────────────────────────────┤
│                  │                                           │
│  📁 Collections  │  ┌────────────────────────────────────┐  │
│  📝 History      │  │ GET ▼  [URL 입력창]         [Send] │  │
│  🌍 Environments │  ├────────────────────────────────────┤  │
│                  │  │ Params  Headers  Body  Tests  etc  │  │
│  [+ New]         │  ├────────────────────────────────────┤  │
│                  │  │                                     │  │
│                  │  │  [요청 내용 입력 영역]              │  │
│                  │  │                                     │  │
│                  │  └────────────────────────────────────┘  │
│                  │                                           │
│                  │  ┌────────────────────────────────────┐  │
│                  │  │ Body  Cookies  Headers  Test Results│  │
│                  │  ├────────────────────────────────────┤  │
│                  │  │                                     │  │
│                  │  │  [응답 결과 표시 영역]              │  │
│                  │  │                                     │  │
│                  │  └────────────────────────────────────┘  │
└──────────────────┴──────────────────────────────────────────┘
```

### 주요 영역 설명

1. **왼쪽 사이드바**
   - Collections: 저장한 API 요청 모음
   - History: 과거 실행한 요청 기록

2. **중앙 상단 (요청 영역)**
   - HTTP 메서드 선택 (GET, POST 등)
   - URL 입력창
   - Send 버튼

3. **중앙 하단 (응답 영역)**
   - 서버로부터 받은 결과 표시

---

## 3단계: 첫 번째 API 요청 보내기

### 예제 1: 간단한 GET 요청 (헬스체크)

**목적**: 서버가 정상 작동하는지 확인

#### 단계:
1. 새 탭 열기: `File > New Tab` 또는 `Ctrl+T`
2. 메서드: `GET` (기본값)
3. URL 입력: `http://localhost:3001/health`
4. `Send` 버튼 클릭

#### 예상 결과:
```json
{
  "status": "OK",
  "timestamp": "2025-01-20T10:30:00.000Z"
}
```

✅ 이 메시지가 보이면 서버 정상!

---

### 예제 2: POST 요청 (마케팅 계획 생성)

**목적**: 서버에 데이터를 보내서 마케팅 계획 생성

#### 단계:
1. 새 탭 열기
2. **메서드 변경**: 드롭다운에서 `GET` → `POST` 선택
3. **URL 입력**: `http://localhost:3001/api/marketing/generate`
4. **Headers 설정**:
   - `Headers` 탭 클릭
   - Key: `Content-Type`, Value: `application/json` 입력
5. **Body 설정**:
   - `Body` 탭 클릭
   - `raw` 라디오 버튼 선택
   - 오른쪽 드롭다운에서 `JSON` 선택
   - 아래 내용 붙여넣기:
   ```json
   {
     "month": 7,
     "year": 2025,
     "brandData": [
       {"id": "medihilly", "name": "메디힐리"},
       {"id": "swing", "name": "스윙"}
     ]
   }
   ```
6. **Send 클릭**
7. 약 30초 후 아래 응답 창에 결과 표시

---

## 4단계: 응답 결과 확인하기

### 응답 영역 구성

```
┌────────────────────────────────────────────────────────┐
│ Body ● | Cookies | Headers | Test Results             │
├────────────────────────────────────────────────────────┤
│ Pretty ● | Raw | Preview | Visualize | JSON ▼         │
├────────────────────────────────────────────────────────┤
│ {                                                       │
│   "success": true,                                     │
│   "plan": "제목: 7월 마케팅 계획\n\n1. 7월 전략적..."  │
│   "metadata": {...}                                    │
│ }                                                       │
└────────────────────────────────────────────────────────┘
│ Status: 200 OK ✓    Time: 32.5s    Size: 15 KB       │
└────────────────────────────────────────────────────────┘
```

### 응답 보기 옵션
- **Pretty**: 보기 좋게 정렬된 JSON (추천)
- **Raw**: 원본 텍스트
- **Preview**: HTML 미리보기 (웹페이지일 때)

### 상태 코드 의미
- **200 OK**: ✅ 성공
- **400 Bad Request**: ❌ 잘못된 요청
- **401 Unauthorized**: 🔒 인증 필요
- **404 Not Found**: 📭 주소 없음
- **500 Server Error**: 💥 서버 오류

---

## 5단계: 요청 저장하기 (Collection)

### Collection이란?
- API 요청을 폴더처럼 저장하는 기능
- 자주 사용하는 요청을 모아두기

### 저장 방법:
1. 요청 작성 완료 후
2. 우측 상단 `Save` 버튼 클릭
3. Collection 이름 입력: "피플파이 마케팅 API"
4. 요청 이름 입력: "마케팅 계획 생성"
5. `Save` 클릭

### 저장된 요청 사용:
1. 왼쪽 Collections에서 찾기
2. 클릭하면 바로 실행 가능

---

## 🎯 실전 예제: 피플파이 API 테스트

### Collection 구조 예시

```
📁 피플파이 마케팅 API
  ├─ 🔍 헬스체크
  ├─ 📦 브랜드 목록 조회
  ├─ 🎨 마케팅 계획 생성 (7월)
  ├─ 🎨 마케팅 계획 생성 (8월)
  └─ 📋 과거 계획 조회
```

### 각 요청 상세

#### 1. 헬스체크
```
GET http://localhost:3001/health
```

#### 2. 브랜드 목록 조회
```
GET http://localhost:3001/api/brands
```

#### 3. 마케팅 계획 생성 (7월)
```
POST http://localhost:3001/api/marketing/generate
Headers: Content-Type: application/json
Body:
{
  "month": 7,
  "year": 2025,
  "brandData": [
    {"id": "medihilly", "name": "메디힐리"},
    {"id": "swing", "name": "스윙"}
  ]
}
```

#### 4. 과거 계획 조회
```
GET http://localhost:3001/api/marketing/plans
Headers: Authorization: Bearer <토큰>
```

---

## 💡 유용한 기능

### 1. 환경 변수 (Environment)
반복되는 값을 변수로 저장

예: `{{baseUrl}}` = `http://localhost:3001`

**설정 방법**:
1. 좌측 상단 Environments 클릭
2. `+` 버튼으로 새 환경 생성
3. Variable: `baseUrl`, Initial Value: `http://localhost:3001`
4. 요청에서 `{{baseUrl}}/api/brands` 처럼 사용

### 2. 변수 사용 예
```
POST {{baseUrl}}/api/marketing/generate
```

### 3. 자동 테스트 (Tests 탭)
```javascript
// 응답 코드가 200인지 확인
pm.test("Status is 200", function () {
    pm.response.to.have.status(200);
});

// 응답에 특정 필드가 있는지 확인
pm.test("Response has plan", function () {
    pm.expect(pm.response.json()).to.have.property('plan');
});
```

---

## 🔧 문제 해결

### Q1: "Could not connect to server" 오류
**원인**: 백엔드 서버가 실행되지 않음

**해결**:
```bash
cd "C:\Users\yso\OneDrive\Documents\WK_피플파이\peoplepie-marketing-saas\backend"
npm start
```

### Q2: "404 Not Found" 오류
**원인**: URL이 잘못됨

**해결**:
- URL 다시 확인
- `http://localhost:3001` 확인
- 경로가 정확한지 확인 (`/api/marketing/generate`)

### Q3: "500 Internal Server Error"
**원인**: 서버에서 오류 발생

**해결**:
- 백엔드 콘솔 확인
- OpenAI API 키 확인
- .env 파일 확인

### Q4: 응답이 너무 느림
**원인**: OpenAI API가 느릴 수 있음

**해결**:
- Postman 타임아웃 설정: Settings → General → Request timeout (60000ms로 증가)

---

## 📱 Postman 대안

### 웹 버전
- https://web.postman.co
- 설치 없이 브라우저에서 사용
- 계정 필요

### VS Code 확장
- Thunder Client 확장 설치
- VS Code 내에서 API 테스트

### 명령줄 도구
- curl (PowerShell/Bash)
- HTTPie (더 읽기 쉬운 curl)

---

## 🎓 학습 리소스

### 공식 문서
- https://learning.postman.com/docs/getting-started/introduction/

### 유튜브 튜토리얼
- "Postman Beginner's Course" 검색

---

## ✅ 체크리스트

Postman을 제대로 사용하려면:

- [ ] Postman 설치 완료
- [ ] 첫 GET 요청 성공 (헬스체크)
- [ ] POST 요청 성공 (마케팅 계획 생성)
- [ ] Headers 설정 방법 이해
- [ ] Body (JSON) 작성 방법 이해
- [ ] 응답 결과 읽기
- [ ] Collection에 요청 저장
- [ ] Environment 변수 설정 (선택)

---

**다음 단계**: 실제로 피플파이 API를 테스트해보세요! 🚀
