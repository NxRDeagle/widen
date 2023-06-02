import React, { useEffect } from 'react';

import '../css/Comments.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Reply from '../components/Reply';

import { mainContext } from '../App';
import { userId } from '../App';
import users_data from '../data/users_data.json';
import comments_data from '../data/comments_data.json';

const Comment = ({ authorCommentId, commentId }) => {

  const { setPage, setProfile, Conversion, setMessageText, loc } = React.useContext(mainContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [wrap, setWrap] = React.useState(false);

  useEffect(() => {
      if (wrap) {
        if (document.querySelector('blockquote')) {
          document.querySelector('blockquote').innerHTML = `Ответить <a style='color:var(--color_active)'>${profile.nickname}</a>`;
        }
      }
      else {
        if (document.querySelector('blockquote')) {
          document.querySelector('blockquote').innerHTML = `Комментировать...`;
        }
      }
    // eslint-disable-next-line
  }, [wrap])


  const profile = users_data.find((obj) => obj.userId === authorCommentId);
  const comment = comments_data.find((obj) => obj.commentId === commentId);
  const likesCount = Conversion('count', comment.likes.length);
  const replysCount = Conversion('count', comment.replies.length);
  const myProfile = users_data.find((obj) => obj.userId === userId);

  const goToPreview = () => {
    setProfile(profile);
    if (myProfile.viewUsers.find((obj) => obj === profile.userId) || profile.userId === userId) {
      goToProfile();
    }
    else {
      loc.push(location.pathname);
      navigate("/preview");
    }
  };

  const goToProfile = () => {
    setProfile(profile);
    profile.userId !== userId
      ? navigate(`/user_profile/${profile.nickname}`)
      : navigate('/profile');
    setPage('profile');
  };

  return (
    <>
      {
        comment.isReply ?
          null
          :
          <>
            <div
              id={`comment_${comment.commentId}`}
              className="comment_box"
              onClick={() => {
                setMessageText('');
                setWrap(!wrap);
              }}
            >
              <div className="comment_user_avatar_box">
                <img className="avatar_picture" src={profile.avatar} alt="User Avatar" onClick={goToPreview} />
              </div>
              <div className="comment_text_box">
                <p className="comment_user_nickname">
                  {profile.nickname}
                </p>
                <p className="comment_text">{comment.text}</p>
                <span className='time_reply_box'>
                  <p className='time' style={{ marginRight: '31px' }}>число месяц в время</p>
                  <p className='reply_sign'>Ответить</p>
                </span>
              </div>
              <div className='comment_like_box'>
                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.575 1C2.60063 1 1 2.62303 1 4.62505C1 8.25009 5.225 11.5456 7.5 12.3121C9.775 11.5456 14 8.25009 14 4.62505C14 2.62303 12.3994 1 10.425 1C9.216 1 8.14675 1.60868 7.5 2.54032C7.17035 2.06418 6.7324 1.67561 6.22325 1.40748C5.71409 1.13936 5.14872 0.99959 4.575 1Z" fill="white" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className='likes_count'>{likesCount}</p>
              </div>
            </div>
            <div onClick={() => setWrap(!wrap)} className={comment.replies.length > 0 ? 'unwrap_box' : 'unwrap_box none_active'}>
              <p className='unwrap_replys'>{wrap ? 'Скрыть ответы' : 'Показать ответы'}</p>
              <p className='replys_count'>({replysCount})</p>
              <i className={wrap ? 'unwrap_icon icon-down-open' : 'unwrap_icon icon-up-open'}></i>
            </div>
            {
              comment.replies.length > 0 ?
                <div id={`replys_${comment.commentId}`} className={wrap ? 'replys_box unwrap' : 'replys_box'}>
                  {
                    comment.replies.map((replyId) => {
                      return (
                        <Reply
                          key={replyId}
                          replyId={replyId}
                          authorReplyId={comments_data.find((obj) => obj.commentId === replyId).authorCommentId}
                        />
                      );
                    })
                  }
                </div >
                :
                null
            }
          </>
      }
    </>
  );
};

export default Comment;
