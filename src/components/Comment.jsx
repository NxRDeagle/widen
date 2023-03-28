import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Comments.css';

import { mainContext } from '../App';

const Comment = ({ commentText, avatar, nickname }) => {
  const navigate = useNavigate();

  const { setPage } = React.useContext(mainContext);

  const goToProfile = () => {
    navigate(`/user_profile/${nickname}`);
    setPage('profile');
  };

  return (
    <div className="user_comment_box">
      <div className="user_comment_avatar_box">
        {avatar ? (
          <img className="avatar_picture" src={avatar} alt="User Avatar" onClick={goToProfile} />
        ) : (
          <i className="icon-profile anonim_comment_avatar" onClick={goToProfile}></i>
        )}
      </div>
      <div className="comment_user_sign">
        <p className="comment_user_nickname" onClick={goToProfile}>
          {nickname}
        </p>
        <p className="comment_sign">{commentText}</p>
      </div>
    </div>
  );
};

export default Comment;
