import React, { Component } from "react";

export default class Task extends Component {
  handleClickLabel = () => alert(`${this.props.label}`); // Class field, a property of the object itself

  render() {
    const { label, creationTime } = this.props;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description" onClick={this.handleClickLabel}>
            {label}
          </span>
          <span className="created">{creationTime}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
    );
  }
}

// export default function TaskFunct({ label, creationTime }) {
//   const handleClickLabel = () => alert(`${label}`); // Class field, a property of the object itself

//   return (
//     <div className="view">
//       <input className="toggle" type="checkbox" />
//       <label>
//         <span className="description" onClick={handleClickLabel}>
//           {label}
//         </span>
//         <span className="created">{creationTime}</span>
//       </label>
//       <button className="icon icon-edit"></button>
//       <button className="icon icon-destroy"></button>
//     </div>
//   );
// }
