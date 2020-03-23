import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism.jsx";
import FooterOrganism from "../organisms/FooterOrganism";
import MagasineStarter from "../organisms/Starters/MagasineStarter.jsx";
import CardsContent from "../organisms/Content/CardsContent.jsx";

export default function CompilationTemplate({
  page,
  inversed,
  content,
  feature,
}) {
  React.useEffect(() => {
    if (inversed) document.body.classList.add("bg-black");
    document.title = page.title;
  }, []);
  return (
    <>
      <HeaderTemplate inverse={inversed} logo />
      <MagasineStarter page={page} />
      <CardsContent cards={content || []} feature={feature} />
      <FooterOrganism />
    </>
  );
}
