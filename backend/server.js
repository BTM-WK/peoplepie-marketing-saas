const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트
app.use('/api/auth', require('./routes/auth'));
app.use('/api/marketing', require('./routes/marketing'));
app.use('/api/brands', require('./routes/brands'));

// 헬스체크
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: '서버 오류가 발생했습니다.',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 피플파이 마케팅 서버 실행 중: http://localhost:${PORT}`);
});
