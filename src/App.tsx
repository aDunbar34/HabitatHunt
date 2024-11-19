import "./App.css";
import HomePageTitle from "./components/HomePageTitle";
import Button from "./components/startGameButton";

function App() {
  return <>
    <h1><HomePageTitle></HomePageTitle></h1>
    <Button
      border="dashed"
      color="grey"
      height = "10rem"
      onClick={() => alert("Click")}
      radius = "50%"
      width = "10rem"
      children = "Play!"
    />

  </>;
}

export default App;
