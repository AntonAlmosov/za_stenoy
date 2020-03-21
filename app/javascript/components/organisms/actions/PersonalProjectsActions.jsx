import React from "react";
import DefaultLinkButton from "../../molecules/buttons/DefaultLinkButton";

export default function PersonalProjectsActions() {
  return (
    <div className="buttons-wrapper">
      <DefaultLinkButton
        uri={"/admin/authors-projects/compilation/new"}
        text={"Новый проект"}
      />
      <DefaultLinkButton uri={"/piece/new"} text={"Новый материал"} />
    </div>
  );
}
