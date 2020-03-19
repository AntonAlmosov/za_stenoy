import React from "react";

export default function DefaultButton({ onClick, inversed, text }) {
  return (
    <div
      className={"deafult-button" + (inversed && " inversed")}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
