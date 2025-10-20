const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 전체 브랜드 목록 (기본값)
const ALL_BRANDS = [
  { id: 'medihilly', name: '메디힐리', category: '생리통 완화 온팩' },
  { id: 'herbonpack', name: '허브온팩', category: '허리 온팩' },
  { id: 'eyeonpack', name: '아이온팩', category: '눈 온팩' },
  { id: 'darifitting', name: '다리피팅', category: '다리 케어' },
  { id: 'blackholpas', name: '블랙홀파스', category: '운동 파스' },
  { id: 'osmotight', name: '오스모타이트', category: '샴푸' },
  { id: 'rollingfinger', name: '롤링핑거', category: '얼굴 마사지기' },
  { id: 'swing', name: '스윙', category: '건조대' }
];

// GPTs 지침서 (원본 그대로)
const SYSTEM_PROMPT = `당신은 대한민국 최고의 마케팅,브랜드마케팅 전문가이자 탁월한 카피라이타로서, 정교한 전략성을 갖고 마케팅 계획을 수립하기 바랍니다.

📌 목적: 다음 달 마케팅 계획을 수립한다. 전략 브랜드를 선정하고, 브랜드별 매출 목표, 마케팅 방향, 3가지 프로모션 제안안을 제시하라. 예산 한도, 실행 가능성, 시즌 이슈, 소비자 반응, 브랜드 전략 등을 고려하여 구성하라.

📌 주요 조건:
1. 월 평균 광고비 600만 원, 판촉비 200만 원 이내
2. 각 프로모션은 매출과 직접 연결되어야 함
3. 소비자 언어(후기, 댓글 등) 반영 + 사회문화 키워드 연동 필수
4. 다음 달과 전략 연결되는 흐름 포함
5. 예산은 "~을 위해 얼마가 필요하다" 방식으로 설명
6. 기대 성과는 정량 + 정성 지표 모두 포함

📌 출력 구조:
제목: ( )월 마케팅 계획

1. ( ) 월 전략적 개요
* 전체 매출 목표
* 전체 브랜드별 매출 목표
* 전략적 집중 브랜드 선정
* 선정 이유

2. ( )월 전략적 마케팅 전개 방향
* 소비자 환경 및 트렌드 요약
* 전략 브랜드 2~4개 선정 + 각 브랜드의 전략 포지션 요약

3. 브랜드별 마케팅 계획
* 브랜드명 / 매출 목표 / 마케팅 방향
* 프로모션 주제 + 이유
* 프로모션 제안안 3개 (✔️ 사용자 승인 여부 포함)

각 제안안 구성:
* 안 제목 + 슬로건
* 기획 요약 (실현 가능한 내용 중심)
* 랜딩페이지 URL
* 예산 (단위: 만 원)
* 기대 성과:
  ▪ 정량: 매출, ROAS, 유입 수, 전환율 등
  ▪ 정성: 후기 수, 팬 확보, 좋아요 수 등

4. 전체 브랜드 예산 총합 (광고/판촉 합산)

5. (옵션) 리스크 경고
* 실현 불가능성, 소비자 반응 저조 예상 등

마지막 문장: "이 플랜은 국내용입니다. 해외 기회를 잊지 마세요. 더 큰 가능성은 국경 밖에 있습니다."`;

// 마케팅 계획 생성 API
router.post('/generate', async (req, res) => {
  try {
    let { month, year, brandData, previousPlan } = req.body;
    
    // ✨ 새로운 기능: brandData가 없거나 비어있으면 전체 브랜드 사용
    if (!brandData || brandData.length === 0) {
      console.log('📦 brandData가 없습니다. 전체 브랜드를 사용합니다.');
      brandData = ALL_BRANDS;
    }
    
    console.log(`🎨 마케팅 계획 생성 중: ${year}년 ${month}월, 브랜드 ${brandData.length}개`);
    
    // 사용자 입력 구성
    const userPrompt = `
${year}년 ${month}월 마케팅 계획을 수립해주세요.

브랜드 정보:
${JSON.stringify(brandData, null, 2)}

${previousPlan ? `지난 달 계획 참고:\n${previousPlan}\n` : ''}

위 정보를 바탕으로 ${month}월 마케팅 계획을 작성해주세요.
`;

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });

    const generatedPlan = completion.choices[0].message.content;

    // TODO: 데이터베이스에 저장

    res.json({
      success: true,
      plan: generatedPlan,
      metadata: {
        month,
        year,
        brandCount: brandData.length,
        brands: brandData.map(b => b.name),
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('마케팅 계획 생성 오류:', error);
    res.status(500).json({
      success: false,
      error: '마케팅 계획 생성 중 오류가 발생했습니다.',
      details: error.message
    });
  }
});

// 저장된 마케팅 계획 조회
router.get('/plans', async (req, res) => {
  try {
    // TODO: 데이터베이스에서 조회
    res.json({
      success: true,
      plans: []
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 특정 마케팅 계획 조회
router.get('/plans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: 데이터베이스에서 조회
    res.json({
      success: true,
      plan: {}
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
