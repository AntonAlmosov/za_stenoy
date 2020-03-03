import React from "react";
import img from "images/exImage.png";

export default function FeatureCardWide() {
  return (
    <div className="feature-card-wrapper">
      <div className="card-info">
        <span>22.01.19</span>
        <span className="property">онлайн выпуск</span>
      </div>
      <img src={img} />
      <h2>Название выпуска</h2>
    </div>
  );
}
