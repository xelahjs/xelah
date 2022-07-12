```js
import {useState} from 'react';

const _content = `
# h1 Heading 8-)

Content for the heading.

## h2 Heading

Content for the heading.

### h3 Heading

Content for the heading.

#### h4 Heading

Content for the heading.

##### h5 Heading

Content for the heading.

###### h6 Heading

Content for the heading.

## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold content**

__This is bold content__

*This is italic content*

_This is italic content_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample content here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link content](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title content!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)
`;

const [content, setContent] = useState(_content);
const [sectionIndex, setSectionIndex] = useState(0);

const onSectionClick = ({content: _content, index}) => {
  setSectionIndex(index);
};

const props = {
  content,
  onContent: setContent,
  options: {
    sectionable: true,
    blockable: true,
  },
  handlers: {
    onSectionClick,
  },
  sectionIndex,
};

<MarkdownEditor {...props} />;
```