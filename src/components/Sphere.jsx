import React from 'react';

import '../css/Sphere.css';

const Sphere = ({ sign, bg, icon }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  let image = require(`../img/spheres/icon${icon}.png`);
  const selectInterest = () => {
    setIsSelected(!isSelected);
    isSelected
      ? document.querySelector('.interest_sphere').classList.remove('interest_selected')
      : document.querySelector('.interest_sphere').classList.add('interest_selected');
  };

  return (
    <div className="interest" onClick={selectInterest}>
      <div className="interest_sphere" style={{ backgroundImage: `url('${bg}')` }}>
        <img src={image} className="interest_icon" alt="interest icon" />
      </div>
      <p className="interest_sign">{sign ? sign : 'TestTestTest'}</p>
    </div>
  );
};

export default Sphere;
