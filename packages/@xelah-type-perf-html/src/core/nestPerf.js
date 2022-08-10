export const embedPreviewTextInGrafts = ({ htmlPerf, sequenceId }) => {
  const parser = new DOMParser();
  const html = htmlPerf.sequencesHtml[sequenceId];
  const dom = parser.parseFromString(html, "text/html");
  const grafts = [...dom.getElementsByClassName("graft")];

  grafts.forEach((graft) => {
    const { target } = graft.dataset;
    const targetHtml = htmlPerf.sequencesHtml[target];
    const div = document.createElement("div");
    div.innerHTML = targetHtml;
    const previewText = div.textContent.trim();
    graft.dataset.previewtext = previewText;
  });

  const _html = dom.getElementsByTagName('section')[0].outerHTML;

  return _html;
};

export const removePreviewTextInGrafts = ({ htmlPerf, sequenceId }) => {
  const parser = new DOMParser();
  const html = htmlPerf.sequencesHtml[sequenceId];
  const dom = parser.parseFromString(html, "text/html");
  const grafts = [...dom.getElementsByClassName("graft")];

  grafts.forEach((graft) => {
    delete graft.dataset.previewtext;
  });

  const _htmlSequence = dom.getElementsByTagName('section')[0].outerHTML;
  const _htmlPerf = structuredClone(htmlPerf);
  _htmlPerf.sequencesHtml[sequenceId] = _htmlSequence;

  return _htmlPerf;
};

export const embedSequencesInGrafts = ({ perfHtml, sequenceId }) => {
  const parser = new DOMParser();
  const html = perfHtml.sequencesHtml[sequenceId];
  const dom = parser.parseFromString(html, "text/html");
  const grafts = [...dom.getElementsByClassName("graft")];

  grafts.forEach((graft) => {
    const { target } = graft.dataset;
    const embededSequencesHtml = embedSequencesInGrafts({
      perfHtml,
      sequenceId: target
    });
    graft.innerHTML = embededSequencesHtml;
  });

  const _html = dom.getElementsByTagName('section')[0].outerHTML;

  return _html;
};

export const embedSequencesInMainGrafts = ({ perfHtml }) => {
  const { mainSequenceId } = perfHtml;
  const embeddedSequencesInMainGrafts = embedSequencesInGrafts({
    perfHtml,
    sequenceId: mainSequenceId
  });

  console.log(
    "embedSequencesInMainGrafts",
    mainSequenceId,
    embeddedSequencesInMainGrafts
  );

  return embeddedSequencesInMainGrafts;
};