import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism.jsx";
import UserProfileStarter from "../organisms/Starters/UserProfileStarter.jsx";
import ListCardContent from "../organisms/Content/ListCardContent.jsx";
import { addMiddlename } from "../misc/addMiddlename.js";

export default function UserProfileTemplate({ pieces, author }) {
  React.useEffect(() => {
    document.body.classList.add("bg-black");
    document.title = author.name + " — Культурный проект «ФЛАГИ»";
  }, []);

  return (
    <>
      <HeaderTemplate logo={true} inverse={true} />
      <UserProfileStarter
        title={addMiddlename(author)}
        image={author.avatar}
        description={author.description}
      />
      <ListCardContent pieces={pieces} />
    </>
  );
}
