import React from "react";
import TechArtGrid from "../../components/TechArtGrid/TechArtGrid.jsx";
import "./TechArtPage.scss";

const TechArtPage = () => {
  return (
    <div className="work">
      <h2 className="work__title"></h2>

      <TechArtGrid />
      <div className="work__video-container">
        <iframe
          src="https://player.vimeo.com/video/869491875?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          className="work__video"
          title="Rigging Reel 2022"
        ></iframe>
      </div>
    </div>
  );
};

export default TechArtPage;
