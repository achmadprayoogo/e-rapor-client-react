import PropTypes from "prop-types";

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ContentContainer({ children }) {
  return (
    <div className="p-4 h-full w-[calc(100vw-5rem)] flex flex-row border-e-2">
      {children}
    </div>
  );
}
