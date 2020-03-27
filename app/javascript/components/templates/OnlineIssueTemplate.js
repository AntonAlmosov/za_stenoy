import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism.jsx";
import FooterOrganism from "../organisms/FooterOrganism";
import OnlineIssueStarter from "../organisms/Starters/OnlineIssueStarter.jsx";
import OnlineIssueContent from "../organisms/Content/OnlineIssueContent.jsx";

export default function CompilationTemplate({
  issue,
  cover,
  pieces,
  inversed,
}) {
  React.useEffect(() => {
    if (inversed) document.body.classList.add("bg-black");
    document.title = issue.title + " — Культурный проект «ФЛАГИ»";
  }, []);

  return (
    <>
      <HeaderTemplate inverse={inversed} logo />
      <OnlineIssueStarter title={issue.title} cover={cover} />
      <OnlineIssueContent pieces={pieces} issue={issue} />
      <FooterOrganism />
    </>
  );
}
