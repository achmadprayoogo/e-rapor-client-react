import { Options } from "../../../index";
function OptionsInput({ options }: { options?: Options[] }) {
  return (
    <>
      {options?.map((option, index) => (
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
    </>
  );
}

export default OptionsInput;
