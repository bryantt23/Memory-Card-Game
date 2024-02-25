import {useState} from "react";
import "./App.css";
import MemoryGameEasy from "./components/MemoryGameEasy";
import MemoryGameMedium from "./components/MemoryGameMedium";
import MemoryGameHard from "./components/MemoryGameHard";


function App() {
  const [visibleComponent, setVisibleComponent] = useState('easy');

  return (
    <div className="App">
      <h1 className="title">MEMORY CARD GAME</h1>
      <div className="buttons">
        <button className="easy" onClick={() => setVisibleComponent('easy')}>Easy</button>
        <button className="medium" onClick={() => setVisibleComponent('medium')}>Medium</button>
        <button className="hard" onClick={() => setVisibleComponent('hard')}>Hard</button>
      </div>
      {visibleComponent === 'easy' && <MemoryGameEasy />}
      {visibleComponent === 'medium' && <MemoryGameMedium />}
      {visibleComponent === 'hard' && <MemoryGameHard />}
    </div>
  );
}

export default App;
