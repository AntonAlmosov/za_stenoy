import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism.jsx";
import UserProfileStarter from "../organisms/starters/UserProfileStarter.jsx";
import UserProfileContent from "../organisms/Content/UserProfileContent.jsx";

export default function UserProfileTemplate() {
  React.useEffect(() => {
    document.body.classList.add("bg-black");
  }, []);

  return (
    <>
      <HeaderTemplate logo={true} inverse={true} />
      <UserProfileStarter />
      <UserProfileContent />
    </>
  );
}
