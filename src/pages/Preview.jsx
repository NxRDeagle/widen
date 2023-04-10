import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import Footer from '../components/Footer';
import Home from './Home';

import { mainContext } from '../App';
import { userLogin } from '../App';

import 'swiper/css';
import '../css/Preview.css';

const Preview = () => {
  const navigate = useNavigate();

  const { setPage, profile, loc } = React.useContext(mainContext);

  React.useEffect(() => {
    if (!profile.nickname) {
      navigate('*');
    }
  }, []);

  const goBack = () => {
    navigate(loc);
    if (loc === `/user_profile/${profile.nickname}`) setPage('profile');
    else if (loc === '/') setPage('home');
    else setPage(loc.substring(1));
  };

  const goToProfile = () => {
    profile.nickname !== userLogin
      ? navigate(`/user_profile/${profile.nickname}`)
      : navigate('/profile');
    setPage('profile');
  };

  return (
    <>
      <Swiper
        direction="vertical"
        spaceBetween={40}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={1}
        allowSlidePrev={false}
        className="swiper_container"
        onSlideChange={() => {
          goBack();
        }}>
        <SwiperSlide>
          <div className="preview_user_container">
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
        </SwiperSlide>
        <SwiperSlide>
          <Home />
        </SwiperSlide>
      </Swiper>

      <Footer />
    </>
  );
};

export default Preview;
