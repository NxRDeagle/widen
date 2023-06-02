import React from 'react';

import Comment from '../components/Comment';
import Post from '../components/Post';

import '../css/Comments.css';

import { mainContext } from '../App';
import posts_data from '../data/posts_data.json';
import comments_data from '../data/comments_data.json';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Comments = () => {
  const { commentPostId, Conversion, setMessageText, message, setMessage, loc} = React.useContext(mainContext);
  const navigate = useNavigate();
  const post = posts_data.find((obj) => obj.postId === commentPostId);

  const commentsCount = Conversion('count', post.stats.comments.length);
  const commentsSign = Conversion('comments', post.stats.comments.length);


  const goBack = () => {
    setMessageText('');
    setMessage(false);
    loc.length > 0 ? navigate(loc.pop()) : navigate('/');
  };

  return (
    <>
      <div className="head_comments_container">
        <i className='icon_close' onClick={goBack}>
          <svg width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6H23M1 6L8 1M1 6L8 11" stroke="#7E52EE" />
          </svg>
        </i>
        <h1 className="comments_name">Запись</h1>
      </div>
      <div id='comments' className="comments_container">
        <Post {...post} full={true} />
        <div className="line"></div>
        <div className="comments_box">
          <p className='count_comments'>{commentsCount} {commentsSign}</p>
          {post.stats.comments &&
            post.stats.comments.map((commentId) => {
              return (
                <Comment
                  key={commentId}
                  commentId={commentId}
                  authorCommentId={comments_data.find((obj) => obj.commentId === commentId).authorCommentId}
                />
              );
            })}
        </div>
      </div>
      <Footer message={message}/>
    </>
  );
};

export default Comments;
