import React from 'react';

import logoSvg from '../img/logoInput.svg';

const Input = () => {
  const [activeBox, setActiveBox] = React.useState(0);

  return (
    <>
      <div className={activeBox === 0 ? 'input_container' : 'input_container none_active'}>
        <img className="input_logo" src={logoSvg} />

        <form className="input_form" action="#" style={{ height: '40vh' }}>
          <h1 className="input_form_sign">Вход</h1>
          <input type="text" placeholder="Логин" className="error_input" />
          <input type="password" placeholder="Пароль" />
          <button>Войти</button>
        </form>

        <div className="input_in_noacc">
          <p>
            Нет аккаунта?{' '}
            <a
              className="input_link"
              onClick={() => {
                setActiveBox(1);
              }}>
              Зарегистрироваться
            </a>
          </p>
        </div>
      </div>

      <div className={activeBox === 1 ? 'input_container' : 'input_container none_active'}>
        <img className="input_logo" src={logoSvg} />

        <form className="input_form" action="#" style={{ height: '60vh' }}>
          <h1 className="input_form_sign">Регистрация</h1>
          <input type="text" placeholder="Номер телефона/Почта" />
          <input type="password" placeholder="Пароль" />
          <input type="password" placeholder="Повторите пароль" />
          <button>Далее</button>
        </form>

        <p>
          Есть аккаунт?{' '}
          <a
            className="input_link"
            onClick={() => {
              setActiveBox(0);
            }}>
            Войти
          </a>
        </p>
      </div>
    </>
  );
};

export default Input;
