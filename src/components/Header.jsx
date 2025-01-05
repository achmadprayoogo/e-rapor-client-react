import PropTypes from "prop-types";
import Logo from "./Logo";
import AcademicYearLabel from "./AcademicYearLabel";
import Helper from "../../helper";
import { useState, useEffect } from "react";

Header.propTypes = {
  getAcademicYearSelected: PropTypes.func,
  visible: PropTypes.bool,
};

function Header({ getAcademicYearSelected, visible }) {
  const [academicYears, setAcademicYears] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await Helper.getAcademicYearOptions();
      setAcademicYears([
        { label: "Semua", value: "" },
        ...result.splice(1).reverse(),
      ]);
    }

    fetchData();
  }, [academicYears]);

  return (
    <div className="w-full h-28 border flex flex-row items-center justify-start p-2">
      <Logo />
      <div>
        <h1 className="text-5xl font-sans font-bold text-white">E-RAPOR</h1>
        <p className="text-white text-2xl">
          Madrasah Diniyah An-Nur II Al-Murtadlo
        </p>
        <p className="text-white text-sm">
          Jl. Bululawang. No. 01 <span>Kec. Bululawang</span> Kab. Malang
        </p>
      </div>
      <AcademicYearLabel
        visible={visible}
        options={academicYears}
        onChange={getAcademicYearSelected}
      />
    </div>
  );
}

export default Header;
