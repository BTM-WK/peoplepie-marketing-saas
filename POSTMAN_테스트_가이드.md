# Postman으로 API 테스트하기

## 📋 단계별 가이드

### 1. 새 요청 만들기
1. Postman 실행
2. 왼쪽 상단 "New" 버튼 클릭
3. "HTTP Request" 선택

### 2. 요청 설정
- **메서드**: POST (드롭다운에서 선택)
- **URL**: `http://localhost:3001/api/marketing/generate`

### 3. 헤더 설정
1. "Headers" 탭 클릭
2. 다음 추가:
   - Key: `Content-Type`
   - Value: `application/json`

### 4. 바디 설정
1. "Body" 탭 클릭
2. "raw" 선택
3. 오른쪽 드롭다운에서 "JSON" 선택
4. 아래 내용 붙여넣기:

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

### 5. 전송
1. 파란색 "Send" 버튼 클릭
2. 아래쪽에 결과가 표시됩니다
3. 약 30초 후 완전한 마케팅 계획이 응답됨!

## 📸 Postman 화면 예시

```
┌─────────────────────────────────────────────────────┐
│ POST ▼  http://localhost:3001/api/marketing/generate│ [Send]
├─────────────────────────────────────────────────────┤
│ Params   Authorization   Headers   Body   Tests     │
├─────────────────────────────────────────────────────┤
│ ● raw  ▼  JSON ▼                                    │
│                                                      │
│ {                                                    │
│   "month": 7,                                        │
│   "year": 2025,                                      │
│   "brandData": [...]                                 │
│ }                                                    │
└─────────────────────────────────────────────────────┘
```

## ✅ 성공 응답 예시

```json
{
  "success": true,
  "plan": "제목: 7월 마케팅 계획\n\n1. 7월 전략적 개요\n* 전체 매출 목표...",
  "metadata": {
    "month": 7,
    "year": 2025,
    "generatedAt": "2025-01-20T10:30:00.000Z"
  }
}
```

## ❌ 오류 발생 시

### 연결 오류 (Connection refused)
- 백엔드 서버가 실행 중인지 확인
- http://localhost:3001/health 접속해서 서버 확인

### 401 Unauthorized
- 로그인 API를 먼저 호출하여 토큰 받기
- Headers에 `Authorization: Bearer <token>` 추가

### 500 Internal Server Error
- 서버 콘솔에서 오류 메시지 확인
- OpenAI API 키가 올바른지 확인
