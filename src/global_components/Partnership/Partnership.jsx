import React from 'react';
import { useContext, useState } from 'react';

import { mainContext } from '../../App';

import partnership_data from '../../data/partnersip_data.json';
import users_data from '../../data/users_data.json';

import './css/Partnership.css';

import { NewswareIcons } from '../newsware/components/newsware_components';

const Partnership = () => {
  const { goBack, location, navigate } = useContext(mainContext);

  const [mode, setMode] = useState(0); // режим открытия карточки (0 - просмотр, 1 - создание, 2 - редактирование)

  let partnershipId = location.pathname.split('/')[2];
  let ps = partnership_data[partnershipId];

  const getUserNickname = (authorId) => {
    return users_data[authorId].nickname;
  };

  const getUserAvatar = (authorId) => {
    return users_data[authorId].avatar;
  };

  const getStatus = (status) => {
    if (status === 'open') return 'открыто';
    else if (status === 'in_process') return 'в процессе';
    else return 'закрыто';
  };

  return !ps ? (
    navigate('*')
  ) : (
    <div className="partnership_box">
      <div className="partnership_box__top">
        <svg
          onClick={() => goBack}
          className="partnership_arrow_svg"
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.05754 0.40359C8.31436 0.672648 8.43763 0.997762 8.42736 1.37893C8.41623 1.76009 8.28226 2.0852 8.02543 2.35426L4.39783 6.15471H18.7156C19.0795 6.15471 19.3847 6.28386 19.6312 6.54216C19.8769 6.79955 19.9998 7.11884 19.9998 7.5C19.9998 7.88117 19.8769 8.2009 19.6312 8.4592C19.3847 8.71659 19.0795 8.84529 18.7156 8.84529H4.39783L8.05754 12.6794C8.31436 12.9484 8.44277 13.2682 8.44277 13.6386C8.44277 14.0081 8.31436 14.3274 8.05754 14.5964C7.80071 14.8655 7.49552 15 7.14197 15C6.78926 15 6.4845 14.8655 6.22768 14.5964L0.352882 8.44171C0.22447 8.30718 0.133297 8.16144 0.0793648 8.00449C0.026289 7.84754 -0.000249863 7.67937 -0.000249863 7.5C-0.000249863 7.32063 0.026289 7.15247 0.0793648 6.99552C0.133297 6.83857 0.22447 6.69283 0.352882 6.5583L6.25978 0.369959C6.4952 0.123322 6.78926 1.90735e-06 7.14197 1.90735e-06C7.49552 1.90735e-06 7.80071 0.134532 8.05754 0.40359Z"
            fill="#BABABA"
          />
        </svg>

        <h1 className="partnership_box__top__header">Предложение</h1>
        <p className="partnership_box__top__time">{ps.time}</p>
      </div>
      <div className="partnership_box__undertop">
        <div className="partnership_box__undertop_authorbox"></div>
        <button>Откликнуться</button>
      </div>
      <div className="partnership_box__statusnamebox">
        <p className="partnership_box__statusnamebox__status">Статус: {getStatus(ps.status)}</p>
        <h2 className="partnership_box__statusnamebox__name">{ps.partnershipName}</h2>
      </div>
      <div className="partnership_box__tagbox">
        {ps.tags.map((item, idx) => {
          return (
            <div className="partnership_box__tagbox__tag" key={idx}>
              {item}
            </div>
          );
        })}
      </div>
      <div className="partnership_box__databox">
        <p className="partnership_box__databox__sign">Что предлагаю:</p>
        <div className="partnership_box__databox__inner">
          <p className="partnership_box__databox__innersign"></p>
        </div>
        {ps.status !== 'closed' && <p className="partnership_box__databox__sign">Кого ищу:</p>}
        {ps.status !== 'closed' && (
          <div className="partnership_box__databox__inner">
            <p className="partnership_box__databox__innersign"></p>
          </div>
        )}
        {ps.status === 'closed' && (
          <p className="partnership_box__databox__sign">Результат партнерства:</p>
        )}
        {ps.status === 'closed' && (
          <div className="partnership_box__databox__inner">
            <p className="partnership_box__databox__innersign"></p>
          </div>
        )}
        <p className="partnership_box__databox__sign">Бюджет:</p>
        <div className="partnership_box__databox__inner">
          <p className="partnership_box__databox__innersign"></p>
        </div>
        {ps.status === 'in_process' && (
          <p className="partnership_box__databox__sign">Текущие результаты:</p>
        )}
        {ps.status === 'in_process' && (
          <div className="partnership_box__databox__inner">
            <p className="partnership_box__databox__innersign"></p>
          </div>
        )}
      </div>
      <div className="partnership_box__mediabox">
        <p className="partnership_box__databox__sign">Медиа:</p>
        {ps.imgs.map((item, idx) => {
          return <img className="partnership_box__mediabox__img" key={idx} src={item} />;
        })}

        <p className="partnership_box__databox__sign">Предыдущие партнерства автора:</p>
        {/* тут мап карточек предыдущих партнерств с крестиком чтобы скрыть */}
      </div>

      {/*  Иконки 
      <div
        className="newsware_icons"
        onClick={(e) => {
          if (!e.target.getAttribute('name')) {
            return;
          } else {
            onClickIcon(e.target.getAttribute('name').split(' ')[0]);
          }
        }}>
        <NewswareIcons
          full={true}
          newswareStates={newswareStates}
          setNewswareStates={setNewswareStates}
          stats={ps.stats}></NewswareIcons>
      </div> */}

      {/*  Комменты 
      <div
        className="partnership_box__commentbox"
      </div> */}
    </div>
  );
};
export default Partnership;
