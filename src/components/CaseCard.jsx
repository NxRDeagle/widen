import React from 'react';

import { mainContext, userId } from '../App';

import { NewswareContext } from '../components/Newsware';

import '../css/CaseCard.css';

const CaseCard = () => {
  const {
    navigate,
    page,
    goToComments,
    goToPreview,
    globalFilters,
    OtherGlobalFilterHandler,
    clickGlobalFilter,
  } = React.useContext(mainContext);

  const {
    onClickIcon,
    statsCount,
    profile,
    full,
    newswareId,
    authorId,
    imgs,
    signImgs,
    geoposition,
    time,
    tags,
    newswareStates,
    setNewswareStates,
    onClickSub,
  } = React.useContext(NewswareContext);

  const [isActionsOpened, setIsActionsOpened] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState(0);

  const chooseAction = (act) => {
    setSelectedAction(act);
    setTimeout(() => {
      setIsActionsOpened(false);
      if (act === 1) navigate('/change_interests');
      else if (act === 4) navigate('/complaint');
      setSelectedAction(0);
    }, 250);
  };

  return (
    <>
      {OtherGlobalFilterHandler(tags, globalFilters.tags) ? (
        <div
          className={
            full ? 'newsware_item open_newsware_item' : page !== 'search' ? 'newsware_item' : ''
          }>
          {!full ? (
            <div className={page === 'search' ? 'none_active' : 'author_newsware_item'}>
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
                  className={newswareStates.isSub ? 'remove_friend_box ' : 'add_friend_box'}>
                  {newswareStates.isSub ? (
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
                  className={
                    newswareStates.isSub === true ? 'remove_friend_box ' : 'add_friend_box'
                  }>
                  {newswareStates.isSub === true ? (
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

          {!full ? (
            <div className={page === 'search' ? 'search_case_box' : 'case_box'}>
              {page !== 'search' && (
                <svg
                  className="case_actions_icon"
                  onClick={() => {
                    setIsActionsOpened(!isActionsOpened);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="5"
                  viewBox="0 0 21 5"
                  fill="none">
                  <circle cx="2.5" cy="2.5" r="2.5" fill="#BABABA" />
                  <circle cx="10.5" cy="2.5" r="2.5" fill="#BABABA" />
                  <circle cx="18.5" cy="2.5" r="2.5" fill="#BABABA" />
                </svg>
              )}
              {page !== 'search' && isActionsOpened && (
                <div className="case_actions_container">
                  <div
                    className={
                      selectedAction === 1 ? 'action_div action_is_selected' : 'action_div'
                    }
                    onClick={() => chooseAction(1)}>
                    Уведомлять о новых записях {profile.nickname}
                  </div>
                  <div
                    className={
                      selectedAction === 2 ? 'action_div action_is_selected' : 'action_div'
                    }
                    onClick={() => chooseAction(2)}>
                    Мне это не интересно
                  </div>
                  <div
                    className={
                      selectedAction === 3 ? 'action_div action_is_selected' : 'action_div'
                    }
                    onClick={() => chooseAction(3)}>
                    Скрывать записи {profile.nickname}
                  </div>

                  <div
                    className={
                      selectedAction === 4 ? 'action_div action_is_selected' : 'action_div'
                    }
                    onClick={() => chooseAction(4)}>
                    Пожаловаться
                  </div>
                </div>
              )}
              <img
                onClick={() => goToComments(newswareId)}
                className="case_picture"
                src={imgs[0]}
                alt="case"
              />
              <p className={page === 'search' ? 'search_case_header' : 'case_header'}>
                {signImgs[0]}
              </p>
              <div
                className={page === 'search' ? 'search_author_case_avatar' : 'author_case_avatar'}>
                <img
                  className="avatar_picture"
                  src={profile.avatar}
                  alt="user avatar"
                  onClick={() => goToPreview(profile)}
                />
              </div>
              <p
                className={
                  page === 'search' ? 'search_author_case_nickname' : 'author_case_nickname'
                }>
                {profile.nickname}
              </p>
              {page === 'search' ? (
                <i
                  onClick={(e) => {
                    if (!e.target.getAttribute('name')) {
                      return;
                    } else {
                      onClickIcon(e.target.getAttribute('name').split(' ')[0]);
                    }
                  }}>
                  <svg
                    name="icon-flag"
                    className="favorite_search_case_icon"
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      name="icon-flag"
                      d="M2 14.95L7 12.8L12 14.95V2H2V14.95ZM1.4 17.4C1.06667 17.5333 0.75 17.504 0.45 17.312C0.15 17.1207 0 16.8417 0 16.475V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V16.475C14 16.8417 13.85 17.1207 13.55 17.312C13.25 17.504 12.9333 17.5333 12.6 17.4L7 15L1.4 17.4ZM2 2H12H7H2Z"
                      fill={newswareStates.activeFavorite ? '#7E52EE' : 'white'}
                    />
                    <path
                      name="icon-flag"
                      d="M2 14.95L7 12.8L12 14.95V2H7H2V14.95Z"
                      fill={newswareStates.activeFavorite ? '#7E52EE' : 'white'}
                    />
                  </svg>
                </i>
              ) : null}
            </div>
          ) : (
            <div id={`case_id_${authorId}`}>Здесь я разврётан</div>
          )}

          <div
            className={page === 'search' ? 'none_active' : 'newsware_icons'}
            onClick={(e) => {
              if (!e.target.getAttribute('name')) {
                return;
              } else {
                onClickIcon(e.target.getAttribute('name').split(' ')[0]);
              }
            }}>
            {newswareStates.activeLike &&
              !newswareStates.clickUseful &&
              setTimeout(() => {
                setNewswareStates({ ...newswareStates, clickUseful: true });
              }, 3000) && (
                <svg
                  className={newswareStates.isUseful ? 'useful is_useful' : 'useful not_useful'}
                  name="icon-useful"
                  width="165"
                  height="64"
                  viewBox="0 0 165 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    name="icon-useful"
                    d="M29.9527 14.0526C7.13946 14.0526 1.21309 5.96328 1.00571 1.48383V37.9825C1.00571 57.1263 20.3037 62.6374 29.9527 63H136.931C146.16 62.2749 164.493 56.2561 163.99 37.9825C163.486 19.7088 145.741 14.4152 136.931 14.0526H29.9527Z"
                    fill={newswareStates.isUseful ? '#BABABA' : 'white'}
                  />
                  <path
                    name="icon-useful"
                    d="M29.9527 14.0526C53.6137 14.0526 111.13 14.0526 136.931 14.0526M29.9527 14.0526C7.13946 14.0526 1.21309 5.96328 1.00571 1.48383M29.9527 14.0526H136.931M136.931 14.0526C145.741 14.4152 163.486 19.7088 163.99 37.9825C164.493 56.2561 146.16 62.2749 136.931 63H29.9527C20.3037 62.6374 1.00571 57.1263 1.00571 37.9825M1.00571 37.9825V1.48383M1.00571 37.9825C1.00571 19.5004 1.00571 6.29016 1.00571 1.48383M1.00571 1.48383C1.00571 1.31173 1.00571 1.15041 1.00571 1C0.998193 1.15589 0.998002 1.31737 1.00571 1.48383Z"
                    stroke="#BABABA"
                  />
                  <path
                    name="icon-useful"
                    d="M42.2104 32.3027C42.6792 32.7715 43.0405 33.3525 43.2944 34.0459C43.5483 34.7393 43.6753 35.5596 43.6753 36.5068C43.6753 37.3467 43.5459 38.1206 43.2871 38.8286C43.0332 39.5317 42.6646 40.1348 42.1812 40.6377C41.6831 41.1553 41.0996 41.5459 40.4307 41.8096C39.7666 42.0684 39.0366 42.1978 38.2407 42.1978C37.5522 42.1978 36.8979 42.1318 36.2778 42C35.6577 41.8682 35.1353 41.7119 34.7104 41.5312V39.9272H34.8276C35.2231 40.2446 35.7212 40.4985 36.3218 40.689C36.9272 40.8745 37.5742 40.9673 38.2627 40.9673C38.8633 40.9673 39.4126 40.8623 39.9106 40.6523C40.4087 40.4375 40.8237 40.147 41.1558 39.7808C41.5073 39.3901 41.771 38.9507 41.9468 38.4624C42.1274 37.9692 42.2178 37.4102 42.2178 36.7852H36.2632V35.5181H42.1445C42.0762 34.937 41.9297 34.4341 41.7051 34.0093C41.4805 33.5796 41.1948 33.2256 40.8481 32.9473C40.5015 32.6689 40.1084 32.4639 39.6689 32.332C39.2295 32.1953 38.7607 32.127 38.2627 32.127C37.5938 32.127 36.9663 32.2222 36.3804 32.4126C35.7944 32.5981 35.2891 32.8545 34.8643 33.1816H34.7397V31.5703C35.1938 31.3799 35.731 31.2212 36.3511 31.0942C36.9712 30.9624 37.606 30.8965 38.2554 30.8965C39.0952 30.8965 39.8447 31.0137 40.5039 31.248C41.168 31.4824 41.7368 31.834 42.2104 32.3027ZM51.8857 35.0273H48.9268V42H47.5498V35.0273H44.5908V33.8188H51.8857V35.0273ZM60.2866 37.9131C60.2866 39.2461 59.9448 40.2983 59.2612 41.0698C58.5776 41.8413 57.6621 42.2271 56.5146 42.2271C55.3574 42.2271 54.437 41.8413 53.7534 41.0698C53.0747 40.2983 52.7354 39.2461 52.7354 37.9131C52.7354 36.5801 53.0747 35.5278 53.7534 34.7563C54.437 33.98 55.3574 33.5918 56.5146 33.5918C57.6621 33.5918 58.5776 33.98 59.2612 34.7563C59.9448 35.5278 60.2866 36.5801 60.2866 37.9131ZM58.8657 37.9131C58.8657 36.8535 58.6582 36.0674 58.2432 35.5547C57.8281 35.0371 57.252 34.7783 56.5146 34.7783C55.7676 34.7783 55.1865 35.0371 54.7715 35.5547C54.3613 36.0674 54.1562 36.8535 54.1562 37.9131C54.1562 38.9385 54.3638 39.7173 54.7788 40.2495C55.1938 40.7769 55.7725 41.0405 56.5146 41.0405C57.2471 41.0405 57.8208 40.7793 58.2358 40.2568C58.6558 39.7295 58.8657 38.9482 58.8657 37.9131ZM74.5469 42H73.1699V35.0054H69.0757V42H67.6987V33.8188H74.5469V42ZM84.2368 37.9131C84.2368 39.2461 83.895 40.2983 83.2114 41.0698C82.5278 41.8413 81.6123 42.2271 80.4648 42.2271C79.3076 42.2271 78.3872 41.8413 77.7036 41.0698C77.0249 40.2983 76.6855 39.2461 76.6855 37.9131C76.6855 36.5801 77.0249 35.5278 77.7036 34.7563C78.3872 33.98 79.3076 33.5918 80.4648 33.5918C81.6123 33.5918 82.5278 33.98 83.2114 34.7563C83.895 35.5278 84.2368 36.5801 84.2368 37.9131ZM82.8159 37.9131C82.8159 36.8535 82.6084 36.0674 82.1934 35.5547C81.7783 35.0371 81.2021 34.7783 80.4648 34.7783C79.7178 34.7783 79.1367 35.0371 78.7217 35.5547C78.3115 36.0674 78.1064 36.8535 78.1064 37.9131C78.1064 38.9385 78.314 39.7173 78.729 40.2495C79.144 40.7769 79.7227 41.0405 80.4648 41.0405C81.1973 41.0405 81.771 40.7793 82.186 40.2568C82.606 39.7295 82.8159 38.9482 82.8159 37.9131ZM92.9746 42H91.5977V34.9761H88.5435C88.5288 35.3813 88.5142 35.772 88.4995 36.1479C88.4849 36.5239 88.4702 36.8633 88.4556 37.166C88.4214 37.9814 88.3652 38.6333 88.2871 39.1216C88.209 39.605 88.1064 40.0078 87.9795 40.3301C87.8623 40.6328 87.7305 40.8794 87.584 41.0698C87.4424 41.2554 87.2886 41.4238 87.1226 41.5752C86.9565 41.7217 86.771 41.8315 86.5659 41.9048C86.3657 41.978 86.146 42.0146 85.9067 42.0146C85.8237 42.0146 85.7017 42.0122 85.5405 42.0073C85.3843 42.0024 85.2817 42 85.2329 42V40.7988H85.3062C85.3452 40.7988 85.4014 40.8013 85.4746 40.8062C85.5479 40.811 85.6089 40.8135 85.6577 40.8135C85.7749 40.8135 85.8945 40.7964 86.0166 40.7622C86.1436 40.728 86.251 40.6646 86.3389 40.5718C86.5879 40.3276 86.7881 39.915 86.9395 39.334C87.0908 38.7529 87.1909 37.9131 87.2397 36.8145C87.2593 36.4141 87.2764 35.9404 87.291 35.3936C87.3105 34.8418 87.3276 34.3169 87.3423 33.8188H92.9746V42ZM102.54 38.0522H96.5122C96.5122 38.5552 96.5879 38.9946 96.7393 39.3706C96.8906 39.7417 97.0981 40.0469 97.3618 40.2861C97.6157 40.5205 97.916 40.6963 98.2627 40.8135C98.6143 40.9307 99 40.9893 99.4199 40.9893C99.9766 40.9893 100.536 40.8794 101.097 40.6597C101.664 40.4351 102.066 40.2153 102.306 40.0005H102.379V41.502C101.915 41.6973 101.441 41.8608 100.958 41.9927C100.475 42.1245 99.9668 42.1904 99.4346 42.1904C98.0771 42.1904 97.0176 41.8242 96.2559 41.0918C95.4941 40.3545 95.1133 39.3096 95.1133 37.957C95.1133 36.6191 95.4771 35.5571 96.2046 34.771C96.937 33.9849 97.8989 33.5918 99.0903 33.5918C100.194 33.5918 101.043 33.9141 101.639 34.5586C102.24 35.2031 102.54 36.1187 102.54 37.3052V38.0522ZM101.2 36.9976C101.195 36.2749 101.012 35.7158 100.65 35.3203C100.294 34.9248 99.7495 34.7271 99.0171 34.7271C98.2798 34.7271 97.6914 34.9443 97.252 35.3789C96.8174 35.8135 96.5708 36.353 96.5122 36.9976H101.2ZM110.318 39.7075C110.318 40.1665 110.211 40.5547 109.996 40.8721C109.786 41.1895 109.515 41.4458 109.183 41.6411C108.851 41.8315 108.485 41.9707 108.084 42.0586C107.684 42.1465 107.284 42.1904 106.883 42.1904C106.317 42.1904 105.777 42.1367 105.265 42.0293C104.752 41.9219 104.247 41.7559 103.749 41.5312V40.0225H103.844C104.2 40.335 104.654 40.5767 105.206 40.7476C105.758 40.9185 106.292 41.0039 106.81 41.0039C107.054 41.0039 107.306 40.9819 107.564 40.938C107.823 40.8892 108.048 40.8135 108.238 40.7109C108.443 40.5938 108.607 40.4546 108.729 40.2935C108.851 40.1274 108.912 39.9028 108.912 39.6196C108.912 39.3267 108.851 39.0923 108.729 38.9165C108.612 38.7407 108.451 38.6089 108.246 38.521C108.045 38.4331 107.804 38.3794 107.521 38.3599C107.237 38.3403 106.979 38.3306 106.744 38.3306H105.55V37.144H106.378C106.573 37.144 106.827 37.1367 107.14 37.1221C107.457 37.1074 107.713 37.0684 107.909 37.0049C108.163 36.9219 108.363 36.8047 108.509 36.6533C108.661 36.502 108.736 36.2603 108.736 35.9282C108.736 35.6987 108.678 35.5107 108.561 35.3643C108.443 35.2129 108.297 35.0957 108.121 35.0127C107.94 34.9297 107.738 34.8735 107.513 34.8442C107.293 34.8149 107.098 34.8003 106.927 34.8003C106.429 34.8003 105.938 34.8687 105.455 35.0054C104.977 35.1372 104.574 35.3301 104.247 35.584H104.151V34.0679C104.557 33.936 104.991 33.8286 105.455 33.7456C105.919 33.6626 106.383 33.6211 106.847 33.6211C107.228 33.6211 107.606 33.6553 107.982 33.7236C108.363 33.792 108.717 33.9092 109.044 34.0752C109.366 34.2412 109.63 34.4683 109.835 34.7563C110.04 35.0396 110.143 35.3911 110.143 35.811C110.143 36.2407 110.008 36.6191 109.74 36.9463C109.476 37.2686 109.12 37.5005 108.67 37.6421V37.6934C109.173 37.8154 109.574 38.0449 109.872 38.3818C110.169 38.7139 110.318 39.1558 110.318 39.7075ZM119.342 42H117.965V38.3159H113.871V42H112.494V33.8188H113.871V37.1294H117.965V33.8188H119.342V42ZM129.032 37.9131C129.032 39.2461 128.69 40.2983 128.006 41.0698C127.323 41.8413 126.407 42.2271 125.26 42.2271C124.103 42.2271 123.182 41.8413 122.499 41.0698C121.82 40.2983 121.48 39.2461 121.48 37.9131C121.48 36.5801 121.82 35.5278 122.499 34.7563C123.182 33.98 124.103 33.5918 125.26 33.5918C126.407 33.5918 127.323 33.98 128.006 34.7563C128.69 35.5278 129.032 36.5801 129.032 37.9131ZM127.611 37.9131C127.611 36.8535 127.403 36.0674 126.988 35.5547C126.573 35.0371 125.997 34.7783 125.26 34.7783C124.513 34.7783 123.932 35.0371 123.517 35.5547C123.106 36.0674 122.901 36.8535 122.901 37.9131C122.901 38.9385 123.109 39.7173 123.524 40.2495C123.939 40.7769 124.518 41.0405 125.26 41.0405C125.992 41.0405 126.566 40.7793 126.981 40.2568C127.401 39.7295 127.611 38.9482 127.611 37.9131Z"
                    fill={newswareStates.isUseful ? 'white' : 'black'}
                  />
                </svg>
              )}
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
            <div
              style={{ position: 'absolute', right: '40px', marginRight: '0px' }}
              className="newsware_icon_box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none">
                <path
                  d="M5.1625 0.991775C6.01497 0.346186 7.05565 -0.00201584 8.125 0.000552072C8.49431 -0.00772922 8.85974 0.077273 9.18748 0.247693C9.51522 0.418113 9.79468 0.668446 10 0.975525C10.2053 0.668446 10.4848 0.418113 10.8125 0.247693C11.1403 0.077273 11.5057 -0.00772922 11.875 0.000552072C12.9443 -0.00201584 13.985 0.346186 14.8375 0.991775C15.4937 1.50176 16 2.20799 16.1787 3.06172C16.5887 3.09297 16.9637 3.26296 17.2787 3.5192C17.7563 3.90669 18.1038 4.48793 18.3225 5.10291C18.665 6.05913 18.7575 7.27785 18.4025 8.31532C18.4925 8.35782 18.5812 8.40782 18.6675 8.46532C19.0112 8.69406 19.2725 9.02155 19.465 9.40779C19.8438 10.164 20 11.219 20 12.5002C20 13.9264 19.4563 14.8839 18.7663 15.4751C18.3847 15.8023 17.9344 16.0394 17.4487 16.1689C17.3237 16.8663 16.9738 17.6738 16.425 18.3588C15.7125 19.2525 14.6075 20 13.125 20C11.95 20 11.015 19.35 10.4075 18.7125C10.2623 18.5603 10.1262 18.3996 10 18.2313C9.87383 18.3996 9.73775 18.5603 9.5925 18.7125C8.985 19.35 8.05125 20 6.875 20C5.3925 20 4.28875 19.2525 3.575 18.3588C3.0622 17.722 2.71097 16.9707 2.55125 16.1689C2.0656 16.0394 1.61531 15.8023 1.23375 15.4751C0.54375 14.8839 0 13.9252 0 12.5002C0 11.219 0.1575 10.1628 0.535 9.40779C0.713912 9.02901 0.988857 8.70365 1.3325 8.46407C1.41692 8.40818 1.50552 8.35887 1.5975 8.31657C1.2425 7.2766 1.335 6.05913 1.6775 5.10291C1.89625 4.48793 2.24375 3.90669 2.72125 3.5192C3.03625 3.26296 3.41125 3.09422 3.82125 3.06172C4.00125 2.20799 4.50625 1.50176 5.1625 0.991775ZM9.375 3.12547V3.11297L9.3725 3.05047C9.3541 2.72461 9.28928 2.40304 9.18 2.09549C9.1022 1.86333 8.96973 1.65326 8.79375 1.48301C8.60912 1.32224 8.36955 1.23895 8.125 1.25052C7.33368 1.2478 6.56306 1.50321 5.93 1.978C5.35 2.42923 5 3.04047 5 3.75045C4.99992 3.84943 4.97634 3.94697 4.93119 4.03505C4.88605 4.12313 4.82062 4.19923 4.74031 4.25708C4.66 4.31493 4.5671 4.35288 4.46925 4.36781C4.3714 4.38273 4.27141 4.37421 4.1775 4.34293C3.9425 4.26543 3.7325 4.30918 3.50875 4.48918C3.26375 4.68917 3.025 5.04416 2.85375 5.5229C2.505 6.50037 2.54125 7.68409 3.02 8.40407C3.08837 8.50661 3.1249 8.62707 3.125 8.75031H4.0625C4.80842 8.75031 5.52379 9.04662 6.05124 9.57405C6.57868 10.1015 6.875 10.8168 6.875 11.5627V11.9815C7.29201 12.1289 7.64347 12.419 7.86727 12.8005C8.09107 13.182 8.17279 13.6303 8.098 14.0662C8.0232 14.5022 7.79671 14.8976 7.45854 15.1827C7.12037 15.4678 6.6923 15.6241 6.25 15.6241C5.8077 15.6241 5.37963 15.4678 5.04146 15.1827C4.70329 14.8976 4.4768 14.5022 4.402 14.0662C4.32721 13.6303 4.40893 13.182 4.63273 12.8005C4.85653 12.419 5.20799 12.1289 5.625 11.9815V11.5627C5.625 10.7003 4.925 10.0003 4.0625 10.0003H1.875C1.80028 10.0002 1.72618 9.9866 1.65625 9.96028L1.6525 9.96778C1.405 10.4615 1.25 11.2815 1.25 12.5002C1.25 13.5739 1.64375 14.1789 2.0475 14.5252C2.48125 14.8976 2.9625 15.0001 3.125 15.0001C3.29076 15.0001 3.44973 15.066 3.56694 15.1832C3.68415 15.3004 3.75 15.4594 3.75 15.6251C3.75 16.0851 4 16.8888 4.55 17.5788C5.08625 18.2475 5.8575 18.75 6.875 18.75C7.575 18.75 8.2025 18.3588 8.6875 17.8501C8.92625 17.6001 9.1125 17.3413 9.23375 17.1288C9.28894 17.0346 9.33619 16.9359 9.375 16.8338V6.87536H8.01875C7.87132 7.29236 7.58121 7.64381 7.1997 7.8676C6.81819 8.0914 6.36985 8.17312 5.93392 8.09832C5.49798 8.02353 5.10252 7.79704 4.81743 7.45888C4.53235 7.12072 4.37598 6.69267 4.37598 6.25038C4.37598 5.80809 4.53235 5.38003 4.81743 5.04188C5.10252 4.70372 5.49798 4.47723 5.93392 4.40243C6.36985 4.32764 6.81819 4.40936 7.1997 4.63315C7.58121 4.85695 7.87132 5.2084 8.01875 5.6254H9.375V3.12547ZM10.625 15.6239V16.8326C10.6638 16.9347 10.7111 17.0333 10.7662 17.1276C10.8888 17.3401 11.0737 17.5988 11.3112 17.8488C11.7975 18.3575 12.4263 18.7488 13.125 18.7488C14.1425 18.7488 14.9137 18.2463 15.45 17.5776C16 16.8876 16.25 16.0839 16.25 15.6239C16.25 15.4581 16.3158 15.2991 16.4331 15.1819C16.5503 15.0647 16.7092 14.9989 16.875 14.9989C17.0375 14.9989 17.5187 14.8964 17.9525 14.5239C18.3562 14.1777 18.75 13.5727 18.75 12.499C18.75 11.2802 18.5938 10.4615 18.3475 9.96653C18.2651 9.78221 18.1358 9.62274 17.9725 9.50404C17.8318 9.41407 17.6669 9.36916 17.5 9.37529C17.3869 9.37523 17.276 9.34451 17.1791 9.2864C17.0821 9.22829 17.0027 9.14497 16.9493 9.0453C16.896 8.94564 16.8706 8.83337 16.876 8.72045C16.8814 8.60753 16.9174 8.49818 16.98 8.40407C17.46 7.68409 17.495 6.50037 17.1462 5.5229C16.975 5.04416 16.7362 4.68792 16.4912 4.48918C16.2675 4.30918 16.0575 4.26418 15.8225 4.34293C15.7286 4.37421 15.6286 4.38273 15.5308 4.36781C15.4329 4.35288 15.34 4.31493 15.2597 4.25708C15.1794 4.19923 15.114 4.12313 15.0688 4.03505C15.0237 3.94697 15.0001 3.84943 15 3.75045C15 3.04047 14.65 2.42923 14.0688 1.978C13.436 1.50347 12.6659 1.24808 11.875 1.25052C11.6305 1.23895 11.3909 1.32224 11.2063 1.48301C11.0297 1.65307 10.8968 1.86316 10.8187 2.09549C10.6997 2.42199 10.6343 2.76558 10.625 3.11297V14.3752H11.5625C12.425 14.3752 13.125 13.6752 13.125 12.8127V10.519C12.708 10.3716 12.3565 10.0815 12.1327 9.69998C11.9089 9.31849 11.8272 8.87016 11.902 8.43424C11.9768 7.99831 12.2033 7.60287 12.5415 7.31778C12.8796 7.0327 13.3077 6.87634 13.75 6.87634C14.1923 6.87634 14.6204 7.0327 14.9585 7.31778C15.2967 7.60287 15.5232 7.99831 15.598 8.43424C15.6728 8.87016 15.5911 9.31849 15.3673 9.69998C15.1435 10.0815 14.792 10.3716 14.375 10.519V12.8127C14.375 13.5586 14.0787 14.2739 13.5512 14.8014C13.0238 15.3288 12.3084 15.6251 11.5625 15.6251H10.625V15.6239ZM5.625 6.25038C5.625 6.41613 5.69085 6.5751 5.80806 6.69231C5.92527 6.80952 6.08424 6.87536 6.25 6.87536C6.41576 6.87536 6.57473 6.80952 6.69194 6.69231C6.80915 6.5751 6.875 6.41613 6.875 6.25038C6.875 6.08462 6.80915 5.92566 6.69194 5.80845C6.57473 5.69124 6.41576 5.6254 6.25 5.6254C6.08424 5.6254 5.92527 5.69124 5.80806 5.80845C5.69085 5.92566 5.625 6.08462 5.625 6.25038ZM13.75 9.37529C13.9158 9.37529 14.0747 9.30945 14.1919 9.19224C14.3092 9.07503 14.375 8.91607 14.375 8.75031C14.375 8.58455 14.3092 8.42559 14.1919 8.30838C14.0747 8.19117 13.9158 8.12533 13.75 8.12533C13.5842 8.12533 13.4253 8.19117 13.3081 8.30838C13.1908 8.42559 13.125 8.58455 13.125 8.75031C13.125 8.91607 13.1908 9.07503 13.3081 9.19224C13.4253 9.30945 13.5842 9.37529 13.75 9.37529ZM6.25 13.1252C6.08424 13.1252 5.92527 13.191 5.80806 13.3082C5.69085 13.4254 5.625 13.5844 5.625 13.7502C5.625 13.9159 5.69085 14.0749 5.80806 14.1921C5.92527 14.3093 6.08424 14.3752 6.25 14.3752C6.41576 14.3752 6.57473 14.3093 6.69194 14.1921C6.80915 14.0749 6.875 13.9159 6.875 13.7502C6.875 13.5844 6.80915 13.4254 6.69194 13.3082C6.57473 13.191 6.41576 13.1252 6.25 13.1252Z"
                  fill="#BABABA"
                />
                <path
                  d="M5.625 6.25038C5.625 6.41613 5.69085 6.5751 5.80806 6.69231C5.92527 6.80952 6.08424 6.87536 6.25 6.87536C6.41576 6.87536 6.57473 6.80952 6.69194 6.69231C6.80915 6.5751 6.875 6.41613 6.875 6.25038C6.875 6.08462 6.80915 5.92566 6.69194 5.80845C6.57473 5.69124 6.41576 5.6254 6.25 5.6254C6.08424 5.6254 5.92527 5.69124 5.80806 5.80845C5.69085 5.92566 5.625 6.08462 5.625 6.25038Z"
                  fill="#BABABA"
                />
                <path
                  d="M6.25 13.1252C6.08424 13.1252 5.92527 13.191 5.80806 13.3082C5.69085 13.4254 5.625 13.5844 5.625 13.7502C5.625 13.9159 5.69085 14.0749 5.80806 14.1921C5.92527 14.3093 6.08424 14.3752 6.25 14.3752C6.41576 14.3752 6.57473 14.3093 6.69194 14.1921C6.80915 14.0749 6.875 13.9159 6.875 13.7502C6.875 13.5844 6.80915 13.4254 6.69194 13.3082C6.57473 13.191 6.41576 13.1252 6.25 13.1252Z"
                  fill="#BABABA"
                />
                <path
                  d="M13.75 9.37529C13.9158 9.37529 14.0747 9.30945 14.1919 9.19224C14.3092 9.07503 14.375 8.91607 14.375 8.75031C14.375 8.58455 14.3092 8.42559 14.1919 8.30838C14.0747 8.19117 13.9158 8.12533 13.75 8.12533C13.5842 8.12533 13.4253 8.19117 13.3081 8.30838C13.1908 8.42559 13.125 8.58455 13.125 8.75031C13.125 8.91607 13.1908 9.07503 13.3081 9.19224C13.4253 9.30945 13.5842 9.37529 13.75 9.37529Z"
                  fill="#BABABA"
                />
              </svg>
              <p style={{ marginTop: '1px', color: '#BABABA' }} className="newsware_count ">
                {statsCount['useful']}
              </p>
            </div>
          </div>
          <p className={page === 'search' ? 'none_active' : 'newsware_time'}>
            {time} время число месяц
          </p>
          {full && tags ? (
            <div className="tags_box">
              {tags.map((item, index) => {
                return (
                  <button
                    onClick={(e) => clickGlobalFilter('globalCase', e.target.textContent, 'tag')}
                    key={index}
                    className="tag">
                    {item}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default CaseCard;
