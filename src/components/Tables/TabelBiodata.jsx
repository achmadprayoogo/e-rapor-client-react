import { useState, useCallback, useEffect } from "react";
import propTypes from "prop-types";
import TablePagination from "./TablePagination";
import Toolbar from "../Toolbar/Toolbar";
import { getData, searchData } from "../../../fetcher";
import Loading from "../Loading/Loading";
import ErrorServer from "../ErrorServer/ErrorServer";
import TableHeader from "./TableHeader";
import TableData from "./TableData";
import Helper from "../../../helper";

TabelBiodata.propTypes = {
  academicYearSelected: propTypes.string, // first definition at App.jsx
};

function TabelBiodata({ academicYearSelected }) {
  const [students, setStudents] = useState(null); // Change back to null for proper checks
  const [dataFetch, setDataFetch] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ status: 200 });
  const [nameOrder, setNameOrder] = useState("asc");
  const [ageOrder, setAgeOrder] = useState("asc");

  useEffect(() => {
    let isMounted = true; // Add mounted check

    async function fetchData() {
      try {
        setLoading(true); // Set loading at start of fetch
        const resultData = await getData(
          "/api/admin/students?page[number]=1&page[size]=20&filter[academic_year_id]=" +
            academicYearSelected
        );

        console.log(resultData);

        if (!isMounted) return;

        if (resultData.error) {
          setError(resultData);
        } else {
          setDataFetch(resultData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [academicYearSelected]);

  useEffect(() => {
    if (dataFetch) {
      console.log(dataFetch);
      const formatedData = dataFetch.data.map((student) => {
        const result = Helper.formatStudentData(student);
        return result;
      });
      console.log(formatedData);
      setStudents(formatedData);
    }
  }, [dataFetch]);

  const handlePageNext = useCallback(async () => {
    if (dataFetch && dataFetch.links.next) {
      setLoading(true);
      const resultData = await getData(dataFetch.links.next);
      if (resultData) {
        setDataFetch(resultData);
        setStudents(resultData.data); // Add this line
      }
      setLoading(false);
    }
  }, [dataFetch]);

  const handlePagePrev = useCallback(async () => {
    if (dataFetch && dataFetch.links.prev) {
      setLoading(true);
      const resultData = await getData(dataFetch.links.prev);
      if (resultData) {
        setDataFetch(resultData);
        setStudents(resultData.data); // Add this line
      }
      setLoading(false);
    }
  }, [dataFetch]);

  const handleDoubleClick = (e) => {
    const id = e.target.parentElement.id;
    document.location.href = `${location.origin}/biodata-update?id=${id}`;
  };

  const handleSearch = async (searchQuery) => {
    const result = await searchData(
      `/api/admin/students?page[number]=1&page[size]=20&search=${searchQuery}`
    );
    setDataFetch(result);
  };

  const handleNameShort = async () => {
    setNameOrder(nameOrder === "asc" ? "desc" : "asc");
  };

  const handleAgeShort = async () => {
    setAgeOrder(ageOrder === "asc" ? "desc" : "asc");
  };

  // Early return conditions
  if (loading) {
    return <Loading />;
  }

  if (error.status === 500) {
    return <ErrorServer />;
  }

  // Add this check
  if (!students || !dataFetch) {
    return <Loading />;
  }

  // Only render the main component when we have both students and dataFetch
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
              {academicYearSelected ? (
                <TableHeader filter>Status</TableHeader>
              ) : null}
              <TableHeader>Alamat</TableHeader>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.id}
                id={student.id}
                className="hover:bg-gray-700"
                onDoubleClick={handleDoubleClick}
              >
                <TableData align={"center"}>
                  {dataFetch.meta.page.from + index}
                </TableData>
                <TableData align={"center"}>{student.nis}</TableData>
                <TableData>{student.fullname}</TableData>
                <TableData align={"center"}>{student.age}</TableData>
                <TableData>{student.city_of_birth}</TableData>
                <TableData>{student.birthdate}</TableData>
                <TableData>{student.father_name}</TableData>
                <TableData>{student.mother_name}</TableData>
                <TableData>{student.guardian_name || "-"}</TableData>
                {academicYearSelected ? (
                  <TableData align={"center"}>
                    {student.status || "-"}
                  </TableData>
                ) : null}
                <TableData>{student.address}</TableData>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        currentPage={dataFetch.meta.page.currentPage}
        totalPages={dataFetch.meta.page.lastPage}
        onPageNext={handlePageNext}
        onPagePrev={handlePagePrev}
      />
    </div>
  );
}

export default TabelBiodata;
