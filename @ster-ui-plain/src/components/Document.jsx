/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

export default function Document({ dataset = {}, children, content: _content, className, verbose, ...props }) {
  useEffect(() => {
    if (verbose) console.log('Document: Mount/First Render');
    return (() => {
      if (verbose) console.log('Document: UnMount/Destroyed');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="sequence" className={className} {...dataset}>
      <div id="content">
        {children}
      </div>
    </div>
  );
};