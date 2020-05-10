import React from "react";

import HeaderOrganism from "../organisms/HeaderOrganism";

export default function NewsTemplate({ page, content, feature, editPath }) {
  React.useEffect(() => {
    document.body.classList.add("bg-black");
    document.title = "НОВОСТИ" + " — Культурный проект «ФЛАГИ»";
  }, []);
  return (
    <>
      <HeaderOrganism inverse={true} editPath={editPath} />
    </>
  );
}
