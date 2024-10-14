import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput/GuessInput';
import GuessResult from '../GuessResult/GuessResult';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import LostBanner from '../LostBanner/LostBanner';
import WonBanner from '../WonBanner/WonBanner';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState('running');
  // running, won, and lost.

  function handleSubmitGuess(tentativeGuess) {
    const nextGuesses = [...guesses, tentativeGuess];
    setGuesses(nextGuesses);

    if (tentativeGuess.toUpperCase() === answer) {
      setGameStatus('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  }

  return (
    <>
      <GuessResult guesses={guesses} answer={answer} />
      <GuessInput
        handleSubmitGuess={handleSubmitGuess}
        gameStatus={gameStatus}
      />
      {gameStatus === 'won' && (
        <WonBanner numOfGuesses={guesses.length}></WonBanner>
      )}
      {gameStatus === 'lost' && <LostBanner answer={answer}></LostBanner>}
    </>
  );
}

export default Game;
