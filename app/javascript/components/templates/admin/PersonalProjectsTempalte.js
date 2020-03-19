import React from "react";
import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism";
import AdminStarter from "../../organisms/starters/AdminStarter";
import PersonalProjectsActions from "../../organisms/actions/PersonalProjectsActions";
import PersonalProjectsTable from "../../organisms/tables/PersonalProjectsTable";

export default function PersonalProjectsTemplate(props) {
  return (
    <>
      <HeaderAdminOrganism closeShown backShown />
      <AdminStarter title={props.page.title} />
      <PersonalProjectsActions />
      <PersonalProjectsTable />
    </>
  );
}
