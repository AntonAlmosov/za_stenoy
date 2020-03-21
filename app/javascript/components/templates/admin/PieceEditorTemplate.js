import React from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism";
import ImagePicker from "../../molecules/misc/ImagePicker";

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
                  <div
                    style={{
                      fontSize: "1em",
                      lineHeight: 1.5,
                      width: "13em",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5em",
                    }}
                    key={author.name}
                  >
                    {author.name}
                    <span
                      onClick={() =>
                        setAuthors(
                          authors.filter(a => {
                            return author.name !== a.name;
                          })
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      x
                    </span>
                  </div>
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

function AuthorPicker({ currentAuthors, setCurrentAuthors }) {
  const [authors, setAuthors] = React.useState([]);
  const [search, setSearch] = React.useState("");

  function fetchAuthors() {
    axios.get("/author").then(res => {
      setAuthors(res.data.authors);
    });
  }

  React.useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div style={{ width: "13em", position: "relative" }}>
      <input
        className=".input"
        style={{ fontSize: "1em", lineHeight: 1.5, outline: 0, border: 0 }}
        placeholder={"Добавить автора"}
        value={search}
        onChange={e => {
          setSearch(e.target.value);
        }}
      />
      {search && (
        <div
          style={{
            width: "13em",
            position: "absolute",
            top: "1.5em",
            backgroundColor: "#fff",
          }}
        >
          {authors
            .filter(author => {
              return (
                RegExp(search, "i").test(author.name) &&
                !currentAuthors.some(a => a.name == author.name)
              );
            })
            .slice(0, 4)
            .map(author => {
              return (
                <div
                  key={author.name}
                  style={{
                    marginBottom: "0.5em",
                    fontSize: "1em",
                    lineHeight: 1.5,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCurrentAuthors([...currentAuthors, author]);
                    setSearch("");
                  }}
                >
                  {author.name}
                </div>
              );
            })}
          {authors.filter(author => {
            return RegExp(search, "i").test(author.name);
          }).length === 0 && (
            <div
              style={{
                fontSize: "1em",
                lineHeight: 1.5,
                cursor: "pointer",
              }}
              onClick={() => {
                axios.post("/author", { name: search }).then(res => {
                  setCurrentAuthors([...currentAuthors, res.data.author]);
                  setSearch("");
                  fetchAuthors();
                });
              }}
            >
              {"+ " + search}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
