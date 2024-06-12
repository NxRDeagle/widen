import React, { useState, useContext } from "react";
import './scss/event_filter.scss';

import CategoryList from "./components/components";
import { mainContext } from "../../App"
import { Conversion, getBoolCountFilter, getCountAllCategoryFilter } from "../../global_function/function";

/**Компонент глобального фильтра, передаётся таблица, где находится массив объектов, где ключ код колонки, а значение это объект из названия
колонки и массив значений фильтра
ПРИМЕР:
[
    {
        name: 'Город',
        code: 'cities',
        value: ['Пермь', 'Тамбов', ....]
    }
]

ВАЖНО!!! ВСЕ ЭЛМЕНТЫ НОВОСТНОЙ ЛЕНТЫ ДОЛЖНЫ СОДЕРЖАТЬ ПОЛЕ С КОДОМ например city, чтобы фильтровать!!!
**/
export default function EventFilter({ table = [] }) {
    //Сам фильтр
    const [filterOpen, setFilterOpen] = useState(false);
    //Категория фильтра(по коду)
    const [categoryOpen, setCategoryOpen] = useState('');

    const { clearGlobalFilter, globalFilter, addGlobalFilter, dropGlobalFilter } = useContext(mainContext);

    //Функция открытия фильтра определённой категории по фильтру!!!
    function openCategory(code = '') {
        setCategoryOpen(categoryOpen === code ? '' : code);
    };

    //Функция выбора фильтра в категории
    function handleChooseTag(e, value, code) {
        if (e.target.checked) {
            if (globalFilter[code]) {
                addGlobalFilter(code, value)
            } else {
                globalFilter[code] = [];
                addGlobalFilter(code, value)
            }
        } else {
            dropGlobalFilter(code, value);
        }
    };

    //Функция сброса фильра
    function handleClear() {
        setCategoryOpen('');
        setFilterOpen(false);
        clearGlobalFilter();
    }

    return (
        <>
            <div className="event-filter-box">
                <div
                    className="event-filter-box__open-btn"
                    onClick={() => {
                        setFilterOpen(!filterOpen);
                    }}
                >
                    <svg
                        width="20"
                        height="15"
                        viewBox="0 0 20 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 3.5H5M5 3.5C5 4.33333 5.5 6 7.5 6C9.5 6 10 4.33333 10 3.5M5 3.5C5 2.66667 5.5 1 7.5 1C9.5 1 10 2.66667 10 3.5M10 3.5H20"
                            stroke="black"
                        />
                        <path
                            d="M20 11.5L15 11.5M15 11.5C15 10.6667 14.5 9 12.5 9C10.5 9 10 10.6667 10 11.5M15 11.5C15 12.3333 14.5 14 12.5 14C10.5 14 10 12.3333 10 11.5M10 11.5L0 11.5"
                            stroke="black"
                        />
                    </svg>
                    <p className="event-filter-box__caption">Отфильтровать</p>
                    <div className={filterOpen ?
                        getBoolCountFilter(globalFilter) ? 'triangle_left triangle_bottom triangle_active'
                            : 'triangle_left triangle_bottom triangle_none-active'
                        : getBoolCountFilter(globalFilter) ? 'triangle_left triangle_active'
                            : 'triangle_left triangle_none-active'}
                    />

                    {getBoolCountFilter(globalFilter)
                        && <p className="event-filter-box__count">{Conversion('hundredPlus', getCountAllCategoryFilter(globalFilter))}</p>
                    }
                </div>
            </div>
            <ul className={filterOpen ? "event-filter_list event-filter_list__open" : "event-filter_list event-filter_list__close"}>
                {
                    table.map((column, idx) => {
                        return (
                            <CategoryList
                                globalFilter={globalFilter}
                                onChoose={handleChooseTag}
                                key={idx}
                                dataSet={column.value}
                                categoryOpen={categoryOpen}
                                code={column.code}
                                onChange={openCategory}
                            >
                                {column.name}
                            </CategoryList>
                        )
                    })
                }
                <li className="event-filter_list_btn-box">
                    <button onClick={handleClear} className="event-filter_list_btn-box__clear">Сбросить фильтры</button>
                    <button className="event-filter_list_btn-box__save">Готово</button>
                </li>
            </ul>
        </>
    )



}