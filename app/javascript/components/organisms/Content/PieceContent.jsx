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
          {authors.map(author => {
            return (
              <a href={author.url} key={author.url}>
                {author.name}
              </a>
            );
          })}
        </div>
      </div>
      <div className="piece">
        {text.map((line, i) => {
          return <p key={i}>{ReactHtmlParser(line.data.text)}</p>;
        })}
      </div>
      <span>{piece.publish_date}</span>
    </div>
  );
}
