import React from 'react';

import Header from '../components/Header';
import Post from '../components/Post';
import Footer from '../components/Footer';

import videoMp4 from '../img/video.mp4';

export const Post_list = () => {
  return [
    {
      id: 0,
      avatar: 'https://fanibani.ru/images/wp-content/uploads/2021/06/47-4-900x563.jpg',
      nickname: 'KatyJS',
      text: 'ЖИЛИ БЫЛИ ТРИ КИТА',
      imgs: ['https://i.pinimg.com/originals/8a/de/fe/8adefe5af862b4f9cec286c6ee4722cb.jpg'],
      stats: [150, 200, 13560005, 15665],
      subscribers: '11k',
      subscriptions: '5',
      idea: 'Я эгегей',
      comments: [
        {
          nickname: 'дэд',
          text: 'сколько можно то твою мать',
          avatar: 'https://i.ytimg.com/vi/Q5wp58LuNDM/maxresdefault.jpg',
        },
        {
          nickname: 'обамка',
          text: 'я обосрал подъезды',
          avatar: 'https://argumenti.ru/images/arhnews/438223.jpg',
        },
        {
          nickname: 'байден',
          text: 'я тоже',
          avatar: 'https://ntv-static.cdnvideo.ru/home/news/2023/20230303/biden_io.jpg',
        },
      ],
    },
    {
      id: 1,
      avatar: 'https://i.gifer.com/fetch/w300-preview/09/0918ef4e28f752519a2aaf78ed4450cb.gif',
      nickname: 'PupaOnline',
      text: 'Я рад!!!',
      stats: [1337, 228, 150, 99999],
      comments: [
        {
          nickname: 'lexa',
          text: 'я только браузер вижу',
          avatar: 'https://i08.fotocdn.net/s126/bfcd8309313c6f14/user_m/2873722976.jpg',
        },
      ],
    },
    {
      id: 2,
      nickname: 'Perchik',
      text: 'КРУТОЕ ВИДЕО СМОТРЕТЬ! ВСЕМ!',
      videos: [videoMp4],
      comments: [
        {
          nickname: 'денис петров',
          text: 'ывывывыв',
          avatar: 'https://cs12.pikabu.ru/post_img/2019/11/09/1/og_og_1573255987235361093.jpg',
        },
      ],
    },
    {
      id: 3,
      avatar: 'https://i.gifer.com/fetch/w300-preview/09/0918ef4e28f752519a2aaf78ed4450cb.gif',
      nickname: '0_0',
      text: 'Это пост о цветах и животных!',
      imgs: [
        'https://lifeo.ru/wp-content/uploads/kartinki-cvety-krasivie-bukety-41.jpg',
        'https://mobimg.b-cdn.net/v3/fetch/4e/4e91811a8323925e30904d21fb85efc8.jpeg',
        'https://kartinkin.net/pics/uploads/posts/2022-06/thumbs/1656396081_46-kartinkin-net-p-kot-v-solntsezashchitnikh-ochkakh-art-kras-52.jpg',
        'https://phonoteka.org/uploads/posts/2022-06/1656605801_23-phonoteka-org-p-dora-pevitsa-oboi-24.jpg',
        'https://www.meme-arsenal.com/memes/e88ee9b9904c754981f1ae6bcd3abbae.jpg',
      ],
      stats: [1, 2, 3, 44444],
    },
  ];
};

const Home = () => {
  const posts = Post_list();
  return (
    <>
      <Header />
      <main className="mainBackground">
        {posts.map((item, index) => {
          return <Post {...item} key={index} />;
        })}
      </main>
      <Footer />
    </>
  );
};

export default Home;
