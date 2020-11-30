import React, { Component } from "react";
import NotefulContext from "../NotefulContext/NotefulContext";
import config from "../../config";
import BackButton from "../BackButton/BackButton";
import ValidationError from "../../components/ValidationError/ValidationError";
import ErrorPage from "../ErrorBoundary/ErrorPage";
import PropTypes from "prop-types";

export default class NoteForm extends Component {
  static contextType = NotefulContext;

  state = {
    name: {
      value: "",
      touched: false,
    },
  };

  validateName = () => {
    const noteName = this.state.name.value.trim();
    if (noteName.name === 0) {
      return "Name is required";
    } else if (noteName.length < 3) {
      return "Name must be at least 3 characters long";
    }
  };

  updateName = (name) => {
    this.setState({
      name: {
        value: name,
        touched: true,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.goBack("/");

    const title = e.target.title.value;
    const content = e.target.content.value;
    const folder_id = e.target.folder_id.value;
    const date_created = Date(document.data).toString();

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        title: title,
        folder_id: folder_id,
        modified: date_created,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((note) => {
        this.context.createNote(note);
      })
      .catch((error) => this.setState({ error }));
  };

  render() {
    const nameError = this.validateName();
    return (
      <>
        <ErrorPage>
          <BackButton {...this.props} />
          <div>
            <form onSubmit={(e) => this.handleSubmit(e)} className="Note_form">
              <h2>Create a note</h2>
              <label htmlFor="Note_name">Name</label>
              <input
                name="title"
                type="text"
                onChange={(e) => this.updateName(e.target.value)}
              />
              {this.state.name.touched && (
                <ValidationError message={nameError} />
              )}
              <label htmlFor="Note_content">Content</label>
              <input className="content" type="text" name="content" />
              <label htmlFor="Folder_name">Folder</label>
              <select name="folder_id" id="Note_dropdown_select">
                {this.context.folders.map((f, i) => (
                  <option key={i} value={f.id}>
                    {f.folder_name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="Submit_note_button"
                disabled={this.validateName()}
              >
                Add note
              </button>
            </form>
          </div>
        </ErrorPage>
      </>
    );
  }
}

NoteForm.propTypes = {
  match: PropTypes.object.isRequired,
};
