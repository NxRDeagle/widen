import React from 'react';

import Header from '../components/Header';
import Post from '../components/Post';
import Footer from '../components/Footer';

import videoMp4 from '../img/video.mp4';

const Home = () => {
  return (
    <>
      <Header />
      <main className="mainBackground">
        <Post
          id={1}
          nickname="KatyJS"
          text="ЖИЛИ БЫЛИ ТРИ КИТА"
          imgs={['https://i.pinimg.com/originals/8a/de/fe/8adefe5af862b4f9cec286c6ee4722cb.jpg']}
          stats={[150, 200, 13560005, 15665]}
        />
        <Post
          id={2}
          avatar="https://i.gifer.com/fetch/w300-preview/09/0918ef4e28f752519a2aaf78ed4450cb.gif"
          nickname="PupaOnline"
          text="Я рад!!!"
          stats={[1337, 228, 150, 99999]}
        />
        <Post id={3} nickname="Perchik" text="КРУТОЕ ВИДЕО СМОТРЕТЬ! ВСЕМ!" videos={[videoMp4]} />
        <Post
          id={4}
          avatar="https://i.gifer.com/fetch/w300-preview/09/0918ef4e28f752519a2aaf78ed4450cb.gif"
          nickname="0_0"
          text="Это пост о цветах и животных!"
          imgs={[
            'https://lifeo.ru/wp-content/uploads/kartinki-cvety-krasivie-bukety-41.jpg',
            'https://mobimg.b-cdn.net/v3/fetch/4e/4e91811a8323925e30904d21fb85efc8.jpeg',
            'https://kartinkin.net/pics/uploads/posts/2022-06/thumbs/1656396081_46-kartinkin-net-p-kot-v-solntsezashchitnikh-ochkakh-art-kras-52.jpg',
            'https://phonoteka.org/uploads/posts/2022-06/1656605801_23-phonoteka-org-p-dora-pevitsa-oboi-24.jpg',
            'https://www.meme-arsenal.com/memes/e88ee9b9904c754981f1ae6bcd3abbae.jpg',
          ]}
          stats={[1, 2, 3, 44444]}
        />
      </main>
      <Footer />
    </>
  );
};

export default Home;
