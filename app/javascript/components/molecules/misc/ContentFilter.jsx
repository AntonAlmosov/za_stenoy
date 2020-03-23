import React from "react";

export default function ContentFilter({ activeFilters, handleFilter }) {
  const [opened, setOpened] = React.useState(false);
  const [active, setActive] = React.useState(activeFilters);
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
              className={active[0] === 0 ? "active" : ""}
              onClick={() => {
                handleFilter("random");
                setActive([0]);
              }}
            >
              Случайный порядок
            </span>
            <span
              className={active[0] === 1 ? "active" : ""}
              onClick={() => {
                handleFilter("ascending");
                setActive([1]);
              }}
            >
              Сначала новые
            </span>
            <span
              className={active[0] === 2 ? "active" : ""}
              onClick={() => {
                handleFilter("descending");
                setActive([2]);
              }}
            >
              Сначала старые
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
