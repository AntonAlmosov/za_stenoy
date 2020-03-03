import React from "react";
import HeaderOrganism from "../organisms/HeaderOrganism";
import IndexStarter from "../organisms/Starters/IndexStarter";
import FooterOrganism from "../organisms/FooterOrganism";
import IndexContent from "../organisms/Content/IndexContent";

export default function IndexTemplate() {
  return (
    <>
      <HeaderOrganism logo={false} inverse={false} />
      <IndexStarter />
      <IndexContent />
      <FooterOrganism />
    </>
  );
}
