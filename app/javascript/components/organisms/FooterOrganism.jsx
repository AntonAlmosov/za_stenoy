import React from "react";
import flagsImage from "images/flags.svg";

export default function FooterOrganism() {
  return (
    <div className="footer-wrapper">
      <div className="footer-info">
        <img src={flagsImage} alt="" />
        <div className="flags-links">
          <a href="tel: 8-(966)-046-89-30">8-(966)-046-89-30</a>
          <a href="email: flagi@gmail.com">flagi@gmail.com</a>
          <a href="https://vk.com/flagi">vk.com/flagi</a>
        </div>
      </div>
    </div>
  );
}
