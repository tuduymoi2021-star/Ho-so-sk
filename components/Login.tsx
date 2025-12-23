
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../mockData';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = MOCK_USERS.find(u => u.username === username && password === '123');
    
    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError('Tài khoản hoặc mật khẩu không chính xác');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 hover:shadow-blue-200/50">
        
        {/* Left Section - Branding */}
        <div className="hidden w-1/2 flex-col items-center justify-center bg-[#A6F1FF] p-12 text-center md:flex relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>

            <div className="z-10 bg-white/30 backdrop-blur-sm p-8 rounded-full border border-white/40 shadow-xl mb-8">
                <div className="w-64 h-64 rounded-full border-4 border-white flex flex-col items-center justify-center p-6 bg-white shadow-inner">
                    <h1 className="text-2xl font-bold text-cyan-600 leading-tight">SỔ THEO DÕI</h1>
                    <h2 className="text-4xl font-extrabold text-red-500 my-2 tracking-tight">SỨC KHỎE</h2>
                    <h2 className="text-3xl font-bold text-red-600">HỌC SINH</h2>
                </div>
            </div>
            
            <div className="z-10 bg-red-500 text-white py-3 px-6 rounded-full font-medium shadow-lg hover:scale-105 transition-transform">
                Dành cho học sinh từ 3 tháng đến 36 tháng tuổi
            </div>
            
            <p className="z-10 mt-6 text-cyan-800 italic font-medium opacity-80">
                Sổ này được sử dụng trong suốt cấp học.
            </p>
        </div>

        {/* Right Section - Form */}
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 lg:p-12">
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-bold text-gray-800">Đăng Nhập</h3>
            <p className="mt-2 text-sm text-gray-500 font-medium">Hệ thống quản lý sức khỏe học đường</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Tài khoản</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                placeholder="Nhập tên đăng nhập"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="text-xs font-medium text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-blue-700/40 active:scale-[0.98]"
            >
              Truy cập Hệ thống
            </button>
          </form>

          <div className="mt-12 border-t pt-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tài khoản Demo (Offline Mode):</p>
            <div className="mt-3 flex justify-center gap-6 text-xs text-gray-500">
              <div>
                <span className="font-bold text-blue-600">Y tá:</span> yte_mamnon / 123
              </div>
              <div>
                <span className="font-bold text-red-600">Admin:</span> admin / 123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
