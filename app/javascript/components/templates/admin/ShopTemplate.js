import React from "react";
import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import AdminStarter from "../../organisms/Starters/AdminStarter.jsx";
import ShopActions from "../../organisms/actions/ShopActions.jsx";
import ShopTable from "../../organisms/tables/ShopTable.jsx";

export default function ShopTemplate(props) {
  return (
    <>
      <HeaderAdminOrganism closeShown backShown />
      <AdminStarter title={props.page.title} />
      <ShopActions />
      <ShopTable />
    </>
  );
}
