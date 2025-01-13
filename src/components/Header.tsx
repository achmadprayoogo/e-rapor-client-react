import Logo from "./Logo";
import AcademicYearLabel from "./AcademicYearLabel";
import Helper from "../../Helper";
import { useState, useEffect } from "react";

interface AcademicYear {
  label: string;
  value: string;
}

function Header() {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await Helper.getAcademicYearOptions();
      setAcademicYears([
        { label: "Semua", value: "" },
        ...result.splice(1).reverse(),
      ]);
    }

    fetchData();
  }, []);

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
      <AcademicYearLabel options={academicYears} />
    </div>
  );
}

export default Header;
