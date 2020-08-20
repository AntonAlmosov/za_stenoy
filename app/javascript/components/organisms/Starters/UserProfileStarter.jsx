import React from "react";

export default function UserProfileStarter({ title, image, description }) {
  return (
    <div className="user-profile-starter-wrapper">
      <h1 className="starters-heading-small">{title}</h1>
      <div className="user-profile-description">
        {image && <img src={image} />}
        <p>{description}</p>
      </div>
    </div>
  );
}
