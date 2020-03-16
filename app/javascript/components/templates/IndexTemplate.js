import React from "react";
import HeaderOrganism from "../organisms/HeaderOrganism";
import IndexStarter from "../organisms/starters/IndexStarter";
import FooterOrganism from "../organisms/FooterOrganism";
import IndexContent from "../organisms/Content/IndexContent";

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
