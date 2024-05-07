import React from 'react';

import { mainContext } from '../../App';

import './css/Partnership.css';

const PartnershipPrev = ({ ps, canClose }) => {
  const { getUser, goToProfile } = React.useContext(mainContext);
  const [closed, setClosed] = React.useState(false);

  return (
    <div className={closed ? 'img_closed' : ''}>
      <img
        loading="lazy"
        className="partnership_box__mediabox__prev-partnership"
        src={ps.imgs[0]}
        alt={'psIMG'}
      />
      <p className="partnership_box__mediabox__prev-partnership__name">{ps.partnershipName}</p>
      {canClose && (
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
      )}
      <div className="partnership_box__mediabox__prev-partnership__div">
        <img
          src={getUser(ps.authorId).avatar}
          alt="partnership_box__mediabox__prev-partnership__div__avatar"
          className="partnership_box__mediabox__prev-partnership__div__avatar"
          style={{ zIndex: 10 }}
          onClick={() => goToProfile(getUser(ps.authorId))}
        />
        {ps.partners.length !== 0 &&
          ps.partners.map((item, idx) => {
            if (idx < 2) {
              return (
                <img
                  src={getUser(item).avatar}
                  key={idx}
                  alt="partnership_box__mediabox__prev-partnership__div__avatar"
                  className="partnership_box__mediabox__prev-partnership__div__avatar"
                  style={{ zIndex: 5 - idx }}
                  onClick={() => goToProfile(getUser(item))}
                />
              );
            }
          })}
      </div>
    </div>
  );
};
export default PartnershipPrev;
