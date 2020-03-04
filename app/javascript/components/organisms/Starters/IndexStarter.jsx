import React from "react";
import flagsImage from "images/flags-black.svg";

export default function IndexStarter() {
  return (
    <div className="index-starter">
      <img src={flagsImage} />
      <p>
        Сайт литературного издательства <a href="/">«Флаги»</a>
        <br />
        2020
      </p>
    </div>
  );
}
