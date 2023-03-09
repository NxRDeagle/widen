import React from 'react';

import Footer from '../components/Footer';

import '../css/style.css';

const Profile = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

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
          <img
            className="avatar_picture"
            src="https://fanibani.ru/images/wp-content/uploads/2021/06/na-avy-parni-5.jpg"
            alt="Avatar"
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
            <h1 className="profile_nickname">Pupa_Online</h1>
            <p className="profile_fi">Пимпа Онлиева</p>
            <p className="profile_role">Суетолог</p>
          </div>

          <div className="profile_idea_box">
            <p className="profile_idea">Идея:</p>
            <p className="profile_idea_sign">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo facere odit similique
              pariatur maiores cupiditate fugiat iusto dolorem aliquam ad animi neque saepe
              consequatur debitis, enim placeat accusamus minus id corporis itaque! Rerum soluta
              esse atque quod! Quaerat exercitationem vero debitis harum deserunt aliquam officiis
              odio voluptatibus recusandae ex animi amet doloribus, temporibus autem velit, sit
              corrupti? Itaque modi corrupti voluptatibus molestias quae! Fugit, aspernatur libero.
            </p>
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
