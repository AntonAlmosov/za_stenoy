import React from "react";
import EditorData from "./EditorData";

export default function NewsContent({ news, cover }) {
  const text = JSON.parse(news.text).blocks;
  return (
    <div className="news-content">
      {cover && <img src={cover} />}
      <div className="news-header">
        <h1>{news.title}</h1>
      </div>
      <div className="news">
        <EditorData text={text} />
      </div>
      <span>{news.caption}</span>
    </div>
  );
}
