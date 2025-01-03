import propTypes from "prop-types";

BackButton.propTypes = {
  link: propTypes.string,
};

export default function BackButton({ link }) {
  return (
    <a href={link} className="text-white absolute top-4 left-4">
      <span className="material-symbols-outlined">arrow_back</span>
    </a>
  );
}
