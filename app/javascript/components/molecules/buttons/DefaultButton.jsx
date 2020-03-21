import React from "react";

export default function DefaultButton({ onClick, state, text, style }) {
  return (
    <div
      className={"default-button" + (state ? " inversed" : "")}
      onClick={onClick}
      style={style}
    >
      {state ? text[0] : text[1]}
    </div>
  );
}
