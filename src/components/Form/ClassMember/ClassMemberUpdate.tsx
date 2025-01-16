import ContentContainer from "../../ContentContainer";
import BackButton from "../BackButton";
import TitleInput from "../TitleInput";
import Alert from "../../Alert/Alert";
import Input from "../Input";
import { AlertStatus, ClassMember, StudentStatus } from "../../../../index";
import { useEffect, useState } from "react";
import Helper from "../../../../Helper";

const initialClassMember: ClassMember = {
  id: "",
  nis: "",
  fullname: "",
  city_of_birth: "",
  birthdate: "",
  father_name: "",
  mother_name: "",
  guardian_name: "",
  address: "",
  academic_year: "",
  student_status: StudentStatus.ACTIVE,
  grade_class: "",
  class_name: "",
  homeroom_teacher: "",
};

function ClassMemberUpdate() {
  const classMemberId: string = window.location.search.split("=")[1];
  const [formData, setFormData] = useState<ClassMember>(initialClassMember);
  const [lastData, setLastData] = useState<ClassMember>();
  const [statusResponse, setStatusResponse] = useState<number>(0);
  console.log(classMemberId);

  function formatResult(data: ClassMember) {
    return data;
  }

  useEffect(() => {
    async function getClassMemberData() {
      const result = await Helper.getClassMemberData(classMemberId);
      console.log(result);

      setStatusResponse(result.status);

      setFormData(formatResult(result));
      setLastData(formatResult(result));
    }
    getClassMemberData();
  }, [classMemberId]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <ContentContainer>
      <div className="relative flex flex-col space-y-4 w-full p-4">
        <div>
          <BackButton />
          <TitleInput>UPDATE DATA KELAS</TitleInput>
          <Alert
            isShow={false}
            alertStatus={AlertStatus.SUCCESS}
            message={"Success"}
            onClose={() => {}}
          />
          <a
            href="/biodata-input"
            className="text-white underline absolute top-4 right-4"
          >
            reset
          </a>
        </div>

        <form onSubmit={() => {}} className="w-full h-full">
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
                readOnly
              />
              <Input
                label="Nama Lengkap"
                required={true}
                labelWidth="250px"
                type="text"
                name="fullname"
                value={formData.fullname}
                readOnly
              />
              <Input
                label="Tempat Lahir"
                required={true}
                labelWidth="250px"
                type="text"
                name="city_of_birth"
                value={formData.city_of_birth}
                readOnly
              />
              <Input
                label="Tanggal Lahir"
                required={true}
                labelWidth="250px"
                type="date"
                name="birthdate"
                value={formData.birthdate}
                readOnly
              />
              <Input
                label="Nama Ayah"
                required={true}
                labelWidth="250px"
                type="text"
                name="father_name"
                value={formData.father_name}
                readOnly
              />
              <Input
                label="Nama Ibu"
                required={true}
                labelWidth="250px"
                type="text"
                name="mother_name"
                value={formData.mother_name}
                readOnly
              />
              <Input
                label="Nama Wali"
                labelWidth="250px"
                type="text"
                name="guardian_name"
                value={formData.guardian_name}
                readOnly
              />
              <Input
                label="Alamat"
                required={true}
                labelWidth="250px"
                type="text"
                name="address"
                value={formData.address}
                readOnly
              />
            </div>
            <div className="w-1/2 p-4 space-y-1">
              <p className="text-white mb-2">AKADEMIK</p>
              <Input
                label="Tahun Ajaran"
                required={true}
                labelWidth="250px"
                type="select"
                name="academic_year_id"
                options={[]}
                onChange={() => {}}
              />
              <Input
                label="Status"
                required={true}
                labelWidth="250px"
                type="select"
                options={[]}
                name="status"
                onChange={() => {}}
              />
              <Input
                label="Tingkat"
                labelWidth="250px"
                type="select"
                name="grade_id"
                options={[]}
                onChange={() => {}}
              />
              <Input
                label="Kelas"
                required={true}
                labelWidth="250px"
                type="select"
                name="class_name_id"
                options={[]}
                onChange={() => {}}
              />
              <Input
                label="Walikelas"
                labelWidth="250px"
                type="text"
                name="homeroom_teacher"
                homeroomTeacher={formData.homeroom_teacher}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-row justify-center mt-4">
            <button
              type="submit"
              className="bg-green-700 w-1/2 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </ContentContainer>
  );
}

export default ClassMemberUpdate;
