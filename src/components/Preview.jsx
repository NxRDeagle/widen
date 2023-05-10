import React from 'react';
import { useNavigate } from 'react-router-dom';

import { mainContext } from '../App';
import { userLogin } from '../App';

import '../css/Preview.css';

const Preview = () => {
  const navigate = useNavigate();

  const { setPage, profile, loc, setStateFull, stateFull } = React.useContext(mainContext);

  React.useEffect(() => {
    if (!profile.nickname) {
      navigate('*');
    }

    let screenY = null;
    let clientY = null;
    let scroll = null;
    const previewBox = document.getElementById('swipe_preview');

    previewBox.addEventListener('touchstart', (e) => {
      screenY = e.touches[0].screenY;
      clientY = e.touches[0].screenY;
      scroll = 0;
    });

    previewBox.addEventListener('touchmove', (e) => {
      if (Math.abs(screenY - e.touches[0].screenY) >= 20) {
        if (e.touches[0].screenY <= clientY) {
          if (scroll < 50) {
            scroll++;
            clientY = e.touches[0].screenY;
            previewBox.style.transform = `translateY(-${scroll}%)`;
          } else {
            goBack();
          }
        } else {
          if (scroll > 0) {
            scroll--;
            previewBox.style.transform = `translateY(-${scroll}%)`;
          }
        }
      }
    });

    previewBox.addEventListener('touchend', () => {
      if (scroll < 20) {
        previewBox.style.transform = `translateY(0%)`;
      } else {
        goBack();
      }
    });
  }, [stateFull.openPreview]);

  const goBack = () => {
    setStateFull({
      ...stateFull,
      openPreview: false,
    });

    if (!stateFull.openComments) {
      document.body.style.overflow = '';
    }

    // navigate(loc);
    // if (loc === `/user_profile/${profile.nickname}`) setPage('profile');
    // else if (loc === '/') setPage('home');
    // else setPage(loc.substring(1));
  };

  const goToProfile = () => {
    document.body.style.overflow = '';

    setStateFull({
      //...stateFull,
      openPreview: false,
      openComments: false,
      openImage: false,
    });

    profile.nickname !== userLogin
      ? navigate(`/user_profile/${profile.nickname}`)
      : navigate('/profile');
    setPage('profile');
  };

  return (
    <>
      <div id="swipe_preview" className="preview_user_container">
        <div className="preview_user_avatar">
          {profile.avatar ? (
            <img
              className="avatar_picture"
              src={profile.avatar}
              alt="avatar"
              onClick={goToProfile}
            />
          ) : (
            <img
              className="avatar_picture"
              src="http://en-stal.ru/wp-content/uploads/2022/08/cropped-tild6265-3863-4963-b761-653137363930__usersilhouette_.jpg"
              alt="avatar"
              onClick={goToProfile}
            />
          )}
        </div>
        <div className="preview_user_nickname_box">
          <h1 className="preview_user_nickname">{profile.nickname}</h1>
          <p className="preview_user_role">{profile.role}</p>
        </div>
        <div className="preview_user_sign_box">
          <div className="preview_user_count_container">
            <div className="preview_user_count">
              <p className="count">{profile.subscriptions}</p>
              <p className="count_sign">Подписки</p>
            </div>
            <div className="preview_user_count">
              <p className="count">{profile.subscribers}</p>
              <p className="count_sign">Подписчики</p>
            </div>
          </div>
          <p className="idea_sign">{profile.idea}</p>
        </div>
        <i className="icon-rowupp rowupp"></i>
      </div>
    </>
  );
};

export default Preview;
