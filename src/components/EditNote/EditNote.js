import React, { Component } from "react";
import NotefulContext from "../NotefulContext/NotefulContext";
import BackButton from "../BackButton/BackButton";
import config from "../../config";
import ErrorPage from "../ErrorBoundary/ErrorPage";
import PropTypes from "prop-types";

export default class EditNote extends Component {
  static contextType = NotefulContext;

  state = {
    id: "",
    title: "",
    content: "",
  };

  componentDidMount() {
    const noteId = Number(this.props.match.params.noteid);

    fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
        return res.json();
      })
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          content: data.content,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  handleUpdateTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleUpdateContent = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, title, content } = this.state;
    const newNote = { id, title, content };

    fetch(config.API_ENDPOINT + `/notes/${newNote.id}`, {
      method: "PATCH",
      body: JSON.stringify(newNote),
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
        this.resetFields();
        this.context.updateNote(newNote);
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ error }));
  };

  resetFields = () => {
    this.setState({
      id: "",
      title: "",
      content: "",
    });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { title, content } = this.state;
    return (
      <>
        <ErrorPage>
          <BackButton {...this.props} />
          <div>
            <form
              className="edit-form"
              onSubmit={(e) => {
                this.handleSubmit(e);
              }}
            >
              <h2>Edit Note </h2>
              <label htmlFor="Edit_name">Edit Name</label>
              <input
                name="title"
                id="title"
                type="text"
                value={title}
                onChange={(e) => this.handleUpdateTitle(e)}
              />
              <label htmlFor="Edit_content">Edit Content</label>
              <input
                className="edit_content"
                type="text"
                name="content"
                id="content"
                value={content}
                onChange={(e) => this.handleUpdateContent(e)}
              />
              <button type="button" onClick={this.handleClickCancel}>
                Cancel
              </button>{" "}
              <button type="submit" className="Submit_edit_button">
                Save changes
              </button>
            </form>
          </div>
        </ErrorPage>
      </>
    );
  }
}

EditNote.propTypes = {
  match: PropTypes.object.isRequired,
};
