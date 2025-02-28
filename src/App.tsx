import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./components/css/App.css";
import "leaflet/dist/leaflet.css";
import Home from "./components/pages/home";
import Game from "./components/pages/game";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:difficulty" element={<Game />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
