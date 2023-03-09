import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';

import user_data from '../data/user_data.json';

const UserProfile = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { nickname } = useParams();

  let [profile, setProfile] = React.useState(
    user_data.find((obj) => obj.nickname === nickname.toLocaleLowerCase()),
  );

  const [notification, setNotification] = React.useState(false);

  return !profile ? (
    navigate('*')
  ) : (
    <>
      <div className="profile_container user_profile">
        <i className="icon-share share"></i>

        <div className="profile_avatar">
          {profile.avatar ? (
            <img className="avatar_picture" src={profile.avatar} alt="avatar" />
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
              <p className="profile_count">{profile.subscriptions}</p>
              <p className="profile_count_sign">Подписки</p>
            </div>
            <div className="preview_user_count" style={{ marginRight: '48px' }}>
              <p className="profile_count">{profile.subscribers}</p>
              <p className="profile_count_sign">Подписчики</p>
            </div>
          </div>

          <div className="profile_nick_box">
            <h1 className="profile_nickname">{profile.nickname}</h1>
            <p className="profile_fi">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="profile_role">{profile.role}</p>
          </div>

          <div className="profile_idea_box">
            <p className="profile_idea">Идея:</p>
            <p className="profile_idea_sign">{profile.idea}</p>
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
            <button className="btn_user_profile">Сообщение</button>
            <button className="btn_user_profile">Подписаться</button>
            <div onClick={() => setNotification(!notification)} className="profile_user_notific">
              <i
                className={
                  notification
                    ? 'icon-bell user_notific user_notific_active'
                    : 'icon-bell user_notific'
                }></i>
            </div>
          </div>

          <div className="line"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
