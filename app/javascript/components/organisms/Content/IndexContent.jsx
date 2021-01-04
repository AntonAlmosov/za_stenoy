import React from "react";

import FeatureCardWide from "../../molecules/cards/FeatureCardWide.jsx";
import IndexCard from "../../molecules/cards/IndexCard.jsx";

export default function IndexContent({ pages, feature }) {
  return (
    <div className="index-content">
      {feature && (
        <a href={feature.url}>
          <FeatureCardWide card={feature} />
        </a>
      )}
      <div className="index-cards-wrapper">
        <IndexCard
          name={pages[5].title}
          uri={"/page/" + pages[5].slug}
          key={pages[5].slug}
          card={pages[5].feature}
          hidden={pages[5].hidden}
        />
        <IndexCard
          name={pages[2].title}
          uri={"/page/" + pages[2].slug}
          key={pages[2].slug}
          card={pages[2].feature}
          hidden={pages[2].hidden}
        />
        <IndexCard
          name={pages[1].title}
          uri={"/page/" + pages[1].slug}
          key={pages[1].slug}
          card={pages[1].feature}
          hidden={pages[1].hidden}
        />
        <IndexCard
          name={pages[0].title}
          uri={"/page/" + pages[0].slug}
          key={pages[0].slug}
          card={pages[0].feature}
          hidden={pages[0].hidden}
        />
        <IndexCard
          name={pages[3].title}
          uri={"/page/" + pages[3].slug}
          key={pages[3].slug}
          card={pages[3].feature}
          hidden={pages[3].hidden}
        />
      </div>
    </div>
  );
}
