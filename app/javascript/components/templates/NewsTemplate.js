import React from "react";

import HeaderOrganism from "../organisms/HeaderOrganism";
import NewsCardsContent from "../organisms/Content/NewsCardsContent";
import FooterOrganism from "../organisms/FooterOrganism";

export default function NewsTemplate({ page, content, feature, editPath }) {
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("bg-black");
    document.title = "НОВОСТИ" + " — Культурный проект «ФЛАГИ»";
    setMobile(window.innerWidth < 512);
  }, []);

  return (
    <>
      <HeaderOrganism inverse={true} editPath={editPath} />
      <NewsStarter title={"Новости"} />
      <NewsCardsContent cards={content} feature={feature} mobile={mobile} />
      <FooterOrganism />
    </>
  );
}

function NewsStarter(props) {
  return (
    <div className="starter-wrapper news-starter">
      <h1
        className="starters-heading-big"
        style={{ textTransform: "uppercase", wordBreak: "normal" }}
      >
        {props.title}
      </h1>
    </div>
  );
}
