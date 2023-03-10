import React from 'react';

import Footer from '../components/Footer';

import '../css/style.css';

import user_data from '../data/user_data.json';

const Profile = ({ nickname }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const profileData = user_data.find((obj) => obj.nickname === nickname);

  return (
    <>
      <div className="profile_container">
        <div className="burger_box">
          <span className="burger_line"></span>
          <span className="burger_line"></span>
          <span className="burger_line"></span>
        </div>

        <i className="icon-bell profile_notific"></i>

        <div className="profile_avatar">
          {profileData.avatar ? (
            <img className="avatar_picture" src={profileData.avatar} alt="avatar" />
          ) : (
            <img
              className="avatar_picture"
              src="http://en-stal.ru/wp-content/uploads/2022/08/cropped-tild6265-3863-4963-b761-653137363930__usersilhouette_.jpg"
              alt="avatar"
            />
          )}
        </div>

        <div className="profile_box">
          <div className="profile_user_count_container">
            <div className="preview_user_count" style={{ marginRight: '48px' }}>
              <p className="profile_count">{profileData.subscriptions}</p>
              <p className="profile_count_sign">Подписки</p>
            </div>
            <div className="preview_user_count" style={{ marginRight: '48px' }}>
              <p className="profile_count">{profileData.subscribers}</p>
              <p className="profile_count_sign">Подписчики</p>
            </div>
          </div>

          <div className="profile_nick_box">
            <h1 className="profile_nickname">{profileData.nickname}</h1>
            <p className="profile_fi">
              {profileData.firstName} {profileData.lastName}
            </p>
            <p className="profile_role">{profileData.role}</p>
          </div>

          <div className="profile_idea_box">
            <p className="profile_idea">Идея:</p>
            <p className="profile_idea_sign">{profileData.idea}</p>
          </div>
          {isLoaded && document.querySelector('.profile_idea_sign').textContent.length > 180 && (
            <p
              className="btn_unwrap"
              onClick={(e) => {
                document.querySelector('.profile_idea_box').classList.toggle('full_idea');
                e.target.textContent =
                  e.target.textContent === 'Развернуть' ? 'Свернуть' : 'Развернуть';
              }}>
              Развернуть
            </p>
          )}
          <div className="btn_profile_box">
            <button className="btn_my_profile">Редактировать</button>
            <button className="btn_my_profile">Опубликовать</button>
          </div>

          <div className="line"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Profile;
