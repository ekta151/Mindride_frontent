import React, { useState } from 'react';
import './RockPaperScissors.css';

function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const choices = ['rock', 'paper', 'scissors'];

  const handleUserChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(computerChoice);
    determineWinner(choice, computerChoice);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult('It\'s a tie!');
    } else if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      setResult('You win!');
      setUserScore((prevScore) => prevScore + 1);
    } else {
      setResult('Computer wins!');
      setComputerScore((prevScore) => prevScore + 1);
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setUserScore(0);
    setComputerScore(0);
  };

  return (
    <div className="rps-container">
      <h1>Rock Paper Scissors</h1>
      <div className="score-board">
        <div className="score">
          <p>User: {userScore}</p>
        </div>
        <div className="score">
          <p>Computer: {computerScore}</p>
        </div>
      </div>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleUserChoice(choice)}>
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>
      {userChoice && computerChoice && (
        <div className="results">
          <p>You chose: {userChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <p>{result}</p>
        </div>
      )}
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default RockPaperScissors; 