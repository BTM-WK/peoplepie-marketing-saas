# Git 설정 및 푸시 스크립트

# 1. 프로젝트 디렉토리로 이동
cd "C:\Users\yso\OneDrive\Documents\WK_피플파이\peoplepie-marketing-saas"

# 2. Git 초기화
git init

# 3. 사용자 정보 설정 (처음 한 번만)
# 아래 이메일과 이름을 본인 것으로 변경하세요!
git config user.email "your.email@example.com"
git config user.name "Your Name"

# 4. 모든 파일 추가
git add .

# 5. 첫 커밋
git commit -m "Initial commit: 피플파이 마케팅 자동화 SaaS"

# 6. GitHub 저장소 연결 (본인의 URL로 변경!)
git remote add origin https://github.com/YOUR_USERNAME/peoplepie-marketing-saas.git

# 7. 메인 브랜치로 변경
git branch -M main

# 8. GitHub에 푸시
git push -u origin main

Write-Host "✅ GitHub 업로드 완료!" -ForegroundColor Green
