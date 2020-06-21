import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism";

export default function EditAuthorTemplate({
  id,
  initialName,
  postPath,
  origin,
  backPath,
}) {
  const [saveText, setSaveText] = React.useState("Сохранить");
  const [name, setName] = React.useState(initialName);
  const [pieces, setPieces] = React.useState([]);

  React.useEffect(() => {
    axios
      .post("/author/get_author_pieces", { id: id })
      .then((res) => setPieces(res.data.pieces));
  }, []);

  function handleSubmit() {
    setSaveText("Обработка");

    const formData = new FormData();
    formData.append("name", name);

    if (origin === "new") {
      axios
        .post(postPath, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(() => {
          setSaveText("Ошибка");
          setInterval(() => setSaveText("Сохранить"), 1000);
        })
        .then((res) => {
          setSaveText("Сохранить");
          window.location.replace(res.data.redirectPath);
        });
    } else if (origin === "edit") {
      axios
        .patch(postPath, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(() => {
          setSaveText("Ошибка");
          setInterval(() => setSaveText("Сохранить"), 1000);
        })
        .then(() => {
          setSaveText("Готово!");
          setInterval(() => setSaveText("Сохранить"), 1000);
        });
    }
  }

  return (
    <>
      <HeaderAdminOrganism
        backShown={backPath}
        onDoneClick={handleSubmit}
        doneActive={name.length}
        doneText={saveText}
      />
      <div
        style={{
          width: "70em",
          margin: "7em auto 10em",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TextareaAutosize
          className="starters-heading-small textarea"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          placeholder={"Имя автора"}
        />
        <MaterialsTable pieces={pieces} />
      </div>
    </>
  );
}

function MaterialsTable(props) {
  return (
    <div className="table-wrapper" style={{ marginTop: "3em" }}>
      <MaterialsTableHeader />
      {props.pieces.map((piece) => {
        return <MaterialsTableRow key={piece.id} title={piece.title} />;
      })}
      {props.pieces.length === 0 && (
        <div className="table-row-wrapper">
          <div
            className="column"
            style={{ width: "100%", lineHeight: 1.3, opacity: 0.5 }}
          >
            У автора пока нет прикрепленных материалов
          </div>
        </div>
      )}
    </div>
  );
}

function MaterialsTableHeader() {
  return (
    <div className="table-header-wrapper">
      <h2 style={{ width: "100%" }}>Материалы</h2>
    </div>
  );
}

function MaterialsTableRow(props) {
  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "100%", lineHeight: 1.3 }}>
        {props.title}
      </div>
    </div>
  );
}
