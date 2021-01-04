import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import ImagePicker from "../../molecules/misc/ImagePicker.jsx";
import {
  AuthorPicker,
  Author,
} from "../../molecules/misc/AuthorsInterface.jsx";
import DefaultButton from "../../molecules/buttons/DefaultButton.jsx";
import { Editor } from "../../organisms/editor/Editor.jsx";

export default function PieceEditorTemplate({
  piece,
  initialAuthors,
  coverUrl,
  postPath,
  origin,
  closePath,
  backPath,
}) {
  const [title, setTitle] = React.useState(piece.title);
  const [editorRef, setEditorRef] = React.useState(null);
  const [noteEditorRef, setNoteEditorRef] = React.useState(null);
  const [date, setDate] = React.useState(piece.publish_date);
  const [cover, setCover] = React.useState(coverUrl);
  const [coverData, setCoverData] = React.useState({});
  const [authors, setAuthors] = React.useState(initialAuthors);
  const [saveText, setSaveText] = React.useState("Сохранить");
  const [published, setPublished] = React.useState(piece.published);

  async function handleSubmit() {
    setSaveText("Обработка");

    const formData = new FormData();
    if (cover !== coverUrl) formData.append("cover", coverData);
    await editorRef.save().then((res) => {
      formData.append("text", JSON.stringify(res));
    });
    await noteEditorRef.save().then((res) => {
      formData.append("note", JSON.stringify(res));
    });
    formData.append("title", title);
    formData.append("publish_date", date);
    formData.append("authors", JSON.stringify(authors));
    formData.append("published", JSON.stringify(published));

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

  const handleCover = (url, file) => {
    setCover(url);
    setCoverData(file);
  };

  return (
    <>
      <HeaderAdminOrganism
        backShown={backPath}
        closeShown={closePath || false}
        onDoneClick={handleSubmit}
        doneActive={title && authors.length}
        doneText={saveText}
      />
      <div
        style={{
          width: "60em",
          margin: "7em auto 7em",
        }}
      >
        <div style={{ margin: "0 0 2em", width: "27.5em" }}>
          <ImagePicker
            width="27.5em"
            height="15.5em"
            cover={cover}
            setCover={handleCover}
          />
        </div>
        <div style={{ width: "60em", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5em" }}>
            <div>
              <DefaultButton
                text={["Закрыть для просмотра >", "Открыть для просмотра >"]}
                state={published}
                onClick={() => setPublished(!published)}
                style={{ margin: "2em 0em" }}
              />
              <AuthorPicker
                currentAuthors={authors}
                setCurrentAuthors={setAuthors}
              />
            </div>
          </div>
          <TextareaAutosize
            className="textarea title-textarea"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={"Название материала"}
          />
        </div>
        <div style={{ width: "40em" }}>
          <Editor
            style={{ marginTop: "2em" }}
            data={JSON.parse(piece.text)}
            setRef={setEditorRef}
          />
          <Editor
            style={{ opacity: 0.5 }}
            data={JSON.parse(piece.note)}
            setRef={setNoteEditorRef}
            placeholder="Примечания"
            id={"notes"}
          />
        </div>
        <input
          defaultValue={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            fontSize: "1em",
            lineHeight: 1,
            marginTop: "2.5em",
          }}
          placeholder={"Дата публикации"}
          className={"input"}
        />
      </div>
    </>
  );
}
