import React from "react";
import flagsImage from "images/flags-black.svg";

export default function IndexStarter() {
  return (
    <div className="index-starter">
      <img src={flagsImage} />
      <p>
        Культурный проект <a href="/page/about-us">«Флаги»</a>
      </p>
    </div>
  );
}
