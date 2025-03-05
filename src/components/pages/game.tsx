import OpenMap from "../../components/tiles/map";
import LoadAnimal from "../../components/tiles/animal";
import GuessList from "../../components/tiles/guessList";
import Submit from "../../components/tiles/submit";
import StreakKeeper from "../../components/tiles/streakKeeper";
import GameLayout from "../layouts/GameLayout";
import FinishButton from "../tiles/finishButton";
import { useStreak } from "../contexts/StreakContexts";

import "../css/components.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import animalJsonData from "../../JSON/faunajson.json";
import { useNavigate } from "react-router-dom";

const Game: React.FC = () => {
  const { difficulty } = useParams<{ difficulty: string }>();
  console.log("Difficulty:", difficulty);
  const navigate = useNavigate();
  const [highlightedCountries, setHighlightedCountries] = useState<string[]>(
    []
  );

  const { streak, incrementStreak } = useStreak();

  const [randomAnimal, setRandomAnimal] = useState<string>("");
  const [correctCountries, setCorrectCountries] = useState<string[]>([]);

  const [onCloseCallback, setOnCloseCallback] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");

  const randomize = () => {
    const features = (animalJsonData as any).features;

    if (Array.isArray(features) && features.length > 0) {
      // Filter animals based on difficulty
      const filteredAnimals = features.filter(
        (feature) =>
          feature?.properties?.difficulty?.toLowerCase() ===
          difficulty?.toLowerCase()
      );
      const randomI = Math.floor(Math.random() * filteredAnimals.length);
      const randomFeature = filteredAnimals[randomI];

      const animalName = randomFeature?.properties?.animal || "Unknown Animal";
      const habitat = randomFeature?.properties?.habitat || [];

      const countries = habitat.flat();

      setRandomAnimal(animalName);
      setCorrectCountries(countries);
    }
  };

  useEffect(() => {
    setPopupMessage(
      "The aim of this game is to make accurate guesses on the native countries of the animal you see on the left side of the screen. Your selected countries will appear to the left as well in the list. Select countries by simply clicking them on the map! Once you are confident with your answers, hit Submit and see if you got them all correct! As an extra bit of fun, try and see how many you can get in a row!"
    );
    randomize();
  }, []);

  const compareCountries = () => {
    if (highlightedCountries.length === 0) {
      setPopupMessage("No countries selected!");
      setShowPopup(true);
      return;
    }

    const matches = highlightedCountries.filter((country) =>
      correctCountries.includes(country)
    );

    const totalCorrect = correctCountries.length;
    const correctCount = matches.length;

    if (
      correctCount === totalCorrect &&
      correctCount === highlightedCountries.length
    ) {
      setPopupMessage("Correct! All countries match!");
      setOnCloseCallback(true);
      setShowPopup(true);
      incrementStreak();
    } else if (
      correctCount >= totalCorrect / 2 &&
      correctCount === highlightedCountries.length
    ) {
      setPopupMessage(
        `You're getting close! (${correctCount}/${totalCorrect})`
      );
      setShowPopup(true);
    } else {
      setPopupMessage(
        `Not quite, try again! (${correctCount}/${totalCorrect})`
      );
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    if (onCloseCallback == true) {
      navigate(`/game/${difficulty}`, { replace: true });
      randomize();
      setShowPopup(false);
      setOnCloseCallback(false);
      setHighlightedCountries([]);
    } else {
      setShowPopup(false);
    }
  };

  return (
    <GameLayout>
      <div className="left-content">
        <StreakKeeper streak={streak} />
        <LoadAnimal randomAnimal={randomAnimal} />
        <GuessList highlightedCountries={highlightedCountries} />
        <FinishButton streak={streak}/>

      </div>
      <div className="right-content">
        <OpenMap
          highlightedCountries={highlightedCountries}
          setHighlightedCountries={setHighlightedCountries}
        />
        <Submit
          highlightedCountries={highlightedCountries}
          onSubmit={compareCountries}
        />
      </div>
      {showPopup && (
        <div className="PopupMessage">
          <p>{popupMessage}</p>
          <button onClick={handleClosePopup}> Close </button>
        </div>
      )}
      );
    </GameLayout>
  );
};

export default Game;
