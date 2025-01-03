import PropTypes from "prop-types";

TableHeader.propTypes = {
  children: PropTypes.node,
  filter: PropTypes.bool,
  order: PropTypes.string,
  onClick: PropTypes.func,
};

export default function TableHeader({ children, filter, onClick, order }) {
  return (
    <th
      id={children}
      onClick={onClick}
      className="text-white p-2 font-bold border-b text-left whitespace-nowrap"
    >
      {filter && (
        <span className="material-symbols-outlined text-sm mr-2">
          {order === "asc" ? "south" : "north"}
        </span>
      )}
      {children}
    </th>
  );
}
