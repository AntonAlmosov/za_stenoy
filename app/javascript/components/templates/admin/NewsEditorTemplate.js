import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import ImagePicker from "../../molecules/misc/ImagePicker.jsx";
import DefaultButton from "../../molecules/buttons/DefaultButton.jsx";
import { Editor } from "../../organisms/editor/Editor";

export default function NewsEditorTemplate({
  news,
  coverUrl,
  postPath,
  origin,
  closePath,
  backPath,
}) {
  const [title, setTitle] = React.useState(news.title);
  const [cover, setCover] = React.useState(coverUrl);
  const [coverData, setCoverData] = React.useState({});
  const [caption, setCaption] = React.useState(news.caption || "");
  const [saveText, setSaveText] = React.useState("Сохранить");
  const [published, setPublished] = React.useState(news.published);
  const [featured, setFeatured] = React.useState(news.featured);
  const [editorRef, setEditorRef] = React.useState();

  async function handleSubmit() {
    setSaveText("Обработка");

    const formData = new FormData();
    if (cover !== coverUrl) formData.append("cover", coverData);
    await editorRef
      .save()
      .then((res) => formData.append("text", JSON.stringify(res)));
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("published", JSON.stringify(!!published));
    formData.append("featured", JSON.stringify(!!featured));

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
        .then((res) => {
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
        doneActive={title}
        doneText={saveText}
      />
      <div
        style={{
          width: "70em",
          margin: "7em auto 10em",
        }}
      >
        <ImagePicker
          width="43.75em"
          height="23.4375em"
          style={{ margin: "0 auto" }}
          imageStyle={{ objectFit: "cover" }}
          cover={cover}
          setCover={handleCover}
        />
        <div
          style={{
            width: "33em",
            margin: "2em auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <DefaultButton
            text={["Закрыть для просмотра >", "Открыть для просмотра >"]}
            state={published}
            onClick={() => setPublished(!published)}
          />
          <DefaultButton
            text={["Убрать фичер >", "Сделать фичером >"]}
            state={featured}
            onClick={() => setFeatured(!featured)}
          />
        </div>
        <div style={{ margin: "2.5em auto 0", width: "64em" }}>
          <TextareaAutosize
            className="news-heading textarea"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={"Заголовок новости"}
          />
          <Editor
            style={{ marginTop: "3.5em", width: "50em" }}
            data={JSON.parse(news.text)}
            setRef={setEditorRef}
          />
          <TextareaAutosize
            className="news-caption textarea"
            value={caption || ""}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={"Подпись к новости"}
          />
        </div>
      </div>
    </>
  );
}
