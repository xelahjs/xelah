/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

export default function SectionHeading({
  content,
  show,
  index,
  verbose,
  ...props
}) {
  useEffect(() => {
    if (verbose) console.log('SectionHeading: Mount/First Render', index);
    return (() => {
      if (verbose) console.log('SectionHeading: UnMount/Destroyed', index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h2 className='sectionHeading' {...props}>
      {content}
    </h2>
  );
};