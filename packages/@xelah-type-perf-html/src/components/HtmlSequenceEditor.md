# HtmlSequenceEditor

PerfEditor is and editor for the PERF (Proskomma Editor Ready Format) based on the EditableContent by overriding its default props.

No UI library (such as MaterialUI or TailwindCSS) is required but they are supported. React components are passed in to customize the UI to your needs.

## Example 1 (Custom UI)

To see a reference implementation Proof of Concept using MaterialUI see:

- Code: https://codesandbox.io/s/perf-html-editor-vkejn8
- Demo: https://vkejn8.csb.app/

## Example 2 (Tailwind CSS)

If you would like to contribute an example implementation using TailwindCSS please do so on codesandbox.io and submit a PR with links right here.

## Example 3 (Bare Minimum)

This example shows the bare minimum use case and uses default components to render the editor.

```js
import { useState, useEffect } from 'react';

import {
  mainSequenceId,
  sequencesHtml
} from '../data/tit-fra_fraLSG-perf.ch1.html.json';

import './HtmlSequenceEditor.css';

const _htmlSequence = sequencesHtml[mainSequenceId];

function Component () {
  const [htmlSequence, setHtmlPerf] = useState(_htmlSequence);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [sectionable, setSectionable] = useState(true);
  const [blockable, setBlockable] = useState(true);
  const [editable, setEditable] = useState(true);
  const [preview, setPreview] = useState(false);

  const onSectionable = () => { setSectionable(!sectionable); };
  const onBlockable = () => { setBlockable(!blockable); };
  const onEditable = () => { setEditable(!editable); };
  const onPreview = () => { setPreview(!preview); };

  const onSectionClick = ({content: _content, index}) => {
    // console.log(index, _content);
    setSectionIndex(index);
  };

  const onBlockClick = ({content: _content, index, element}) => {
    // console.log(element.dataset.target);
  };

  const onHtmlSequence = (_content) => {
    console.log('content changed!');
    setHtmlPerf(_content);
  };

  const props = {
    htmlSequence,
    onHtmlSequence,
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
    verbose: false,
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
      <HtmlSequenceEditor key="1" {...props} />
    </div>
  );
};

<Component key="1" />;
```
