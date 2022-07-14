/* eslint-disable react/prop-types, no-unused-vars */
import React, { useEffect } from 'react';

export default function Document({
  nodes = {},
  children,
  content: _content,
  className: _className,
  verbose,
  ...props
}) {
  useEffect(() => {
    if (verbose) console.log('Document: Mount/First Render');
    return (() => {
      if (verbose) console.log('Document: UnMount/Destroyed');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { dataset, className } = nodes.sequence();

  return (
    <section id="sequence" className={`${className} ${_className}`} {...dataset}>
      {children}
    </section>
  );
};