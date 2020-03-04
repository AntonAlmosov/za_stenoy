import React from "react";

export default function ViewSwitch({ handleSwitch, activeSwitch }) {
  return (
    <div className="view-switch-wrapper">
      <a
        className={activeSwitch === 0 ? "active" : ""}
        onClick={() => handleSwitch(0)}
      >
        Списком
      </a>
      <a
        className={activeSwitch === 1 ? "active" : ""}
        onClick={() => handleSwitch(1)}
      >
        Карточками
      </a>
    </div>
  );
}
