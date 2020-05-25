import React from "react";
import ContentFilter from "../../molecules/misc/ContentFilter.jsx";

import _ from "lodash";

export default function NewsCardsContent({ cards, feature, target, mobile }) {
  const [rerender, triggerRerender] = React.useState(false);
  const [sortedNews, setSortedNews] = React.useState(_.reverse(cards));

  const handleFilters = (action) => {
    if (action == "random") {
      setSortedNews(_.shuffle(cards));
    }
    if (action == "descending") {
      setSortedNews(cards);
      triggerRerender(!rerender);
    }
    if (action == "ascending") {
      setSortedNews(_.reverse(cards));
      triggerRerender(!rerender);
    }
  };

  return (
    <div className="compilation-content">
      {feature && !mobile && (
        <a href={feature.url} target={target ? target : ""}>
          <NewsFeaturedCard card={feature} />
        </a>
      )}
      <ContentFilter activeFilters={[1]} handleFilter={handleFilters} />
      <div className="compilation-content-cards-wrapper news-wrapper">
        {sortedNews.map((card, i) => {
          const isFourth = (i + 1) % 4 === 0;
          return (
            <a
              href={card.url}
              key={card.url}
              target={target ? target : ""}
              style={{ display: "flex" }}
            >
              <NewsCompilationCard card={card} mobile={mobile} />
              {!mobile && !isFourth && <div style={{ width: "2em" }}></div>}
            </a>
          );
        })}
      </div>
      {feature && mobile && (
        <a href={feature.url} target={target ? target : ""}>
          <NewsFeaturedCard card={feature} />
        </a>
      )}
    </div>
  );
}

function NewsCompilationCard({ card, mobile }) {
  return (
    <div className={mobile ? "compilation-card-wrapper" : "news-card"}>
      <div className="card-info">
        <span>{card ? card.date : ""}</span>
        <span className="property">{card ? card.caption || "" : ""}</span>
      </div>
      {card && card.cover && <img src={card ? card.cover : ""} />}
      <h2>{card ? _.truncate(card.title, { length: 60 }) : ""}</h2>
    </div>
  );
}

function NewsFeaturedCard({ card }) {
  return (
    <div className="news-feature-card-wide-wrapper">
      <div className="card-info">
        <span>{card ? card.date : ""}</span>
        <span className="property">{card ? card.caption || "" : ""}</span>
      </div>
      {card && <img src={card ? card.cover : ""} />}
      <h2>{card ? card.title : ""}</h2>
    </div>
  );
}
