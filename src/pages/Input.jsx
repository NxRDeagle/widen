import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoSvg from '../img/logoInput.svg';
import { mainContext } from '../App';

import '../css/Input.css';

class Input extends React.Component {
  state = {
    activeBox: 0,
    userCategory: 'undefined',
    login: '',
    password: '',
    loginpassword: '',
    secondpassword: '',
    telem: '',
    code: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFocusInput = () => {
    document.querySelectorAll('input').forEach((input) => {
      input.className = '';
    });
    document.querySelectorAll('.error_label').forEach((label) => {
      label.classList.add('none_active');
    });
  };

  onClickLogin = () => {
    let logic = true;

    document.querySelectorAll('input').forEach((input) => {
      if (input.value === '') {
        logic = false;
        input.className = 'error_input';
        this.state.activeBox === 1
          ? input.nextElementSibling.classList.remove('none_active')
          : document.getElementById('error_label_input').classList.remove('none_active');
      }
    });
    if (this.state.activeBox === 1 && this.state.userCategory === 'undefined') {
      logic = false;
      document.querySelectorAll('.who_im_checkbtn').forEach((box) => {
        box.classList.add('error_input');
      });
    }
    if (this.state.activeBox === 0 && logic) {
      const navigate = useNavigate();
      const { setPage } = React.useContext(mainContext);
      navigate('/');
      setPage('home');
    }
  };

  render() {
    const { activeBox, userCategory, login, password, loginpassword, secondpassword, telem, code } =
      this.state;

    return (
      <>
        {activeBox === 0 && (
          <div className="input_container">
            <img className="input_logo" src={logoSvg} />

            <form className="input_form" action="#" style={{ height: '40vh' }}>
              <h1 className="input_form_sign">Вход</h1>
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="text"
                name="login"
                value={login}
                placeholder="Логин"
              />
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="password"
                name="password"
                value={password}
                placeholder="Пароль"
              />
              <p id="error_label_input" className="error_label none_active">
                Неверный логин или пароль!
              </p>
              <button onClick={this.onClickLogin}>Войти</button>
            </form>

            <p>
              Нет аккаунта?{' '}
              <a
                className="input_link"
                onClick={() => {
                  this.setState({ activeBox: 1 });
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
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="text"
                name="telem"
                value={telem}
                placeholder="Номер телефона/Почта"
              />
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
                      this.setState({ userCategory: 'freelancer' });
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
                      this.setState({ userCategory: 'urik' });
                    }}></div>
                  <p>Юридическое лицо</p>
                </div>
              </div>
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="text"
                name="code"
                value={code}
                placeholder="Код"
              />
              <p className="error_label none_active">Неверный код!</p>
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="password"
                name="loginpassword"
                value={loginpassword}
                placeholder="Пароль"
              />
              <p className="error_label none_active">Недопустимый пароль!</p>
              <input
                onFocus={this.onFocusInput}
                onChange={this.handleChange}
                type="password"
                name="secondpassword"
                value={secondpassword}
                placeholder="Повторите пароль"
              />
              <p className="error_label none_active">Пароли не совпадают!</p>
              <button onClick={this.onClickLogin}>Далее</button>
            </form>
            <p className="sign_conf">
              Нажимая “Далее”, Вы соглашаетесь с <u>регламентом</u> и{' '}
              <u>политикой конфиденциальности</u>
            </p>
            <p>
              Есть аккаунт?{' '}
              <a
                className="input_link"
                onClick={() => {
                  this.setState({ activeBox: 0 });
                }}>
                Войти
              </a>
            </p>
          </div>
        )}
      </>
    );
  }
}

export default Input;
