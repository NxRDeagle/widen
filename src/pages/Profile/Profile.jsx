import React from 'react';
import { useParams } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

import Update from '../../global_components/update/Update';
import Newsware from '../../global_components/newsware/Newsware';

import { ProfileStatistics, ProfileBtn, ProfileIcons } from './components/profile_components';
import { Conversion } from '../../global_function/function';

import './scss/Profile.scss';

import newsware_data from '../../data/newsware_data.json';
import users_data from '../../data/users_data.json';
import { mainContext } from '../../App';

const Profile = () => {
  const {
    page,
    navigate,
    setUserProfileNewsware,
    userProfileNewswareItems,
    myProfile,
    editMyProfile,
    profileActiveIcon,
    setProfileActiveIcon,
  } = React.useContext(mainContext);

  const { nickname } = useParams();

  const userProfile = users_data.find((u) => u.nickname === nickname);

  const [isLoaded, setIsLoaded] = React.useState(false); //Comp

  const itsMyProfile = userProfile.userId === myProfile.userId;

  //Выбор блоков в профиле
  function choiseProfileIcon(e) {
    if (e.target.getAttribute('name')) {
      setProfileActiveIcon(e.target.getAttribute('name'));
    }
  }

  React.useEffect(() => {
    setUserProfileNewsware(
      newsware_data.filter((item) => {
        return item.authorId === userProfile.userId;
      }),
    );
    setIsLoaded(true);
  }, [userProfile]);

  let subscriptions = itsMyProfile
    ? Conversion('count', myProfile.subscriptions.length)
    : Conversion('count', userProfile.subscriptions.length);
  let subscribers = itsMyProfile
    ? Conversion('count', myProfile.subscribers.length)
    : Conversion('count', userProfile.subscribers.length);

  return !userProfile ? (
    navigate('*')
  ) : (
    <>
      <div
        name="upd"
        className="profile_container"
        style={{
          backgroundImage: `url(${itsMyProfile ? myProfile.background : userProfile.background})`,
        }}>
        <Update />
        {itsMyProfile ? (
          <>
            <div className="burger_box">
              <span className="burger_line"></span>
              <span className="burger_line"></span>
              <span className="burger_line"></span>
            </div>
            <i className="icon-bell profile_notific"></i>
          </>
        ) : (
          <i className="icon-share share"></i>
        )}
        <div className="profile_avatar">
          <img
            loading="lazy"
            className="avatar_picture"
            src={itsMyProfile ? myProfile.avatar : userProfile.avatar}
            alt="avatar"
          />
          {!itsMyProfile && (
            <div
              className={
                userProfile.online
                  ? 'profile_status profile_status_online'
                  : 'profile_status profile_status_offline'
              }>
              {!userProfile.online && (
                <p className="profile_last_time">
                  {Conversion('time', new Date(userProfile.lastTime), page)}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="profile_box">
          <div className="profile_user_count_container">
            <ProfileStatistics count={subscriptions} onClick={() => console.log('Подписки')}>
              Подписки
            </ProfileStatistics>
            <ProfileStatistics count={subscribers} onClick={() => console.log('Подписчики')}>
              Подписчики
            </ProfileStatistics>
          </div>

          <div className="profile_nick_box">
            <h1 className="profile_nickname">
              {itsMyProfile ? myProfile.nickname : userProfile.nickname}
            </h1>
            <p className="profile_fi">
              {itsMyProfile
                ? `${myProfile.firstName} ${myProfile.lastName}`
                : `${userProfile.firstName} ${userProfile.lastName}`}
            </p>
            <p className="profile_role">{itsMyProfile ? myProfile.role : userProfile.role}</p>
          </div>

          <div className="profile_idea_box">
            <p className="profile_idea">О себе:</p>
            <p className="profile_idea_sign">{itsMyProfile ? myProfile.idea : userProfile.idea}</p>
          </div>
          {Conversion('profileIdea', itsMyProfile ? myProfile.idea : userProfile.idea) && (
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
            {itsMyProfile ? (
              <>
                <ProfileBtn onClick={() => console.log('Редактировать')}>Редактировать</ProfileBtn>
                <ProfileBtn onClick={() => console.log('Опубликовать')}>Опубликовать</ProfileBtn>
              </>
            ) : (
              <>
                <ProfileBtn onClick={() => console.log('Сообщение')}>Сообщение</ProfileBtn>
                <ProfileBtn onClick={() => editMyProfile(userProfile.userId, 'subcriptions')}>
                  {myProfile.subscriptions.includes(userProfile.userId)
                    ? 'Отписаться'
                    : 'Подписаться'}
                </ProfileBtn>
              </>
            )}
          </div>

          <ul onClick={choiseProfileIcon} className="profile_icon_container">
            <ProfileIcons profileActiveIcon={profileActiveIcon} />
          </ul>

          <div className={profileActiveIcon === 'newsware' ? 'postItems' : 'postItems none_active'}>
            <div className="main_background">
              {!userProfileNewswareItems.length ? (
                <p className="no_posts">У пользователя ещё нет постов...</p>
              ) : isLoaded ? (
                userProfileNewswareItems.map((item) => {
                  return <Newsware {...item} key={item.newswareId} />;
                })
              ) : (
                <div className="posts_container">
                  <div className="post_box">
                    {[...new Array(3)].map((_, index) => {
                      return (
                        <ContentLoader
                          key={index}
                          speed={1}
                          width={360}
                          height={300}
                          viewBox="0 0 360 300"
                          backgroundColor="#f3f3f3"
                          foregroundColor="#7e52ee">
                          <circle cx="47" cy="16" r="16" />
                          <rect x="72" y="5" rx="3" ry="3" width="65" height="8" />
                          <rect x="72" y="20" rx="3" ry="3" width="50" height="6" />
                          <rect x="31" y="50" rx="3" ry="3" width="320" height="8" />
                          <rect x="31" y="70" rx="10" ry="10" width="320" height="188" />
                        </ContentLoader>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={profileActiveIcon === 1 ? 'editItems' : 'editItems none_active'}></div>
          <div className={profileActiveIcon === 2 ? 'scopeItems' : 'scopeItems none_active'}></div>
          <div
            className={
              profileActiveIcon === 3 ? 'achievementItems' : 'achievementItems none_active'
            }></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
