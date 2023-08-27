import React from 'react';
import logoSvg from '../img/logoInput.svg';
import { mainContext } from '../App';
import add_icon from '../img/plus.svg';
import logo_icon from '../img/widenLogo.svg';

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
    isRepeatPasswordVisible: false,
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
      : setInputStates({
          ...inputStates,
          activeBox: inputStates.activeBox + 1,
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
          <img className="logo_icon" src={logo_icon} alt="logo_icon" />
          {/* <img className="input_logo" src={logoSvg} alt="logo" /> */}

          <form className="input_form" action="#" style={{ height: '45vh' }}>
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

              {!inputStates.isPasswordVisible ? (
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
                    fill="#ACACAC"
                  />
                </svg>
              ) : (
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
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none">
                  <path
                    onClick={() => {
                      setInputStates({
                        ...inputStates,
                        isPasswordVisible: !inputStates.isPasswordVisible,
                      });
                    }}
                    d="M12.2783 3.5986C11.8587 3.55005 11.4323 3.52223 11 3.51531C9.11122 3.52427 7.15325 4.01562 5.29993 4.95713C3.92387 5.68499 2.58343 6.71253 1.41931 7.98003C0.847587 8.62706 0.117902 9.56393 0 10.5635C0.0139333 11.4294 0.882806 12.4981 1.41931 13.147C2.51094 14.3647 3.81647 15.3629 5.29993 16.1699C5.35035 16.1961 5.40095 16.2219 5.45166 16.2474L4.07534 18.818L5.94543 20L16.0547 1.17658L14.2547 0L12.2783 3.5986ZM16.547 4.88245L15.1733 7.42856C15.8053 8.30661 16.1804 9.38939 16.1804 10.5635C16.1804 13.49 13.8609 15.8626 10.9987 15.8626C10.8749 15.8626 10.755 15.8483 10.6334 15.8396L9.72436 17.5227C10.1436 17.5707 10.5675 17.6057 11 17.6117C12.8906 17.6026 14.8474 17.1056 16.6987 16.1699C18.0748 15.442 19.4166 14.4145 20.5807 13.147C21.1524 12.5 21.8821 11.5631 22 10.5635C21.9861 9.69763 21.1172 8.62889 20.5807 7.98001C19.4891 6.7623 18.1822 5.76416 16.6987 4.95709C16.6487 4.93113 16.5974 4.90778 16.547 4.88245ZM10.9987 5.26445C11.1242 5.26445 11.2487 5.26983 11.372 5.27881L10.3071 7.25051C8.81271 7.57454 7.69141 8.93437 7.69141 10.5621C7.69141 10.971 7.76183 11.3624 7.89148 11.7253C7.89163 11.7257 7.89133 11.7263 7.89148 11.7267L6.82397 13.7042C6.19053 12.8253 5.81688 11.739 5.81688 10.5635C5.8169 7.63703 8.13649 5.26443 10.9987 5.26445ZM14.0964 9.42184L11.6969 13.8679C13.1833 13.5378 14.2965 12.1841 14.2965 10.5621C14.2965 10.1607 14.2216 9.779 14.0964 9.42184Z"
                    fill="#D2D2D2"
                  />
                </svg>
              )}
            </div>
            <p id="error_label_input" className="error_label none_active">
              Неверный логин или пароль!
            </p>
            <button className="login_btn" onClick={onClickLogin}>
              Войти
            </button>
            <p className="input_link_password">
              <a
                href="#!"
                onClick={() => {
                  setInputStates({
                    ...inputStates,
                    activeBox: 9,
                  });
                }}>
                Забыли пароль?
              </a>
            </p>
          </form>

          <div className="noaccont_div">
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
        </div>
      )}
      {inputStates.activeBox === 2 && (
        <div className="input_container">
          <img className="logo_icon" src={logo_icon} alt="logo_icon" />

          <form className="input_form" action="#" style={{ height: '45vh' }}>
            <h1 className="input_form_sign">Регистрация</h1>
            <p className="registration_advice">Укажите, пожалуйста, адрес эл. почты или телефон </p>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="text"
              name="telem"
              value={inputStates.telem}
              placeholder="Эл. почта/телефон*"
            />
            <p className="error_label none_active">Неверный номер телефона или почта!</p>
            {/* <input
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
            <p className="error_label none_active">Неверный код!</p> */}
            <button className="login_btn" onClick={onClickLogin}>
              Продолжить
            </button>
          </form>
          <p className="sign_conf">
            Нажимая "продолжить", Вы соглашаетесь с{' '}
            <u style={{ textDecorationLine: 'underline' }}>регламентом</u> и{' '}
            <u style={{ textDecorationLine: 'underline' }}>политикой конфиденциальности</u>
          </p>
          <p>
            Есть аккаунт?{' '}
            <a
              href="#!"
              className="input_link"
              id="hasAccount"
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
        <div className="input_container">
          <img className="logo_icon" src={logo_icon} alt="logo_icon" />

          <form className="input_form" action="#" style={{ height: '50vh' }}>
            <h1 className="input_form_sign_code">Введите, пожалуйста, код подтверждения </h1>
            <p className="registration_advice" id="reg_code_sign">
              Мы отправили код подтверждения
              <br />
              на телефон +7 123 456 78 90
            </p>
            <div className="code_input_div">
              <input
                className="code_input"
                // onFocus={onFocusInput}
                onChange={handleChange}
                type="number"
                name="code1"
                id="code1"
                maxLength={1}
              />
              <input
                className="code_input"
                // onFocus={onFocusInput}
                onChange={handleChange}
                type="number"
                name="code2"
                id="code2"
                maxLength={1}
              />
              <input
                className="code_input"
                //onFocus={onFocusInput}
                onChange={handleChange}
                type="number"
                name="code3"
                id="code3"
                maxLength={1}
              />
              <input
                className="code_input"
                //onFocus={onFocusInput}
                onChange={handleChange}
                type="number"
                name="code4"
                id="code4"
                maxLength={1}
              />
            </div>
            <p className="error_label none_active">Неверный код подтверждения!</p>

            <button
              className="login_btn"
              onClick={() => {
                setInputStates({ ...inputStates, activeBox: 4 });
              }}>
              Продолжить
            </button>
            <p className="sign_zapros">
              Повторная отправка запроса через
              <br />
              00:00
            </p>
          </form>
        </div>
      )}
      {inputStates.activeBox === 4 && (
        <div className="input_container">
          <img className="logo_icon" src={logo_icon} alt="logo_icon" />

          <form className="input_form" action="#" style={{ height: '50vh' }}>
            <h1 className="input_form_sign_code">
              Придумайте, пожалуйста,
              <br /> новый пароль{' '}
            </h1>

            <div className="password_input">
              <input
                id="passwordInput"
                onFocus={onFocusInput}
                onChange={handleChange}
                type={inputStates.isPasswordVisible ? 'text' : 'password'}
                name="password"
                value={inputStates.password}
                placeholder="Вот тут придумайте*"
              />

              {!inputStates.isPasswordVisible ? (
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
                    fill="#ACACAC"
                  />
                </svg>
              ) : (
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
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none">
                  <path
                    onClick={() => {
                      setInputStates({
                        ...inputStates,
                        isPasswordVisible: !inputStates.isPasswordVisible,
                      });
                    }}
                    d="M12.2783 3.5986C11.8587 3.55005 11.4323 3.52223 11 3.51531C9.11122 3.52427 7.15325 4.01562 5.29993 4.95713C3.92387 5.68499 2.58343 6.71253 1.41931 7.98003C0.847587 8.62706 0.117902 9.56393 0 10.5635C0.0139333 11.4294 0.882806 12.4981 1.41931 13.147C2.51094 14.3647 3.81647 15.3629 5.29993 16.1699C5.35035 16.1961 5.40095 16.2219 5.45166 16.2474L4.07534 18.818L5.94543 20L16.0547 1.17658L14.2547 0L12.2783 3.5986ZM16.547 4.88245L15.1733 7.42856C15.8053 8.30661 16.1804 9.38939 16.1804 10.5635C16.1804 13.49 13.8609 15.8626 10.9987 15.8626C10.8749 15.8626 10.755 15.8483 10.6334 15.8396L9.72436 17.5227C10.1436 17.5707 10.5675 17.6057 11 17.6117C12.8906 17.6026 14.8474 17.1056 16.6987 16.1699C18.0748 15.442 19.4166 14.4145 20.5807 13.147C21.1524 12.5 21.8821 11.5631 22 10.5635C21.9861 9.69763 21.1172 8.62889 20.5807 7.98001C19.4891 6.7623 18.1822 5.76416 16.6987 4.95709C16.6487 4.93113 16.5974 4.90778 16.547 4.88245ZM10.9987 5.26445C11.1242 5.26445 11.2487 5.26983 11.372 5.27881L10.3071 7.25051C8.81271 7.57454 7.69141 8.93437 7.69141 10.5621C7.69141 10.971 7.76183 11.3624 7.89148 11.7253C7.89163 11.7257 7.89133 11.7263 7.89148 11.7267L6.82397 13.7042C6.19053 12.8253 5.81688 11.739 5.81688 10.5635C5.8169 7.63703 8.13649 5.26443 10.9987 5.26445ZM14.0964 9.42184L11.6969 13.8679C13.1833 13.5378 14.2965 12.1841 14.2965 10.5621C14.2965 10.1607 14.2216 9.779 14.0964 9.42184Z"
                    fill="#D2D2D2"
                  />
                </svg>
              )}
            </div>
            <p className="error_label none_active">Недопустимый пароль!</p>
            <div className="password_input">
              <input
                id="passwordRepeatInput"
                onFocus={onFocusInput}
                onChange={handleChange}
                type={inputStates.isRepeatPasswordVisible ? 'text' : 'password'}
                name="password"
                value={inputStates.password}
                placeholder="Вот тут повторите*"
              />

              {!inputStates.isRepeatPasswordVisible ? (
                <svg
                  onClick={() => {
                    setInputStates({
                      ...inputStates,
                      isRepeatPasswordVisible: !inputStates.isRepeatPasswordVisible,
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
                        isRepeatPasswordVisible: !inputStates.isRepeatPasswordVisible,
                      });
                    }}
                    d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
                    fill="#ACACAC"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => {
                    setInputStates({
                      ...inputStates,
                      isRepeatPasswordVisible: !inputStates.isRepeatPasswordVisible,
                    });
                  }}
                  className="show_password"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none">
                  <path
                    onClick={() => {
                      setInputStates({
                        ...inputStates,
                        isRepeatPasswordVisible: !inputStates.isRepeatPasswordVisible,
                      });
                    }}
                    d="M12.2783 3.5986C11.8587 3.55005 11.4323 3.52223 11 3.51531C9.11122 3.52427 7.15325 4.01562 5.29993 4.95713C3.92387 5.68499 2.58343 6.71253 1.41931 7.98003C0.847587 8.62706 0.117902 9.56393 0 10.5635C0.0139333 11.4294 0.882806 12.4981 1.41931 13.147C2.51094 14.3647 3.81647 15.3629 5.29993 16.1699C5.35035 16.1961 5.40095 16.2219 5.45166 16.2474L4.07534 18.818L5.94543 20L16.0547 1.17658L14.2547 0L12.2783 3.5986ZM16.547 4.88245L15.1733 7.42856C15.8053 8.30661 16.1804 9.38939 16.1804 10.5635C16.1804 13.49 13.8609 15.8626 10.9987 15.8626C10.8749 15.8626 10.755 15.8483 10.6334 15.8396L9.72436 17.5227C10.1436 17.5707 10.5675 17.6057 11 17.6117C12.8906 17.6026 14.8474 17.1056 16.6987 16.1699C18.0748 15.442 19.4166 14.4145 20.5807 13.147C21.1524 12.5 21.8821 11.5631 22 10.5635C21.9861 9.69763 21.1172 8.62889 20.5807 7.98001C19.4891 6.7623 18.1822 5.76416 16.6987 4.95709C16.6487 4.93113 16.5974 4.90778 16.547 4.88245ZM10.9987 5.26445C11.1242 5.26445 11.2487 5.26983 11.372 5.27881L10.3071 7.25051C8.81271 7.57454 7.69141 8.93437 7.69141 10.5621C7.69141 10.971 7.76183 11.3624 7.89148 11.7253C7.89163 11.7257 7.89133 11.7263 7.89148 11.7267L6.82397 13.7042C6.19053 12.8253 5.81688 11.739 5.81688 10.5635C5.8169 7.63703 8.13649 5.26443 10.9987 5.26445ZM14.0964 9.42184L11.6969 13.8679C13.1833 13.5378 14.2965 12.1841 14.2965 10.5621C14.2965 10.1607 14.2216 9.779 14.0964 9.42184Z"
                    fill="#D2D2D2"
                  />
                </svg>
              )}
            </div>
            <p className="error_label none_active">Пароли не совпадают!</p>

            <button
              className="login_btn"
              onClick={() => {
                setInputStates({ ...inputStates, activeBox: 5 });
              }}>
              Продолжить
            </button>
          </form>
        </div>
      )}
      {inputStates.activeBox === 5 && (
        <div className="input_container">
          <img className="logo_icon" src={logo_icon} alt="logo_icon" />

          <form className="input_form" action="#" style={{ height: '40vh' }}>
            <h1 className="input_form_sign_code">
              Придумайте, пожалуйста,
              <br /> никнейм
            </h1>
            <p style={{ marginTop: '15px' }} className="registration_advice">
              Например, KOsMO, prin, Xee_e
            </p>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="text"
              name="code"
              placeholder="Никнейм*"
            />
            <p className="error_label none_active">
              К сожалению, этот никнейм занят. Попробуйте еще
            </p>

            <button
              className="login_btn"
              onClick={() => {
                setInputStates({ ...inputStates, activeBox: 6 });
              }}>
              Продолжить
            </button>
          </form>
        </div>
      )}
      {inputStates.activeBox === 6 && (
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
      {inputStates.activeBox === 7 && (
        <>
          <ChooseInterest />
          <div className="choose_next">
            <button className="next_button" onClick={NextChoose}>
              Далее
            </button>
          </div>
        </>
      )}
      {inputStates.activeBox === 8 && (
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
      {inputStates.activeBox === 9 && (
        <div className="input_container">
          <svg
            className="arrowSvg"
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            onClick={() => {
              setInputStates({ ...inputStates, activeBox: 1 });
            }}>
            <path
              d="M8.23742 0.393751C8.49999 0.656312 8.62602 0.973574 8.61551 1.34554C8.60414 1.7175 8.46717 2.03476 8.20461 2.29732L4.49593 6.006H19.1337C19.5057 6.006 19.8177 6.13203 20.0697 6.38408C20.3209 6.63527 20.4465 6.94684 20.4465 7.3188C20.4465 7.69076 20.3209 8.00278 20.0697 8.25483C19.8177 8.50602 19.5057 8.63161 19.1337 8.63161H4.49593L8.23742 12.3731C8.49999 12.6357 8.63127 12.9477 8.63127 13.3091C8.63127 13.6697 8.49999 13.9813 8.23742 14.2439C7.97486 14.5064 7.66285 14.6377 7.30139 14.6377C6.94081 14.6377 6.62924 14.5064 6.36668 14.2439L0.36059 8.23777C0.229309 8.10649 0.136097 7.96427 0.0809593 7.8111C0.0266972 7.65794 -0.000434875 7.49384 -0.000434875 7.3188C-0.000434875 7.14376 0.0266972 6.97966 0.0809593 6.8265C0.136097 6.67334 0.229309 6.53112 0.36059 6.39984L6.3995 0.360931C6.64018 0.12025 6.94081 -9.25064e-05 7.30139 -9.25064e-05C7.66285 -9.25064e-05 7.97486 0.131189 8.23742 0.393751Z"
              fill="white"
              onClick={() => {
                setInputStates({ ...inputStates, activeBox: 1 });
              }}
            />
          </svg>
          <p className="recovery_header">Восстановление</p>
          <img className="logo_icon" src={logo_icon} alt="logo_icon" />

          <form className="input_form" action="#" style={{ height: '50vh' }}>
            <h1 id="recovery_header" className="input_form_sign">
              Укажите, пожалуйста,
              <br /> адрес эл. почты или
              <br /> телефон
            </h1>
            <p className="registration_advice">
              Это нужно для подтверждения того, что вы владеете аккаунтом
            </p>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="text"
              name="telem"
              value={inputStates.telem}
              placeholder="Эл. почта/телефон*"
            />
            <p className="error_label none_active">Неверный номер телефона или почта!</p>
            <button
              className="login_btn"
              onClick={() => setInputStates({ ...inputStates, activeBox: 10 })}>
              Продолжить
            </button>
          </form>
        </div>
      )}
      {inputStates.activeBox === 10 && (
        <div className="input_container">
          <svg
            className="arrowSvg"
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            onClick={() => {
              setInputStates({ ...inputStates, activeBox: 9 });
            }}>
            <path
              d="M8.23742 0.393751C8.49999 0.656312 8.62602 0.973574 8.61551 1.34554C8.60414 1.7175 8.46717 2.03476 8.20461 2.29732L4.49593 6.006H19.1337C19.5057 6.006 19.8177 6.13203 20.0697 6.38408C20.3209 6.63527 20.4465 6.94684 20.4465 7.3188C20.4465 7.69076 20.3209 8.00278 20.0697 8.25483C19.8177 8.50602 19.5057 8.63161 19.1337 8.63161H4.49593L8.23742 12.3731C8.49999 12.6357 8.63127 12.9477 8.63127 13.3091C8.63127 13.6697 8.49999 13.9813 8.23742 14.2439C7.97486 14.5064 7.66285 14.6377 7.30139 14.6377C6.94081 14.6377 6.62924 14.5064 6.36668 14.2439L0.36059 8.23777C0.229309 8.10649 0.136097 7.96427 0.0809593 7.8111C0.0266972 7.65794 -0.000434875 7.49384 -0.000434875 7.3188C-0.000434875 7.14376 0.0266972 6.97966 0.0809593 6.8265C0.136097 6.67334 0.229309 6.53112 0.36059 6.39984L6.3995 0.360931C6.64018 0.12025 6.94081 -9.25064e-05 7.30139 -9.25064e-05C7.66285 -9.25064e-05 7.97486 0.131189 8.23742 0.393751Z"
              fill="white"
              onClick={() => {
                setInputStates({ ...inputStates, activeBox: 9 });
              }}
            />
          </svg>
          <p className="recovery_header">Восстановление</p>
          <img className="logo_icon" src={logo_icon} alt="logo_icon" />

          <form className="input_form" action="#" style={{ height: '50vh' }}>
            <h1 className="input_form_sign_code">Введите, пожалуйста, код подтверждения </h1>
            <p className="registration_advice" id="reg_code_sign">
              Мы отправили код подтверждения
              <br />
              на телефон +7 123 456 78 90
            </p>
            <input
              onFocus={onFocusInput}
              onChange={handleChange}
              type="text"
              name="code"
              placeholder="Код подтверждения"
            />
            <p className="error_label none_active">Неверный код подтверждения!</p>

            <button
              className="login_btn"
              onClick={() => {
                setInputStates({ ...inputStates, activeBox: 11 });
              }}>
              Продолжить
            </button>
            <p className="sign_zapros">
              Повторная отправка запроса через
              <br />
              00:00
            </p>
          </form>
        </div>
      )}
      {inputStates.activeBox === 11 && (
        <div className="input_container">
          <svg
            className="arrowSvg"
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            onClick={() => {
              setInputStates({ ...inputStates, activeBox: 10 });
            }}>
            <path
              d="M8.23742 0.393751C8.49999 0.656312 8.62602 0.973574 8.61551 1.34554C8.60414 1.7175 8.46717 2.03476 8.20461 2.29732L4.49593 6.006H19.1337C19.5057 6.006 19.8177 6.13203 20.0697 6.38408C20.3209 6.63527 20.4465 6.94684 20.4465 7.3188C20.4465 7.69076 20.3209 8.00278 20.0697 8.25483C19.8177 8.50602 19.5057 8.63161 19.1337 8.63161H4.49593L8.23742 12.3731C8.49999 12.6357 8.63127 12.9477 8.63127 13.3091C8.63127 13.6697 8.49999 13.9813 8.23742 14.2439C7.97486 14.5064 7.66285 14.6377 7.30139 14.6377C6.94081 14.6377 6.62924 14.5064 6.36668 14.2439L0.36059 8.23777C0.229309 8.10649 0.136097 7.96427 0.0809593 7.8111C0.0266972 7.65794 -0.000434875 7.49384 -0.000434875 7.3188C-0.000434875 7.14376 0.0266972 6.97966 0.0809593 6.8265C0.136097 6.67334 0.229309 6.53112 0.36059 6.39984L6.3995 0.360931C6.64018 0.12025 6.94081 -9.25064e-05 7.30139 -9.25064e-05C7.66285 -9.25064e-05 7.97486 0.131189 8.23742 0.393751Z"
              fill="white"
              onClick={() => {
                setInputStates({ ...inputStates, activeBox: 10 });
              }}
            />
          </svg>
          <p className="recovery_header">Восстановление</p>
          <img className="logo_icon" src={logo_icon} alt="logo_icon" />

          <form className="input_form" action="#" style={{ height: '50vh' }}>
            <h1 className="input_form_sign_code">
              Придумайте, пожалуйста,
              <br /> новый пароль{' '}
            </h1>

            <div className="password_input">
              <input
                id="passwordInput"
                onFocus={onFocusInput}
                onChange={handleChange}
                type={inputStates.isPasswordVisible ? 'text' : 'password'}
                name="password"
                value={inputStates.password}
                placeholder="Вот тут придумайте*"
              />

              {!inputStates.isPasswordVisible ? (
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
                    fill="#ACACAC"
                  />
                </svg>
              ) : (
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
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none">
                  <path
                    onClick={() => {
                      setInputStates({
                        ...inputStates,
                        isPasswordVisible: !inputStates.isPasswordVisible,
                      });
                    }}
                    d="M12.2783 3.5986C11.8587 3.55005 11.4323 3.52223 11 3.51531C9.11122 3.52427 7.15325 4.01562 5.29993 4.95713C3.92387 5.68499 2.58343 6.71253 1.41931 7.98003C0.847587 8.62706 0.117902 9.56393 0 10.5635C0.0139333 11.4294 0.882806 12.4981 1.41931 13.147C2.51094 14.3647 3.81647 15.3629 5.29993 16.1699C5.35035 16.1961 5.40095 16.2219 5.45166 16.2474L4.07534 18.818L5.94543 20L16.0547 1.17658L14.2547 0L12.2783 3.5986ZM16.547 4.88245L15.1733 7.42856C15.8053 8.30661 16.1804 9.38939 16.1804 10.5635C16.1804 13.49 13.8609 15.8626 10.9987 15.8626C10.8749 15.8626 10.755 15.8483 10.6334 15.8396L9.72436 17.5227C10.1436 17.5707 10.5675 17.6057 11 17.6117C12.8906 17.6026 14.8474 17.1056 16.6987 16.1699C18.0748 15.442 19.4166 14.4145 20.5807 13.147C21.1524 12.5 21.8821 11.5631 22 10.5635C21.9861 9.69763 21.1172 8.62889 20.5807 7.98001C19.4891 6.7623 18.1822 5.76416 16.6987 4.95709C16.6487 4.93113 16.5974 4.90778 16.547 4.88245ZM10.9987 5.26445C11.1242 5.26445 11.2487 5.26983 11.372 5.27881L10.3071 7.25051C8.81271 7.57454 7.69141 8.93437 7.69141 10.5621C7.69141 10.971 7.76183 11.3624 7.89148 11.7253C7.89163 11.7257 7.89133 11.7263 7.89148 11.7267L6.82397 13.7042C6.19053 12.8253 5.81688 11.739 5.81688 10.5635C5.8169 7.63703 8.13649 5.26443 10.9987 5.26445ZM14.0964 9.42184L11.6969 13.8679C13.1833 13.5378 14.2965 12.1841 14.2965 10.5621C14.2965 10.1607 14.2216 9.779 14.0964 9.42184Z"
                    fill="#D2D2D2"
                  />
                </svg>
              )}
            </div>
            <p className="error_label none_active">Недопустимый пароль!</p>
            <div className="password_input">
              <input
                id="passwordRepeatInput"
                onFocus={onFocusInput}
                onChange={handleChange}
                type={inputStates.isRepeatPasswordVisible ? 'text' : 'password'}
                name="password"
                value={inputStates.password}
                placeholder="Вот тут повторите*"
              />

              {!inputStates.isRepeatPasswordVisible ? (
                <svg
                  onClick={() => {
                    setInputStates({
                      ...inputStates,
                      isRepeatPasswordVisible: !inputStates.isRepeatPasswordVisible,
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
                        isRepeatPasswordVisible: !inputStates.isRepeatPasswordVisible,
                      });
                    }}
                    d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z"
                    fill="#ACACAC"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => {
                    setInputStates({
                      ...inputStates,
                      isRepeatPasswordVisible: !inputStates.isRepeatPasswordVisible,
                    });
                  }}
                  className="show_password"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none">
                  <path
                    onClick={() => {
                      setInputStates({
                        ...inputStates,
                        isRepeatPasswordVisible: !inputStates.isRepeatPasswordVisible,
                      });
                    }}
                    d="M12.2783 3.5986C11.8587 3.55005 11.4323 3.52223 11 3.51531C9.11122 3.52427 7.15325 4.01562 5.29993 4.95713C3.92387 5.68499 2.58343 6.71253 1.41931 7.98003C0.847587 8.62706 0.117902 9.56393 0 10.5635C0.0139333 11.4294 0.882806 12.4981 1.41931 13.147C2.51094 14.3647 3.81647 15.3629 5.29993 16.1699C5.35035 16.1961 5.40095 16.2219 5.45166 16.2474L4.07534 18.818L5.94543 20L16.0547 1.17658L14.2547 0L12.2783 3.5986ZM16.547 4.88245L15.1733 7.42856C15.8053 8.30661 16.1804 9.38939 16.1804 10.5635C16.1804 13.49 13.8609 15.8626 10.9987 15.8626C10.8749 15.8626 10.755 15.8483 10.6334 15.8396L9.72436 17.5227C10.1436 17.5707 10.5675 17.6057 11 17.6117C12.8906 17.6026 14.8474 17.1056 16.6987 16.1699C18.0748 15.442 19.4166 14.4145 20.5807 13.147C21.1524 12.5 21.8821 11.5631 22 10.5635C21.9861 9.69763 21.1172 8.62889 20.5807 7.98001C19.4891 6.7623 18.1822 5.76416 16.6987 4.95709C16.6487 4.93113 16.5974 4.90778 16.547 4.88245ZM10.9987 5.26445C11.1242 5.26445 11.2487 5.26983 11.372 5.27881L10.3071 7.25051C8.81271 7.57454 7.69141 8.93437 7.69141 10.5621C7.69141 10.971 7.76183 11.3624 7.89148 11.7253C7.89163 11.7257 7.89133 11.7263 7.89148 11.7267L6.82397 13.7042C6.19053 12.8253 5.81688 11.739 5.81688 10.5635C5.8169 7.63703 8.13649 5.26443 10.9987 5.26445ZM14.0964 9.42184L11.6969 13.8679C13.1833 13.5378 14.2965 12.1841 14.2965 10.5621C14.2965 10.1607 14.2216 9.779 14.0964 9.42184Z"
                    fill="#D2D2D2"
                  />
                </svg>
              )}
            </div>
            <p className="error_label none_active">Пароли не совпадают!</p>

            <button
              className="login_btn"
              onClick={() => {
                goHome();
              }}>
              Продолжить
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Input;
