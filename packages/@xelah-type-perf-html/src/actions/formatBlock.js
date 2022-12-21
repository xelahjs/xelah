const formatBlock = ({subtype}) => {
  // Get current selection or position of cursor, There is always only one range.
  const range = document.getSelection().getRangeAt(0)
  // Find the parent paragraph to change the subtype of.
  const element = range.startContainer.parentElement.closest('p.paragraph');

  if ( ! element ) {
    return
  }
  const sequenceElement = element.closest('.sequence')
  const sequenceType = sequenceElement.getAttribute('type')

  if ( sequenceType === 'introduction') {
    if ( 'p' === subtype ) {
      subtype = 'ipi'
    } else if ( 'nb' === subtype ) {
      subtype = 'ip'
    }
  }
  element.classList.remove(element.dataset.subtype);
  element.dataset.subtype = subtype;
  element.classList.add(subtype);
}

const canFormatBlock = ({subtype}) => {
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

  if ( ['q', 'q1', 'q2', 'q3'].includes(subtype) && 'main' !== sequenceType ) {
    // block quotes only supported in main.
    return false
  }

  return true
}

export {
  formatBlock,
  canFormatBlock
}