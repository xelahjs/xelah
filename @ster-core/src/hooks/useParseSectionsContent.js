import { useMemo } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_PROPS = {
  content: '',
  options: {
    sectionable: true,
  },
  parsers: {
    section: (content) => (content.split('\n\n')),
  },
};

export default function useParseSectionsContent({
  content,
  parsers: _parsers,
  options: _options,
}) {
  const { sectionable } = { ...DEFAULT_PROPS.options, ..._options };
  const { section: sectionParser } = { ...DEFAULT_PROPS.parsers, ..._parsers };

  const sectionsContent = useMemo(() => {
    let _sectionsContent = [];
    _sectionsContent = sectionable ? sectionParser(content) : [content];
    return _sectionsContent;
  }, [content, sectionable, sectionParser]);

  return sectionsContent;
};

useParseSectionsContent.propTypes = {
  /** Text to be edited whether file, section or block */
  content: PropTypes.string.isRequired,
  /** Options for the editor */
  options: PropTypes.shape({
    /** Parse content by sections using sectionParser */
    sectionable: PropTypes.bool,
  }),
  /** Functions to parse the content into sections and blocks */
  parsers: PropTypes.shape({
    /** Function to parse the content into sections */
    section: PropTypes.func,
  }),
};

useParseSectionsContent.defaultProps = DEFAULT_PROPS;

