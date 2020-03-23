import React from "react";

import FeatureCardWide from "../../molecules/cards/FeatureCardWide.jsx";
import IndexCard from "../../molecules/cards/IndexCard.jsx";

export default function IndexContent(props) {
  return (
    <div className="index-content">
      <FeatureCardWide />
      <div className="index-cards-wrapper">
        {props.pages.map(page => {
          if (page.page_type !== "about_us")
            return (
              <IndexCard
                name={page.title}
                uri={"/page/" + page.slug}
                key={page.slug}
                card={page.feature}
              />
            );
        })}
      </div>
    </div>
  );
}
