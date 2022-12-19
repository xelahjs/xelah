import React from 'react';
import PropTypes from "prop-types";

import insertGraft from '../../actions/insertGraft'

/** Component to insert a graft at current position */
export default function InsertGraft({label, type}) {
  const onClick = (event) => {
    event.preventDefault();
    insertGraft({ type });
  }
  return (
    <button
      style={{display:'block'}}
      className="menuItem"
      onMouseDown={onClick}
    >
      {label}
    </button>
  )
}

InsertGraft.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
};
