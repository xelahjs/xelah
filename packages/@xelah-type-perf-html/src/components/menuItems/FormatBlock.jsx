import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from "prop-types";

import { formatBlock, canFormatBlock } from '../../actions/formatBlock'

export default function FormatBlock({label, subtype}) {

  const [disabled, setDisabled] = useState(false);
  const handleSelectionChangeEvent = useCallback(() => {
    setDisabled( ! canFormatBlock() );
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChangeEvent);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChangeEvent);
    };
  }, [handleSelectionChangeEvent])

  const onClick = (event) => {
    event.preventDefault();
    formatBlock({ subtype });
  }
  return (
    <button
      style={{display:'block'}}
      className="menuItem"
      onMouseDown={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

FormatBlock.propTypes = {
  label: PropTypes.string,
  subtype: PropTypes.string,
};
