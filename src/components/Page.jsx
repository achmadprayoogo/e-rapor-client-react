import { useState, useEffect } from "react";
import PageNavbar from "./PageNavbar";
import TabelBiodata from "./Tables/TabelBiodata";
import TabelSettings from "./Tables/TabelSettings";
import StudentInput from "./Form/StudentInput";

function Page() {
  const [currentPage, setCurrentPage] = useState("biodata");

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    setCurrentPage(path || "biodata");
  }, []);

  const renderTable = () => {
    switch (currentPage) {
      case "biodata":
        return <TabelBiodata />;
      case "biodata-input":
        return <StudentInput />;
      case "setting":
        return <TabelSettings />;
      default:
        return <TabelBiodata />;
    }
  };

  return (
    <div className="w-full flex flex-row overflow-x-hidden relative h-[calc(100vh-7rem)]">
      <PageNavbar onPageChange={setCurrentPage} />
      {/* Page Content */}
      <div className="w-full border-b-2 border-e-2 ms-20">{renderTable()}</div>
    </div>
  );
}

export default Page;
