import Helper from "./helper";
export const initialAlert = {
  isShow: false,
  status: "default",
  message: "",
};

export const initialOption = [{ label: "Belum ada data", value: "" }];

export const initialAcademicYearOptions = async () => {
  const result = Helper.getAcademicYearOptions().slice(1);
  console.log("initialAcademicYearOptions => ", result);
  return result;
};

export const statusOptions = [
  { label: "Pilih Status", icon: "manage_accounts", value: "" },
  { label: "Aktif", icon: "check_circle", value: "active" },
  { label: "Lulus", icon: "school", value: "graduate" },
  { label: "Boyong", icon: "do_not_disturb_on", value: "dropout" },
];
