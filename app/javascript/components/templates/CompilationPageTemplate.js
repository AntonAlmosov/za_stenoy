import React from "react";

import HeaderTemplate from "../organisms/HeaderOrganism.jsx";
import FooterOrganism from "../organisms/FooterOrganism.jsx";
import CompilationPageStarter from "../organisms/Starters/CompilationPageStarter.jsx";
import ListCardContent from "../organisms/Content/ListCardContent.jsx";

export default function CompilationTemplate(props) {
  React.useEffect(() => {
    if (props.inversed) document.body.classList.add("bg-black");
    document.title = props.compilation.title;
  }, []);
  return (
    <>
      <HeaderTemplate inverse={props.inversed} logo={true} />
      <CompilationPageStarter
        title={props.compilation.title}
        caption={props.compilation.caption}
        cover={props.cover}
      />
      <ListCardContent pieces={props.pieces} />
      <FooterOrganism />
    </>
  );
}
