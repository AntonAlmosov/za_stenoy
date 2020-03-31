import React from "react";
import flagsImage from "images/flags.svg";

export default function FooterOrganism() {
  return (
    <div className="footer-wrapper">
      <div className="footer-info">
        <img src={flagsImage} alt="" />
        <div className="flags-links">
          <div className="row">
            <a href="tel: 8-(952)-517-37-91">8(952) 517 37 91</a>
            <a href="mailto: flagspublishing@gmail.com">
              flagspublishing@gmail.com
            </a>
            <a href="https://fb.com/projectflagi " target="_blank">
              fb.com/projectflagi
            </a>
          </div>
          <a href="https://vk.com/projectflagi" target="_blank">
            vk.com/projectflagi
          </a>
        </div>
      </div>
    </div>
  );
}
