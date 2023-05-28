import React from 'react';

import '../css/CaseCard.css';

const CaseCard = ({ img, header, avatar, nickname }) => {
  const casecardRef = React.useRef();

  const [isFavorite, setIsFavorite] = React.useState(false);

  const setFavorite = () => {
    setIsFavorite(!isFavorite);
    isFavorite
      ? casecardRef.current.classList.remove('casecard_fav_selected')
      : casecardRef.current.classList.add('casecard_fav_selected');
  };

  return (
    <div className="casecard">
      <img src={img} className="casecard_background casecard_filter" alt="background img" />
      <div className="casecard_up">
        <h1 className="casecard_header">{header}</h1>
        <svg
          onClick={setFavorite}
          className="casecard_fav"
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            onClick={setFavorite}
            className="casecard_fav"
            d="M2 14.95L7 12.8L12 14.95V2H2V14.95ZM1.4 17.4C1.06667 17.5333 0.75 17.504 0.45 17.312C0.15 17.1207 0 16.8417 0 16.475V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V16.475C14 16.8417 13.85 17.1207 13.55 17.312C13.25 17.504 12.9333 17.5333 12.6 17.4L7 15L1.4 17.4ZM2 2H12H7H2Z"
            fill="none"
          />
          <path
            onClick={setFavorite}
            ref={casecardRef}
            className="casecard_fav"
            d="M2 14.95L7 12.8L12 14.95V2H7H2V14.95Z"
            fill="none"
          />
        </svg>
      </div>
      <img className="casecard_avatar" src={avatar} alt="user avatar" />
      <p className="casecard_nick">{nickname}</p>
    </div>
  );
};

export default CaseCard;
