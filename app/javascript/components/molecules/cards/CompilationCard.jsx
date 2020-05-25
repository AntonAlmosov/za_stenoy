import React from "react";

export default function CompilationCard({ card }) {
  return (
    <div className="compilation-card-wrapper">
      <div className="card-info">
        <span>{card ? card.date : ""}</span>
        <span className="property">{card ? card.caption || "" : ""}</span>
      </div>
      {card && card.cover && <img src={card ? card.cover : ""} />}
      <h2>{card ? card.title : ""}</h2>
    </div>
  );
}
