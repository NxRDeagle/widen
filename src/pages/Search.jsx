import React from 'react';

import Footer from '../components/Footer';

import '../css/style.css';

const Search = () => {
  return (
    <>
      <div className="search_box">
        <i className="icon-search search_input"></i>
        <input type="text" id="global_search" placeholder="глобальный поиск" />
      </div>

      <div className="search_filter">
        <button className="search_filter_btn">Кейсы</button>
        <button className="search_filter_btn">Посты</button>
        <button className="search_filter_btn">Профессионалы</button>
      </div>
      <Footer />
    </>
  );
};

export default Search;
