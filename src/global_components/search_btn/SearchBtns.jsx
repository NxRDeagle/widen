import { Conversion } from "../../global_function/function"

import "./scss/search_btn.scss";

/**
 * 
 * Функция, которая отрисовывает все кнопки выбора например, выбор вкладок (Заказчики, Коллеги и т.д.)
 * dataSet должен быть следующего вида
 * dataSet = [
 *    {
 *      code: "Коллеги",
 *      name: "Коллеги",
 *      count: 20 --- Это поле опционально, но оно должно быть у всех, даже где подсчёт не требуется, просто должен стоять 0, тогда не отрисуется кол-во
 *    }
 * ]
 */

export default function SearchBtns({ dataSet, onClick, state }) {
    return (
        <div onClick={onClick} className='search-btn-container'>
            <div className="search-btn-container_btn-box">
                {
                    dataSet.map((d, idx) => {
                        return (
                            <button name={d.code} key={idx} className={`search-btn-container_btn-box__btn btn--${state === d.code ? 'active' : 'none-active'}`}>
                                {d.name}
                                {
                                    d.count > 0 &&
                                    <div className={`search-btn-container_btn-box__btn__count count--${state === d.code ? 'active' : 'none-active'}`}>
                                        {Conversion('hundredPlus', d.count)}
                                    </div>
                                }
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}