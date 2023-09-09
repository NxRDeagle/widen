import React from 'react';

import { mainContext } from '../App';

import '../css/Preview.css';

const Preview = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);//Comp

  const { navigate, userProfile, Conversion, message, goToProfile, goBack } = React.useContext(mainContext);

  let subsriptions = Conversion('count', userProfile.subscribers.length);
  let subscribers = Conversion('count', userProfile.subscribers.length);

  React.useEffect(() => {
    if (!userProfile.nickname) {
      navigate('*');
    }
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div
        className="preview_user_container"
        style={
          isLoaded ? { background: `url(${userProfile.background})` } : { backgroundColor: '#7e52ee' }
        }>
        <div className="preview_user_avatar">
          <img loading='lazy' className="avatar_picture" src={userProfile.avatar} alt="avatar" onClick={() => goToProfile(userProfile)} />
        </div>
        <div className="preview_user_nickname_box">
          <h1 className="preview_user_nickname">{userProfile.nickname}</h1>
          <p className="preview_user_role">{userProfile.role}</p>
        </div>
        <div className="preview_user_sign_box">
          <div className="preview_user_count_container">
            <div className="preview_user_count">
              <p className="count">{subsriptions}</p>
              <p className="count_sign">Подписки</p>
            </div>
            <div className="preview_user_count">
              <p className="count">{subscribers}</p>
              <p className="count_sign">Подписчики</p>
            </div>
          </div>
          <p className="idea_sign">{Conversion('previewIdea', userProfile.idea)}</p>
        </div>
        <i onClick={() => goBack()} className="icon-rowupp rowupp"></i>
      </div>
    </>
  );
};

export default Preview;
