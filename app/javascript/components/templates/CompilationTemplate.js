import React from "react";
import HeaderTemplate from "../organisms/HeaderOrganism";
import CompilationStarter from "../organisms/starters/CompilationStarter";

export default function CompilationTemplate() {
  return (
    <>
      <HeaderTemplate inverse={false} logo={true} />
      <CompilationStarter />
    </>
  );
}
