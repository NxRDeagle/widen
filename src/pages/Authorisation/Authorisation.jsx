import React, { useContext, useEffect, useState } from 'react';
import { mainContext } from '../../App.js';
import logo_icon from '../../img/widenLogo.svg';

import './scss/Authorisation.scss';

import {
  SubmitBtn,
  AuthInput,
  PswdInput,
  CodeInput,
  LoginLink,
  ChooseBtn,
  ChooseInterest,
  SubmitInterestsBtn,
} from './components/auth-components.js';

const Authorisation = () => {
  const { activeLoginBox, setLoginBox } = useContext(mainContext);

  //Функция выбора интересов
  function interestClick(isSelected, setIsSelected, sign) {
    setLoginStates({
      ...loginStates,
      interests: isSelected
        ? loginStates.interests.filter((interest) => interest !== sign)
        : [...loginStates.interests, sign],
    });
    setIsSelected(!isSelected);
  }

  //Функция вводя в поля авторизации
  function handleChange(e) {
    setLoginStates({
      ...loginStates,
      [e.target.name]: e.target.value,
    });
  }

  //Функция ввода кода
  function handleChangeCode(e) {
    e.target.value = e.target.value ? (e.target.value %= 10) : '';
    const index = +e.target.name.split('-')[1];
    loginStates.code[index] = e.target.value;
    index < 3
      ? document.querySelector(`[name="code-${index + 1}"]`).focus()
      : document.querySelector(`[name="code-${0}"]`).focus();
  }

  //Функция фокуса на поле
  function handleFocus() {
    if (loginStates.error) {
      setLoginStates({
        ...loginStates,
        error: false,
      });
    }
  }

  //Функция выбора категории
  function chooseCategory(e) {
    setLoginStates({
      ...loginStates,
      userCategory: e.target.name,
      error: false,
    });
  }

  //Функция преобразования секунд в формат таймера
  function currentTime() {
    const minutes = Math.floor(timespan / 60);
    const seconds = Math.floor(timespan % 60);
    return seconds > 9 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
  }

  //Состояния Страницы Входа
  const [loginStates, setLoginStates] = React.useState({
    userCategory: '',
    interests: [],
    nickname: '',
    login: '',
    password: '',
    secondpassword: '',
    email: '',
    code: ['', '', '', ''],
    error: false,
  });

  //Стейт таймера
  const [timespan, setTimeSpan] = useState(90);

  //Эффект для анимации
  useEffect(() => {
    setTimeSpan(90);

    const loginContainer = document.getElementById('login_container');

    loginContainer.classList.add('main');

    setTimeout(() => {
      loginContainer.classList.remove('main');
    }, 1000);
  }, [activeLoginBox]);

  //Таймер
  useEffect(() => {
    if (timespan > 0) {
      setTimeout(() => {
        setTimeSpan(timespan - 1);
      }, 1000);
    }
  }, [timespan]);

  return (
    <>
      {activeLoginBox === 'interests' ? (
        <form id="login_container" className="authorisation_container_intersts">
          <p className="authorisation_sign_mini">Какие сферы Вам интересны?</p>
          <ChooseInterest onClick={interestClick} />
          <SubmitInterestsBtn>Зарегистрироваться</SubmitInterestsBtn>
        </form>
      ) : (
        <div id="login_container" className="authorisation_container_main">
          <img
            src={logo_icon}
            loading="lazy"
            className="authorisation_logo_icon"
            alt="logo_icon"></img>
          {new RegExp('rec').test(activeLoginBox) && (
            <div onClick={() => setLoginBox('login')} className="back_login_box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none">
                <path
                  d="M8.23742 0.393751C8.49999 0.656312 8.62602 0.973574 8.61551 1.34554C8.60414 1.7175 8.46717 2.03476 8.20461 2.29732L4.49593 6.006H19.1337C19.5057 6.006 19.8177 6.13203 20.0697 6.38408C20.3209 6.63527 20.4465 6.94684 20.4465 7.3188C20.4465 7.69076 20.3209 8.00278 20.0697 8.25483C19.8177 8.50602 19.5057 8.63161 19.1337 8.63161H4.49593L8.23742 12.3731C8.49999 12.6357 8.63127 12.9477 8.63127 13.3091C8.63127 13.6697 8.49999 13.9813 8.23742 14.2439C7.97486 14.5064 7.66285 14.6377 7.30139 14.6377C6.94081 14.6377 6.62924 14.5064 6.36668 14.2439L0.36059 8.23777C0.229309 8.10649 0.136097 7.96427 0.0809593 7.8111C0.0266972 7.65794 -0.000434875 7.49384 -0.000434875 7.3188C-0.000434875 7.14376 0.0266972 6.97966 0.0809593 6.8265C0.136097 6.67334 0.229309 6.53112 0.36059 6.39984L6.3995 0.360931C6.64018 0.12025 6.94081 -9.25064e-05 7.30139 -9.25064e-05C7.66285 -9.25064e-05 7.97486 0.131189 8.23742 0.393751Z"
                  fill="white"
                />
              </svg>
              <p className="back_login_sign">Восстановление</p>
            </div>
          )}
          <form className="authorisation_form_box" onSubmit={(e) => e.preventDefault()}>
            {activeLoginBox === 'login' && (
              <>
                <h1 className="authorisation_sign">Вход</h1>
                <AuthInput
                  onFocus={handleFocus}
                  onChange={handleChange}
                  name="login"
                  className={
                    loginStates.error
                      ? 'authoristaion_text_input error_login'
                      : 'authoristaion_text_input'
                  }
                  placeholder="Логин*"></AuthInput>
                <PswdInput
                  onFocus={handleFocus}
                  onChange={handleChange}
                  name="password"
                  placeholder="Пароль*"
                  className={
                    loginStates.error
                      ? 'authoristaion_password_input error_login'
                      : 'authoristaion_password_input'
                  }></PswdInput>
                <SubmitBtn>Войти</SubmitBtn>
                <p className={loginStates.error ? 'error_label' : 'none_active'}>
                  Логин или пароль неверны
                </p>
                <p onClick={() => setLoginBox('recmail')} className="forgot_pswd_link">
                  Забыли пароль?
                </p>
              </>
            )}
            {activeLoginBox === 'regmail' && (
              <>
                <h1 className="authorisation_sign">Регистрация</h1>
                <p className="authorisation_hint">Укажите, пожалуйста, адрес эл. почты</p>
                <AuthInput
                  onFocus={handleFocus}
                  onChange={handleChange}
                  name="email"
                  className={
                    loginStates.error
                      ? 'authoristaion_text_input error_login'
                      : 'authoristaion_text_input'
                  }
                  placeholder="Эл.Почта*"></AuthInput>
                <SubmitBtn>Продолжить</SubmitBtn>
                <p className={loginStates.error ? 'error_label' : 'none_active'}>Почта неверна</p>
              </>
            )}
            {activeLoginBox === 'regcode' && (
              <>
                <p className="authorisation_sign_mini">Введите, пожалуйста, код подтверждения</p>
                <p className="authorisation_hint">
                  Мы отправили код подтверждения на почту: {loginStates.email}
                </p>
                <CodeInput
                  onChange={handleChangeCode}
                  onFocus={handleFocus}
                  className={
                    loginStates.error
                      ? 'authoristaion_code_input error_login'
                      : 'authoristaion_code_input'
                  }></CodeInput>
                <SubmitBtn>Продолжить</SubmitBtn>
                <p className={loginStates.error ? 'error_label' : 'none_active'}>Код неверен</p>
                {timespan === 0 ? (
                  <p onClick={() => alert('Отправил')} className="forgot_pswd_link">
                    Отправить код повторно
                  </p>
                ) : (
                  <p className="authorisation_hint">
                    Повторная отправка кода через<br></br>
                    {currentTime()}
                  </p>
                )}
              </>
            )}
            {activeLoginBox === 'regpswd' && (
              <>
                <p className="authorisation_sign_mini">Придумайте, пожалуйста, новый пароль</p>
                <PswdInput
                  onFocus={handleFocus}
                  onChange={handleChange}
                  name="password"
                  placeholder="Вот тут придумайте*"
                  className={
                    loginStates.error
                      ? 'authoristaion_password_input error_login'
                      : 'authoristaion_password_input'
                  }></PswdInput>
                <PswdInput
                  onFocus={handleFocus}
                  onChange={handleChange}
                  name="secondpassword"
                  placeholder="Вот тут повторите*"
                  className={
                    loginStates.error
                      ? 'authoristaion_password_input error_login'
                      : 'authoristaion_password_input'
                  }></PswdInput>
                <SubmitBtn>Продолжить</SubmitBtn>
                <p className={loginStates.error ? 'error_label' : 'none_active'}>Пароли неверны</p>
              </>
            )}
            {activeLoginBox === 'regnick' && (
              <>
                <p className="authorisation_sign_mini">Придумайте, пожалуйста, никнейм</p>
                <p className="authorisation_hint">Например, KOsMO, prin, Xee_e</p>
                <AuthInput
                  onFocus={handleFocus}
                  onChange={handleChange}
                  name="nickname"
                  className={
                    loginStates.error
                      ? 'authoristaion_text_input error_login'
                      : 'authoristaion_text_input'
                  }
                  placeholder="Никнейм*"></AuthInput>
                <SubmitBtn>Продолжить</SubmitBtn>
                <p className={loginStates.error ? 'error_label' : 'none_active'}>
                  Никнейм неверен или уже занят
                </p>
              </>
            )}
            {activeLoginBox === 'regcategory' && (
              <>
                <p className="authorisation_sign_mini">Кем вы являетесь?</p>
                <ChooseBtn
                  onClick={chooseCategory}
                  name="professional"
                  className={
                    loginStates.userCategory === 'professional'
                      ? 'choose_who_btn  your_choose'
                      : loginStates.error
                      ? 'choose_who_btn error_login'
                      : 'choose_who_btn'
                  }>
                  Профессионал
                </ChooseBtn>
                <ChooseBtn
                  onClick={chooseCategory}
                  name="customer"
                  className={
                    loginStates.userCategory === 'customer'
                      ? 'choose_who_btn  your_choose'
                      : loginStates.error
                      ? 'choose_who_btn error_login'
                      : 'choose_who_btn'
                  }>
                  Заказчик
                </ChooseBtn>
                <ChooseBtn
                  onClick={chooseCategory}
                  name="organisation"
                  className={
                    loginStates.userCategory === 'organisation'
                      ? 'choose_who_btn  your_choose'
                      : loginStates.error
                      ? 'choose_who_btn error_login'
                      : 'choose_who_btn'
                  }>
                  Организация
                </ChooseBtn>
                <SubmitBtn>Далее</SubmitBtn>
                <p className={loginStates.error ? 'error_label' : 'none_active'}>
                  Категория не выбрана
                </p>
              </>
            )}
            {activeLoginBox === 'recmail' && (
              <>
                <p className="authorisation_sign_mini">
                  Укажите, пожалуйста, адрес эл. почты или телефон
                </p>
                <p className="authorisation_hint">
                  Это нужно для подтверждения того, что вы владеете аккаунтом
                </p>
                <AuthInput
                  onFocus={handleFocus}
                  onChange={handleChange}
                  name="email"
                  className={
                    loginStates.error
                      ? 'authoristaion_text_input error_login'
                      : 'authoristaion_text_input'
                  }
                  placeholder="Эл.Почта*"></AuthInput>
                <SubmitBtn>Продолжить</SubmitBtn>
                <p className={loginStates.error ? 'error_label' : 'none_active'}>Почта неверна</p>
              </>
            )}
            {activeLoginBox === 'reccode' && (
              <>
                <p className="authorisation_sign_mini">Введите, пожалуйста, код подтверждения</p>
                <p className="authorisation_hint">
                  Мы отправили код подтверждения на почту: {loginStates.email}
                </p>
                <CodeInput
                  onChange={handleChangeCode}
                  onFocus={handleFocus}
                  className={
                    loginStates.error
                      ? 'authoristaion_code_input error_login'
                      : 'authoristaion_code_input'
                  }></CodeInput>
                <SubmitBtn>Продолжить</SubmitBtn>
                <p className={loginStates.error ? 'error_label' : 'none_active'}>Код неверен</p>
                {timespan === 0 ? (
                  <p onClick={() => alert('Отправил')} className="forgot_pswd_link">
                    Отправить код повторно
                  </p>
                ) : (
                  <p className="authorisation_hint">
                    Повторная отправка кода через<br></br>
                    {currentTime()}
                  </p>
                )}
              </>
            )}
            {activeLoginBox === 'recpswd' && (
              <>
                <p className="authorisation_sign_mini">Придумайте, пожалуйста, новый пароль</p>
                <PswdInput
                  onFocus={handleFocus}
                  onChange={handleChange}
                  name="password"
                  placeholder="Вот тут придумайте*"
                  className={
                    loginStates.error
                      ? 'authoristaion_password_input error_login'
                      : 'authoristaion_password_input'
                  }></PswdInput>
                <PswdInput
                  onFocus={handleFocus}
                  onChange={handleChange}
                  name="secondpassword"
                  placeholder="Вот тут повторите*"
                  className={
                    loginStates.error
                      ? 'authoristaion_password_input error_login'
                      : 'authoristaion_password_input'
                  }></PswdInput>
                <SubmitBtn>Продолжить</SubmitBtn>
                <p className={loginStates.error ? 'error_label' : 'none_active'}>Пароли неверны</p>
              </>
            )}
          </form>

          {['login', 'regmail'].includes(activeLoginBox) && (
            <LoginLink
              onClick={() => setLoginBox(activeLoginBox === 'login' ? 'regmail' : 'login')}
              link={activeLoginBox === 'login' ? 'Зарегистрироваться' : 'Войти'}>
              {activeLoginBox === 'login' ? 'Нет аккаунта?' : 'Есть аккаунт?'}
            </LoginLink>
          )}
        </div>
      )}
    </>
  );
};

export default Authorisation;
