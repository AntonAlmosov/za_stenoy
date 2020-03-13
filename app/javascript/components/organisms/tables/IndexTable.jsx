import React from "react";

export default function IndexTable() {
  return (
    <div className="table-wrapper">
      <TableHeader />
      <TableRow
        title={{ name: "Авторские проекты", uri: "/" }}
        actions={[
          { name: "Новый проект >", uri: "/" },
          { name: "Новый материал >", uri: "/" },
        ]}
      />
      <TableRow
        title={{ name: "Журнал «За стеной»", uri: "/" }}
        actions={[
          { name: "Новый бумажный выпуск >", uri: "/" },
          { name: "Новый онлайн выпуск >", uri: "/" },
        ]}
      />
      <TableRow
        title={{ name: "Журнал «Флаги»", uri: "/" }}
        actions={[
          { name: "Новый бумажный выпуск >", uri: "/" },
          { name: "Новый онлайн выпуск >", uri: "/" },
        ]}
      />
      <TableRow
        title={{ name: "Магазин", uri: "/" }}
        actions={[{ name: "Новый товар >", uri: "/" }]}
      />
      <TableRow title={{ name: "О нас", uri: "/" }} actions={[]} />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="table-header-wrapper">
      <h2 style={{ width: "22em" }}>Разделы</h2>
      <h2 style={{ width: "28em" }}>Быстрые действия</h2>
    </div>
  );
}

function TableRow(props) {
  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "22em" }}>
        <a href={props.title.uri}>{props.title.name}</a>
      </div>
      <div className="column" style={{ width: "28em" }}>
        {props.actions.map(action => {
          return (
            <a href={action.uri} key={action.name}>
              {action.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
