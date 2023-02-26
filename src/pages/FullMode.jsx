import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const FullMode = ({ imgs }) => {
  const navigate = useNavigate();

  console.log(imgs);

  return (
    <div className="full_mode">
      <i
        className="icon-cancel close_full"
        onClick={() => {
          navigate('/');
        }}></i>

      <Swiper
        spaceBetween={40}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
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
