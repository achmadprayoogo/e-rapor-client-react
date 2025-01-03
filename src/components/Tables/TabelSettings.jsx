import { useState } from "react";
import TablePagination from "./TablePagination";
import Toolbar from "../Toolbar/Toolbar";
import FormAcademicYear from "../Form/FormAcademicYear";

const ROW_HEADERS = ["No", "Tahun Ajaran", "Tanggal Awal", "Tanggal Akhir"];

const academicYears = [
  {
    id: 1,
    name: "2023/2024",
    startDate: "2023-09-01",
    endDate: "2024-06-30",
  },
  {
    id: 2,
    name: "2022/2023",
    startDate: "2022-09-01",
    endDate: "2023-06-30",
  },
];

function TabelSettings() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4 h-full flex flex-col">
      <Toolbar
        onSearch={() => console.log("Search data")}
        toolbarItems={[
          {
            icon: "add",
            name: "Input Data",
            onClick: () => setShowForm(true),
          },
          { icon: "filter_alt", name: "Filter", onClick: () => {} },
          { icon: "file_upload", name: "Import", onClick: () => {} },
          { icon: "file_download", name: "Export", onClick: () => {} },
        ]}
      />
      {showForm && (
        <FormAcademicYear
          isClicked={showForm}
          onClose={() => setShowForm(false)}
        />
      )}
      <div className="flex-1 overflow-auto border rounded">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[#343a40]">
            <tr>
              {ROW_HEADERS.map((header) => (
                <th key={header} className="border-b text-white p-2 font-bold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {academicYears.map((academicYear, index) => (
              <tr key={academicYear.id} className="hover:bg-gray-700">
                <td className="border-b text-white text-center p-2">
                  {index + 1}
                </td>
                <td className="border-b text-white text-center p-2">
                  {academicYear.name}
                </td>
                <td className="border-b text-white text-center p-2">
                  {academicYear.startDate}
                </td>
                <td className="border-b text-white text-center p-2">
                  {academicYear.endDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={1}
        totalPages={10}
        onNextPage={() => console.log("Next page")}
        onPrevPage={() => console.log("Previous page")}
      />
    </div>
  );
}

export default TabelSettings;
