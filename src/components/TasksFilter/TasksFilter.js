import PropTypes from "prop-types";

export default function TasksFilter({
  isActive = true,
  name = "",
  onSelect = () => {},
}) {
  let className = "";

  if (isActive) {
    className += "selected";
  }

  return (
    <button className={className} onClick={() => onSelect(name)}>
      {name}
    </button>
  );
}

TasksFilter.propTypes = {
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
