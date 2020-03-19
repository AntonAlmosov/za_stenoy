import React from "react";

export function ToggleButton({
  onClick,
  defaultState,
  activeText,
  disabledText,
}) {
  const [state, setState] = React.useState(defaultState);
  const style = {
    fontSize: "1em",
    lineHeight: 1,
    marginRight: "1em",
    cursor: "pointer",
    textDecoration: "underline",
  };
  return (
    <>
      {state && (
        <span
          onClick={() => {
            onClick();
            setState(!state);
          }}
          style={style}
        >
          {activeText}
        </span>
      )}
      {!state && (
        <span
          onClick={() => {
            onClick();
            setState(!state);
          }}
          style={style}
        >
          {disabledText}
        </span>
      )}
    </>
  );
}

export function DeleteButton({ uri }) {
  const [activated, setActivated] = React.useState(false);
  const style = {
    color: "#FF0000",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "1em",
    lineHeight: 1,
  };

  return (
    <>
      {!activated && (
        <a style={style} onClick={() => setActivated(true)}>
          {"Удалить >"}
        </a>
      )}
      {activated && (
        <a style={style} onClick={uri}>
          {"Подтвердить удаление"}
        </a>
      )}
    </>
  );
}
