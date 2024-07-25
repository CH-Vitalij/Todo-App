import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onAdded = () => {} }) => {
  const [state, setState] = useState({ label: '', sec: '', min: '' });

  const handleLabelChange = (evt) => {
    setState({ label: evt.target.value });
  };

  const handleSubmit = (evt) => {
    if (evt.keyCode === 13) {
      onAdded(state.label, state.min === '' ? null : state.min, state.sec === '' ? null : state.sec);
      setState({ label: '', sec: '', min: '' });
    }
  };

  const handleSecChange = (evt) => {
    if (!isNaN(evt.target.value)) {
      setState({ sec: Number(evt.target.value) });
    }
  };

  const handleMinChange = (evt) => {
    if (!isNaN(evt.target.value)) {
      setState({ min: Number(evt.target.value) });
    }
  };

  return (
    <form className="new-todo-form" onKeyDown={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={handleLabelChange}
        value={state.label}
      />
      <input className="new-todo-form__timer" placeholder="Min" onChange={handleMinChange} value={state.min} />
      <input className="new-todo-form__timer" placeholder="Sec" onChange={handleSecChange} value={state.sec} />
    </form>
  );
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
};

export default NewTaskForm;
