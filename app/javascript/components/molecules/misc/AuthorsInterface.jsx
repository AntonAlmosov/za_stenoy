import React from "react";
import axios from "axios";

export function Author({ currentAuthors, setAuthors, author }) {
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
            currentAuthors.filter(a => {
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
}

export function AuthorPicker({ currentAuthors, setCurrentAuthors }) {
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
        className="input"
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
