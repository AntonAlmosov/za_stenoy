import React from "react";
import DefaultLinkButton from "../../molecules/buttons/DefaultLinkButton";

export default function MagasineActions(props) {
  return (
    <div className="buttons-wrapper">
      <DefaultLinkButton
        uri={"/admin/" + props.slug + "/offline_issue/new"}
        text={"Новый бумажный выпуск"}
      />
      <DefaultLinkButton
        uri={"/admin/" + props.slug + "/online_issue/new"}
        text={"Новый онлайн выпуск"}
      />
      <DefaultLinkButton uri={"/piece/new"} text={"Новый материал"} />
    </div>
  );
}
