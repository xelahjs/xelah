/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

export default function Section({
  content,
  show,
  index,
  verbose,
  children,
  dir = 'ltr',
  ...props
}) {
  useEffect(() => {
    if (verbose) console.log('Section: Mount/First Render', index);
    return (() => {
      if (verbose) console.log('Section: UnMount/Destroyed', index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={'section ' + dir} dir={dir} {...props}>{children}</div>
  );
};