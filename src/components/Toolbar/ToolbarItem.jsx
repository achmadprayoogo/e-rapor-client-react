import PropTypes from "prop-types";

ToolbarItem.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function ToolbarItem({ icon, name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 text-white border rounded-lg hover:bg-gray-700"
    >
      <span className="material-symbols-outlined me-2">{icon}</span>
      {name}
    </button>
  );
}
