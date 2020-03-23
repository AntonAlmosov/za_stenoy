import React from "react";
import CompilationCard from "./CompilationCard.jsx";

export default function IndexCard({ name, uri, card }) {
  return (
    <div className="index-card">
      <a href={uri}>
        {name}
        <CompilationCard card={card} />
      </a>
    </div>
  );
}
