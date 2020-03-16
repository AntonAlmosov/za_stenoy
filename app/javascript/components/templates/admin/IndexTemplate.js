import React from "react";
import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism";
import IndexAdminStarter from "../../organisms/starters/IndexAdminStarter";
import IndexTable from "../../organisms/tables/IndexTable";

export default function IndexTemplate(props) {
  return (
    <>
      <HeaderAdminOrganism />
      <IndexAdminStarter />
      <IndexTable pages={props.pages} />
    </>
  );
}
