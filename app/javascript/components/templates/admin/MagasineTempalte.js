import React from "react";
import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import AdminStarter from "../../organisms/Starters/AdminStarter.jsx";
import MagasineActions from "../../organisms/actions/MagasineActions.jsx";
import MagasineTable from "../../organisms/tables/MagasineTable.jsx";

export default function MagasineTemplate(props) {
  return (
    <>
      <HeaderAdminOrganism
        closeShown={props.closePath}
        backShown={props.backPath}
      />
      <AdminStarter title={props.page.title} />
      <MagasineActions slug={props.page.slug} />
      <MagasineTable slug={props.page.slug} id={props.page.id} />
    </>
  );
}
