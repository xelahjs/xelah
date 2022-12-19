/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";

import FormatBlock from "./menuItems/FormatBlock"
import InsertGraft from './menuItems/InsertGraft'
import WrapSelection from './menuItems/WrapSelection'

export default function Menu() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div
      className="Menu"
    >
      <button onClick={handleOpen}>Menu</button>
      {open ? (
        <>
          <FormatBlock label="block quote" subtype="q" />
          <WrapSelection label="name of deity" tag="nd" />
          <InsertGraft label="Insert cross-reference" type="xref" />
        </>
      ) : null}
    </div>
  );
}
