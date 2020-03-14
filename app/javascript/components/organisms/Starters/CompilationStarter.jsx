import React from "react";

export default function CompilationStarter(props) {
  return (
    <div className="starter-wrapper compilation-starter">
      <h1
        className="starters-heading-big"
        style={{ textTransform: "uppercase" }}
      >
        {props.title}
      </h1>
    </div>
  );
}
