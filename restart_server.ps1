# 서버 재시작 스크립트
Write-Host "피플파이 마케팅 서버 재시작 중..." -ForegroundColor Cyan

# 기존 Node 프로세스 종료
Write-Host "기존 서버 종료 중..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# 서버 시작
Write-Host "서버 시작 중..." -ForegroundColor Yellow
cd "C:\Users\yso\OneDrive\Documents\WK_피플파이\peoplepie-marketing-saas\backend"
node server.js
