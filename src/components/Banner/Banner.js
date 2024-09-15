import React from 'react';

function Banner({ type = 'happy', children }) {
  return <div className={`${type} banner`}>{children}</div>;
}

export default Banner;
