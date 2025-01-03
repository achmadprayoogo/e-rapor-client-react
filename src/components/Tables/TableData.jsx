import PropTypes from "prop-types";

TableData.propTypes = {
  children: PropTypes.node,
  align: PropTypes.oneOf(["left", "center", "right"]),
};

export default function TableData({ children, align }) {
  return (
    <td className={`border-b text-white p-2 whitespace-nowrap text-${align}`}>
      {children}
    </td>
  );
}
