import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../css/style.css';
import '../css/fontello.css';
import logoPng from '../img/logo.png';

import History from './History';

const Header = () => {
  const location = useLocation();

  return (
    <header className="head_container">
      <div className="logo_box">
        <img className="logo" src={logoPng} alt="logo" />

        {location.pathname !== '/search' ? (
          <Link className="icon-search search" to="/search">
            <i></i>
          </Link>
        ) : (
          <i className="icon-search search"></i>
        )}
      </div>
      <div className="history_container">
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
        {<History />}
      </div>
      <div className="line"></div>
    </header>
  );
};

export default Header;
