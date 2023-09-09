import React from 'react';

import Header from '../components/Header';

import { mainContext } from '../App';

import arrowSvg from '../img/arrow.svg';

import '../css/NotFound.css';

const NotFound = () => {

  const { goInput } = React.useContext(mainContext);

  return (
    <>
      <Header />
      <div className="not_found_container">
        <h1 className="not_found_header">
          Страница не найдена <span className="emoji">😔</span>
        </h1>
        <div className="go_back" onClick={() => goInput()}>
          <img loading='lazy' className="go_back_arrow" src={arrowSvg} alt="Arrow" />
          <button className="go_back_button">Вернуться на главную</button>
        </div>
      </div>
    </>
  );
};
export default NotFound;
