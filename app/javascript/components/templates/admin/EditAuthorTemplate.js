import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism";
import ImagePicker from "../../molecules/misc/ImagePickerPage.jsx";

export default function EditAuthorTemplate({
  id,
  initialName,
  initialAvatar,
  initialDescription,
  postPath,
  origin,
  backPath,
}) {
  const [saveText, setSaveText] = React.useState("Сохранить");
  const [name, setName] = React.useState(initialName);
  const [pieces, setPieces] = React.useState([]);
  const [image, setImage] = React.useState(initialAvatar);
  const [imageData, setImageData] = React.useState({});
  const [description, setDescription] = React.useState(initialDescription);

  React.useEffect(() => {
    axios
      .post("/author/get_author_pieces", { id: id })
      .then((res) => setPieces(res.data.pieces));
  }, []);

  function handleSubmit() {
    setSaveText("Обработка");

    const formData = new FormData();
    formData.append("name", name);
    if (initialAvatar !== image) {
      formData.append("avatar", imageData);
    }
    formData.append("description", description);
    formData.append("public", true);

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
    setImage(url);
    setImageData(file);
  };

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
        <div
          style={{
            width: "52.875em",
            margin: "2.75em auto 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ImagePicker
            width={"23.25em"}
            height={"22.25em"}
            cover={image}
            imageStyle={{
              objectFit: "cover",
              objectPosition: "center",
              filter: "grayscale(100%)",
            }}
            setCover={handleCover}
          />
          <TextareaAutosize
            className={"textarea"}
            style={{
              fontSize: "1em",
              lineHeight: 1.5,
              letterSpacing: "-0.03em",
              width: "27.625em",
            }}
            value={description || ""}
            onChange={(e) => {
              if (e.target.value.length > 800) {
                return;
              }
              setDescription(e.target.value);
            }}
            placeholder={
              "Дми́трий Алекса́ндрович При́гов (5 ноября 1940, Москва, СССР—16 июля 2007, там же, Россия) — русский поэт, художник-график, скульптор. Один из основоположников московского концептуализма в искусстве и литературном жанре (поэзия и проза)."
            }
          />
        </div>
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
