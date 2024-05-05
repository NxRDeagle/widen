import React from 'react';
import { useContext, useState, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { mainContext } from '../../App';

import partnership_data from '../../data/partnersip_data.json';
import users_data from '../../data/users_data.json';

import './css/Partnership.css';

import { NewswareIcons } from '../newsware/components/newsware_components';
import PartnershipPrev from './PartnershipPrev';

const Partnership = () => {
  const { goBack, location, navigate, setDivision, myProfile } = useContext(mainContext);

  const [mode, setMode] = useState(0); // режим открытия карточки (0 - просмотр, 1 - создание, 2 - редактирование)
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Открытие попап меню статуса

  let partnershipId = location.pathname.split('/')[2];
  let ps = partnership_data[partnershipId - 1];

  //Стейты для статистики новостной ленты
  const [newswareStates, setNewswareStates] = useState({
    activeLike: !ps ? false : ps.stats.likes.includes(myProfile.userId),
    activeFavorite: !ps ? false : ps.stats.favorites.includes(myProfile.userId),
    isUseful: !ps ? false : ps.stats.useful.includes(myProfile.userId),
    clickUseful: !ps
      ? false
      : ps.stats.likes.includes(myProfile.userId) || ps.stats.useful.includes(myProfile.userId),
  });

  function goToUserProfile(nickname) {
    navigate(`/profile/${nickname}`, { replace: true });
  }

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

  //Изменение статистики новости
  const onClickIcon = (icon) => {
    switch (icon) {
      case 'icon-like':
        ps.stats.likes.includes(myProfile.userId)
          ? (ps.stats.likes = ps.stats.likes.filter((obj) => {
              return obj !== myProfile.userId;
            }))
          : ps.stats.likes.push(myProfile.userId);
        setNewswareStates({
          ...newswareStates,
          activeLike: !newswareStates.activeLike,
        });
        break;
      case 'icon-comment':
        break;
      case 'icon-repost':
        break;
      case 'icon-flag':
        ps.stats.favorites.includes(myProfile.userId)
          ? (ps.stats.favorites = ps.stats.favorites.filter((obj) => {
              return obj !== myProfile.userId;
            }))
          : ps.stats.favorites.push(myProfile.userId);
        setNewswareStates({
          ...newswareStates,
          activeFavorite: !newswareStates.activeFavorite,
        });
        break;
      case 'icon-useful':
        ps.stats.useful.includes(myProfile.userId)
          ? (ps.stats.useful = ps.stats.useful.filter((obj) => {
              return obj !== myProfile.userId;
            }))
          : ps.stats.useful.push(myProfile.userId);
        setNewswareStates({
          ...newswareStates,
          isUseful: !newswareStates.isUseful,
        });
        setTimeout(() => {
          setNewswareStates({
            ...newswareStates,
            clickUseful: true,
          });
        }, 500);
        break;
      default:
        return;
    }
  };

  const handleQuit = () => {
    setDivision(1);
    goBack();
  };
  return !ps ? (
    navigate('*')
  ) : (
    <div className="partnership_box">
      <div className="partnership_box__top">
        <svg
          onClick={() => handleQuit()}
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
        <div className="partnership_box__undertop_authorbox">
          <img
            src={getUserAvatar(ps.authorId)}
            alt="userAvatar"
            className="partnership_box__undertop_authorbox__avatar"
            onClick={() => goToUserProfile(getUserNickname(ps.authorId))}
          />
          <div className="partnership_box__undertop_authorbox__flex">
            <p
              className="partnership_box__undertop_authorbox__nickname"
              onClick={() => goToUserProfile(getUserNickname(ps.authorId))}>
              {getUserNickname(ps.authorId)}
            </p>
            <div className="partnership_box__undertop_authorbox__flex__inner">
              <svg
                className="geo_svg"
                width="8"
                height="11"
                viewBox="0 0 8 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 5.24012C4.275 5.24012 4.5105 5.13742 4.7065 4.932C4.90217 4.72694 5 4.48031 5 4.1921C5 3.90389 4.90217 3.65708 4.7065 3.45167C4.5105 3.24661 4.275 3.14407 4 3.14407C3.725 3.14407 3.48967 3.24661 3.294 3.45167C3.098 3.65708 3 3.90389 3 4.1921C3 4.48031 3.098 4.72694 3.294 4.932C3.48967 5.13742 3.725 5.24012 4 5.24012ZM4 9.09161C5.01667 8.11346 5.77083 7.22473 6.2625 6.42544C6.75417 5.62649 7 4.91698 7 4.2969C7 3.34495 6.71033 2.56539 6.131 1.95823C5.552 1.35143 4.84167 1.04802 4 1.04802C3.15833 1.04802 2.44783 1.35143 1.8685 1.95823C1.2895 2.56539 1 3.34495 1 4.2969C1 4.91698 1.24583 5.62649 1.7375 6.42544C2.22917 7.22473 2.98333 8.11346 4 9.09161ZM4 10.2837C3.93333 10.2837 3.86667 10.2706 3.8 10.2444C3.73333 10.2182 3.675 10.1833 3.625 10.1396C2.40833 9.01301 1.5 7.96726 0.9 7.00238C0.3 6.03715 0 5.13532 0 4.2969C0 2.98687 0.402167 1.94321 1.2065 1.16593C2.0105 0.388642 2.94167 0 4 0C5.05833 0 5.9895 0.388642 6.7935 1.16593C7.59783 1.94321 8 2.98687 8 4.2969C8 5.13532 7.7 6.03715 7.1 7.00238C6.5 7.96726 5.59167 9.01301 4.375 10.1396C4.325 10.1833 4.26667 10.2182 4.2 10.2444C4.13333 10.2706 4.06667 10.2837 4 10.2837Z"
                  fill="#888888"
                />
              </svg>
              <p className="partnership_box__undertop_authorbox__geo">{ps.geoposition}</p>
            </div>
          </div>
          <button className="partnership_box__undertop__btn">Откликнуться</button>
        </div>
        <div className="partnership_box__undertop__line"></div>
      </div>
      <div className="partnership_box__statusnamebox">
        <p className="partnership_box__statusnamebox__status">Статус: {getStatus(ps.status)}</p>
        <svg
          className="partnership_box__statusnamebox_svg"
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z" fill="#BABABA" />
        </svg>
        {isPopupOpen && (
          <div className="partnership_box__popup">
            <ul className="partnership_box__popup__list">
              <li className="partnership_box__popup__list__element">
                Открыто<p className="partnership_box__popup__list__element__p"></p>
              </li>
              <li className="partnership_box__popup__list__element">
                В процессе<p className="partnership_box__popup__list__element__p"></p>
              </li>
              <li className="partnership_box__popup__list__element">
                Закрыто<p className="partnership_box__popup__list__element__p"></p>
              </li>
            </ul>
          </div>
        )}
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
          <p className="partnership_box__databox__innersign">{ps.idea}</p>
        </div>
        {ps.status !== 'closed' && <p className="partnership_box__databox__sign">Кого ищу:</p>}
        {ps.status !== 'closed' && (
          <div className="partnership_box__databox__inner">
            <p className="partnership_box__databox__innersign">{ps.wantToFind}</p>
          </div>
        )}
        {ps.status === 'closed' && (
          <p className="partnership_box__databox__sign">Результат партнерства:</p>
        )}
        {ps.status === 'closed' && (
          <div className="partnership_box__databox__inner">
            <p className="partnership_box__databox__innersign">{ps.result}</p>
          </div>
        )}
        <p className="partnership_box__databox__sign">Бюджет:</p>
        <div className="partnership_box__databox__inner">
          <p className="partnership_box__databox__innersign">{ps.budget}</p>
        </div>
        {ps.status === 'in_process' && (
          <p className="partnership_box__databox__sign">Текущие результаты:</p>
        )}
        {ps.status === 'in_process' && (
          <div className="partnership_box__databox__inner">
            <p className="partnership_box__databox__innersign">{ps.currentResult}</p>
          </div>
        )}
      </div>
      <div className="partnership_box__mediabox">
        {ps.imgs.length > 0 && <p className="partnership_box__databox__sign">Медиа:</p>}
        {ps.imgs.length > 0 && (
          <Swiper
            initialSlide={0}
            spaceBetween={40}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            className="swiper_container_media">
            {ps.imgs.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img
                    loading="lazy"
                    className="partnership_box__mediabox__img"
                    src={item}
                    alt={`psIMG${idx}`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {ps.prevPartnerships.length > 0 && (
          <p className="partnership_box__databox__sign">Предыдущие партнерства автора:</p>
        )}
        {ps.prevPartnerships.length > 0 && (
          <Swiper
            initialSlide={0}
            spaceBetween={7}
            grabCursor={true}
            centeredSlides={false}
            loop={false}
            slidesPerView={2}
            className="swiper_container_prev-media">
            {ps.prevPartnerships.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <PartnershipPrev
                    item={item}
                    idx={idx}
                    key={idx}
                    partnership_data={partnership_data}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>

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
        <p className="time_bottom">{ps.time}</p>
      </div>

      {/*  Комменты 
      <div
        className="partnership_box__commentbox"
      </div> */}
    </div>
  );
};
export default Partnership;
