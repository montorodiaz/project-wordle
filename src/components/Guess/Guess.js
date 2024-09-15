import React from 'react';

function Guess({ letters }) {
  return (
    <p className='guess'>
      {letters.map(({ id, char, status }) => (
        <Cell key={id} char={char} status={status} />
      ))}
    </p>
  );
}

function Cell({ char, status }) {
  const statusCell = status !== '' ? `cell ${status}` : 'cell';

  return (
    <span className={statusCell}>
      {char === '_' ? <>&nbsp;</> : char}
    </span>
  );
}

export default Guess;
