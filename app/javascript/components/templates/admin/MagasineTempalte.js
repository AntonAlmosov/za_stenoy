import React from "react";
import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism";
import AdminStarter from "../../organisms/starters/AdminStarter";
import MagasineActions from "../../organisms/actions/MagasineActions";
import MagasineTable from "../../organisms/tables/MagasineTable";

export default function MagasineTemplate(props) {
  return (
    <>
      <HeaderAdminOrganism closeShown backShown />
      <AdminStarter title={props.page.title} />
      <MagasineActions slug={props.page.slug} />
      <MagasineTable slug={props.page.slug} />
    </>
  );
}
