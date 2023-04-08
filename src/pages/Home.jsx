import React from 'react';
import ContentLoader from 'react-content-loader';

import Header from '../components/Header';
import Post from '../components/Post';
import Footer from '../components/Footer';
import Preload from '../components/Preload';

import post_data from '../data/post_data.json';
import { mainContext } from '../App';

import '../css/Home.css';
import 'swiper/css';
import '../css/Preview.css';

const Home = () => {
  const { profile, currentFilter } = React.useContext(mainContext);

  const [isLoading, setIsLoading] = React.useState(false); // setTimeOut убрать

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return isLoading ? (
    <Preload />
  ) : (
    <>
      <Header />

      <main className="mainBackground">
        {false ? (
          <div className="posts_container">
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
          </div>
        ) : (
          post_data.map((item, index) => {
            return item.filter === currentFilter || currentFilter === 'all' ? (
              <Post {...item} key={index} />
            ) : null;
          })
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
