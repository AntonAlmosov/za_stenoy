import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism";
import FooterOrganism from "../organisms/FooterOrganism";
import MagasineStarter from "../organisms/starters/MagasineStarter";
import CompilationContent from "../organisms/Content/CompilationContent";

export default function CompilationTemplate(props) {
  React.useEffect(() => {
    // if (props.inversed) document.body.classList.add("bg-black");
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
