const express = require('express');
const router = express.Router();

// 브랜드 데이터 (8개 브랜드)
const BRANDS = [
  {
    id: 'medihilly',
    name: '메디힐리',
    category: '생리통 완화 온팩',
    textbookPath: '/BrandTextbook/브랜드하우스_메디힐리.pdf'
  },
  {
    id: 'herbonpack',
    name: '허브온팩',
    category: '허리 온팩',
    textbookPath: '/BrandTextbook/허브온팩 브랜드텍스트북.pdf'
  },
  {
    id: 'ionpack',
    name: '아이온팩',
    category: '눈 온팩',
    textbookPath: '/BrandTextbook/아이온팩 브랜드텍스트북.pdf'
  },
  {
    id: 'darifitting',
    name: '다리피팅',
    category: '다리 케어',
    textbookPath: '/BrandTextbook/다리피팅_브랜드텍스트북.pdf'
  },
  {
    id: 'blackholpas',
    name: '블랙홀파스',
    category: '운동 파스',
    textbookPath: '/BrandTextbook/블랙홀파스 브랜드텍스트북.pdf'
  },
  {
    id: 'osmotight',
    name: '오스모타이트',
    category: '샴푸',
    textbookPath: '/BrandTextbook/오스모타이트 브랜드텍스트북.pdf'
  },
  {
    id: 'rollingfinger',
    name: '롤링핑거',
    category: '얼굴 마사지기',
    textbookPath: '/BrandTextbook/롤링핑거 브랜드텍스트북.pdf'
  },
  {
    id: 'swing',
    name: '스윙',
    category: '건조대',
    textbookPath: '/BrandTextbook/스윙 브랜드텍스트북.pdf'
  }
];

// 모든 브랜드 조회
router.get('/', (req, res) => {
  res.json({
    success: true,
    brands: BRANDS
  });
});

// 특정 브랜드 조회
router.get('/:id', (req, res) => {
  const brand = BRANDS.find(b => b.id === req.params.id);
  if (!brand) {
    return res.status(404).json({
      success: false,
      error: '브랜드를 찾을 수 없습니다.'
    });
  }
  res.json({
    success: true,
    brand
  });
});

module.exports = router;
