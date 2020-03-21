import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism.jsx";
import FooterOrganism from "../organisms/FooterOrganism.jsx";
import CompilationStarter from "../organisms/starters/CompilationStarter.jsx";
import CompilationContent from "../organisms/Content/CompilationContent.jsx";

export default function CompilationTemplate(props) {
  React.useEffect(() => {
    document.title = props.page.title;
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
