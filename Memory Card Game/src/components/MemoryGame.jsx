import React from "react";
import { useState } from "react";
import "../styles/MemoryGame.css";
import shuffle from "../shuffle";

const items = [1, 2, 3, 4, 5];
const allItems = shuffle([...items, ...items]);
const defaultState = { index: null, value: null };

const handleClick = () => {};

export default function MemoryGame() {
  const [firstCard, setFirstCard] = useState(defaultState);
  const [secondCard, setSecondCard] = useState(defaultState);
  const [remainingCards, setRemainingCards] = useState(items);
  const [moves, setMoves] = useState(0);

  return (
    <>
      <div className="cardsContainer">
        {allItems.map((item, index) => {
          return (
            <div
              key={index}
              className={`card ${
                (firstCard.index === index ||
                  secondCard.index === index ||
                  !remainingCards.includes(item)) &&
                "flipped"
              }`}
              onClick={handleClick}
            >
              <div className="backSide"></div>
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
}
