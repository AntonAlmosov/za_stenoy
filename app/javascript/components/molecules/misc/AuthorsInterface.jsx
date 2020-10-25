import React from "react";
import axios from "axios";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import icon from "./drag_indicator-24px.svg";
import { addMiddlename } from "../../misc/addMiddlename";

export function Author({ currentAuthors, setAuthors, author, index }) {
  return (
    <Draggable key={author.id} draggableId={String(author.id)} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={"dragable-author"}
          key={author.name}
        >
          <img
            src={icon}
            style={{
              width: "10%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <span style={{ width: "80%", height: "100%", textAlign: "left" }}>
            {addMiddlename(author)}
          </span>
          <span
            onClick={(e) => {
              setAuthors(
                currentAuthors.filter((a) => {
                  return author.name !== a.name;
                })
              );
            }}
            style={{ cursor: "pointer" }}
          >
            x
          </span>
        </div>
      )}
    </Draggable>
  );
}

export function AuthorPicker({ currentAuthors, setCurrentAuthors }) {
  const [authors, setAuthors] = React.useState([]);
  const [search, setSearch] = React.useState("");
  resetServerContext();

  function fetchAuthors() {
    axios.get("/author/get_authors").then((res) => {
      setAuthors(res.data.authors);
    });
  }

  React.useEffect(() => {
    fetchAuthors();
  }, []);

  const onDragEnd = ({ destination, source }) => {
    const newAuthors = Array.from(currentAuthors);
    newAuthors.splice(source.index, 1);
    newAuthors.splice(destination.index, 0, currentAuthors[source.index]);
    setCurrentAuthors(newAuthors);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"authors-container"}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              style={{ marginBottom: "0.5em" }}
              ref={provided.innerRef}
            >
              {currentAuthors.map((author, i) => {
                return (
                  <Author
                    key={author.name}
                    currentAuthors={currentAuthors}
                    setAuthors={setCurrentAuthors}
                    author={author}
                    index={i}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div style={{ width: "13em", position: "relative" }}>
        <input
          className="input"
          style={{ fontSize: "1em", lineHeight: 1.5, outline: 0, border: 0 }}
          placeholder={"Добавить автора"}
          value={search}
          onChange={(e) => {
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
              .filter((author) => {
                return (
                  RegExp(search, "i").test(addMiddlename(author)) &&
                  !currentAuthors.some((a) => a.name == author.name)
                );
              })
              .slice(0, 4)
              .map((author) => {
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
                    {addMiddlename(author)}
                  </div>
                );
              })}
            {authors.filter((author) => {
              return RegExp(search, "i").test(author.name);
            }).length === 0 && (
              <div
                style={{
                  fontSize: "1em",
                  lineHeight: 1.5,
                  cursor: "pointer",
                }}
                onClick={() => {
                  axios.post("/author", { name: search }).then((res) => {
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
    </>
  );
}
