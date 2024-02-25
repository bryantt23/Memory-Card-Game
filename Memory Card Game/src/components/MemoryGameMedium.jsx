import { useState, useRef } from "react";
import "../styles/MemoryGameMedium.css";
import shuffle from "../shuffle";

const items = [1, 2, 3, 4, 5];
const allItems = shuffle([...items, ...items]);
const faceDownState = { index: null, value: null };

export default function MemoryGame() {
  const [firstCard, setFirstCard] = useState(faceDownState);
  const [secondCard, setSecondCard] = useState(faceDownState);
  const [remainingCards, setRemainingCards] = useState(items);
  const [moves, setMoves] = useState(0);

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

  const handleClick = (index, value) => {
    console.log("index", index);
    console.log("firstCard.index", firstCard.index);
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setFirstCard(faceDownState);
      setSecondCard(faceDownState);
    }, 2000);
    if (bothCardsFaceUp()) {
      console.log("both cards face up, wait for times up");
    } else if (firstCardFaceDown()) {
      setSecondCard(faceDownState);
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
        ? `Remaining cards: `
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
      <div className="cardsContainerMedium">
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
