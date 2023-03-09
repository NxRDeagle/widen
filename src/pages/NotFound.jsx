import React from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

import { mainContext } from '../App';

import '../css/style.css';
import arrowSvg from '../img/arrow.svg';

const NotFound = () => {
  const { setPage } = React.useContext(mainContext);

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
    setPage('home');
  };

  return (
    <>
      <Header />
      <div className="not_found_container">
        <h1 className="not_found_header">
          Страница не найдена <span className="emoji">😔</span>
        </h1>
        <div className="go_back" onClick={goBack}>
          <img className="go_back_arrow" src={arrowSvg} alt="Arrow" />
          <button className="go_back_button">Вернуться на главную</button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default NotFound;
