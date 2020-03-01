import React from "react";
import logo from "images/logo-large.svg";

export default function Header() {
  return (
    <div className="header-wrapper">
      <div className="header">
        <a href="/">Поиск</a>
        <a href="/" className="logo">
          <img src={logo} />
        </a>
        <a href="/">Меню</a>
      </div>
    </div>
  );
}
