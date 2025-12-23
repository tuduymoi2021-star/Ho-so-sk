
export enum UserRole {
  NURSE = 'NURSE',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
}

export interface HealthRecord {
  id: string;
  studentId: string;
  date: string;
  weight: number; 
  height: number;
  temperature: number;
  note: string;
  status: 'Normal' | 'Warning' | 'Urgent';
}

export interface VaccinationEntry {
  disease: string;
  schedule: string;
  vaccineName: string;
  dose: string;
  date: string;
  status: 'Đã tiêm' | 'Chưa tiêm' | 'Không nhớ rõ';
  note: string;
}

export interface Student {
  id: string;
  name: string;
  dob: string;
  gender: 'Nam' | 'Nữ';
  class: string;
  avatar: string;
  
  // Added missing fields used in mockData and StudentDetail view to fix TS errors
  parentName?: string;
  phone?: string;
  parentId?: string;
  
  // Thông tin chung (Phần I)
  schoolName?: string;
  schoolAddress?: string;
  studentAddress?: string;
  studentIdCode?: string; // Mã định danh 12 số
  insuranceCode?: string; // Thẻ BHYT 15 ký tự
  
  // Phụ huynh
  fatherName?: string;
  fatherJob?: string;
  fatherPhone?: string;
  motherName?: string;
  motherJob?: string;
  motherPhone?: string;
  
  // Quá trình sinh trưởng
  birthOrder?: number;
  totalChildren?: number;
  gestationalAge?: number; // tuần
  birthWeight?: number; // gram
  deliveryMethod?: string;
  birthDefects?: string;
  motherPregnancyIllness?: string;
  
  // Tiền sử
  familyHistory?: string[]; // Danh sách các bệnh tích chọn
  childHistory?: string[];
  
  // Tiêm chủng (Phần II) - Changed to optional to match mockData
  vaccinations?: VaccinationEntry[];
  
  // Vấn đề khác (Phần III)
  currentTreatment?: string;
  healthNotes?: string;
  recentRecords: HealthRecord[];
}
