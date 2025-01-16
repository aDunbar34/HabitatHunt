import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
import HomePageTitle from "./components/HomePageTitle";
import Button from "./components/startGameButton";
import OpenMap from "./components/map";
import LoadAnimal from "./components/animal";
import GuessList from "./components/guessList";
import Submit from "./components/submit";
import "leaflet/dist/leaflet.css";

import animalJsonData from "./JSON/faunajson.json";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </>
  );
}

function Home() {
  const navigate = useNavigate();
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
        color="#cafcfb"
        height="10rem"
        onClick={() => navigate("/game")}
        radius="50%"
        width="10rem"
        children="PLAY!"
      />
    </div>
  );
}

function Game() {
  const navigate = useNavigate(); // Initialize the navigate function
  // We can declare this constant here in the parent function to share it across components
  const [highlightedCountries, setHighlightedCountries] = useState<string[]>(
    []
  );
  const [randomAnimal, setRandomAnimal] = useState<string>("");
  const [correctCountries, setCorrectCountries] = useState<string[]>([]);

  // Function to randomize an animal
  const randomize = () => {
    const features = (animalJsonData as any).features;

    if (Array.isArray(features) && features.length > 0) {
      const randomI = Math.floor(Math.random() * features.length);
      const randomFeature = features[randomI];

      const animalName = randomFeature?.properties?.animal || "Unknown Animal";
      const habitat = randomFeature?.properties?.habitat || [];

      const countries = habitat.flat();

      setRandomAnimal(animalName);
      setCorrectCountries(countries);
    }
  };

  useEffect(() => {
    // Randomize an animal on component mount
    randomize();
  }, []);

  const compareCountries = () => {
    // Account for no countries being selected
    if (highlightedCountries.length === 0) {
      alert("No countries selected!");
      return;
    }

    // Compare highlightedCountries with correctCountries
    const matches = highlightedCountries.filter((country) =>
      correctCountries.includes(country)
    );

    if (
      matches.length === correctCountries.length &&
      matches.length === highlightedCountries.length
    ) {
      alert("Correct! All countries match!");
      navigate("/"); // Navigate to the desired route
    } else {
      alert("Some countries do not match!");
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
    </>
  );
}

export default App;
