import React from "react";
import ContentFilter from "../../molecules/misc/ContentFilter.jsx";
import CompilationCard from "../../molecules/cards/CompilationCard.jsx";
import FeatureCard from "../../molecules/cards/FeatureCard.jsx";
import _, { initial } from "lodash";

export default function CompilationContent({ initialCards, feature, target }) {
  const [cards, setCards] = React.useState(
    initialCards ? initialCards.reverse() : []
  );

  const handleFilters = (action) => {
    if (action == "random") {
      const newArr = _.shuffle(initialCards);
      setCards(newArr);
    }
    if (action == "descending") {
      setCards(initialCards);
    }
    if (action == "ascending") {
      const newArr = initialCards.reverse();
      setCards(newArr);
    }
  };

  return (
    <div className="compilation-content">
      <ContentFilter activeFilters={[2]} handleFilter={handleFilters} />
      <div className="compilation-content-cards-wrapper">
        {feature && (
          <a href={feature.url} target={target ? target : ""}>
            <FeatureCard card={feature} />
          </a>
        )}
        {cards.map((card) => {
          return (
            <a href={card.url} key={card.url} target={target ? target : ""}>
              <CompilationCard card={card} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
