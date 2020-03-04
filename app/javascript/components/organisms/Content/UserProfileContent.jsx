import React from "react";

import ViewSwitch from "../../molecules/misc/ViewSwitch";
import CompilationCard from "../../molecules/cards/CompilationCard";

export default function UserProfileContent() {
  const [currentView, setCurrentView] = React.useState(0);

  return (
    <div className="user-profile-content-wrapper">
      <ViewSwitch
        activeSwitch={currentView}
        handleSwitch={n => {
          setCurrentView(n);
        }}
      />
      {currentView === 0 && <ListView />}
      {currentView === 1 && <CardView />}
    </div>
  );
}

function ListView() {
  return (
    <div className="list-view-wrapper">
      <h2>Публикации автора:</h2>
      <a href="/">Хуйня ебучая</a>
      <a href="/">Говно вонючие</a>
      <a href="/">Моча прыгучая</a>
    </div>
  );
}

function CardView() {
  return (
    <div className="card-view-wrapper">
      <CompilationCard />
      <CompilationCard />
      <CompilationCard />
      <CompilationCard />
    </div>
  );
}
