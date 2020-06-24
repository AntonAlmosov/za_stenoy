import React from "react";
import EditorData from "./EditorData";

export default function PieceContent({ piece, cover, authors }) {
  const text = JSON.parse(piece.text).blocks;
  const note = JSON.parse(piece.note).blocks;
  return (
    <div className="piece-content">
      {cover && <img src={cover} />}
      <div className="piece-header">
        <h1>{piece.title}</h1>
        <div className="piece-authors">
          {authors.map((author) => {
            return (
              <span key={author.url}>
                <a href={author.url}>{author.name}</a>
                <br />
              </span>
            );
          })}
        </div>
      </div>
      <div className="piece">
        <EditorData text={text} />
      </div>
      <div className="piece-notes">
        <div id="note"></div>
        <EditorData text={note} />
      </div>
      <span>{piece.publish_date}</span>
    </div>
  );
}
