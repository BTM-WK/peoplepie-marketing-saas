-- 사용자 테이블
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 브랜드 테이블
CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  brand_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  textbook_path VARCHAR(255),
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 마케팅 계획 테이블
CREATE TABLE marketing_plans (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  brands JSONB NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_marketing_plans_user ON marketing_plans(user_id);
CREATE INDEX idx_marketing_plans_date ON marketing_plans(year, month);
CREATE INDEX idx_brands_brand_id ON brands(brand_id);

-- 기본 관리자 계정 생성 (비밀번호: admin123)
INSERT INTO users (email, password, name, role) VALUES
  ('admin@peoplepie.com', '$2b$10$YourHashedPasswordHere', '관리자', 'admin');

-- 브랜드 데이터 삽입
INSERT INTO brands (brand_id, name, category, textbook_path) VALUES
  ('medihilly', '메디힐리', '생리통 완화 온팩', '/BrandTextbook/브랜드하우스_메디힐리.pdf'),
  ('herbonpack', '허브온팩', '허리 온팩', '/BrandTextbook/허브온팩 브랜드텍스트북.pdf'),
  ('ionpack', '아이온팩', '눈 온팩', '/BrandTextbook/아이온팩 브랜드텍스트북.pdf'),
  ('darifitting', '다리피팅', '다리 케어', '/BrandTextbook/다리피팅_브랜드텍스트북.pdf'),
  ('blackholpas', '블랙홀파스', '운동 파스', '/BrandTextbook/블랙홀파스 브랜드텍스트북.pdf'),
  ('osmotight', '오스모타이트', '샴푸', '/BrandTextbook/오스모타이트 브랜드텍스트북.pdf'),
  ('rollingfinger', '롤링핑거', '얼굴 마사지기', '/BrandTextbook/롤링핑거 브랜드텍스트북.pdf'),
  ('swing', '스윙', '건조대', '/BrandTextbook/스윙 브랜드텍스트북.pdf');
