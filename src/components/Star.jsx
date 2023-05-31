import React from 'react';

import '../css/Star.css';

const Star = ({ img, nickname }) => {
  const goToProfile = () => {
    console.log('click!');
  };

  return (
    <div className="star" onClick={goToProfile}>
      <div className="star_sphere">
        <img src={img} className="star_avatar" alt="interest icon" />
      </div>
      <p className="star_nick">{nickname}</p>
    </div>
  );
};

export default Star;
