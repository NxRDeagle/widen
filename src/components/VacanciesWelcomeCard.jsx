import React from 'react';

import '../css/VacanciesWelcomeCard.css';

const VacanciesWelcomeCard = ({ header, description, isClosed, num, setDivision }) => {
  const sorryMsg = '(Раздел в разработке, дико извиняемся)';

  return (
    <div
      className={isClosed ? 'vacancies-welcome_card card_inactive' : 'vacancies-welcome_card'}
      onClick={() => {
        if (!isClosed) setDivision(num);
      }}>
      <h1 className="vacancies-welcome_card__name">{header}</h1>
      <p className="vacancies-welcome_card__description">{description}</p>
      {isClosed && <p className="vacancies_welcome_card_sign">{sorryMsg}</p>}
    </div>
  );
};

export default VacanciesWelcomeCard;
