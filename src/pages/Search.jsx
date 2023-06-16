import React from 'react';
import ContentLoader from 'react-content-loader';

import Footer from '../components/Footer';
import CaseCard from '../components/CaseCard';
import PostCard from '../components/PostCard';
import EventCard from '../components/EventCard';
import Star from '../components/Star';

import newsware_data from '../data/newsware_data.json';
import users_data from '../data/users_data.json';
import interest_data from '../data/interest_data.json';
import cities from '../data/russian-cities.json';

import { userId, defaultUser } from '../App';

import '../css/Search.css';
import '../css/Newsware.css';

const Search = () => {
  const forms = ['Платная', 'Бесплатная', 'Волонтерство'];
  const format = ['Онлайн', 'Офлайн'];

  const [isLoaded, setIsLoaded] = React.useState(false); //comp
  const [userPosts, setUserPosts] = React.useState([]); //App
  const [userCases, setUserCases] = React.useState([]); //App
  const [userEvents, setUserEvents] = React.useState([]); //App
  const [users, setUsers] = React.useState([]); //App

  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [openedCategories, setOpenedCategories] = React.useState([]);
  const [selectedFilters, setSelectedFilters] = React.useState({
    direction: [],
    forma: [],
    format: [],
    city: [],
  });

  const myProfile = users_data.find((obj) => obj.userId === userId)
    ? users_data.find((obj) => obj.userId === userId)
    : defaultUser; //App

  React.useEffect(() => {
    setUserPosts(
      newsware_data.filter((item) => {
        return (
          item.type === 'post' &&
          !myProfile.subscriptions.includes(item.authorId) &&
          item.authorId !== userId
        );
      }),
    );
    setUserCases(
      newsware_data.filter((item) => {
        return (
          item.type === 'case' &&
          !myProfile.subscriptions.includes(item.authorId) &&
          item.authorId !== userId
        );
      }),
    );
    setUserEvents(
      newsware_data.filter((item) => {
        return (
          item.type === 'event' &&
          !myProfile.subscriptions.includes(item.authorId) &&
          item.authorId !== userId
        );
      }),
    );
    setUsers(users.users_data);
    setIsLoaded(true);
  }, []);

  const onClickCategory = (cat) => {
    if (openedCategories.includes(cat))
      setOpenedCategories(
        openedCategories.filter((obj) => {
          return obj !== cat;
        }),
      );
    else setOpenedCategories([...openedCategories, cat]);
  };

  const [activeCategory, setActiveCategory] = React.useState(0); //Comp
  return (
    <>
      <div className="search_container">
        <div className="search_box">
          <i className="icon-search"></i>
          <input
            className="search_input"
            type="text"
            id="global_search"
            placeholder="глобальный поиск"
          />
        </div>
      </div>
      <div className="search_filter">
        <button
          className={activeCategory === 0 ? 'search_filter_btn active_btn' : 'search_filter_btn'}
          onClick={() => {
            setActiveCategory(0);
          }}>
          <p className="search_btn_sign">Кейсы</p>
        </button>
        <button
          className={activeCategory === 1 ? 'search_filter_btn active_btn' : 'search_filter_btn'}
          onClick={() => {
            setActiveCategory(1);
          }}>
          <p className="search_btn_sign">Посты</p>
        </button>
        <button
          className={activeCategory === 2 ? 'search_filter_btn active_btn' : 'search_filter_btn'}
          onClick={() => {
            setActiveCategory(2);
          }}>
          <p className="search_btn_sign">Восходящие звезды</p>
        </button>
        <button
          className={activeCategory === 3 ? 'search_filter_btn active_btn' : 'search_filter_btn'}
          onClick={() => {
            setActiveCategory(3);
          }}>
          <p className="search_btn_sign">Акулы индустрии</p>
        </button>
        <button
          className={activeCategory === 4 ? 'search_filter_btn active_btn' : 'search_filter_btn'}
          onClick={() => {
            setActiveCategory(4);
          }}>
          <p className="search_btn_sign">Мероприятия</p>
        </button>
      </div>
      {activeCategory === 0 && (
        <div className="global_search_container">
          {isLoaded &&
            userCases.map((item) => {
              return <CaseCard key={item.newswareId} {...item} />;
            })}
        </div>
      )}
      {activeCategory === 1 && (
        <div style={{ marginTop: '20px', paddingBottom: '60px' }} className="newsware_container">
          <div className="mainBackground">
            {isLoaded ? (
              userPosts.map((item) => {
                return <PostCard {...item} key={item.newswareId} />;
              })
            ) : (
              <div className="newsware_item">
                {[...new Array(4)].map((_, index) => {
                  return (
                    <ContentLoader
                      key={index}
                      speed={1}
                      width={360}
                      height={300}
                      viewBox="0 0 360 300"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#7e52ee">
                      <circle cx="47" cy="16" r="16" />
                      <rect x="72" y="5" rx="3" ry="3" width="65" height="8" />
                      <rect x="72" y="20" rx="3" ry="3" width="50" height="6" />
                      <rect x="31" y="50" rx="3" ry="3" width="320" height="8" />
                      <rect x="31" y="70" rx="10" ry="10" width="320" height="188" />
                    </ContentLoader>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
      {(activeCategory === 2 || activeCategory === 3) && (
        <div className="global_search_container">
          {users_data.map((user) => {
            return (
              <Star
                nickname={user.nickname}
                role={user.role}
                avatar={user.avatar}
                key={user.userId}
              />
            );
          })}
        </div>
      )}
      {activeCategory === 4 && (
        <div
          className={
            isFiltersOpen ? 'global_search_container set_margin' : 'global_search_container'
          }>
          <div className="filter_container">
            <div
              className="filter_button"
              onClick={() => {
                setIsFiltersOpen(!isFiltersOpen);
              }}>
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
              <p className="filter_sign">Отфильтровать</p>
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z" fill="#BABABA" />
              </svg>
            </div>
          </div>
          {isFiltersOpen && (
            <div className="filters_list">
              <div className="filters_element">
                <div className="filters_top">
                  <div className="filter_name_container" onClick={() => onClickCategory(1)}>
                    <svg
                      className="vertical_line"
                      width="1"
                      height="14"
                      viewBox="0 0 1 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.5 0.978516V13.0201" stroke="black" strokeWidth="0.5" />
                    </svg>
                    <p className="filter_name">Направление</p>
                  </div>

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
                </div>
                {openedCategories.includes(1) && (
                  <div className="filter_opened" id="filter_direction">
                    <ul className="direction_list" id="dir_list">
                      {interest_data.map((el, idx) => {
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
                  <div className="filter_name_container" onClick={() => onClickCategory(2)}>
                    <svg
                      className="vertical_line"
                      width="1"
                      height="14"
                      viewBox="0 0 1 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.5 0.978516V13.0201" stroke="black" strokeWidth="0.5" />
                    </svg>
                    <p className="filter_name">Форма участия</p>
                  </div>
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
                  <div className="filter_name_container" onClick={() => onClickCategory(3)}>
                    <svg
                      className="vertical_line"
                      width="1"
                      height="14"
                      viewBox="0 0 1 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.5 0.978516V13.0201" stroke="black" strokeWidth="0.5" />
                    </svg>
                    <p className="filter_name">Формат</p>
                  </div>
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
                  <div className="filter_name_container" onClick={() => onClickCategory(4)}>
                    <svg
                      className="vertical_line"
                      width="1"
                      height="14"
                      viewBox="0 0 1 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.5 0.978516V13.0201" stroke="black" strokeWidth="0.5" />
                    </svg>
                    <p className="filter_name">Город</p>
                  </div>
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
                </div>
                {openedCategories.includes(4) && (
                  <div className="filter_opened" id="filter_cities">
                    <ul className="direction_list">
                      {cities.map((el, idx) => {
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
          {
            /* {userEvents.map((user, idx) => {
            return <EventCard {...user} key={idx} />;
          })} */

            isLoaded && // ЭТО ПОСТЫ ВМЕСТО МЕРОПРИЯТИЙ, УБРАТЬ ИХ ПОТОМ
              userPosts.map((item) => {
                return <PostCard {...item} key={item.newswareId} />;
              })
          }
        </div>
      )}
      <Footer />
    </>
  );
};

export default Search;
