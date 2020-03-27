import React from "react";

export default function FeatureCardWide({ card }) {
  return (
    <div className="feature-card-wide-wrapper">
      <div className="card-info">
        <span>{card.publish_date}</span>
        <span className="property">{card.caption ? card.caption : ""}</span>
      </div>
      {card.cover && <img src={card.cover} />}
      <h2>{card.title}</h2>
    </div>
  );
}
