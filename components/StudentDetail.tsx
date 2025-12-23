
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_STUDENTS } from '../mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Plus, BrainCircuit, Activity, Ruler, Weight, Calendar } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const student = MOCK_STUDENTS.find(s => s.id === id);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!student) return <div className="p-10 text-center text-gray-500">Không tìm thấy học sinh.</div>;

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const record = student.recentRecords[0];
      const prompt = `Hãy đóng vai một chuyên gia dinh dưỡng mầm non. Phân tích chỉ số của trẻ: 
      Tên: ${student.name}, Tuổi: ${student.dob}, Cân nặng: ${record.weight}kg, Chiều cao: ${record.height}cm. 
      Gần đây có ghi chú: ${record.note}. 
      Hãy đưa ra lời khuyên ngắn gọn về sức khỏe và dinh dưỡng cho bé. Trả về định dạng Markdown đẹp.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { temperature: 0.7 }
      });
      
      setAiAnalysis(response.text || "Không thể thực hiện phân tích lúc này.");
    } catch (error) {
      console.error(error);
      setAiAnalysis("Hệ thống AI hiện đang bận. Vui lòng thử lại sau.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-500">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Hồ sơ sức khỏe</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm border p-8 flex flex-col items-center text-center">
          <img src={student.avatar} className="w-32 h-32 rounded-3xl object-cover mb-4 ring-4 ring-blue-50 shadow-lg" />
          <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
          <p className="text-blue-600 font-medium text-sm">{student.class}</p>
          
          <div className="grid grid-cols-2 w-full gap-4 mt-8 pt-8 border-t">
            <div className="p-3 bg-gray-50 rounded-2xl">
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Ngày sinh</p>
              <p className="text-sm font-bold text-gray-700">{student.dob}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl">
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Giới tính</p>
              <p className="text-sm font-bold text-gray-700">{student.gender}</p>
            </div>
          </div>

          <div className="w-full mt-6 space-y-3 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Phụ huynh:</span>
              <span className="font-semibold">{student.parentName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Liên hệ:</span>
              <span className="font-semibold">{student.phone}</span>
            </div>
          </div>
        </div>

        {/* Growth Analytics */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border p-8">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-lg font-bold text-gray-800">Biểu đồ tăng trưởng</h4>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs text-blue-500 font-medium"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Cân nặng</span>
                <span className="flex items-center gap-1 text-xs text-green-500 font-medium"><div className="w-2 h-2 rounded-full bg-green-500"></div> Chiều cao</span>
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={student.recentRecords}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={3} dot={{r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} />
                  <Line type="monotone" dataKey="height" stroke="#10b981" strokeWidth={3} dot={{r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
             <div className="absolute top-[-20px] right-[-20px] opacity-10">
                <BrainCircuit size={150} />
             </div>
             
             <div className="flex items-center gap-3 mb-6 relative z-10">
               <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                 <BrainCircuit size={24} />
               </div>
               <h4 className="text-xl font-bold">Phân tích AI thông minh</h4>
             </div>

             {aiAnalysis ? (
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-sm leading-relaxed prose prose-invert relative z-10 animate-in fade-in zoom-in duration-500">
                  {aiAnalysis.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                  <button 
                    onClick={() => setAiAnalysis(null)} 
                    className="mt-4 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white"
                  >
                    Đóng phân tích
                  </button>
               </div>
             ) : (
               <div className="relative z-10">
                 <p className="text-indigo-100 mb-8 max-w-md">
                    Sử dụng trí tuệ nhân tạo Gemini để phân tích các chỉ số sức khỏe của {student.name} và nhận lời khuyên dinh dưỡng tức thì.
                 </p>
                 <button 
                   onClick={handleAIAnalysis}
                   disabled={isAnalyzing}
                   className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all disabled:opacity-50"
                 >
                   {isAnalyzing ? (
                     <>
                       <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                       Đang phân tích...
                     </>
                   ) : (
                     'Bắt đầu phân tích'
                   )}
                 </button>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-3xl shadow-sm border p-8">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-xl font-bold text-gray-800">Lịch sử đo lường</h4>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all text-sm font-semibold">
            <Plus size={18} /> Nhập chỉ số mới
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-widest border-b">
                <th className="pb-4 font-semibold">Ngày đo</th>
                <th className="pb-4 font-semibold">Cân nặng</th>
                <th className="pb-4 font-semibold">Chiều cao</th>
                <th className="pb-4 font-semibold">Nhiệt độ</th>
                <th className="pb-4 font-semibold">Ghi chú</th>
                <th className="pb-4 font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {student.recentRecords.map(r => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-medium">{r.date}</td>
                  <td className="py-4 font-bold">{r.weight} kg</td>
                  <td className="py-4 font-bold">{r.height} cm</td>
                  <td className="py-4">{r.temperature}°C</td>
                  <td className="py-4 text-gray-500 italic">{r.note}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      r.status === 'Normal' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {r.status === 'Normal' ? 'Tốt' : 'Cần theo dõi'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
