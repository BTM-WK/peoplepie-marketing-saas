const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// 데이터베이스 연결 테스트
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ 데이터베이스 연결 실패:', err);
  } else {
    console.log('✅ 데이터베이스 연결 성공:', res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
