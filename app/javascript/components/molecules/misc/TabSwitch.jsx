import React from "react";

export default function TabSwitch({ tabs, onClick, activeTab }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {tabs.map(tab => {
        const isTabActive = tab.value === activeTab;
        return (
          <span
            key={tab.name}
            onClick={() => onClick(tab.value)}
            style={{
              fontSize: "1em",
              lineHeight: 2,
              fontWeight: isTabActive ? 600 : 400,
              fontStyle: isTabActive ? "italic" : "normal",
              margin: "0 1em",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {tab.name}
          </span>
        );
      })}
    </div>
  );
}
