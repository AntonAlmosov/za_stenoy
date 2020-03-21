import React from "react";
import axios from "axios";

import TabSwitch from "../../molecules/misc/TabSwitch";
import {
  ToggleButton,
  DeleteButton,
} from "../../molecules/buttons/TableButtons";

export default function PersonalProjectsTable(props) {
  const [activeTab, setActiveTab] = React.useState("projects");
  const [pieces, setPieces] = React.useState([]);
  const tabs = [
    { name: "Проекты", value: "projects" },
    { name: "Материалы", value: "materials" },
  ];

  React.useEffect(() => {
    fetchPieces();
  }, []);

  function fetchPieces() {
    axios.get("/piece").then(res => {
      setPieces(res.data.pieces);
    });
  }

  function destroyPiece(id) {
    axios.delete("/piece" + id).then(res => {
      setPieces(res.data.pieces);
    });
  }
  return (
    <div
      style={{
        marginTop: "4em",
      }}
    >
      <TabSwitch onClick={setActiveTab} activeTab={activeTab} tabs={tabs} />
      {activeTab === "projects" && <ProjectsTable />}
      {activeTab === "materials" && (
        <MaterialsTable pieces={pieces} destroyPiece={id => destroyPiece(id)} />
      )}
    </div>
  );
}

function ProjectsTable() {
  const [compilations, setCompilations] = React.useState([]);

  React.useEffect(() => {
    fetchCompilations();
  }, []);

  const fetchCompilations = () => {
    axios.get("/compilation/get_compilations").then(res => {
      setCompilations(res.data.compilations);
    });
  };

  const destroyCompilation = id => {
    axios.delete("/admin/authors-projects/compilation/" + id).then(res => {
      setCompilations(res.data.compilations);
    });
  };

  const toggleHash = (id, hash, published) => {
    axios
      .post("/compilation/toggle_compilation", {
        id: id,
        hash: hash,
        value: published,
      })
      .then(res => {
        setCompilations(res.data.compilations);
      });
  };

  return (
    <div className="table-wrapper" style={{ marginTop: "3em" }}>
      <ProjectsTableHeader />
      {compilations.map(comp => {
        return (
          <ProjectsTableRow
            key={comp.id}
            title={{
              name: comp.title,
              uri: "/admin/authors-projects/compilation/" + comp.id + "/edit",
            }}
            actions={[
              {
                name: ["Убрать фичер >", "Сделать фичером >"],
                uri: () => toggleHash(comp.id, "featured", !comp.featured),
                state: comp.featured,
              },
              {
                name: ["Открыть для просмотра >", "Закрыть для просмотра >"],
                uri: () => toggleHash(comp.id, "published", !comp.published),
                state: comp.published,
              },
              { name: "Удалить", uri: () => destroyCompilation(comp.id) },
            ]}
          />
        );
      })}
    </div>
  );
}

function ProjectsTableHeader() {
  return (
    <div className="table-header-wrapper">
      <h2 style={{ width: "22em" }}>Разделы</h2>
      <h2 style={{ width: "38em" }}>Быстрые действия</h2>
    </div>
  );
}

function ProjectsTableRow(props) {
  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "22em" }}>
        <a href={props.title.uri}>{props.title.name}</a>
      </div>
      <div className="column" style={{ width: "38em" }}>
        {props.actions.map(action => {
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

function MaterialsTable(props) {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");

  return (
    <div className="table-wrapper" style={{ marginTop: "3em" }}>
      <MaterialsTableHeader
        onNameChange={setTitle}
        onAuthorChange={setAuthor}
      />
      {props.pieces
        .filter(piece => {
          return (
            RegExp(title, "i").test(piece.title) &&
            piece.authors?.some(a => RegExp(author, "i").test(a.name))
          );
        })
        .map(piece => {
          return (
            <MaterialsTableRow
              key={piece.id}
              title={piece.title}
              authors={piece.authors}
              actions={[
                {
                  name: "Редактировать материал",
                  uri: "/piece/" + piece.id + "/edit",
                },
                {
                  name: "Удалить",
                  uri: () => {
                    props.destroyPiece(piece.id);
                  },
                },
              ]}
            />
          );
        })}
    </div>
  );
}

function MaterialsTableHeader({ onNameChange, onAuthorChange }) {
  return (
    <div className="table-header-wrapper">
      <HeaderInput
        width="16em"
        onChange={text => onNameChange(text)}
        placeholder="Поиск по названию материалов"
      />
      <HeaderInput
        width="16em"
        onChange={text => onAuthorChange(text)}
        placeholder="Поиск по авторам"
      />
      <h2 style={{ width: "26em" }}>Быстрые действия</h2>
    </div>
  );
}

function MaterialsTableRow(props) {
  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "16em", lineHeight: 1.3 }}>
        {props.title}
      </div>
      <div className="column" style={{ width: "16em", lineHeight: 1.3 }}>
        {props.authors.map(author => {
          return (
            <span key={author.name + props.title}>
              {author.name}
              <br />
            </span>
          );
        })}
      </div>
      <div className="column" style={{ width: "26em" }}>
        {props.actions.map(action => {
          if (action.name !== "Удалить")
            return (
              <a
                key={action.name}
                style={{ fontSize: "1em", lineHeight: 1, marginRight: "1em" }}
                href={action.uri}
              >
                {action.name}
              </a>
            );
          else {
            return <DeleteButton key={action.name} uri={action.uri} />;
          }
        })}
      </div>
    </div>
  );
}

function HeaderInput({ width, onChange, placeholder }) {
  return (
    <div style={{ width: width }}>
      <input
        placeholder={placeholder}
        autoComplete="false"
        onChange={e => onChange(e.target.value)}
        style={{
          fontSize: "1em",
          lineHeight: 1,
          fontWeight: 500,
          outline: 0,
          border: 0,
          width: "100%",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "0.09375em",
          backgroundColor: "#000",
          marginTop: "0.5em",
        }}
      ></div>
    </div>
  );
}
