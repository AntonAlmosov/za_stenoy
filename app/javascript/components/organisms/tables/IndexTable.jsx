import React from "react";

export default function IndexTable(props) {
  return (
    <div className="table-wrapper">
      <TableHeader />
      {props.pages &&
        props.pages.map(page => {
          let title = "";
          let actions = [];
          //Авторский проект
          if (page.page_type === "personal_projects") {
            title = page.title;
            actions = [
              {
                name: "Новый проект >",
                uri: "/admin/" + page.slug + "/compilation/new",
              },
              {
                name: "Новый материал >",
                uri: "/piece/new",
              },
            ];
          }
          //Журналы
          if (
            page.page_type === "magasine" ||
            page.page_type === "magasine_inversed"
          ) {
            title = "Журнал " + page.title;
            actions = [
              {
                name: "Новый бумажный выпуск >",
                uri: "/admin/" + page.slug + "/offline_issue/new",
              },
              {
                name: "Новый онлайн выпуск >",
                uri: "/admin/" + page.slug + "/online_issue/new",
              },
            ];
          }
          //Магазин
          if (page.page_type === "shop") {
            title = page.title;
            actions = [
              {
                name: "Новый товар >",
                uri: "/admin/" + page.slug + "/product/new",
              },
            ];
          }
          if (page.page_type === "about_us") {
            title = page.title;
          }
          return (
            <TableRow
              key={page.slug}
              title={{ name: title, uri: "/admin/" + page.slug }}
              actions={actions}
            />
          );
        })}
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
