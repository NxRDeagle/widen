import React from 'react';

import Header from '../components/Header';
import Post from '../components/Post';
import Footer from '../components/Footer';

import post_data from '../data/post_data.json';
import { mainContext } from '../App';

import '../css/style.css';

const Home = () => {
  const { currentFilter } = React.useContext(mainContext);

  return (
    <>
      <Header />
      <main className="mainBackground">
        {post_data.map((item, index) => {
          return item.filter === currentFilter || currentFilter === 'all' ? (
            <Post {...item} key={index} />
          ) : null;
        })}
      </main>
      <Footer />
    </>
  );
};

export default Home;
