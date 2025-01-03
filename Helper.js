import { getData } from "./fetcher";

export default class Helper {
  static closeAlert() {
    return {
      isShow: false,
      status: "",
      message: "",
    };
  }
  static successAlert() {
    return {
      isShow: true,
      status: "success",
      message: "Berhasil menyimpan data",
    };
  }

  static confilctAlert() {
    return {
      isShow: true,
      status: "error",
      message: "Data utama telah dimasukkan sebelumnya",
    };
  }

  static notFoundAlert() {
    return {
      isShow: true,
      status: "error",
      message: "Data tidak ditemukan atau sudah dihapus",
    };
  }

  static errorAlert() {
    return {
      isShow: true,
      status: "error",
      message: "Gagal menyimpan data",
    };
  }

  static setOptions(data, label) {
    return data.map((item) => ({
      label: item.attributes[label],
      value: item.id,
    }));
  }

  static async getAcademicYearOptions() {
    const result = await getData("/api/admin/academicyear");

    if (!result) {
      throw new Error("Failed to fetch academic year data");
    }

    const academicYears = this.setOptions(result.data, "academic_year");
    return [{ label: "Pilih Tahun Ajaran", value: "" }, ...academicYears];
  }

  static async getGradeOptions(academicyearId) {
    const result = await getData("/api/admin/gradeclass/" + academicyearId);

    if (!result) {
      throw new Error("Failed to fetch grade data");
    }

    const grades = this.setOptions(result.data, "grade_class");
    return [{ label: "Pilih Tingkat", value: "" }, ...grades];
  }

  static async getClassNameOptions(gradeId) {
    const result = await getData("/api/admin/classname/" + gradeId);

    if (!result) {
      throw new Error("Failed to fetch class data");
    }

    const classes = this.setOptions(result.data, "class_name");
    return [{ label: "Pilih Kelas", value: "" }, ...classes];
  }

  static async getHomeroomTeacher(classId) {
    const result = await getData("/api/admin/classname/find/" + classId);

    if (!result) {
      throw new Error("Failed to fetch homeroom teacher data");
    }

    return `Ust. ${result.data.attributes.homeroom_teacher}`;
  }

  static formatStudentData(data) {
    return {
      ...data.attributes,
      id: data.id,
      nis: data.attributes.nis.toString(),
      birthdate: data.attributes.birthdate.split("T")[0].toString(),
      age:
        new Date().getFullYear() -
        new Date(data.attributes.birthdate).getFullYear(),
      created_at: undefined,
      updated_at: undefined,
    };
  }

  static async getStudentData(studentId) {
    const result = await getData(`/api/admin/student/${studentId}`);

    if (result.error) {
      return result;
    }

    if (!result) {
      throw new Error("Failed to fetch student data");
    }

    return this.formatStudentData(result.data.data);
  }
}
