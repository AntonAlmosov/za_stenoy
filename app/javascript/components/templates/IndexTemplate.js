import React from "react";
import HeaderOrganism from "../organisms/HeaderOrganism.jsx";
import IndexStarter from "../organisms/Starters/IndexStarter.jsx";
import FooterOrganism from "../organisms/FooterOrganism.jsx";
import IndexContent from "../organisms/Content/IndexContent.jsx";

export default function IndexTemplate(props) {
  React.useEffect(() => {
    document.title = "ИЗДАТЕЛЬСТВО «ФЛАГИ»";
  }, []);
  return (
    <>
      <HeaderOrganism logo={false} inverse={false} />
      <IndexStarter />
      <IndexContent pages={props.pages} />
      <FooterOrganism />
    </>
  );
}
