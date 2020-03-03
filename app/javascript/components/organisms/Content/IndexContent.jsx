import React from "react";
import img from "images/exImage.png";

export default function IndexContent() {
  return (
    <div className="index-content">
      <FeatureCardWide />
      <div className="index-cards-wrapper">
        <IndexCard />
        <IndexCard />
        <IndexCard />
        <IndexCard />
      </div>
    </div>
  );
}

function IndexCard() {
  return (
    <div className="index-card">
      <a href="/">«Магазин»</a>
      <CompilationCard />
    </div>
  );
}

function FeatureCardWide() {
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

function CompilationCard() {
  return (
    <div className="compilation-card-wrapper">
      <div className="card-info">
        <span>22.01.19</span>
        <span className="property">онлайн выпуск</span>
      </div>
      <img src={img} />
      <h2>Название выпуска</h2>
    </div>
  );
}
