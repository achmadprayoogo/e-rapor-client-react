import PropTypes from "prop-types";
import { useNavigate } from "react-router";

AcademicYearLabel.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  onFocus: PropTypes.func,
};

export default function AcademicYearLabel({ options, onFocus }) {
  const navigate = useNavigate();
  const visible = window.location.pathname.split("/").length <= 4;
  return (
    <div
      className={`${
        visible ? "flex" : "hidden"
      } flex-row items-center ms-auto me-4 text-white text-4xl  space-x-1`}
    >
      <p className="text-white">Ta.</p>
      <select
        name=""
        id=""
        className="bg-transparent text-white p-2 focus:outline-none "
        onChange={(e) => {
          navigate(`/biodata/${e.target.value}`);
        }}
        onFocus={onFocus}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-white bg-[#343a40] text-center"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
