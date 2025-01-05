import PropTypes from "prop-types";

AcademicYearLabel.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  visible: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
};

export default function AcademicYearLabel({
  options,
  onChange,
  onFocus,
  visible,
}) {
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
        onChange={onChange}
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
