import { useState, useRef } from "react";
import "../styles/MemoryGame.css";
import shuffle from "../shuffle";

const difficulties = {
  easy: 6,
  medium: 10,
  hard: 14,
};

const generateItems = (difficulty) => {
  const baseItems = [1, 2, 3, 4, 5];
  const items = [...baseItems, ...baseItems];
  return shuffle(items.slice(0, difficulties[difficulty]));
};

const defaultState = { index: null, value: null };

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState("easy");
  const [firstCard, setFirstCard] = useState(defaultState);
  const [secondCard, setSecondCard] = useState(defaultState);
  const [remainingCards, setRemainingCards] = useState(generateItems(difficulty));
  const [moves, setMoves] = useState(0);

  const timer = useRef();

  const handleClick = (index, value) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setFirstCard(defaultState);
      setSecondCard(defaultState);
    }, 2000);

    if (
      firstCard.index === null ||
      (firstCard.index !== null && secondCard.index !== null)
    ) {
      setSecondCard(defaultState);
      setFirstCard({ index, value });
      setMoves((moves) => moves + 1);
    } else if (secondCard.index === null && firstCard.index !== index) {
      setSecondCard({ index, value });
      setMoves((moves) => moves + 1);

      if (firstCard.value === value) {
        setRemainingCards(remainingCards.filter((card) => card !== value));
      }
    }
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setRemainingCards(generateItems(newDifficulty));
    setFirstCard(defaultState);
    setSecondCard(defaultState);
    setMoves(0);
  };

  return (
    <>
      <div className="difficulty-buttons">
        <button
          className={difficulty === "easy" ? "active" : ""}
          onClick={() => handleDifficultyChange("easy")}
        >
          Easy
        </button>
        <button
          className={difficulty === "medium" ? "active" : ""}
          onClick={() => handleDifficultyChange("medium")}
        >
          Medium
        </button>
        <button
          className={difficulty === "hard" ? "active" : ""}
          onClick={() => handleDifficultyChange("hard")}
        >
          Hard
        </button>
      </div>
      {remainingCards.length > 0
        ? `Remaining cards: `
        : "You found all the matches!"}
      {remainingCards.map((card, index) => {
        return (
          <img
            key={index}
            alt={`cat ${index}`}
            src={`https://robohash.org/${card}?set=set4&&size=80x80`}
          />
        );
      })}
      <div className="cardsContainer">
        {generateItems(difficulty).map((item, index) => {
          return (
            <div
              key={index}
              className={`card ${
                (firstCard.index === index ||
                  secondCard.index === index ||
                  !remainingCards.includes(item)) &&
                "flipped"
              }`}
              onClick={() => handleClick(index, item)}
            >
              <div className="backSide"></div>
              <img
                alt={`cat ${index}`}
                src={`https://robohash.org/${item}?set=set4&&size=120x120`}
              />
            </div>
          );
        })}
      </div>
      Moves used: {moves}
    </>
  );
}
