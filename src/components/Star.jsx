import React from 'react';

import {mainContext} from '../App';

import '../css/Star.css';

const Star = (props) => {

  const { goToPreview } = React.useContext(mainContext);
  
  const profile = props;

  return (
    <div className="star_box">
      <img onClick={() => goToPreview(profile)} className='star_avatar' src={profile.avatar} alt='avatar' />
      <p className='star_nickname'>{profile.nickname}</p>
      <p className='star_role'>{profile.role}</p>
    </div>
  );
};

export default Star;
