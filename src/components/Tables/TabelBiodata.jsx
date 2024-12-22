import { useState, useEffect, useCallback } from "react";
import TablePagination from "../TablePagination";
import Toolbar from "../Toolbar/Toolbar";
import { getData } from "../../fetcher";
import { parseISO, isValid } from "date-fns";
import Loading from "../Loading/Loading";

const ROW_HEADERS = [
  "No",
  "NIS",
  "Nama Lengkap",
  "Umur",
  "Tempat Lahir",
  "Tanggal Lahir",
  "Nama Ayah",
  "Nama Ibu",
  "Nama Wali",
  "Status",
  "Alamat",
];

function TabelBiodata() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handlePageNext = useCallback(async () => {
    if (students && students.links.next) {
      const resultData = await getData(students.links.next);
      if (resultData) {
        setStudents(resultData);
      }
    }
  }, [students]);

  const handlePagePrev = useCallback(async () => {
    if (students && students.links.prev) {
      const resultData = await getData(students.links.prev);
      if (resultData) {
        setStudents(resultData);
      }
    }
  }, [students]);

  if (loading) {
    return <Loading />;
  }

  if (!students) {
    return (
      <div className="text-red-600 text-2xl h-full w-full flex items-center justify-center">
        <p>Failed loading data</p>
      </div>
    );
  }

  const data = students.data.map((student) => {
    const birthDate = parseISO(student.attributes.birthdate);
    if (isValid(birthDate)) {
      const age = new Date().getFullYear() - birthDate.getFullYear();
      return {
        ...student,
        attributes: {
          ...student.attributes,
          age,
          birthdate: birthDate.toLocaleString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        },
      };
    } else {
      console.error("Invalid date:", student.attributes.birthdate);
      return student;
    }
  });

  return (
    <div className="p-4 h-full w-[calc(100vw-5rem)] flex flex-col border-e-2">
      <Toolbar
        onSearch={() => console.log("Search data")}
        toolbarItems={[
          {
            icon: "add",
            name: "Input Data",
            onClick: () => {
              document.location.href = `${location.origin}/biodata-input`;
            },
          },
          { icon: "filter_alt", name: "Filter", onClick: () => {} },
          { icon: "file_upload", name: "Import", onClick: () => {} },
          { icon: "file_download", name: "Export", onClick: () => {} },
        ]}
      />
      <div className="flex-1 overflow-auto border rounded">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[#343a40]">
            <tr>
              {ROW_HEADERS.map((header) => (
                <th
                  key={header}
                  className="text-white p-2 font-bold border-b text-left whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((student, index) => (
              <tr key={student.id} className="hover:bg-gray-700">
                <td className="border-b text-white text-center p-2 whitespace-nowrap">
                  {students.meta.page.from + index}
                </td>
                <td className="border-b text-white text-center p-2 whitespace-nowrap">
                  {student.attributes.nis}
                </td>
                <td className="border-b text-white p-2 whitespace-nowrap">
                  {student.attributes.fullname}
                </td>
                <td className="border-b text-white p-2 text-center whitespace-nowrap">
                  {student.attributes.age}
                </td>
                <td className="border-b text-white p-2 whitespace-nowrap">
                  {student.attributes.city_of_birth}
                </td>
                <td className="border-b text-white p-2 whitespace-nowrap">
                  {student.attributes.birthdate}
                </td>
                <td className="border-b text-white p-2 whitespace-nowrap">
                  {student.attributes.father_name}
                </td>
                <td className="border-b text-white p-2 whitespace-nowrap">
                  {student.attributes.mother_name}
                </td>
                <td className="border-b text-white p-2 whitespace-nowrap">
                  {student.attributes.guardian_name || "-"}
                </td>
                <td className="border-b text-white text-center p-2 whitespace-nowrap">
                  {student.attributes.status || "-"}
                </td>
                <td className="border-b text-white p-2 whitespace-nowrap">
                  {student.attributes.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        currentPage={students.meta.page.currentPage}
        totalPages={students.meta.page.lastPage}
        onPageNext={handlePageNext}
        onPagePrev={handlePagePrev}
      />
    </div>
  );
}

export default TabelBiodata;
