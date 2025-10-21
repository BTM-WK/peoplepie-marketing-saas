const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 임시 사용자 저장소 (실제로는 데이터베이스 사용)
const users = [
  {
    id: 1,
    email: 'admin@peoplepie.com',
    password: 'welovewkmg1125!', // 실제 비밀번호
    name: '관리자',
    role: 'admin'
  }
];

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 사용자 찾기
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: '이메일 또는 비밀번호가 올바르지 않습니다.'
      });
    }
    
    // 비밀번호 확인 (간단한 비교)
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        error: '이메일 또는 비밀번호가 올바르지 않습니다.'
      });
    }
    
    // JWT 토큰 생성
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '로그인 중 오류가 발생했습니다.'
    });
  }
});

// 토큰 검증 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: '인증 토큰이 필요합니다.'
    });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: '유효하지 않은 토큰입니다.'
      });
    }
    req.user = user;
    next();
  });
};

// 현재 사용자 정보 조회
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;
module.exports.authenticateToken = authenticateToken;
