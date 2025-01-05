import propTypes from "prop-types";
import PageNavbar from "./PageNavbar";
import TabelBiodata from "./Tables/TabelBiodata";
import TabelSettings from "./Tables/TabelSettings";
import StudentInput from "./Form/Student/StudentInput";
import StudentUpdate from "./Form/Student/StudentUpdate";
import StudentDelete from "./Form/Student/StudentDelete";

Page.propTypes = {
  academicYearSelected: propTypes.string,
  location: propTypes.string,
};

function Page({ academicYearSelected, location }) {
  const renderTable = () => {
    switch (location) {
      case "/biodata":
        return <TabelBiodata academicYearSelected={academicYearSelected} />;
      case "/biodata/input":
        return <StudentInput />;
      case "/biodata/update":
        return <StudentUpdate />;
      case "/biodata/delete":
        return <StudentDelete />;
      case "/setting":
        return <TabelSettings />;
      default:
        return <TabelBiodata academicYearSelected={academicYearSelected} />;
    }
  };

  return (
    <div className="w-full flex flex-row overflow-x-hidden relative h-[calc(100vh-7rem)]">
      <PageNavbar />
      {/* Page Content */}
      <div className="w-full border-b-2 border-e-2 ms-20">{renderTable()}</div>
    </div>
  );
}

export default Page;
