import { useEffect, useState } from "react";
import DisplayCards from "./components/DisplayCards";
import "./App.css";

const cardImages = [
  { src: "./img/earth.jpg" },
  { src: "./img/jupiter.jpg" },
  { src: "./img/mars.jpg" },
  { src: "./img/neptune.jpg" },
  { src: "./img/saturn.jpg" },
  { src: "./img/venus.jpg" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

  const suffleCards = () => {
    const doubleTheCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));

    setCards(doubleTheCards);
    setTurns(0);
  };

  // console.log(cards, "number of turn:", turns);

  const handleChoice = (card) => {
    // console.log(card);
    pickOne ? setPickTwo(card) : setPickOne(card);
  };

  useEffect(() => {
    if (pickOne && pickTwo) {
      setDisabled(true)
      if (pickOne.src === pickTwo.src) {
        // console.log("cards match")
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === pickOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // console.log("cards do not match")
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [pickOne, pickTwo]);

  const resetTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false)
  };

  useEffect(() => {
    suffleCards()
  },[])

  return (
    <div className="App">
      <h1> Card Memory Game</h1>
      <button onClick={suffleCards}>New Game</button>

      <div className="cards-grid">
        {cards.map((card) => (
          <DisplayCards
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === pickOne || card === pickTwo || card.matched}
            disabled={disabled}
            turns={turns}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
