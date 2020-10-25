import React from "react";
import axios from "axios";
import _ from "lodash";

import {
  DeleteButton,
  ToggleButton,
} from "../../molecules/buttons/TableButtons.jsx";
import { addMiddlename } from "../../misc/addMiddlename.js";

export default function NewsTable() {
  const [authors, setAuthors] = React.useState([]);

  React.useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = () => {
    axios.get("/author/get_authors").then((res) => {
      setAuthors(res.data.authors);
    });
  };

  const destroyAuthor = (id) => {
    axios.delete("/admin/0/author/" + id).then((res) => {
      setAuthors(res.data.authors);
    });
  };

  const updateStatus = (data) => {
    axios.patch("/author/update_status", data).then((res) => {
      setAuthors(res.data.authors);
    });
  };

  const sortAuthors = (authors) => {
    const reverseName = (v) => {
      const splittedName = v.split(" ");
      return splittedName[1] + " " + splittedName[0];
    };
    return authors
      .map((v) => {
        return { ...v, name: reverseName(v.name) };
      })
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((v) => {
        return { ...v, name: reverseName(v.name) };
      });
  };

  return (
    <div className="table-wrapper" style={{ marginTop: "3em" }}>
      <AuthorHeader />
      {sortAuthors(authors).map((author) => {
        return (
          <AuthorTableRow
            key={author.id}
            id={author.id}
            title={addMiddlename(author)}
            count={author.materialsCount}
            actions={[
              {
                name: ["Cкрыть >", "Сделать публичным >"],
                uri: () =>
                  updateStatus({ id: author.id, public: !author.public }),
                state: author.public,
              },
              { name: "Удалить", uri: () => destroyAuthor(author.id) },
            ]}
          />
        );
      })}
    </div>
  );
}

function AuthorHeader() {
  return (
    <div className="table-header-wrapper">
      <h2 style={{ width: "25em" }}>Авторы</h2>
      <h2 style={{ width: "10em" }}>Кол-во материалов</h2>
      <h2 style={{ width: "22em" }}>Быстрые действия</h2>
    </div>
  );
}

function AuthorTableRow(props) {
  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "25em" }}>
        <a href={"/admin/0/author/" + props.id + "/edit"}>
          {_.truncate(props.title, 70)}
        </a>
      </div>
      <div className="column" style={{ width: "10em" }}>
        {props.count}
      </div>
      <div className="column" style={{ width: "22em" }}>
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
