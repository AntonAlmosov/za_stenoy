import React from "react";
import ReactHtmlParser from "react-html-parser";

export default function PieceContent({ piece, cover, authors }) {
  const text = JSON.parse(piece.text).blocks;
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
        {text.map((line, i) => {
          if (line.type === "paragraph")
            return <p key={i}>{ReactHtmlParser(line.data.text)}</p>;
          if (line.type === "delimiter") return <hr key={i} />;
        })}
      </div>
      <span>{piece.publish_date}</span>
    </div>
  );
}
