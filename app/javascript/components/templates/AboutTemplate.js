import React from "react";
import ReactHtmlParser from "react-html-parser";

import HeaderOrganism from "../organisms/HeaderOrganism.jsx";
import flags from "images/flags-black.svg";

export default function IndexTemplate({ page, initialCover, editPath }) {
  const desc = JSON.parse(page.description).blocks;
  React.useEffect(() => {
    document.title = "О НАС" + " — Культурный проект «ФЛАГИ»";
  }, []);
  return (
    <>
      <HeaderOrganism logo inverse={false} editPath={editPath} />
      <div className="about-wrapper">
        <img src={flags} className="flags" />
        <h1>О ПРОЕКТЕ</h1>
        {initialCover && <img src={initialCover} className="about-cover" />}
        <div className="description">
          {desc.map((line, i) => {
            return <p key={i}>{ReactHtmlParser(line.data.text)}</p>;
          })}
        </div>
      </div>
      <div className="about-footer">
        <a href="tel: 8-(952)-517-37-91">8(952) 517 37 91</a>
        <a href="email: flagspublishing@gmail.com">flagspublishing@gmail.com</a>
        <a href="https://vk.com/projectflagi" target="_blank">
          vk.com/projectflagi
        </a>
      </div>
    </>
  );
}
