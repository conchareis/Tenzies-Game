import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faDiceFive } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((dice) => dice.isHeld === true); // if any of the dice have isHeld as false, it will return false
    // every one of them have to be true so it can return true
    const firstValue = dice[0].value;
    const allSameValue = dice.every((dice) => dice.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
    console.log("You won!");
  }, [dice]); // second paramether because we only want this effect to run when the dice array changes in state

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    //new array to hold my numbers
    const newDice = [];
    //loop 10 times
    for (let i = 0; i < 10; i++) {
      // push a random number from 1 to 6 to my array
      // newDice.push(Math.ceil(Math.random() * 6));
      newDice.push(generateNewDice()); // and is now a object, and not a number
    }
    // return array
    return newDice;
  }

  //  function rollDice() {
  //   setDice(allNewDice());
  // }

  function rollDice() {
    if (!tenzies) {
      // only roll the dice if it does not have tenzies
      setDice((oldDice) =>
        oldDice.map((dice) => {
          return dice.isHeld ? dice : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    // access to the oldDice (old array) to determinate what the new array should be
    setDice((oldDice) =>
      oldDice.map((dice) => {
        // map will return a new array. Almost all dice element will be the same, except one of them wich will have the holdDice changed
        // we will look into each dice element and use a ternary that will say
        // if it is the same dice with the id property that was passed into the function
        // than i will Update that object, and if not i will just return that dice
        return dice.id === id
          ? { ...dice, isHeld: !dice.isHeld } // if it will change, we take all properties and only change the isHeld
          : // if it is not the same id, keep it as it was before
            dice;
      })
    );
  }

  const diceElements = dice.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)} // indentifies which dice were clicked
    />
  ));
  // look at each individual Dice and return a Dice component (<Dice/>) with the value prop with the value of that dice

  <h1>Hover me !</h1>;

  return (
    <div className="up">
      <div>
        {tenzies && (
          <Confetti
            colors={[
              "#E6CEAB",
              "#ABE6D2",
              "#ABE0E6",
              "#C4E6AB",
              "#ABE6BC",
              "#E6ABB9",
              "#E6ABDF",
              "#CCABE6",
              "#FFFFFF",
              "#C4ABE1",
              "#E5D9F5",
              "#84848D",
            ]}
            numberOfPieces="1000"
          />
        )}
        <main>
          {/* {tenzies && <Confetti className="up" />} */}
          <h1 className="title">
            <FontAwesomeIcon
              icon={faDice}
              className="icon_left"
            ></FontAwesomeIcon>
            Tenzies{" "}
            <FontAwesomeIcon
              icon={faDiceFive}
              className="icon_right"
            ></FontAwesomeIcon>
          </h1>

          <p className="instructions">
            Roll until all the dices have the same number. Click each dice to
            freeze it at its current value between rolls.
          </p>
          <div className="dice-container">{diceElements}</div>
          <button className="roll-dice" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </main>
      </div>
    </div>
  );
}
