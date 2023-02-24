import React from 'react';

import '../css/style.css';

const Comment = ({ commentText, avatar, nickname = 'ANONIM' }) => {
  return (
    <div className="user_comment_box">
      <div className="user_comment_avatar_box">
        {avatar ? (
          <img className="avatar_picture" src={avatar} alt="User Avatar" />
        ) : (
          <i className="icon-profile anonim_comment_avatar"></i>
        )}
      </div>
      <div className="comment_user_sign">
        <p className="comment_user_nickname">{nickname}</p>
        <p className="comment_sign">{commentText}</p>
      </div>
    </div>
  );
};

export default Comment;
