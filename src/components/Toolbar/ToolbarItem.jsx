import PropTypes from "prop-types";

ToolbarItem.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default function ToolbarItem({ icon, children, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="flex items-center px-4 py-2 text-white border rounded-lg hover:bg-gray-700"
    >
      <span className="material-symbols-outlined me-2">{icon}</span>
      {children}
    </button>
  );
}
