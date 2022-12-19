export default function formatBlock({subtype}) {
  // Get current selection or position of cursor, There is always only one range.
  const range = document.getSelection().getRangeAt(0)
  // Find the parent paragraph to change the subtype of.
  const element = range.startContainer.parentElement.closest('p.paragraph');

  if ( element ) {
    element.classList.remove(element.dataset.subtype);
    element.dataset.subtype = subtype;
    element.classList.add(subtype);
  }
}