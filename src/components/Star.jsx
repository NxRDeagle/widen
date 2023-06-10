import React from 'react';

import { userId, mainContext, defaultUser} from '../App';

import users_data from '../data/users_data.json';

import '../css/Star.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Star = ({nickname, avatar, role}) => {
  const navigate = useNavigate();//app
  const location = useLocation();//app

  const { setProfile, setPage, loc } = React.useContext(mainContext);
  const profile = users_data.find((obj) => obj.nickname === nickname) ? users_data.find((obj) => obj.nickname === nickname) : defaultUser;//Можно стейт профайл
  const myProfile = users_data.find((obj) => obj.userId === userId) ? users_data.find((obj) => obj.userId === userId) : defaultUser;//app

  const goToPreview = () => {
    setProfile(profile);
    if (myProfile.viewUsers.find((obj) => obj === profile.userId) || profile.userId === userId) {
        goToProfile();
    } else {
        if (
            location.pathname !== `/user_profile/${profile.nickname}` &&
            location.pathname !== '/profile'
        ) {
            loc.push(location.pathname);
            navigate('/preview');
        }
    }
};

  const goToProfile = () => {
    setProfile(profile);
    profile.userId !== userId
      ? navigate(`/user_profile/${profile.nickname}`)
      : navigate('/profile');
    setPage('profile');
  };

  return (
    <div className="star_box">
      <img onClick={goToPreview} className='star_avatar' src={avatar} alt='avatar' />
      <p className='star_nickname'>{nickname}</p>
      <p className='star_role'>{role}</p>
    </div>
  );
};

export default Star;
