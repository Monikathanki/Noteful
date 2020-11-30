import React from "react";
import BackButton from "../BackButton/BackButton";
import config from "../../config";
import ErrorPage from "../ErrorBoundary/ErrorPage";
import PropTypes from "prop-types";
import Context from "../NotefulContext/NotefulContext";

export default class EditFolder extends React.Component {
  state = {
    folder: "",
  };

  static contextType = Context;

  componentDidMount() {
    const folderId = Number(this.props.match.params.folderid);

    fetch(config.API_ENDPOINT + `/folders/${folderId}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
        return res.json();
      })
      .then((data) => {
        this.setState({
          folder: data.folder_name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const folderId = Number(this.props.match.params.folderid);
    const folder_name = this.state.folder;
    const newFolder = { folder_name };

    fetch(config.API_ENDPOINT + `/folders/${folderId}`, {
      method: "PATCH",
      body: JSON.stringify(newFolder),
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
        this.resetField();
        this.context.updateFolder({ ...newFolder, id: folderId });
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ error }));
  };

  resetField = () => {
    this.setState({
      folder: "",
    });
  };

  handleFolderNameChange = (e) => {
    this.setState({
      folder: e.target.value,
    });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const folder_name = this.state.folder;
    return (
      <>
        <ErrorPage>
          <BackButton {...this.props} />
          <div>
            <form onSubmit={this.handleSubmit}>
              <h2>Edit Folder</h2>
              <label>Edit Name</label>
              <input
                name="folder_name"
                id="folder_name"
                type="text"
                value={folder_name}
                onChange={(e) => this.handleFolderNameChange(e)}
              />
              <button type="button" onClick={this.handleClickCancel}>
                Cancel
              </button>{" "}
              <button>Save changes</button>
            </form>
          </div>
        </ErrorPage>
      </>
    );
  }
}

EditFolder.propTypes = {
  match: PropTypes.object.isRequired,
};
