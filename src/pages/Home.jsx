import React from 'react';

import Header from '../components/Header';
import Post from '../components/Post';
import Footer from '../components/Footer';

import post_data from '../data/post_data.json';

import '../css/style.css';

const Home = () => {
  return (
    <>
      <Header />
      <main className="mainBackground">
        {post_data.map((item, index) => {
          return <Post {...item} key={index} />;
        })}
      </main>
      <Footer />
    </>
  );
};

export default Home;
