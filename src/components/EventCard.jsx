import React from 'react';

import { mainContext, userId } from '../App';

import { NewswareContext } from '../components/Newsware';

import '../css/EventCard.css';

const EventCard = () => {

  const {
    page,
    goToComments,
    goToFullMode,
    goToPreview
  } = React.useContext(mainContext);

  const {
    onClickIcon,
    statsCount,
    profile,
    CONTENT_LIMIT,
    full,
    newswareId,
    authorId,
    imgs,
    signImgs,
    geoposition,
    time,
    tags,
    newswareStates,
    onClickSub
  } = React.useContext(NewswareContext);

  return (
    <div className={full ? 'newsware_item open_newsware_item' : 'newsware_item'}>
      {!full ? (
        <div className="author_newsware_item ">
          <div className="avatar_author_newsware_item">
            <img
              className="avatar_picture"
              src={profile.avatar}
              alt="userAvatar"
              onClick={() => goToPreview(profile)}
            />
          </div>
          <div className="author_nick">
            <p className="nickname" onClick={() => goToPreview(profile)}>
              {profile.nickname}
            </p>
            <p className="geolocation">
              <i className="icon-geolocation" style={{ fontSize: '12px' }}></i>
              {geoposition}
            </p>
          </div>
          {page !== 'profile' && !page.includes('user_profile') && authorId !== userId ? (
            <div
              onClick={() => onClickSub()}
              className={ newswareStates.isSub === true ? 'remove_friend_box ' : 'add_friend_box'}>
              { newswareStates.isSub === true ? (
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.5 3C13.5 4.38071 12.3807 5.5 11 5.5C9.61929 5.5 8.5 4.38071 8.5 3C8.5 1.61929 9.61929 0.5 11 0.5C12.3807 0.5 13.5 1.61929 13.5 3Z"
                    stroke="black"
                  />
                  <path
                    d="M8.5 13.5H16.7681C17.2681 12.8333 18.2321 11 16.5001 9.5C15.4099 8.55583 12.6667 8 11.5001 8C10.3334 8 7.7 8.3 6.5 9.5M5.5 6.5L3 13.5L1 10.5"
                    stroke="black"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13 3C13 4.38071 11.8807 5.5 10.5 5.5C9.11929 5.5 8 4.38071 8 3C8 1.61929 9.11929 0.5 10.5 0.5C11.8807 0.5 13 1.61929 13 3Z"
                    stroke="white"
                  />
                  <path
                    d="M8 13.5H16.2681C16.7681 12.8333 17.7321 11 16.0001 9.5C14.9099 8.55583 12.1667 8 11.0001 8C9.83338 8 7.2 8.3 6 9.5M8 11.5H4M0 11.5H4M4 11.5V7M4 11.5V16"
                    stroke="white"
                  />
                </svg>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        <div
          className="author_open_newsware_item "
          style={{
            marginTop: '11px',
            paddingTop: '40px',
            alignItems: 'center',
            marginRight: '31px',
          }}>
          <div className="avatar_author_open_newsware_item ">
            <img
              className="avatar_picture"
              src={profile.avatar}
              alt="user avatar"
              onClick={() => goToPreview(profile)}
            />
          </div>

          <p className="nickname" style={{ paddingBottom: '2px' }}>
            {profile.nickname}
          </p>
          <p className="geolocation">
            <i className="icon-geolocation" style={{ fontSize: '12px' }}></i>
            {geoposition}
          </p>
          {page !== 'profile' && !page.includes('user_profile') && authorId !== userId ? (
            <div
              onClick={() => onClickSub()}
              className={ newswareStates.isSub === true ? 'remove_friend_box ' : 'add_friend_box'}>
              { newswareStates.isSub === true ? (
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.5 3C13.5 4.38071 12.3807 5.5 11 5.5C9.61929 5.5 8.5 4.38071 8.5 3C8.5 1.61929 9.61929 0.5 11 0.5C12.3807 0.5 13.5 1.61929 13.5 3Z"
                    stroke="black"
                  />
                  <path
                    d="M8.5 13.5H16.7681C17.2681 12.8333 18.2321 11 16.5001 9.5C15.4099 8.55583 12.6667 8 11.5001 8C10.3334 8 7.7 8.3 6.5 9.5M5.5 6.5L3 13.5L1 10.5"
                    stroke="black"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13 3C13 4.38071 11.8807 5.5 10.5 5.5C9.11929 5.5 8 4.38071 8 3C8 1.61929 9.11929 0.5 10.5 0.5C11.8807 0.5 13 1.61929 13 3Z"
                    stroke="white"
                  />
                  <path
                    d="M8 13.5H16.2681C16.7681 12.8333 17.7321 11 16.0001 9.5C14.9099 8.55583 12.1667 8 11.0001 8C9.83338 8 7.2 8.3 6 9.5M8 11.5H4M0 11.5H4M4 11.5V7M4 11.5V16"
                    stroke="white"
                  />
                </svg>
              )}
            </div>
          ) : null}
        </div>
      )}

      <p>Я мероприятие!</p>

      <div
        className="newsware_icons"
        onClick={(e) => {
          if (!e.target.getAttribute('name')) {
            return;
          } else {
            onClickIcon(e.target.getAttribute('name').split(' ')[0]);
          }
        }}>
        <div className="newsware_icon_box">
          <svg
            name="icon-like"
            className={newswareStates.activeLike ? 'newsware_icon_animation' : ''}
            width="25"
            height="21"
            viewBox="0 0 25 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              name="icon-like"
              d="M7.325 1C3.83188 1 1 3.72607 1 7.08868C1 13.1774 8.475 18.7125 12.5 20C16.525 18.7125 24 13.1774 24 7.08868C24 3.72607 21.1681 1 17.675 1C15.536 1 13.6442 2.02235 12.5 3.58714C11.9168 2.78742 11.1419 2.13476 10.2411 1.68442C9.34032 1.23407 8.34005 0.999311 7.325 1Z"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="newsware_count ">{statsCount['likes']}</p>
        </div>
        <div className={full ? 'none_active' : 'newsware_icon_box'}>
          <svg
            name="icon-comment"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              name="icon-comment"
              d="M10.4992 19C12.264 19.0018 14.0005 18.5996 15.5473 17.8308L18.5761 18.6072C18.8521 18.6796 19.1445 18.6837 19.4229 18.619C19.7012 18.5543 19.9552 18.4232 20.1584 18.2393C20.3616 18.0555 20.5066 17.8256 20.5781 17.5738C20.6496 17.322 20.6451 17.0574 20.5651 16.8077L19.7069 14.0673C20.8134 12.2415 21.2261 10.1373 20.8818 8.07847C20.5374 6.01965 19.4549 4.12022 17.8009 2.67237C16.1468 1.22452 14.0128 0.308464 11.7271 0.0651124C9.44143 -0.17824 7.13068 0.264595 5.15033 1.3255C3.16998 2.3864 1.62974 4.00659 0.766535 5.93685C-0.0966702 7.86711 -0.23502 10.0005 0.37277 12.0088C0.98056 14.0172 2.30082 15.7892 4.13045 17.0524C5.96009 18.3155 8.19774 18.9998 10.4992 19ZM15.4463 16.3144C15.3013 16.3165 15.1591 16.351 15.0324 16.4149C13.1707 17.4138 10.97 17.7636 8.84356 17.3984C6.71708 17.0333 4.81107 15.9783 3.48341 14.4317C2.15574 12.8851 1.49776 10.9532 1.63299 8.9987C1.76823 7.04423 2.68739 5.20163 4.21788 3.81691C5.74837 2.43218 7.78492 1.60056 9.94513 1.4782C12.1053 1.35585 14.2406 1.95117 15.95 3.15239C17.6595 4.3536 18.8254 6.07809 19.229 8.00205C19.6326 9.926 19.2461 11.9171 18.142 13.6014C18.0869 13.6877 18.0514 13.783 18.0375 13.8818C18.0237 13.9806 18.0317 14.081 18.0612 14.1769L19.0203 17.2096L15.6684 16.3418C15.5961 16.3237 15.5214 16.3145 15.4463 16.3144Z"
              fill="black"
            />
          </svg>
          <p className="newsware_count ">{statsCount['comments']}</p>
        </div>
        <div className="newsware_icon_box">
          <svg
            name="icon-repost"
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              name="icon-repost"
              d="M19.7052 7.83235L14.528 14.4669L14.1931 11.7522L14.1012 11.0079L13.3569 11.0997C8.97193 11.6407 5.66678 13.1565 3.27669 15.855C3.68051 14.2154 4.32661 12.6365 5.28316 11.2265C6.83399 8.94045 9.22883 7.05519 12.8439 6.07548L13.4717 5.90533L13.392 5.25976L13.0707 2.65512L19.7052 7.83235Z"
              fill="none"
              stroke="black"
              strokeWidth="1.5"
            />
          </svg>
          <p className="newsware_count ">{statsCount['reposts']}</p>
        </div>
        <div className="newsware_icon_box">
          <svg
            name="icon-flag"
            className={newswareStates.activeFavorite ? 'newsware_icon_animation' : ''}
            width="20"
            height="21"
            viewBox="0 0 24 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              name="icon-flag"
              d="M7 17.95L12 15.8L17 17.95V5H7V17.95ZM6.4 20.4C6.06667 20.5333 5.75 20.504 5.45 20.312C5.15 20.1207 5 19.8417 5 19.475V5C5 4.45 5.196 3.979 5.588 3.587C5.97933 3.19567 6.45 3 7 3H17C17.55 3 18.021 3.19567 18.413 3.587C18.8043 3.979 19 4.45 19 5V19.475C19 19.8417 18.85 20.1207 18.55 20.312C18.25 20.504 17.9333 20.5333 17.6 20.4L12 18L6.4 20.4ZM7 5H17H12H7Z"
              fill="black"
            />
            <path name="icon-flag" d="M7 17.95L12 15.8L17 17.95V5H12H7V17.95Z" fill="none" />
          </svg>
          <p className="newsware_count ">{statsCount['favorites']}</p>
        </div>
        <div
          style={{ position: 'absolute', right: '0', marginRight: '0px' }}
          className="newsware_icon_box">
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z"
              fill="#BABABA"
            />
          </svg>
          <p style={{ marginTop: '5px', color: '#BABABA' }} className="newsware_count ">
            {statsCount['views']}
          </p>
        </div>
      </div>
      <p className="newsware_time">{time} время число месяц</p>
      {full && tags ? (
        <div className="tags_box">
          {tags.map((item, index) => {
            return (
              <button key={index} className="tag">
                {item}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default EventCard;
