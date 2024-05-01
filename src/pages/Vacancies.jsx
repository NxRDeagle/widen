import React from 'react';
import { useContext, useState } from 'react';

import '../css/Vacancies.css';
import '../../src/pages/Search/css/Search.css';

import SearchInput from '../global_components/search/SearchInput';
import VacanciesWelcomeCard from '../components/VacanciesWelcomeCard';

import { mainContext } from '../App';

import { Tags } from '../global_components/newsware/components/newsware_components';

const Vacancies = () => {
  const { partnershipFilters, dropPartnershipFilter } = useContext(mainContext);

  const [division, setDivision] = React.useState(0); // Текущий раздел (0 - гл. страница)
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false); // Открытие фильтрации
  const [statusFilter, setStatusFilter] = React.useState('Открыты'); // Фильтрация по партнерствам (Открыты/В процессе/Закрыты)

  const divisions = ['Партнёрства', 'Фриланс-проекты', 'Вакансии', 'Краудфандинг']; // Наименования разделов
  // Описания для разделов
  const divisionsDescriptions = [
    'Здесь вы можете рассказать о своей идее и найти единомышленников для ее реализации.',
    'Здесь вы можете найти интересные проекты от заказчиков по разным направлениям.',
    'Здесь вы можете увидеть вакансии от компаний, которые ищут крутых специалистов.',
    'Здесь вы можете поделиться своей идеей и найти финансирование для ее реализации.',
  ];

  // Категория фильтра
  const PartnershipCategoryFilter = ({
    category,
    children,
    onClickCategory,
    handleChange,
    openedCategories,
    categoryFilters,
    inputFilter,
    categoryList,
    clickCategoryItem,
  }) => {
    return (
      <div className="filters_element">
        <div className="filters_top">
          <div className="filter_name_container">
            {openedCategories === category ? (
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                className="filter_input"
                maxLength={20}
                type="text"
                name={category}
                value={inputFilter}
                placeholder={'|' + children}
              />
            ) : (
              <p className="filter_name" onClick={() => onClickCategory(category)}>
                {children}
              </p>
            )}
          </div>

          <div
            className={
              openedCategories === category
                ? categoryFilters.length > 0
                  ? 'triangle_left triangle_bottom triangle_active'
                  : 'triangle_left triangle_bottom triangle_none_active'
                : categoryFilters.length > 0
                ? 'triangle_left triangle_active'
                : 'triangle_left triangle_none_active'
            }
            onClick={() => onClickCategory(category)}></div>

          {categoryFilters.length > 0 && (
            <p
              style={{ right: '50px' }}
              className="count_filters"
              onClick={() => onClickCategory(category)}>
              {categoryFilters.length}
            </p>
          )}
        </div>
        <div
          className={
            openedCategories === category
              ? inputFilter.length > 0
                ? `filter_opened filter_${category} filter_fit`
                : `filter_opened filter_${category}`
              : 'filter_opened'
          }>
          <ul className="direction_list" id="dir_list">
            {categoryList
              .filter((item) => item.toLowerCase().includes(inputFilter.toLowerCase()))
              .map((el, idx) => {
                return (
                  <li key={idx} className="list_el">
                    <p className="list_el_sign">{el}</p>
                    <input
                      onClick={(e) => clickCategoryItem(e.target.checked, el, category)}
                      type="checkbox"
                      className="filter_checkbox"
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  };

  //Компонент фильтра для мероприятий
  const PartnershipFilter = ({ isFiltersOpen, setIsFiltersOpen }) => {
    const {
      partnershipFilters,
      dropPartnershipFilters,
      dropPartnershipFilter,
      addPartnershipFilter,
    } = useContext(mainContext);

    //Константы(выбор фильтров для всех категорий)
    const duration = ['Долгосрочно', 'Краткосрочно'];
    const format = [
      'Студия',
      'Магазин',
      'Агенство',
      'Фестиваль',
      'Ярмарка',
      'Выставка',
      'Театр',
      'Кинотеатр',
      'Курс',
      'Концерт',
      'Кафе',
      'Сайт',
      'Акция',
    ];
    const direction = [
      'Фотография',
      'Цветы',
      'Одежда',
      'Кино/видео',
      'Изобр. искусство',
      'Музыка',
      'Образование',
      'Танцы',
      'Мультипликация',
      'Маркетинг',
      'Журналистика',
      'Дизайн',
      'Интерьер',
      'Архитектура',
      'ИТ',
      'Start-up',
      'Рукоделие',
    ];
    const type = ['Коммерческий', 'Некоммерческий'];

    //Выбор категории фильтра
    const [openedCategories, setOpenedCategories] = useState('');

    //Фильтрация ввода в поле категории
    const [inputStates, setInputStates] = useState({
      duration: '',
      format: '',
      direction: '',
      type: '',
    });

    //Открытие фильтра определённой категории
    const onClickCategory = (category) => {
      console.log(category);
      openedCategories === category ? setOpenedCategories('') : setOpenedCategories(category);
    };

    //Заполнение нужного стейта ввода по полю
    const handleChange = (e) => {
      setInputStates({
        ...inputStates,
        [e.target.name]: e.target.value,
      });
    };

    //Подсчёт общего кол-ва выбранных фильтров
    const AllCountFilters = (partnershipFilters) => {
      let length = 0;
      for (const key in partnershipFilters) {
        length += partnershipFilters[key].length;
      }
      return length;
    };

    //Сброс всех фильтров
    const clearPartnershipFilters = () => {
      setInputStates({
        duration: '',
        format: '',
        direction: '',
        type: '',
      });
      dropPartnershipFilters();
    };

    //Нажатие на чекбокс для каждой категории
    const clickCategoryItem = (active, categoryItemSign, category) => {
      active
        ? addPartnershipFilter(category, categoryItemSign)
        : dropPartnershipFilter(category, categoryItemSign);
    };

    const partnershipTags = ({ onClick, children }) => {
      return (
        <div onClick={onClick} className="global_tag_box">
          <p className="global_tag">{children}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none">
            <path
              d="M11.3642 4.62983L4.62977 11.3643C4.39968 11.5944 4.01806 11.5944 3.78797 11.3643C3.55787 11.1342 3.55787 10.7526 3.78797 10.5225L10.5224 3.78803C10.7525 3.55794 11.1341 3.55794 11.3642 3.78803C11.5943 4.01812 11.5943 4.39974 11.3642 4.62983Z"
              fill="white"
            />
            <path
              d="M11.3642 11.3643C11.1341 11.5944 10.7525 11.5944 10.5224 11.3643L3.78797 4.62989C3.55787 4.39979 3.55787 4.01818 3.78797 3.78808C4.01806 3.55799 4.39968 3.55799 4.62977 3.78808L11.3642 10.5225C11.5943 10.7526 11.5943 11.1342 11.3642 11.3643Z"
              fill="white"
            />
          </svg>
        </div>
      );
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

            {AllCountFilters(partnershipFilters) > 0 && (
              <p className="count_filters" id="count_filters_main">
                {' '}
                {AllCountFilters(partnershipFilters)}
              </p>
            )}
            <div
              className={
                isFiltersOpen
                  ? AllCountFilters(partnershipFilters)
                    ? 'triangle_left triangle_bottom triangle_active'
                    : 'triangle_left triangle_bottom triangle_none_active'
                  : AllCountFilters(partnershipFilters)
                  ? 'triangle_left triangle_active'
                  : 'triangle_left triangle_none_active'
              }></div>
          </div>
        </div>

        <div
          className={
            isFiltersOpen
              ? openedCategories.length > 0
                ? 'filters_list filters_list_open filter_fit'
                : 'filters_list filters_list_open'
              : 'filters_list'
          }>
          <PartnershipCategoryFilter
            category="duration"
            onClickCategory={onClickCategory}
            handleChange={handleChange}
            openedCategories={openedCategories}
            categoryFilters={partnershipFilters.duration}
            inputFilter={inputStates.duration}
            categoryList={duration}
            clickCategoryItem={clickCategoryItem}>
            Длительность
          </PartnershipCategoryFilter>
          <PartnershipCategoryFilter
            category="format"
            onClickCategory={onClickCategory}
            handleChange={handleChange}
            openedCategories={openedCategories}
            categoryFilters={partnershipFilters.format}
            inputFilter={inputStates.format}
            categoryList={format}
            clickCategoryItem={clickCategoryItem}>
            Формат
          </PartnershipCategoryFilter>
          <PartnershipCategoryFilter
            category="direction"
            onClickCategory={onClickCategory}
            handleChange={handleChange}
            openedCategories={openedCategories}
            categoryFilters={partnershipFilters.direction}
            inputFilter={inputStates.direction}
            categoryList={direction}
            clickCategoryItem={clickCategoryItem}>
            Направление
          </PartnershipCategoryFilter>
          <PartnershipCategoryFilter
            category="type"
            onClickCategory={onClickCategory}
            handleChange={handleChange}
            openedCategories={openedCategories}
            categoryFilters={partnershipFilters.type}
            inputFilter={inputStates.type}
            categoryList={type}
            clickCategoryItem={clickCategoryItem}>
            Тип
          </PartnershipCategoryFilter>
          <div className="filters_down">
            <button
              className="btn_reset"
              onClick={() => {
                clearPartnershipFilters();
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
      </>
    );
  };

  return (
    <>
      {division === 0 ? (
        <div className="vacancies-welcome">
          <h1 className="vacancies-welcome_header">Widen - проекты</h1>
          <div className="vacancies_welcome_div">
            {divisions.map((item, idx) => {
              return (
                <VacanciesWelcomeCard
                  key={idx}
                  header={item}
                  description={divisionsDescriptions[idx]}
                  num={idx + 1}
                  setDivision={setDivision}
                  isClosed={item === 'Партнёрства' ? false : true}
                />
              );
            })}
          </div>
        </div>
      ) : (
        division === 1 && (
          <div className="vacancies_box">
            <div className="vacancies_box__top">
              <svg
                onClick={() => setDivision(0)}
                className="vacancies_arrow_svg"
                width="20"
                height="15"
                viewBox="0 0 20 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.05754 0.40359C8.31436 0.672648 8.43763 0.997762 8.42736 1.37893C8.41623 1.76009 8.28226 2.0852 8.02543 2.35426L4.39783 6.15471H18.7156C19.0795 6.15471 19.3847 6.28386 19.6312 6.54216C19.8769 6.79955 19.9998 7.11884 19.9998 7.5C19.9998 7.88117 19.8769 8.2009 19.6312 8.4592C19.3847 8.71659 19.0795 8.84529 18.7156 8.84529H4.39783L8.05754 12.6794C8.31436 12.9484 8.44277 13.2682 8.44277 13.6386C8.44277 14.0081 8.31436 14.3274 8.05754 14.5964C7.80071 14.8655 7.49552 15 7.14197 15C6.78926 15 6.4845 14.8655 6.22768 14.5964L0.352882 8.44171C0.22447 8.30718 0.133297 8.16144 0.0793648 8.00449C0.026289 7.84754 -0.000249863 7.67937 -0.000249863 7.5C-0.000249863 7.32063 0.026289 7.15247 0.0793648 6.99552C0.133297 6.83857 0.22447 6.69283 0.352882 6.5583L6.25978 0.369959C6.4952 0.123322 6.78926 1.90735e-06 7.14197 1.90735e-06C7.49552 1.90735e-06 7.80071 0.134532 8.05754 0.40359Z"
                  fill="#BABABA"
                />
              </svg>

              <h1 className="vacancies-welcome_header">Партнёрства</h1>
            </div>
            <div className="vacancies_searchBar">
              <SearchInput placeholder="Партнёрства" />
              <div className="vacancies_status_btns">
                <button
                  onClick={() => setStatusFilter('Открыты')}
                  className={
                    statusFilter === 'Открыты'
                      ? 'vacancies_select_status_btn active_btn'
                      : 'vacancies_select_status_btn'
                  }>
                  Открыты
                </button>
                <button
                  onClick={() => setStatusFilter('В процессе')}
                  className={
                    statusFilter === 'В процессе'
                      ? 'vacancies_select_status_btn active_btn'
                      : 'vacancies_select_status_btn'
                  }>
                  В процессе
                </button>
                <button
                  onClick={() => setStatusFilter('Зыкрыты')}
                  className={
                    statusFilter === 'Зыкрыты'
                      ? 'vacancies_select_status_btn active_btn'
                      : 'vacancies_select_status_btn'
                  }>
                  Закрыты
                </button>
              </div>
              {/* {partnershipFilters.tags.length > 0 && (
                <div
                  style={{ filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))' }}
                  className="global_tags_container">
                  {partnershipFilters.tags.map((item, index) => {
                    return (
                      <Tags key={index} onClick={() => dropPartnershipFilter('tags', item)}>
                        {item}
                      </Tags>
                    );
                  })}
                </div>
              )} */}
            </div>
            <div className="vacancies_filterBox">
              <PartnershipFilter
                isFiltersOpen={isFiltersOpen}
                setIsFiltersOpen={setIsFiltersOpen}
              />
            </div>
          </div>
        )
      )}

      {/* {globalFilters.tags.length > 0 && (
        <div
          style={{ filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25))' }}
          className="global_tags_container">
          {globalFilters.tags.map((item, index) => {
            return (
              <GlobalTags key={index} onClick={() => dropGlobalFilter('tag', item)}>
                {item}
              </GlobalTags>
            );
          })}
        </div>
      )}
      <div className="search_category_box">
        <CategoryBtn category="globalOpen">Открыты</CategoryBtn>
        <CategoryBtn category="globalInProcess">В процессе</CategoryBtn>
        <CategoryBtn category="globalClosed">Закрыты</CategoryBtn>
      </div>
      {activeGlobalSearch === 'globalOpen' && (
        <div style={{ paddingBottom: '60px' }} className="global_search_container">
          <div className="mainBackground">
            {globalCases.map((globalCase) => {
              return <Newsware key={globalCase.newswareId} {...globalCase} />;
            })}
          </div>
        </div>
      )}
      {activeGlobalSearch === 'globalInProcess' && (
        <div style={{ paddingBottom: '60px' }} className="global_search_container">
          <div className="mainBackground">
            {globalPosts.map((globalPost) => {
              return <Newsware key={globalPost.newswareId} {...globalPost} />;
            })}
          </div>
        </div>
      )}
      {activeGlobalSearch === 'globalClosed' && (
        <div className="global_search_container">
          {globalRisingStars.map((risingStar) => {
            return <GlobalStar {...risingStar} onClick={() => goToPreview(risingStar)} />;
          })}
        </div>
      )}

      {activeGlobalSearch === 'globalShark' && (
        <div className="global_search_container">
          {globalSharks.map((shark) => {
            return <GlobalStar {...shark} onClick={() => goToPreview(shark)} />;
          })}
        </div>
      )}
      {activeGlobalSearch === 'globalEvent' && (
        <div
          className={
            isFiltersOpen ? 'global_search_container set_margin' : 'global_search_container'
          }>
          <EventFilter isFiltersOpen={isFiltersOpen} setIsFiltersOpen={setIsFiltersOpen} />

          {globalEvents.map((item) => {
            return <Newsware {...item} key={item.newswareId} />;
          })}
        </div>
      )} */}
    </>
  );
};
export default Vacancies;
