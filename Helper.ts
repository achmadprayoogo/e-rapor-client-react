import { getData } from "./fetcher";
import { AlertConfig, AlertStatus } from "./index";

export default class Helper {
  static closeAlert(): AlertConfig {
    return {
      isShow: false,
      alertStatus: "default" as AlertStatus,
      message: "",
    };
  }
  static successAlert(): AlertConfig {
    return {
      isShow: true,
      alertStatus: "success" as AlertStatus,
      message: "Berhasil menyimpan data",
    };
  }

  static confilctAlert(): AlertConfig {
    return {
      isShow: true,
      alertStatus: "error" as AlertStatus,
      message: "Data utama telah dimasukkan sebelumnya",
    };
  }

  static notFoundAlert(): AlertConfig {
    return {
      isShow: true,
      alertStatus: "error" as AlertStatus,
      message: "Data tidak ditemukan atau sudah dihapus",
    };
  }

  static errorAlert(): AlertConfig {
    return {
      isShow: true,
      alertStatus: "error" as AlertStatus,
      message: "Gagal menyimpan data",
    };
  }

  static setOptions(data: [], label: string) {
    return data.map((item: any) => ({
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

  static async getGradeOptions(academicyearId: string) {
    const result = await getData("/api/admin/gradeclass/" + academicyearId);

    if (!result) {
      throw new Error("Failed to fetch grade data");
    }

    const grades = this.setOptions(result.data, "grade_class");
    return [{ label: "Pilih Tingkat", value: "" }, ...grades];
  }

  static async getClassNameOptions(gradeId: string) {
    const result = await getData("/api/admin/classname/" + gradeId);

    if (!result) {
      throw new Error("Failed to fetch class data");
    }

    const classes = this.setOptions(result.data, "class_name");
    return [{ label: "Pilih Kelas", value: "" }, ...classes];
  }

  static async getHomeroomTeacher(classId: string) {
    const result = await getData("/api/admin/classname/find/" + classId);

    if (!result) {
      throw new Error("Failed to fetch homeroom teacher data");
    }

    return `Ust. ${result.data.attributes.homeroom_teacher}`;
  }

  static formatStudentData(data: any) {
    let studentStatus = data.attributes.relationships?.student_status[0];
    let status = studentStatus ? studentStatus.attributes.status : "-";
    status =
      status === "active"
        ? "Aktif"
        : status === "dropout"
        ? "Boyong"
        : status === "graduate"
        ? "Lulus"
        : "-";

    return {
      ...data.attributes,
      id: data.id,
      nis: data.attributes.nis.toString(),
      fullname: this.capitalizeWords(data.attributes.fullname),
      status,
      city_of_birth: this.capitalizeWords(data.attributes.city_of_birth),
      father_name: this.capitalizeWords(data.attributes.father_name),
      mother_name: this.capitalizeWords(data.attributes.mother_name),
      guardian_name: this.capitalizeWords(data.attributes.guardian_name || "-"),
      address: this.capitalizeWords(data.attributes.address),
      birthdate: new Date(data.attributes.birthdate),
      age:
        new Date().getFullYear() -
        new Date(data.attributes.birthdate).getFullYear(),
      created_at: undefined,
      updated_at: undefined,
    };
  }

  static capitalizeWords(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  static async getStudentData(studentId: string) {
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