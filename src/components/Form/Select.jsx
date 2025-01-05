import PropTypes from "prop-types";

Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default function Select({
  label,
  options,
  value,
  className,
  onChange,
}) {}
