import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import Comment from '../components/Comment';
import Post from '../components/Post';

import '../css/style.css';
import 'swiper/css';

import { mainContext } from '../App';
import post_data from '../data/post_data.json';
import user_data from '../data/user_data.json';

const Comments = () => {
  const navigate = useNavigate();
  const { commentPostId, setPage } = React.useContext(mainContext);

  const goToHome = () => {
    navigate('/');
    setPage('home');
  };

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
      <Swiper
        initialSlide={2}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={1}
        className="swiper_container"
        allowSlideNext={false}
        allowSlidePrev={true}
        style={{ overflowY: 'scroll' }}
        onSlideChange={() => {
          goToHome();
        }}
        onTouchMove={() => {
          document.querySelector('.head_comments_container').classList.add('hidden');
          document.querySelector('.leave_comment').classList.add('hidden');
        }}
        onTouchEnd={() => {
          document.querySelector('.head_comments_container').classList.remove('hidden');
          document.querySelector('.leave_comment').classList.remove('hidden');
        }}>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide>
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
        </SwiperSlide>
      </Swiper>
      <div className="leave_comment" style={{ zIndex: '10' }}>
        <blockquote contentEditable="true" className="user_comment"></blockquote>
      </div>
    </div>
  );
};

export default Comments;
