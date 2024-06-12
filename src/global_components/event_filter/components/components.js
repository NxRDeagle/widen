import { Conversion } from "../../../global_function/function"

import React, { useState, useCallback } from "react"

//Компонент с одним чекбоксом в списке одной категории
function CategoryListChooseItem({ code, value, checked, onChange }) {
    return (
        <li className="event-filter_list_category-box_list_item-box">
            <p className="event-filter_list_category-box_list_item-box__label">{value}</p>
            <input onChange={(e) => onChange(e, value, code)} checked={checked} className="event-filter_list_category-box_list_item-box__choose" type="checkbox" />
        </li>
    )
}

//Компонент, отвечающий за список ОДНОЙ КАТЕГОРИИ
export default function CategoryList({ globalFilter, onChoose, children, dataSet = [], categoryOpen, code, onChange }) {

    //Стейт для фильтрации по вводу поля
    const [searchText, setSearchText] = useState('');

    //Функция фильтрации
    const handleChange = useCallback((e) => {
        setSearchText(e.target.value);
    }, [])

    return (
        <li className="event-filter_list_category-box">
            <div className="event-filter_list_category-box__head">
                {
                    categoryOpen === code ?
                        <input onChange={handleChange} placeholder={`| ${children}`} type="text" className="event-filter_list_category-box__head__search" />
                        :
                        <label className="event-filter_list_category-box__head__category">{children}</label>
                }
                <div onClick={() => onChange(code)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div className={categoryOpen === code ?
                        globalFilter[code]?.length ? 'triangle_left triangle_bottom triangle_active'
                            : 'triangle_left triangle_bottom triangle_none-active'
                        : globalFilter[code]?.length ? 'triangle_left triangle_active'
                            : 'triangle_left triangle_none-active'}
                    />
                    {
                        globalFilter[code] && <p className="event-filter_list_category-box__head__count">{Conversion('hundredPlus', globalFilter[code].length)}</p>
                    }
                </div>
            </div>
            <ul className={categoryOpen === code ? "event-filter_list_category-box_list event-filter_list_category-box_list__open"
                : "event-filter_list_category-box_list event-filter_list_category-box_list__close"}
            >
                {
                    dataSet
                        .filter(d => d.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                        .map((d, idx) => {
                            return (
                                <CategoryListChooseItem key={idx} code={code} value={d} checked={globalFilter[code]?.includes(d)} onChange={onChoose} />
                            )
                        })
                }
            </ul>
        </li>
    )
}