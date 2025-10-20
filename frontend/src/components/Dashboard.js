import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          환영합니다, {user?.name}님!
        </h1>
        <p className="mt-2 text-gray-600">
          피플파이 마케팅 계획 자동화 시스템
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('/generate')}
          className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            새 마케팅 계획 생성
          </h2>
          <p className="text-gray-600">
            AI를 활용하여 월별 마케팅 계획을 자동으로 생성합니다.
          </p>
        </div>

        <div
          onClick={() => navigate('/history')}
          className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            과거 계획 조회
          </h2>
          <p className="text-gray-600">
            이전에 생성한 마케팅 계획을 확인하고 편집합니다.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            브랜드 관리
          </h2>
          <p className="text-gray-600">
            브랜드 정보와 텍스트북을 관리합니다.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          📌 사용 가이드
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>월별 마케팅 계획은 AI가 자동으로 생성합니다</li>
          <li>각 브랜드의 텍스트북과 과거 데이터를 기반으로 작성됩니다</li>
          <li>생성된 계획은 Excel/PDF로 내보낼 수 있습니다</li>
          <li>팀원들과 실시간으로 공유 가능합니다</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
