import React from 'react';

import Comment from '../components/Comment';
import Newsware from '../components/Newsware';

import '../css/Comments.css';

import { mainContext, defaultPost, userId } from '../App';
import newsware_data from '../data/newsware_data.json';
import comments_data from '../data/comments_data.json';

const Comments = () => {
  const { commentNewswareId, Conversion, message, goBack} = React.useContext(mainContext);

  const newsware = newsware_data.find((obj) => obj.newswareId === commentNewswareId) ? newsware_data.find((obj) => obj.newswareId === commentNewswareId) : defaultPost;//comp

  const commentsCount = Conversion('count', newsware.stats.comments.length);
  const commentsSign = Conversion('comments', newsware.stats.comments.length);

  React.useEffect(()=>{
    if(!newsware.stats.views.includes(userId)){
      newsware.stats.views.push(userId)
    };
  },[])
  
  return (
    <>
      <div className="head_comments_container">
        <i className='icon_close' onClick={() => goBack()}>
          <svg width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6H23M1 6L8 1M1 6L8 11" stroke="#7E52EE" />
          </svg>
        </i>
        <h1 className="comments_name">Запись</h1>
      </div>
      <div id='comments' className="comments_container">
        <Newsware {...newsware} full={true} />
        <div className="line"></div>
        <div className="comments_box">
          <p className='count_comments'>{commentsCount} {commentsSign}</p>
          {newsware.stats.comments.length > 0 &&
            newsware.stats.comments.map((commentId) => {
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
    </>
  );
};

export default Comments;
