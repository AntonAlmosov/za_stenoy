import React from "react";
import ReactHtmlParser from "react-html-parser";

export default function MagasineStarter({ page }) {
  const [opened, setOpened] = React.useState(false);
  const desc = JSON.parse(page.description || '{"blocks": []}').blocks;
  return (
    <>
      <div className="starter-wrapper compilation-starter">
        <h1
          className="starters-heading-big"
          style={{ textTransform: "uppercase", wordBreak: "normal" }}
        >
          {page.title}
        </h1>
        <p>
          ЛИТЕРАТУРНЫЙ ЖУРНАЛ{" "}
          <a
            onClick={() => setOpened(true)}
            style={{
              textDecoration: opened ? "none" : "underline",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {page.title}
          </a>
        </p>
      </div>
      {opened && (
        <div className="description-wrapper">
          <div className="description">
            {desc.map((line, i) => {
              return <p key={i}>{ReactHtmlParser(line.data.text)}</p>;
            })}
            <a
              onClick={() => setOpened(false)}
              style={{
                cursor: "pointer",
              }}
            >
              Закрыть
            </a>
          </div>
        </div>
      )}
    </>
  );
}
