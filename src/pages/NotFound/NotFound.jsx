import React from 'react';

import { mainContext } from '../../App';

import { BackBtn } from '../NotFound/components/not_found_components';

import './scss/NotFound.scss';

const NotFound = () => {
  const { goInput } = React.useContext(mainContext);

  return (
    <div className="not_found_container">
      <h1 className="not_found_header">
        К сожалению страница не найдена <span className="emoji">😔</span>
      </h1>
      <BackBtn onClick={goInput}>Вернуться на главную</BackBtn>
    </div>
  );
};
export default NotFound;
