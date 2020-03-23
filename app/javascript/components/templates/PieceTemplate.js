import React from "react";
import HeaderOrganism from "../organisms/HeaderOrganism.jsx";
import FooterOrganism from "../organisms/FooterOrganism.jsx";
import PieceContent from "../organisms/Content/PieceContent.jsx";

export default function IndexTemplate(props) {
  React.useEffect(() => {
    document.title = "ФЛАГИ — " + props.piece.title;
  }, []);
  return (
    <>
      <HeaderOrganism logo />
      <PieceContent {...props} />
      <FooterOrganism />
    </>
  );
}
