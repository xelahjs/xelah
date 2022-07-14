/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareCallback, useDeepCompareMemo } from 'use-deep-compare';

import useParseBlocksContent from '../hooks/useParseBlocksContent';
import EditableBlock from './EditableBlock';

const DEFAULT_PROPS = {
  content: '',
  onContent: (content) => { console.warn('EditableSection.onContent() not provided:\n\n', content); },
  options: {
    editable: true,
  },
  components: {
    section: ({ show, children, dir, ...props }) => (<div className={'section ' + dir} dir={dir} {...props}>{children}</div>),
    sectionHeading: ({ show, content, ...props }) => (<h2 className='sectionHeading' {...props}>{content}</h2>),
    sectionBody: ({ children, show, ...props }) => (<div className='sectionBody' {...props}>{children}</div>),
  },
  handlers: {
    onBlockClick: ({ content, index }) => { console.warn('EditableSection.onBlockClick({content, index}) not provided.\n\n', index); },
  },
  joiners: {
    block: '\n',
  },
  show: true,
  onShow: () => { console.warn('EditableSection.onShow() not provided.'); },
};

const headingStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  contentOverflow: 'ellipsis',
};

export default function EditableSection({
  content,
  onContent,
  parsers,
  joiners,
  decorators,
  index,
  onShow,
  show,
  dir,
  verbose = false,
  ...props
}) {
  const components = { ...DEFAULT_PROPS.components, ...props.components };
  const { section: Section, sectionHeading: SectionHeading, sectionBody: SectionBody } = components || {};
  const options = { ...DEFAULT_PROPS.options, ...props.options };
  const { onBlockClick } = { ...DEFAULT_PROPS.handlers, ...props.handlers };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (verbose) console.log('EditableSection First Render'); }, []);

  const blocksContent = useParseBlocksContent({ content, parsers, options, show });

  const onBlockEdit = useDeepCompareCallback((block, _index) => {
    let _blocks = [...blocksContent];
    _blocks[_index] = block;
    const _content = _blocks.join(joiners.block);
    onContent(_content);
  }, [blocksContent]);

  const blockComponents = useDeepCompareMemo(() => {
    let _blockComponents = <></>;

    if (show) {
      _blockComponents = blocksContent.map((blockContent, _index) => {
        const blockProps = {
          content: blockContent,
          components,
          options,
          onContent: (_blockContent) => { onBlockEdit(_blockContent, _index); },
          onClick: (event) => { onBlockClick({ content: blockContent, index: _index, element: event.target }); },
          decorators,
          index: _index,
          verbose,
        };
        return <EditableBlock key={_index + blockContent} {...blockProps} />;
      });
    };

    return _blockComponents;
  }, [blocksContent, components, options, onBlockClick, onBlockEdit, decorators]);

  return (
    <Section {...{ dir, show, index }}>
      {options.sectionable && (
        <SectionHeading {...{ show, dir, style: headingStyle, onClick: onShow, content, index }} data-test-id='sectionHeading' />
      )}
      <SectionBody {...{ show, dir, index }}>
        {blockComponents}
      </SectionBody>
    </Section>
  );
};

EditableSection.propTypes = {
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
    /** Return html instead of text */
    returnHtml: PropTypes.bool,
  }),
  /** Components to wrap all sections of the document */
  components: PropTypes.shape({
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
    /** Function to parse the content into blocks */
    block: PropTypes.func,
  }),
  /** Strings to join the blocks to content */
  joiners: PropTypes.shape({
    /** String to join the blocks to content */
    block: PropTypes.string,
  }),
  /** Object of replacers for html/css decoration of content, done at block level */
  decorators: PropTypes.object,
  /** Callback handlers such as block and section click */
  handlers: PropTypes.shape({
    /** Callback triggered on Block click, provides block content and index. */
    onBlockClick: PropTypes.func,
  }),
  /** Index to use and reference for rendering */
  index: PropTypes.number,
  /** Flag to enable logging  */
  verbose: PropTypes.bool,
  /** Flag to render section or not */
  show: PropTypes.bool,
  /** Callback to change show value */
  onShow: PropTypes.func,
  /** Override text direction */
  dir: PropTypes.string,
};

EditableSection.defaultProps = DEFAULT_PROPS;

