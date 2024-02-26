import { useState, useRef } from "react";
import "../styles/MemoryGameEasy.css";
import "../styles/MemoryGameMedium.css";
import "../styles/MemoryGameHard.css";
import shuffle from "../shuffle";

const items = [1, 2, 3, 4, 5];
const faceDownState = { index: null, value: null };

export default function MemoryGame({ className, items }) {
  const [firstCard, setFirstCard] = useState(faceDownState);
  const [secondCard, setSecondCard] = useState(faceDownState);
  const [remainingCards, setRemainingCards] = useState(items);
  const [moves, setMoves] = useState(0);
  const [allItems] = useState(shuffle([...items, ...items]))
  console.log("🚀 ~ MemoryGame ~ allItems:", allItems)

  const timer = useRef();

  function bothCardsFaceUp() {
    return firstCard.index !== null && secondCard.index !== null;
  }

  function firstCardFaceDown() {
    return firstCard.index === null;
  }

  function isValidMove(index) {
    return secondCard.index === null && firstCard.index !== index;
  }

  function getStyle(item, index) {
    if (
      !remainingCards.includes(item)
    ) {
      return "flipped disabled";
    }
    if (
      firstCard.index === index ||
      secondCard.index === index
    ) {
      return "flipped";
    }
    return "";
  }

  const handleClick = (index, value) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setFirstCard(faceDownState);
      setSecondCard(faceDownState);
    }, 2000);
    if (bothCardsFaceUp()) {
      console.log("both cards face up, wait for times up");
    } else if (firstCardFaceDown()) {
      setFirstCard({ index, value });
      setMoves((moves) => moves + 1);
    } else if (isValidMove(index)) {
      setSecondCard({ index, value });
      setMoves((moves) => moves + 1);
      if (firstCard.value === value) {
        setRemainingCards(remainingCards.filter((card) => card !== value));
      }
    }
  };

  return (
    <>
      {remainingCards.length > 0
        ? `Remaining cat cards: `
        : "You found the matches!"}
      {remainingCards.map((card, index) => {
        return (
          <img
            key={index}
            alt={`cat ${index}`}
            src={`https://robohash.org/${card}?set=set4&&size=80x80`}
          />
        );
      })}
      <div className={`cardsContainer ${className}`}>
        {allItems.map((item, index) => {
          return (
            <div
              key={index}
              className={`card ${getStyle(item, index)}`}
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
