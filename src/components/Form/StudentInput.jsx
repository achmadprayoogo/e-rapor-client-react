import { useState, useEffect } from "react";
import Input from "./Input";
import Loading from "../Loading/Loading";
import ErrorServer from "../ErrorServer/ErrorServer";
import { getData, postData } from "../../fetcher";
import Alert from "../Alert/Alert";

export default function StudentInput() {
  const [formData, setFormData] = useState({});
  const [academicYear, setAcademicYear] = useState([
    { label: "Belum ada data", value: "" },
  ]);
  const [grade, setGrade] = useState([{ label: "Belum ada data", value: "" }]);
  const [classRoom, setClassRoom] = useState([
    { label: "Belum ada data", value: "" },
  ]);
  const [homeroomTeacher, setHomeroomTeacher] = useState("Belum ada data");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState({
    isShow: false,
    status: "default",
    message: "",
  });

  useEffect(() => {
    async function fetchData() {
      const resultData = await getData(
        "http://localhost:3000/api/admin/academicyear"
      );

      if (resultData) {
        const academicYearData = resultData.data.map((year) => ({
          label: year.attributes.academic_year,
          value: year.id,
        }));

        setAcademicYear([
          { label: "Pilih Tahun Ajaran", value: "" },
          ...academicYearData,
        ]);
      }
      setLoading(false);
    }

    fetchData();
  }, [academicYear]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "academic_year") {
      const selectedYearId = value;
      const result = await getData(
        `http://localhost:3000/api/admin/gradeclass/${selectedYearId}`
      );

      if (result) {
        const grades = result.data.map((grade) => ({
          label: grade.attributes.grade_class,
          value: grade.id,
        }));
        setGrade([{ label: "Pilih Tingkat", value: "" }, ...grades]);
      } else {
        console.error("Failed to fetch grade data");
      }

      return;
    } else if (name === "grade_id") {
      const selectedGradeId = value;
      const result = await getData(
        `http://localhost:3000/api/admin/classname/${selectedGradeId}`
      );

      if (result) {
        const classes = result.data.map((classRoom) => ({
          label: classRoom.attributes.class_name,
          value: classRoom.id,
        }));
        setClassRoom([{ label: "Pilih Kelas", value: "" }, ...classes]);
      } else {
        console.error("Failed to fetch class data");
      }

      return;
    } else if (name === "class_name_id") {
      const selectedClassNameId = value;
      const result = await getData(
        `http://localhost:3000/api/admin/classname/find/${selectedClassNameId}`
      );

      if (result) {
        setHomeroomTeacher(`Ust. ${result.data.attributes.homeroom_teacher}`);
      } else {
        console.error("Failed to find homeroom teacher data");
      }
    }

    // Update formData for other fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setShowAlert((prev) => ({ ...prev, isShow: false }));
    e.preventDefault();

    try {
      const result = await postData(
        "http://localhost:3000/api/admin/students/input",
        formData
      );
      console.log(result);
      console.log("success");
      setShowAlert({
        isShow: true,
        status: "success",
        message: "Berhasil menyimpan data",
      });
    } catch (error) {
      console.log(error);
      setError(error);
      setShowAlert({
        isShow: true,
        status: "error",
        message: "Gagal menyimpan data",
      });
    }
  };

  const handleAlertClose = () => {
    setShowAlert((prev) => ({ ...prev, isShow: false }));
  };

  if (loading) {
    return <Loading />;
  }

  if (error && error.status && error.status === 500) {
    return <ErrorServer />;
  }

  return (
    <div className="p-4 h-full w-[calc(100vw-5rem)] flex flex-row border-e-2">
      <div className="flex flex-col space-y-4 w-full p-4">
        <div>
          <h3 className="text-2xl font-bold mb- text-white text-center">
            INPUT DATA SANTRI
          </h3>
          <Alert
            initialHidden={!showAlert.isShow}
            status={showAlert.status}
            message={showAlert.message}
            onClose={handleAlertClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="w-full h-full">
          <div className="flex flex-row w-full">
            <div className="w-1/2 p-4 space-y-1">
              <p className="text-white mb-2 ">BIODATA</p>
              <Input
                label="Nomor Induk Santri"
                required={true}
                labelWidth="250px"
                type="number"
                name="nis"
                onChange={handleChange}
              />
              <Input
                label="Nama Lengkap"
                required={true}
                labelWidth="250px"
                type="text"
                name="fullname"
                onChange={handleChange}
              />
              <Input
                label="Tempat Lahir"
                required={true}
                labelWidth="250px"
                type="text"
                name="city_of_birth"
                onChange={handleChange}
              />
              <Input
                label="Tanggal Lahir"
                required={true}
                labelWidth="250px"
                type="date"
                name="birthdate"
                onChange={handleChange}
              />
              <Input
                label="Nama Ayah"
                required={true}
                labelWidth="250px"
                type="text"
                name="father_name"
                onChange={handleChange}
              />
              <Input
                label="Nama Ibu"
                required={true}
                labelWidth="250px"
                type="text"
                name="mother_name"
                onChange={handleChange}
              />
              <Input
                label="Nama Wali"
                labelWidth="250px"
                type="text"
                name="guardian_name"
                onChange={handleChange}
              />
              <Input
                label="Alamat"
                required={true}
                labelWidth="250px"
                type="text"
                name="address"
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2 p-4 space-y-1">
              <p className="text-white mb-2">AKADEMIK</p>
              <Input
                label="Tahun Ajaran"
                required={true}
                labelWidth="250px"
                type="select"
                name="academic_year"
                options={academicYear}
                onChange={handleChange}
              />
              <Input
                label="Status"
                labelWidth="250px"
                type="select"
                options={[
                  { label: "Aktif", value: "active" },
                  { label: "Lulus", value: "graduate" },
                  { label: "Boyong", value: "dropout" },
                ]}
                name="status"
                onChange={handleChange}
              />
              <Input
                label="Tingkat"
                required={true}
                labelWidth="250px"
                type="select"
                name="grade_id"
                options={grade}
                onChange={handleChange}
              />
              <Input
                label="Kelas"
                required={true}
                labelWidth="250px"
                type="select"
                name="class_name_id"
                options={classRoom}
                onChange={handleChange}
              />
              <Input
                label="Walikelas"
                labelWidth="250px"
                type="text"
                name="homeroom_teacher"
                homeroomTeacher={homeroomTeacher} // Pastikan ini terhubung dengan benar
                readOnly // Menjadikan input ini hanya baca
              />
            </div>
          </div>
          <div className="flex flex-row justify-center mt-4">
            <button
              type="submit"
              className="bg-green-700 w-1/2 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
