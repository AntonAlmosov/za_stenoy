import React from "react";

export default function IndexCard({ name, uri, card }) {
  return (
    <div className="index-card">
      <a href={uri} className={"index-card-link"}>
        {name}
      </a>
      <CompilationCard card={card} />
    </div>
  );
}

function CompilationCard({ card }) {
  return (
    <a
      href={card ? card.uri : "/page/shop"}
      className="compilation-card-wrapper"
    >
      <div className="card-info">
        <span>{card ? card.date : ""}</span>
        <span className="property">{card ? card.caption || "" : ""}</span>
      </div>
      {card && card.cover && <img src={card ? card.cover : ""} />}
      <h2>{card ? card.title : ""}</h2>
    </a>
  );
}
