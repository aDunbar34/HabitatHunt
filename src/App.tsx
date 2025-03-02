import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./components/css/App.css";
import "leaflet/dist/leaflet.css";
import Home from "./components/pages/home";
import Game from "./components/pages/game";
import { StreakProvider } from "./components/contexts/StreakContexts";

function App() {
  return (
    <>
      <StreakProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:difficulty" element={<Game />} />
          </Routes>
        </Router>
      </StreakProvider>
    </>
  );
}

export default App;
