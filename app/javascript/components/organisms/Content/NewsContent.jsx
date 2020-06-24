import React from "react";
import EditorData from "./EditorData";

export default function NewsContent({ news, cover }) {
  const text = JSON.parse(news.text || "{}").blocks;
  const note = JSON.parse(news.note || "{}").blocks;
  return (
    <div className="news-content">
      {cover && <img src={cover} />}
      <div className="news-header">
        <h1>{news.title}</h1>
      </div>
      <div className="news">
        <EditorData text={text} />
      </div>
      <div className="news-notes">
        <div id="note"></div>
        <EditorData text={note} />
      </div>
    </div>
  );
}
