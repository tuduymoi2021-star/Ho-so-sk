
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { User, UserRole, Student } from '../types';
import { MOCK_STUDENTS, MOCK_USERS } from '../mockData';
import NurseView from './NurseView';
import AdminView from './AdminView';
import StudentDetail from './StudentDetail';
import AddStudentForm from './AddStudentForm';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  UserCircle,
  Bell,
  Search
} from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Tổng quan', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Danh sách trẻ', path: '/dashboard/students' },
    { icon: <Stethoscope size={20} />, label: 'Khám sức khỏe', path: '/dashboard/exam' },
    ...(user.role === UserRole.ADMIN ? [
      { icon: <Settings size={20} />, label: 'Quản lý người dùng', path: '/dashboard/users' }
    ] : [])
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-white border-r flex flex-col z-30`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
          {isSidebarOpen && <span className="font-bold text-gray-800 truncate">Sổ Sức Khỏe</span>}
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                location.pathname === item.path 
                  ? 'bg-blue-50 text-blue-600 shadow-sm font-semibold' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm học sinh..." 
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm border-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800 leading-none">{user.fullName}</p>
                <p className="text-xs text-gray-500 mt-1">{user.role === UserRole.NURSE ? 'Nhân viên y tế' : 'Quản trị viên'}</p>
              </div>
              <img src={user.avatar} className="w-10 h-10 rounded-full ring-2 ring-blue-100 shadow-sm" alt="Avatar" />
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">
          <Routes>
            <Route index element={user.role === UserRole.NURSE ? <NurseView /> : <AdminView />} />
            <Route path="students" element={<StudentListView />} />
            <Route path="student/add" element={<AddStudentForm />} />
            <Route path="student/:id" element={<StudentDetail />} />
            <Route path="users" element={<UserManagementView />} />
            <Route path="exam" element={<HealthExamView />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Sub-components for routes
const StudentListView = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách học sinh</h2>
        <button 
          onClick={() => navigate('/dashboard/student/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
        >
          + Thêm học sinh
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_STUDENTS.map(s => (
          <Link key={s.id} to={`/dashboard/student/${s.id}`} className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-blue-200 transition-all hover:shadow-md group">
            <div className="flex items-center gap-4">
              <img src={s.avatar} className="w-16 h-16 rounded-2xl object-cover shadow-inner group-hover:scale-105 transition-transform" />
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{s.name}</h3>
                <p className="text-sm text-gray-500">{s.class} • {s.gender}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                     s.recentRecords[0]?.status === 'Warning' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {s.recentRecords[0]?.status === 'Normal' ? 'Khỏe mạnh' : 'Cần chú ý'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const UserManagementView = () => (
  <div className="bg-white rounded-2xl shadow-sm border p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">Quản lý tài khoản hệ thống</h2>
      <button className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium">Thêm người dùng</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th className="py-3 px-4 font-semibold">Tên đăng nhập</th>
            <th className="py-3 px-4 font-semibold">Họ và tên</th>
            <th className="py-3 px-4 font-semibold">Vai trò</th>
            <th className="py-3 px-4 font-semibold">Trạng thái</th>
            <th className="py-3 px-4 font-semibold">Hành động</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {MOCK_USERS.map(u => (
            <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4 font-medium">{u.username}</td>
              <td className="py-4 px-4">{u.fullName}</td>
              <td className="py-4 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  u.role === UserRole.ADMIN ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {u.role}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Đang hoạt động
                </span>
              </td>
              <td className="py-4 px-4">
                <button className="text-gray-400 hover:text-blue-600 p-1">Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const HealthExamView = () => (
    <div className="bg-white rounded-2xl shadow-sm border p-8 flex flex-col items-center justify-center min-h-[400px]">
        <Stethoscope size={64} className="text-blue-400 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-gray-800">Cổng đăng ký khám tập trung</h2>
        <p className="text-gray-500 mt-2 max-w-md text-center">
            Tính năng này giúp nhân viên y tế nhập dữ liệu hàng loạt cho các đợt khám sức khỏe định kỳ của toàn trường.
        </p>
        <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-600/30">
            Bắt đầu lượt khám mới
        </button>
    </div>
)

export default Dashboard;
