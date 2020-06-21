import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism";

export default function EditAuthorTemplate({
  initialName,
  postPath,
  origin,
  backPath,
}) {
  const [saveText, setSaveText] = React.useState("Сохранить");
  const [name, setName] = React.useState(initialName);

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
      </div>
    </>
  );
}
