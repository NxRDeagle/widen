import React from 'react';
import { Link } from 'react-router-dom';

import { mainContext } from '../App';

import Comment from '../components/Comment';
import Post from '../components/Post';

import '../css/style.css';

import post_data from '../data/post_data.json';
import user_data from '../data/user_data.json';

const Comments = () => {
  const { commentPostId, setPage } = React.useContext(mainContext);

  return (
    <div className="comments_container">
      <div className="head_comments_container">
        <Link to="/">
          <i
            className="icon-cancel close_comments"
            onClick={() => {
              setPage('home');
            }}></i>
        </Link>
        <h1 className="comments_name">COMMENTS</h1>
        <i className="icon-comment comments_icon_animation"></i>
      </div>

      <Post {...post_data[commentPostId]} />

      <div className="line"></div>
      <div className="comments_box">
        {post_data[commentPostId].comments &&
          post_data[commentPostId].comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                nickname={comment.nickname}
                commentText={comment.text}
                avatar={user_data.find((obj) => obj.nickname === comment.nickname).avatar}
              />
            );
          })}
      </div>

      <div className="leave_comment">
        <blockquote contentEditable="true" className="user_comment"></blockquote>
      </div>
    </div>
  );
};

export default Comments;
