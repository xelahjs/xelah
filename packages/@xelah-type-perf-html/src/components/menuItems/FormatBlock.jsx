import React from 'react';
import PropTypes from "prop-types";

import formatBlock from '../../actions/formatBlock'

export default function FormatBlock({label, subtype}) {
  const onClick = (event) => {
    event.preventDefault();
    formatBlock({ subtype });
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

FormatBlock.propTypes = {
  label: PropTypes.string,
  subtype: PropTypes.string,
};
