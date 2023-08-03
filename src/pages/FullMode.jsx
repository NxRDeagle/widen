import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../css/FullMode.css';
import 'swiper/css';
import { mainContext } from '../App';

const FullMode = ({ imgs, idx }) => {
  const { goBack } = React.useContext(mainContext);

  let startIndex = idx;
  const [currentSlide, setCurrentSlide] = React.useState(idx + 1); //comp

  return (
    <div className="full_mode">
      <i
        className="icon-cancel close_full"
        onClick={() => {
          goBack();
        }}></i>

      <Swiper
        spaceBetween={40}
        grabCursor={true}
        centeredSlides={true}
        initialSlide={idx}
        loop={true}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex + 1);
        }}
        className="swiper_container">
        {imgs.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img className="full_picture" src={item} alt="full" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {imgs.length !== 1 && (
        <p className="count_pictures">
          {currentSlide} / {imgs.length}
        </p>
      )}
    </div>
  );
};

export default FullMode;
