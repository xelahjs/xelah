# EditableBlock

This component is what the EditableSection component uses after it segments the content into blocks. It uses the component prop to inject content editable logic.

```js
const _content = `content to be edited with multiple lines.
Line 2
Line 3

Line 5`;

const [content, setContent] = React.useState(_content);

console.log('EditableBlock.md:\n', content);

const style = {
  whiteSpace: 'pre',
  padding: '0.9em',
  border: '1px solid red',
}
;
const components = {
  block: ({ content, verbose, options, ...props }) => (<p {...props}></p>),
};

const decorators = {
  // whitespace: [/(\s)/g, '<span style="border: 1px solid lightblue; background: lightblue">$1</span>'],
  // words: [/>(\w+)</g, '<span style="border: 1px solid lightyellow; background: lightyellow">$1</span>'],
}

const props = {
  content,
  onContent: setContent,
  onInput: (ev) => console.log(ev),
  components,
  decorators,
  style,
};

<EditableBlock {...props} />;
```