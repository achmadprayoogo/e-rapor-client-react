import PropTypes from "prop-types";

TitleInput.propTypes = {
  children: PropTypes.string,
};

export default function TitleInput({ children }) {
  return (
    <h3 className="text-2xl font-bold mb- text-white text-center">
      {children}
    </h3>
  );
}
