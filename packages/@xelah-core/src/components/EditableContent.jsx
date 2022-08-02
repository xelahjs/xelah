/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareCallback, useDeepCompareEffect, useDeepCompareMemo } from 'use-deep-compare';
import { addArrowKeyNavigationToContenteditableElements } from 'contenteditable-arrow-navigation';

import useParseSectionsContent from '../hooks/useParseSectionsContent';
import { isRtl } from '../helpers/detectRTL';
import EditableSection from './EditableSection';

const DEFAULT_PROPS = {
  content: '',
  onContent: (content) => { console.warn('EditableContent.onContent() not provided:\n\n', content); },
  options: {
    sectionable: true,
    blockable: true,
    editable: true,
    preview: false,
  },
  components: {
    document: ({ children, content, ...props }) => (<div className='document' {...props}>{children}</div>),
  },
  parsers: {
    section: (content) => (content.split('\n\n')),
    block: (content) => (content.split('\n')),
  },
  joiners: {
    section: '\n\n',
    block: '\n',
  },
  handlers: {
    onSectionClick: ({ content, index }) => { console.warn('EditableContent.onSectionClick({content, index}) not provided:\n\n', index); },
    onBlockClick: ({ content, index }) => { console.warn('EditableContent.onBlockClick({content, index}) not provided.\n\n', index); },
  },
  sectionIndex: 0,
};

export default function EditableContent({
  content,
  onContent,
  components: _components,
  parsers,
  joiners,
  decorators,
  sectionIndex,
  verbose = false,
  ...props
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const components = useMemo(() => ({ ...DEFAULT_PROPS.components, ..._components }), []); // without empty dep for useMemo, components rerender from scratch every time.
  const { document: Document } = components;
  const options = { ...DEFAULT_PROPS.options, ...props.options };
  const handlers = { ...DEFAULT_PROPS.handlers, ...props.handlers };

  useEffect(() => {
    if (verbose) console.log('EditableContent First Render');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDeepCompareEffect(() => {
    addArrowKeyNavigationToContenteditableElements();
  }, [options, content]);

  const sectionsContent = useParseSectionsContent({ content, parsers, options })

  const onSectionEdit = useDeepCompareCallback((section, index) => {
    let _sections = [...sectionsContent];
    _sections[index] = section;
    const _content = _sections.join(joiners.section);
    onContent(_content);
  }, [sectionsContent, onContent]);

  const sectionsComponents = useDeepCompareMemo(() => {
    let _sectionsComponents;
    const dir = isRtl(content) ? 'rtl' : '';

    _sectionsComponents = sectionsContent.map((sectionContent, index) => {
      const sectionProps = {
        content: sectionContent,
        onContent: (_section) => { onSectionEdit(_section, index); },
        show: (!options.sectionable || sectionIndex === -1 || index === sectionIndex),
        onShow: () => { handlers.onSectionClick({ content: sectionContent, index }); },
        index,
        components,
        options,
        parsers,
        joiners,
        handlers,
        decorators,
        dir,
        verbose,
      };
      return <EditableSection key={index} {...sectionProps} />;
    });

    return _sectionsComponents;
  }, [sectionsContent, options, parsers, joiners, decorators, handlers, sectionIndex]);

  const documentProps = { content, className: (options.preview ? 'preview' : ''), ...props };

  return (
    <Document key="1" {...documentProps}>
      {sectionsComponents}
    </Document>
  );
};

EditableContent.propTypes = {
  /** Text to be edited whether file, section or block */
  content: PropTypes.string.isRequired,
  /** Function triggered on edit */
  onContent: PropTypes.func,
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

EditableContent.defaultProps = DEFAULT_PROPS;

