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
  { label: "Pilih Status", value: "" },
  { label: "Aktif", value: "active" },
  { label: "Lulus", value: "graduate" },
  { label: "Boyong", value: "dropout" },
];
