import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext/NotefulContext";
import config from "../../config";

import PropTypes from "prop-types";

export default class Notes extends Component {
  static contextType = NotefulContext;

  handleDelete = (noteid, cb) => {
    fetch(`${config.API_ENDPOINT}/notes/${noteid}`, {
      method: "DELETE",
      "content-type": "application/json",
    })
      .then((res) => {
        return res;
      })
      .then(() => {
        cb(noteid);
      });
  };

  render() {
    const { notes } = this.context;

    const noteList = this.props.match.params.folderid
      ? notes.filter(
          (n) => n.folder_id === Number(this.props.match.params.folderid)
        )
      : notes;
    return (
      <div className="Notes">
        <div className="Note_button_position">
          <Link to="/add-note">
            <button className="AddNote_button">+ Note</button>
          </Link>
        </div>
        <ul>
          {noteList.map((note) => (
            <li key={note.id}>
              <Link to={`/note/${note.id}`}>{note.title}</Link>
              <button
                onClick={() =>
                  this.handleDelete(note.id, this.context.deleteNote)
                }
                className="Notes_delete"
              >
                X
              </button>
              <button>
                <Link to={`/edit-note/${note.id}`}>Edit</Link>
              </button>
            </li>
          ))}
        </ul>
        <div className="Note_button_position">
          <Link to="/add-note">
            <button className="AddNote_button">+ Note</button>
          </Link>
        </div>
      </div>
    );
  }
}

Notes.propTypes = {
  match: PropTypes.object.isRequired,
};
