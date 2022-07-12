```js
import {useState} from 'react';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const usfm = loremIpsumBook({
  bookCode: '1LI',
  bookName: '1 Lorem Ipsum',
  chapterMin: 1,
  chapterMax: 20,
  chapterBias: 5,
  // chapterCount: 3,
  paragraphChance: 0.3,
  verseMin: 1,
  verseMax: 100,
  verseBias: 10,
  // verbose: true,
});

function Component () {
  const [content, setContent] = useState(usfm);
  const [sectionIndex, setSectionIndex] = useState(1);
  const [sectionable, setSectionable] = useState(true);
  const [blockable, setBlockable] = useState(true);
  const [editable, setEditable] = useState(true);
  const [preview, setPreview] = useState(false);

  const onSectionable = () => { setSectionable(!sectionable); };
  const onBlockable = () => { setBlockable(!blockable); };
  const onEditable = () => { setEditable(!editable); };
  const onPreview = () => { setPreview(!preview); };


  const getSectionChapter = (_content) => {
    const match = /\\c *(\d+)/.exec(_content);
    const chapter = match && match[1];
    return chapter;
  };

  const onSectionClick = ({content: _content, index}) => {
    setSectionIndex(index);
    const chapter = getSectionChapter(_content);
    console.log('chapter: ', chapter);
  };

  const getBlockVerse = (_content) => {
    const match = /\\v *(\d+-?\d*)/.exec(_content);
    const verse = match && match[1];
    return verse;
  };

  const onBlockClick = ({content: _content, index}) => {
    const verse = getBlockVerse(_content);
    console.log('verse: ', verse);
  };

  const props = {
    content,
    onContent: setContent,
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
  };

  const buttons = (
    <>
      <button style={(sectionable ? {borderStyle: 'inset'} : {})} onClick={onSectionable}>Sectionable</button>
      <button style={(blockable ? {borderStyle: 'inset'} : {})} onClick={onBlockable}>Blockable</button>
      <button style={(editable ? {borderStyle: 'inset'} : {})} onClick={onEditable}>Editable</button>
      <button style={(preview ? {borderStyle: 'inset'} : {})} onClick={onPreview}>Preview</button>
    </>
  );

  return (<>
    {buttons}
    <UsfmEditor {...props} />
    {buttons}
  </>);
};

<Component />;
```