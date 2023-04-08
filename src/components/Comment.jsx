import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Comments.css';

import { mainContext } from '../App';
import user_data from '../data/user_data.json';

const Comment = ({ commentText, avatar, nickname }) => {
  const navigate = useNavigate();

  const { setProfile, setLocationPreview } = React.useContext(mainContext);

  const goToPreview = () => {
    setLocationPreview('comments');
    setProfile(user_data.find((obj) => obj.nickname === nickname.toLocaleLowerCase()));
    navigate('/preview_user_profile');
  };

  return (
    <div className="user_comment_box">
      <div className="user_comment_avatar_box">
        {avatar ? (
          <img className="avatar_picture" src={avatar} alt="User Avatar" onClick={goToPreview} />
        ) : (
          <i className="icon-profile anonim_comment_avatar" onClick={goToPreview}></i>
        )}
      </div>
      <div className="comment_user_sign">
        <p className="comment_user_nickname" onClick={goToPreview}>
          {nickname}
        </p>
        <p className="comment_sign">{commentText}</p>
      </div>
    </div>
  );
};

export default Comment;
