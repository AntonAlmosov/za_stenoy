import React from "react";

export default function CompilationPageStarter({ title, caption, cover }) {
  return (
    <div className="starter-wrapper compilation-starter">
      <h1
        className="starters-heading-small"
        style={{ textTransform: "uppercase" }}
      >
        {title}
      </h1>
      <img src={cover} />
      {caption && <h4>{caption}</h4>}
    </div>
  );
}
