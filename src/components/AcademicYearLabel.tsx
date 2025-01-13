import { useNavigate } from "react-router";

interface AcademicYearLabelProps {
  options: { label: string; value: string }[];
}

export default function AcademicYearLabel({ options }: AcademicYearLabelProps) {
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
