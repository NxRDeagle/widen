import React from 'react';

import Footer from '../components/Footer';

const UserProfile = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const [notification, setNotification] = React.useState(false);

  return (
    <>
      <div className="profile_container user_profile">
        <i className="icon-share share"></i>

        <div className="profile_avatar">
          <img
            className="avatar_picture"
            src="https://www.какэтосделали.рф/uploads/images/d/i/m/dimas_iz_batajska.jpg"
          />
        </div>

        <div className="profile_box">
          <div className="profile_user_count_container">
            <div className="preview_user_count" style={{ marginRight: '48px' }}>
              <p className="profile_count">15</p>
              <p className="profile_count_sign">Подписки</p>
            </div>
            <div className="preview_user_count" style={{ marginRight: '48px' }}>
              <p className="profile_count">15к</p>
              <p className="profile_count_sign">Подписчики</p>
            </div>
          </div>

          <div className="profile_nick_box">
            <h1 className="profile_nickname">Dima_Yasek</h1>
            <p className="profile_fi">Дмитрий Яценко</p>
            <p className="profile_role">Реактер</p>
          </div>

          <div className="profile_idea_box">
            <p className="profile_idea">Идея:</p>
            <p className="profile_idea_sign">lore</p>
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

          {/* <!--ЗДЕСЬ ДРУГИЕ--> */}
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
              {/* <!--ЗДЕСЬ ПРИ НАЖАТИИ НА КОЛОКОЛЬЧИК КЛАСС active появляется--> */}
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
