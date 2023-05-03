import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import Comment from '../components/Comment';
import Post from '../components/Post';
import Update from '../components/Update';

import '../css/Comments.css';
import 'swiper/css';

import { mainContext } from '../App';
import post_data from '../data/post_data.json';
import user_data from '../data/user_data.json';

const Comments = () => {
  const navigate = useNavigate();
  const { commentPostId, setPage, loc } = React.useContext(mainContext);
  const [isTouchMove, setIsTouchMove] = React.useState();

  const goBack = () => {
    navigate(loc);
    if (loc === `/user_profile/${post_data[commentPostId].nickname}`) setPage('profile');
    else if (loc === '/') setPage('home');
    else setPage(loc.substring(1));
  };

  return (
    <div className="comments_container">
      <div className="head_comments_container">
        <i className="icon-cancel close_comments" onClick={goBack}></i>
        <h1 className="comments_name">Запись</h1>
      </div>
      <Update />
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
          goBack();
        }}
        onTouchStart={(e) => {
          setIsTouchMove(e.translate);
        }}
        onTouchMove={(e) => {
          if (e.translate > isTouchMove) {
            document.body.style.backgroundColor = '#7e52ee';
            document.querySelector('.head_comments_container').classList.add('hidden');
            document.querySelector('.leave_comment').classList.add('hidden');
          }
        }}
        onTouchEnd={() => {
          document.body.style.backgroundColor = '#ffffff';
          document.querySelector('.head_comments_container').classList.remove('hidden');
          document.querySelector('.leave_comment').classList.remove('hidden');
        }}>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide>
          <div name="upd">
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
