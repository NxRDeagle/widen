import React from 'react';

import Update from '../components/Update';
import Footer from '../components/Footer';
import CaseCard from '../components/CaseCard';

import '../css/Search.css';

const Search = () => {
  const [activeCategory, setActiveCategory] = React.useState(0);
  return (
    <div className="search_div">
      <div className="search_container">
        <div className="search_box">
          <i className="icon-search search_input"></i>
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
      <Update />
      {activeCategory === 0 && (
        <div className="casecard_container">
          <CaseCard
            img="https://mobimg.b-cdn.net/v3/fetch/37/372ba3f7831018e824b4e799ed40f281.jpeg"
            header="testTesttest asdfasf"
            nickname="туктук"
            avatar="https://fanibani.ru/images/wp-content/uploads/2021/09/137-8.jpg"
          />
          <CaseCard
            img="https://mobimg.b-cdn.net/v3/fetch/37/372ba3f7831018e824b4e799ed40f281.jpeg"
            header="testTesttest fss"
            nickname="туктук"
            avatar="https://fanibani.ru/images/wp-content/uploads/2021/09/137-8.jpg"
          />
          <CaseCard
            img="https://mobimg.b-cdn.net/v3/fetch/37/372ba3f7831018e824b4e799ed40f281.jpeg"
            header="testTesttest dfas"
            nickname="туктук"
            avatar="https://fanibani.ru/images/wp-content/uploads/2021/09/137-8.jpg"
          />
          <CaseCard
            img="https://mobimg.b-cdn.net/v3/fetch/37/372ba3f7831018e824b4e799ed40f281.jpeg"
            header="testTesttest a bc"
            nickname="туктук"
            avatar="https://fanibani.ru/images/wp-content/uploads/2021/09/137-8.jpg"
          />
          <CaseCard
            img="https://mobimg.b-cdn.net/v3/fetch/37/372ba3f7831018e824b4e799ed40f281.jpeg"
            header="testTesttest aa aa"
            nickname="туктук"
            avatar="https://fanibani.ru/images/wp-content/uploads/2021/09/137-8.jpg"
          />
          <CaseCard
            img="https://mobimg.b-cdn.net/v3/fetch/37/372ba3f7831018e824b4e799ed40f281.jpeg"
            header="testTesttest aa aa"
            nickname="туктук"
            avatar="https://fanibani.ru/images/wp-content/uploads/2021/09/137-8.jpg"
          />
          <CaseCard
            img="https://mobimg.b-cdn.net/v3/fetch/37/372ba3f7831018e824b4e799ed40f281.jpeg"
            header="testTesttest aa aa"
            nickname="туктук"
            avatar="https://fanibani.ru/images/wp-content/uploads/2021/09/137-8.jpg"
          />
          <CaseCard
            img="https://mobimg.b-cdn.net/v3/fetch/37/372ba3f7831018e824b4e799ed40f281.jpeg"
            header="testTesttest aa aa"
            nickname="туктук"
            avatar="https://fanibani.ru/images/wp-content/uploads/2021/09/137-8.jpg"
          />
          <CaseCard
            img="https://mobimg.b-cdn.net/v3/fetch/37/372ba3f7831018e824b4e799ed40f281.jpeg"
            header="testTesttest aa aa"
            nickname="туктук"
            avatar="https://fanibani.ru/images/wp-content/uploads/2021/09/137-8.jpg"
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Search;
