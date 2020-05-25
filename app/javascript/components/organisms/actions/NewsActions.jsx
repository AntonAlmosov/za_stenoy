import React from "react";
import DefaultLinkButton from "../../molecules/buttons/DefaultLinkButton.jsx";

export default function NewsActions(props) {
  return (
    <div className="buttons-wrapper">
      <DefaultLinkButton
        uri={"/admin/" + props.slug + "/news/new"}
        text={"Новая новость"}
      />
    </div>
  );
}
