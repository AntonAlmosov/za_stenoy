import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism";
import ImagePicker from "../../molecules/misc/ImagePicker";
import DefaultButton from "../../molecules/buttons/DefaultButton";

export default ({
  compilation,
  coverUrl,
  postPath,
  origin,
  initialPieces,
  backUri,
}) => {
  const [saveText, setSaveText] = React.useState("Сохранить");
  const [title, setTitle] = React.useState(compilation.title);
  const [cover, setCover] = React.useState(coverUrl);
  const [caption, setCaption] = React.useState(compilation.caption);
  const [published, setPublished] = React.useState(compilation.published);
  const [featured, setFeatured] = React.useState(compilation.featured);
  const [compilationPieces, setCompilationPieces] = React.useState(
    initialPieces
  );
  const [pieces, setPieces] = React.useState([]);

  React.useEffect(() => {
    fetchPieces();
  }, []);

  function fetchPieces() {
    axios.get("/piece/").then(res => setPieces(res.data.pieces));
  }

  function handleSubmit() {
    setSaveText("Обработка");

    const formData = new FormData();
    const coverData = document.querySelector(".cover_image_input");
    if (cover !== coverUrl) formData.append("cover", coverData.files[0]);
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("published", published);
    formData.append("featured", featured);
    formData.append("pieces", JSON.stringify(compilationPieces));

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
        .then(res => {
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

  function handleCompilationPieces(adding, piece) {
    const res = adding
      ? [...compilationPieces, piece]
      : compilationPieces.filter(p => p != piece);
    setCompilationPieces(res);
  }

  return (
    <>
      <HeaderAdminOrganism
        backShown
        onDoneClick={handleSubmit}
        doneActive={title && caption && cover && compilationPieces.length}
        doneText={saveText}
      />
      <div
        style={{
          width: "70em",
          margin: "7em auto 10em",
        }}
      >
        <TextareaAutosize
          className="starters-heading-small textarea"
          value={title || ""}
          onChange={e => setTitle(e.target.value)}
          maxRows={2}
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
        <input
          className="input"
          style={{
            margin: "1em auto 0",
            fontSize: "1.25em",
            lineHeight: 1.6,
            textAlign: "center",
          }}
          defaultValue={caption}
          onChange={e => setCaption(e.target.value)}
          placeholder={"Кепшен проекта"}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2em auto 0",
          }}
        >
          <DefaultButton
            text={["Убрать фичер", "Сделать фичером"]}
            state={featured}
            onClick={() => setFeatured(!featured)}
            style={{ margin: "0 1em" }}
          />
          <DefaultButton
            text={["Закрыть для просмотра", "Открыть для просмотра"]}
            state={published}
            onClick={() => setPublished(!published)}
            style={{ margin: "0 1em" }}
          />
        </div>
        <MaterialsTable
          pieces={pieces}
          compilationPieces={compilationPieces}
          onClick={handleCompilationPieces}
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
              id={piece.id}
              title={piece.title}
              authors={piece.authors}
              attached={props.compilationPieces.some(p => piece.id == p)}
              onClick={props.onClick}
              actions={[
                {
                  name: "Редактировать материал",
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
        onChange={text => onNameChange(text)}
        placeholder="Поиск по названию материалов"
      />
      <HeaderInput
        width="16em"
        onChange={text => onAuthorChange(text)}
        placeholder="Поиск по авторам"
      />
      <h2 style={{ width: "10em" }}>Статус</h2>
      <h2 style={{ width: "14em" }}>Быстрые действия</h2>
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
      <div className="column" style={{ width: "10em" }}>
        <span
          onClick={
            props.attached
              ? () => {
                  props.onClick(false, props.id);
                }
              : () => {
                  props.onClick(true, props.id);
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
      <div className="column" style={{ width: "14em" }}>
        {props.actions.map(action => {
          if (action.name !== "Удалить")
            return (
              <a
                key={action.name}
                style={{ fontSize: "1em", lineHeight: 1, marginRight: "1em" }}
                href={action.uri}
                target="_blank"
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
