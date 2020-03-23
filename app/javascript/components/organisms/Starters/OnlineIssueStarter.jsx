import React from "react";

export default function CompilationStarter(props) {
  return (
    <div className="starter-wrapper online-issue-starter">
      <h1 style={{ textTransform: "uppercase" }}>{props.title}</h1>
      {props.cover && <img src={props.cover} />}
    </div>
  );
}
