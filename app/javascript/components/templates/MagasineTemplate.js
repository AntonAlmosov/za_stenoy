import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism.jsx";
import FooterOrganism from "../organisms/FooterOrganism";
import MagasineStarter from "../organisms/Starters/MagasineStarter.jsx";
import CompilationContent from "../organisms/Content/CompilationContent.jsx";

export default function CompilationTemplate(props) {
  React.useEffect(() => {
    if (props.inversed) document.body.classList.add("bg-black");
    document.title = props.page.title;
  }, []);
  return (
    <>
      <HeaderTemplate inverse={props.inversed} logo={true} />
      <MagasineStarter title={props.page.title} caption={props.page.caption} />
      <CompilationContent />
      <FooterOrganism />
    </>
  );
}
