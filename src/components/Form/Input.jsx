import PropTypes from "prop-types";

Input.propTypes = {
  label: PropTypes.string.isRequired,
  labelWidth: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  homeroomTeacher: PropTypes.string,
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
  onChange,
  homeroomTeacher,
}) {
  if (type === "select") {
    return (
      <div className="flex flex-row space-x-4 h-fit">
        <label
          className="text-nowrap text-lg font-medium text-white"
          style={{ width: labelWidth }}
        >
          {label}
        </label>
        <select
          onChange={onChange}
          name={name}
          {...(required === true ? { required: true } : {})}
          className="font-mono block w-full border-b bg-transparent text-lg text-white focus: outline-none pb-1"
        >
          {options.map((option, index) => (
            <option
              disabled={index === 0}
              selected={index === 0}
              key={option.value}
              value={option.value}
              className="text-white bg-[#343a40]"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className="flex flex-row space-x-4">
      <label
        className="text-nowrap text-lg font-medium text-white"
        style={{ width: labelWidth }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        placeholder={name === "homeroom_teacher" ? homeroomTeacher : ""}
        readOnly={name === "homeroom_teacher"}
        {...(required === true ? { required: true } : {})}
        className={`mt-1 font-mono block w-full h-7 border-b bg-transparent text-lg text-white outline-none pb-2 date-input`}
      />
    </div>
  );
}
