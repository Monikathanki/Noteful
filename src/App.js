import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";

import Folders from "./components/Folders/Folders";
import Notes from "./components/Notes/Notes";
import Note from "./components/Note/Note";
import NotefulContext from "./components/NotefulContext/NotefulContext";
import FolderForm from "./components/AddFolder/FolderForm";
import NoteForm from "./components/AddNote/NoteForm";
import EditNote from "./components/EditNote/EditNote";
import EditFolder from "./components/EditFolders/EditFolder";

import ErrorPage from "./components/ErrorBoundary/ErrorPage";
import config from "./config";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  createNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  deleteNote = (noteid) => {
    const newNotes = this.state.notes.filter((nid) => nid.id !== noteid);
    this.setState({
      notes: newNotes,
    });
  };

  updateNote = (updatedNote) => {
    this.setState({
      notes: this.state.notes.map((n) =>
        n.id !== updatedNote.id ? n : updatedNote
      ),
    });
  };

  createFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };

  deleteFolder = (folderid) => {
    const newFolders = this.state.folders.filter((fid) => fid.id !== folderid);
    this.setState({
      folders: newFolders,
    });
  };

  updateFolder = (updatedFolder) => {
    this.setState({
      folders: this.state.folders.map((f) =>
        f.id !== updatedFolder.id ? f : updatedFolder
      ),
    });
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/folders`)
      .then((res) => res.json())
      .then((folders) => this.setState({ folders }));
    fetch(`${config.API_ENDPOINT}/notes`)
      .then((res) => res.json())
      .then((notes) => this.setState({ notes }));
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      createNote: this.createNote,
      updateNote: this.updateNote,
      deleteNote: this.deleteNote,
      createFolder: this.createFolder,
      deleteFolder: this.deleteFolder,
      updateFolder: this.updateFolder,
    };

    return (
      <div className="App">
        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <NotefulContext.Provider value={contextValue}>
          <ErrorPage>
            <main>
              <aside>
                <Route
                  exact
                  path={["/", "/folder/:folderid", "/note/:noteid"]}
                  component={Folders}
                />
              </aside>
              <section>
                <Route
                  exact
                  path={["/", "/folder/:folderid"]}
                  component={Notes}
                />
                <Route exact path="/note/:noteid" component={Note} />
                <Route exact path="/add-folder" component={FolderForm} />
                <Route exact path="/add-note" component={NoteForm} />
                <Route exact path="/edit-note/:noteid" component={EditNote} />
                <Route
                  exact
                  path="/edit-folder/:folderid"
                  component={EditFolder}
                />
              </section>
            </main>
          </ErrorPage>
        </NotefulContext.Provider>
      </div>
    );
  }
}

export default App;
