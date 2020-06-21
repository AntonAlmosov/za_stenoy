import React from "react";

export default function IndexTable(props) {
  return (
    <div className="table-wrapper" style={{ marginBottom: "6em" }}>
      <TableHeader />
      <TableRow
        title={{ name: "Фичер главной", uri: "/feature/" }}
        actions={[]}
      />
      {props.pages &&
        props.pages.map((page) => {
          let title = "";
          let actions = [];
          let uri = "";
          //Авторский проект
          if (page.page_type === "personal_projects") {
            title = page.title;
            uri = "/admin/" + page.slug;
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
            uri = "/admin/" + page.slug;
            actions = [
              {
                name: "Редактировать описание >",
                uri: "/admin/" + page.slug + "/edit",
              },
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
            uri = "/admin/" + page.slug;
            actions = [
              {
                name: "Новый товар >",
                uri: "/admin/" + page.slug + "/product/new",
              },
            ];
          }
          if (page.page_type === "about_us") {
            title = page.title;
            uri = "/admin/" + page.slug + "/edit";
            actions = [
              {
                name: "Редактировать описание >",
                uri: "/admin/" + page.slug + "/edit",
              },
            ];
          }
          if (page.page_type === "news") {
            title = page.title;
            uri = "/admin/" + page.slug;
            actions = [
              {
                name: "Новая новость >",
                uri: "/admin/" + page.slug + "/news/new",
              },
            ];
          }
          return (
            <TableRow
              key={page.slug}
              title={{ name: title, uri: uri }}
              actions={actions}
            />
          );
        })}
      <TableRow
        title={{ name: "Авторы", uri: "/admin/0/author" }}
        actions={[]}
      />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="table-header-wrapper">
      <h2 style={{ width: "22em" }}>Разделы</h2>
      <h2 style={{ width: "48em" }}>Быстрые действия</h2>
    </div>
  );
}

function TableRow(props) {
  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "22em" }}>
        <a href={props.title.uri}>{props.title.name}</a>
      </div>
      <div className="column" style={{ width: "48em" }}>
        {props.actions.map((action) => {
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
