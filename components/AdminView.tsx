
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { ShieldCheck, School, UserPlus, FileText } from 'lucide-react';

const AdminView: React.FC = () => {
  const data = [
    { name: 'Lớp Mầm 1', children: 24, health: 92 },
    { name: 'Lớp Mầm 2', children: 22, health: 88 },
    { name: 'Lớp Chồi 1', children: 28, health: 95 },
    { name: 'Lớp Chồi 2', children: 25, health: 91 },
    { name: 'Lớp Lá 1', children: 30, health: 98 },
  ];

  const pieData = [
    { name: 'Bình thường', value: 85, color: '#10B981' },
    { name: 'Nhẹ cân', value: 10, color: '#F59E0B' },
    { name: 'Béo phì', value: 5, color: '#EF4444' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Tổng nhân sự', value: 12, icon: <ShieldCheck className="text-purple-600" /> },
          { label: 'Số lớp học', value: 8, icon: <School className="text-blue-600" /> },
          { label: 'Học sinh mới', value: '+3', icon: <UserPlus className="text-green-600" /> },
          { label: 'Báo cáo tháng', value: '4', icon: <FileText className="text-orange-600" /> },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{item.icon}</div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">+12%</span>
            </div>
            <p className="text-sm font-medium text-gray-500">{item.label}</p>
            <h4 className="text-3xl font-extrabold text-gray-800">{item.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Analytics */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-8">Thống kê sức khỏe theo lớp</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: '#f9fafb'}}
                   contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                />
                <Bar dataKey="health" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Nutrition Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-8">Phân bổ thể trạng (Toàn trường)</h3>
          <div className="flex flex-col md:flex-row items-center justify-around h-[300px]">
            <div className="w-full h-full max-w-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={8}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="space-y-4">
                {pieData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                        <span className="text-sm font-medium text-gray-600">{item.name}</span>
                        <span className="text-sm font-bold text-gray-800 ml-auto">{item.value}%</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
