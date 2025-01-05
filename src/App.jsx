import { useState } from "react";
import Header from "./components/Header.jsx";
import Page from "./components/Page.jsx";

function App() {
  const [academicYearSelected, setAcademicYearSelected] = useState("");
  const pageLocation = window.location.pathname;

  return (
    <div className="relative min-h-screen">
      <Header
        visible={pageLocation.split("/").length === 2}
        getAcademicYearSelected={(e) => setAcademicYearSelected(e.target.value)}
      />
      <Page
        academicYearSelected={academicYearSelected}
        location={pageLocation}
      />
    </div>
  );
}

export default App;
