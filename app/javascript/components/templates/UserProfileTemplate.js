import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism.jsx";
import UserProfileStarter from "../organisms/Starters/UserProfileStarter.jsx";
import ListCardContent from "../organisms/Content/ListCardContent.jsx";

export default function UserProfileTemplate({ pieces, author }) {
  React.useEffect(() => {
    document.body.classList.add("bg-black");
    document.title = author.name + " — Культурный проект «ФЛАГИ»";
  }, []);

  return (
    <>
      <HeaderTemplate logo={true} inverse={true} />
      <UserProfileStarter title={author.name} />
      <ListCardContent pieces={pieces} />
    </>
  );
}
