import React from "react";
import CompilationCard from "./CompilationCard";

export default function IndexCard({ name, uri }) {
  return (
    <div className="index-card">
      <a href={uri}>
        {name}
        <CompilationCard />
      </a>
    </div>
  );
}
