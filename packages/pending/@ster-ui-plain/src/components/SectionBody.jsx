/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

export default function SectionBody({
  content,
  show,
  index,
  verbose,
  children,
  ...props
}) {
  useEffect(() => {
    if (verbose) console.log('SectionBody: Mount/First Render', index);
    return (() => {
      if (verbose) console.log('SectionBody: UnMount/Destroyed', index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='sectionBody' {...props}>{children}</div>
  );
};