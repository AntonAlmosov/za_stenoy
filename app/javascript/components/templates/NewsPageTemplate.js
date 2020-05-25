import React from "react";
import HeaderOrganism from "../organisms/HeaderOrganism.jsx";
import FooterOrganism from "../organisms/FooterOrganism.jsx";
import NewsContent from "../organisms/Content/NewsContent.jsx";

export default function IndexTemplate(props) {
  React.useEffect(() => {
    document.title = props.news.title + " — Культурный проект «ФЛАГИ»";
  }, []);
  return (
    <>
      <HeaderOrganism logo editPath={props.editPath} />
      <NewsContent {...props} />
      <FooterOrganism />
    </>
  );
}
