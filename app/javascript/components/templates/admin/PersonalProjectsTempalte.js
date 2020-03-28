import React from "react";
import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import AdminStarter from "../../organisms/Starters/AdminStarter.jsx";
import PersonalProjectsActions from "../../organisms/actions/PersonalProjectsActions.jsx";
import PersonalProjectsTable from "../../organisms/tables/PersonalProjectsTable.jsx";

export default function PersonalProjectsTemplate(props) {
  return (
    <>
      <HeaderAdminOrganism
        closeShown={props.closePath}
        backShown={props.backPath}
      />
      <AdminStarter title={props.page.title} />
      <PersonalProjectsActions />
      <PersonalProjectsTable />
    </>
  );
}
