import Helper from "./Helper";
import { AlertStatus } from "./index";

export const initialAlert = {
  isShow: false,
  alertStatus: "default" as AlertStatus,
  message: "",
  onClose: () => {},
};

export const initialStudentData = {
  nis: "",
  fullname: "",
  city_of_birth: "",
  birthdate: new Date(),
  father_name: "",
  mother_name: "",
  guardian_name: "",
  address: "",
};

export const initialFormInputStudent = {
  nis: "",
  fullname: "",
  city_of_birth: "",
  birthdate: "",
  father_name: "",
  mother_name: "",
  guardian_name: "",
  address: "",
  academic_year_id: "",
  class_name_id: "",
  status: "active" as "active" | "graduate" | "dropout",
};

export const initialFormUpdateStudent = {
  id: "",
  nis: "",
  fullname: "",
  city_of_birth: "",
  birthdate: new Date(),
  father_name: "",
  mother_name: "",
  guardian_name: "",
  address: "",
};

export const initialOption = [{ label: "Belum ada data", value: "" }];

export const initialAcademicYearOptions = async () => {
  const result = (await Helper.getAcademicYearOptions()).slice(1);
  return result;
};

export const statusOptions = [
  { label: "Pilih Status", icon: "manage_accounts", value: "" },
  { label: "Aktif", icon: "check_circle", value: "active" },
  { label: "Lulus", icon: "school", value: "graduate" },
  { label: "Boyong", icon: "do_not_disturb_on", value: "dropout" },
];