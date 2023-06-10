import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import defaultAvatar from '../src/img/defaultAvatar.png';
import defaultPostPng from '../src/img/default_post.png';

import './css/App.css';
import './css/fontello.css';

import Home from './pages/Home';
import Search from './pages/Search';
import Vacancies from './pages/Vacancies';
import Messenger from './pages/Messenger';
import Forum from './pages/Forum';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import UserProfile from './pages/UserProfile';
import Input from './pages/Input';
import Comments from './pages/Comments';
import Preview from './pages/Preview';
import FullMode from './pages/FullMode';

export const mainContext = React.createContext();

export const userId = 1;

export const defaultUser = {
  userId: 0,
  avatar: defaultAvatar,
  background:
    'https://phonoteka.org/uploads/posts/2021-04/thumbs/1618498711_49-phonoteka_org-p-fioletovii-fon-v-stime-50.png',
  nickname: 'Undefind_Star',
  firstName: 'Потерянная',
  lastName: 'Звёздочка',
  subscribers: [],
  subscribtions: [],
  viewUsers: [],
  role: 'Неизвестна',
  softSkills: [],
  status: 'offline',
  idea: 'Найтись в этом мире',
  who: 'professional',
  achievements: [],
  notification: 'false',
  interests: [],
  lastTime: '',
  chatNames: ['Коллеги', 'Заказчики'],
};

export const defaultChat = {
  chatId: 0,
  companionId: 0,
  chatName: '',
  fullStatus: '',
  messages: [
    {
      who: 'user',
      message: 'Сообщение не найдено :(',
      status: '',
      time: '',
    },
  ],
};

export const defaultComment = {
  commentId: 0,
  authorCommentId: 0,
  text: 'Комментарий не найден :(',
  likes: [],
  replies: [],
  time: '',
  isReply: false,
};

export const defaultPost = {
  postId: 0,
  type: 'post',
  authorId: 0,
  stats: {
    likes: [],
    comments: [],
    favorites: [],
    reposts: [],
    views: [],
  },
  imgs: [defaultPostPng],
  signImgs: ['Пост не найден :('],
  geoposition: '',
  time: '',
};

function App() {
  const location = useLocation();

  const [currentFilter, setCurrentFilter] = React.useState('all');

  const [message, setMessage] = React.useState(false);

  const [local, setLocal] = React.useState({
    savedScroll: localStorage.getItem('scrollValue'),
    savedProfile: localStorage.getItem('profile'),
    savedCommentNewswareId: localStorage.getItem('commentNewswareId'),
  });

  const [page, setPage] = React.useState(
    location.pathname === '/' ? 'home' : location.pathname.substring(1),
  );

  const [fullImages, setFullImages] = React.useState(['']);

  const [commentNewswareId, setCommentNewswareId] = React.useState(
    local.savedCommentNewswareId === null ? 0 : JSON.parse(local.savedCommentNewswareId),
  );

  const [profile, setProfile] = React.useState(
    local.savedProfile === null ? {} : JSON.parse(local.savedProfile),
  );

  React.useEffect(() => {
    try {
      const savedProfile = JSON.stringify(profile);
      localStorage.setItem('profile', savedProfile);
      const savedCommentNewswareId = JSON.stringify(commentNewswareId);
      localStorage.setItem('commentNewswareId', savedCommentNewswareId);
      const savedFullImages = JSON.stringify(fullImages);
      localStorage.setItem('fullImages', savedFullImages);
    } catch (err) {
      return undefined;
    }
  }, [profile, commentNewswareId, fullImages]);

  const [scrollValue, setScrollValue] = React.useState(
    local.savedScroll === null ? 0 : JSON.parse(local.savedScroll),
  );

  React.useEffect(() => {
    const onScroll = (e) => {
      if (e.target.documentElement.scrollTop !== 0)
        setScrollValue(e.target.documentElement.scrollTop);

      try {
        const savedScroll = JSON.stringify(scrollValue);
        localStorage.setItem('scrollValue', savedScroll);
      } catch (err) {
        return undefined;
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollValue]);

  React.useEffect(() => {
    window.scrollTo(0, scrollValue);
    setPage(location.pathname === '/' ? 'home' : location.pathname.substring(1));
  }, [location.pathname]);

  const [loc, setLoc] = React.useState([]);

  const [messageText, setMessageText] = React.useState('');

  function Conversion(type, stats) {
    let element = null;
    switch (type) {
      case 'count':
        element =
          stats >= 1000000
            ? Math.floor(stats / 1000000) + 'm'
            : stats >= 1000
            ? Math.floor(stats / 1000) + 'k'
            : stats;
        break;
      case 'comments':
        element =
          stats % 10 === 1
            ? 'комментарий'
            : stats % 10 === 0 || stats % 10 >= 5
            ? 'комментариев'
            : 'комментария';
        break;
      default:
        return element;
    }
    return element;
  }

  return (
    <div className="App">
      <mainContext.Provider
        value={{
          page,
          setPage,
          fullImages,
          setFullImages,
          profile,
          setProfile,
          setScrollValue,
          commentNewswareId,
          setCommentNewswareId,
          currentFilter,
          setCurrentFilter,
          loc,
          setLoc,
          Conversion,
          messageText,
          setMessageText,
          message,
          setMessage,
        }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/full_image" element={<FullMode imgs={fullImages} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/profile" element={<Profile userId={userId} />} />
          <Route path="/user_profile/:nickname" element={<UserProfile />} />
          <Route index path="/input" element={<Input />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </mainContext.Provider>
    </div>
  );
}

export default App;
