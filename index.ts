export interface Student {
  id: string;
  nis: string;
  fullname: string;
  city_of_birth: string;
  birthdate: Date;
  father_name: string;
  mother_name: string;
  guardian_name: string;
  address: string;
}

export enum StudentStatus {
  ACTIVE = "active",
  GRADUATE = "graduate",
  DROPOUT = "dropout",
}

export enum AlertStatus {
  DEFAULT = "default",
  SUCCESS = "success",
  ERROR = "error",
}

export interface AlertConfig {
  isShow: boolean;
  alertStatus: AlertStatus;
  message: string;
  onClose?: () => void;
}

export interface StudentInputProps {
  formData: Student;
  isUpdate: boolean;
  loading: boolean;
  statusResponse: number;
  alert: AlertConfig;
  lastData: Student;
  studentId: string;
  setFormData: (value: Student) => void;
  setIsUpdate: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setStatusResponse: (value: number) => void;
  setAlert: (value: AlertConfig) => void;
  setLastData: (value: Student) => void;
}

export interface StudentInputState {
  formData: Student;
  isUpdate: boolean;
  loading: boolean;
  statusResponse: number;
  alert: AlertConfig;
  lastData: Student;
  studentId: string;
}

export interface StudentDeleteProps {
  formData: Student;
  setFormData: (value: Student) => void;
}

export interface Options {
  label: string;
  value: string;
}

export interface FormUpdateStudent {
  nis: string;
  fullname: string;
  city_of_birth: string;
  birthdate: string;
  father_name: string;
  mother_name: string;
  guardian_name: string;
  address: string;
}

export interface FormInputStudent {
  nis: string;
  fullname: string;
  city_of_birth: string;
  birthdate: string;
  father_name: string;
  mother_name: string;
  guardian_name: string;
  address: string;
  academic_year_id: string;
  status: "active" | "dropout" | "graduate";
  class_name_id: string;
}
