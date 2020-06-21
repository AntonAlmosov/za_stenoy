import React from "react";
import HeaderAdminOrganism from "../../organisms/HeaderAdminOrganism.jsx";
import AuthorTable from "../../organisms/tables/AuthorTable.jsx";
import AdminStarter from "../../organisms/Starters/AdminStarter.jsx";

export default function AuthorIndexTemplate(props) {
  return (
    <>
      <HeaderAdminOrganism backShown={props.closePath} />
      <AdminStarter title={"Авторы"} />
      <AuthorTable />
    </>
  );
}
