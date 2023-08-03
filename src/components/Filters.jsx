import React from 'react';

import interest_data from '../data/interest_data.json';
import rcities from '../data/russian-cities.json';

import { mainContext } from '../App';

import '../css/Search.css';

const Filters = ({ isFiltersOpen, setIsFiltersOpen }) => {

    const {dropGlobalFilters, dropGlobalFilter, globalFilters, addGlobalFilter} = React.useContext(mainContext);

    const forms = ['Платная', 'Бесплатная', 'Волонтерство'];
    const formats = ['Онлайн', 'Офлайн'];
    const tags = interest_data.map((item) => { return item.name });
    const cities = rcities.map((item) => { return item.name });

    const [openedCategories, setOpenedCategories] = React.useState([]);

    const [inputStates, setInputStates] = React.useState({
        tag: '',
        form: '',
        format: '',
        city: '',
    });

    const onClickCategory = (category) => {
        openedCategories.includes(category) ?
            setOpenedCategories(openedCategories.filter((obj) => { return obj !== category }))
            : setOpenedCategories([...openedCategories, category]);
    };

    const handleChange = (e) => {
        console.log(e.target.value)
        setInputStates({
            ...inputStates,
            [e.target.name]: e.target.value,
        });
    };

    const AllCountFilters = (globalFilters) => {
        let length = 0;
        for (const key in globalFilters) {
            length += globalFilters[key].length;
        }
        return length;
    };

    const clearEventFilters = () =>{
        setInputStates({
            tag: '',
            form: '',
            format: '',
            city: ''
        });
        dropGlobalFilters();
    };

    const clickCategoryItem = (active, categoryItemSign, category) =>{
        active ? dropGlobalFilter(category, categoryItemSign) : addGlobalFilter(category, categoryItemSign);
    };

    const RenderCategory = (category, categorySign, categoryFilters, inputFilter, categoryList) => {
        return (
            <div className="filters_element">
                <div className="filters_top">
                    <div className="filter_name_container">
                        {openedCategories.includes(category) ? (
                            <input
                                onChange={(e) => {handleChange(e)}}
                                className="filter_input"
                                maxLength={10}
                                type="text"
                                name={category}
                                value={inputFilter}
                                placeholder={"|" + categorySign}
                            />
                        ) :
                            <p className='filter_name' onClick={() => onClickCategory(category)}>{categorySign}</p>
                        }
                    </div>
                    {openedCategories.includes(category) ?
                        <svg
                            onClick={() => onClickCategory(category)}
                            className="triangleBottomColor"
                            width="13"
                            height="12"
                            viewBox="0 0 13 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                onClick={() => onClickCategory(category)}
                                d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z"
                                fill={categoryFilters.length > 0 ? "#7E52EE" : "#BABABA"}
                            />
                        </svg>
                        :
                        <svg
                            onClick={() => onClickCategory(category)}
                            className="triangleLeftColor"
                            width="12"
                            height="14"
                            viewBox="0 0 12 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                onClick={() => onClickCategory(category)}
                                d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                                fill={categoryFilters.length > 0 ? "#7E52EE" : "#BABABA"}
                            />
                        </svg>
                    }
                    {categoryFilters.length > 0 && (
                        <p className="count_filters" style={{ right: '10px' }} onClick={() => onClickCategory(category)}>{categoryFilters.length}</p>
                    )}
                </div>
                {openedCategories.includes(category) && (
                    <div
                        className={
                            inputFilter.length > 0 ? 'filter_opened filter_fit' : 'filter_opened'
                        }
                        id={"filter_" + category}>
                        <ul className="direction_list" id="dir_list">
                            {categoryList
                                .filter((item) =>
                                    item.toLowerCase().includes(inputFilter.toLowerCase()),
                                )
                                .map((el, idx) => {
                                    return (
                                        <li onClick={() => {clickCategoryItem(categoryFilters.includes(el), el, category)}} key={idx} className="list_el">
                                            <p className="list_el_sign">{el}</p>
                                            <svg
                                                className={categoryFilters.includes(el) ? "filter_checkbox check_selected" : "filter_checkbox check_unselected"}
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0.5 15.5V0.5H15.5V15.5H0.5Z"
                                                    fill={categoryFilters.includes(el) ? "#7E52EE" : "none"}
                                                    stroke={categoryFilters.includes(el) ? "#7E52EE" : "#BABABA"}
                                                />
                                            </svg>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                )}
            </div>
        );
    }

    return (
        <>
            <div className="filter_container">
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
                    {AllCountFilters(globalFilters) >
                        0 && (
                            <p className="count_filters" id="count_filters_main"> {AllCountFilters(globalFilters)}</p>
                        )}
                    {
                        isFiltersOpen ? (
                            <svg
                                width="13"
                                height="12"
                                viewBox="0 0 13 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z" fill={AllCountFilters(globalFilters) ? "#7E52EE" : "#BABABA"} />
                            </svg>
                        )
                            :
                            (
                                <svg
                                    width="12"
                                    height="14"
                                    viewBox="0 0 12 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                                        fill={AllCountFilters(globalFilters) ? "#7E52EE" : "#BABABA"}
                                    />
                                </svg>
                            )
                    }
                </div>
            </div>
            {isFiltersOpen && (
                <div className="filters_list">
                    {RenderCategory('tag', 'Направление', globalFilters.tags, inputStates.tag, tags)}
                    {RenderCategory('form', 'Форма участия', globalFilters.forms, inputStates.form, forms)}
                    {RenderCategory('format', 'Формат', globalFilters.formats, inputStates.format, formats)}
                    {RenderCategory('city', 'Город', globalFilters.cities, inputStates.city, cities)}
                    <div className="filters_down">
                        <button className="btn_reset" onClick={() => {clearEventFilters();}}>Сбросить фильтры</button>
                        <button className="btn_ready" onClick={() => {setIsFiltersOpen(false);}}>Готово</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Filters;