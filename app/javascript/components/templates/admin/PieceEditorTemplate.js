import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";

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
}) {
  const [title, setTitle] = React.useState(piece.title);
  const [text, setText] = React.useState(JSON.parse(piece.text));
  const [date, setDate] = React.useState(piece.publish_date);
  const [cover, setCover] = React.useState(coverUrl);
  const [authors, setAuthors] = React.useState(initialAuthors);
  const [saveText, setSaveText] = React.useState("Сохранить");

  React.useEffect(() => {
    const editor = new EditorJS({
      holderId: "piece",
      placeholder: "Пишите! Например:\n Килограмм салата рыбного",
      tools: {
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
      data: text,
      onChange: api => {
        api.saver.save().then(res => {
          setText(res);
        });
      },
    });
  }, []);

  function handleSubmit() {
    setSaveText("Обработка");

    const formData = new FormData();
    const coverData = document.querySelector(".cover_image_input");
    if (cover !== coverUrl) formData.append("cover", coverData.files[0]);
    formData.append("title", title);
    formData.append("text", JSON.stringify(text));
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
          width: "60em",
          margin: "7em auto 7em",
        }}
      >
        <div style={{ margin: "0 auto 2em", width: "60em" }}>
          <ImagePicker
            width="60em"
            height="25.5em"
            cover={cover}
            setCover={setCover}
          />
        </div>
        <div style={{ width: "60em", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5em" }}>
            <div style={{ marginBottom: "0.5em" }}>
              {authors.map(author => {
                return (
                  <Author
                    key={author.name}
                    currentAuthors={authors}
                    setAuthors={setAuthors}
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
        <div style={{ marginTop: "2em" }} id="piece"></div>
      </div>
    </>
  );
}
