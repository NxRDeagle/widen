import React from 'react';

import '../css/MoreInterests.css';

import add_icon from '../img/plus.svg';

const MoreInterests = () => {
  let interest_counter = 1;
  return (
    <div className="more">
      <h3 className="more_header">Может быть мы что-то забыли?</h3>
      <div className="more_container">
        <input className="more_input" placeholder="1. Я интересуюсь..." />
        <input className="more_input" placeholder="2. Я интересуюсь..." />
        <img className="more_add" src={add_icon} />
      </div>
      <button className="more_ready">Готово</button>
    </div>
  );
};
export default MoreInterests;
