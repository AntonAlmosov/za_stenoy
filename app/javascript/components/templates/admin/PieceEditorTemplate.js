import React from "react";
import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

export default function PieceEditorTemplate({
  piece,
  initialAuthors,
  coverUrl,
  postPath,
  origin,
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
        doneActive={title && text && date}
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
        <div style={{ width: "28em", height: "34em", position: "relative" }}>
          {cover && (
            <img
              src={cover}
              style={{
                width: "28em",
                height: "34em",
                objectFit: "contain",
                objectPosition: "center center",
              }}
            />
          )}
          <div
            style={{
              width: "28em",
              height: "34em",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <input
              className="cover_image_input"
              type="file"
              id={"cover"}
              accept="image/*"
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  var reader = new FileReader();

                  reader.onload = function(el) {
                    setCover(el.target.result);
                  };
                  reader.readAsDataURL(e.target.files[0]);
                  console.log(e.target.files[0].size);
                }
              }}
              style={{ display: "none" }}
            />
            {!cover && (
              <label
                htmlFor={"cover"}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxSizing: "border-box",
                  border: "2px solid #b3b3b3",
                  backgroundColor: "rgba(0,0,0,0)",
                  cursor: "pointer",
                }}
              >
                <div style={{ color: "#b3b3b3" }}>Добавить обложку ></div>
              </label>
            )}
            {cover && (
              <label
                htmlFor={"cover"}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxSizing: "border-box",
                  backgroundColor: "rgba(0,0,0,0)",
                  cursor: "pointer",
                }}
                className="show-on-hover"
              >
                <div style={{ color: "#b3b3b3" }}>Изменить обложку ></div>
              </label>
            )}
          </div>
        </div>
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
