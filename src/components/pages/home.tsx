import { useNavigate } from "react-router-dom";
import { useState } from "react";

import HomePageTitle from "../../components/tiles/HomePageTitle";
import "../css/components.css";

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const navigate = useNavigate();
  const handleNavigate = (difficulty: string) => {
    navigate(`/game/${difficulty}`);
  };

  const handleBeginClick = () => {
    setShowPopup(true);
    setShowButtons(false);
  };

  const handleScoreboardNav = () => {
    setShowButtons(false);
    navigate("/scoreboard");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        color: "dark green",
      }}
    >
      <h1>
        <HomePageTitle />
      </h1>

      {showButtons && (
        <>
          <div className="beginButton">
            <button onClick={handleBeginClick}>BEGIN GAME!</button>
          </div>

          <div className="scoreboardButton">
            <button onClick={handleScoreboardNav}>SCOREBOARD</button>
          </div>
        </>
      )}

      {showPopup && (
        <div className="difficultyPopup">
          <button
            onClick={() => handleNavigate("easy")}
            style={{ marginRight: "0.1rem", cursor: "pointer" }}
          >
            Easy
          </button>
          <button
            onClick={() => handleNavigate("medium")}
            style={{ marginRight: "0.1rem", cursor: "pointer" }}
          >
            Medium
          </button>
          <button
            onClick={() => handleNavigate("hard")}
            style={{ marginRight: "0.1rem", cursor: "pointer" }}
          >
            Hard
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
