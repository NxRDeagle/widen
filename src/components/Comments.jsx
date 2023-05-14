import React from 'react';
import { useNavigate } from 'react-router-dom';

import Comment from './Comment';
import Post from './Post';
import Update from './Update';
import FullMode from './FullMode'

import '../css/Comments.css';
import 'swiper/css';

import { mainContext } from '../App';
import post_data from '../data/post_data.json';
import user_data from '../data/user_data.json';
import Footer from './Footer';

const Comments = () => {
  const navigate = useNavigate();
  const { fullImages, commentPostId, setStateFull, stateFull } = React.useContext(mainContext);

  const goBack = () => {
    document.body.style.overflow = '';
    document.querySelector('.foot_container').style.opacity = 1;
    setStateFull({
      ...stateFull,
      openComments: false,
      openPreview: false,
      openImage: false
    })
  };

  React.useEffect(() => {
    let screenX = null;
    let clientX = null;
    let scroll = null;
    let opacity = null;
    const commentBox = document.getElementById('comments');
    const swipe = document.querySelector('[name="swipe"]');

    swipe.addEventListener('touchstart', (e) => {
      screenX = e.touches[0].screenX;
      clientX = e.touches[0].screenX;
      scroll = 0;
      opacity = 1;
    });

    swipe.addEventListener('touchmove', (e) => {
      if (Math.abs(screenX - e.touches[0].screenX) >= 20) {
        document.getElementById('update').classList.add('none_active');
        if (e.touches[0].screenX >= clientX) {
          if (scroll < 50) {
            scroll++;
            opacity -= 0.05;
            document.querySelector('.head_comments_container').style.opacity = opacity;
            document.querySelector('.foot_container').style.opacity = opacity;
            clientX = e.touches[0].screenX;
            commentBox.style.transform = `translateX(${scroll}%)`;
          }
          else {
            goBack();
          }
        }
        else {
          if (scroll > 0) {
            opacity += 0.05;
            scroll--;
            document.querySelector('.head_comments_container').style.opacity = opacity;
            document.querySelector('.foot_container').style.opacity = opacity;
            commentBox.style.transform = `translateX(${scroll}%)`;
          }
        }
      }
    },[stateFull.openComments]);

    swipe.addEventListener('touchend', () => {
      document.getElementById('update').classList.remove('none_active');
      if (scroll < 20) {
        commentBox.style.transform = `translate(0%)`;
        document.querySelector('.head_comments_container').removeAttribute('style');
        document.querySelector('.foot_container').style.opacity = 1;
      }
      else {
        goBack();
      }
    });

  });

  return (
    <>
      <div className="head_comments_container">
          <i className="icon-cancel close_comments" onClick={goBack}></i>
          <h1 className="comments_name">Запись</h1>
      </div>
      <div id='comments' className="comments_container">
        {stateFull.openPreview ? null : <Update />}
        <div name="upd">
          <div name='swipe'>
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
      </div>
      <Footer message={true}/>
      {stateFull.openImage ? <FullMode imgs={fullImages}/> : null}
    </>
  );
};

export default Comments;
