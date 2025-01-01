import PropTypes from "prop-types";
import "./Input.css";

Input.propTypes = {
  label: PropTypes.string.isRequired,
  labelWidth: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  homeroomTeacher: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

export default function Input({
  label,
  type,
  name,
  options,
  labelWidth,
  required,
  value,
  readOnly,
  onChange,
  homeroomTeacher,
}) {
  const commonProps = {
    name,
    onChange,
    required,
    readOnly,
    className:
      "font-mono block w-full border-b bg-transparent text-lg text-white focus:outline-none pb-1",
  };

  return (
    <div className="flex flex-row space-x-4 h-fit">
      <label
        className="text-nowrap text-lg font-medium text-white"
        style={{ width: labelWidth }}
      >
        {label}
      </label>
      {type === "select" ? (
        <select {...commonProps}>
          {options.map((option, index) => (
            <option
              key={option.value}
              value={option.value}
              disabled={index === 0}
              selected={index === 0}
              className="text-white bg-[#343a40]"
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          placeholder={name === "homeroom_teacher" ? homeroomTeacher : ""}
          readOnly={name === "homeroom_teacher"}
          {...commonProps}
        />
      )}
    </div>
  );
}
