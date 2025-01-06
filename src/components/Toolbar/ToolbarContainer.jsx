import PropTypes from "prop-types";

ToolbarContainer.propTypes = {
  children: PropTypes.node,
};

function ToolbarContainer({ children }) {
  return (
    <div className="flex flex-row justify-between items-center mb-4 gap-2">
      {children}
    </div>
  );
}

export default ToolbarContainer;
