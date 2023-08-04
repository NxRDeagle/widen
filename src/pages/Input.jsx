import React from 'react';
import logoSvg from '../img/logoInput.svg';
import { mainContext } from '../App';
import add_icon from '../img/plus.svg';

import '../css/Input.css';
import '../css/Sphere.css';
import ChooseInterest from '../components/ChooseInterest';

const Input = () => {
  const [inputStates, setInputStates] = React.useState({
    activeBox: 0,
    userCategory: 'undefined',
    login: '',
    password: '',
    loginpassword: '',
    secondpassword: '',
    telem: '',
    code: '',
    inputCount: 3,
    isPasswordVisible: false,
  }); //Comp

  const { goHome } = React.useContext(mainContext);

  const handleChange = (e) => {
    setInputStates({
      ...inputStates,
      [e.target.name]: e.target.value,
    });
  };

  const onFocusInput = () => {
    document.querySelectorAll('input').forEach((input) => {
      input.className = '';
    });
    document.querySelectorAll('.error_label').forEach((label) => {
      label.classList.add('none_active');
    });
  };

  const onClickLogin = () => {
    let logic = true;

    document.querySelectorAll('input').forEach((input) => {
      if (input.value === '') {
        logic = false;
        input.className = 'error_input';
        inputStates.activeBox === 2
          ? input.nextElementSibling.classList.remove('none_active')
          : document.getElementById('error_label_input').classList.remove('none_active');
      }
    });
    if (inputStates.activeBox === 1 && logic) {
      goHome();
    }
    if (inputStates.activeBox === 2 && logic) {
      setInputStates({
        ...inputStates,
        activeBox: 3,
      });
    }
  };

  const NextChoose = () => {
    inputStates.userCategory === 'undefined'
      ? document.querySelectorAll('.choose_who').forEach((item) => {
          item.classList.add('error_input');
        })
      : inputStates.activeBox === 4
      ? setInputStates({
          ...inputStates,
          activeBox: 5,
        })
      : setInputStates({
          ...inputStates,
          activeBox: 4,
        });
  };

  const AddInput = () => {
    setInputStates({
      ...inputStates,
      inputCount: inputStates.inputCount + 1,
    });
    let input = document.createElement('input');
    input.type = 'text';
    input.className = 'more_input';
    input.placeholder = `${inputStates.inputCount}. Я интересуюсь...`;
    document.querySelector('.more_container').appendChild(input);
    input.focus();
  };

  return (
    <>
      {inputStates.activeBox === 0 && (
        <div className="first_input_container">
          <img className="logo_input" src={logoSvg} alt="logo" />
          <div style={{ marginBottom: '30%' }}>
            <button
              onClick={() =>
                setInputStates({
                  ...inputStates,
                  activeBox: 1,
                })
              }
              className="come_btn">
              Войти
            </button>
            <p>или</p>
            <p
              style={{ textDecorationLine: 'underline' }}
              onClick={() =>
                setInputStates({
                  ...inputStates,
                  activeBox: 2,
                })
              }>
              зарегистрироваться
            </p>
          </div>
        </div>
      )}
      {inputStates.activeBox === 1 && (
        <div className="input_container">
          <img className="input_logo" src={logoSvg} alt="logo" />

          <form className="input_form" action="#" style={{ height: '40vh' }}>
            <h1 className="input_form_sign">Вход</h1>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="text"
              name="login"
              value={inputStates.login}
              placeholder="Логин"
            />

            <div className="password_input">
              <input
                id="passwordInput"
                onFocus={onFocusInput}
                onChange={handleChange}
                type={inputStates.isPasswordVisible ? 'text' : 'password'}
                name="password"
                value={inputStates.password}
                placeholder="Пароль"
              />

              <svg
                onClick={() => {
                  setInputStates({
                    ...inputStates,
                    isPasswordVisible: !inputStates.isPasswordVisible,
                  });
                }}
                className="show_password"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="15"
                viewBox="0 0 22 15"
                fill="none">
                <path
                  onClick={() => {
                    setInputStates({
                      ...inputStates,
                      isPasswordVisible: !inputStates.isPasswordVisible,
                    });
                  }}
                  d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
                  fill={inputStates.isPasswordVisible ? '#7E52EE' : '#ACACAC'}
                />
              </svg>
            </div>
            <p id="error_label_input" className="error_label none_active">
              Неверный логин или пароль!
            </p>
            <button onClick={onClickLogin}>Войти</button>
          </form>

          <p>
            Нет аккаунта?{' '}
            <a
              href="#!"
              className="input_link"
              onClick={() => {
                setInputStates({
                  ...inputStates,
                  activeBox: 2,
                });
              }}>
              Зарегистрироваться
            </a>
          </p>
        </div>
      )}
      {inputStates.activeBox === 2 && (
        <div className="input_container">
          <img className="input_logo" src={logoSvg} alt="logo" />
          <form className="input_form" action="#" style={{ height: '60vh' }}>
            <h1 className="input_form_sign">Регистрация</h1>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="text"
              name="telem"
              value={inputStates.telem}
              placeholder="Эл. почта/телефон*"
            />
            <p className="error_label none_active">Неверный номер телефона или почта!</p>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="text"
              name="loginpassword"
              value={inputStates.loginpassword}
              placeholder="Пароль*"
            />
            <p className="error_label none_active">Недопустимый пароль!</p>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="text"
              name="secondpassword"
              value={inputStates.secondpassword}
              placeholder="Повторите пароль*"
            />
            <p className="error_label none_active">Пароли не совпадают!</p>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="text"
              name="code"
              value={inputStates.code}
              placeholder="Код*"
            />
            <p className="error_label none_active">Неверный код!</p>
            <button onClick={onClickLogin}>Далее</button>
          </form>
          <p className="sign_conf">
            Нажимая “Далее”, Вы соглашаетесь с{' '}
            <u style={{ textDecorationLine: 'underline' }}>регламентом</u> и{' '}
            <u style={{ textDecorationLine: 'underline' }}>политикой конфиденциальности</u>
          </p>
          <p>
            Есть аккаунт?{' '}
            <a
              href="#!"
              className="input_link"
              onClick={() => {
                setInputStates({
                  ...inputStates,
                  activeBox: 1,
                });
              }}>
              Войти
            </a>
          </p>
        </div>
      )}
      {inputStates.activeBox === 3 && (
        <div className="input_container" style={{ backgroundImage: 'url()' }}>
          <p className="choose_header">Кем вы являетесь?</p>
          <button
            className={
              inputStates.userCategory === 'professional' ? 'choose_who your_choose' : 'choose_who '
            }
            onClick={() => {
              setInputStates({
                ...inputStates,
                userCategory: 'professional',
              });
              document.querySelectorAll('.choose_who').forEach((item) => {
                item.classList.remove('error_input');
              });
            }}>
            Профессионал
          </button>
          <button
            className={
              inputStates.userCategory === 'customer' ? 'choose_who your_choose' : 'choose_who '
            }
            onClick={() => {
              setInputStates({
                ...inputStates,
                userCategory: 'customer',
              });
              document.querySelectorAll('.choose_who').forEach((item) => {
                item.classList.remove('error_input');
              });
            }}>
            Заказчик
          </button>
          <button
            className={
              inputStates.userCategory === 'organisation' ? 'choose_who your_choose' : 'choose_who '
            }
            onClick={() => {
              setInputStates({
                ...inputStates,
                userCategory: 'organisation',
              });
              document.querySelectorAll('.choose_who').forEach((item) => {
                item.classList.remove('error_input');
              });
            }}>
            Организация
          </button>
          <button onTo className="choose_next_btn" onClick={NextChoose}>
            Далее
          </button>
        </div>
      )}
      {inputStates.activeBox === 4 && (
        <>
          <ChooseInterest />
          <div className="choose_next">
            <button onTo className="next_button" onClick={NextChoose}>
              Далее
            </button>
          </div>
        </>
      )}
      {inputStates.activeBox === 5 && (
        <div className="more">
          <h3 className="more_header">Может быть мы что-то забыли?</h3>
          <div className="more_container">
            <input className="more_input" placeholder="1. Я интересуюсь..." />
            <input className="more_input" placeholder="2. Я интересуюсь..." />
          </div>
          <img className="more_add" src={add_icon} onClick={AddInput} alt="Add" />
          <button onClick={() => goHome()} className="more_ready">
            Готово
          </button>
        </div>
      )}
    </>
  );
};

export default Input;
