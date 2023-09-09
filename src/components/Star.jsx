import React from 'react';

import {mainContext} from '../App';

import '../css/Star.css';

const Star = (props) => {

  const { goToPreview } = React.useContext(mainContext);
  
  const userProfile = props;

  return (
    <div className="star_box">
      <img loading='lazy' onClick={() => goToPreview(userProfile)} className='star_avatar' src={userProfile.avatar} alt='avatar' />
      <p className='star_nickname'>{userProfile.nickname}</p>
      <p className='star_role'>{userProfile.role}</p>
    </div>
  );
};

export default Star;
