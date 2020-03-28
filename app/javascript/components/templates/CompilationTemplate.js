import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism.jsx";
import FooterOrganism from "../organisms/FooterOrganism.jsx";
import CompilationStarter from "../organisms/Starters/CompilationStarter.jsx";
import CompilationContent from "../organisms/Content/CardsContent.jsx";

export default function CompilationTemplate(props) {
  React.useEffect(() => {
    document.title = props.page.title + " — Культурный проект «ФЛАГИ»";
  }, []);
  return (
    <>
      <HeaderTemplate
        inverse={props.inversed}
        logo={true}
        editPath={props.editPath}
      />
      <CompilationStarter title={props.page.title} />
      <CompilationContent cards={props.content} feature={props.feature} />
      <FooterOrganism />
    </>
  );
}
