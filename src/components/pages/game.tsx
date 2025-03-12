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
  const [guessCount, setGuessCount] = useState(0);
  const { difficulty } = useParams<{ difficulty: string }>();
  console.log("Difficulty:", difficulty);
  const navigate = useNavigate();
  const [highlightedCountries, setHighlightedCountries] = useState<string[]>([]);
  const [highlightedRegions, setHighlightedRegions] = useState<string[]>([]);

  const { streak, incrementStreak } = useStreak();

  const [randomAnimal, setRandomAnimal] = useState<string>("");
  const [correctCountries, setCorrectCountries] = useState<string[]>([]);

  const [onCloseCallback, setOnCloseCallback] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [showHintPopup, setHintPopUp] = useState(false);
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

  // if (
    //   correctCount === totalCorrect &&
    //   correctCount === highlightedCountries.length
    // ) {
    //   setPopupMessage("Correct! All countries match!");
    //   setOnCloseCallback(true);
    //   setShowPopup(true);
    //   incrementStreak();
    // } else if (
    //   correctCount >= totalCorrect / 2 &&
    //   correctCount === highlightedCountries.length
    // ) {
    //   setPopupMessage(
    //     `You're getting close! (${correctCount}/${totalCorrect})`
    //   );
    //   setShowPopup(true);
    // } else {
    //   setPopupMessage(
    //     `Not quite, try again! (${correctCount}/${totalCorrect})`
    //   );
    //   setShowPopup(true);
    // }

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


    
    switch (true) {
      case (correctCount === totalCorrect && correctCount === highlightedCountries.length):
        setPopupMessage("Correct! All countries match!");
        setOnCloseCallback(true);
        setShowPopup(true);
        incrementStreak();
        console.log(guessCount);
        setGuessCount(0);
        console.log(guessCount);
        break;
      
      case (correctCount >= totalCorrect / 2):
        setGuessCount(guessCount => guessCount + 1);
        console.log(guessCount);
        
        switch (guessCount) {
          case 1 || 2:
            setPopupMessage("You're on the right track! (${correctCount}/${totalCorrect} guessed correctly)")
            break;
 
          default:
            handleShowHintPopup();
            handleCloseHintPopup();
            break;
        }
        break;

      default:

    } 
  };

  const handleCloseHintPopup = () => {
    setHintPopUp(false);
  };

  const handleShowHintPopup = () => {
    setHintPopUp(true);
  };

  const handleHint = () => {
    handleCloseHintPopup();
  }

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


  const continentCountries: Record<string, string[]> = {
    Europe: ["France", "Germany", "Spain", "Italy", "United Kingdom"],
    Africa: ["Nigeria", "Egypt", "South Africa", "Kenya", "Ethiopia", "Madagascar"],
    Asia: ["China", "India", "Japan", "South Korea", "Indonesia"],
    Oceania: ["Australlia", "New Zealand"]
    // Add more continents or regions as needed
  };

  const highlightRegion = (region: string) => {
    setHighlightedRegions(continentCountries[region]);
  };

  return (
    <GameLayout>
      <div className="left-content">
      <button onClick={() => highlightRegion("Europe")}>Highlight Europe</button>
        <StreakKeeper streak={streak} />
        <LoadAnimal randomAnimal={randomAnimal} />
        <GuessList highlightedCountries={highlightedCountries} />
        <FinishButton streak={streak}/>

      </div>
      <div className="right-content">
        <OpenMap
          highlightedCountries={highlightedCountries}
          setHighlightedCountries={setHighlightedCountries}
          highlightedRegions={highlightedRegions}
          setHighlightedRegions={setHighlightedRegions}
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
      )});

      {showHintPopup && (
        <div className="hintPopup">
          <p>{popupMessage}</p>
          <button onClick={handleCloseHintPopup}> Close </button>
          <button onClick={handleHint}> Give Hint </button>

        </div>
      )}
    </GameLayout>
  );
};

export default Game;
