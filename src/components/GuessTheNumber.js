import React, { useState, useEffect } from 'react';
import './GuessTheNumber.css';

function GuessTheNumber() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTargetNumber(Math.floor(Math.random() * 10) + 1);
  }, []);

  const handleGuess = () => {
    const guessNumber = parseInt(guess);
    if (isNaN(guessNumber)) {
      setMessage('Please enter a valid number.');
      return;
    }

    if (guessNumber === targetNumber) {
      setMessage(`You got it! The number was ${targetNumber}.`);
    } else if (guessNumber < targetNumber) {
      setMessage('Too low. Try again.');
    } else {
      setMessage('Too high. Try again.');
    }
  };

  return (
    <div className="guess-number-container">
      <input
        type="number"
        value={guess}
        className="guess-input"
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={handleGuess} className="guess-button">Guess</button>
      <p className="guess-message">{message}</p>
    </div>
  );
}

export default GuessTheNumber; 