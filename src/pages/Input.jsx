import React from 'react';
import { useNavigate } from 'react-router-dom';

import { mainContext } from '../App';

import logoSvg from '../img/logoInput.svg';

const Input = () => {
  const navigate = useNavigate();

  const { setPage } = React.useContext(mainContext);

  const goToHome = () => {
    navigate('/');
    setPage('home');
  };

  const [activeBox, setActiveBox] = React.useState(0);

  const [userCategory, setUserCategory] = React.useState('undefined');

  const onFocusInput = () => {
    document.querySelectorAll('input').forEach((input) => {
      input.className = '';
    });
    document.querySelectorAll('.error_label').forEach((label) => {
      label.classList.add('none_active');
    });
  };

  const onClickLogin = () => {
    document.querySelectorAll('input').forEach((input) => {
      if (input.value === '') {
        input.className = 'error_input';
        activeBox === 1
          ? input.nextElementSibling.classList.remove('none_active')
          : document.getElementById('error_label_input').classList.remove('none_active');
      }
    });
    if (activeBox === 1 && userCategory === 'undefined') {
      document.querySelectorAll('.who_im_checkbtn').forEach((box) => {
        box.classList.add('error_input');
      });
    }
  };
  return (
    <>
      {activeBox === 0 && (
        <div className="input_container">
          <img className="input_logo" src={logoSvg} />

          <form className="input_form" action="#" style={{ height: '40vh' }}>
            <h1 className="input_form_sign">Вход</h1>
            <input onFocus={onFocusInput} type="text" placeholder="Логин" />
            <input onFocus={onFocusInput} type="password" placeholder="Пароль" />
            <p id="error_label_input" className="error_label none_active">
              Неверный логин или пароль!
            </p>
            <button onClick={onClickLogin}>Войти</button>
          </form>

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
      )}
      {activeBox === 1 && (
        <div className="input_container">
          <img className="input_logo" src={logoSvg} />

          <form className="input_form" action="#" style={{ height: '60vh' }}>
            <h1 className="input_form_sign">Регистрация</h1>
            <input onFocus={onFocusInput} type="text" placeholder="Номер телефона/Почта" />
            <p className="error_label none_active">Неверный номер телефона или почта!</p>
            <div className="who_im_container">
              <div className="who_im_box">
                <div
                  className={
                    userCategory === 'freelancer' ? 'who_im_checkbtn checked' : 'who_im_checkbtn'
                  }
                  onClick={() => {
                    document.querySelectorAll('.who_im_checkbtn').forEach((box) => {
                      box.classList.remove('error_input');
                    });
                    setUserCategory('freelancer');
                  }}></div>
                <p>Фрилансер</p>
              </div>
              <div className="who_im_box">
                <div
                  className={
                    userCategory === 'urik' ? 'who_im_checkbtn checked' : 'who_im_checkbtn'
                  }
                  onClick={() => {
                    document.querySelectorAll('.who_im_checkbtn').forEach((box) => {
                      box.classList.remove('error_input');
                    });
                    setUserCategory('urik');
                  }}></div>
                <p>Юридическое лицо</p>
              </div>
            </div>
            <input onFocus={onFocusInput} type="text" placeholder="Код" />
            <p className="error_label none_active">Неверный код!</p>
            <input onFocus={onFocusInput} type="password" placeholder="Пароль" />
            <p className="error_label none_active">Недопустимый пароль!</p>
            <input onFocus={onFocusInput} type="password" placeholder="Повторите пароль" />
            <p className="error_label none_active">Пароли не совпадают!</p>
            <button onClick={onClickLogin}>Далее</button>
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
      )}
    </>
  );
};

export default Input;
