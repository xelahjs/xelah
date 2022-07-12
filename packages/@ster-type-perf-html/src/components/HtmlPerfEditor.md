# HtmlPerfEditor

The HtmlPerf Editor expects input of a json structure that holds Html representations of multiple Perf sequences.

It navigates the Sequences and initiates a SequenceHtml editor for the main sequenceId.

```js
import { useState, useEffect } from 'react';

import { SectionHeading } from '@ster/type-perf-html';

import _htmlPerf from '../data/jonah.perf.html.json';

const components = {
  sectionHeading: SectionHeading,
}

function Component () {
  const [htmlPerf, setHtmlPerf] = useState(_htmlPerf);
  const [sequenceIds, setSequenceIds] = useState([htmlPerf.mainSequenceId]);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [sectionable, setSectionable] = useState(true);
  const [blockable, setBlockable] = useState(true);
  const [editable, setEditable] = useState(true);
  const [preview, setPreview] = useState(false);

  const onSectionable = () => { setSectionable(!sectionable); };
  const onBlockable = () => { setBlockable(!blockable); };
  const onEditable = () => { setEditable(!editable); };
  const onPreview = () => { setPreview(!preview); };
  const addSequenceId = (sequenceId) => {
    setSequenceIds( _sequenceIds => [...sequenceIds, sequenceId]);
  };

  const onSectionClick = ({content: _content, index}) => {
    // console.log(index, _content);
    setSectionIndex(index);
  };

  const onBlockClick = ({content: _content, index, element}) => {
    // console.log(element.dataset.target);
  };

  const onContent = (_content) => {
    console.log('content changed!');
    setContent(_content);
  };

  const props = {
    sequenceId: sequenceIds[0],
    addSequenceId,
    htmlPerf,
    onHtmlPerf: setHtmlPerf,
    components,
    options: {
      sectionable,
      blockable,
      editable,
      preview,
    },
    handlers: {
      onSectionClick,
      onBlockClick,
    },
    sectionIndex,
    verbose: true,
  };

  const buttons = (
    <div className="buttons">
      <button style={(sectionable ? {borderStyle: 'inset'} : {})} onClick={onSectionable}>Sectionable</button>
      <button style={(blockable ? {borderStyle: 'inset'} : {})} onClick={onBlockable}>Blockable</button>
      <button style={(editable ? {borderStyle: 'inset'} : {})} onClick={onEditable}>Editable</button>
      <button style={(preview ? {borderStyle: 'inset'} : {})} onClick={onPreview}>Preview</button>
    </div>
  );

  return (
    <div key="1">
      {buttons}
      <HtmlPerfEditor key="1" {...props} />
      {buttons}
    </div>
  );
};

<Component key="1" />;
```