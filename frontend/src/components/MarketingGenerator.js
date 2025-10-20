import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function MarketingGenerator() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/brands`);
      setBrands(response.data.brands);
    } catch (err) {
      console.error('브랜드 로딩 실패:', err);
    }
  };

  const handleGenerate = async () => {
    if (selectedBrands.length === 0) {
      setError('최소 1개 이상의 브랜드를 선택해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/marketing/generate`,
        {
          year,
          month,
          brandData: selectedBrands.map(id => brands.find(b => b.id === id))
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setGeneratedPlan(response.data.plan);
      }
    } catch (err) {
      setError(err.response?.data?.error || '마케팅 계획 생성 실패');
    } finally {
      setLoading(false);
    }
  };

  const toggleBrand = (brandId) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">마케팅 계획 생성</h1>
        <p className="mt-2 text-gray-600">
          AI를 활용한 자동 마케팅 계획 수립
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">1. 기간 선택</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              년도
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              월
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}월
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">2. 브랜드 선택</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map(brand => (
            <div
              key={brand.id}
              onClick={() => toggleBrand(brand.id)}
              className={`
                cursor-pointer p-4 rounded-lg border-2 transition-all
                ${selectedBrands.includes(brand.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              <h3 className="font-semibold text-gray-900">{brand.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{brand.category}</p>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
      >
        {loading ? '생성 중... (약 30초 소요)' : '마케팅 계획 생성'}
      </button>

      {generatedPlan && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">생성된 마케팅 계획</h2>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-800">
              {generatedPlan}
            </pre>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => {
                const blob = new Blob([generatedPlan], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `마케팅계획_${year}년${month}월.txt`;
                a.click();
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              다운로드
            </button>
            <button
              onClick={() => setGeneratedPlan('')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              새로 생성
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketingGenerator;
