import React from "react";
import HeaderOrganism from "../organisms/HeaderOrganism.jsx";
import FooterOrganism from "../organisms/FooterOrganism.jsx";
import PieceContent from "../organisms/Content/PieceContent.jsx";

export default function IndexTemplate(props) {
  console.log(props.references);
  React.useEffect(() => {
    document.title = props.piece.title + " — Культурный проект «ФЛАГИ»";
  }, []);
  return (
    <>
      <HeaderOrganism logo editPath={props.editPath} />
      <PieceContent {...props} />
      <FooterOrganism />
    </>
  );
}
