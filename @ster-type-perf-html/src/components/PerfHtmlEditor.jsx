/* eslint-disable react/prop-types */
import React, { useCallback, useState, useMemo } from "react";
import PropTypes from 'prop-types';
import { useDeepCompareCallback, useDeepCompareMemo } from "use-deep-compare";

import { embedPreviewTextInGrafts } from "../core/nestPerf";
import { getTypeFromSequenceHtml } from "../core/getType";
import Block from "./Block";

import SequenceHtmlEditor from "./SequenceHtmlEditor";

import './PerfHtmlEditor.css';

export default function PerfHtmlEditor({
  sequenceId: __sequenceId,
  addSequenceId,
  options,
  perfHtml,
  onPerfHtml,
  components,
  ..._props
}) {
  const [sectionIndices, setSectionIndices] = useState({});
  const sequenceId = __sequenceId || perfHtml.mainSequenceId;

  const sequenceHtml = useDeepCompareMemo(() => (
    embedPreviewTextInGrafts({ perfHtml, sequenceId })
  ), [perfHtml, sequenceId]);

  const sequenceType = useMemo(() => getTypeFromSequenceHtml({ sequenceHtml }), [sequenceHtml]);

  const sectionIndex = useDeepCompareMemo(() => (
    sectionIndices[sequenceId] || 0
  ), [sectionIndices, sequenceId]);

  // eslint-disable-next-line no-unused-vars
  const onSectionClick = useDeepCompareCallback(({ content: _content, index }) => {
    let _sectionIndices = { ...sectionIndices };
    _sectionIndices[sequenceId] = index;
    setSectionIndices(_sectionIndices);
  }, [setSectionIndices, sectionIndices]);

  // eslint-disable-next-line no-unused-vars
  const onBlockClick = useCallback(({ content: _content, element }) => {
    const _sequenceId = element?.dataset?.target;

    if (_sequenceId) {
      addSequenceId(_sequenceId);
    };
  }, [addSequenceId]);

  const onContentHandler = useCallback((_content) => {
    if (sequenceHtml !== _content) {
      onPerfHtml({ sequenceId, sequenceHtml: _content });
    };
  }, [onPerfHtml, sequenceHtml, sequenceId]);


  const props = {
    content: sequenceHtml,
    onContent: onContentHandler,
    components: {
      ...components,
      sectionHeading: (props) => components.sectionHeading({ type: sequenceType, ...props }),
      block: Block,
    },
    options,
    handlers: {
      onSectionClick,
      onBlockClick
    },
    decorators: {},
    sectionIndex,
    ..._props
  };

  console.log(options);

  return (
    <div className="PerfHtmlEditor" key={sequenceId}>
      <SequenceHtmlEditor key={sequenceId} {...props} />
    </div>
  );
};

PerfHtmlEditor.propTypes = {
  /** Text to be edited whether file, section or block */
  perfHtml: PropTypes.string.isRequired,
  /** Function triggered on edit */
  onPerfHtml: PropTypes.func,
  /** Options for the editor */
  options: PropTypes.shape({
    /** Parse content by sections using sectionParser */
    sectionable: PropTypes.bool,
    /** Parse content by blocks using blockParser */
    blockable: PropTypes.bool,
    /** Editable? */
    editable: PropTypes.bool,
    /** Preview? */
    preview: PropTypes.bool,
  }),
  /** Components to wrap all sections of the document */
  components: PropTypes.shape({
    /** Component to wrap all sections of the document */
    document: PropTypes.func,
    /** Component to be the section wrapper */
    section: PropTypes.func,
    /** Component to wrap the first line of a section */
    sectionHeading: PropTypes.func,
    /** Component to be the section body */
    sectionBody: PropTypes.func,
    /** Component to be the block editor */
    block: PropTypes.func,
  }),
  /** Functions to parse the content into sections and blocks */
  parsers: PropTypes.shape({
    /** Function to parse the content into sections */
    section: PropTypes.func,
    /** Function to parse the content into blocks */
    block: PropTypes.func,
  }),
  /** Strings to join the blocks to content */
  joiners: PropTypes.shape({
    /** String to join the sections to content */
    section: PropTypes.string,
    /** String to join the blocks to content */
    block: PropTypes.string,
  }),
  /** Object of replacers for html/css decoration of content, done at block level */
  decorators: PropTypes.object,
  /** Callback handlers such as block and section click */
  handlers: PropTypes.shape({
    /** Callback triggered on Section Heading click, provides section content and index. */
    onSectionClick: PropTypes.func,
    /** Callback triggered on Block click, provides block content and index. */
    onBlockClick: PropTypes.func,
  }),
  /** Index of section to be show, for app to manage state. -1 to show all. */
  sectionIndex: PropTypes.number,
  /** Flag to enable logging  */
  verbose: PropTypes.bool,
};

PerfHtmlEditor.defaultProps = {
  sequenceId: undefined,
};

