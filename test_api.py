# Python으로 API 테스트하기
# 사용법: python test_api.py

import requests
import json
from datetime import datetime

# API 기본 URL
BASE_URL = "http://localhost:3001"

def test_health():
    """서버 상태 확인"""
    print("=" * 50)
    print("🔍 서버 헬스체크 중...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"✅ 서버 정상 작동: {response.json()}")
        return True
    except Exception as e:
        print(f"❌ 서버 연결 실패: {e}")
        print("💡 힌트: backend 서버가 실행 중인지 확인하세요!")
        return False

def test_brands():
    """브랜드 목록 조회"""
    print("=" * 50)
    print("📦 브랜드 목록 조회 중...")
    try:
        response = requests.get(f"{BASE_URL}/api/brands")
        data = response.json()
        print(f"✅ 총 {len(data['brands'])}개 브랜드:")
        for brand in data['brands']:
            print(f"  - {brand['name']} ({brand['category']})")
        return data['brands']
    except Exception as e:
        print(f"❌ 브랜드 조회 실패: {e}")
        return []

def generate_marketing_plan(month=7, year=2025, brands=None):
    """마케팅 계획 생성"""
    print("=" * 50)
    print(f"🚀 {year}년 {month}월 마케팅 계획 생성 중...")
    print("⏰ 약 30초 소요됩니다. 잠시만 기다려주세요...")
    
    if brands is None:
        brands = [
            {"id": "medihilly", "name": "메디힐리"},
            {"id": "swing", "name": "스윙"}
        ]
    
    payload = {
        "month": month,
        "year": year,
        "brandData": brands
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/marketing/generate",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=60  # 60초 타임아웃
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ 마케팅 계획 생성 완료!")
            print("=" * 50)
            print(data['plan'])
            print("=" * 50)
            
            # 파일로 저장
            filename = f"마케팅계획_{year}년{month}월_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(data['plan'])
            print(f"💾 파일로 저장되었습니다: {filename}")
            
            return data['plan']
        else:
            print(f"❌ 오류 발생: {response.status_code}")
            print(response.json())
            return None
            
    except requests.exceptions.Timeout:
        print("❌ 타임아웃: 서버 응답이 너무 오래 걸립니다.")
        print("💡 OpenAI API가 느릴 수 있습니다. 다시 시도해보세요.")
        return None
    except Exception as e:
        print(f"❌ 생성 실패: {e}")
        return None

def main():
    print("\n" + "🎨" * 25)
    print("피플파이 마케팅 계획 자동화 API 테스트")
    print("🎨" * 25 + "\n")
    
    # 1. 서버 헬스체크
    if not test_health():
        return
    
    # 2. 브랜드 목록 조회
    brands = test_brands()
    
    # 3. 마케팅 계획 생성
    print("\n선택된 브랜드: 메디힐리, 스윙")
    plan = generate_marketing_plan()
    
    if plan:
        print("\n" + "=" * 50)
        print("🎉 테스트 성공! API가 정상 작동합니다.")
        print("=" * 50)
    else:
        print("\n" + "=" * 50)
        print("⚠️ 테스트 실패! 위 오류를 확인해주세요.")
        print("=" * 50)

if __name__ == "__main__":
    main()
