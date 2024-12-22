import { useState } from "react";
import Input from "./Input";
import { getData } from "../../fetcher";

export default function StudentInput() {
  const [formData, setFormData] = useState({
    nis: "",
    fullname: "",
    birthdate: "",
    city_of_birth: "",
    father_name: "",
    mother_name: "",
    guardian_name: "",
    status: "",
    address: "",
  });
  const [academicYear, setAcademicYear] = useState([]);
  const [grade, setGrade] = useState([]);
  const [classRoom, setClassRoom] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resultData = await getData(
        "http://localhost:3000/api/admin/students?page[number]=1&page[size]=20"
      );
      if (resultData) {
        setStudents(resultData);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="p-4 h-full w-[calc(100vw-5rem)] flex flex-row border-e-2">
      <div className="flex flex-col space-y-4 w-full p-4">
        <h3 className="text-2xl font-bold mb- text-white text-center">
          INPUT DATA SANTRI
        </h3>
        <form onSubmit={handleSubmit} className="w-full h-full">
          <div className="flex flex-row w-full">
            <div className="w-1/2 p-4 space-y-1">
              <p className="text-white mb-2 ">BIODATA</p>
              <Input
                label="Nomor Induk Santri"
                required="true"
                labelWidth="250px"
                type="number"
                name="nis"
              />
              <Input
                label="Nama Lengkap"
                labelWidth="250px"
                type="text"
                name="fullname"
              />
              <Input
                label="Tempat Lahir"
                labelWidth="250px"
                type="text"
                name="city_of_birth"
              />
              <Input
                label="Tanggal Lahir"
                labelWidth="250px"
                type="date"
                name="birthdate"
              />
              <Input
                label="Nama Ayah"
                labelWidth="250px"
                type="text"
                name="father_name"
              />
              <Input
                label="Nama Ibu"
                labelWidth="250px"
                type="text"
                name="mother_name"
              />
              <Input
                label="Nama Wali"
                labelWidth="250px"
                type="text"
                name="guardian_name"
              />
              <Input
                label="Alamat"
                labelWidth="250px"
                type="text"
                name="address"
              />
            </div>
            <div className="w-1/2 p-4 space-y-1">
              <p className="text-white mb-2">AKADEMIK</p>
              <Input
                label="Tahun Ajaran"
                labelWidth="250px"
                type="select"
                name="academic_year"
                options={[
                  { label: "2020/2021", value: "321" },
                  { label: "2021/2022", value: "212" },
                  { label: "2022/2023", value: "222" },
                ]}
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
              />
              <Input
                label="Tingkat"
                labelWidth="250px"
                type="select"
                name="grade_id"
                options={[
                  { label: "1 wustho", value: "1232" },
                  { label: "2 wustho", value: "123" },
                  { label: "3 wustho", value: "233" },
                ]}
              />
              <Input
                label="Kelas"
                labelWidth="250px"
                type="select"
                name="class_id"
                options={[
                  { label: "A", value: "A" },
                  { label: "B", value: "B" },
                  { label: "C", value: "C" },
                ]}
              />
              <Input
                label="Walikelas"
                labelWidth="250px"
                type="text"
                name="homeroom_teacher"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center mt-4">
            <button
              type="submit"
              onClick={handleSubmit}
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
