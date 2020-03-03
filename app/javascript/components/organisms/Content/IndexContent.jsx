import React from "react";

import FeatureCardWide from "../../molecules/cards/FeatureCardWide";
import IndexCard from "../../molecules/cards/IndexCard";

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
