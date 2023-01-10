const formatBlock = ({subtype, sequence}) => {
  // Get current selection or position of cursor, There is always only one range.
  const range = document.getSelection().getRangeAt(0)
  // Find the parent paragraph to change the subtype of.
  const element = range.startContainer.parentElement.closest('p.paragraph');

  if ( ! element ) {
    return
  }
  const sequenceElement = element.closest('.sequence')
  const sequenceType = sequenceElement.getAttribute('type')

  if ( sequenceType !== sequence) {
    return
  }
  element.classList.remove(element.dataset.subtype);
  element.dataset.subtype = subtype;
  element.classList.add(subtype);
}

const canFormatBlock = ({sequence}) => {
  const range = document.getSelection().getRangeAt(0)
  const element = range.startContainer.parentElement.closest('p.paragraph');
  if ( ! element ) {
    return false
  }

  const sequenceElement = element.closest('.sequence')

  if ( ! sequenceElement ) {
    return false
  }

  const sequenceType = sequenceElement.getAttribute('type')

  return sequence === sequenceType;
}

export {
  formatBlock,
  canFormatBlock
}