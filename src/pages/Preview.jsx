import React from 'react';

import { mainContext } from '../App';

import '../css/Preview.css';
import Footer from '../components/Footer';

const Preview = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);//Comp

  const { navigate, profile, Conversion, message, goToProfile, goBack } = React.useContext(mainContext);

  let subsriptions = Conversion('count', profile.subscribers.length);
  let subscribers = Conversion('count', profile.subscribers.length);

  React.useEffect(() => {
    if (!profile.nickname) {
      navigate('*');
    }
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div
        className="preview_user_container"
        style={
          isLoaded ? { background: `url(${profile.background})` } : { backgroundColor: '#7e52ee' }
        }>
        <div className="preview_user_avatar">
          <img className="avatar_picture" src={profile.avatar} alt="avatar" onClick={() => goToProfile(profile)} />
        </div>
        <div className="preview_user_nickname_box">
          <h1 className="preview_user_nickname">{profile.nickname}</h1>
          <p className="preview_user_role">{profile.role}</p>
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
          <p className="idea_sign">{Conversion('previewIdea', profile.idea)}</p>
        </div>
        <i onClick={() => goBack()} className="icon-rowupp rowupp"></i>
      </div>
      <Footer message={message} preview={true} />
    </>
  );
};

export default Preview;
