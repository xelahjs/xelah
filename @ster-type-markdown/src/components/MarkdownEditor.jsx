/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';

import { segmenter } from '../helpers/segmenter';
import EditableContent from './EditableContent';

import './Markdown.css';

export default function MarkdownEditor(props) {
  return (
    <div className='markdown'>
      <EditableContent {...props} />
    </div>
  );
};

MarkdownEditor.propTypes = {
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

MarkdownEditor.defaultProps = {
  components: {
    sectionHeading: ({ show, content, ...props }) => (
      <div className='heading' {...props}>
        <span className='content'>{content.replace(/^\n+/, '').split('\n')[0]}</span>
      </div>
    ),
    block: ({ verbose, ...props }) => (
      <div className='block' {...props} style={{ width: '100%', whiteSpace: 'pre-wrap' }} />
    ),
  },
  parsers: {
    section: (_content) => (
      segmenter({ content: _content, regex: /(\n|.)+?(\n|$)(?=(#{1,4} +.+\n*|$))/g })
    ),
    block: (_content) => (
      segmenter({ content: _content, regex: /(.+\n)+?(\n+|$)(?=(.+|$))/g })
    ),
  },
  joiners: {
    section: '',
    block: '',
  },
  decorators: {
    embededHtml: [/</g, "&lt;"], // same as default but overrideable
    // psuedoBlock: [ /(\n|.)+?(\n\n|$)/g, "<span class='pseudo-block $2'>$1</span>" ],
    h6: [/(^###### +.*)/gm, "<h6>$1</h6>"],
    h5: [/(^##### +.*)/gm, "<h5>$1</h5>"],
    h4: [/(^#### +.*)/gm, "<h4>$1</h4>"],
    h3: [/(^### +.*)/gm, "<h3>$1</h3>"],
    h2: [/(^## +.*)/gm, "<h2>$1</h2>"],
    h1: [/(^# +.*)/gm, "<h1>$1</h1>"],
    blockquote: [/(^ *>+ +.*$)/gm, "<blockquote>$1</blockquote>"],
    // li3: [ /(^ {6,}[+\-*]+ +.*$)/gm, "<li><li><li>$1</li></li></li>" ],
    // li2: [ /(^ {4,5}[+\-*]+ +.*$)/gm, "<li><li>$1</li></li>" ],
    // li1: [ /(^ {2,3}[+\-*]+ +.*$)/gm, "<li>$1</li>" ],
    li: [/(^ *[+\-*]+ +.*$)/gm, "<ul><li>$1</li></ul>"],
    // ul: [ /((^<li>.*<\/li>$)+)/gm, "<ul>$1</ul>" ],
    strong: [/(\*\*.*\*\*|__.*__)/g, "<strong>$1</strong>"],
    link: [/(\[.*?\]\((.*?)\))/g, "<a href='$2' target='blank'>$1</a>"],
    em: [/(\*.*\*|_.*_)/g, "<em>$1</em>"],
    strike: [/(~~.*~~)/g, "<strike>$1</strike>"],
  },
};