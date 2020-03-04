import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism";
import UserProfileStarter from "../organisms/starters/UserProfileStarter";
import UserProfileContent from "../organisms/Content/UserProfileContent";

export default function UserProfileTemplate() {
  // React.useEffect(() => {
  //   document.body.classList.add("bg-black");
  // }, []);

  return (
    <>
      <HeaderTemplate logo={true} inverse={true} />
      <UserProfileStarter />
      <UserProfileContent />
    </>
  );
}
