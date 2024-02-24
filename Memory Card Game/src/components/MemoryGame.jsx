import React from "react";
import "../styles/MemoryGame.css";
import shuffle from "../shuffle";

const items = [1, 2, 3, 4, 5];
const allItems = shuffle([...items, ...items]);

const handleClick = () => {};

export default function MemoryGame() {
  return (
    <>
      <div className="cardsContainer">
        {allItems.map((item, index) => {
          return (
            <div key={index} className="card" onClick={handleClick}>
              <div className="backSide"></div>
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
}
