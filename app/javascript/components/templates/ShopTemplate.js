import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism.jsx";
import FooterOrganism from "../organisms/FooterOrganism";
import MagasineStarter from "../organisms/Starters/MagasineStarter.jsx";
import CardsContent from "../organisms/Content/CardsContent.jsx";
import CompilationStarter from "../organisms/Starters/CompilationStarter.jsx";

export default function CompilationTemplate({ page, inversed, content }) {
  React.useEffect(() => {
    if (inversed) document.body.classList.add("bg-black");
    document.title = page.title;
  }, []);
  return (
    <>
      <HeaderTemplate inverse={inversed} logo />
      <CompilationStarter title={page.title} />
      <CardsContent cards={content} feature={false} target="_blank" />
      <FooterOrganism />
    </>
  );
}
