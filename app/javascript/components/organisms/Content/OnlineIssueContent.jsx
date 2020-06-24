import React from "react";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import ReactHtmlParser from "react-html-parser";
import arrow from "images/arrow.svg";
import EditorData from "./EditorData";

export default ({ pieces, issue }) => {
  let [current, setCurrent] = React.useState({});
  const [scrollY, setScrolY] = React.useState(0);

  React.useEffect(() => {
    const setY = () => {
      setScrolY(window.scrollY);
    };
    document.addEventListener("scroll", setY);
    return () => {
      document.removeEventListener("scroll", setY);
    };
  });

  React.useEffect(() => {
    let authors = {};
    pieces.forEach((piece) => {
      let authorKey = "";
      let authorName = "";

      piece.authors.forEach((author) => {
        authorKey += cyrillicToTranslit()
          .transform(author.name)
          .replace(/\s/g, "");
        authorName += authorName ? ", \n" + author.name : author.name;
      });

      if (authorKey in authors) {
        authors[authorKey].pieces = [...authors[authorKey].pieces, piece];
      } else {
        authors[authorKey] = {
          name: authorName,
          pieces: [piece],
        };
      }
    });
    setCurrent(authors);
  }, []);

  return (
    <>
      <div className="online-issue-content-wrapper">
        <Contents authors={current} />
        {issue.description && (
          <div className="description">
            <h2>
              {issue.description_heading ? issue.description_heading : "ЭПИЛОГ"}
            </h2>
            <pre>
              <p>{issue.description}</p>
            </pre>
          </div>
        )}
        {pieces.map((piece) => {
          return <Piece key={piece.id} piece={piece} />;
        })}
      </div>
      {scrollY > 1000 && (
        <div
          className="scroll-top"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Наверх <img src={arrow} />
        </div>
      )}
    </>
  );
};

const Contents = ({ authors }) => {
  return (
    <div className="contents-wrapper">
      <h3>Содержание</h3>
      <div className="contents">
        {Object.keys(authors).map((key) => {
          return (
            <div className="authors-row" key={authors[key].name}>
              <div className="name">
                <pre>{authors[key].name}</pre>
              </div>
              <div className="pieces">
                {authors[key].pieces.map((piece) => {
                  return (
                    <a key={piece.id} href={"#piece" + piece.id}>
                      {piece.title}
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Piece = ({ piece }) => {
  const text = JSON.parse(piece.text || "{}").blocks;
  const note = JSON.parse(piece.note || "{}").blocks;
  return (
    <>
      <div className="piece-content">
        <div className="piece-anchor" id={"piece" + piece.id}></div>
        <div className="piece-header">
          <h1>{piece.title}</h1>
          <div className="piece-authors">
            {piece.authors.map((author) => {
              return (
                <a href={author.url} key={author.url}>
                  {author.name}
                </a>
              );
            })}
          </div>
        </div>
        <div className="piece">
          <EditorData text={text} />
        </div>
        <div className="piece-notes">
          <EditorData text={note} />
        </div>
      </div>
    </>
  );
};
