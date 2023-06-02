import React from 'react';

import { userId, mainContext } from '../App';

import users_data from '../data/users_data.json';

import '../css/Star.css';
import { useNavigate } from 'react-router-dom';

const Star = ({ img, nickname }) => {
  const navigate = useNavigate();
  const { setProfile, setPage } = React.useContext(mainContext);

  const goToProfile = () => {
    const profile = users_data.find((obj) => obj.nickname === nickname);
    setProfile(profile);
    profile.userId !== userId
      ? navigate(`/user_profile/${profile.nickname}`)
      : navigate('/profile');
    setPage('profile');
  };

  return (
    <div className="star" onClick={goToProfile}>
      <img src={img} className="star_avatar" alt="interest icon" />
      <p className="star_nick">{nickname}</p>
    </div>
  );
};

export default Star;
