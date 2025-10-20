# 피플파이 API 테스트 스크립트
# PowerShell에서 실행: .\quick_test.ps1

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  피플파이 마케팅 API 빠른 테스트" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 1. 헬스체크
Write-Host "[1/3] 서버 헬스체크 중..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method Get
    Write-Host "✅ 서버 정상 작동!" -ForegroundColor Green
    Write-Host "   Status: $($health.status)" -ForegroundColor Gray
} catch {
    Write-Host "❌ 서버 연결 실패!" -ForegroundColor Red
    Write-Host "   백엔드 서버를 먼저 실행해주세요:" -ForegroundColor Yellow
    Write-Host "   cd backend && npm start" -ForegroundColor Gray
    exit
}

Write-Host ""

# 2. 브랜드 목록 조회
Write-Host "[2/3] 브랜드 목록 조회 중..." -ForegroundColor Yellow
try {
    $brands = Invoke-RestMethod -Uri "http://localhost:3001/api/brands" -Method Get
    Write-Host "✅ 브랜드 목록 조회 성공!" -ForegroundColor Green
    Write-Host "   총 $($brands.brands.Count)개 브랜드:" -ForegroundColor Gray
    foreach ($brand in $brands.brands) {
        Write-Host "   - $($brand.name)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ 브랜드 조회 실패" -ForegroundColor Red
}

Write-Host ""

# 3. 마케팅 계획 생성 (간단 버전)
Write-Host "[3/3] 마케팅 계획 생성 테스트 중..." -ForegroundColor Yellow
Write-Host "   (약 30초 소요)" -ForegroundColor Gray

$body = @{
    month = 7
    year = 2025
    brandData = @(
        @{id = "medihilly"; name = "메디힐리"}
    )
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod `
        -Uri "http://localhost:3001/api/marketing/generate" `
        -Method Post `
        -Body $body `
        -ContentType "application/json" `
        -TimeoutSec 60
    
    Write-Host "✅ 마케팅 계획 생성 성공!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "  생성된 마케팅 계획" -ForegroundColor Cyan
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host $response.plan
    Write-Host ""
    
    # 파일로 저장
    $filename = "마케팅계획_테스트_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt"
    $response.plan | Out-File -FilePath $filename -Encoding UTF8
    Write-Host "💾 파일로 저장됨: $filename" -ForegroundColor Green
    
} catch {
    Write-Host "❌ 마케팅 계획 생성 실패" -ForegroundColor Red
    Write-Host "   오류: $($_.Exception.Message)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "💡 확인사항:" -ForegroundColor Yellow
    Write-Host "   1. .env 파일에 OPENAI_API_KEY가 설정되어 있나요?" -ForegroundColor Gray
    Write-Host "   2. OpenAI API 키가 유효한가요?" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "테스트 완료!" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
