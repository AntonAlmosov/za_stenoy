import React from "react";

export default function DefaultLinkButton(props) {
  return (
    <a className={"default-link-button"} href={props.uri}>
      {props.text}
    </a>
  );
}
