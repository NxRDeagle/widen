import React from 'react';

import '../css/WhoAreYou.css';

const WhoAreYou = () => {
  const [role, setRole] = React.useState(0);

  return (
    <div className="iam">
      <h3 className="iam_header">Кем вы являетесь?</h3>
      <div className="iam_container">
        <button
          className={role === 0 ? 'iam_button active' : 'iam_button'}
          onClick={() => {
            setRole(0);
          }}>
          Профессионал
        </button>
        <button
          className={role === 1 ? 'iam_button active' : 'iam_button'}
          onClick={() => {
            setRole(1);
          }}>
          Заказчик
        </button>
        <button
          className={role === 2 ? 'iam_button active' : 'iam_button'}
          onClick={() => {
            setRole(2);
          }}>
          Организация
        </button>
      </div>
      <button className="iam_next">Далее</button>
    </div>
  );
};
export default WhoAreYou;
