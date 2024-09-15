import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';

import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { NUM_OF_LETTERS_ALLOWED } from '../../constants';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import WinBanner from '../WinBanner';
import LostBanner from '../LostBanner';

import { createGuess } from '../../game-helpers';
import { checkGuess } from '../../game-helpers';

import { range } from '../../utils';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  // running, won, and lost
  const [statusGuess, setStatusGuess] = React.useState('running');
  const [tentatives, setTentatives] = React.useState(0);
  const [guesses, setGuesses] = React.useState(() => {
    const emptyWord = Array(NUM_OF_LETTERS_ALLOWED)
      .fill('_')
      .join('');

    return range(NUM_OF_GUESSES_ALLOWED).map(() =>
      createGuess(emptyWord)
    );
  });

  function handleGuesses(/** @type {String} */ tentativeGuess) {
    if (
      tentativeGuess === null ||
      tentativeGuess === undefined ||
      tentativeGuess === '' ||
      typeof tentativeGuess !== 'string' ||
      tentativeGuess.length !== NUM_OF_LETTERS_ALLOWED
    ) {
      throw new Error(
        'handleGuessList: tentativeGuess null undefined string NUM_OF_LETTERS_ALLOWED'
      );
    }

    if (tentatives === NUM_OF_GUESSES_ALLOWED) {
      return;
    }

    const newGuesses = [...guesses];

    if (!newGuesses.hasOwnProperty(tentatives)) {
      throw new Error(
        'handleGuessList: not tentatives in newGuesses'
      );
    }

    const checkedGuess = checkGuess(tentativeGuess, answer);

    if (checkedGuess === null) {
      throw new Error('handleGuessList: checkedGuess null');
    }

    const newGuess = newGuesses[tentatives];
    const nextTentative = tentatives + 1;

    checkedGuess.forEach(({ letter, status }, index) => {
      const newGuessLetter = newGuess.letters[index];
      newGuessLetter.char = letter;
      newGuessLetter.status = status;
    });

    let nextStatusGuess = statusGuess;

    if (tentativeGuess.toUpperCase() === answer) {
      nextStatusGuess = 'won';
    } else if (nextTentative === NUM_OF_GUESSES_ALLOWED) {
      nextStatusGuess = 'lost';
    } else if (nextTentative !== NUM_OF_GUESSES_ALLOWED) {
      nextStatusGuess = 'running';
    }

    setStatusGuess(nextStatusGuess);
    setGuesses(newGuesses);
    setTentatives(nextTentative);
  }

  return (
    <>
      <GuessResults guesses={guesses} />
      {statusGuess === 'running' && (
        <GuessInput handleGuesses={handleGuesses} />
      )}
      {statusGuess === 'won' && <WinBanner tentatives={tentatives} />}
      {statusGuess === 'lost' && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;
