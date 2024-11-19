import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import "./App.css";
import HomePageTitle from "./components/HomePageTitle";
import Button from "./components/startGameButton";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/game" element={<Game />}/>
      </Routes>
    </Router>
    </>
  )
}

function Home() {
  const navigate = useNavigate();
  
  return <>
    <h1><HomePageTitle /></h1>
    <Button
      border="dashed"
      color="grey"
      height="10rem"
      onClick={() => navigate('/game')}
      radius="50%"
      width="10rem"
      children="Play!"
    />
  </>
}

function Game() {
  return <>
   <h1>Welcome to the Game Page!</h1>;
  </>
}


export default App;
