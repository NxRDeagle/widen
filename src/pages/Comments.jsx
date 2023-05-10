import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import Comment from '../components/Comment';
import Post from '../components/Post';
import Update from '../components/Update';
import Footer from '../components/Footer';

import '../css/Comments.css';
import 'swiper/css';

import { mainContext } from '../App';
import post_data from '../data/post_data.json';
import user_data from '../data/user_data.json';

const Comments = () => {
  const { commentPostId, setOpenComments } = React.useContext(mainContext);

  const goBack = () => {
    document.body.style.overflow = '';
    setOpenComments(false);
  };

  return (
    <div className="comments_container">
      <div className="head_comments_container">
        <i className="icon-cancel close_comments" onClick={goBack}></i>
        <h1 className="comments_name">Запись</h1>
      </div>
      <Update />
      <div name="upd">
        <Post {...post_data[commentPostId]} full={true} />
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
      </div>
    </div>
  );
};

export default Comments;
