import React from "react";
import ContentFilter from "../../molecules/misc/ContentFilter";
import CompilationCard from "../../molecules/cards/CompilationCard";
import FeatureCard from "../../molecules/cards/FeatureCard";

export default function CompilationContent() {
  return (
    <div className="compilation-content">
      <ContentFilter
        activeFilters={[0, 1]}
        handleFilter={filter => console.log("u pressed filter ", filter)}
      />
      <div className="compilation-content-cards-wrapper">
        <CompilationCard />
        <CompilationCard />
        <CompilationCard />
        <CompilationCard />
        <FeatureCard />
      </div>
    </div>
  );
}
