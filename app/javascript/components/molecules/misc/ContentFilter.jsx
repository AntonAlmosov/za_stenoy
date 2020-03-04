import React from "react";

export default function ContentFilter({ activeFilters, handleFilter }) {
  const [opened, setOpened] = React.useState(false);
  return (
    <div className="content-filter-wrapper">
      <div
        className="content-filter-toggler"
        onClick={() => setOpened(!opened)}
      >
        <span className="underline">{"фильтры"}</span>
        <span>{opened ? " -" : " +"}</span>
      </div>
      {opened && (
        <div className="content-filter-tags">
          <div className="content-filter-row">
            <span
              className={activeFilters[0] === 0 ? "active" : ""}
              onClick={() => handleFilter(1)}
            >
              Все
            </span>
            <span
              className={activeFilters[0] === 1 ? "active" : ""}
              onClick={() => handleFilter(2)}
            >
              В продаже
            </span>
            <span
              className={activeFilters[0] === 2 ? "active" : ""}
              onClick={() => handleFilter(3)}
            >
              Вышедшие из продажи
            </span>
          </div>
          <div className="content-filter-row">
            <span
              className={activeFilters[1] === 0 ? "active" : ""}
              onClick={() => handleFilter(4)}
            >
              Случайный порядок
            </span>
            <span
              className={activeFilters[1] === 1 ? "active" : ""}
              onClick={() => handleFilter(5)}
            >
              Сначала новые
            </span>
            <span
              className={activeFilters[1] === 2 ? "active" : ""}
              onClick={() => handleFilter(6)}
            >
              Сначала старые
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
