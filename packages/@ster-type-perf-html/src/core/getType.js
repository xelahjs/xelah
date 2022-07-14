export const getTypeFromPerf = ({ perfHtml, sequenceId }) => {
  const htmlSequence = perfHtml?.sequencesHtml[sequenceId];
  let type = getTypeFromSequenceHtml({ htmlSequence });

  if (type === 'main') {
    const { h, toc, toc2 } = perfHtml?.headers || {};
    type = toc || toc2 || h;
  };

  return type;
};

export const getTypeFromSequenceHtml = ({ htmlSequence }) => {
  let type = htmlSequence?.match(/data-type="(\w+)"/);
  type &&= type[1];
  return type;
};
