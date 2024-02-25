import { useState } from "react";
import "./App.css";
import MemoryGameEasy from "./components/MemoryGameEasy";
import MemoryGameMedium from "./components/MemoryGameMedium";
import MemoryGameHard from "./components/MemoryGameHard";

function App() {
  const [visibleComponent, setVisibleComponent] = useState("easy");

  //Other alternative for component visibility
  // function generateComponent() {
  //   switch (visibleComponent) {
  //     case "easy":
  //       return <MemoryGameEasy />;
  //     case "medium":
  //       return <MemoryGameMedium />;
  //     case "hard":
  //       return <MemoryGameHard />;
  //     default:
  //       return "something went wrong";
  //   }
  // }

  return (
    <div className="App">
      <h1 className="title">MEMORY CARD GAME</h1>
      <div className="buttons">
        <button className="btn" onClick={() => setVisibleComponent("easy")}>
          Easy
        </button>
        <button
          className="btn"
          onClick={() => setVisibleComponent("medium")}
        >
          Medium
        </button>
        <button className="btn" onClick={() => setVisibleComponent("hard")}>
          Hard
        </button>
      </div>
      {visibleComponent === "easy" && <MemoryGameEasy />}
      {visibleComponent === "medium" && <MemoryGameMedium />}
      {visibleComponent === "hard" && <MemoryGameHard />}
      {/* Call function for other alternative */}
      {/* {generateComponent()} */}
    </div>
  );
}

export default App;
