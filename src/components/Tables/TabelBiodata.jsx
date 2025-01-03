import { useState, useCallback, useEffect } from "react";
import TablePagination from "./TablePagination";
import Toolbar from "../Toolbar/Toolbar";
import { getData, searchData } from "../../../fetcher";
import Loading from "../Loading/Loading";
import ErrorServer from "../ErrorServer/ErrorServer";
import TableHeader from "./TableHeader";
import TableData from "./TableData";
import Helper from "../../../helper";

function TabelBiodata() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ status: 200 });
  const [nameOrder, setNameOrder] = useState("asc");
  const [ageOrder, setAgeOrder] = useState("asc");

  useEffect(() => {
    async function fetchData() {
      const resultData = await getData(
        "/api/admin/students?page[number]=1&page[size]=20"
      );

      setLoading(false);

      if (resultData.error) {
        setError(resultData);
      } else {
        setStudents(resultData);
      }
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

  const handleDoubleClick = (e) => {
    const id = e.target.parentElement.id;
    document.location.href = `${location.origin}/biodata-update?id=${id}`;
  };

  const handleSearch = async (searchQuery) => {
    const result = await searchData(
      `/api/admin/students?page[number]=1&page[size]=20&search=${searchQuery}`
    );
    setStudents(result);
  };

  const handleNameShort = async () => {
    setNameOrder(nameOrder === "asc" ? "desc" : "asc");
  };

  const handleAgeShort = async () => {
    setAgeOrder(ageOrder === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return <Loading />;
  }

  if (error.status === 500) {
    return <ErrorServer />;
  }

  const data = students.data.map((student) => {
    return Helper.formatStudentData(student);
  });

  return (
    <div className="p-4 h-full w-[calc(100vw-5rem)] flex flex-col border-e-2">
      <Toolbar
        onSearch={handleSearch}
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
              <TableHeader>No</TableHeader>
              <TableHeader>NIS</TableHeader>
              <TableHeader filter onClick={handleNameShort} order={nameOrder}>
                Nama
              </TableHeader>
              <TableHeader filter onClick={handleAgeShort} order={ageOrder}>
                Umur
              </TableHeader>
              <TableHeader>Tempat Lahir</TableHeader>
              <TableHeader>Tanngal Lahir</TableHeader>
              <TableHeader>Nama Ayah</TableHeader>
              <TableHeader>Nama Ibu</TableHeader>
              <TableHeader>Nama Wali</TableHeader>
              <TableHeader filter>Status</TableHeader>
              <TableHeader>Alamat</TableHeader>
            </tr>
          </thead>

          <tbody>
            {data.map((student, index) => (
              <tr
                key={student.id}
                id={student.id}
                className="hover:bg-gray-700"
                onDoubleClick={handleDoubleClick}
              >
                <TableData align={"center"}>
                  {students.meta.page.from + index}
                </TableData>
                <TableData align={"center"}>{student.nis}</TableData>
                <TableData>{student.fullname}</TableData>
                <TableData align={"center"}>{student.age}</TableData>
                <TableData>{student.city_of_birth}</TableData>
                <TableData>{student.birthdate}</TableData>
                <TableData>{student.father_name}</TableData>
                <TableData>{student.mother_name}</TableData>
                <TableData>{student.guardian_name || "-"}</TableData>
                <TableData align={"center"}>{student.status || "-"}</TableData>
                <TableData>{student.address}</TableData>
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
