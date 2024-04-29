import { useContext, useState } from "react"

import { mainContext } from "../../../App"

import interest_data from '../../../data/interest_data.json';
import rcities from '../../../data/russian-cities.json';

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

//Категория в фильтре мероприятия
const EventCategoryFilter = ({ category,
    children,
    onClickCategory,
    handleChange,
    openedCategories,
    categoryFilters,
    inputFilter,
    categoryList,
    clickCategoryItem }) => {
    return (
        <div className="filters_element">
            <div className="filters_top">
                <div className="filter_name_container">
                    {openedCategories === category ? (
                        <input
                            onChange={(e) => { handleChange(e) }}
                            className="filter_input"
                            maxLength={20}
                            type="text"
                            name={category}
                            value={inputFilter}
                            placeholder={"|" + children}
                        />
                    ) :
                        <p className='filter_name' onClick={() => onClickCategory(category)}>{children}</p>
                    }
                </div>

                <div className={openedCategories === category ?
                    categoryFilters.length > 0 ? 'triangle_left triangle_bottom triangle_active'
                        : 'triangle_left triangle_bottom triangle_none_active'
                    : categoryFilters.length > 0 ? 'triangle_left triangle_active'
                        : 'triangle_left triangle_none_active'}
                    onClick={() => onClickCategory(category)}
                >
                </div>

                {categoryFilters.length > 0 && (
                    <p style={{ right: '50px' }} className="count_filters" onClick={() => onClickCategory(category)}>{categoryFilters.length}</p>
                )}
            </div>
            <div
                className={openedCategories === category ?
                    inputFilter.length > 0 ? `filter_opened filter_${category} filter_fit`
                        : `filter_opened filter_${category}`
                    : 'filter_opened'}>
                <ul className="direction_list" id="dir_list">
                    {categoryList
                        .filter((item) =>
                            item.toLowerCase().includes(inputFilter.toLowerCase()),
                        )
                        .map((el, idx) => {
                            return (
                                <li key={idx} className="list_el">
                                    <p className="list_el_sign">{el}</p>
                                    <input onClick={(e) => clickCategoryItem(e.target.checked, el, category)} type="checkbox" className="filter_checkbox" />
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

//Компонент фильтра для мероприятий
export const EventFilter = ({ isFiltersOpen, setIsFiltersOpen }) => {

    const { dropGlobalFilters, dropGlobalFilter, globalFilters, addGlobalFilter } = useContext(mainContext);

    //Константы(выбор фильтров для всех категорий)
    const forms = ['Платная', 'Бесплатная', 'Волонтерство'];
    const formats = ['Онлайн', 'Офлайн'];
    const tags = interest_data.map((item) => { return item.name });
    const cities = rcities.map((item) => { return item.name });

    //Выбор категории фильтра
    const [openedCategories, setOpenedCategories] = useState('');

    //Фильтрация ввода в поле категории
    const [inputStates, setInputStates] = useState({
        tag: '',
        form: '',
        format: '',
        city: '',
    });

    //Открытие фильтра определённой категории
    const onClickCategory = (category) => {
        openedCategories === category ?
            setOpenedCategories('')
            : setOpenedCategories(category);
    };

    //Заполнение нужного стейта ввода по полю
    const handleChange = (e) => {
        setInputStates({
            ...inputStates,
            [e.target.name]: e.target.value,
        });
    };

    //Подсчёт общего кол-ва выбранных фильтров
    const AllCountFilters = (globalFilters) => {
        let length = 0;
        for (const key in globalFilters) {
            length += globalFilters[key].length;
        }
        return length;
    };

    //Сброс всех фильтров
    const clearEventFilters = () => {
        setInputStates({
            tag: '',
            form: '',
            format: '',
            city: ''
        });
        dropGlobalFilters();
    };

    //Нажатие на чекбокс для каждой категории
    const clickCategoryItem = (active, categoryItemSign, category) => {
        active ? addGlobalFilter(category, categoryItemSign) : dropGlobalFilter(category, categoryItemSign);
    };

    return (
        <>
            <div className="filter_box">
                <div
                    className="filter_button"
                    onClick={() => {
                        setIsFiltersOpen(!isFiltersOpen);
                    }}>
                    <svg
                        className="filters_icon"
                        width="20"
                        height="15"
                        viewBox="0 0 20 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            className="filters_icon"
                            d="M0 3.5H5M5 3.5C5 4.33333 5.5 6 7.5 6C9.5 6 10 4.33333 10 3.5M5 3.5C5 2.66667 5.5 1 7.5 1C9.5 1 10 2.66667 10 3.5M10 3.5H20"
                            stroke="black"
                        />
                        <path
                            className="filters_icon"
                            d="M20 11.5L15 11.5M15 11.5C15 10.6667 14.5 9 12.5 9C10.5 9 10 10.6667 10 11.5M15 11.5C15 12.3333 14.5 14 12.5 14C10.5 14 10 12.3333 10 11.5M10 11.5L0 11.5"
                            stroke="black"
                        />
                    </svg>
                    <p className="filter_sign">Отфильтровать</p>

                    {AllCountFilters(globalFilters) > 0
                        && <p className="count_filters" id="count_filters_main"> {AllCountFilters(globalFilters)}</p>
                    }
                    <div className={isFiltersOpen ?
                        AllCountFilters(globalFilters) ? 'triangle_left triangle_bottom triangle_active'
                            : 'triangle_left triangle_bottom triangle_none_active'
                        : AllCountFilters(globalFilters) ? 'triangle_left triangle_active'
                            : 'triangle_left triangle_none_active'}
                    >
                    </div>
                </div>
            </div>

            <div className={isFiltersOpen ?
                openedCategories.length > 0 ?
                    'filters_list filters_list_open filter_fit'
                    : 'filters_list filters_list_open'
                : 'filters_list'}
            >
                <EventCategoryFilter
                    category='tag'
                    onClickCategory={onClickCategory}
                    handleChange={handleChange}
                    openedCategories={openedCategories}
                    categoryFilters={globalFilters.tags}
                    inputFilter={inputStates.tag}
                    categoryList={tags}
                    clickCategoryItem={clickCategoryItem}
                >
                    Направление
                </EventCategoryFilter>
                <EventCategoryFilter
                    category='form'
                    onClickCategory={onClickCategory}
                    handleChange={handleChange}
                    openedCategories={openedCategories}
                    categoryFilters={globalFilters.forms}
                    inputFilter={inputStates.form}
                    categoryList={forms}
                    clickCategoryItem={clickCategoryItem}
                >
                    Форма участия
                </EventCategoryFilter>
                <EventCategoryFilter
                    category='format'
                    onClickCategory={onClickCategory}
                    handleChange={handleChange}
                    openedCategories={openedCategories}
                    categoryFilters={globalFilters.formats}
                    inputFilter={inputStates.format}
                    categoryList={formats}
                    clickCategoryItem={clickCategoryItem}
                >
                    Формат
                </EventCategoryFilter>
                <EventCategoryFilter
                    category='city'
                    onClickCategory={onClickCategory}
                    handleChange={handleChange}
                    openedCategories={openedCategories}
                    categoryFilters={globalFilters.cities}
                    inputFilter={inputStates.city}
                    categoryList={cities}
                    clickCategoryItem={clickCategoryItem}
                >
                    Город
                </EventCategoryFilter>
                <div className="filters_down">
                    <button className="btn_reset" onClick={() => { clearEventFilters(); }}>Сбросить фильтры</button>
                    <button className="btn_ready" onClick={() => { setIsFiltersOpen(false); }}>Готово</button>
                </div>
            </div>
        </>
    )
}