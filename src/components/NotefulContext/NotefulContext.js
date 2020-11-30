import React from "react";

const NotefulContext = React.createContext({
  notes: [],
  folders: [],
  createNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  createFolder: () => {},
  deleteFolder: () => {},
  updateFolder: () => {},
});

export default NotefulContext;
