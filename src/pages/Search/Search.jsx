import React from 'react';

import Newsware from '../../global_components/newsware/Newsware';
import SearchInput from '../../global_components/search/SearchInput';

import { mainContext } from '../../App';

import { GlobalTags, CategoryBtn, GlobalStar, EventFilter } from './components/search-components';

import './css/Search.css';

const Search = () => {
  const {
    activeGlobalSearch,
    globalPosts,
    globalCases,
    globalRisingStars,
    globalSharks,
    globalEvents,
    globalFilters,
    dropGlobalFilter,
    goToPreview,
  } = React.useContext(mainContext);

  const [isLoaded, setIsLoaded] = React.useState(false); //comp

  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <SearchInput placeholder="глобальный поиск" />
      {globalFilters.tags.length > 0 && (
        <div
          style={{ filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))' }}
          className="global_tags_container">
          {globalFilters.tags.map((item, index) => {
            return (
              <GlobalTags key={index} onClick={() => dropGlobalFilter('tag', item)}>
                {item}
              </GlobalTags>
            );
          })}
        </div>
      )}
      <div className="search_category_box">
        <CategoryBtn category="globalCase">Кейсы</CategoryBtn>
        <CategoryBtn category="globalPost">Посты</CategoryBtn>
        <CategoryBtn category="globalRisingStar">Восходящие звёзды</CategoryBtn>
        <CategoryBtn category="globalShark">Акулы индустрий</CategoryBtn>
        <CategoryBtn category="globalEvent">Мероприятия</CategoryBtn>
      </div>
      {activeGlobalSearch === 'globalCase' && (
        <div style={{ paddingBottom: '60px' }} className="global_search_container">
          <div className="mainBackground">
            {globalCases.map((globalCase) => {
              return <Newsware key={globalCase.newswareId} {...globalCase} />;
            })}
          </div>
        </div>
      )}
      {activeGlobalSearch === 'globalPost' && (
        <div style={{ paddingBottom: '60px' }} className="global_search_container">
          <div className="mainBackground">
            {globalPosts.map((globalPost) => {
              return <Newsware key={globalPost.newswareId} {...globalPost} />;
            })}
          </div>
        </div>
      )}
      {activeGlobalSearch === 'globalRisingStar' && (
        <div className="global_search_container">
          {globalRisingStars.map((risingStar) => {
            return <GlobalStar {...risingStar} onClick={() => goToPreview(risingStar)} />;
          })}
        </div>
      )}
      {activeGlobalSearch === 'globalShark' && (
        <div className="global_search_container">
          {globalSharks.map((shark) => {
            return <GlobalStar {...shark} onClick={() => goToPreview(shark)} />;
          })}
        </div>
      )}
      {activeGlobalSearch === 'globalEvent' && (
        <div
          className={
            isFiltersOpen ? 'global_search_container set_margin' : 'global_search_container'
          }>
          <EventFilter isFiltersOpen={isFiltersOpen} setIsFiltersOpen={setIsFiltersOpen} />

          {globalEvents.map((item) => {
            return <Newsware {...item} key={item.newswareId} />;
          })}
        </div>
      )}
    </>
  );
};

export default Search;
