import React from 'react';

import { mainContext } from '../../App';

import { useNavigate } from 'react-router-dom';

import './css/PartnershipCard.css';

const PartnershipCard = ({ img, isInFavorites, author, geo, header, sign, num }) => {
  const { goToProfile } = React.useContext(mainContext);

  const [isFav, setFav] = React.useState(isInFavorites);
  const navigate = useNavigate();

  return (
    <div className="partnership-card_box">
      <div className="partnership-card_box__top">
        <img className="partnership-card_box__img" src={img} alt="parnership IMG" />
        <div className="partnership-card_box__under">
          <svg
            className="partnership_favorite_svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setFav(!isFav);
            }}>
            <path
              d="M7 14.95L12 12.8L17 14.95V2H7V14.95ZM6.4 17.4C6.06667 17.5333 5.75 17.504 5.45 17.312C5.15 17.1207 5 16.8417 5 16.475V2C5 1.45 5.196 0.979 5.588 0.587C5.97933 0.195667 6.45 0 7 0H17C17.55 0 18.021 0.195667 18.413 0.587C18.8043 0.979 19 1.45 19 2V16.475C19 16.8417 18.85 17.1207 18.55 17.312C18.25 17.504 17.9333 17.5333 17.6 17.4L12 15L6.4 17.4ZM7 2H17H12H7Z"
              fill={isFav ? '#7E52EE' : 'white'}
            />
            <path d="M7 14.95L12 12.8L17 14.95V2H12H7V14.95Z" fill={isFav ? '#7E52EE' : 'white'} />
          </svg>
          <img
            className="partnership-card_box__avatar"
            src={author.avatar}
            alt="parnership IMG"
            onClick={() => goToProfile(author)}
          />
          <p className="partnership-card_box__nickname" onClick={() => goToProfile(author)}>
            {author.nickname}
          </p>
          <p className="partnership-card_box__geo">{geo}</p>
        </div>
      </div>
      <div className="partnership-card_box__bottom" onClick={() => navigate(`/partnership/${num}`)}>
        <h1 className="partnership-card_box__header">{header}</h1>
        <p className="partnership-card_box__sign">{sign}</p>
      </div>
    </div>
  );
};

export default PartnershipCard;
