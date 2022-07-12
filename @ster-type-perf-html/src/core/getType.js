export const getTypeFromPerf = ({ perfHtml, sequenceId }) => {
  const sequenceHtml = perfHtml?.sequencesHtml[sequenceId];
  let type = getTypeFromSequenceHtml({ sequenceHtml });

  if (type === 'main') {
    const { h, toc, toc2 } = perfHtml?.headers || {};
    type = toc || toc2 || h;
  };

  return type;
};

export const getTypeFromSequenceHtml = ({ sequenceHtml }) => {
  let type = sequenceHtml?.match(/data-sequence[Tt]ype="(\w+)"/);
  type &&= type[1];
  return type;
};
