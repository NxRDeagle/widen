import { useContext } from "react"

import { mainContext } from "../../../App"


//Глобальные теги в поиске
export const GlobalTags = ({ onClick, children }) => {
    return (
        <div onClick={onClick} className='global_tag_box'>
            <p className='global_tag'>{children}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.3642 4.62983L4.62977 11.3643C4.39968 11.5944 4.01806 11.5944 3.78797 11.3643C3.55787 11.1342 3.55787 10.7526 3.78797 10.5225L10.5224 3.78803C10.7525 3.55794 11.1341 3.55794 11.3642 3.78803C11.5943 4.01812 11.5943 4.39974 11.3642 4.62983Z" fill="white" />
                <path d="M11.3642 11.3643C11.1341 11.5944 10.7525 11.5944 10.5224 11.3643L3.78797 4.62989C3.55787 4.39979 3.55787 4.01818 3.78797 3.78808C4.01806 3.55799 4.39968 3.55799 4.62977 3.78808L11.3642 10.5225C11.5943 10.7526 11.5943 11.1342 11.3642 11.3643Z" fill="white" />
            </svg>
        </div>
    )
}

//Кнопка перехода по категории в поисковике
export const CategoryBtn = ({ category, children }) => {

    const { activeGlobalSearch, setActiveGlobalSearch } = useContext(mainContext);

    return (
        <button
            className={activeGlobalSearch === category ? 'search_category_btn active_btn' : 'search_category_btn'}
            onClick={() => {
                setActiveGlobalSearch(category);
            }}>
            <p className="search_btn_sign">{children}</p>
        </button>
    )
}

//Компонент пользователя в глобальном поиске
export const GlobalStar = ({ avatar, nickname, role, onClick }) => {
    return (
        <div className="star_box">
            <img loading='lazy' onClick={onClick} className='star_avatar' src={avatar} alt='avatar' />
            <p className='star_nickname'>{nickname}</p>
            <p className='star_role'>{role}</p>
        </div>
    )
}

