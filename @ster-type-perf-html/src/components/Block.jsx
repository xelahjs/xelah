import React, { useEffect } from 'react';

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function Block({ content, style, contentEditable, index, verbose, ..._props }) {
  useEffect(() => {
    if (verbose) console.log('Block: Mount/First Render', index);
    return (() => {
      if (verbose) console.log('Block: UnMount/Destroyed', index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react/prop-types
  const editable = !!content.match(/class="[\w\s]*block[\w\s]*"/) && contentEditable;

  return (
    <div {..._props} contentEditable={editable} />
  );
};