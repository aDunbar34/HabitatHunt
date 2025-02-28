import OpenMap from "../../components/tiles/map";
import LoadAnimal from "../../components/tiles/animal";
import GuessList from "../../components/tiles/guessList";
import Submit from "../../components/tiles/submit";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import animalJsonData from "../../JSON/faunajson.json";
import { useNavigate } from "react-router-dom";

function Game() {
  const { difficulty } = useParams<{ difficulty: string }>();
  console.log("Difficulty:", difficulty);
  const navigate = useNavigate();
  const [highlightedCountries, setHighlightedCountries] = useState<string[]>(
    []
  );

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
      "The aim of this game is to make accurate guesses on the native countries of the animal you see on the left side of the screen <br /> You're selected countries will appear to the left as well in the list. Select countries by simply clicking them on the map! <br /> Once you are confident with your answers, hit Submit and see if you gothem all correct!"
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
      navigate(`/game/${difficulty}`, { replace: true }); // navigate to the current difficulty route
      randomize(); // Restart the game by calling the randomize function
      setShowPopup(false);
      setOnCloseCallback(false);
      setHighlightedCountries([]);
    } else {
      setShowPopup(false);
    }
  };

  return (
    <>
      <OpenMap
        highlightedCountries={highlightedCountries}
        setHighlightedCountries={setHighlightedCountries}
      />
      <LoadAnimal randomAnimal={randomAnimal} />
      <GuessList highlightedCountries={highlightedCountries} />
      <Submit
        highlightedCountries={highlightedCountries}
        onSubmit={compareCountries}
      />
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#112240",
            padding: "2rem",
            border: "1px black",
            boxShadow: "0.5px 1px 1px 2px white",
            zIndex: 1000,
            color: "#3490c2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p>{popupMessage}</p>
          <button
            onClick={handleClosePopup}
            style={{
              marginRight: "0.1rem",
              cursor: "pointer",
              color: "#3490c2",
              backgroundColor: "#1b3a4b",
            }}
          >
            {" "}
            Close{" "}
          </button>
        </div>
      )}
      );
    </>
  );
}

export default Game;
