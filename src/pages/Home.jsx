import React from 'react';
import ContentLoader from 'react-content-loader';

import Header from '../components/Header';
import Newsware from '../components/Newsware';
import Footer from '../components/Footer';
import Preload from '../components/Preload';

import newsware_data from '../data/newsware_data.json';
import users_data from '../data/users_data.json';

import { mainContext, userId, defaultUser } from '../App';

import '../css/Home.css';

const Home = () => {
  const { currentFilter, setMessage } = React.useContext(mainContext);

  const myProfile = users_data.find((obj) => obj.userId === userId)
    ? users_data.find((obj) => obj.userId === userId)
    : defaultUser; //app

  const [isLoading, setIsLoading] = React.useState(false); // setTimeOut убрать

  setMessage(false);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return isLoading ? (
    <Preload />
  ) : (
    <>
      <Header />
      <main className="mainBackground">
        <div className="newsware_container">
          {false ? (
            <div className="post_box">
              {[...new Array(3)].map((_, index) => {
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
          ) : (
            newsware_data.map((item, id) => {
              return (item.authorId === userId ||
                myProfile.subscriptions.includes(item.authorId)) &&
                (item.type === currentFilter || currentFilter === 'all') ? (
                <Newsware {...item} key={id} />
              ) : null;
            })
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
