import React from "react";
import HeaderOrganism from "../organisms/HeaderOrganism";
import IndexStarter from "../organisms/Starters/IndexStarter";

export default function IndexTemplate() {
  return (
    <>
      <HeaderOrganism logo={false} inverse={false} />
      <IndexStarter />
    </>
  );
}
