import React from 'react';
import { SwiperSlide } from 'swiper/react';

import './css/Partnership.css';

const PartnershipPrev = ({ item, idx, partnership_data }) => {
  const [closed, setClosed] = React.useState(false);

  return (
    <div className={closed ? 'img_closed' : ''}>
      <img
        loading="lazy"
        className="partnership_box__mediabox__prev-partnership"
        src={partnership_data[item - 1].imgs[0]}
        alt={`psIMG${idx}`}
      />
      <p className="partnership_box__mediabox__prev-partnership__name">
        {partnership_data[item - 1].partnershipName}
      </p>
      <svg
        className="close_icon_svg"
        onClick={() => {
          setClosed(true);
        }}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L7 7M13 13L7 7M7 7L13 1M7 7L1 13" stroke="white" />
      </svg>
    </div>
  );
};
export default PartnershipPrev;
