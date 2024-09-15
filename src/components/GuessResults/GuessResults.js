import React from 'react';

import Guess from '../Guess/Guess';

function GuessResults({ guesses }) {
  return (
    <div className='guess-results'>
      {guesses.map(({ id, letters }) => (
        <Guess key={id} letters={letters} />
      ))}
    </div>
  );
}

export default GuessResults;
