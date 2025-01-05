import { useState, useEffect } from "react";
import Input from "../Input";
import Loading from "../../Loading/Loading";
import ErrorServer from "../../ErrorServer/ErrorServer";
import NotFoundError from "../../NotFoundError/NotFoundError";
import Alert from "../../Alert/Alert";
import { initialAlert } from "../../../../initialStates";
import { patchData } from "../../../../fetcher";
import Helper from "../../../../helper";
import TitleInput from "../TitleInput";
import BackButton from "../BackButton";
import ContentContainer from "../../ContentContainer";

export default function StudentInput() {
  const [formData, setFormData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(initialAlert);
  const [lastData, setLastData] = useState({});
  const studentId = window.location.search.split("=")[1];

  useEffect(() => {
    async function getStudentData() {
      setLoading(true);
      const result = await Helper.getStudentData(studentId);

      if (result.error) {
        setError(result);
        setLoading(false);
        return;
      }

      setLoading(false);

      setFormData({
        ...result,
        age: undefined,
        academic_year: undefined,
        grade_id: undefined,
      });
      setLastData({
        ...result,
        age: undefined,
        academic_year: undefined,
        grade_id: undefined,
      });
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
    setAlert(Helper.closeAlert());
    e.preventDefault();

    const result = await patchData("/api/admin/students/update", formData);
    const newData = await Helper.formatStudentData(result.data.data);

    switch (result.status) {
      case 200:
        setAlert(Helper.successAlert());

        setLastData({
          ...newData,
          age: undefined,
          academic_year: undefined,
          grade_id: undefined,
        });
        setFormData({
          ...newData,
          age: undefined,
          academic_year: undefined,
          grade_id: undefined,
        });
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

  const handleDelete = async () => {
    window.location.href = "/biodata/delete?id=" + studentId;
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

  if (error && error.status && error.status <= 400 && error.status < 500) {
    return <NotFoundError data={"Santri"} />;
  }

  return (
    <ContentContainer>
      <div className="relative flex flex-col space-y-4 w-full p-4">
        <div>
          <BackButton link="/biodata" />
          <TitleInput>UPDATE DATA SANTRI</TitleInput>
          <Alert
            isShow={!alert.isShow}
            status={alert.status}
            message={alert.message}
            onClose={handleAlertClose}
          />
          <div className="text-white underline absolute top-4 right-4 flex flex-row space-x-4">
            <a href={window.location.pathname + window.location.search}>
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
                value={formData.birthdate.toISOString().split("T")[0]}
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
    </ContentContainer>
  );
}
