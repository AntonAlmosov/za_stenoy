import React from "react";
import cyrillicToTranslit from "cyrillic-to-translit-js";

export default ({ pieces }) => {
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
