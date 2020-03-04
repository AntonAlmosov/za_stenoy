import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism";
import FooterOrganism from "../organisms/FooterOrganism";
import CompilationStarter from "../organisms/starters/CompilationStarter";
import CompilationContent from "../organisms/Content/CompilationContent";

export default function CompilationTemplate() {
  return (
    <>
      <HeaderTemplate inverse={false} logo={true} />
      <CompilationStarter />
      <CompilationContent />
      <FooterOrganism />
    </>
  );
}
