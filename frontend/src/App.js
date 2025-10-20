import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MarketingGenerator from './components/MarketingGenerator';
import PlanHistory from './components/PlanHistory';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (token, user) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && (
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-2xl font-bold text-blue-600">피플파이 마케팅</h1>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700 mr-4">{currentUser?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}

        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard user={currentUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/generate"
            element={
              isAuthenticated ? (
                <MarketingGenerator />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/history"
            element={
              isAuthenticated ? (
                <PlanHistory />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
