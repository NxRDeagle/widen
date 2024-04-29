import { Link } from 'react-router-dom';

//Компонент фильтра новостной ленты
export const HeaderFilter = ({ className, onClick }) => {
    return (
        <ul
            onClick={onClick}
            className={className}
        >
            <li name='case' className='filter_newsware_item'>Кейсы</li>
            <li name='post' className='filter_newsware_item'>Посты</li>
            <li name='event' className='filter_newsware_item'>Мероприятия</li>
            <li name='all' className='filter_newsware_item'>Всё вместе</li>
        </ul>
    )
}

//Компонент Шапки главной страницы
export const Header = ({ onClick, className }) => {
    return (
        <header className="header_box">
            <div onClick={onClick} className="logo_box">
                <h1 className='logo_sign'>Fllupps</h1>
                <div className={className}>
                    <span className='arrow_right'></span>
                    <span className='arrow_left'></span>
                </div>
            </div>
            <Link className="head_search" to="/search">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M13.4098 13.1724L18.619 18.4326H18.6159L19.4625 19.2844L19.4632 19.285C19.5123 19.3345 19.5121 19.415 19.4636 19.464C19.4159 19.5119 19.339 19.512 19.2912 19.4643C19.2911 19.4642 19.291 19.4641 19.2909 19.464L13.2477 13.3607L12.9173 13.027L12.5636 13.3358C11.2834 14.4532 9.61436 15.1299 7.78658 15.1299C3.76406 15.1299 0.5 11.8566 0.5 7.81497C0.5 3.77334 3.76406 0.5 7.78658 0.5C11.8091 0.5 15.0732 3.77334 15.0732 7.81497C15.0732 9.59878 14.437 11.2312 13.3807 12.5008L13.0904 12.8499L13.4098 13.1724ZM0.735574 7.81497C0.735574 11.7205 3.89077 14.8899 7.78658 14.8899C11.6824 14.8899 14.8376 11.7205 14.8376 7.81497C14.8376 3.9094 11.6824 0.740079 7.78658 0.740079C3.89077 0.740079 0.735574 3.9094 0.735574 7.81497Z" fill="black" stroke="black" />
                </svg>
            </Link>
        </header>
    )
}