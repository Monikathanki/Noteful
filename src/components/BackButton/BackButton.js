import React from "react";
import PropTypes from "prop-types";

export default function BackButton(props) {
  return (
    <>
      <button onClick={(e) => props.history.goBack()} className="BackButton">
        Back
      </button>
    </>
  );
}

BackButton.propTypes = {
  match: PropTypes.object.isRequired,
};
