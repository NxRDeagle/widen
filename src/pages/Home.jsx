import React from 'react';
import ContentLoader from 'react-content-loader';

import Header from '../components/Header';
import Post from '../components/Post';
import Footer from '../components/Footer';
import Preload from '../components/Preload';

import posts_data from '../data/posts_data.json';

import { mainContext } from '../App';

import '../css/Home.css';

const Home = () => {
  const { currentFilter, setMessage} = React.useContext(mainContext);


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
        <div className="posts_container">
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
            posts_data.map((item) => {
              return item.type === currentFilter || currentFilter === 'all' ? (
                <Post {...item} key={item.postId} />
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
