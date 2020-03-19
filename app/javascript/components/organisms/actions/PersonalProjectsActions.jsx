import React from "react";
import DefaultLinkButton from "../../molecules/buttons/DefaultLinkButton";

export default function PersonalProjectsActions() {
  return (
    <div className="buttons-wrapper">
      <DefaultLinkButton uri={"/"} text={"Новый проект"} />
      <DefaultLinkButton
        uri={"/admin/authors-projects/piece/new"}
        text={"Новый материал"}
      />
    </div>
  );
}
