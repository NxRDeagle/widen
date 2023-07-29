import React from 'react';

import interest_data from '../data/interest_data.json';
import cities from '../data/russian-cities.json';

import '../css/Search.css';

const Filters = ({ isFiltersOpen, setIsFiltersOpen }) => {
  const forms = ['Платная', 'Бесплатная', 'Волонтерство'];
  const format = ['Онлайн', 'Офлайн'];

  const [openedCategories, setOpenedCategories] = React.useState([]);
  const [selectedFilters, setSelectedFilters] = React.useState({
    direction: [],
    forma: [],
    format: [],
    city: [],
  });

  const onClickCategory = (cat) => {
    if (openedCategories.includes(cat))
      setOpenedCategories(
        openedCategories.filter((obj) => {
          return obj !== cat;
        }),
      );
    else setOpenedCategories([...openedCategories, cat]);
  };

  const [inputStates, setInputStates] = React.useState({
    direction: '',
    city: '',
  });

  const handleChange = (e) => {
    setInputStates({
      ...inputStates,
      [e.target.name]: e.target.value,
    });
  };

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
          {selectedFilters.city.length +
            selectedFilters.direction.length +
            selectedFilters.forma.length +
            selectedFilters.format.length >
            0 >
            0 && (
            <p className="count_filters" id="count_filters_main">
              {selectedFilters.city.length +
                selectedFilters.direction.length +
                selectedFilters.forma.length +
                selectedFilters.format.length}
            </p>
          )}
          {isFiltersOpen ? (
            selectedFilters.city.length +
              selectedFilters.direction.length +
              selectedFilters.forma.length +
              selectedFilters.format.length >
            0 ? (
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z" fill="#7E52EE" />
              </svg>
            ) : (
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z" fill="#BABABA" />
              </svg>
            )
          ) : selectedFilters.city.length +
              selectedFilters.direction.length +
              selectedFilters.forma.length +
              selectedFilters.format.length >
            0 ? (
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                fill="#7E52EE"
              />
            </svg>
          ) : (
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                fill="#BABABA"
              />
            </svg>
          )}
        </div>
      </div>
      {isFiltersOpen && (
        <div className="filters_list">
          <div className="filters_element">
            <div className="filters_top">
              <div className="filter_name_container">
                {openedCategories.includes(1) && (
                  <input
                    onChange={handleChange}
                    className="filter_input"
                    maxLength={10}
                    type="text"
                    name="direction"
                    value={inputStates.direction}
                    placeholder="поиск..."
                  />
                )}
                <p
                  className={
                    openedCategories.includes(1) ? 'filter_name selected_text' : 'filter_name'
                  }
                  onClick={() => onClickCategory(1)}>
                  Направление
                </p>
              </div>
              {openedCategories.includes(1) ? (
                selectedFilters.direction.length > 0 ? (
                  <svg
                    onClick={() => onClickCategory(1)}
                    className="triangleBottomColor"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      onClick={() => onClickCategory(1)}
                      d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z"
                      fill="#7E52EE"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() => onClickCategory(1)}
                    className="triangleBottom"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      onClick={() => onClickCategory(1)}
                      d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z"
                      fill="#BABABA"
                    />
                  </svg>
                )
              ) : selectedFilters.direction.length > 0 ? (
                <svg
                  onClick={() => onClickCategory(1)}
                  className="triangleLeftColor"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    onClick={() => onClickCategory(1)}
                    d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                    fill="#7E52EE"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => onClickCategory(1)}
                  className="triangleLeft"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    onClick={() => onClickCategory(1)}
                    d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                    fill="#BABABA"
                  />
                </svg>
              )}
              {selectedFilters.direction.length > 0 && (
                <p className="count_filters" onClick={() => onClickCategory(1)}>
                  {selectedFilters.direction.length}
                </p>
              )}
            </div>
            {openedCategories.includes(1) && (
              <div
                className={
                  inputStates.direction.length > 0 ? 'filter_opened filter_fit' : 'filter_opened'
                }
                id="filter_direction">
                <ul className="direction_list" id="dir_list">
                  {interest_data
                    .filter((item) =>
                      item.name.toLowerCase().includes(inputStates.direction.toLowerCase()),
                    )
                    .map((el, idx) => {
                      return (
                        <li key={idx} className="list_el">
                          <p className="list_el_sign">{el.name}</p>
                          {selectedFilters.direction.includes(idx) ? (
                            <svg
                              onClick={() => {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  direction: selectedFilters.direction.filter((obj) => {
                                    return obj !== idx;
                                  }),
                                });
                              }}
                              className="filter_checkbox check_selected"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                onClick={() => {
                                  setSelectedFilters({
                                    ...selectedFilters,
                                    direction: selectedFilters.direction.filter((obj) => {
                                      return obj !== idx;
                                    }),
                                  });
                                }}
                                d="M0.5 15.5V0.5H15.5V15.5H0.5Z"
                                fill="#7E52EE"
                                stroke="#7E52EE"
                              />
                            </svg>
                          ) : (
                            <svg
                              onClick={() => {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  direction: [...selectedFilters.direction, idx],
                                });
                              }}
                              className="filter_checkbox check_unselected"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                onClick={() => {
                                  setSelectedFilters({
                                    ...selectedFilters,
                                    direction: [...selectedFilters.direction, idx],
                                  });
                                }}
                                d="M0.5 15.5V0.5H15.5V15.5H0.5Z"
                                stroke="#BABABA"
                              />
                            </svg>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
          <div className="filters_element">
            <div className="filters_top">
              <div className="filter_name_container">
                {openedCategories.includes(2) && (
                  <svg
                    className="vertical_line"
                    width="1"
                    height="14"
                    viewBox="0 0 1 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 0.978516V13.0201" stroke="black" strokeWidth="0.5" />
                  </svg>
                )}
                <p
                  className={
                    openedCategories.includes(2) ? 'filter_name selected_text' : 'filter_name'
                  }
                  onClick={() => onClickCategory(2)}>
                  Форма участия
                </p>
              </div>
              {openedCategories.includes(2) ? (
                selectedFilters.forma.length > 0 ? (
                  <svg
                    onClick={() => onClickCategory(2)}
                    className="triangleBottomColor"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      onClick={() => onClickCategory(2)}
                      d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z"
                      fill="#7E52EE"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() => onClickCategory(2)}
                    className="triangleBottom"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      onClick={() => onClickCategory(2)}
                      d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z"
                      fill="#BABABA"
                    />
                  </svg>
                )
              ) : selectedFilters.forma.length > 0 ? (
                <svg
                  onClick={() => onClickCategory(2)}
                  className="triangleLeftColor"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    onClick={() => onClickCategory(2)}
                    d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                    fill="#7E52EE"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => onClickCategory(2)}
                  className="triangleLeft"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    onClick={() => onClickCategory(2)}
                    d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                    fill="#BABABA"
                  />
                </svg>
              )}
              {selectedFilters.forma.length > 0 && (
                <p className="count_filters" onClick={() => onClickCategory(2)}>
                  {selectedFilters.forma.length}
                </p>
              )}
            </div>
            {openedCategories.includes(2) && (
              <div className="filter_opened" id="filter_form">
                <ul className="direction_list">
                  {forms.map((el, idx) => {
                    return (
                      <li key={idx} className="list_el">
                        <p className="list_el_sign">{el}</p>
                        {selectedFilters.forma.includes(idx) ? (
                          <svg
                            onClick={() => {
                              setSelectedFilters({
                                ...selectedFilters,
                                forma: selectedFilters.forma.filter((obj) => {
                                  return obj !== idx;
                                }),
                              });
                            }}
                            className="filter_checkbox check_selected"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              onClick={() => {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  forma: selectedFilters.forma.filter((obj) => {
                                    return obj !== idx;
                                  }),
                                });
                              }}
                              d="M0.5 15.5V0.5H15.5V15.5H0.5Z"
                              fill="#7E52EE"
                              stroke="#7E52EE"
                            />
                          </svg>
                        ) : (
                          <svg
                            onClick={() => {
                              setSelectedFilters({
                                ...selectedFilters,
                                forma: [...selectedFilters.forma, idx],
                              });
                            }}
                            className="filter_checkbox check_unselected"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              onClick={() => {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  forma: [...selectedFilters.forma, idx],
                                });
                              }}
                              d="M0.5 15.5V0.5H15.5V15.5H0.5Z"
                              stroke="#BABABA"
                            />
                          </svg>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="filters_element">
            <div className="filters_top">
              <div className="filter_name_container">
                {openedCategories.includes(3) && (
                  <svg
                    className="vertical_line"
                    width="1"
                    height="14"
                    viewBox="0 0 1 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 0.978516V13.0201" stroke="black" strokeWidth="0.5" />
                  </svg>
                )}
                <p
                  className={
                    openedCategories.includes(3) ? 'filter_name selected_text' : 'filter_name'
                  }
                  onClick={() => onClickCategory(3)}>
                  Формат
                </p>
              </div>
              {openedCategories.includes(3) ? (
                selectedFilters.format.length > 0 ? (
                  <svg
                    onClick={() => onClickCategory(3)}
                    className="triangleBottomColor"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      onClick={() => onClickCategory(3)}
                      d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z"
                      fill="#7E52EE"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() => onClickCategory(3)}
                    className="triangleBottom"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      onClick={() => onClickCategory(3)}
                      d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z"
                      fill="#BABABA"
                    />
                  </svg>
                )
              ) : selectedFilters.format.length > 0 ? (
                <svg
                  onClick={() => onClickCategory(3)}
                  className="triangleLeftColor"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    onClick={() => onClickCategory(3)}
                    d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                    fill="#7E52EE"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => onClickCategory(3)}
                  className="triangleLeft"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    onClick={() => onClickCategory(3)}
                    d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                    fill="#BABABA"
                  />
                </svg>
              )}
              {selectedFilters.format.length > 0 && (
                <p className="count_filters" onClick={() => onClickCategory(3)}>
                  {selectedFilters.format.length}
                </p>
              )}
            </div>
            {openedCategories.includes(3) && (
              <div className="filter_opened " id="filter_format">
                <ul className="direction_list">
                  {format.map((el, idx) => {
                    return (
                      <li key={idx} className="list_el">
                        <p className="list_el_sign">{el}</p>
                        {selectedFilters.format.includes(idx) ? (
                          <svg
                            onClick={() => {
                              setSelectedFilters({
                                ...selectedFilters,
                                format: selectedFilters.format.filter((obj) => {
                                  return obj !== idx;
                                }),
                              });
                            }}
                            className="filter_checkbox check_selected"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              onClick={() => {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  format: selectedFilters.format.filter((obj) => {
                                    return obj !== idx;
                                  }),
                                });
                              }}
                              d="M0.5 15.5V0.5H15.5V15.5H0.5Z"
                              fill="#7E52EE"
                              stroke="#7E52EE"
                            />
                          </svg>
                        ) : (
                          <svg
                            onClick={() => {
                              setSelectedFilters({
                                ...selectedFilters,
                                format: [...selectedFilters.format, idx],
                              });
                            }}
                            className="filter_checkbox check_unselected"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              onClick={() => {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  format: [...selectedFilters.format, idx],
                                });
                              }}
                              d="M0.5 15.5V0.5H15.5V15.5H0.5Z"
                              stroke="#BABABA"
                            />
                          </svg>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="filters_element">
            <div className="filters_top">
              <div className="filter_name_container">
                {openedCategories.includes(4) && (
                  <input
                    onChange={handleChange}
                    className="filter_input"
                    maxLength={10}
                    type="text"
                    name="city"
                    value={inputStates.city}
                    placeholder="поиск..."
                  />
                )}
                <p
                  className={
                    openedCategories.includes(4) ? 'filter_name selected_text' : 'filter_name'
                  }
                  onClick={() => onClickCategory(4)}>
                  Город
                </p>
              </div>
              {openedCategories.includes(4) ? (
                selectedFilters.city.length > 0 ? (
                  <svg
                    onClick={() => onClickCategory(4)}
                    className="triangleBottomColor"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      onClick={() => onClickCategory(4)}
                      d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z"
                      fill="#7E52EE"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() => onClickCategory(4)}
                    className="triangleBottom"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      onClick={() => onClickCategory(4)}
                      d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z"
                      fill="#BABABA"
                    />
                  </svg>
                )
              ) : selectedFilters.city.length > 0 ? (
                <svg
                  onClick={() => onClickCategory(4)}
                  className="triangleLeftColor"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    onClick={() => onClickCategory(4)}
                    d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                    fill="#7E52EE"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => onClickCategory(4)}
                  className="triangleLeft"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    onClick={() => onClickCategory(4)}
                    d="M0.0351563 6.52344L11.2852 0.0282469V13.0186L0.0351563 6.52344Z"
                    fill="#BABABA"
                  />
                </svg>
              )}
              {selectedFilters.city.length > 0 && (
                <p className="count_filters" onClick={() => onClickCategory(4)}>
                  {selectedFilters.city.length}
                </p>
              )}
            </div>
            {openedCategories.includes(4) && (
              <div
                className={
                  inputStates.city.length > 0 ? 'filter_opened filter_fit' : 'filter_opened'
                }
                id="filter_cities">
                <ul className="direction_list">
                  {cities
                    .filter((item) =>
                      item.name.toLowerCase().includes(inputStates.city.toLowerCase()),
                    )
                    .map((el, idx) => {
                      return (
                        <li key={idx} className="list_el">
                          <p className="list_el_sign">{el.name}</p>
                          {selectedFilters.city.includes(idx) ? (
                            <svg
                              onClick={() => {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  city: selectedFilters.city.filter((obj) => {
                                    return obj !== idx;
                                  }),
                                });
                              }}
                              className="filter_checkbox check_selected"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                onClick={() => {
                                  setSelectedFilters({
                                    ...selectedFilters,
                                    city: selectedFilters.city.filter((obj) => {
                                      return obj !== idx;
                                    }),
                                  });
                                }}
                                d="M0.5 15.5V0.5H15.5V15.5H0.5Z"
                                fill="#7E52EE"
                                stroke="#7E52EE"
                              />
                            </svg>
                          ) : (
                            <svg
                              onClick={() => {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  city: [...selectedFilters.city, idx],
                                });
                              }}
                              className="filter_checkbox check_unselected"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                onClick={() => {
                                  setSelectedFilters({
                                    ...selectedFilters,
                                    city: [...selectedFilters.city, idx],
                                  });
                                }}
                                d="M0.5 15.5V0.5H15.5V15.5H0.5Z"
                                stroke="#BABABA"
                              />
                            </svg>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
          <div className="filters_down">
            <button
              className="btn_reset"
              onClick={() => {
                setSelectedFilters({
                  direction: [],
                  forma: [],
                  format: [],
                  city: [],
                });
                setInputStates({
                  direction: '',
                  city: '',
                });
              }}>
              Сбросить фильтры
            </button>
            <button
              className="btn_ready"
              onClick={() => {
                setIsFiltersOpen(false);
              }}>
              Готово
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;
