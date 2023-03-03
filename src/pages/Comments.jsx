import React from 'react';
import { Link } from 'react-router-dom';

import { mainContext } from '../App';
import { Post_list } from './Home';

import Comment from '../components/Comment';
import Post from '../components/Post';

const Comments = () => {
  const { commentPostId } = React.useContext(mainContext);
  const posts = Post_list();
  return (
    <div className="comments_container">
      <div className="head_comments_container">
        <Link to="/">
          <i className="icon-cancel close_comments"></i>
        </Link>
        <h1 className="comments_name">COMMENTS</h1>
        <i className="icon-comment comments_icon_animation"></i>
      </div>

      <Post {...posts[commentPostId]} />

      <div className="line"></div>
      <div className="comments_box">
        {posts[commentPostId].comments &&
          posts[commentPostId].comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                commentText={comment?.text}
                avatar={comment?.avatar}
                nickname={comment?.nickname}
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
