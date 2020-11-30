import React from "react";
import { Link } from "react-router-dom";
import Context from "../NotefulContext/NotefulContext";
import BackButton from "../BackButton/BackButton";
import config from "../../config";

import PropTypes from "prop-types";

export default class Note extends React.Component {
  static contextType = Context;

  handleDelete = (noteid, callback) => {
    console.log(noteid);
    this.props.history.push("/");
    fetch(`${config.API_ENDPOINT}/notes/${noteid}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res;
      })
      .then(() => {
        callback(noteid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { notes } = this.context;

    const noteList = this.props.match.params.noteid
      ? notes.filter((n) => n.id === Number(this.props.match.params.noteid))
      : notes;

    const renderNote = noteList.map((n, i) => {
      return (
        <React.Fragment key={i}>
          <div className="Note_name">
            <h2>{n.title}</h2>
            <button>
              <Link to={`/edit-note/${n.id}`}> Edit </Link>
            </button>
            <button
              onClick={(e) =>
                this.handleDelete(
                  Number(this.props.match.params.noteid),
                  this.context.deleteNote
                )
              }
              className="Note_delete"
            >
              X
            </button>
          </div>
          <p className="Modified_date">
            Modified on {new Date(n.date_published).toLocaleDateString()}
          </p>
          <p className="Note_content">{n.content}</p>
        </React.Fragment>
      );
    });
    return (
      <>
        <div className="BackButton_section">
          <BackButton {...this.props} />
        </div>
        <div className="Note">{renderNote}</div>
      </>
    );
  }
}

Note.propTypes = {
  match: PropTypes.object.isRequired,
};
