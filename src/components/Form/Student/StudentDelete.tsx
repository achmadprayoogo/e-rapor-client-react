import { useState, useEffect } from "react";
import Input from "../Input";
import Loading from "../../Loading/Loading";
import ErrorServer from "../../ErrorServer/ErrorServer";
import NotFoundError from "../../NotFoundError/NotFoundError";
import { deleteData } from "../../../../fetcher";
import Alert from "../../Alert/Alert";
import ContentContainer from "../../ContentContainer";
import {
  initialAlert,
  initialFormUpdateStudent,
} from "../../../../initialStates";
import Helper from "../../../../Helper";
import { AlertConfig, Student } from "../../../../index";
import { useNavigate } from "react-router";

export default function StudentInput() {
  const [formData, setFormData] = useState<Student>(initialFormUpdateStudent);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<AlertConfig>(initialAlert);
  const [statusResponse, setStatusResponse] = useState<number>(0);
  const studentId: string = window.location.search.split("=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    async function getStudentData() {
      const result = await Helper.getStudentData(studentId);

      setStatusResponse(result.status);

      setLoading(false);
      setFormData(result);
    }
    getStudentData();
  }, [studentId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAlert(Helper.closeAlert());
    e.preventDefault();

    const result = await deleteData(
      `/api/admin/students/delete?id=${studentId}`
    );

    setStatusResponse(result.status);

    switch (result.status) {
      case 200:
        setAlert(Helper.successAlert());
        break;
      case 404:
        setAlert(Helper.notFoundAlert());
        break;
      default:
        setAlert(Helper.errorAlert());
        break;
    }

    setTimeout(() => setAlert(Helper.closeAlert()), 3000);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleAlertClose = () => {
    setAlert(Helper.closeAlert());
  };

  if (loading) {
    return <Loading />;
  }

  if (statusResponse === 500) {
    return <ErrorServer />;
  }

  if (statusResponse === 404) {
    return <NotFoundError data={"Santri"} />;
  }

  return (
    <ContentContainer>
      <div className="relative flex flex-col space-y-4 w-full p-4">
        <div>
          <button
            onClick={handleCancel}
            className="text-white absolute top-4 left-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h3 className="text-2xl font-bold mb- text-white text-center">
            DELETE DATA SANTRI
          </h3>
          <Alert
            isShow={!alert.isShow}
            alertStatus={alert.alertStatus}
            message={alert.message}
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
                value={formData.nis}
                readOnly={true}
              />
              <Input
                label="Nama Lengkap"
                required={true}
                labelWidth="250px"
                type="text"
                name="fullname"
                value={formData.fullname}
                readOnly={true}
              />
              <Input
                label="Tempat Lahir"
                required={true}
                labelWidth="250px"
                type="text"
                name="city_of_birth"
                value={formData.city_of_birth}
                readOnly={true}
              />
              <Input
                label="Tanggal Lahir"
                required={true}
                labelWidth="250px"
                type="date"
                name="birthdate"
                value={formData.birthdate}
                readOnly={true}
              />
              <Input
                label="Nama Ayah"
                required={true}
                labelWidth="250px"
                type="text"
                name="father_name"
                value={formData.father_name}
                readOnly={true}
              />
              <Input
                label="Nama Ibu"
                required={true}
                labelWidth="250px"
                type="text"
                name="mother_name"
                value={formData.mother_name}
                readOnly={true}
              />
              <Input
                label="Nama Wali"
                labelWidth="250px"
                type="text"
                name="guardian_name"
                value={formData.guardian_name}
                readOnly={true}
              />
              <Input
                label="Alamat"
                required={true}
                labelWidth="250px"
                type="text"
                name="address"
                value={formData.address}
                readOnly={true}
              />
            </div>
            <div className="flex flex-col space-y-2 items-center justify-center w-1/2 text-yellow-500">
              <span className="material-symbols-outlined text-7xl">
                warning
              </span>
              <h3 className="text-4xl">Peringatan</h3>
              <i className="text-center text-white p-4">
                Menghapus data stantri, juga akan menghapus data nilai, kelas,
                dan status. Pertimbangkan sekalilagi sebelum melanjutkan. Data
                yang telah dihapus tidak dapat dikembalikan.
              </i>
            </div>
          </div>
          <div className="flex flex-row justify-center mt-4 space-x-60">
            <button
              type="submit"
              className={`bg-rose-600 w-1/3 text-white px-4 py-2 rounded-md font-semibold`}
            >
              Tetap Hapus
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={`bg-lime-600 w-1/3 text-white px-4 py-2 rounded-md font-semibold`}
            >
              Batalkan
            </button>
          </div>
        </form>
      </div>
    </ContentContainer>
  );
}
