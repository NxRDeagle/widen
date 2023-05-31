import React from 'react';
import ContentLoader from 'react-content-loader';

import Update from '../components/Update';
import Footer from '../components/Footer';
import CaseCard from '../components/CaseCard';
import Post from '../components/Post';
import Star from '../components/Star';

import posts_data from '../data/posts_data.json';
import users_data from '../data/users_data.json';

import '../css/Search.css';
import '../css/Post.css';

const Search = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [userPosts, setUserPosts] = React.useState([]);
  const [userCases, setUserCases] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    setUserPosts(
      posts_data.filter((item) => {
        return item.type === 'post';
      }),
    );
    setUserCases(
      posts_data.filter((item) => {
        return item.type === 'case';
      }),
    );
    setUsers(users.users_data);
    setIsLoaded(true);
  }, []);

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
          {isLoaded &&
            userCases.map((item, index) => {
              return (
                <CaseCard
                  key={index}
                  img={item.imgs[0]}
                  header={item.signImgs[0]}
                  avatar={users_data.find((obj) => obj.userId === item.authorId).avatar}
                  nickname={users_data.find((obj) => obj.userId === item.authorId).nickname}
                />
              );
            })}

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
        </div>
      )}
      {activeCategory === 1 && (
        <div className="postItems">
          <div className="mainBackground">
            {isLoaded ? (
              userPosts.map((item) => {
                return <Post {...item} key={item.postId} />;
              })
            ) : (
              <div className="posts_container">
                <div className="post_box">
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
              </div>
            )}
          </div>
        </div>
      )}
      {(activeCategory === 2 || activeCategory === 3) && (
        <div className="star_div">
          <div className="star_container">
            {users_data.map((user, index) => {
              return <Star img={user.avatar} nickname={user.nickname} key={index} />;
            })}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Search;
