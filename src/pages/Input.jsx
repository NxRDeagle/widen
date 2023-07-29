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
  }); //Comp

  const {goHome} = React.useContext(mainContext);

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
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="password"
              name="password"
              value={inputStates.password}
              placeholder="Пароль"
            />
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
              placeholder="Номер телефона/Почта"
            />
            <p className="error_label none_active">Неверный номер телефона или почта!</p>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="text"
              name="code"
              value={inputStates.code}
              placeholder="Код"
            />
            <p className="error_label none_active">Неверный код!</p>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="password"
              name="loginpassword"
              value={inputStates.loginpassword}
              placeholder="Пароль"
            />
            <p className="error_label none_active">Недопустимый пароль!</p>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="password"
              name="secondpassword"
              value={inputStates.secondpassword}
              placeholder="Повторите пароль"
            />
            <p className="error_label none_active">Пароли не совпадают!</p>
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
