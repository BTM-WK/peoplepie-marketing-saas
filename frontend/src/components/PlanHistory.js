import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function PlanHistory() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/marketing/plans`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlans(response.data.plans);
    } catch (err) {
      console.error('계획 로딩 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">과거 마케팅 계획</h1>
        <p className="mt-2 text-gray-600">
          생성된 마케팅 계획 내역을 확인하세요
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      ) : plans.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500">아직 생성된 마케팅 계획이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map(plan => (
            <div key={plan.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {plan.year}년 {plan.month}월 마케팅 계획
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    생성일: {new Date(plan.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  보기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlanHistory;
