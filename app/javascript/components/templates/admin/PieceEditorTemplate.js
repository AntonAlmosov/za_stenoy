import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import ImagePicker from "../../molecules/misc/ImagePicker.jsx";
import {
  AuthorPicker,
  Author,
} from "../../molecules/misc/AuthorsInterface.jsx";

export default function PieceEditorTemplate({
  piece,
  initialAuthors,
  coverUrl,
  postPath,
  origin,
  backUri,
}) {
  const [title, setTitle] = React.useState(piece.title);
  const [text, setText] = React.useState(piece.text);
  const [date, setDate] = React.useState(piece.publish_date);
  const [cover, setCover] = React.useState(coverUrl);
  const [authors, setAuthors] = React.useState(initialAuthors);

  const [saveText, setSaveText] = React.useState("Сохранить");

  function handleSubmit() {
    setSaveText("Обработка");

    const formData = new FormData();
    const coverData = document.querySelector(".cover_image_input");
    if (cover !== coverUrl) formData.append("cover", coverData.files[0]);
    formData.append("title", title);
    formData.append("text", text);
    formData.append("publish_date", date);
    formData.append("authors", JSON.stringify(authors));

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
        .then(res => {
          setSaveText("Готово!");
          setInterval(() => setSaveText("Сохранить"), 1000);
        });
    }
  }

  return (
    <>
      <HeaderAdminOrganism
        backShown
        onDoneClick={handleSubmit}
        doneActive={title && text && date && authors.length}
        doneText={saveText}
      />
      <div
        style={{
          width: "70em",
          margin: "7em auto 7em",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "36em" }}>
          <div style={{ marginBottom: "3.5em" }}>
            <div style={{ marginBottom: "0.5em" }}>
              {authors.map(author => {
                return (
                  <Author
                    currentAuthors={authors}
                    setAuthors={authors}
                    author={author}
                  />
                );
              })}
            </div>
            <AuthorPicker
              currentAuthors={authors}
              setCurrentAuthors={setAuthors}
            />
          </div>
          <TextareaAutosize
            className="textarea title-textarea"
            value={title || ""}
            onChange={e => setTitle(e.target.value)}
            maxRows={2}
            placeholder={"Название материала"}
          />
          <TextareaAutosize
            style={{ marginTop: "2em" }}
            className="textarea regular-textarea"
            value={text || ""}
            onChange={e => setText(e.target.value)}
            placeholder={"Пишите! Например: О сколько нам открытий чудных"}
          />
          <input
            defaultValue={date}
            onChange={e => setDate(e.target.value)}
            style={{
              fontSize: "1em",
              lineHeight: 1,
              marginTop: "2.5em",
            }}
            placeholder={"Дата публикации"}
            className={"input"}
          />
        </div>
        <ImagePicker
          width="28em"
          height="34em"
          cover={cover}
          setCover={setCover}
        />
      </div>
    </>
  );
}
