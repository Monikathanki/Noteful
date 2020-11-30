import React, { Component } from "react";

export default class ErrorPage extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="ErrorPage">
          <h1>Something went wrong</h1>
          <p>Refresh the page</p>{" "}
        </div>
      );
    }
    return this.props.children;
  }
}
