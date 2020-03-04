import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism";
import FooterOrganism from "../organisms/FooterOrganism";
import CompilationStarter from "../organisms/starters/CompilationStarter";
import CompilationContent from "../organisms/Content/CompilationContent";

export default function CompilationTemplate({ inversed }) {
  React.useEffect(() => {
    if (inversed) document.body.classList.add("bg-black");
  }, []);
  return (
    <>
      <HeaderTemplate inverse={inversed} logo={true} />
      <CompilationStarter />
      <CompilationContent />
      <FooterOrganism />
    </>
  );
}
