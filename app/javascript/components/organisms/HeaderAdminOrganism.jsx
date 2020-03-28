import React from "react";

export default function HeaderAdminOrganism(props) {
  return (
    <div className="header-wrapper">
      <div className="header">
        {props.backShown == "js" ? (
          <a onClick={() => window.history.back()}>
            {props.backShown ? "Назад" : ""}
          </a>
        ) : (
          <a href={props.backShown}>{props.backShown ? "Назад" : ""}</a>
        )}
        {props.closeShown && (
          <a href={props.closeShown} className="close">
            {"Close"}
          </a>
        )}
        <a
          onClick={props.doneActive ? props.onDoneClick : () => {}}
          style={{
            color: props.doneActive ? "#000" : "#b3b3b3",
          }}
        >
          {props.onDoneClick ? props.doneText : ""}
        </a>
      </div>
    </div>
  );
}
