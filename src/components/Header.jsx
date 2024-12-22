import Logo from "./Logo";
import PropTypes from "prop-types";

Header.propTypes = {
  pagePath: PropTypes.string,
};

function Header({pagePath}) {
  return (
    <div className="w-full h-28 border flex flex-row items-center justify-start p-2">
      <Logo />
      <div>
        <h1 className="text-5xl font-sans font-bold text-white">E-RAPOR {pagePath} </h1>
        <p className="text-white text-2xl">
          Madrasah Diniyah An-Nur II Al-Murtadlo
        </p>
        <p className="text-white text-sm">
          Jl. Bululawang. No. 01 <span>Kec. Bululawang</span> Kab. Malang{" "}
        </p>
      </div>
    </div>
  );
}

export default Header;
