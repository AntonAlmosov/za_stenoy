import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism";
import FooterOrganism from "../organisms/FooterOrganism";
import CompilationStarter from "../organisms/starters/CompilationStarter";
import CompilationContent from "../organisms/Content/CompilationContent";

export default function CompilationTemplate(props) {
  React.useEffect(() => {
    // if (props.inversed) document.body.classList.add("bg-black");
  }, []);
  return (
    <>
      <HeaderTemplate inverse={props.inversed} logo={true} />
      <CompilationStarter title={props.page.title} />
      <CompilationContent />
      <FooterOrganism />
    </>
  );
}
