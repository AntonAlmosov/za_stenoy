import React from "react";
import ReactHtmlParser from "react-html-parser";
import defineAlligning from "../../misc/defineAlign";

export default ({ text }) => {
  return (
    <>
      {text.map((line, i) => {
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
