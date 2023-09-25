/** @module EditableBlock */

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
@global
@callback DangerousHtml
@return {string}
*/

/**
@global
@callback OnContent
@param {string} the inner html of the passed in block component
@see {@link BlockComponent}
*/

/**
@global
@callback OnBlur
@param {Event} event
*/

/**
@global
@callback OnInput
*/

/**
@global
@callback Save
@param {Element}
*/

/**
@global
@callback OnClick
*/

/**
@global
@callback BlockComponent

@description 
A BlockComponent is any component that can be passed the below
parameters. This component is internally called by {@link
EditableComponent}.

@param {string} key 
EditableBlock internally constructs this as `` `${editIndex}${content}` ``
where `editIndex` is a stateful natural number incremented everytime
prop.onBlur is called.

@param prop The set of props passed in to BlockComponent. 
@param {string} prop.content threaded from {@link module:EditableBlock.EditableBlock}
@param {object} prop.style threaded from {@link module:EditableBlock.EditableBlock}
@param {OnClick} prop.onClick threaded from {@link module:EditableBlock.EditableBlock}
@param {number} prop.index threaded from {@link module:EditableBlock.EditableBlock}
@param {boolean} prop.verbose threaded from {@link module:EditableBlock.EditableBlock}
@param {Options} prop.options threaded from {@link module:EditableBlock.EditableBlock}
@param {boolean} prop.contentEditable 
@param {object} prop.dangerouslySetInnerHTML 
@param {DangerousHtml} prop.dangerouslySetInnerHTML.__html
@param {boolean} prop.suppressContentEditableWarning
@param {OnBlur} prop.onBlur 
@param {OnInput} prop.onInput
@param {any[]} prop.props

@return {JSX}
*/

/**
@global
@typedef {object} Options
@property {boolean} editable Editable?
@property {boolean} returnHtml Return html instead of text 
*/

/**
@description
A React component for editing any block, for instance a PERF Block.

@function

@param {Object} prop
@param {string} prop.content Text to be edited whether file, section or block
@param {OnContent} prop.onContent  Function triggered on edit 
@param {Options} prop.options Options for the editor
@param {object} prop.components Components to wrap all sections of the document 
@param {BlockComponent} prop.components.block Component to be the block editor 
@param {object} prop.decorators Object of replacers for html/css decoration of text 
@param {OnClick} prop.onClick Callback triggered on Block click, provides block text and index. 
@param {OnInput} prop.onInput Callback triggered on Block input - i.e. Editor has changed content 
@param {object} prop.style css styles for the editable component 
@param {number} prop.index Index to use and reference for rendering 
@param {boolean} prop.verbose Flag to enable logging
@param {any[]} prop.props extra props

@return {JSX}

@todo remove use of defaultProps and use default function parameters
@see [PERF blocks]{@link https://doc.proskomma.bible/en/latest/__old/user_model/building_blocks.html#block} 
*/
export const EditableBlock = ({
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
}) => {
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

/**
@ignore
*/
EditableBlock.propTypes = {
  /** Text to be edited whether file, section or block */
  content: PropTypes.string.isRequired,
  /** Function triggered on edit */
  onContent: PropTypes.func,
  /** Options for the editor */
  options: PropTypes.shape({
    /** @ignore Editable? */
    editable: PropTypes.bool,
    /** @ignore Return html instead of text */
    returnHtml: PropTypes.bool,
  }),
  /** Components to wrap all sections of the document */
  components: PropTypes.shape({
    /** @ignore Component to be the block editor */
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