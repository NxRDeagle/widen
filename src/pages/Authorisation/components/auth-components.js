import React, { memo, useState, useRef, useEffect } from 'react';

import interest_data from '../../../data/interest_data.json';
import bgs from '../../../global-constants/constants';
import ellipse from '../../../img/Ellipse.svg';


//Кнопка отправки формы
export const SubmitBtn = ({ children }) => {
    return (
        <input value={children} type='submit' className='authoristaion_form_btn' />
    )
}

//Поля для ввода текста
export const AuthInput = ({ placeholder, onChange, onFocus, className, name }) => {
    return (
        <input data-login name={name} onChange={onChange} onFocus={onFocus} type='text' placeholder={placeholder} className={className} />
    )
}

//Поле для ввода пароля
export const PswdInput = ({ placeholder, onChange, onFocus, className, name }) => {
    const [isVisiblePswd, setIsVisiblePswd] = useState(false)
    return (
        <div className='authoristaion_password_box'>
            <input
                onChange={onChange}
                onFocus={onFocus}
                type={isVisiblePswd ? 'text' : 'password'}
                placeholder={placeholder}
                className={className}
                name={name}
                data-login
            />
            {
                isVisiblePswd ?
                    <svg onClick={() => setIsVisiblePswd(!isVisiblePswd)} className='icon_password' xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                        <path d="M12.2783 3.5986C11.8587 3.55005 11.4323 3.52223 11 3.51531C9.11122 3.52427 7.15325 4.01562 5.29993 4.95713C3.92387 5.68499 2.58343 6.71253 1.41931 7.98003C0.847587 8.62706 0.117902 9.56393 0 10.5635C0.0139333 11.4294 0.882806 12.4981 1.41931 13.147C2.51094 14.3647 3.81647 15.3629 5.29993 16.1699C5.35035 16.1961 5.40095 16.2219 5.45166 16.2474L4.07534 18.818L5.94543 20L16.0547 1.17658L14.2547 0L12.2783 3.5986ZM16.547 4.88245L15.1733 7.42856C15.8053 8.30661 16.1804 9.38939 16.1804 10.5635C16.1804 13.49 13.8609 15.8626 10.9987 15.8626C10.8749 15.8626 10.755 15.8483 10.6334 15.8396L9.72436 17.5227C10.1436 17.5707 10.5675 17.6057 11 17.6117C12.8906 17.6026 14.8474 17.1056 16.6987 16.1699C18.0748 15.442 19.4166 14.4145 20.5807 13.147C21.1524 12.5 21.8821 11.5631 22 10.5635C21.9861 9.69763 21.1172 8.62889 20.5807 7.98001C19.4891 6.7623 18.1822 5.76416 16.6987 4.95709C16.6487 4.93113 16.5974 4.90778 16.547 4.88245ZM10.9987 5.26445C11.1242 5.26445 11.2487 5.26983 11.372 5.27881L10.3071 7.25051C8.81271 7.57454 7.69141 8.93437 7.69141 10.5621C7.69141 10.971 7.76183 11.3624 7.89148 11.7253C7.89163 11.7257 7.89133 11.7263 7.89148 11.7267L6.82397 13.7042C6.19053 12.8253 5.81688 11.739 5.81688 10.5635C5.8169 7.63703 8.13649 5.26443 10.9987 5.26445ZM14.0964 9.42184L11.6969 13.8679C13.1833 13.5378 14.2965 12.1841 14.2965 10.5621C14.2965 10.1607 14.2216 9.779 14.0964 9.42184Z" fill="#D2D2D2" />
                    </svg>
                    :
                    <svg style={{ marginTop: '5px' }} onClick={() => setIsVisiblePswd(!isVisiblePswd)} className='icon_password' xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                        <path d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z" fill="#ACACAC" />
                    </svg>
            }
        </div>
    )
}

//Поля для ввода кода
export const CodeInput = ({ onChange, onFocus, className }) => {
    return (
        <div className='authoristaion_code_box'>
            <input name='code-0' data-login maxLength={1} type='number' onChange={onChange} className={className} onFocus={onFocus} />
            <input name='code-1' data-login maxLength={1} type='number' onChange={onChange} className={className} onFocus={onFocus} />
            <input name='code-2' data-login maxLength={1} type='number' onChange={onChange} className={className} onFocus={onFocus} />
            <input name='code-3' data-login maxLength={1} type='number' onChange={onChange} className={className} onFocus={onFocus} />
        </div>
    )
}

//Переадрицация на вход или регистрацию
export const LoginLink = ({ link, children, onClick }) => {
    return (
        <div className='login_link_box'>
            {children}
            <p onClick={onClick} className='login_link'>{link}</p>
        </div>
    )

}

//Кнопка выбора категории
export const ChooseBtn = ({ className, children, onClick, name }) => {
    return (
        <button className={className} onClick={onClick} name={name}>
            {children}
        </button>
    )
}

//Сам кружок интереса
const Sphere = ({ onClick, sign, bg, num }) => {
    const [isSelected, setIsSelected] = useState(false);
    const interestRef = useRef();

    useEffect(() => {
        interestRef.current.innerHTML = interest_data[num].icon;
    }, []);

    return (
        <div className="interest" onClick={() => onClick(isSelected, setIsSelected, sign)}>
            <div
                ref={interestRef}
                className="interest_sphere"
                style={{ backgroundImage: `url('${bg}')` }}></div>
            <img loading='lazy' src={ellipse} className={isSelected ? "selected_int interest_selected" : "selected_int"} alt="selected_int" />
            <p className="interest_sign">{sign}</p>
        </div>
    );
}

//Кружки выбора интересов
export const ChooseInterest = memo(({ onClick }) => {
    return (
        <div className="choose_box">
            {
                bgs.map((bg, index) => {
                    return <Sphere onClick={onClick} sign={interest_data[index].name} bg={bg} num={index} key={index} />
                })
            }
        </div>
    );
});

//Кнопка submit интересов
export const SubmitInterestsBtn = ({ children }) => {
    return (
        <div className='interests_submit_box'>
            <input type='submit' value={children} className='interests_submit_btn' />
        </div>
    )
}
