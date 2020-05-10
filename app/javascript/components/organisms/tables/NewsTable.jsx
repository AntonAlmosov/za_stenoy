import React from "react";
import axios from "axios";

import {
  DeleteButton,
  ToggleButton,
} from "../../molecules/buttons/TableButtons.jsx";

export default function NewsTable() {
  const [newsCollection, setNews] = React.useState([]);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("/news/get_news").then((res) => {
      setNews(res.data.news);
    });
  };

  const destroyProducts = (id) => {
    axios.delete("/admin/news/news/" + id).then((res) => {
      setNews(res.data.news);
    });
  };

  const toggleHash = (id, hash, published) => {
    axios
      .post("/news/toggle_news", {
        id: id,
        hash: hash,
        value: published,
      })
      .then((res) => {
        setNews(res.data.news);
      });
  };

  return (
    <div className="table-wrapper" style={{ marginTop: "3em" }}>
      <NewsTableHeader />
      {newsCollection.map((news) => {
        return (
          <NewsTableRow
            key={news.id}
            title={news.title}
            actions={[
              {
                name: ["Убрать фичер >", "Сделать фичером >"],
                uri: () => toggleHash(news.id, "featured", !news.featured),
                state: news.featured,
              },
              {
                name: ["Закрыть для просмотра >", "Открыть для просмотра >"],
                uri: () => toggleHash(news.id, "published", !news.published),
                state: news.published,
              },
              { name: "Удалить", uri: () => destroyProducts(news.id) },
            ]}
          />
        );
      })}
    </div>
  );
}

function NewsTableHeader() {
  return (
    <div className="table-header-wrapper">
      <h2 style={{ width: "22em" }}>Новости</h2>
      <h2 style={{ width: "38em" }}>Быстрые действия</h2>
    </div>
  );
}

function NewsTableRow(props) {
  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "22em" }}>
        <span>{props.title}</span>
      </div>
      <div className="column" style={{ width: "38em" }}>
        {props.actions.map((action) => {
          if (action.name !== "Удалить")
            return (
              <ToggleButton
                key={action.name[0]}
                onClick={action.uri}
                defaultState={action.state}
                activeText={action.name[0]}
                disabledText={action.name[1]}
              />
            );
          else {
            return <DeleteButton key={action.name} uri={action.uri} />;
          }
        })}
      </div>
    </div>
  );
}
