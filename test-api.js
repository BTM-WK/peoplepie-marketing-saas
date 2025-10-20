// 피플파이 마케팅 API 자동 테스트 스크립트
const http = require('http');

console.log('\n🎨'.repeat(25));
console.log('피플파이 마케팅 계획 자동화 API 테스트');
console.log('🎨'.repeat(25) + '\n');

// 헬스체크
function testHealth() {
  return new Promise((resolve, reject) => {
    console.log('=' .repeat(50));
    console.log('🔍 서버 헬스체크 중...');
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/health',
      method: 'GET'
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ 서버 정상 작동:', data);
          resolve(true);
        } else {
          console.log('❌ 서버 응답 오류:', res.statusCode);
          resolve(false);
        }
      });
    });
    
    req.on('error', (e) => {
      console.log('❌ 서버 연결 실패:', e.message);
      console.log('💡 힌트: backend 서버를 먼저 실행하세요!');
      console.log('   명령: cd backend && npm start');
      resolve(false);
    });
    
    req.end();
  });
}

// 브랜드 목록 조회
function testBrands() {
  return new Promise((resolve) => {
    console.log('=' .repeat(50));
    console.log('📦 브랜드 목록 조회 중...');
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/brands',
      method: 'GET'
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✅ 총 ${json.brands.length}개 브랜드:`);
          json.brands.forEach(brand => {
            console.log(`  - ${brand.name} (${brand.category})`);
          });
          resolve(json.brands);
        } catch (e) {
          console.log('❌ 브랜드 조회 실패');
          resolve([]);
        }
      });
    });
    
    req.on('error', (e) => {
      console.log('❌ 요청 실패:', e.message);
      resolve([]);
    });
    
    req.end();
  });
}

// 마케팅 계획 생성
function generatePlan() {
  return new Promise((resolve) => {
    console.log('=' .repeat(50));
    console.log('🚀 2025년 7월 마케팅 계획 생성 중...');
    console.log('⏰ 약 30초 소요됩니다. 잠시만 기다려주세요...\n');
    
    const postData = JSON.stringify({
      month: 7,
      year: 2025,
      brandData: [
        { id: 'medihilly', name: '메디힐리' },
        { id: 'swing', name: '스윙' }
      ]
    });
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/marketing/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.success) {
            console.log('✅ 마케팅 계획 생성 완료!\n');
            console.log('=' .repeat(50));
            console.log(json.plan);
            console.log('=' .repeat(50));
            
            // 파일로 저장
            const fs = require('fs');
            const filename = `마케팅계획_2025년7월_${Date.now()}.txt`;
            fs.writeFileSync(filename, json.plan, 'utf8');
            console.log(`\n💾 파일로 저장되었습니다: ${filename}`);
          } else {
            console.log('❌ 생성 실패:', json.error);
          }
          resolve(json);
        } catch (e) {
          console.log('❌ 응답 파싱 실패:', e.message);
          console.log('서버 응답:', data.substring(0, 200));
          resolve(null);
        }
      });
    });
    
    req.on('error', (e) => {
      console.log('❌ 요청 실패:', e.message);
      resolve(null);
    });
    
    req.write(postData);
    req.end();
  });
}

// 메인 실행
async function main() {
  const healthOk = await testHealth();
  
  if (!healthOk) {
    console.log('\n⚠️  서버가 실행되지 않았습니다.');
    console.log('다음 명령으로 서버를 먼저 실행하세요:');
    console.log('cd backend && npm start\n');
    return;
  }
  
  await testBrands();
  
  console.log('\n선택된 브랜드: 메디힐리, 스윙');
  const result = await generatePlan();
  
  if (result) {
    console.log('\n' + '='.repeat(50));
    console.log('🎉 테스트 성공! API가 정상 작동합니다.');
    console.log('='.repeat(50));
  } else {
    console.log('\n' + '='.repeat(50));
    console.log('⚠️  테스트 실패! 위 오류를 확인해주세요.');
    console.log('='.repeat(50));
  }
}

main();
