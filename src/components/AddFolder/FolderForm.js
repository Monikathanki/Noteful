import React, { Component } from "react";
import NotefulContext from "../NotefulContext/NotefulContext";
import config from "../../config";
import BackButton from "../../components/BackButton/BackButton";
import ValidateFolder from "../../components/ValidationError/ValidateFolder";

import PropTypes from "prop-types";

export default class FolderForm extends Component {
  static contextType = NotefulContext;

  state = {
    name: {
      value: "",
      touched: false,
    },
  };

  validateFolder = () => {
    const folderName = this.state.name.value.trim();
    if (folderName.name === 0) {
      return "Name is required";
    } else if (folderName.length < 3) {
      return "Name must be at least 3 characters long";
    }
  };

  updateFolder = (folder) => {
    this.setState({
      name: {
        value: folder,
        touched: true,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.goBack("/");
    const formInput = e.target.folder_name.value;

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ folder_name: formInput }),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((folder) => {
        this.context.createFolder(folder);
      })
      .catch((error) => this.setState({ error }));
  };

  render() {
    const nameError = this.validateFolder();
    return (
      <>
        <BackButton {...this.props} />
        <div className="FolderForm">
          <form
            onSubmit={(e) => this.handleSubmit(e)}
            className="FolderForm_field"
          >
            <h2>Create a folder</h2>
            <label htmlFor="Folder_name">Folder Name</label>
            <input
              onChange={(e) => this.updateFolder(e.target.value)}
              name="folder_name"
              id="Folder_name"
              type="text"
            />
            {this.state.name.touched && <ValidateFolder message={nameError} />}
            <div className="FolderForm_button">
              <button
                disabled={this.validateFolder()}
                className="FolderForm_submit"
                type="submit"
              >
                Add Folder
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

FolderForm.propTypes = {
  match: PropTypes.object.isRequired,
};
