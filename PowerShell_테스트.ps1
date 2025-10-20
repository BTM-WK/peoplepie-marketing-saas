# PowerShell로 API 테스트하기

## 1단계: 백엔드 서버 실행
# 새 PowerShell 창 열기
cd "C:\Users\yso\OneDrive\Documents\WK_피플파이\peoplepie-marketing-saas\backend"
npm start

## 2단계: 새 PowerShell 창에서 테스트
# 다른 PowerShell 창 열기 (서버는 계속 실행 중)

# 기본 테스트 (헬스체크)
Invoke-RestMethod -Uri "http://localhost:3001/health" -Method Get

# 마케팅 계획 생성 테스트
$body = @{
    month = 7
    year = 2025
    brandData = @(
        @{id = "medihilly"; name = "메디힐리"},
        @{id = "swing"; name = "스윙"}
    )
} | ConvertTo-Json -Depth 10

$response = Invoke-RestMethod -Uri "http://localhost:3001/api/marketing/generate" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"

# 결과 출력
Write-Host "=== 생성된 마케팅 계획 ===" -ForegroundColor Green
$response.plan

# 파일로 저장
$response.plan | Out-File -FilePath "마케팅계획_2025년7월.txt" -Encoding UTF8
Write-Host "파일로 저장되었습니다: 마케팅계획_2025년7월.txt" -ForegroundColor Cyan
