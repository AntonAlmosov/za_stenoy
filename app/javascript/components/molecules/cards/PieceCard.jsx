import React from "react";
import ReactHtmlParser from "react-html-parser";

export default function PieceCard({ card }) {
  const [text] = React.useState(JSON.parse(card.text).blocks.slice(0, 10));

  return (
    <div className="compilation-card-wrapper">
      <div className="card-info">
        <span>{card ? card.date : ""}</span>
        <span className="property">{card ? card.caption || "" : ""}</span>
      </div>
      {card.cover && <img src={card ? card.cover : ""} />}
      {!card.cover && (
        <div className="text-preview">
          <pre>
            {text.map((line, i) => {
              return <p key={i}>{ReactHtmlParser(line.data.text)}</p>;
            })}
          </pre>
        </div>
      )}
      <h2>{card ? card.title : ""}</h2>
    </div>
  );
}
