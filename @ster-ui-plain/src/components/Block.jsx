/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

export default function Block({ content, index, verbose, ...props }) {
  useEffect(() => {
    if (verbose) console.log('Block: Mount/First Render', index);
    return (() => {
      if (verbose) console.log('Block: UnMount/Destroyed', index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div {...props} />
  );
};