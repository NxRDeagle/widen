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
  const { goBack, location, navigate, setDivision, myProfile, Conversion, getUser, goToProfile } =
    useContext(mainContext);

  const [mode, setMode] = useState(0); // режим открытия карточки (0 - просмотр, 1 - создание, 2 - редактирование)
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Открытие попап меню статуса
  const [isOptionsOpen, setIsOptionsOpen] = useState(false); // Открытие меню опций (редактировать, архивировать, удалить)

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

  const getStatus = (status) => {
    if (status === 'opened') return 'открыто';
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

  const editPartnership = () => {
    // Редактировать партнерство
    setMode(2);
    setIsOptionsOpen(false);
  };

  const archievePartnership = () => {
    // Архивировать партнерство
    setIsOptionsOpen(false);
  };

  const deletePartnership = () => {
    // Удалить партнерство
    setIsOptionsOpen(false);
  };

  const invitePartners = () => {
    // Пригласить партнеров
  };

  const changePartnershipStatus = (status) => {
    // Изменить статус партнерства
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
        <p className="partnership_box__top__time">{Conversion('time', new Date(ps.time))}</p>
      </div>
      <div className="partnership_box__undertop">
        <div className="partnership_box__undertop_authorbox">
          <img
            src={getUser(ps.authorId).avatar}
            alt="userAvatar"
            className="partnership_box__undertop_authorbox__avatar"
            onClick={() => goToProfile(getUser(ps.authorId))}
          />
          <div className="partnership_box__undertop_authorbox__flex">
            <p
              className="partnership_box__undertop_authorbox__nickname"
              onClick={() => goToProfile(getUser(ps.authorId))}>
              {getUser(ps.authorId).nickname}
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
          {mode !== 0 && <button className="partnership_box__undertop__btn">Создать</button>}
          {myProfile.userId === ps.authorId && mode === 0 ? (
            <svg
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              className="actions_svg"
              width="19"
              height="5"
              viewBox="0 0 19 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="2.5" cy="2.5" r="2.5" fill="#BABABA" />
              <circle cx="9.5" cy="2.5" r="2.5" fill="#BABABA" />
              <circle cx="16.5" cy="2.5" r="2.5" fill="#BABABA" />
            </svg>
          ) : (
            ps.status !== 'closed' &&
            ps.authorId !== myProfile.userId && (
              <button className="partnership_box__undertop__btn">Откликнуться</button>
            )
          )}
          {isOptionsOpen && (
            <div className="partnership_box__undertop__options">
              <ul className="partnership_box__undertop__options__list">
                <li
                  className="partnership_box__undertop__options__list__el"
                  onClick={() => editPartnership()}>
                  <svg
                    className="options_svg edit_svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.96066 10.3316L10.7796 1.51199C11.128 1.17858 11.5931 0.99484 12.0753 1.00011C12.5575 1.00538 13.0185 1.19924 13.3595 1.54019C13.7006 1.88113 13.8946 2.34206 13.9 2.82426C13.9054 3.30647 13.7218 3.77162 13.3884 4.12012L4.56807 12.9398C4.36686 13.141 4.11058 13.2782 3.83154 13.334L1 13.9004L1.56645 11.0682C1.62227 10.7891 1.75943 10.5329 1.96066 10.3316Z"
                      stroke="#BABABA"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M9.28711 3.45117L11.4491 5.6132" stroke="#BABABA" strokeWidth="2" />
                  </svg>
                  <p className="partnership_box__undertop__options__list__el__sign">
                    Редактировать
                  </p>
                </li>
                <li
                  className="partnership_box__undertop__options__list__el"
                  onClick={() => archievePartnership()}>
                  <svg
                    className="options_svg arch_svg"
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.44444 13C1.04722 13 0.707056 12.8584 0.423945 12.5753C0.140834 12.2922 -0.000480255 11.9523 1.22618e-06 11.5556V2.54584C1.22618e-06 2.37732 0.0272049 2.21482 0.0816122 2.05834C0.13602 1.90185 0.217149 1.75741 0.325001 1.625L1.22778 0.523615C1.36019 0.355096 1.52557 0.225578 1.72394 0.135059C1.92232 0.0445409 2.13007 -0.00047766 2.34722 3.82128e-06H10.6528C10.8694 3.82128e-06 11.0772 0.045263 11.2761 0.135782C11.4749 0.2263 11.6403 0.355578 11.7722 0.523615L12.675 1.625C12.7833 1.75741 12.8647 1.90185 12.9191 2.05834C12.9735 2.21482 13.0005 2.37732 13 2.54584V11.5556C13 11.9528 12.8584 12.2929 12.5753 12.5761C12.2922 12.8592 11.9523 13.0005 11.5556 13H1.44444ZM1.73333 2.16667H11.2667L10.6528 1.44445H2.34722L1.73333 2.16667ZM9.38889 3.61111H3.61111V9.38889L6.5 7.94445L9.38889 9.38889V3.61111Z"
                      fill="#BABABA"
                    />
                  </svg>
                  <p className="partnership_box__undertop__options__list__el__sign">Архивировать</p>
                </li>
                <li
                  className="partnership_box__undertop__options__list__el"
                  onClick={() => deletePartnership()}>
                  <svg
                    className="options_svg del_svg"
                    width="10"
                    height="13"
                    viewBox="0 0 10 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.01786 0.449414C3.13839 0.172656 3.38616 0 3.65625 0H6.34375C6.61384 0 6.86161 0.172656 6.98214 0.449414L7.14286 0.8125H9.28571C9.6808 0.8125 10 1.17559 10 1.625C10 2.07441 9.6808 2.4375 9.28571 2.4375H0.714286C0.319196 2.4375 0 2.07441 0 1.625C0 1.17559 0.319196 0.8125 0.714286 0.8125H2.85714L3.01786 0.449414ZM0.714286 3.25H9.28571V11.375C9.28571 12.2713 8.64509 13 7.85714 13H2.14286C1.35491 13 0.714286 12.2713 0.714286 11.375V3.25ZM2.85714 4.875C2.66071 4.875 2.5 5.05781 2.5 5.28125V10.9688C2.5 11.1922 2.66071 11.375 2.85714 11.375C3.05357 11.375 3.21429 11.1922 3.21429 10.9688V5.28125C3.21429 5.05781 3.05357 4.875 2.85714 4.875ZM5 4.875C4.80357 4.875 4.64286 5.05781 4.64286 5.28125V10.9688C4.64286 11.1922 4.80357 11.375 5 11.375C5.19643 11.375 5.35714 11.1922 5.35714 10.9688V5.28125C5.35714 5.05781 5.19643 4.875 5 4.875ZM7.14286 4.875C6.94643 4.875 6.78571 5.05781 6.78571 5.28125V10.9688C6.78571 11.1922 6.94643 11.375 7.14286 11.375C7.33929 11.375 7.5 11.1922 7.5 10.9688V5.28125C7.5 5.05781 7.33929 4.875 7.14286 4.875Z"
                      fill="#BABABA"
                    />
                  </svg>
                  <p className="partnership_box__undertop__options__list__el__sign">Удалить</p>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="partnership_box__undertop__line"></div>
      </div>
      <div className="partnership_box__statusnamebox">
        <p className="partnership_box__statusnamebox__status">Статус: {getStatus(ps.status)}</p>
        {(mode !== 0 || myProfile.userId === ps.authorId) &&
          (isPopupOpen ? (
            <svg
              className="partnership_box__statusnamebox_svg triangle_down_svg"
              onClick={() => setIsPopupOpen(!isPopupOpen)}
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z" fill="#BABABA" />
            </svg>
          ) : (
            <svg
              className="partnership_box__statusnamebox_svg triangle_left_svg"
              onClick={() => setIsPopupOpen(!isPopupOpen)}
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                fill="#BABABA"
              />
            </svg>
          ))}
        {(mode !== 0 || myProfile.userId === ps.authorId) && isPopupOpen && (
          <div className="partnership_box__popup">
            <ul className="partnership_box__popup__list">
              <li
                className="partnership_box__popup__list__element"
                onClick={() => changePartnershipStatus()}>
                Открыто<p className="partnership_box__popup__list__element__p"></p>
              </li>
              <li
                className="partnership_box__popup__list__element"
                onClick={() => changePartnershipStatus()}>
                В процессе<p className="partnership_box__popup__list__element__p"></p>
              </li>
              <li
                className="partnership_box__popup__list__element"
                onClick={() => changePartnershipStatus()}>
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
        {(ps.status !== 'opened' || myProfile.userId === ps.authorId) && (
          <p className="partnership_box__databox__sign">Партнёры:</p>
        )}
        {(ps.status !== 'opened' || myProfile.userId === ps.authorId) && (
          <div className="partnership_box__databox__partners">
            {ps.partners.map((item, idx) => {
              return (
                <img
                  key={idx}
                  onClick={() => goToProfile(getUser(item))}
                  src={getUser(item).avatar}
                  className="partnership_box__databox__partners__avatar"
                  alt="partnership_box__databox__partners__avatar"
                />
              );
            })}
            {ps.status !== 'closed' && myProfile.userId === ps.authorId && mode !== 0 && (
              <button className="partnership_box__databox__partners__invite-btn">
                + Пригласить
              </button>
            )}
          </div>
        )}
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
        {mode !== 0 && myProfile.userId === ps.authorId && (
          <div className="partnership_box__databox__add-photo">
            <button className="partnership_box__databox__add-photo__btn"> + Добавить фото</button>
          </div>
        )}
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
          <p className="partnership_box__databox__sign">Предыдущие партнёрства автора:</p>
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
                    canClose={mode === 0 ? false : true}
                    key={idx}
                    ps={partnership_data[item - 1]}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>

      <div
        className="newsware_icons partnership_icons"
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
        <p className="time_bottom">{Conversion('time', new Date(ps.time))}</p>
      </div>

      {/*  Комменты 
      <div
        className="partnership_box__commentbox"
      </div> */}
    </div>
  );
};
export default Partnership;
