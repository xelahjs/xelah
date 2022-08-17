/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { getTarget } from '../core/getTarget';
import HtmlPerfEditor from './HtmlPerfEditor';

export default function RecursiveBlock({
  htmlPerf,
  onHtmlPerf,
  sequenceIds,
  addSequenceId,
  options,
  content,
  style,
  contentEditable,
  index,
  verbose,
  ...props
}) {
  useEffect(() => {
    if (verbose) console.log('Block: Mount/First Render', index);
    return (() => {
      if (verbose) console.log('Block: UnMount/Destroyed', index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let component;
  let editable = !!content.match(/data-type="paragraph"/);

  if (editable) {
    component = <div contentEditable={contentEditable} {...props} />;
  };

  if (!editable) {
    const sequenceId = getTarget({ content });

    if (sequenceId && !options.preview) {
      const _props = {
        htmlPerf,
        onHtmlPerf,
        sequenceIds: [...sequenceIds, sequenceId],
        addSequenceId,
        options,
      };
      component = <HtmlPerfEditor {..._props} />;
    };
    component ||= <div {...props} contentEditable={false} />;
  };

  return (
    <>
      {component}
    </>
  );
};