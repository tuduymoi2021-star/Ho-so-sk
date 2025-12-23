
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ChevronLeft, Plus, BookOpen, Syringe, Info, Activity, Stethoscope, HeartPulse, Bone, Smile, LineChart as ChartIcon, Baby } from 'lucide-react';

const AddStudentForm: React.FC = () => {
  const navigate = useNavigate();
  
  // Tabs State
  const [activeMainTab, setActiveMainTab] = useState<'part1' | 'part2' | 'part3' | 'part4'>('part1');
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'vaccine' | 'extra'>('info');
  const [activePart2Tab, setActivePart2Tab] = useState<'growth' | 'incidents'>('growth');
  const [activePart3Tab, setActivePart3Tab] = useState<'internal' | 'external' | 'dental'>('internal');
  const [activePart4Tab, setActivePart4Tab] = useState<'chart1' | 'chart2' | 'chart3'>('chart1');
  const [studentGender, setStudentGender] = useState<'Nam' | 'Nữ'>('Nam');

  // Growth Data Mock for Charts
  const childData = useMemo(() => {
    const data = [];
    let currentHeight = 52; 
    let currentWeight = 3.4;
    for (let month = 0; month <= 60; month += 6) {
      data.push({
        month,
        height: currentHeight + (Math.random() * 4),
        weight: currentWeight + (Math.random() * 1.5)
      });
      currentHeight += 6 + (Math.random() * 2);
      currentWeight += 1.2 + (Math.random() * 0.5);
    }
    return data;
  }, []);

  const [incidents, setIncidents] = useState([{ id: 1, time: '', diagnosis: '', schoolTreatment: '', referral: '', note: '' }]);

  const addIncidentRow = () => {
    setIncidents([...incidents, { id: Date.now(), time: '', diagnosis: '', schoolTreatment: '', referral: '', note: '' }]);
  };

  // UI Helpers
  const DottedInput = ({ label, placeholder = "", className = "" }: { label?: string, placeholder?: string, className?: string }) => (
    <div className={`flex items-baseline gap-2 ${className}`}>
      {label && <span className="whitespace-nowrap font-medium text-gray-800">{label}</span>}
      <input type="text" className="flex-1 border-b border-dotted border-gray-400 focus:border-blue-500 outline-none bg-transparent py-1" placeholder={placeholder} />
    </div>
  );

  const BoxGroup = ({ count, label, prefix = 0 }: { count: number, label: string, prefix?: number }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-2">
      <span className="font-medium text-gray-800 whitespace-nowrap">{label}</span>
      <div className="flex items-center gap-1">
        {[...Array(count)].map((_, i) => (
          <React.Fragment key={i}>
            {prefix > 0 && i === prefix && <span className="px-1 text-gray-400">-</span>}
            <input key={i} type="text" maxLength={1} className="w-7 h-9 border border-gray-400 text-center font-bold text-blue-700 outline-none focus:border-blue-500 rounded-sm" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const MultiDottedLines = ({ label, lines = 3 }: { label: string, lines?: number }) => (
    <div className="space-y-1 mt-4">
      <p className="font-medium text-gray-800 leading-relaxed mb-2 text-[15px]">{label}</p>
      <div className="space-y-1">
        {[...Array(lines)].map((_, i) => (
          <input 
            key={i}
            type="text" 
            className="w-full border-b border-dotted border-gray-400 bg-transparent py-1 outline-none focus:border-blue-500"
            placeholder="................................................................................................................................"
          />
        ))}
      </div>
    </div>
  );

  const renderDentalTable = (teeth: any[]) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-800 text-[10px]">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-800 p-1">Răng vĩnh viễn</th>
            <th className="border border-gray-800 p-1">Răng sữa</th>
            <th className="border border-gray-800 p-1">Nhu cầu</th>
            <th className="border border-gray-800 p-1">Tình trạng</th>
            <th className="border border-gray-800 p-1">Mặt nhai</th>
            <th className="border border-gray-800 p-1">Mặt ngoài</th>
            <th className="border border-gray-800 p-1">Mặt trong</th>
            <th className="border border-gray-800 p-1">Mặt gần</th>
            <th className="border border-gray-800 p-1">Mặt xa</th>
          </tr>
        </thead>
        <tbody>
          {teeth.map((t, idx) => (
            <tr key={idx} className="h-6">
              <td className="border border-gray-800 text-center font-bold bg-gray-50">{t.v}</td>
              <td className="border border-gray-800 text-center font-bold">{t.s}</td>
              <td className="border border-gray-800 p-0"><input className="w-full h-full text-center outline-none" /></td>
              <td className="border border-gray-800 p-0"><input className="w-full h-full text-center outline-none" /></td>
              <td className="border border-gray-800 p-0"><input className="w-full h-full text-center outline-none" /></td>
              <td className="border border-gray-800 p-0"><input className="w-full h-full text-center outline-none" /></td>
              <td className="border border-gray-800 p-0"><input className="w-full h-full text-center outline-none" /></td>
              <td className="border border-gray-800 p-0"><input className="w-full h-full text-center outline-none" /></td>
              <td className="border border-gray-800 p-0"><input className="w-full h-full text-center outline-none" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Growth Chart Drawing Logic
  const GrowthChart = ({ type, gender, data }: { type: 'weight' | 'height' | 'wfh', gender: 'Nam' | 'Nữ', data: any[] }) => {
    const isBoy = gender === 'Nam';
    const mainColor = isBoy ? 'blue' : 'rose';
    
    const chartConfig = {
      weight: { yMin: 2, yMax: 28, xMax: 60, xLabel: 'Tháng tuổi', yLabel: 'Cân nặng (kg)', title: 'Cân nặng theo tuổi' },
      height: { yMin: 45, yMax: 125, xMax: 60, xLabel: 'Tháng tuổi', yLabel: 'Chiều cao (cm)', title: 'Chiều cao theo tuổi' },
      wfh: { yMin: 2, yMax: 34, xMax: 120, xMin: 45, xLabel: 'Chiều dài/Cao (cm)', yLabel: 'Cân nặng (kg)', title: 'Cân nặng theo Chiều cao' }
    };

    const cfg = chartConfig[type];
    const chartHeight = 400;
    const chartWidth = 800;

    const getY = (val: number) => chartHeight - ((val - cfg.yMin) / (cfg.yMax - cfg.yMin) * chartHeight);
    const getX = (xVal: number) => {
      const xMin = (cfg as any).xMin || 0;
      return ((xVal - xMin) / (cfg.xMax - xMin)) * chartWidth;
    };

    const generateCurve = (sd: number) => {
      let points = "";
      const step = 5;
      const xStart = (cfg as any).xMin || 0;
      for (let x = xStart; x <= cfg.xMax; x += step) {
        let val;
        if (type === 'height') {
          const base = 50 + (x * 1.1) - (Math.pow(x, 2) * 0.004);
          val = base + (sd * (2 + x * 0.04));
        } else if (type === 'weight') {
          const base = 3.5 + (x * 0.28) - (Math.pow(x, 2) * 0.0015);
          val = base + (sd * (0.6 + x * 0.015));
        } else {
          const base = 2 + Math.pow((x - 40) / 10, 1.8);
          val = base + (sd * (0.5 + (x - 45) * 0.08));
        }
        points += `${getX(x)},${getY(val)} `;
      }
      return points;
    };

    const childPoints = data.map(d => {
      const xVal = type === 'wfh' ? d.height : d.month;
      const yVal = type === 'height' ? d.height : d.weight;
      return `${getX(xVal)},${getY(yVal)}`;
    }).join(" ");

    return (
      <div className={`bg-white border-2 border-${mainColor}-200 rounded-[2rem] p-8 shadow-2xl animate-in zoom-in duration-500`}>
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
             <div className={`p-4 bg-${mainColor}-100 rounded-3xl text-${mainColor}-600`}><Baby size={32}/></div>
             <div>
               <h3 className="text-2xl font-black uppercase text-gray-800">{cfg.title}</h3>
               <p className="text-sm font-bold text-gray-400">Dành cho {isBoy ? 'BÉ TRAI' : 'BÉ GÁI'} • Z-Scores (WHO Standards)</p>
             </div>
          </div>
        </div>

        <div className="relative overflow-x-auto flex flex-col items-center py-6">
          <div className="relative">
            <svg width={chartWidth + 80} height={chartHeight + 60} viewBox={`-60 -20 ${chartWidth + 120} ${chartHeight + 80}`}>
              <line x1="0" y1="0" x2="0" y2={chartHeight} stroke="#000" strokeWidth="2" />
              <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#000" strokeWidth="2" />
              
              {/* SD Lines */}
              <polyline points={generateCurve(3)} fill="none" stroke="#000" strokeWidth="1" />
              <polyline points={generateCurve(2)} fill="none" stroke="#ef4444" strokeWidth="1" />
              <polyline points={generateCurve(1)} fill="none" stroke="#f97316" strokeWidth="0.5" strokeDasharray="2 2" />
              <polyline points={generateCurve(0)} fill="none" stroke="#22c55e" strokeWidth="3" />
              <polyline points={generateCurve(-1)} fill="none" stroke="#f97316" strokeWidth="0.5" strokeDasharray="2 2" />
              <polyline points={generateCurve(-2)} fill="none" stroke="#ef4444" strokeWidth="1" />
              <polyline points={generateCurve(-3)} fill="none" stroke="#000" strokeWidth="1" strokeDasharray="4 2" />

              {/* Data Path */}
              <polyline points={childPoints} fill="none" stroke={isBoy ? "#2563eb" : "#db2777"} strokeWidth="5" strokeLinejoin="round" />
              {data.map((d, i) => (
                <circle key={i} cx={getX(type === 'wfh' ? d.height : d.month)} cy={getY(type === 'height' ? d.height : d.weight)} r="6" fill="white" stroke={isBoy ? "#2563eb" : "#db2777"} strokeWidth="3" />
              ))}

              <text x={chartWidth + 10} y={getY(cfg.yMax - 2)} fontSize="14" fontWeight="black">3</text>
              <text x={chartWidth + 10} y={getY(cfg.yMax - 6)} fontSize="14" fontWeight="black" fill="#ef4444">2</text>
              <text x={chartWidth + 10} y={getY(cfg.yMax - 14)} fontSize="14" fontWeight="black" fill="#22c55e">0</text>
            </svg>
            <div className="absolute -left-14 top-1/2 -rotate-90 text-xs font-black text-gray-400 uppercase">{cfg.yLabel}</div>
          </div>
          <div className="mt-6 text-xs font-black text-gray-400 uppercase tracking-widest">{cfg.xLabel}</div>
        </div>

        {/* Legend Table */}
        <div className="mt-8 pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="space-y-4">
              <p className="text-sm font-black text-gray-500 uppercase">Phân loại tình trạng dinh dưỡng</p>
              <div className="border border-gray-100 rounded-2xl overflow-hidden text-xs">
                 <table className="w-full font-bold">
                    <thead className="bg-gray-50 border-b">
                       <tr><th className="p-3 text-left">Chỉ số Z-score</th><th className="p-3 text-left">Đánh giá</th></tr>
                    </thead>
                    <tbody>
                       <tr className="border-b bg-red-50 text-red-700"><td className="p-3">{'< -3 SD'}</td><td className="p-3">Nguy cơ cao (Suy dinh dưỡng nặng)</td></tr>
                       <tr className="border-b bg-orange-50 text-orange-700"><td className="p-3">{'< -2 SD'}</td><td className="p-3">Suy dinh dưỡng</td></tr>
                       <tr className="border-b bg-green-50 text-green-700"><td className="p-3">{-2 SD ≤ Z ≤ 2 SD}</td><td className="p-3">Bình thường</td></tr>
                       <tr className="bg-yellow-50 text-yellow-700"><td className="p-3">{'> +2 SD'}</td><td className="p-3">Thừa cân / Béo phì</td></tr>
                    </tbody>
                 </table>
              </div>
           </div>
           <div className={`bg-${mainColor}-50/50 p-6 rounded-[2rem] border-2 border-dashed border-${mainColor}-200`}>
              <p className="text-sm font-black text-gray-400 uppercase mb-4">Nhận xét của chuyên gia</p>
              <textarea className="w-full h-24 bg-white border-0 rounded-2xl p-4 text-sm outline-none shadow-inner" placeholder="Bé phát triển ổn định, cần duy trì chế độ ăn đa dạng..."></textarea>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 space-y-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-black"><ChevronLeft size={20} /> QUAY LẠI</button>
        <div className="flex bg-white rounded-2xl shadow-xl p-1 border border-blue-50">
          {[
            { id: 'part1', label: 'PHẦN I', icon: <BookOpen size={18} />, color: 'bg-blue-600' },
            { id: 'part2', label: 'PHẦN II', icon: <Activity size={18} />, color: 'bg-cyan-500' },
            { id: 'part3', label: 'PHẦN III', icon: <Stethoscope size={18} />, color: 'bg-indigo-600' },
            { id: 'part4', label: 'PHẦN IV', icon: <ChartIcon size={18} />, color: 'bg-emerald-600' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveMainTab(tab.id as any)} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black transition-all ${activeMainTab === tab.id ? `${tab.color} text-white shadow-lg` : 'text-gray-400 hover:bg-gray-50'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 shadow-xl"><Save size={20}/> LƯU HỒ SƠ</button>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden min-h-[900px] animate-in fade-in duration-500">
        
        {/* PHẦN I: THÔNG TIN CHUNG */}
        {activeMainTab === 'part1' && (
          <div className="animate-in slide-in-from-left-4 duration-500">
            <div className="bg-blue-600 p-10 text-white flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-widest">THÔNG TIN CHUNG</h2>
                <p className="opacity-80 mt-1 font-bold">(Thông tin do phụ huynh cung cấp khi nhập học)</p>
              </div>
              <div className="bg-white p-4 rounded-3xl text-blue-600 flex flex-col items-center min-w-[100px] shadow-2xl">
                <span className="text-xs font-black">PHẦN</span><span className="text-5xl font-black">I</span>
              </div>
            </div>
            
            <div className="flex border-b border-blue-50 bg-blue-50/20">
              {[{ id: 'info', label: 'Học sinh & Gia đình' }, { id: 'vaccine', label: 'Tiền sử tiêm chủng' }, { id: 'extra', label: 'Vấn đề sức khỏe khác' }].map(tab => (
                <button key={tab.id} onClick={() => setActiveSubTab(tab.id as any)} className={`flex-1 py-6 px-4 font-black text-sm transition-all border-b-4 ${activeSubTab === tab.id ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-400'}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-10 space-y-12">
              {activeSubTab === 'info' && (
                <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in">
                  <div className="space-y-6">
                    <p className="text-lg font-black text-blue-600 border-l-4 border-blue-600 pl-4 uppercase">1. Thông tin học sinh</p>
                    <DottedInput label="Tên Trường:" />
                    <div className="grid grid-cols-2 gap-8"><DottedInput label="Địa chỉ Trường:" /><DottedInput label="Xã/Phường/Quận/Huyện:" /></div>
                    <DottedInput label="Họ và tên học sinh:" />
                    <div className="flex flex-wrap items-center gap-10">
                      <div className="flex items-center gap-2"><span className="font-bold">Ngày sinh:</span><input className="w-12 border-b border-dotted text-center" />/<input className="w-12 border-b border-dotted text-center" />/<input className="w-20 border-b border-dotted text-center" /></div>
                      <div className="flex items-center gap-6"><span className="font-bold">Giới tính:</span><label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={studentGender === 'Nam'} onChange={() => setStudentGender('Nam')} /> Nam</label><label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={studentGender === 'Nữ'} onChange={() => setStudentGender('Nữ')} /> Nữ</label></div>
                    </div>
                    <div className="grid grid-cols-2 gap-8"><DottedInput label="Địa chỉ nơi hiện ở:" /><DottedInput label="Xã/Phường/Quận/Huyện:" /></div>
                    <BoxGroup count={12} label="Mã định danh cá nhân (12 số):" />
                    <BoxGroup count={15} label="Số thẻ BHYT (15 ký tự):" />
                  </div>

                  <div className="space-y-6 pt-10 border-t">
                    <p className="text-lg font-black text-blue-600 border-l-4 border-blue-600 pl-4 uppercase">2. Thông tin phụ huynh/người giám hộ</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                          <p className="font-bold text-gray-400 text-xs uppercase mb-2">Thông tin Bố</p>
                          <DottedInput label="Họ tên Bố:" /><DottedInput label="Nghề nghiệp:" /><DottedInput label="Số điện thoại:" />
                       </div>
                       <div className="space-y-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                          <p className="font-bold text-gray-400 text-xs uppercase mb-2">Thông tin Mẹ</p>
                          <DottedInput label="Họ tên Mẹ:" /><DottedInput label="Nghề nghiệp:" /><DottedInput label="Số điện thoại:" />
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-10 border-t">
                    <p className="text-lg font-black text-blue-600 border-l-4 border-blue-600 pl-4 uppercase">3. Quá trình sinh trưởng</p>
                    <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <DottedInput label="- Con thứ mấy:" /><DottedInput label="- Tuổi thai lúc sinh (tuần):" />
                      </div>
                      <div className="space-y-4">
                        <DottedInput label="- Tổng số con trong gia đình:" /><DottedInput label="- Cân nặng lúc sinh (gram):" />
                      </div>
                    </div>
                    <div className="flex gap-4 flex-wrap items-center">
                       <span className="font-bold">- Cách thức sinh:</span>
                       {['Sinh thường', 'Sinh mổ', 'Sinh mổ chủ động', 'Sinh chỉ huy', 'Giác hút', 'Forceps'].map(m => (
                         <label key={m} className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox"/> {m}</label>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-6 pt-10 border-t">
                    <p className="text-lg font-black text-blue-600 border-l-4 border-blue-600 pl-4 uppercase">4. Tiền sử bệnh lý</p>
                    <div className="space-y-4">
                      <p className="font-bold">Tiền sử gia đình (Ung thư, Tim bẩm sinh, Hen, Động kinh...):</p>
                      <MultiDottedLines label="Ghi rõ các bệnh lý mạn tính hoặc di truyền của người thân:" lines={2} />
                    </div>
                    <div className="space-y-4 mt-6">
                      <p className="font-bold">Trẻ đã từng được chẩn đoán mắc các bệnh sau:</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pl-4">
                         {['Hen phế quản', 'Tim bẩm sinh', 'Động kinh', 'Tăng động giảm chú ý', 'Dị ứng thực phẩm/thuốc', 'Bệnh máu mạn tính'].map(b => (
                           <label key={b} className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox"/> {b}</label>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'vaccine' && (
                <div className="animate-in fade-in">
                  <h3 className="text-xl font-black text-gray-800 mb-8 border-l-8 border-blue-600 pl-4 uppercase">Lịch sử tiêm chủng</h3>
                  <div className="overflow-x-auto border-2 border-gray-100 rounded-3xl shadow-sm">
                    <table className="w-full text-sm">
                       <thead className="bg-gray-50 border-b">
                         <tr className="font-black text-gray-600">
                           <th className="p-4 border-r">Tên bệnh phòng ngừa</th><th className="p-4 border-r">Tên vắc xin</th><th className="p-4 border-r">Mũi số</th><th className="p-4 border-r">Ngày tiêm</th><th className="p-4">Trạng thái</th>
                         </tr>
                       </thead>
                       <tbody>
                         {['Lao (BCG)', 'Viêm gan B', 'Bạch hầu-Ho gà-Uốn ván', 'Bại liệt (IPV/OPV)', 'Viêm màng não mủ do Hib', 'Sởi - Quai bị - Rubella', 'Viêm não Nhật Bản', 'Thủy đậu'].map((d, i) => (
                           <tr key={i} className="border-b last:border-0 hover:bg-gray-50/50">
                             <td className="p-4 border-r font-bold text-blue-700">{d}</td>
                             <td className="p-4 border-r"><input className="w-full outline-none bg-transparent" placeholder="Nhập tên vắc xin..." /></td>
                             <td className="p-4 border-r"><input className="w-full text-center outline-none bg-transparent" placeholder="1" /></td>
                             <td className="p-4 border-r"><input className="w-full text-center outline-none bg-transparent" placeholder="DD/MM/YYYY" /></td>
                             <td className="p-4 flex justify-center gap-4 font-bold text-[10px] uppercase">
                               <label className="flex items-center gap-1 text-green-600 cursor-pointer"><input type="radio" name={`v-${i}`} /> Đã tiêm</label>
                               <label className="flex items-center gap-1 text-red-500 cursor-pointer"><input type="radio" name={`v-${i}`} /> Chưa</label>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSubTab === 'extra' && (
                <div className="max-w-3xl mx-auto space-y-12 py-10">
                   <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-[2.5rem] shadow-inner">
                      <MultiDottedLines label="Trẻ có đang phải điều trị bệnh lý đặc biệt hoặc dùng thuốc định kỳ không? Nếu có, vui lòng ghi rõ:" lines={4} />
                      <MultiDottedLines label="Các vấn đề sức khỏe cần giáo viên lưu ý (Dị ứng, khó thở khi vận động mạnh, chảy máu cam, khó ngủ...):" lines={6} />
                   </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PHẦN II: THEO DÕI SỨC KHỎE */}
        {activeMainTab === 'part2' && (
          <div className="animate-in fade-in duration-500">
             <div className="bg-cyan-500 p-10 text-white flex justify-between items-center">
                <h2 className="text-4xl font-black uppercase tracking-widest">THEO DÕI SỨC KHỎE</h2>
                <div className="bg-white p-4 rounded-3xl text-cyan-600 flex flex-col items-center min-w-[100px] shadow-2xl">
                  <span className="text-xs font-black">PHẦN</span><span className="text-5xl font-black">II</span>
                </div>
             </div>
             
             <div className="flex border-b border-cyan-50 bg-cyan-50/20">
                <button onClick={() => setActivePart2Tab('growth')} className={`flex-1 py-6 font-black uppercase tracking-widest text-sm transition-all border-b-4 ${activePart2Tab === 'growth' ? 'border-cyan-500 text-cyan-600 bg-white' : 'border-transparent text-gray-400'}`}>1. Theo dõi cân nặng & chiều cao hàng tháng</button>
                <button onClick={() => setActivePart2Tab('incidents')} className={`flex-1 py-6 font-black uppercase tracking-widest text-sm transition-all border-b-4 ${activePart2Tab === 'incidents' ? 'border-cyan-500 text-cyan-600 bg-white' : 'border-transparent text-gray-400'}`}>2. Theo dõi diễn biến bất thường</button>
             </div>

             <div className="p-10">
                {activePart2Tab === 'growth' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {[...Array(8)].map((_, idx) => (
                       <div key={idx} className="border-2 border-cyan-100 rounded-3xl p-6 bg-cyan-50/10 space-y-4 hover:border-cyan-300 transition-colors shadow-sm">
                          <div className="flex justify-between font-black text-cyan-700 text-xs border-b border-cyan-100 pb-2">
                             <span>Tháng tuổi:</span> <input className="w-8 border-b-2 border-cyan-200 outline-none bg-transparent text-center" />
                          </div>
                          <DottedInput label="Cân nặng (kg):" />
                          <DottedInput label="Chiều cao (cm):" />
                          <div className="space-y-2 pt-4">
                             <p className="text-[10px] font-black text-gray-400 uppercase">Phân loại thể trạng:</p>
                             <div className="grid grid-cols-2 gap-1 text-[10px] font-bold">
                                {['Bình thường', 'Nhẹ cân', 'Béo phì', 'Gầy còm'].map(t => (
                                  <label key={t} className="flex items-center gap-1 cursor-pointer"><input type="radio" name={`g-${idx}`}/> {t}</label>
                                ))}
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                     <div className="overflow-x-auto border-2 border-gray-800 rounded-2xl">
                        <table className="w-full text-xs font-bold">
                           <thead className="bg-gray-100 border-b-2 border-gray-800">
                             <tr><th className="p-4 border-r border-gray-800">Thời gian</th><th className="p-4 border-r border-gray-800">Chẩn đoán tại trường</th><th className="p-4 border-r border-gray-800">Xử trí</th><th className="p-4 border-r border-gray-800">Chuyển viện</th><th className="p-4">Ghi chú</th></tr>
                           </thead>
                           <tbody>
                             {incidents.map(inc => (
                               <tr key={inc.id} className="border-b border-gray-800 last:border-0 h-14">
                                 <td className="p-3 border-r border-gray-800"><input className="w-full text-center outline-none" placeholder="DD/MM/YYYY" /></td>
                                 <td className="p-3 border-r border-gray-800"><input className="w-full outline-none" /></td>
                                 <td className="p-3 border-r border-gray-800"><input className="w-full outline-none" /></td>
                                 <td className="p-3 border-r border-gray-800"><input className="w-full outline-none" /></td>
                                 <td className="p-3"><input className="w-full outline-none" /></td>
                               </tr>
                             ))}
                           </tbody>
                        </table>
                     </div>
                     <button onClick={addIncidentRow} className="flex items-center gap-2 bg-cyan-100 text-cyan-700 font-black px-6 py-3 rounded-2xl hover:bg-cyan-200 transition-all"><Plus size={20}/> THÊM DÒNG MỚI</button>
                  </div>
                )}
             </div>
          </div>
        )}

        {/* PHẦN III: KHÁM CHUYÊN KHOA */}
        {activeMainTab === 'part3' && (
          <div className="animate-in fade-in duration-500">
             <div className="bg-indigo-600 p-10 text-white flex justify-between items-center">
                <h2 className="text-4xl font-black uppercase tracking-widest">KHÁM CHUYÊN KHOA</h2>
                <div className="bg-white p-4 rounded-3xl text-indigo-600 flex flex-col items-center min-w-[100px] shadow-2xl">
                  <span className="text-xs font-black">PHẦN</span><span className="text-5xl font-black">III</span>
                </div>
             </div>

             <div className="flex bg-indigo-50/20 border-b border-indigo-50 p-2 gap-2">
                {[
                  { id: 'internal', label: 'Khám Nội Khoa', icon: <HeartPulse size={18}/> },
                  { id: 'external', label: 'Khám Ngoại Khoa', icon: <Bone size={18}/> },
                  { id: 'dental', label: 'Răng-Hàm-Mặt', icon: <Smile size={18}/> }
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActivePart3Tab(tab.id as any)} className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl font-black transition-all ${activePart3Tab === tab.id ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'text-gray-400 hover:bg-white'}`}>
                    {tab.icon} {tab.label}
                  </button>
                ))}
             </div>

             <div className="p-10">
                {activePart3Tab === 'internal' && (
                  <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-4">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 shadow-inner">
                        {['Vòng đầu (cm)', 'Cân nặng (kg)', 'Mạch (l/p)', 'Huyết áp (mmHg)'].map(l => (
                          <div key={l} className="text-center">
                            <p className="text-[10px] font-black uppercase text-gray-400 mb-2">{l}</p>
                            <input className="w-full text-center text-2xl font-black bg-transparent border-b-2 border-indigo-400 outline-none text-indigo-900" />
                          </div>
                        ))}
                     </div>
                     <div className="border-2 border-gray-800 rounded-[2rem] overflow-hidden">
                        <table className="w-full text-sm font-bold">
                           <thead className="bg-gray-100 border-b-2 border-gray-800">
                             <tr><th className="p-4 border-r border-gray-800 text-left">Nội dung khám</th><th className="p-4 text-left">Kết quả / Bất thường</th></tr>
                           </thead>
                           <tbody>
                             {['Da - Niêm mạc', 'Hệ tuần hoàn', 'Hệ hô hấp', 'Hệ tiêu hóa', 'Hệ thận - Tiết niệu', 'Thần kinh - Tâm thần'].map((item, idx) => (
                               <tr key={idx} className="border-b border-gray-800 last:border-0 h-16">
                                 <td className="p-4 border-r border-gray-800 font-bold">{idx+1}. {item}</td>
                                 <td className="p-2"><input className="w-full h-full bg-transparent outline-none italic text-indigo-600" placeholder="Bình thường" /></td>
                               </tr>
                             ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
                )}

                {activePart3Tab === 'external' && (
                  <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in">
                     <div className="p-10 border-2 border-indigo-100 rounded-[3rem] space-y-10 bg-indigo-50/10">
                        <div className="space-y-4">
                           <p className="font-black text-indigo-900 uppercase tracking-widest text-sm border-b pb-2">a) Cột sống & Hệ vận động:</p>
                           <div className="flex gap-10 pl-6 font-bold">
                              {['Bình thường', 'Gù', 'Vẹo', 'Dị tật chi'].map(m => (
                                <label key={m} className="flex items-center gap-2 cursor-pointer"><input type="checkbox"/> {m}</label>
                              ))}
                           </div>
                        </div>
                        <DottedInput label="b) Cơ quan sinh dục ngoài:" />
                        <DottedInput label="c) Các dấu hiệu ngoại khoa khác:" />
                     </div>
                     <div className="bg-indigo-900 rounded-[3rem] p-12 text-white shadow-2xl">
                        <p className="text-2xl font-black uppercase mb-8 border-b border-white/20 pb-4">TỔNG KẾT KHÁM SỨC KHỎE</p>
                        <div className="space-y-6">
                           <DottedInput label="1. Phân loại thể lực:" className="text-white" />
                           <DottedInput label="2. Phát triển tâm thần vận động:" className="text-white" />
                           <DottedInput label="3. Bác sĩ kết luận & Đề nghị:" className="text-white" />
                        </div>
                        <div className="flex justify-end mt-16">
                           <div className="text-center w-64">
                              <p className="text-xs font-black uppercase mb-16 tracking-widest">Bác sĩ khám bệnh</p>
                              <div className="w-full h-[1px] bg-white/30"></div>
                              <p className="text-[10px] mt-2 italic opacity-60">(Ký và ghi rõ họ tên)</p>
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                {activePart3Tab === 'dental' && (
                  <div className="space-y-12 animate-in zoom-in duration-300">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-4">
                           <p className="font-black text-indigo-600 uppercase text-xs border-b-2 border-indigo-100 pb-2">Sơ đồ răng hàm trên</p>
                           {renderDentalTable([
                              { v: '18', s: '' }, { v: '17', s: '' }, { v: '16', s: '' }, { v: '15', s: '55' }, { v: '14', s: '54' },
                              { v: '13', s: '53' }, { v: '12', s: '52' }, { v: '11', s: '51' }, { v: '21', s: '61' }, { v: '22', s: '62' }
                           ])}
                        </div>
                        <div className="space-y-4">
                           <p className="font-black text-indigo-600 uppercase text-xs border-b-2 border-indigo-100 pb-2">Sơ đồ răng hàm dưới</p>
                           {renderDentalTable([
                              { v: '48', s: '' }, { v: '47', s: '' }, { v: '46', s: '' }, { v: '45', s: '85' }, { v: '44', s: '84' },
                              { v: '43', s: '83' }, { v: '42', s: '82' }, { v: '41', s: '81' }, { v: '31', s: '71' }, { v: '32', s: '72' }
                           ])}
                        </div>
                     </div>
                     <div className="bg-white p-10 rounded-[3rem] border-2 border-indigo-100 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                           <p className="font-black uppercase text-gray-400 text-xs">Vệ sinh răng miệng (OHI-S)</p>
                           <div className="grid grid-cols-2 gap-6">
                              <DottedInput label="PI (Mảng bám):" /><DottedInput label="CI (Vôi răng):" />
                           </div>
                        </div>
                        <div className="space-y-6">
                           <p className="font-black uppercase text-gray-400 text-xs">Ghi chú chuyên khoa RHM</p>
                           <textarea className="w-full h-24 bg-indigo-50/50 border-2 border-indigo-100 rounded-[2rem] p-6 outline-none focus:border-indigo-500 font-bold text-sm" placeholder="Ví dụ: Bé bị sâu răng sữa 54, 55 cần theo dõi hoặc can thiệp hàn răng..."></textarea>
                        </div>
                     </div>
                  </div>
                )}
             </div>
          </div>
        )}

        {/* PHẦN IV: BIỂU ĐỒ TĂNG TRƯỞNG */}
        {activeMainTab === 'part4' && (
          <div className="animate-in fade-in duration-500">
             <div className="bg-emerald-600 p-12 text-white relative overflow-hidden">
                <div className="absolute right-[-40px] top-[-40px] opacity-10"><ChartIcon size={300}/></div>
                <div className="flex items-center gap-6 relative z-10">
                   <div className="bg-white p-5 rounded-[2rem] min-w-[120px] flex flex-col items-center shadow-2xl text-emerald-600 font-black">
                      <span className="text-sm">PHẦN</span><span className="text-6xl">IV</span>
                   </div>
                   <div>
                      <h2 className="text-4xl font-black uppercase tracking-widest text-white">CÁC BIỂU ĐỒ THEO DÕI DINH DƯỠNG</h2>
                      <p className="text-emerald-100 font-bold mt-2 uppercase text-lg">Hệ thống phân tích chuẩn hóa theo tổ chức y tế thế giới WHO</p>
                   </div>
                </div>
             </div>

             <div className="flex bg-emerald-50/30 border-b border-emerald-100 p-3 gap-3">
                {[
                   { id: 'chart1', label: 'Cân nặng / Tuổi' },
                   { id: 'chart2', label: 'Chiều cao / Tuổi' },
                   { id: 'chart3', label: 'Cân nặng / Chiều cao' }
                ].map(tab => (
                   <button key={tab.id} onClick={() => setActivePart4Tab(tab.id as any)} className={`flex-1 py-5 font-black rounded-2xl transition-all uppercase tracking-tighter ${activePart4Tab === tab.id ? 'bg-emerald-600 text-white shadow-xl scale-[1.02]' : 'text-emerald-700/50 hover:bg-white'}`}>
                      {tab.label}
                   </button>
                ))}
             </div>

             <div className="p-10 space-y-12">
                <div className="flex justify-center gap-6">
                   <button onClick={() => setStudentGender('Nam')} className={`px-12 py-4 rounded-3xl font-black text-sm transition-all flex items-center gap-3 ${studentGender === 'Nam' ? 'bg-blue-600 text-white shadow-2xl scale-110' : 'bg-gray-100 text-gray-400'}`}><Baby size={22}/> BÉ TRAI</button>
                   <button onClick={() => setStudentGender('Nữ')} className={`px-12 py-4 rounded-3xl font-black text-sm transition-all flex items-center gap-3 ${studentGender === 'Nữ' ? 'bg-rose-500 text-white shadow-2xl scale-110' : 'bg-gray-100 text-gray-400'}`}><Baby size={22}/> BÉ GÁI</button>
                </div>

                <div className="max-w-6xl mx-auto">
                   {activePart4Tab === 'chart1' && <GrowthChart type="weight" gender={studentGender} data={childData} />}
                   {activePart4Tab === 'chart2' && <GrowthChart type="height" gender={studentGender} data={childData} />}
                   {activePart4Tab === 'chart3' && <GrowthChart type="wfh" gender={studentGender} data={childData} />}
                </div>

                <div className="text-center py-10 opacity-40 font-black tracking-[1em] text-gray-400">
                   WHO CHILD GROWTH STANDARDS
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="flex justify-center pb-20">
         <div className="flex items-center gap-4 text-gray-300 font-black tracking-widest">
            <div className="w-16 h-px bg-gray-200"></div>
            <span className="text-[10px] uppercase">Cộng hòa xã hội chủ nghĩa Việt Nam - Độc lập - Tự do - Hạnh phúc</span>
            <div className="w-16 h-px bg-gray-200"></div>
         </div>
      </div>
    </div>
  );
};

export default AddStudentForm;
