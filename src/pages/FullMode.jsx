import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../css/style.css';
import 'swiper/css';

const FullMode = ({ imgs }) => {
  const navigate = useNavigate();

  console.log(imgs);
  return (
    <div className="full_mode">
      <i
        className="icon-cancel close_full"
        onClick={() => {
          navigate('/comments');
        }}></i>

      <Swiper
        spaceBetween={40}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={1}
        className="swiper_container">
        {imgs.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img className="full_picture" src={item} alt="Full image" />
              {imgs.length !== 1 && (
                <p className="count_pictures">
                  {index + 1} / {imgs.length}
                </p>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FullMode;
