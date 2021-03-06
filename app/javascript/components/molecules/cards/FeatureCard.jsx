import React from "react";

export default function FeatureCard({ card }) {
  return (
    <div className="feature-card-wrapper">
      <div className="card-info">
        <span>{card ? card.date : ""}</span>
        <span className="property">{card ? card.caption || "" : ""}</span>
      </div>
      {card && <img src={card ? card.cover : ""} />}
      <h2>{card ? card.title : ""}</h2>
    </div>
  );
}
