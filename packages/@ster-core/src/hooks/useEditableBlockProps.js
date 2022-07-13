/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useCallback, useState } from 'react';
import { useDeepCompareMemo, useDeepCompareCallback } from 'use-deep-compare';
import PropTypes from 'prop-types';

const DEFAULT_PROPS = {
  content: '',
  onContent: (content) => { console.warn('EditableBlock.onContent() not provided:\n\n', content); },
  options: {
    editable: true,
  },
  decorators: {},
};

export default function useEditableBlockProps({
  content,
  onContent,
  decorators: _decorators,
  options: _options,
}) {
  const { returnHtml, editable, preview } = { ...DEFAULT_PROPS.options, ..._options };

  const [editIndex, setEditIndex] = useState(0);

  const __html = useDeepCompareMemo(() => {
    let ___html = content;
    const decorators = !returnHtml ?
      { embededHtml: [/</g, "&lt;"], ..._decorators } :
      { spanPadding: [/<\/span>/g, "</span>\u200B"], ..._decorators };

    if (Object.keys(decorators).length > 0) {
      Object.keys(decorators).forEach((name) => {
        const [regex, replacer] = decorators[name];
        ___html = ___html.replace(regex, replacer);
      });
    };
    return ___html;
  }, [content, returnHtml, _decorators, preview]);

  const save = useDeepCompareCallback((element) => {
    let _content;

    if (returnHtml) {
      _content = element.innerHTML.replaceAll('\u200B', '');
    } else {
      const div = document.createElement('div');
      div.innerHTML = element.innerHTML.replaceAll('<div', '\n<div');
      _content = div.textContent.replaceAll(/&lt;/g, '<');
    };

    if (content !== _content) onContent(_content);
    setEditIndex(editIndex + 1);
  }, [returnHtml, content, onContent, editIndex]);

  const onBlur = useCallback((event) => {
    save(event.target);
  }, [save]);

  const props = useDeepCompareMemo(() => ({
    editIndex,
    contentEditable: editable,
    dangerouslySetInnerHTML: { __html },
    suppressContentEditableWarning: true,
    save,
    onBlur,
  }), [editable, __html, onBlur, editIndex]);

  return props;
};

useEditableBlockProps.propTypes = {
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
  /** Object of replacers for html/css decoration of text */
  decorators: PropTypes.object,
  /** Callback triggered on Block click, provides block text and index. */
  onClick: PropTypes.func,
};

useEditableBlockProps.defaultProps = DEFAULT_PROPS;