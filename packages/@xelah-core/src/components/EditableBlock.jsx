/**
@module EditorBlock
@todo deadcode, please remove
*/

/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import useEditableBlockProps from '../hooks/useEditableBlockProps';
import EditableContextMenu from './EditableContextMenu';

const DEFAULT_PROPS = {
  ...useEditableBlockProps.defaultProps,
  style: { whiteSpace: 'pre-wrap', padding: '1em' },
  components: {
    block: ({ content, verbose, options, ...props }) => (<div className='block' {...props} />),
  },
};

export default EditableBlock

/**
@component
@description
A React component for editing any block, for instance a PERF Block.

@todo refine prop types
@see [PERF blocks]{@link https://doc.proskomma.bible/en/latest/__old/user_model/building_blocks.html#block} 
*/
function EditableBlock({
  content,
  onContent,
  decorators,
  style,
  onClick,
  components: _components,
  options,
  index,
  verbose = false,
  ...props
}) {
  const components = { ...DEFAULT_PROPS.components, ..._components };
  const { block: Block } = components || {};

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (verbose) console.log('EditableBlock First Render'); }, []);

  const { 
    editIndex, 
    save, 
    ...editableBlockProps 
  } = useEditableBlockProps({ 
    content, 
    onContent, 
    onInput: props?.onInput, 
    decorators, 
    options 
  });

  const blockProps = {
    content,
    style,
    onClick,
    index,
    verbose,
    options,
    ...editableBlockProps,
    ...props
  };

  return (
    <Block key={editIndex + content} {...blockProps} />
  );
};

EditableBlock.propTypes = {
  /** Text to be edited whether file, section or block */
  content: PropTypes.string.isRequired,
  /** Function triggered on edit */
  onContent: PropTypes.func,
  /** Options for the editor */
  options: PropTypes.shape({
    /** Editable? */
    editable: PropTypes.bool,
    /** Return html instead of text */
    returnHtml: PropTypes.bool,
  }),
  /** Components to wrap all sections of the document */
  components: PropTypes.shape({
    /** Component to be the block editor */
    block: PropTypes.func,
  }),
  /** Object of replacers for html/css decoration of text */
  decorators: PropTypes.object,
  /** Callback triggered on Block click, provides block text and index. */
  onClick: PropTypes.func,
  /** Callback triggered on Block input - i.e. Editor has changed content */
  onInput: PropTypes.func,
  /** css styles for the editable component */
  style: PropTypes.object,
  /** Index to use and reference for rendering */
  index: PropTypes.number,
  /** Flag to enable logging  */
  verbose: PropTypes.bool,
};

EditableBlock.defaultProps = DEFAULT_PROPS;