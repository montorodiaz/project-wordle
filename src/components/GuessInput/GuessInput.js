import React from 'react';
import { NUM_OF_LETTERS_ALLOWED } from '../../constants';
import { isLetter } from '../../utils';
import latinize from 'latinize';

function GuessInput({ handleGuesses }) {
  const [tentativeGuess, setTentativeGuess] = React.useState('');

  function handleSubmitForm(event) {
    event.preventDefault();

    if (tentativeGuess.length !== NUM_OF_LETTERS_ALLOWED) {
      alert(`Enter ${NUM_OF_LETTERS_ALLOWED} letters!!!`);
      return;
    }

    handleGuesses(tentativeGuess);

    setTentativeGuess('');
  }

  function handleChangeInputGuess(event) {
    const letter = event.target.value;

    if (letter !== '' && !isLetter(letter.slice(-1))) {
      alert('Enter letters!!!');
      return;
    }

    let nextGuessValue = letter;

    nextGuessValue = latinize(nextGuessValue).toUpperCase();

    setTentativeGuess(nextGuessValue);
  }

  return (
    <form className='guess-input-wrapper' onSubmit={handleSubmitForm}>
      <label htmlFor='guess-input'>Enter guess:</label>
      <input
        id='guess-input'
        type='text'
        value={tentativeGuess}
        required={true}
        pattern={`.{${NUM_OF_LETTERS_ALLOWED},}`}
        size={NUM_OF_LETTERS_ALLOWED}
        maxLength={NUM_OF_LETTERS_ALLOWED}
        onChange={handleChangeInputGuess}
        title='Introduce una palabra de cinco letras'
      />
    </form>
  );
}

export default GuessInput;
