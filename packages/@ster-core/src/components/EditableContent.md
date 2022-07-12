# EditableContent

This component is what other editors can be built on by overriding default props. It uses EditableSection by segmenting the content into sections first.

```js
import {useState} from 'react';

const title = 'Lorem Ipsum';
const _content = `What is Lorem Ipsum?
Lorem Ipsum is simply dummy content of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy content ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model content, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`;

const [content, setText] = useState(_content);
const [sectionIndex, setSectionIndex] = useState(0);
const [sectionable, setSectionable] = useState(true);
const [blockable, setBlockable] = useState(true);
const [editable, setEditable] = useState(true);
const [preview, setPreview] = useState(false);

const onSectionable = () => { setSectionable(!sectionable); };
const onBlockable = () => { setBlockable(!blockable); };
const onEditable = () => { setEditable(!editable); };
const onPreview = () => { setPreview(!preview); };

console.log('EditableContent.md:\n\n', content);

const components = {
  sectionHeading: ({ show, ...props}) => (
    <h3 {...props}><hr/>{props.content.split('\n')[0]}<hr/></h3>
  ),
  block: ({ verbose, ...props }) => (
    <p {...props} style={{ padding: '0 0.2em', whiteSpace: 'pre-wrap' }}></p>
  ),
};

const handlers = {
  onSectionClick: ({content: _content, index}) => {
    setSectionIndex(index);
  },
};

const props = {
  content,
  onContent: setText,
  options: {
    sectionable,
    blockable,
    editable,
    preview,
  },
  components,
  handlers,
  sectionIndex,
};

const buttons = (
  <>
    <button style={(sectionable ? {borderStyle: 'inset'} : {})} onClick={onSectionable}>Sectionable</button>
    <button style={(blockable ? {borderStyle: 'inset'} : {})} onClick={onBlockable}>Blockable</button>
    <button style={(editable ? {borderStyle: 'inset'} : {})} onClick={onEditable}>Editable</button>
    <button style={(preview ? {borderStyle: 'inset'} : {})} onClick={onPreview}>Preview</button>
  </>
);

<div>
  {buttons}
  <h2>{title}</h2>
  <EditableContent {...props} />
  {buttons}
</div>;
```