import React from 'react';
import PropTypes from 'prop-types';

import useEditorStateReducer from '../hooks/useEditorStateReducer';

export const EditorStateReducerContext = React.createContext();

export function EditorStateReducerContextProvider({ children, ...props }) {
  const {
    state,
    actions,
  } = useEditorStateReducer({ ...props });

  const value = {
    state,
    actions,
  };

  return (
    <EditorStateReducerContext.Provider value={value}>
      {children}
    </EditorStateReducerContext.Provider>
  );
};

EditorStateReducerContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};