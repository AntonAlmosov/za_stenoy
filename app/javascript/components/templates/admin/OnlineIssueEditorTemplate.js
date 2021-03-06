import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import ImagePicker from "../../molecules/misc/ImagePicker.jsx";
import DefaultButton from "../../molecules/buttons/DefaultButton.jsx";
import { addMiddlename } from "../../misc/addMiddlename.js";

export default ({
  issue,
  coverUrl,
  postPath,
  origin,
  initialPieces,
  closePath,
  backPath,
}) => {
  const [saveText, setSaveText] = React.useState("Сохранить");
  const [title, setTitle] = React.useState(issue.title);
  const [cover, setCover] = React.useState(coverUrl);
  const [darkMode, setDarkMode] = React.useState(issue.dark_mode === undefined ? false : issue.dark_mode);
  const [published, setPublished] = React.useState(issue.published);
  const [featured, setFeatured] = React.useState(issue.featured);
  const [issuePieces, setIssuePieces] = React.useState(initialPieces);
  const [pieces, setPieces] = React.useState([]);
  const [description, setDescription] = React.useState(issue.description || "");
  const [descriptionHeading, setDescriptionHeading] = React.useState(
    issue.description_heading || ""
  );

  React.useEffect(() => {
    fetchPieces();
  }, []);

  function fetchPieces() {
    axios.get("/piece/").then((res) => setPieces(res.data.pieces));
  }

  function handleSubmit() {
    setSaveText("Обработка");

    const formData = new FormData();
    const coverData = document.querySelector(".cover_image_input");
    if (cover !== coverUrl) formData.append("cover", coverData.files[0]);
    formData.append("title", title);
    formData.append("published", published);
    formData.append("featured", featured);
    formData.append("pieces", JSON.stringify(issuePieces));
    formData.append("description_heading", descriptionHeading);
    formData.append("description", description);
    formData.append("dark_mode", darkMode);

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

  function handleissuePieces(adding, piece) {
    const res = adding
      ? [...issuePieces, piece]
      : issuePieces.filter((p) => p.id != piece.id);
    setIssuePieces(res);
  }

  React.useEffect(() => {
    issuePieces.forEach((el, i) => {
      if (el) el.order = i;
    });
  }, [issuePieces]);

  const movePieces = (from, to) => {
    let newArray = issuePieces;
    const piece = newArray.splice(from, 1)[0];
    newArray.splice(to, 0, piece);
    setIssuePieces([...newArray]);
  };

  return (
    <>
      <HeaderAdminOrganism
        backShown={backPath}
        closeShown={closePath}
        onDoneClick={handleSubmit}
        doneActive={title && cover && issuePieces.length}
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
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={"Название материала"}
        />
        <ImagePicker
          width="28em"
          height="16em"
          cover={cover}
          setCover={setCover}
          style={{ margin: "3em auto 0" }}
          imageStyle={{ backgroundColor: "#000" }}
        />
        <div style={{ width: "34em", margin: "2em auto 0" }}>
          <TextareaAutosize
            className="textarea"
            value={descriptionHeading || ""}
            onChange={(e) => setDescriptionHeading(e.target.value)}
            maxRows={2}
            placeholder={"Эпилог"}
            style={{
              fontSize: "1.25em",
              lineHeight: 1.5,
            }}
          />
          <TextareaAutosize
            className="textarea"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={
              "Опиши выпуск. Что это за выпуск, чему он посвящен и так далее. На самом деле не важно что ты напишешь. Да и вообще ничего не важно."
            }
            style={{
              width: "34em",
              marginTop: "1em",
              fontSize: "1em",
              lineHeight: 1.5,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "3em auto 0",
          }}
        >
          <DefaultButton
            text={["Темный фон >", "Белый фон >"]}
            state={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            style={{ margin: "0 1em" }}
          />
          <DefaultButton
            text={["Убрать фичер >", "Сделать фичером >"]}
            state={featured}
            onClick={() => setFeatured(!featured)}
            style={{ margin: "0 1em" }}
          />
          <DefaultButton
            text={["Закрыть для просмотра >", "Открыть для просмотра >"]}
            state={published}
            onClick={() => setPublished(!published)}
            style={{ margin: "0 1em" }}
          />
        </div>
        <MaterialsTable
          pieces={pieces}
          issuePieces={issuePieces}
          movePieces={movePieces}
          onClick={handleissuePieces}
        />
      </div>
    </>
  );
};

function MaterialsTable(props) {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");

  return (
    <div className="table-wrapper" style={{ marginTop: "8em" }}>
      <MaterialsTableHeader
        onNameChange={setTitle}
        onAuthorChange={setAuthor}
      />
      {props.issuePieces.map((piece) => {
        if (piece)
          return (
            <MaterialsTableRow
              key={piece.id}
              piece={piece}
              attached={true}
              onClick={props.onClick}
              actions={[
                {
                  name: "Редактировать",
                  uri: "/piece/" + piece.id + "/edit",
                },
                {
                  name: "Выше",
                  uri: () => props.movePieces(piece.order, piece.order - 1),
                },
                {
                  name: "Ниже",
                  uri: () => props.movePieces(piece.order, piece.order + 1),
                },
              ]}
            />
          );
      })}
      {props.pieces
        .filter((piece) => {
          return (
            !props.issuePieces.some((p) => p && p.id == piece.id) &&
            RegExp(title, "i").test(piece.title) &&
            piece.authors?.some((a) => RegExp(author, "i").test(a.name))
          );
        })
        .map((piece) => {
          return (
            <MaterialsTableRow
              key={piece.id}
              piece={piece}
              attached={false}
              onClick={props.onClick}
              actions={[
                {
                  name: "Редактировать",
                  uri: "/piece/" + piece.id + "/edit",
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
        onChange={(text) => onNameChange(text)}
        placeholder="Поиск по названию материалов"
      />
      <HeaderInput
        width="16em"
        onChange={(text) => onAuthorChange(text)}
        placeholder="Поиск по авторам"
      />
      <h2 style={{ width: "7em" }}>Статус</h2>
      <h2 style={{ width: "17em" }}>Быстрые действия</h2>
    </div>
  );
}

function MaterialsTableRow(props) {
  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "16em", lineHeight: 1.3 }}>
        {props.piece.title}
      </div>
      <div className="column" style={{ width: "16em", lineHeight: 1.3 }}>
        {props.piece.authors.map((author) => {
          return (
            <span key={author.name + props.title}>
              {addMiddlename(author)}
              <br />
            </span>
          );
        })}
      </div>
      <div className="column" style={{ width: "7em" }}>
        <span
          onClick={
            props.attached
              ? () => {
                  props.onClick(false, props.piece);
                }
              : () => {
                  props.onClick(true, props.piece);
                }
          }
          style={{
            fontSize: "1em",
            lineHeight: "1.3",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {props.attached ? "Убрать" : "Добавить"}
        </span>
      </div>
      <div className="column" style={{ width: "17em" }}>
        {props.actions.map((action) => {
          if (action.name !== "Редактировать")
            return (
              <a
                key={action.name}
                style={{
                  fontSize: "1em",
                  lineHeight: 1,
                  marginRight: "1em",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={action.uri}
                target='_blank'
              >
                {action.name}
              </a>
            );
          else {
            return (
              <a
                key={action.name}
                style={{ fontSize: "1em", lineHeight: 1, marginRight: "1em" }}
                href={action.uri}
              >
                {action.name}
              </a>
            );
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
        onChange={(e) => onChange(e.target.value)}
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
