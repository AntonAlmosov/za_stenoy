import React from "react";
import DefaultLinkButton from "../../../../assets/stylesheets/molecule/buttons/DefaultLinkButton";

export default function PersonalProjectsStarter() {
  return (
    <div className="personal-projects-starter">
      <h1 className="starters-heading-small">Редактор</h1>
      <div className="buttons-wrapper">
        <DefaultLinkButton uri={"/"} text={"Новый проект"} />
        <DefaultLinkButton uri={"/"} text={"Новый материал"} />
      </div>
    </div>
  );
}
