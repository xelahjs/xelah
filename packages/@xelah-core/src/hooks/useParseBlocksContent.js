import { useMemo } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_PROPS = {
  content: '',
  options: {
    blockable: true,
  },
  parsers: {
    block: (content) => (content.split('\n')),
  },
  show: true,
};

export default function useParseBlocksContent({
  content,
  parsers: _parsers,
  options: _options,
  show,
}) {
  const { blockable } = { ...DEFAULT_PROPS.options, ..._options };
  const { block: blockParser } = { ...DEFAULT_PROPS.parsers, ..._parsers };

  const blocksContent = useMemo(() => {
    let _blocksContent = [];
    _blocksContent = show && (blockable ? blockParser(content) : [content]);
    return _blocksContent;
  }, [show, blockable, blockParser, content]);

  return blocksContent;
};

useParseBlocksContent.propTypes = {
  /** Text to be edited whether file, section or block */
  content: PropTypes.string.isRequired,
  /** Options for the editor */
  options: PropTypes.shape({
    /** Parse content by blocks using blockParser */
    blockable: PropTypes.bool,
  }),
  /** Functions to parse the content into sections and blocks */
  parsers: PropTypes.shape({
    /** Function to parse the content into blocks */
    block: PropTypes.func,
  }),
};

useParseBlocksContent.defaultProps = DEFAULT_PROPS;

