import { useState, useCallback, useEffect } from "react";
import propTypes from "prop-types";
import TablePagination from "./TablePagination";
import ToolbarContainer from "../Toolbar/ToolbarContainer";
import { getData, searchData } from "../../../fetcher";
import Loading from "../Loading/Loading";
import ErrorServer from "../ErrorServer/ErrorServer";
import TableHeader from "./TableHeader";
import TableData from "./TableData";
import Helper from "../../../helper";
import { statusOptions } from "../../../initialStates";
import NotFoundError from "../NotFoundError/NotFoundError";
import Search from "../Toolbar/Search";
import ToolbarItem from "../Toolbar/ToolbarItem";

TabelBiodata.propTypes = {
  academicYearSelected: propTypes.string, // first definition at App.jsx
};

function TabelBiodata({ academicYearSelected }) {
  const [students, setStudents] = useState(null);
  const [dataFetch, setDataFetch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ status: 200 });
  const [query, setQuery] = useState({
    filter: {
      academic_year_id: academicYearSelected,
      student_status: "",
    },
    page: {
      number: 1,
      size: 20,
    },
    sort: {
      by: "fullname",
      order: "asc",
    },
  });
  const newStatusOptions = [
    {
      value: "",
      label: "Status",
    },
    ...statusOptions.filter((_, index) => index !== 0),
  ];

  const {
    page: { number: pageNumber, size: pageSize },
    sort: { by: sortBy, order: sortOrder },
    filter: { student_status: studentStatus, academic_year_id: academicYearId },
  } = query;

  console.log("pageNumber", pageNumber);
  console.log("pageSize", pageSize);
  console.log("sortBy", sortBy);
  console.log("sortOrder", sortOrder);
  console.log("studentStatus", studentStatus);
  console.log("academicYearId", academicYearId);

  useEffect(() => {
    setQuery((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        academic_year_id: academicYearSelected,
      },
    }));
  }, [academicYearSelected]);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `/api/admin/students?sort[by]=${query.sort.by}&sort[order]=${query.sort.order}&page[number]=${query.page.number}&page[size]=${query.page.size}&filter[academic_year_id]=${academicYearSelected}&filter[student_status]=${query.filter.student_status}`;
        const resultData = await getData(url);

        console.log(resultData, resultData.data[0]);

        if (resultData.error) {
          setError(resultData);
        } else {
          setDataFetch(resultData);
          setStudentFormated(resultData.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  /// helper function ///

  function setStudentFormated(data) {
    const result = data.map((student) => {
      return Helper.formatStudentData(student);
    });
    setStudents(result);
  }

  /// handle event ///

  const handlePageNext = useCallback(async () => {
    if (dataFetch && dataFetch.links.next) {
      const result = await getData(dataFetch.links.next);

      if (result) {
        setDataFetch(result);
        setStudentFormated(result.data);
      }
    }
  }, [dataFetch]);

  const handlePagePrev = useCallback(async () => {
    if (dataFetch && dataFetch.links.prev) {
      const result = await getData(dataFetch.links.prev);
      if (result) {
        setDataFetch(result);
        setStudentFormated(result.data);
      }
    }
  }, [dataFetch]);

  const handleDoubleClick = (e) => {
    const id = e.target.parentElement.id;
    document.location.href = `${location.origin}/biodata/update?id=${id}`;
  };

  const handleSearch = async (searchQuery) => {
    const url = `/api/admin/students?sort[by]=${query.sort.by}&sort[order]=${query.sort.order}&page[number]=1&page[size]=20&search=${searchQuery}&filter[academic_year_id]=${academicYearSelected}`;
    const result = await searchData(url);

    setDataFetch(result);
    setStudentFormated(result.data);
  };

  const handleInputData = () => {
    document.location.href = `${location.origin}/biodata/input`;
  };

  const handleStatusChange = async (e) => {
    setQuery((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        student_status: e.target.value,
      },
    }));
  };

  const handleNameShort = async () => {
    setQuery((prev) => ({
      ...prev,
      sort: {
        by: "fullname",
        order: prev.sort.order === "asc" ? "desc" : "asc",
      },
    }));
  };

  const handleAgeShort = async () => {
    setQuery((prev) => ({
      ...prev,
      sort: {
        by: "birthdate",
        order: prev.sort.order === "asc" ? "desc" : "asc",
      },
    }));
  };

  /// conditional rendering ///
  if (loading) {
    return <Loading />;
  }

  if (error.status === 500) {
    return <ErrorServer />;
  }

  if (error && error.status && error.status >= 400 && error.status < 500) {
    console.log("error", error);
    return <NotFoundError data={"Daftar Santri"} />;
  }

  if (!students || !dataFetch) {
    return <Loading />;
  }

  console.log("students", students.length);

  return (
    <div className="p-4 h-full w-[calc(100vw-5rem)] flex flex-col border-e-2">
      <ToolbarContainer>
        <ToolbarItem icon="person">{`${dataFetch.meta.page.total} Santri`}</ToolbarItem>
        <Search onSearch={handleSearch} />
        {/* render when academic year selected */}
        {academicYearSelected ? (
          <ToolbarItem
            icon={
              query.filter.student_status === "active"
                ? "check_circle"
                : query.filter.student_status === "graduate"
                ? "school"
                : query.filter.student_status === "dropout"
                ? "do_not_disturb_on"
                : "manage_accounts"
            }
            onClick={() => {}}
          >
            <div>
              <select
                onChange={handleStatusChange}
                name="student_status"
                className="text-white bg-transparent focus:outline-none"
              >
                {newStatusOptions.map((status) => (
                  <option
                    key={status.value}
                    value={status.value}
                    className="text-white bg-[#343a40]"
                  >
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </ToolbarItem>
        ) : null}
        <ToolbarItem icon="add" onClick={handleInputData}>
          Input Data
        </ToolbarItem>
        <ToolbarItem icon="file_upload" onClick={() => {}}>
          Import
        </ToolbarItem>
        <ToolbarItem icon="file_download" onClick={() => {}}>
          Export
        </ToolbarItem>
      </ToolbarContainer>
      <div className="flex-1 overflow-auto border rounded">
        {students.length !== 0 ? (
          <table className="w-full border-separate border-spacing-0">
            <thead className="sticky top-0 bg-[#343a40]">
              <tr>
                <TableHeader>No</TableHeader>
                <TableHeader>NIS</TableHeader>
                <TableHeader
                  filter={query.sort.by === "fullname" && query.sort.order}
                  onClick={handleNameShort}
                  order={query.sort.by === "fullname" && query.sort.order}
                >
                  Nama
                </TableHeader>

                {/* render when academic year selected */}
                {academicYearSelected ? (
                  <TableHeader>Status</TableHeader>
                ) : null}

                <TableHeader
                  filter={query.sort.by === "birthdate" && query.sort.order}
                  onClick={handleAgeShort}
                  order={query.sort.by === "birthdate" && query.sort.order}
                >
                  Umur
                </TableHeader>
                <TableHeader>Tempat Lahir</TableHeader>
                <TableHeader>Tanngal Lahir</TableHeader>
                <TableHeader>Nama Ayah</TableHeader>
                <TableHeader>Nama Ibu</TableHeader>
                <TableHeader>Nama Wali</TableHeader>
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

                  {/* render when academic year selected */}
                  {academicYearSelected ? (
                    <TableData align={"center"}>{student.status}</TableData>
                  ) : null}

                  <TableData align={"center"}>{student.age}</TableData>
                  <TableData>{student.city_of_birth}</TableData>
                  <TableData>
                    {student.birthdate.toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableData>
                  <TableData>{student.father_name}</TableData>
                  <TableData>{student.mother_name}</TableData>
                  <TableData>{student.guardian_name}</TableData>
                  <TableData>{student.address}</TableData>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NotFoundError data={"Daftar Santri"} />
        )}
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
