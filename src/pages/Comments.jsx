import React from 'react';
import { Link } from 'react-router-dom';

import Comment from '../components/Comment';
import Post from '../components/Post';

const Comments = ({ comments }) => {
  return (
    <div className="comments_container">
      <div className="head_comments_container">
        <i className="icon-comment comments_icon_animation"></i>
        <h1 className="comments_name">COMMENTS</h1>
        <Link to="/">
          <i className="icon-cancel close_comments"></i>
        </Link>
      </div>

      <div className="post open_post">
        <div className="author_post">
          <div className="avatar_author_post">
            <i className="icon-profile avatar_anonim"></i>
          </div>
          <div className="author_nick">
            <p className="nickname">KatyJs</p>
          </div>
        </div>
        <div className="post_sign">
          <p className="post_text">ЖИЛИ БЫЛИ ТРИ КИТА</p>
          <img
            className="post_one_item"
            src="https://i.pinimg.com/originals/8a/de/fe/8adefe5af862b4f9cec286c6ee4722cb.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="line"></div>
      <div className="comments_box">
        <div className="user_comment_box">
          <div className="user_comment_avatar_box">
            <i className="icon-profile anonim_comment_avatar"></i>
          </div>
          <div className="comment_user_sign">
            <p className="comment_user_nickname">KatyJS</p>
            <p className="comment_sign">Да да я</p>
          </div>
        </div>

        <div className="user_comment_box">
          <div className="user_comment_avatar_box">
            <img
              className="avatar_picture"
              src="https://i.pinimg.com/736x/f0/c5/5b/f0c55bfead45f125c22fc3d35a13c27a.jpg"
            />
          </div>
          <div className="comment_user_sign">
            <p className="comment_user_nickname">NodeJS</p>
            <p className="comment_sign">
              Я всё это уже видел!
              <br />
              Повторыыыы!
            </p>
          </div>
        </div>
      </div>

      {/* {comments &&
        comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              commentText={comment?.text}
              avatar={comment?.avatar}
              nickname={comment?.nickname}
            />
          );
        })} */}

      <div className="comments_box">
        <div className="leave_comment">
          <blockquote contentEditable="true" className="user_comment"></blockquote>
        </div>
      </div>
    </div>
  );
};

export default Comments;
