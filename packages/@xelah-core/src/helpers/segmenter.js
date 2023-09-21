/**
@todo Is this used directly anywhere? A quick search on github shows no
results (only Editable* from @xelah/core are used both across other xelah
modules and some friendsofagape modules). 

Further: this function is identical to String.<prototype>.match, I'm curious
to existance. 

See [MDN Documentation]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#description}
*/
export const segmenter = ({ content, regex }) => {
  let segments = [content];
  segments = [];
  var match = regex.exec(content);

  while (match !== null) {
    // console.log(`match(${regex}): `, match[0]);
    const segment = match[0];
    segments = [...segments, segment];
    match = regex.exec(content);
  };
  return segments;
};
