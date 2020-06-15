import React from "react";
import ReactHtmlParser from "react-html-parser";

export default function NewsContent({ news, cover }) {
  const text = JSON.parse(news.text).blocks;
  return (
    <div className="news-content">
      {cover && <img src={cover} />}
      <div className="news-header">
        <h1>{news.title}</h1>
      </div>
      <div className="news">
        {text.map((line, i) => {
          if (line.type === "paragraph")
            return <p key={i}>{ReactHtmlParser(line.data.text)}</p>;
          if (line.type === "delimiter") return <hr key={i} />;
        })}
      </div>
      <span>{news.caption}</span>
    </div>
  );
}
