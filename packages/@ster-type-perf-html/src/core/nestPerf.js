export const embedPreviewInGrafts = ({ graftHtml, perfHtml }) => {
  const div = document.createElement("div");
  div.innerHTML = graftHtml;
  // parse the full content by divs for rendering
  const graft = div.firstChild;

  const { target } = graft.dataset;
  const embeddedHtml = perfHtml.sequencesHtml[target];
  graft.innerHTML = embeddedHtml;
  console.log(graft);

  const _html = graft.outerHTML;
  console.log(_html);

  return _html;
};

export const embedPreviewTextInGrafts = ({ htmlPerf, sequenceId }) => {
  const parser = new DOMParser();
  const html = htmlPerf.sequencesHtml[sequenceId];
  // parse the full content by divs for rendering
  const dom = parser.parseFromString(html, "text/html");
  const grafts = [...dom.getElementsByClassName("graft")];

  grafts.forEach((graft) => {
    const { target } = graft.dataset;
    const targetHtml = htmlPerf.sequencesHtml[target];
    const div = document.createElement("div");
    div.innerHTML = targetHtml;
    // parse the full content by divs for rendering
    const previewText = div.textContent.trim();
    graft.dataset.previewtext = previewText;
    // console.log(previewText);
  });

  const _html = dom.getElementById("sequence").outerHTML;
  // console.log(_html);

  return _html;
};

export const embedSequencesInGrafts = ({ perfHtml, sequenceId }) => {
  const parser = new DOMParser();
  const html = perfHtml.sequencesHtml[sequenceId];
  // parse the full content by divs for rendering
  const dom = parser.parseFromString(html, "text/html");
  const grafts = [...dom.getElementsByClassName("graft")];

  grafts.forEach((graft) => {
    const { target } = graft.dataset;
    const embededSequencesHtml = embedSequencesInGrafts({
      perfHtml,
      sequenceId: target
    });
    graft.innerHTML = embededSequencesHtml;
    console.log(graft);
  });

  const _html = dom.getElementById("sequence").outerHTML;
  console.log(_html);

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

// export const nestPerf = ({ perf }) => {
//   const parser = new DOMParser();
//   const mainHtml = perf.sequenceHtml[perf.mainSequenceId];
//   const main = parser.parseFromString(mainHtml, "text/html");
//   // parse the full content by divs for rendering
//   const grafts = [...main.getElementsByClassName("graft")];
//   console.log(grafts);
//   grafts.forEach((graft) => {
//     const sequence = perf.sequenceHtml[graft.dataset.target];
//     graft.innerHTML = sequence;
//     console.log(graft);
//   });

//   console.log(main);
//   return main.outerHTML;
// };
