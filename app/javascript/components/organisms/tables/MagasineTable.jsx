import React from "react";
import axios from "axios";

import TabSwitch from "../../molecules/misc/TabSwitch.jsx";
import {
  ToggleButton,
  DeleteButton,
} from "../../molecules/buttons/TableButtons.jsx";

export default function MagasineTable(props) {
  const [activeTab, setActiveTab] = React.useState("online-issues");
  const [pieces, setPieces] = React.useState([]);
  const [onlineIssues, setOnlineIssues] = React.useState([]);
  const [offlineIssues, setOfflineIssues] = React.useState([]);
  const tabs = [
    { name: "Офллайн выпуски", value: "offline-issues" },
    { name: "Онлайн выпуски", value: "online-issues" },
    { name: "Материалы", value: "materials" },
  ];

  React.useEffect(() => {
    refetchIssues();
  }, []);

  const refetchIssues = () => {
    fetchOfflineIssues();
    fetchOnlineIssues();
  };

  const fetchOnlineIssues = () => {
    axios.get("/online_issue/get_online_issues").then(res => {
      setOnlineIssues(res.data.issues);
    });
  };

  const fetchOfflineIssues = () => {
    axios.get("/offline_issue/get_offline_issues").then(res => {
      setOfflineIssues(res.data.issues);
    });
  };

  React.useEffect(() => {
    fetchPieces();
  }, []);

  function fetchPieces() {
    axios.get("/piece").then(res => {
      setPieces(res.data.pieces);
    });
  }

  function destroyPiece(id) {
    axios.delete("/piece/" + id).then(res => {
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
      {activeTab === "offline-issues" && (
        <IssueTable
          slug={props.slug}
          issues={offlineIssues}
          refetch={refetchIssues}
          route="offline-issue"
        />
      )}
      {activeTab === "online-issues" && (
        <IssueTable
          slug={props.slug}
          issues={onlineIssues}
          refetch={refetchIssues}
          route="online-issue"
        />
      )}
      {activeTab === "materials" && (
        <MaterialsTable pieces={pieces} destroyPiece={id => destroyPiece(id)} />
      )}
    </div>
  );
}

function IssueTable(props) {
  const destroyIssue = id => {
    axios
      .delete("/admin/" + props.slug + "/" + props.route + "/" + id)
      .then(res => {
        props.refetch();
      });
  };

  const toggleHash = (id, hash, published) => {
    axios
      .post("/" + props.route + "/toggle_issue", {
        id: id,
        hash: hash,
        value: published,
      })
      .then(res => {
        props.refetch();
      });
  };

  return (
    <div className="table-wrapper" style={{ marginTop: "3em" }}>
      <IssueTableHeader />
      {props.issues.map(issue => {
        return (
          <IssueTableRow
            key={issue.id}
            title={{
              name: issue.title,
              uri:
                "/admin/" +
                props.slug +
                "/" +
                props.route +
                "/" +
                issue.id +
                "/edit",
            }}
            actions={[
              {
                name: ["Убрать фичер >", "Сделать фичером >"],
                uri: () => toggleHash(issue.id, "featured", !issue.featured),
                state: issue.featured,
              },
              {
                name: ["Открыть для просмотра >", "Закрыть для просмотра >"],
                uri: () => toggleHash(issue.id, "published", !issue.published),
                state: issue.published,
              },
              { name: "Удалить", uri: () => destroyIssue(issue.id) },
            ]}
          />
        );
      })}
    </div>
  );
}

function IssueTableHeader() {
  return (
    <div className="table-header-wrapper">
      <h2 style={{ width: "22em" }}>Выпуски</h2>
      <h2 style={{ width: "38em" }}>Быстрые действия</h2>
    </div>
  );
}

function IssueTableRow(props) {
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
