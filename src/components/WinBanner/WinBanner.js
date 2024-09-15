import React from 'react';
import Banner from '../Banner/Banner';
function WinBanner(tentatives) {
  return (
    <Banner type={'happy'}>
      <p>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>
          {tentatives === 1 ? '1 guess' : `${tentatives} guesses`}
        </strong>
        .
      </p>
    </Banner>
  );
}

export default WinBanner;
