import React from 'react';

import '../css/Comments.css';
import { useNavigate } from 'react-router-dom';

import { mainContext } from '../App';
import { userId } from '../App';
import users_data from '../data/users_data.json';
import comments_data from '../data/comments_data.json';

const Comment = ({ authorCommentId, commentId }) => {
  const { setPage, profile, setProfile, setStateFull, stateFull } = React.useContext(mainContext);
  const navigate = useNavigate();

  const { nickname, avatar } = users_data.find((obj) => obj.userId === authorCommentId);

  const comment = comments_data.find((obj) => obj.commentId === commentId);
  const myProfile = users_data.find((obj) => obj.userId === userId);

  const goToPreview = () => {
    document.querySelector('footer').style.filter = `blur(5px)`;
    if (myProfile.viewUsers.find((obj) => obj === profile.userId) || profile.userId === userId) {
      goToProfile();
    } else {
      setProfile(users_data.find((obj) => obj.userId === authorCommentId));
      setStateFull({
        ...stateFull,
        openPreview: true,
      });
    }
  };

  const goToProfile = () => {
    setStateFull({
      ...stateFull,
      openComments: false,
      openPreview: false,
    });
    document.body.style.overflow = '';
    profile.userId !== userId
      ? navigate(`/user_profile/${profile.nickname}`)
      : navigate('/profile');
    setPage('profile');
  };

  return (
    <div className="user_comment_box">
      <div className="user_comment_avatar_box">
        <img className="avatar_picture" src={avatar} alt="User Avatar" onClick={goToPreview} />
      </div>
      <div className="comment_user_sign">
        <p className="comment_user_nickname" onClick={goToPreview}>
          {nickname}
        </p>
        <p className="comment_sign">{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
