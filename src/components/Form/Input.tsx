import { initialOptions } from "initialStates";
import "./Input.css";
import OptionsInput from "./OptionsInput";
import { Options } from "index";

interface inputProps {
  label: string;
  labelWidth: string;
  type: string;
  name: string;
  required?: boolean;
  homeroomTeacher?: string;
  value?: string | number | Date;
  readOnly?: boolean;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  options?: Options[];
}

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
}: inputProps) {
  const commonProps = {
    name,
    onChange,
    required,
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
          <OptionsInput options={options} />
        </select>
      ) : (
        <input
          type={type}
          value={
            value instanceof Date ? value.toISOString().split("T")[0] : value
          }
          placeholder={name === "homeroom_teacher" ? homeroomTeacher : ""}
          readOnly={name === "homeroom_teacher" ? true : readOnly}
          {...commonProps}
        />
      )}
    </div>
  );
}
