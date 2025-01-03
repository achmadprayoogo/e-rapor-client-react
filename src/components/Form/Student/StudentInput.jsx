import { useState, useEffect } from "react";
import Input from "../Input";
import Loading from "../../Loading/Loading";
import ErrorServer from "../../ErrorServer/ErrorServer";
import { postData } from "../../../../fetcher";
import Alert from "../../Alert/Alert";
import TitleInput from "../TitleInput";
import BackButton from "../BackButton";
import { initialAlert, initialOption } from "../../../../initialStates";
import Helper from "../../../../helper";

export default function StudentInput() {
  const [formData, setFormData] = useState({});
  const [academicYear, setAcademicYear] = useState(initialOption);
  const [grade, setGrade] = useState(initialOption);
  const [classRoom, setClassRoom] = useState(initialOption);
  const [homeroomTeacher, setHomeroomTeacher] = useState("Belum ada data");
  const [alert, setAlert] = useState(initialAlert);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await Helper.getAcademicYearOptions();
      setAcademicYear(result);

      setLoading(false);
    }

    fetchData();
  }, [academicYear]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let result;

    switch (name) {
      case "academic_year":
        result = await Helper.getGradeOptions(value);
        setGrade(result);
        break;

      case "grade_id":
        result = await Helper.getClassNameOptions(value);
        setClassRoom(result);
        break;

      case "class_name_id":
        result = await Helper.getHomeroomTeacher(value);
        setHomeroomTeacher(result);
        break;

      default:
        break;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setAlert(Helper.closeAlert());
    e.preventDefault();

    const result = await postData("/api/admin/students/input", formData);

    switch (result.status) {
      case 201:
        setAlert(Helper.successAlert());
        break;

      case 409:
        setAlert(Helper.confilctAlert());
        break;

      case 500:
        setError(result);
        break;

      default:
        setAlert(Helper.errorAlert());
        break;
    }
  };

  const handleAlertClose = () => {
    setAlert(Helper.closeAlert());
  };

  if (loading) {
    return <Loading />;
  }

  if (error && error.status && error.status === 500) {
    return <ErrorServer />;
  }

  return (
    <div className="p-4 h-full w-[calc(100vw-5rem)] flex flex-row border-e-2">
      <div className="relative flex flex-col space-y-4 w-full p-4">
        <div>
          <BackButton link="/biodata" />
          <TitleInput>INPUT DATA SANTRI</TitleInput>
          <Alert
            isShow={!alert.isShow}
            status={alert.status}
            message={alert.message}
            onClose={handleAlertClose}
          />
          <a
            href="/biodata-input"
            className="text-white underline absolute top-4 right-4"
          >
            reset
          </a>
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
                  { label: "Pilih Status", value: "" },
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
                homeroomTeacher={homeroomTeacher}
                readOnly
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
