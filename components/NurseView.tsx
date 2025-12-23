
import React from 'react';
import { MOCK_STUDENTS } from '../mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Thermometer, UserCheck, TrendingUp } from 'lucide-react';

const NurseView: React.FC = () => {
  const stats = [
    { label: 'Tổng số trẻ', value: MOCK_STUDENTS.length, icon: <UserCheck className="text-blue-600" />, color: 'bg-blue-50' },
    { label: 'Cần theo dõi', value: 2, icon: <Activity className="text-orange-600" />, color: 'bg-orange-50' },
    { label: 'Nhiệt độ TB', value: '36.6°C', icon: <Thermometer className="text-green-600" />, color: 'bg-green-50' },
    { label: 'Tỉ lệ tăng trưởng', value: '94%', icon: <TrendingUp className="text-purple-600" />, color: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h4 className="text-2xl font-bold text-gray-800">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Health Updates */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Cập nhật sức khỏe gần đây</h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">Xem tất cả</button>
          </div>
          <div className="space-y-4">
            {MOCK_STUDENTS.map(s => (
              <div key={s.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={s.avatar} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.recentRecords[0]?.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Cân nặng</p>
                        <p className="text-sm font-bold">{s.recentRecords[0]?.weight} kg</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        s.recentRecords[0]?.status === 'Warning' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                    }`}>
                        {s.recentRecords[0]?.status}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar/Schedule */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Lịch tiêm chủng & Khám</h3>
            <div className="space-y-6">
                {[
                    { title: 'Tiêm chủng Sởi', date: '15/03/2024', status: 'Sắp tới', color: 'blue' },
                    { title: 'Khám răng miệng', date: '20/03/2024', status: 'Dự kiến', color: 'gray' },
                    { title: 'Cân đo hàng tháng', date: '01/04/2024', status: 'Định kỳ', color: 'purple' },
                ].map((ev, idx) => (
                    <div key={idx} className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-1 before:h-full before:bg-blue-100 before:rounded-full">
                        <div className={`absolute left-[-2px] top-1 w-2 h-2 rounded-full bg-${ev.color}-500 ring-4 ring-${ev.color}-50`}></div>
                        <p className="text-sm font-bold text-gray-800">{ev.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{ev.date} • {ev.status}</p>
                    </div>
                ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm font-medium hover:border-blue-400 hover:text-blue-500 transition-all">
                + Thêm sự kiện mới
            </button>
        </div>
      </div>
    </div>
  );
};

export default NurseView;
