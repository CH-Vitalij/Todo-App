import TasksFilter from "../TasksFilter";
import PropTypes from "prop-types";

export default function Footer({
  btn = [],
  active = [],
  onSelect = () => {},
  onClear = () => {},
}) {
  const elements = btn.map((el) => {
    const { id, ...elProps } = el;
    return (
      <li key={id}>
        <TasksFilter {...elProps} onSelect={(name) => onSelect(name)} />
      </li>
    );
  });

  return (
    <footer className="footer">
      <span className="todo-count">{`${active.length} items left`}</span>
      <ul className="filters">{elements}</ul>
      <button className="clear-completed" onClick={() => onClear()}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  btn: PropTypes.arrayOf(PropTypes.object).isRequired,
  active: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};
