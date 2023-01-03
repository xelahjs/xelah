/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";

import FormatBlock from "./menuItems/FormatBlock"

export default function Menu() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <div
      className="Menu"
    >
      <button onMouseDown={handleOpen}>Menu</button>
      {open ? (
        <>
          <FormatBlock label="\p paragraph" subtype="p" sequence="main" />
          <FormatBlock label="\q1 poetic line level 1" subtype="q1" sequence="main" />
          <FormatBlock label="\q2 poetic line level 2" subtype="q2" sequence="main" />
          <FormatBlock label="\q3 poetic line level 3" subtype="q3" sequence="main" />
          <FormatBlock label="\imt introduction major title" subtype="imt" sequence="introduction" />
          <FormatBlock label="\is introduction section heading" subtype="is" sequence="introduction" />
          <FormatBlock label="\ip introduction paragraph" subtype="ip" sequence="introduction" />
          <FormatBlock label="\im introduction paragraph no ident" subtype="im" sequence="introduction" />
          <FormatBlock label="\ipi introduction paragraph with ident" subtype="ipi" sequence="introduction" />
          <FormatBlock label="\iot introduction outline title" subtype="iot" sequence="introduction" />
          <FormatBlock label="\io introduction outline level 1" subtype="io" sequence="introduction" />
          <FormatBlock label="\io2 introduction paragraph level 2" subtype="io2" sequence="introduction" />
        </>
      ) : null}
    </div>
  );
}
