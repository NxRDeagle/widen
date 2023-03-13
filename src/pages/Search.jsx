import React from 'react';

import Footer from '../components/Footer';

import '../css/style.css';

const Search = () => {
  return (
    <>
      <div className="search-container">
        <input type="text" id="global_search" placeholder="&#xE800;" />
      </div>
      <Footer />
    </>
  );
};

export default Search;
