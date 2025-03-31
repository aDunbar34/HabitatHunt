import OpenMap from "../../components/tiles/map";
import LoadAnimal from "../../components/tiles/animal";
import GuessList from "../../components/tiles/guessList";
import Submit from "../../components/tiles/submit";
import StreakKeeper from "../../components/tiles/streakKeeper";
import GameLayout from "../layouts/GameLayout";
import { useStreak } from "../contexts/StreakContexts";

import "../css/components.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import animalJsonData from "../../JSON/faunajson.json";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient.ts";

const Game: React.FC = () => {
  const [guessCount, setGuessCount] = useState(0);
  const [randomAnimal, setRandomAnimal] = useState<string>("");

  const { difficulty } = useParams<{ difficulty: string }>();
  const navigate = useNavigate();
  const [highlightedCountries, setHighlightedCountries] = useState<string[]>(
    []
  );
  const [highlightedRegions, setHighlightedRegions] = useState<string[]>([]);
  const [hint, sethint] = useState(false);

  const { streak, incrementStreak, resetStreak } = useStreak();
  const [correctCountries, setCorrectCountries] = useState<string[]>([]);
  const [finishedAnimals, setFinishedAnimals] = useState<
    { id: number; name: string }[]
  >([]);

  const [onCloseCallback, setOnCloseCallback] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [showHintPopup, setShowHintPopUp] = useState(false);
  const [showExitPopup, setShowExitPopUp] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [hintPopupMessage, setHintPopUpMessage] = useState("");
  const [exitPopupMessage, setExitPopupMessage] = useState("");
  const [scoreNickname, setScoreNickname] = useState("");

  // Randomize the animal we've to guess from the faunaJSON (of the specified difficulty)
  const randomize = () => {
    const features = (animalJsonData as any).features;
    if (Array.isArray(features) && features.length > 0) {
      // Filter animals based on difficulty
      const filteredAnimals = features.filter(
        (feature) =>
          feature?.properties?.difficulty?.toLowerCase() ===
          difficulty?.toLowerCase()
      );

      const finishedAnimalNames = finishedAnimals.map((animal) => animal.name);

      let availableAnimals = filteredAnimals.filter(
        (animal) => !finishedAnimalNames.includes(animal?.properties?.animal)
      );

      if (availableAnimals.length === 0) {
        availableAnimals = filteredAnimals;
      }

      const randomI = Math.floor(Math.random() * availableAnimals.length);
      const randomFeature = availableAnimals[randomI];

      const animalName = randomFeature?.properties?.animal || "Unknown Animal"; // Set the animal name to the random animal selected (or unknown if unable to find)
      const habitat = randomFeature?.properties?.habitat || []; // Set the list of countries to match the habitat of the animal

      const countries = habitat.flat(); // Easier to work with when we flatten it

      setRandomAnimal(animalName);
      setCorrectCountries(countries);
    }
  };

  useEffect(() => {
    resetStreak();
    setPopupMessage(
      "The aim of this game is to make accurate guesses on the native countries of the animal you see on the left side of the screen. Your selected countries will appear to the left as well in the list. Select countries by simply clicking them on the map! Once you are confident with your answers, hit Submit and see if you got them all correct! As an extra bit of fun, try and see how many you can get in a row!"
    );
    setExitPopupMessage(
      "Would you like to save your score under a nickname on the scoreboard?"
    );
    randomize();
    setFinishedAnimals([]);
    console.log(finishedAnimals);
    console.log("showHintPopup state changed:", showHintPopup);
  }, []);

  const updateFinishedAnimals = () => {
    setFinishedAnimals((prevAnimals) => [
      ...prevAnimals,
      { id: prevAnimals.length + 1, name: randomAnimal },
    ]);
  };

  // This function compares the selected countries of the user to the correct list of countries
  const compareCountries = () => {
    // Evaluate no countries being selected
    if (highlightedCountries.length === 0) {
      setPopupMessage("No countries selected!");
      setShowPopup(true);
      return;
    }

    const matches = highlightedCountries.filter((country) =>
      correctCountries.includes(country)
    );

    const totalCorrect = correctCountries.length; // Number of answers for the current animal
    const correctCount = matches.length; // Number of countries guessed correctly

    // See if the player has guessed them all correctly
    if (
      correctCount === totalCorrect &&
      correctCount === highlightedCountries.length
    ) {
      // When the user guesses all correct
      setPopupMessage("Correct! All countries match!");
      setOnCloseCallback(true);
      setHighlightedRegions([]); // Remove the highlight from selected countries
      setShowPopup(true); // Show the "Correct" popup to show they've got it right
      incrementStreak(); // Increase the player's streak
      setGuessCount(0); // Reset guess count so user's don't immediately get a hint
      sethint(false); // Clear any hints on the map already
      updateFinishedAnimals();
    } else {
      setGuessCount((prevGuessCount) => prevGuessCount + 1); // Increase the guess count

      if (guessCount <= 2) {
        // When the user has not guessed all correct
        if (matches.length >= 1) {
          // When the user has guessed at least 1 correct country
          setPopupMessage(
            `You're on the right track! (${correctCount}/${totalCorrect} guessed correctly)`
          );
          setShowPopup(true);
        } else {
          // When the user has guessed no countries (probably don't need this here)
          setPopupMessage("No correct countries guessed there! Keep trying!");
          setShowPopup(true);
        }
      } else if (guessCount == 3) {
        // When the user has guessed exactly 3 times (incorrectly)
        if (matches.length >= 1) {
          // When the user has guessed at least 1 correct country
          setPopupMessage(
            `You're getting close! (${correctCount}/${totalCorrect} guessed correctly)`
          );
          setShowPopup(true);
        } else {
          // When the user has guessed no correct countries
          setPopupMessage("No correct countries guessed there! Keep trying!");
          setShowPopup(true);
        }
      } else {
        // 4 attempts and beyond

        if (hint == false) {
          // When the user has not accepted any hints
          setHintPopUpMessage(
            `Need a hint? Click the button below to highlight the continents where this animal lives. (${correctCount}/${totalCorrect} guessed correctly)`
          );
          setShowHintPopUp(true);
          sethint(true);
        } else if (matches.length >= 1) {
          // When the user has accepted a hint
          // When the user has guessed at least 1 correct country
          setPopupMessage(
            `You're getting close! (${correctCount}/${totalCorrect} guessed correctly)`
          );
          setShowPopup(true);
        } else {
          // When the user has accepted a hint
          // When the user has guessed no correct countries
          setPopupMessage("No correct countries guessed there! Keep trying!");
          setShowPopup(true);
        }
      }
    }
  };

  type AnimalFeature = {
    properties: {
      animal: string;
      difficulty: string;
      habitat: string[];
      continent: string[];
    };
  };

  // This is where we handle getting the continent of the animal for the hint
  const handleHint = () => {
    handleCloseHintPopup(); // Close hint popup
    if (!randomAnimal) return;

    const animalData = (animalJsonData as any).features.find(
      (feature: AnimalFeature) => feature.properties.animal === randomAnimal
    ); // Redeclare the animal data for us to work with

    if (animalData && animalData.properties.continent) {
      console.log("Hint Regions:", animalData.properties.continent);

      // Collect countries from all mentioned continents
      const allCountries = animalData.properties.continent.flatMap(
        (region: string) => continentCountries[region] || []
      ); // Ensures undefined values are skipped

      setHighlightedRegions((prev) => [...new Set([...prev, ...allCountries])]); // This is where the selected continents are highlighted for the hint
    }
  };

  // Simply for closing the hint popup
  const handleCloseHintPopup = () => {
    setShowHintPopUp(false);
  };

  const handleClosePopup = () => {
    if (onCloseCallback) {
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
    Europe: [
      "Albania",
      "Andorra",
      "Austria",
      "Belarus",
      "Belgium",
      "Bosnia and Herzegovina",
      "Bulgaria",
      "Croatia",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Estonia",
      "Finland",
      "France",
      "Germany",
      "Greece",
      "Hungary",
      "Iceland",
      "Ireland",
      "Italy",
      "Kosovo",
      "Latvia",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Malta",
      "Moldova",
      "Monaco",
      "Montenegro",
      "Netherlands",
      "North Macedonia",
      "Norway",
      "Poland",
      "Portugal",
      "Romania",
      "Russia",
      "San Marino",
      "Serbia",
      "Slovakia",
      "Slovenia",
      "Spain",
      "Sweden",
      "Switzerland",
      "Ukraine",
      "United Kingdom",
      "Vatican City",
      "Republic of Serbia",
      "Macedonia",
    ],
    Africa: [
      "Algeria",
      "Angola",
      "Benin",
      "Botswana",
      "Burkina Faso",
      "Burundi",
      "Cabo Verde",
      "Cameroon",
      "Central African Republic",
      "Chad",
      "Comoros",
      "Democratic Republic of the Congo",
      "Djibouti",
      "Egypt",
      "Equatorial Guinea",
      "Eritrea",
      "Eswatini",
      "Ethiopia",
      "Gabon",
      "Gambia",
      "Ghana",
      "Guinea",
      "Guinea-Bissau",
      "Ivory Coast",
      "Kenya",
      "Lesotho",
      "Liberia",
      "Libya",
      "Madagascar",
      "Malawi",
      "Mali",
      "Mauritania",
      "Mauritius",
      "Morocco",
      "Mozambique",
      "Namibia",
      "Niger",
      "Nigeria",
      "Republic of the Congo",
      "Rwanda",
      "São Tomé and Príncipe",
      "Senegal",
      "Seychelles",
      "Sierra Leone",
      "Somalia",
      "South Africa",
      "South Sudan",
      "Sudan",
      "Tanzania",
      "Togo",
      "Tunisia",
      "Uganda",
      "Zambia",
      "Zimbabwe",
      "United Republic of Tanzania",
      "Somaliland",
      "Western Sahara",
      "Guinea Bissau",
      "Swaziland",
    ],
    Asia: [
      "China",
      "India",
      "Japan",
      "South Korea",
      "Indonesia",
      "Afghanistan",
      "Armenia",
      "Azerbaijan",
      "Bahrain",
      "Bangladesh",
      "Bhutan",
      "Brunei",
      "Cambodia",
      "Cyprus",
      "Georgia",
      "Iran",
      "Iraq",
      "Israel",
      "Jordan",
      "Kazakhstan",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Lebanon",
      "Malaysia",
      "Maldives",
      "Mongolia",
      "Myanmar",
      "Nepal",
      "North Korea",
      "Oman",
      "Pakistan",
      "Palestine",
      "Philippines",
      "Qatar",
      "Saudi Arabia",
      "Singapore",
      "Sri Lanka",
      "Syria",
      "Tajikistan",
      "Thailand",
      "Timor-Leste",
      "Turkey",
      "Turkmenistan",
      "United Arab Emirates",
      "Uzbekistan",
      "Vietnam",
      "Yemen",
      "Taiwan",
      "West Bank",
      "Northern Cyprus",
      "Russia",
    ],
    Oceania: [
      "Australia",
      "New Zealand",
      "Fiji",
      "Kiribati",
      "Marshall Islands",
      "Micronesia",
      "Nauru",
      "Palau",
      "Papua New Guinea",
      "Solomon Islands",
      "Tuvalu",
      "Vanuatu",
      "New Caledonia",
    ],
    SouthAmerica: [
      "Brazil",
      "Colombia",
      "Venezuela",
      "French Guiana",
      "Suriname",
      "Guyana",
      "Ecuador",
      "Peru",
      "Bolivia",
      "Chile",
      "Paraguay",
      "Argentina",
      "Uruguay",
      "Falkland Islands",
      "Puerto Rico",
    ],
    NorthAmerica: [
      "United States of America",
      "The Bahamas",
      "Barbados",
      "Belize",
      "Canada",
      "Costa Rica",
      "Cuba",
      "Dominican Republic",
      "Dominica",
      "El Salvador",
      "Grenada",
      "Guatemala",
      "Haiti",
      "Honduras",
      "Jamaica",
      "Mexico",
      "Nicaragua",
      "Panama",
      "Trinidad and Tobago",
      "Puerto Rico",
      "Bermuda",
      "Greenland",
    ],
    Antarctica: ["Antarctica"],
  };

  const handleSubmitName = async () => {
    console.log(scoreNickname);

    if (!scoreNickname) {
      alert("Please enter a nickname!");
      return;
    }
    const { error } = await supabase
      .from("scoreboard")
      .insert([{ nickname: scoreNickname, streak: streak }]);

    if (error) {
      console.error("Error inserting player data: ", error);
    } else {
      console.log("Player streak added successfully");
      setShowExitPopUp(false);
      handleEndRun();
    }
  };

  const handleEndRun = () => {
    navigate("/");
  };

  return (
    <GameLayout>
      <div className="left-content">
        <StreakKeeper streak={streak} />
        <LoadAnimal randomAnimal={randomAnimal} />
        <GuessList highlightedCountries={highlightedCountries} />
        <div className="finishButton">
          <button onClick={() => setShowExitPopUp(true)}>End Run</button>
        </div>
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
      )}
      {showHintPopup && (
        <div className="hintPopup">
          <p>{hintPopupMessage}</p>
          <div className="buttonContainer">
            <button onClick={handleCloseHintPopup}> No Thanks </button>
            <button onClick={handleHint}> Give Hint </button>
          </div>
        </div>
      )}
      {showExitPopup && (
        <div className="exitPopup">
          <p>{exitPopupMessage}</p>
          <label>
            Nickname:{" "}
            <input
              name="scoreNickname"
              value={scoreNickname}
              onChange={(e) => setScoreNickname(e.target.value)}
            />
          </label>
          <div className="buttonContainer">
            <button onClick={handleEndRun}>No Thanks</button>
            <button onClick={handleSubmitName}>Submit</button>
          </div>
        </div>
      )}
    </GameLayout>
  );
};

export default Game;
