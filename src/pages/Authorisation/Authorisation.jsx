import React, { useEffect, useState, useContext } from 'react';
import logo_icon from '../../img/widenLogo.svg';
import { Registration, Auth, CheckUser, Recovery } from '../../service/routes/auth/auth.js';
import { BtnLoader } from '../../global_components/loaders/loaders.js';

import { mainContext } from '../../App.js';

import './css/Authorisation.css';

import {
    SubmitBtn,
    AuthInput,
    PswdInput,
    CodeInput,
    LoginLink,
    ChooseBtn,
    ChooseInterest,
    SubmitInterestsBtn
} from './components/auth-components.js';

const Authorisation = () => {

    const { navigate } = useContext(mainContext);

    //Loader
    const [loading, setLoading] = useState(false);

    //Функция выбора интересов
    function interestClick(isSelected, setIsSelected, sign) {
        setLoginStates({
            ...loginStates,
            interests: isSelected ? loginStates.interests.filter(interest => interest !== sign) : [...loginStates.interests, sign]
        })
        setIsSelected(!isSelected);
    }

    //Функция, которая меняет определённых состояний
    function handleSwitchState(states) {
        setLoginStates({
            ...loginStates,
            ...states
        });
    }

    //Функция перехода между формами
    function handleSwitchForm(newActiveBox) {
        handleSwitchState({ activeBox: newActiveBox })
    }

    //Функция перехода с очищением
    function handleClearSwitchForm(newActiveBox) {
        setLoginStates({
            activeBox: newActiveBox,
            userCategory: '',
            interests: [],
            login: '',
            password: '',
            secondpassword: '',
            email: '',
            code: ['', '', '', ''],
            error: false,
        })
    }
    //Функция вводя в поля авторизации
    const handleChange = (e) => {
        handleSwitchState({ [e.target.name]: e.target.value });
    };

    //Функция ввода кода
    function handleChangeCode(e) {
        e.target.value = e.target.value ? e.target.value %= 10 : '';
        const index = +e.target.name.split('-')[1];
        loginStates.code[index] = e.target.value;
        index < 3 ? document.querySelector(`[name="code-${index + 1}"]`).focus() : document.querySelector(`[name="code-${0}"]`).focus();
    }

    //Функция фокуса на поле 
    const handleFocus = () => {
        handleSwitchState({ error: false })
    };

    //Функция выбора категории
    function chooseCategory(e) {
        e.preventDefault();
        e.stopPropagation();
        handleSwitchState({ userCategory: e.target.name, error: false });
    }

    //Функция преобразования секунд в формат таймера
    function currentTime() {
        const minutes = Math.floor(timespan / 60);
        const seconds = Math.floor(timespan % 60);
        return seconds > 9 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
    }

    //Состояния Страницы Входа
    const [loginStates, setLoginStates] = React.useState({
        activeBox: 'login',
        userCategory: '',
        interests: [],
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

        handleSwitchState({ error: '' });

        const loginContainer = document.getElementById('login_container');

        loginContainer.classList.add('main')

        setTimeout(() => {
            loginContainer.classList.remove('main')
        }, 1000)

    }, [loginStates.activeBox])

    //Таймер
    useEffect(() => {
        if (['reccode', 'regcode'].includes(loginStates.activeBox)) {
            if (timespan > 0) {
                setTimeout(() => {
                    setTimeSpan(timespan - 1);
                }, 1000)
            }
        };
    }, [timespan])

    function handleBack() {
        switch (loginStates.activeBox) {
            case 'regcode':
                handleSwitchForm('regmail');
                break;
            case 'regpswd':
                handleSwitchForm('regmail');
                break;
            case 'regnick':
                handleSwitchForm('regpswd');
                break;
            case 'regcategory':
                handleSwitchForm('regnick');
                break;
            case 'recmail':
                handleClearSwitchForm('login');
                break;
            case 'reccode':
                handleSwitchForm('recmail');
                break;
            case 'recpswd':
                handleSwitchForm('recmail');
                break;
            default:
                handleClearSwitchForm('login');
                break;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);

        switch (true) {
            case loginStates.activeBox === 'login':
                if (!loginStates.login.length || !loginStates.password) {
                    handleSwitchState({ error: 'Логин или пароль не заполнены.' });
                    break;
                }
                await Auth({ login: loginStates.login, password: loginStates.password })
                    .then(d => {
                        localStorage.setItem('myNickname', d.username);
                        navigate('/home');
                    })
                    .catch(e => handleSwitchState({ error: e.message }))
                break;
            case ['regmail', 'recmail'].includes(loginStates.activeBox):
                if (!loginStates.email.length) {
                    handleSwitchState({ error: 'Укажите почту.' });
                    break;
                }
                if (loginStates.activeBox === 'regmail') {
                    handleSwitchForm('regpswd');
                } else {
                    await CheckUser({ login: loginStates.email })
                        .then(_ => {
                            handleSwitchForm('recpswd');
                        })
                        .catch(e => handleSwitchState({ error: e.message }))
                }
                break;
            case ['regpswd', 'recpswd'].includes(loginStates.activeBox):
                if (!loginStates.password.length || !loginStates.secondpassword.length) {
                    handleSwitchState({ error: 'Пароли не введены.' });
                    break;
                }
                if (loginStates.password !== loginStates.secondpassword) {
                    handleSwitchState({ error: 'Пароли не совпадают.' });
                    break;
                }
                if (loginStates.activeBox === 'regpswd') {
                    handleSwitchForm('regnick');
                } else {
                    await Recovery({login: loginStates.email, password: loginStates.password})
                    .then(d => {
                        localStorage.setItem('myNickname', d.username);
                        navigate('/home');
                    })
                    .catch(e => {
                        handleSwitchState({ error: e.message })
                        setTimeout(() => {
                            handleSwitchForm('recmail');
                        }, 1000)
                    })
                    break;
                }
                break;
            case loginStates.activeBox === 'regnick':
                if (!loginStates.login.length) {
                    handleSwitchState({ error: 'Никнейм не указан.' });
                    break;
                }
                handleSwitchForm('regcategory')
                break;
            case loginStates.activeBox === 'regcategory':
                if (!loginStates.userCategory.length) {
                    handleSwitchState({ error: 'Категория не указана.' });
                    break;
                }
                await Registration({ email: loginStates.email, password: loginStates.password, username: loginStates.login })
                    .then(d => {
                        localStorage.setItem('myNickname', d.username);
                        navigate('/home');
                    })
                    .catch(e => {
                        handleSwitchState({ error: e.message })
                        setTimeout(() => {
                            handleSwitchForm('regmail');
                        }, 1000)
                    })
                break;
            default:
                return;
        }
        setLoading(false);
    }

    return (
        <>
            {
                loginStates.activeBox === 'interests' ? (
                    <form id='login_container' className='authorisation_container_intersts'>
                        <p className='authorisation_sign_mini'>Какие сферы Вам интересны?</p>
                        <ChooseInterest onClick={interestClick} />
                        <SubmitInterestsBtn>Зарегистрироваться</SubmitInterestsBtn>
                    </form>
                )
                    :
                    (
                        <div id='login_container' className='authorisation_container_main'>
                            <img src={logo_icon} loading='lazy' className='authorisation_logo_icon' alt='logo_icon'></img >
                            {
                                !['login', 'regmail'].includes(loginStates.activeBox) && (
                                    <div onClick={handleBack} className='back_login_box'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
                                            <path d="M8.23742 0.393751C8.49999 0.656312 8.62602 0.973574 8.61551 1.34554C8.60414 1.7175 8.46717 2.03476 8.20461 2.29732L4.49593 6.006H19.1337C19.5057 6.006 19.8177 6.13203 20.0697 6.38408C20.3209 6.63527 20.4465 6.94684 20.4465 7.3188C20.4465 7.69076 20.3209 8.00278 20.0697 8.25483C19.8177 8.50602 19.5057 8.63161 19.1337 8.63161H4.49593L8.23742 12.3731C8.49999 12.6357 8.63127 12.9477 8.63127 13.3091C8.63127 13.6697 8.49999 13.9813 8.23742 14.2439C7.97486 14.5064 7.66285 14.6377 7.30139 14.6377C6.94081 14.6377 6.62924 14.5064 6.36668 14.2439L0.36059 8.23777C0.229309 8.10649 0.136097 7.96427 0.0809593 7.8111C0.0266972 7.65794 -0.000434875 7.49384 -0.000434875 7.3188C-0.000434875 7.14376 0.0266972 6.97966 0.0809593 6.8265C0.136097 6.67334 0.229309 6.53112 0.36059 6.39984L6.3995 0.360931C6.64018 0.12025 6.94081 -9.25064e-05 7.30139 -9.25064e-05C7.66285 -9.25064e-05 7.97486 0.131189 8.23742 0.393751Z" fill="white" />
                                        </svg>
                                    </div>
                                )
                            }
                            < form className='authorisation_form_box' onSubmit={handleSubmit}>
                                {
                                    loginStates.activeBox === 'login' && (
                                        <>
                                            <h1 className='authorisation_sign'>Вход</h1>
                                            <AuthInput value={loginStates.login} onFocus={handleFocus} onChange={handleChange} name='login' className={loginStates.error ? 'authoristaion_text_input error_login' : 'authoristaion_text_input'} placeholder='Логин*'></AuthInput>
                                            <PswdInput value={loginStates.password} onFocus={handleFocus} onChange={handleChange} name='password' placeholder='Пароль*' className={loginStates.error ? 'authoristaion_password_input error_login' : 'authoristaion_password_input'}></PswdInput>
                                            {
                                                loading ? <BtnLoader /> : <SubmitBtn>Войти</SubmitBtn>
                                            }
                                            <p className={loginStates.error ? 'error_label' : 'none_active'}>{loginStates.error}</p>
                                            <p onClick={() => handleClearSwitchForm('recmail')} className='forgot_pswd_link'>Забыли пароль?</p>
                                        </>
                                    )
                                }
                                {
                                    loginStates.activeBox === 'regmail' && (
                                        <>
                                            <h1 className='authorisation_sign'>Регистрация</h1>
                                            <p className='authorisation_hint'>Укажите, пожалуйста, адрес эл. почты</p>
                                            <AuthInput value={loginStates.email} onFocus={handleFocus} onChange={handleChange} name='email' className={loginStates.error ? 'authoristaion_text_input error_login' : 'authoristaion_text_input'} placeholder='Эл.Почта*'></AuthInput>
                                            {
                                                loading ? <BtnLoader /> : <SubmitBtn>Продолжить</SubmitBtn>
                                            }
                                            <p className={loginStates.error ? 'error_label' : 'none_active'}>{loginStates.error}</p>
                                        </>
                                    )
                                }
                                {
                                    loginStates.activeBox === 'regcode' && (
                                        <>
                                            <p className='authorisation_sign_mini'>Введите, пожалуйста, код подтверждения</p>
                                            <p className='authorisation_hint'>Мы отправили код подтверждения на почту: {loginStates.email}</p>
                                            <CodeInput onChange={handleChangeCode} onFocus={handleFocus} className={loginStates.error ? 'authoristaion_code_input error_login' : 'authoristaion_code_input'}></CodeInput>
                                            {
                                                loading ? <BtnLoader /> : <SubmitBtn>Продолжить</SubmitBtn>
                                            }
                                            <p className={loginStates.error ? 'error_label' : 'none_active'}>{loginStates.error}</p>
                                            {
                                                timespan === 0 ?
                                                    <p onClick={() => alert('Отправил')} className='forgot_pswd_link'>Отправить код повторно</p>
                                                    :
                                                    <p className='authorisation_hint'>Повторная отправка кода через<br></br>{currentTime()}</p>
                                            }
                                        </>
                                    )
                                }
                                {
                                    loginStates.activeBox === 'regpswd' && (
                                        <>
                                            <p className='authorisation_sign_mini'>Придумайте, пожалуйста, новый пароль</p>
                                            <PswdInput value={loginStates.password} onFocus={handleFocus} onChange={handleChange} name='password' placeholder='Вот тут придумайте*' className={loginStates.error ? 'authoristaion_password_input error_login' : 'authoristaion_password_input'}></PswdInput>
                                            <PswdInput value={loginStates.secondpassword} onFocus={handleFocus} onChange={handleChange} name='secondpassword' placeholder='Вот тут повторите*' className={loginStates.error ? 'authoristaion_password_input error_login' : 'authoristaion_password_input'}></PswdInput>
                                            {
                                                loading ? <BtnLoader /> : <SubmitBtn>Продолжить</SubmitBtn>
                                            }
                                            <p className={loginStates.error ? 'error_label' : 'none_active'}>{loginStates.error}</p>
                                        </>
                                    )
                                }
                                {
                                    loginStates.activeBox === 'regnick' && (
                                        <>
                                            <p className='authorisation_sign_mini'>Придумайте, пожалуйста, никнейм</p>
                                            <p className='authorisation_hint'>Например, KOsMO, prin, Xee_e</p>
                                            <AuthInput value={loginStates.login} onFocus={handleFocus} onChange={handleChange} name='login' className={loginStates.error ? 'authoristaion_text_input error_login' : 'authoristaion_text_input'} placeholder='Никнейм*'></AuthInput>
                                            {
                                                loading ? <BtnLoader /> : <SubmitBtn>Продолжить</SubmitBtn>
                                            }
                                            <p className={loginStates.error ? 'error_label' : 'none_active'}>{loginStates.error}</p>
                                        </>
                                    )
                                }
                                {
                                    loginStates.activeBox === 'regcategory' && (
                                        <>
                                            <p className='authorisation_sign_mini'>Кем вы являетесь?</p>
                                            <ChooseBtn onClick={chooseCategory} name='professional' className={loginStates.userCategory === 'professional' ? 'choose_who_btn  your_choose' : loginStates.error ? 'choose_who_btn error_login' : 'choose_who_btn'}>Профессионал</ChooseBtn>
                                            <ChooseBtn onClick={chooseCategory} name='customer' className={loginStates.userCategory === 'customer' ? 'choose_who_btn  your_choose' : loginStates.error ? 'choose_who_btn error_login' : 'choose_who_btn'}>Заказчик</ChooseBtn>
                                            <ChooseBtn onClick={chooseCategory} name='organisation' className={loginStates.userCategory === 'organisation' ? 'choose_who_btn  your_choose' : loginStates.error ? 'choose_who_btn error_login' : 'choose_who_btn'}>Организация</ChooseBtn>
                                            {
                                                loading ? <BtnLoader /> : <SubmitBtn>Далее</SubmitBtn>
                                            }
                                            <p className={loginStates.error ? 'error_label' : 'none_active'}>{loginStates.error}</p>
                                        </>
                                    )
                                }
                                {
                                    loginStates.activeBox === 'recmail' && (
                                        <>
                                            <p className='authorisation_sign_mini'>Укажите, пожалуйста, адрес эл. почты или телефон</p>
                                            <p className='authorisation_hint'>Это нужно для подтверждения того, что вы владеете аккаунтом</p>
                                            <AuthInput value={loginStates.email} onFocus={handleFocus} onChange={handleChange} name='email' className={loginStates.error ? 'authoristaion_text_input error_login' : 'authoristaion_text_input'} placeholder='Эл.Почта*'></AuthInput>
                                            {
                                                loading ? <BtnLoader /> : <SubmitBtn>Продолжить</SubmitBtn>
                                            }
                                            <p className={loginStates.error ? 'error_label' : 'none_active'}>{loginStates.error}</p>
                                        </>
                                    )
                                }
                                {
                                    loginStates.activeBox === 'reccode' && (
                                        <>
                                            <p className='authorisation_sign_mini'>Введите, пожалуйста, код подтверждения</p>
                                            <p className='authorisation_hint'>Мы отправили код подтверждения на почту: {loginStates.email}</p>
                                            <CodeInput onChange={handleChangeCode} onFocus={handleFocus} className={loginStates.error ? 'authoristaion_code_input error_login' : 'authoristaion_code_input'}></CodeInput>
                                            {
                                                loading ? <BtnLoader /> : <SubmitBtn>Продолжить</SubmitBtn>
                                            }
                                            <p className={loginStates.error ? 'error_label' : 'none_active'}>{loginStates.error}</p>
                                            {
                                                timespan === 0 ?
                                                    <p onClick={() => alert('Отправил')} className='forgot_pswd_link'>Отправить код повторно</p>
                                                    :
                                                    <p className='authorisation_hint'>Повторная отправка кода через<br></br>{currentTime()}</p>
                                            }
                                        </>
                                    )
                                }
                                {
                                    loginStates.activeBox === 'recpswd' && (
                                        <>
                                            <p className='authorisation_sign_mini'>Придумайте, пожалуйста, новый пароль</p>
                                            <PswdInput value={loginStates.password} onFocus={handleFocus} onChange={handleChange} name='password' placeholder='Вот тут придумайте*' className={loginStates.error ? 'authoristaion_password_input error_login' : 'authoristaion_password_input'}></PswdInput>
                                            <PswdInput value={loginStates.secondpassword} onFocus={handleFocus} onChange={handleChange} name='secondpassword' placeholder='Вот тут повторите*' className={loginStates.error ? 'authoristaion_password_input error_login' : 'authoristaion_password_input'}></PswdInput>
                                            {
                                                loading ? <BtnLoader /> : <SubmitBtn>Продолжить</SubmitBtn>
                                            }
                                            <p className={loginStates.error ? 'error_label' : 'none_active'}>{loginStates.error}</p>
                                        </>
                                    )
                                }
                            </form>

                            {
                                ['login', 'regmail'].includes(loginStates.activeBox) && (
                                    <LoginLink onClick={() => handleClearSwitchForm(loginStates.activeBox === 'login' ? 'regmail' : 'login')} link={loginStates.activeBox === 'login' ? 'Зарегистрироваться' : 'Войти'}>
                                        {loginStates.activeBox === 'login' ? 'Нет аккаунта?' : 'Есть аккаунт?'}
                                    </LoginLink>
                                )
                            }

                        </div >
                    )
            }

        </>
    )
}

export default Authorisation;