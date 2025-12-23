
import { User, UserRole, Student, VaccinationEntry } from './types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'yte_mamnon',
    fullName: 'Y tá Nguyễn Thị Hoa',
    role: UserRole.NURSE,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nurse'
  },
  {
    id: '2',
    username: 'admin',
    fullName: 'Quản lý Trần Văn Nam',
    role: UserRole.ADMIN,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  }
];

const generateVaccinations = (): VaccinationEntry[] => [
  { disease: 'Lao', schedule: 'Sơ sinh', vaccineName: 'BCG', dose: '1', date: '2023-01-15', status: 'Đã tiêm', note: '' },
  { disease: 'Viêm gan B', schedule: 'Sơ sinh', vaccineName: 'Gene-HBv', dose: '1', date: '2023-01-15', status: 'Đã tiêm', note: '' },
  { disease: 'Bạch hầu-Ho gà-Uốn ván', schedule: '2 tháng', vaccineName: 'ComBE Five', dose: '1', date: '2023-03-15', status: 'Đã tiêm', note: '' }
];

const generateRecentRecords = (baseWeight: number, baseHeight: number) => [
  { id: Math.random().toString(), studentId: '', date: '2024-03-01', weight: baseWeight, height: baseHeight, temperature: 36.6, note: 'Bình thường', status: 'Normal' as const },
  { id: Math.random().toString(), studentId: '', date: '2024-02-01', weight: baseWeight - 0.5, height: baseHeight - 2, temperature: 36.5, note: 'Tốt', status: 'Normal' as const }
];

const classes = ['Lớp Mầm 1', 'Lớp Mầm 2'];
const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Đặng', 'Bùi'];
const middleNames = ['Gia', 'Minh', 'Thị', 'Văn', 'Anh', 'Bảo', 'Hoàng', 'Ngọc', 'Khánh', 'Đức'];
const lastNames = ['Bảo', 'Anh', 'Hùng', 'Trang', 'Duy', 'Linh', 'Quân', 'Chi', 'Tâm', 'Hải'];

export const MOCK_STUDENTS: Student[] = Array.from({ length: 30 }).map((_, i) => {
  const gender = Math.random() > 0.5 ? 'Nam' : 'Nữ';
  const name = `${firstNames[i % 10]} ${middleNames[(i + 1) % 10]} ${lastNames[(i + 2) % 10]}`;
  const className = classes[i % 2];
  const ageInMonths = 6 + (i % 31); // 6 to 36 months
  const baseWeight = 7 + (ageInMonths * 0.25);
  const baseHeight = 65 + (ageInMonths * 0.8);
  
  return {
    id: `s${i + 1}`,
    name,
    dob: new Date(2024, 3 - ageInMonths, 1).toISOString().split('T')[0],
    gender: gender as 'Nam' | 'Nữ',
    class: className,
    parentName: `${firstNames[i % 10]} Văn ${(i + 5) % 10}`,
    phone: `090${Math.floor(1000000 + Math.random() * 9000000)}`,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${i}`,
    schoolName: 'Trường Mầm Non Hoa Sen',
    studentIdCode: '0123456789' + (i < 10 ? '0' + i : i),
    insuranceCode: 'GD479' + Math.floor(1000000000 + Math.random() * 9000000000),
    fatherName: `${firstNames[i % 10]} Văn B`,
    motherName: `${firstNames[(i + 2) % 10]} Thị C`,
    recentRecords: generateRecentRecords(baseWeight, baseHeight),
    vaccinations: generateVaccinations()
  };
});
