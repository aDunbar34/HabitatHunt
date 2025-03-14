import { useNavigate } from "react-router-dom";
import { useState} from "react";

import HomePageTitle from "../../components/tiles/HomePageTitle";
import Button from "../../components/tiles/startGameButton";
import "../css/components.css";

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (difficulty: string) => {
    navigate(`/game/${difficulty}`);
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
      <Button
        border="3px solid #ccc"
        height="10rem"
        onClick={() => setShowPopup(true)}
        radius="50%"
        width="10rem"
        children="Begin Game!"
        hover="scale-105"
      />

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
