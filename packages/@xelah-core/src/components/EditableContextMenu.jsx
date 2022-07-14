/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_PROPS = {
  components: {
    contextMenu: ({ children, handleClose, menuPosition }) => {
      const style = { border: '1px solid gray', borderRadius: '0.2em', padding: '0.25em', background: 'white', position: 'fixed', ...menuPosition };
      return (
        <div className='contextMenu' style={style} onClose={handleClose}>
          {children}
        </div>
      );
    },
    contextMenuItem: ({ action, index, disabled, selection, element, type, subtype }) => {
      const style = { padding: '0.25em', color: (disabled ? 'grey' : 'inherit') };
      return (
        <div className='menuItem' style={style} data-test-id={`contextMenuItem-${index}`} onClick={action.callback}>
          {action.label}
        </div>
      );
    },
  },
  actions: [
    { label: 'Paragraph', type: 'block', subtype: 'p' },
    { label: 'Block Quote', type: 'block', subtype: 'q' },
    { label: 'Block Quote 2', type: 'block', subtype: 'q2' },
    { label: 'Block Quote 3', type: 'block', subtype: 'q3' },
    { label: 'Descriptive Subtitle', type: 'block', subtype: 'd' },
    { label: 'Major Title', type: 'block', subtype: 'mt' },
    { label: 'Major Title 2', type: 'block', subtype: 'mt2' },
    { label: 'Major Title 3', type: 'block', subtype: 'mt3' },
    { label: 'Chapter', type: 'chapter' },
    { label: 'Verse', type: 'verses' },
  ],
};

export default function EditableContextMenu({
  components: _components,
  save,
  children,
}) {
  const defaultState = useMemo(() => ({
    menuPosition: undefined,
    selection: undefined,
    element: undefined,
    type: undefined,
    subtype: undefined,
  }), []);
  const [state, setState] = useState(defaultState);
  const open = !!state.menuPosition;

  const actions = [...DEFAULT_PROPS.actions];
  const components = { ...DEFAULT_PROPS.components, _components };
  const { contextMenu: ContextMenu, contextMenuItem: ContextMenuItem } = components;

  const handleContextMenu = (event) => {
    const element = event.target;
    const type = element.dataset.type;
    const subtype = element.dataset.subtype;

    if (type === 'block') event.preventDefault();

    const { clientX: x, clientY: y, } = event;

    const menuPosition = !state.menuPosition ? { top: y, left: x } : undefined;
    const selection = document.getSelection();

    setState({
      menuPosition,
      selection,
      element,
      type,
      subtype,
    });
  };

  const handleClose = useCallback((event) => {
    event.preventDefault();
    setState(defaultState);
  }, [defaultState]);

  useEffect(() => {
    if (open) document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [open, handleClose]);

  const availableActions = actions.filter((action) => action.type === state.type);
  let contextMenuItems = [];

  if (open) {
    contextMenuItems = availableActions
      .map((action, index) => {
        const disabled = action.subtype === state.subtype;
        const { element, selection, type, subtype } = state;

        if (!action.callback && type && subtype) {
          action.callback = () => {
            element.classList.remove(element.dataset.subtype);
            element.dataset.subtype = action.subtype;
            element.classList.add(action.subtype);
            const _element = element.closest('div[contenteditable]');
            save(_element);
          };
        }

        if (disabled) action.callback = () => { };

        return (
          <ContextMenuItem
            key={`${action.type}:${action.subtype}`}
            index={index}
            disabled={disabled}
            action={action}
            {...state}
          />
        )
      });
  };

  const contextMenuProps = {
    open,
    menuPosition: state.menuPosition,
    handleClose,
  };

  let contextMenu = <></>;

  if (open && availableActions.length > 0) {
    contextMenu = (
      <ContextMenu {...contextMenuProps}>
        {contextMenuItems}
      </ContextMenu>
    );
  };

  return (
    <div className='contextMenuWrapper' onContextMenu={handleContextMenu} style={{}}>
      {children}
      {contextMenu}
    </div>
  );
};

EditableContextMenu.propTypes = {
  /** Components to wrap all sections of the document */
  components: PropTypes.shape({
    /** Component to render the contextMenu */
    contextMenu: PropTypes.func,
    /** Component to render the contextMenuItems */
    contextMenuItem: PropTypes.func,
  }),
  save: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

EditableContextMenu.defaultProps = DEFAULT_PROPS;
