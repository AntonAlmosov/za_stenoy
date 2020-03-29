import React from "react";
import flagsImage from "images/flags.svg";

export default function FooterOrganism() {
  return (
    <div className="footer-wrapper">
      <div className="footer-info">
        <img src={flagsImage} alt="" />
        <div className="flags-links">
          <a href="tel: 8-(952)-517-37-91">8(952) 517 37 91</a>
          <a href="email: flagspublishing@gmail.com">
            flagspublishing@gmail.com
          </a>
          <a href="vk.com/projectflagi" target="_blank">
            vk.com/projectflagi
          </a>
        </div>
      </div>
    </div>
  );
}
