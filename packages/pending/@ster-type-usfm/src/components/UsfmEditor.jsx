/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';

import { segmenter } from '../helpers/segmenter';
import EditableContent from './EditableContent';

import './Usfm.css';

export default function UsfmEditor(props) {
  return (
    <div className='usfm'>
      <EditableContent {...props} />
    </div>
  );
};

UsfmEditor.propTypes = {
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
};

UsfmEditor.defaultProps = {
  components: {
    sectionHeading: ({ content, show, ...props }) => (
      <div className='heading' {...props}>
        {show ? '' : (
          <>
            <span className='expand'>&gt; </span>
            <span className='content'>{content.replace(/^\n+/, '').split('\n')[0]}</span>
          </>
        )}
      </div>
    ),
    block: ({ content, verbose, ..._props }) => (
      <><div className='block' {..._props} style={{ width: '100%', whiteSpace: 'pre-wrap' }} /></>
    ),
  },
  parsers: {
    section: (_content) => (
      segmenter({ content: _content, regex: /(^|\\c +\d+)(\n|.)+?(\n|$)?(?=(\\c +\d+|$))/g })
    ),
    block: (_content) => (
      segmenter({ content: _content, regex: /(^|\\[cspv])(\n|.)+?(\n|$)?(?=(\\[cspv]|$))/g })
    ),
  },
  joiners: {
    section: '',
    block: '',
  },
  decorators: {
    embededHtml: [/</g, "&lt;"], // same as default but overrideable
    header: [/(\\(id|ide|h|toc\d?|mt)(\n|.|$)+?)(?=(\\(id|ide|h|toc\d?|mt|[cspvr])|$))/g, "<span class='header $2'>$1</span>"],
    psuedoBlock: [/(\\([cspvr]\d?)(\n|.|$)+?)(?=(\\[cspvr]|$))/g, "<span class='pseudo-block $2'>$1</span>"],
    footnotes: [/(\\f (.|\n)+?(\\f\*))/g, "<span class='footnote'>$1</span>"],
    endnotes: [/(\\fe (.|\n)+?(\\fe\*))/g, "<span class='endnote'>$1</span>"],
    numberForMarkers: [/(\\([\w]+)\** +)(\d+-?\d*)(?=[^:.])/g, "$1<span class='number'>$3</span>"],
    markers: [/(\\([\w-]+\d*)\\?\** *)(?=[^:.])/g, "<span class='marker $2'>$1</span>"],
    attributes: [/(\|? ?x?-?[\w-]+=".*")/g, "<span class='attribute'>$1</span>"],
  },
};