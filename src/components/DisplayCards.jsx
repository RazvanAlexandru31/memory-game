import React from "react";

const DisplayCards = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if(!disabled){
        handleChoice(card);
    }

  };

  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img className="card-front" src={card.src} alt="card front" />
        <img
          className="card-cover"
          src="./img/cover-1.jpg"
          alt="card cover"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default DisplayCards;
