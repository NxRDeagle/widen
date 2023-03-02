import React from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from './Footer';

const Preview = (props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!props.nickname) {
      navigate('*');
    }
  }, []);

  return (
    <>
      <div className="preview_user_container">
        <div className="preview_user_avatar">
          <img className="avatar_picture" src={props.avatar} alt="avatar" />
        </div>
        <div className="preview_user_nickname_box">
          <h1 className="preview_user_nickname">{props.nickname}</h1>
          <p className="preview_user_role">{props.role}</p>
        </div>
        <div className="preview_user_sign_box">
          <div className="preview_user_count_container">
            <div className="preview_user_count">
              <p className="count">{props.subscriptions}</p>
              <p className="count_sign">Подписки</p>
            </div>
            <div className="preview_user_count">
              <p className="count">{props.subs}</p>
              <p className="count_sign">Подписчики</p>
            </div>
          </div>
          <p className="idea_sign">{props.idea}</p>
        </div>
        <i className="icon-rowupp rowupp"></i>
      </div>
      <Footer />
    </>
  );
};

export default Preview;
