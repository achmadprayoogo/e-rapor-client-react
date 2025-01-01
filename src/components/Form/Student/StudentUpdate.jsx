import { useState, useEffect } from "react";
import Input from "../Input";
import Loading from "../../Loading/Loading";
import ErrorServer from "../../ErrorServer/ErrorServer";
import NotFoundError from "../../NotFoundError/NotFoundError";
import { deleteData, getData, patchData } from "../../../fetcher";
import Alert from "../../Alert/Alert";

export default function StudentInput() {
  const initialAlert = {
    isShow: false,
    status: "default",
    message: "",
  };

  const [formData, setFormData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(initialAlert);
  const [lastData, setLastData] = useState({});
  const studentId = window.location.search.split("=")[1];

  useEffect(() => {
    async function getStudentData() {
      setLoading(true);
      const result = await getData(`/api/admin/student/${studentId}`);
      console.log(result);
      if (result.error) {
        setError(result);
      }
      setLoading(false);

      const studentData = {
        ...result.data.data.attributes,
        id: result.data.data.id,
        nis: result.data.data.attributes.nis.toString(),
        birthdate: result.data.data.attributes.birthdate
          .split("T")[0]
          .toString(),
        created_at: undefined,
        updated_at: undefined,
      };
      setFormData(studentData);
      setLastData(studentData);
    }
    getStudentData();
  }, [studentId]);

  useEffect(() => {
    const hasChanges = JSON.stringify(lastData) !== JSON.stringify(formData);

    setIsUpdate(hasChanges);
  }, [formData, lastData]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("submit");
    setShowAlert((prev) => ({ ...prev, isShow: false }));
    e.preventDefault();
    const result = await patchData("/api/admin/students/update", formData);

    if (result.error) {
      if (result.status === 409) {
        console.log(`result.status === 409`);
        setShowAlert({
          isShow: true,
          status: "error",
          message: "Nomor NIS telah dimasukkan sebelumnya",
        });
      } else if (result.status === 500) {
        setError(result);
      } else {
        setShowAlert({
          isShow: true,
          status: "error",
          message: "Gagal menyimpan data",
        });
      }
    } else {
      setShowAlert({
        isShow: true,
        status: "success",
        message: "Berhasil menyimpan data",
      });
      setIsUpdate(false);
    }
  };

  const handleDelete = async () => {
    window.location.href = "/biodata-delete?id=" + studentId;
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

  if (error && error.status && error.status === 404) {
    return <NotFoundError data={"Santri"} />;
  }

  return (
    <div className="p-4 h-full w-[calc(100vw-5rem)] flex flex-row border-e-2">
      <div className="relative flex flex-col space-y-4 w-full p-4">
        <div>
          <a href="/biodata" className="text-white absolute top-4 left-4">
            <span className="material-symbols-outlined">arrow_back</span>
          </a>
          <h3 className="text-2xl font-bold mb- text-white text-center">
            UPDATE DATA SANTRI
          </h3>
          <Alert
            initialHidden={!showAlert.isShow}
            status={showAlert.status}
            message={showAlert.message}
            onClose={handleAlertClose}
          />
          <div className="text-white underline absolute top-4 right-4 flex flex-row space-x-4">
            <a
              href={window.location.pathname + window.location.search}
              className=""
            >
              reset
            </a>
            <button onClick={handleDelete} className="text-red-500">
              delete
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full h-full">
          <div className="flex flex-row w-full">
            <div className="w-full p-4 space-y-1">
              <p className="text-white mb-2 ">BIODATA</p>
              <Input
                label="Nomor Induk Santri"
                required={true}
                labelWidth="250px"
                type="number"
                name="nis"
                value={formData.nis}
                onChange={handleChange}
              />
              <Input
                label="Nama Lengkap"
                required={true}
                labelWidth="250px"
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
              <Input
                label="Tempat Lahir"
                required={true}
                labelWidth="250px"
                type="text"
                name="city_of_birth"
                value={formData.city_of_birth}
                onChange={handleChange}
              />
              <Input
                label="Tanggal Lahir"
                required={true}
                labelWidth="250px"
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
              <Input
                label="Nama Ayah"
                required={true}
                labelWidth="250px"
                type="text"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
              />
              <Input
                label="Nama Ibu"
                required={true}
                labelWidth="250px"
                type="text"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleChange}
              />
              <Input
                label="Nama Wali"
                labelWidth="250px"
                type="text"
                name="guardian_name"
                value={formData.guardian_name}
                onChange={handleChange}
              />
              <Input
                label="Alamat"
                required={true}
                labelWidth="250px"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center mt-4">
            <button
              type="submit"
              disabled={!isUpdate}
              className={`${
                isUpdate ? "bg-yellow-500" : "bg-slate-500"
              } w-1/2 text-white px-4 py-2 rounded-md font-semibold`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
