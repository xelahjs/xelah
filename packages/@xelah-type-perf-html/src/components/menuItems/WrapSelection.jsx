import React from 'react';
import PropTypes from "prop-types";

import wrapSelection from '../../actions/wrapSelection'

/** Component to wrap the current selection with a tag */
export default function WrapSelection({label, tag}) {
  const onClick = (event) => {
    event.preventDefault();
    wrapSelection({ tag });
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

WrapSelection.propTypes = {
  label: PropTypes.string,
  tag: PropTypes.string,
};
