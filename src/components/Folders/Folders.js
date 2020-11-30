import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext/NotefulContext";
import PropTypes from "prop-types";

import config from "../../config";

class Folders extends Component {
  static contextType = NotefulContext;

  handleDelete = (folderid, cb) => {
    fetch(config.API_ENDPOINT + `/folders/${folderid}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res;
      })
      .then(() => {
        cb(folderid);
      });
  };

  render() {
    const { folders } = this.context;

    return (
      <div className="Folders">
        <ul>
          {folders.map((folder) => (
            <li key={folder.id}>
              <Link
                to={`/folder/${folder.id}`}
                className={
                  folder.id === Number(this.props.match.params.folderid)
                    ? "active"
                    : ""
                }
              >
                {folder.folder_name}
              </Link>
              <Link to={`/edit-folder/${folder.id}`}>Edit</Link>
              <button
                onClick={() =>
                  this.handleDelete(folder.id, this.context.deleteFolder)
                }
                className="Notes_delete"
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <Link to="/add-folder">
          <div className="AddFolder">
            <button className="AddFolder_button">+ Folder</button>
          </div>
        </Link>
      </div>
    );
  }
}
Folders.propTypes = {
  match: PropTypes.object.isRequired,
};
export default Folders;
