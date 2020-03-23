import React from "react";
import ContentFilter from "../../molecules/misc/ContentFilter.jsx";
import CompilationCard from "../../molecules/cards/CompilationCard.jsx";
import FeatureCard from "../../molecules/cards/FeatureCard.jsx";
import _ from "lodash";

export default function CompilationContent({ cards, feature, target }) {
  const [firstPortion, setFirst] = React.useState(cards.reverse().slice(0, 3));
  const [secondPortion, setSecond] = React.useState(
    cards.reverse().slice(3, cards.length - 1)
  );

  const handleFilters = action => {
    if (action == "random") {
      const newArr = _.shuffle(cards);
      setFirst(newArr.slice(0, 3));
      setSecond(newArr.slice(3, newArr.length - 1));
    }
    if (action == "descending") {
      setFirst(cards.slice(0, 3));
      setSecond(cards.slice(3, cards.length - 1));
    }
    if (action == "ascending") {
      const newArr = cards.reverse();
      setFirst(newArr.slice(0, 3));
      setSecond(newArr.slice(3, newArr.length - 1));
    }
  };

  return (
    <div className="compilation-content">
      <ContentFilter activeFilters={[1]} handleFilter={handleFilters} />
      <div className="compilation-content-cards-wrapper">
        {firstPortion.map(card => {
          return (
            <a href={card.url} key={card.url} target={target ? target : ""}>
              <CompilationCard card={card} />
            </a>
          );
        })}
        {feature && (
          <a href={feature.url} target={target ? target : ""}>
            <FeatureCard card={feature} />
          </a>
        )}
        {secondPortion.map(card => {
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
