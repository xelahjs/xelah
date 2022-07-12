const rtlDirCheckRegex = /[\u0591-\u07FF\uFB1D-\uFDFF\uFE70-\uFEFC]/gm;

export const isRtl = function (text) {
  let mostlyRtl = false;

  if (text && text.length) {
    const rtlMatches = text.match(rtlDirCheckRegex);
    const rtlChars = rtlMatches?.length;
    const textChars = text.length;
    const rtlRatio = rtlChars / textChars;

    if (rtlRatio > 0.3) { mostlyRtl = true; }
  };
  // console.log('isRtl: ', mostlyRtl);
  return mostlyRtl;
};
