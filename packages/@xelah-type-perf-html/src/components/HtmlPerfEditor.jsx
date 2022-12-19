/* eslint-disable react/prop-types */
import React, { useState, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import { useDeepCompareCallback, useDeepCompareMemo } from "use-deep-compare";
import isEqual from 'lodash.isequal';

import { embedPreviewTextInGrafts, removePreviewTextInGrafts } from "../core/nestPerf";
import { getTypeFromSequenceHtml } from "../core/getType";
import SectionHeading from "./SectionHeading";
import RecursiveBlock from "./RecursiveBlock";

import HtmlSequenceEditor from "./HtmlSequenceEditor";

export default function HtmlPerfEditor({
  htmlPerf,
  onHtmlPerf,
  sequenceIds,
  addSequenceId,
  options,
  components: _components,
  handlers,
  ...props
}) {
  const [sectionIndices, setSectionIndices] = useState({});
  const sequenceId = sequenceIds.at(-1);

  const components = { sectionHeading: SectionHeading, ..._components };

  const htmlSequence = useDeepCompareMemo(() => (
    embedPreviewTextInGrafts({ htmlPerf, sequenceId })
  ), [htmlPerf, sequenceId]);

  const sequenceType = useMemo(() => getTypeFromSequenceHtml({ htmlSequence }), [htmlSequence]);

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

  const onHtmlSequence = useDeepCompareCallback((_htmlSequence) => {
    const sequenceChanged = htmlSequence !== _htmlSequence;
    if (sequenceChanged) {
      let _htmlPerf = structuredClone(htmlPerf);
      _htmlPerf.sequencesHtml[sequenceId] = _htmlSequence;

      const perfChanged = !isEqual(htmlPerf, _htmlPerf);
      if (perfChanged) {
        const htmlPerfNoPreviewText = removePreviewTextInGrafts({ htmlPerf: _htmlPerf, sequenceId });
        onHtmlPerf(htmlPerfNoPreviewText, { sequenceId, htmlSequence: _htmlSequence });
      };
    };
  }, [htmlPerf, onHtmlPerf, htmlSequence, sequenceId]);

  const _props = {
    htmlSequence,
    onHtmlSequence,
    components: {
      ...components,
      sectionHeading: (__props) => components.sectionHeading({ type: sequenceType, ...__props }),
      block: (__props) => RecursiveBlock({ htmlPerf, onHtmlPerf, sequenceIds, addSequenceId, ...__props }),
    },
    options,
    handlers: {
      onSectionClick,
      onBlockClick,
      ...handlers,
    },
    decorators: {},
    sectionIndex,
    ...props
  };

  return (
    <HtmlSequenceEditor {..._props} />
  );
};

HtmlPerfEditor.propTypes = {
  /** Text to be edited whether file, section or block */
  htmlPerf: PropTypes.object.isRequired,
  /** Function triggered on edit, returns (htmlPerf, { sequenceId, htmlSequence }) */
  onHtmlPerf: PropTypes.func,
  /** Function triggered on change in the Editor content */
  onInput: PropTypes.func,
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

HtmlPerfEditor.defaultProps = {
  sequenceIds: [],
};
