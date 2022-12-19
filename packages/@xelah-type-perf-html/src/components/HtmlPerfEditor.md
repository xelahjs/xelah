# HtmlPerfEditor

The HtmlPerf Editor expects input of a json structure that holds Html representations of multiple Perf sequences.

It navigates the Sequences and initiates a SequenceHtml editor for the main sequenceId.

```js
import { useState, useEffect } from 'react';

import {
  SectionHeading,
} from '@xelah/type-perf-html';

import __htmlPerf from '../data/tit-fra_fraLSG-perf.ch1.html.json';

import './HtmlPerfEditor.css';

const components = {
  sectionHeading: SectionHeading,
}

function Component () {
  const [htmlPerf, setHtmlPerf] = useState(__htmlPerf);
  const [sequenceIds, setSequenceIds] = useState([htmlPerf.mainSequenceId]);
  const [graftSequenceId, setGraftSequenceId] = useState();
  const [sectionable, setSectionable] = useState(true);
  const [blockable, setBlockable] = useState(true);
  const [editable, setEditable] = useState(true);
  const [preview, setPreview] = useState(true);
  const [verbose, setVerbose] = useState(false);

  const onSectionable = () => { setSectionable(!sectionable); };
  const onBlockable = () => { setBlockable(!blockable); };
  const onEditable = () => { setEditable(!editable); };
  const onPreview = () => { setPreview(!preview); };
  const addSequenceId = (sequenceId) => {
    setSequenceIds( _sequenceIds => [...sequenceIds, sequenceId]);
  };

  const onHtmlPerf = (_htmlPerf) => {
    console.log('htmlPerf changed!', {_htmlPerf});
    setHtmlPerf(_htmlPerf);
  };
  
  const options = { sectionable, blockable, editable, preview, verbose };

  const handlers = {
    onBlockClick: ({ content: _content, element }) => {
      const _sequenceId = element.dataset.target;
      const { tagName } = element;
      const isInline = tagName === 'SPAN';
      // if (_sequenceId && !isInline) addSequenceId(_sequenceId);
      if (_sequenceId) setGraftSequenceId(_sequenceId);
    },
  };

  const mainProps = {
    sequenceIds,
    addSequenceId,
    htmlPerf,
    onHtmlPerf,
    onInput: (ev) => console.log(ev),
    components,
    options,
    handlers,
  };

  const graftProps = {
    ...mainProps,
    options: { ...options, sectionable: false },
    sequenceIds: [graftSequenceId],
  };

  const buttons = (
    <div className="buttons">
      <button style={(sectionable ? {borderStyle: 'inset'} : {})} onClick={onSectionable}>Sectionable</button>
      <button style={(blockable ? {borderStyle: 'inset'} : {})} onClick={onBlockable}>Blockable</button>
      <button style={(editable ? {borderStyle: 'inset'} : {})} onClick={onEditable}>Editable</button>
      <button style={(preview ? {borderStyle: 'inset'} : {})} onClick={onPreview}>Preview</button>
    </div>
  );

  const graftSequenceEditor = (
    <>
      <h2>Graft Sequence Editor</h2>
      <HtmlPerfEditor key="2" {...graftProps} />
    </>
  );

  return (
    <div key="1">
      {buttons}
      <h2>Main Sequence Editor</h2>
      <HtmlPerfEditor key="1" {...mainProps} />
      {graftSequenceId ? graftSequenceEditor : '' }
    </div>
  );
};

<Component key="1" />;
```
