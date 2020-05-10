import React from "react";

import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import AdminStarter from "../../organisms/Starters/AdminStarter.jsx";
import NewsActions from "../../organisms/actions/NewsActions.jsx";
import NewsTable from "../../organisms/tables/NewsTable";

export default function MagasineTemplate(props) {
  return (
    <>
      <HeaderAdminOrganism
        closeShown={props.closePath}
        backShown={props.backPath}
      />
      <AdminStarter title={props.page.title} />
      <NewsActions slug={props.page.slug} />
      <NewsTable />
    </>
  );
}
