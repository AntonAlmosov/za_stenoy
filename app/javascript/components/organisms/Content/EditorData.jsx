import React from "react";
import ReactHtmlParser from "react-html-parser";
import defineAlligning from "../../misc/defineAlign";

export default ({ text }) => {
  return (
    <>
      {text.map((line, i) => {
        if (line.type === "header") {
          switch (line.data.level) {
            case 1:
              return <h1 key={i}>{ReactHtmlParser(line.data.text)}</h1>;
            case 2:
              return <h2 key={i}>{ReactHtmlParser(line.data.text)}</h2>;
            case 3:
              return <h3 key={i}>{ReactHtmlParser(line.data.text)}</h3>;
          }
        }
        if (line.type === "paragraph") {
          const className = defineAlligning(line.data);
          return (
            <p key={i} className={className}>
              {ReactHtmlParser(line.data.text)}
            </p>
          );
        }
        if (line.type === "delimiter") return <hr key={i} />;
      })}
    </>
  );
};
