import React from 'react';
import ContentLoader from 'react-content-loader';

import Footer from '../components/Footer';
import Star from '../components/Star';
import Newsware from '../components/Newsware';
import Filters from '../components/Filters';

import { mainContext } from '../App';

import '../css/Search.css';

const Search = () => {
  const {
    activeGlobalSearch,
    setActiveGlobalSearch,
    globalPosts,
    globalCases,
    globalRisingStars,
    globalSharks,
    globalEvents,
  } = React.useContext(mainContext);

  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

  const [isLoaded, setIsLoaded] = React.useState(false); //comp

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className="search_container">
        <div className="search_box">
          <i className="icon-search"></i>
          <input
            className="search_input"
            type="text"
            id="global_search"
            placeholder="глобальный поиск"
          />
        </div>
      </div>
      <div className="search_filter">
        <button
          className={
            activeGlobalSearch === 'globalCase'
              ? 'search_filter_btn active_btn'
              : 'search_filter_btn'
          }
          onClick={() => {
            setActiveGlobalSearch('globalCase');
          }}>
          <p className="search_btn_sign">Кейсы</p>
        </button>
        <button
          className={
            activeGlobalSearch === 'globalPost'
              ? 'search_filter_btn active_btn'
              : 'search_filter_btn'
          }
          onClick={() => {
            setActiveGlobalSearch('globalPost');
          }}>
          <p className="search_btn_sign">Посты</p>
        </button>
        <button
          className={
            activeGlobalSearch === 'globalRisingStar'
              ? 'search_filter_btn active_btn'
              : 'search_filter_btn'
          }
          onClick={() => {
            setActiveGlobalSearch('globalRisingStar');
          }}>
          <p className="search_btn_sign">Восходящие звезды</p>
        </button>
        <button
          className={
            activeGlobalSearch === 'globalShark'
              ? 'search_filter_btn active_btn'
              : 'search_filter_btn'
          }
          onClick={() => {
            setActiveGlobalSearch('globalShark');
          }}>
          <p className="search_btn_sign">Акулы индустрии</p>
        </button>
        <button
          className={
            activeGlobalSearch === 'globalEvent'
              ? 'search_filter_btn active_btn'
              : 'search_filter_btn'
          }
          onClick={() => {
            setActiveGlobalSearch('globalEvent');
          }}>
          <p className="search_btn_sign">Мероприятия</p>
        </button>
      </div>
      {activeGlobalSearch === 'globalCase' && (
        <div className="global_search_container">
          {isLoaded &&
            globalCases.map((item) => {
              return <Newsware key={item.newswareId} {...item} />;
            })}
        </div>
      )}
      {activeGlobalSearch === 'globalPost' && (
        <div style={{ marginTop: '20px', paddingBottom: '60px' }} className="newsware_container">
          <div className="mainBackground">
            {isLoaded ? (
              globalPosts.map((item) => {
                return <Newsware {...item} key={item.newswareId} />;
              })
            ) : (
              <div className="newsware_item">
                {[...new Array(4)].map((_, index) => {
                  return (
                    <ContentLoader
                      key={index}
                      speed={1}
                      width={360}
                      height={300}
                      viewBox="0 0 360 300"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#7e52ee">
                      <circle cx="47" cy="16" r="16" />
                      <rect x="72" y="5" rx="3" ry="3" width="65" height="8" />
                      <rect x="72" y="20" rx="3" ry="3" width="50" height="6" />
                      <rect x="31" y="50" rx="3" ry="3" width="320" height="8" />
                      <rect x="31" y="70" rx="10" ry="10" width="320" height="188" />
                    </ContentLoader>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
      {(activeGlobalSearch === 'globalRisingStar' || activeGlobalSearch === 'globalShark') && (
        <div className="global_search_container">
          {globalRisingStars.map((profile) => {
            return <Star {...profile} key={profile.userId} />;
          })}
        </div>
      )}
      {activeGlobalSearch === 'globalEvent' && (
        <div
          className={
            isFiltersOpen ? 'global_search_container set_margin' : 'global_search_container'
          }>
          <Filters isFiltersOpen={isFiltersOpen} setIsFiltersOpen={setIsFiltersOpen} />

          {
            /* {userEvents.map((user, idx) => {
            return <EventCard {...user} key={idx} />;
          })} */

            isLoaded && // ЭТО ПОСТЫ ВМЕСТО МЕРОПРИЯТИЙ, УБРАТЬ ИХ ПОТОМ
              globalEvents.map((item) => {
                return <Newsware {...item} key={item.newswareId} />;
              })
          }
        </div>
      )}
      <Footer />
    </>
  );
};

export default Search;
