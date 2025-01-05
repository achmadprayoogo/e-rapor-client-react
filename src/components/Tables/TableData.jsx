import PropTypes from "prop-types";

TableData.propTypes = {
  children: PropTypes.node,
  align: PropTypes.oneOf(["left", "center", "right"]),
};

export default function TableData({ children, align }) {
  return (
    <td
      className={`border-b p-2 whitespace-nowrap text-${align} ${
        children === "Aktif"
          ? "text-green-500 font-bold"
          : children === "Boyong"
          ? "text-red-500 font-bold"
          : children === "Lulus"
          ? "text-blue-500 font-bold"
          : "text-white"
      }`}
    >
      {children}
    </td>
  );
}
