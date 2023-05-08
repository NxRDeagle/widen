import React from 'react';

import '../css/Sphere.css';

const Sphere = ({ sign, bg }) => {
  return (
    <div className="interest">
      <div className="interest_sphere"></div>
      <p className="interest_sign">{sign ? sign : 'TestTestTest'}</p>
    </div>
  );
};

export default Sphere;
