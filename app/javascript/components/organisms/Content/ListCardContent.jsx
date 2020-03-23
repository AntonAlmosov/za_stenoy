import React from "react";

import ViewSwitch from "../../molecules/misc/ViewSwitch.jsx";
import PieceCard from "../../molecules/cards/PieceCard.jsx";

export default function UserProfileContent({ pieces }) {
  const [currentView, setCurrentView] = React.useState(1);

  return (
    <div className="user-profile-content-wrapper">
      <ViewSwitch
        activeSwitch={currentView}
        handleSwitch={n => {
          setCurrentView(n);
        }}
      />
      {currentView === 0 && <ListView pieces={pieces} />}
      {currentView === 1 && <CardView pieces={pieces} />}
    </div>
  );
}

function ListView({ pieces }) {
  return (
    <div className="list-view-wrapper">
      <h2>Публикации автора:</h2>
      {pieces.map(piece => {
        return (
          <a href={piece.url} key={piece.url}>
            {piece.title}
          </a>
        );
      })}
    </div>
  );
}

function CardView({ pieces }) {
  return (
    <div className="card-view-wrapper">
      {pieces.map(piece => {
        return (
          <a href={piece.url} key={piece.url}>
            <PieceCard card={piece} />
          </a>
        );
      })}
    </div>
  );
}
