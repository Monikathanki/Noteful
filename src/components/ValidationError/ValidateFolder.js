import React from "react";

export default function ValidateFolder(props) {
  if (props.message) {
    return <div className="error">{props.message}</div>;
  }
  return <></>;
}
