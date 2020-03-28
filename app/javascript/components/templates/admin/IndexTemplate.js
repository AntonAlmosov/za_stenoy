import React from "react";
import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import IndexAdminStarter from "../../organisms/Starters/IndexAdminStarter.jsx";
import IndexTable from "../../organisms/tables/IndexTable.jsx";

export default function IndexTemplate(props) {
  return (
    <>
      <HeaderAdminOrganism closeShown={props.closePath} />
      <IndexAdminStarter />
      <IndexTable pages={props.pages} />
    </>
  );
}
