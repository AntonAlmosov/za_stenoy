import React from "react";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import ReactHtmlParser from "react-html-parser";

export default ({ pieces, issue }) => {
  let [current, setCurrent] = React.useState({});

  React.useEffect(() => {
    let authors = {};
    pieces.forEach(piece => {
      let authorKey = "";
      let authorName = "";

      piece.authors.forEach(author => {
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
      {pieces.map(piece => {
        return <Piece key={piece.id} piece={piece} />;
      })}
    </div>
  );
};

const Contents = ({ authors }) => {
  return (
    <div className="contents-wrapper">
      <h3>Содержание</h3>
      <div className="contents">
        {Object.keys(authors).map(key => {
          return (
            <div className="authors-row" key={authors[key].name}>
              <div className="name">
                <pre>{authors[key].name}</pre>
              </div>
              <div className="pieces">
                {authors[key].pieces.map(piece => {
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
  const text = JSON.parse(piece.text).blocks;
  return (
    <>
      <div className="piece-content">
        <div className="piece-anchor" id={"piece" + piece.id}></div>
        <div className="piece-header">
          <h1>{piece.title}</h1>
          <div className="piece-authors">
            {piece.authors.map(author => {
              return (
                <a href={author.url} key={author.url}>
                  {author.name}
                </a>
              );
            })}
          </div>
        </div>
        <div className="piece">
          {text.map((line, i) => {
            return <p key={i}>{ReactHtmlParser(line.data.text)}</p>;
          })}
        </div>
        <span>{piece.publish_date}</span>
      </div>
    </>
  );
};
