import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultAvatar from '../src/img/defaultAvatar.png';
import { reducer } from '../src/reducer';
import users_data from '../src/data/users_data.json';
import chat_data from '../src/data/chat_data.json';
import newsware_data from '../src/data/newsware_data.json';

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

/*Колонка constant*/
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
  imgs: ['https://fikiwiki.com/uploads/posts/2022-02/1645041619_8-fikiwiki-com-p-ya-v-shoke-prikolnie-kartinki-9.jpg'],
  signImgs: ['Пост не найден :('],
  geoposition: '',
  time: '',
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

export const myProfile = users_data.find((obj) => obj.userId === userId) ? users_data.find((obj) => obj.userId === userId) : defaultUser;

function App() {

  const location = useLocation();
  const navigate = useNavigate();


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



  /*Стейты Приложения*/

  const appState = {
    currentNewswareFilter: 'all',
    isNewswareFilterOpen: false,
    message: false,
    page: location.pathname === '/' ? 'home' : location.pathname.substring(1),
    fullImages: [''],
    commentNewswareId: localStorage.getItem('commentNewswareId') ? JSON.parse(localStorage.getItem('commentNewswareId')) : 0,
    profile: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : {},
    scrollValue: localStorage.getItem('scrollValue') ? JSON.parse(localStorage.getItem('scrollValue')) : 0,
    loc: [],
    messageText: '',
    userProfileNewswareItems: [],
    chatFilter: localStorage.getItem('activeChat') ? JSON.parse(localStorage.getItem('activeChat')) : myProfile.chatNames[0],
    activeChats: chat_data.filter((chat) => chat.chatName === myProfile.chatNames[0]),
    activeGlobalSearch: localStorage.getItem('activeGlobalSearch') ? JSON.parse(localStorage.getItem('activeGlobalSearch')) : 'globalCase',
    globalPosts: newsware_data.filter((item) => {return (item.type === 'post' && !myProfile.subscriptions.includes(item.authorId) && item.authorId !== userId);}),
    globalCases: newsware_data.filter((item) => {return (item.type === 'case' && !myProfile.subscriptions.includes(item.authorId) && item.authorId !== userId);}),
    globalRisingStars: users_data,
    globalSharks: users_data,
    globalEvents: newsware_data.filter((item) => {return (item.type === 'event' && !myProfile.subscriptions.includes(item.authorId) && item.authorId !== userId);})
  };

  const [appvalue, dispatch] = React.useReducer(reducer, appState);

  appvalue.onClickHeaderFilter = (filter) => {
    dispatch({ type: 'CLICK_HEADER_FILTER', payload: filter });
  };

  appvalue.setIsNewswareFilterOpen = () => {
    dispatch({ type: 'SET_NEWSWARE_FILTER_OPEN' });
  };

  appvalue.setMessageText = (text) => {
    dispatch({ type: 'SET_MESSAGE_TEXT', payload: text });
  };

  appvalue.resetLoc = () => {
    dispatch({ type: 'RESET_LOC' });
  };

  appvalue.goToComments = (newswareId) => {
    appvalue.loc.push(location.pathname);
    dispatch({ type: 'GO_TO_COMMENTS', payload: newswareId });
    navigate('/comments');
  };

  appvalue.goToFullMode = (imgs, firstImg) => {
    const imgs_clone = Array.from(imgs);
    if (imgs_clone.length > 1)
      imgs_clone.sort(function (x, y) {
        return x === firstImg ? -1 : y === firstImg ? 1 : 0;
      });
    dispatch({ type: 'SET_FULL_IMGS', payload: imgs_clone });
    appvalue.loc.push(location.pathname);
    navigate('/full_image');
  };

  appvalue.goToPreview = (profile) => {
    dispatch({ type: 'SET_PROFILE', payload: profile });
    if (
      myProfile.viewUsers.find((obj) => obj === profile.userId)
      || profile.userId === userId
      || location.pathname === 'preview'
      || myProfile.subscriptions.find((obj) => obj === profile.userId)
    ) {
      appvalue.goToProfile(profile);
    } else {
      if (
        location.pathname !== `/user_profile/${profile.nickname}` &&
        location.pathname !== '/profile'
      ) {
        appvalue.loc.push(location.pathname);
        navigate('/preview');
      }
    }
  };

  appvalue.goToProfile = (profile) => {
    if (!myProfile.viewUsers.includes(profile.userId)) {
      myProfile.viewUsers.push(profile.userId)
    };
    profile.userId !== userId
      ? navigate(`/user_profile/${profile.nickname}`)
      : navigate('/profile');
  };

  appvalue.goBack = () => {
    appvalue.loc.length > 0 ? navigate(appvalue.loc.pop()) : appvalue.goHome();
    if (location.pathname === 'comments') {
      dispatch({ type: "GO_BACK_COMMENTS" });
    };
    if (location.pathname === '*') {
      navigate('/input');
    }
  };

  appvalue.goHome = () => {
    navigate('/');
  };

  appvalue.goInput = () => {
    navigate('/input');
  };

  appvalue.setUserProfileNewsware = (newswareItems) => {
    dispatch({ type: 'SET_USER_PROFILE_NEWSWARE', payload: newswareItems });
  };

  appvalue.setChatFilter = (filter) => {
    dispatch({ type: 'SET_CHAT_FILTER', payload: filter });
  };

  appvalue.setActiveGlobalSearch = (globalSearchName) =>{
    localStorage.setItem('activeGlobalSearch', JSON.stringify(globalSearchName));
    dispatch({type:'SET_ACTIVE_GLOBAL_SEARCH', payload:globalSearchName});
  };

  /*Эффекты приложения*/

  React.useEffect(() => {
    window.scrollTo(0, appvalue.scrollValue);
    dispatch({ type: 'CHANGE_PAGE', payload: location.pathname === '/' ? 'home' : location.pathname.substring(1) });
    if (location.pathname.includes('user_profile')) {
      const userNickname = location.pathname.split('/')[2];
      const userProfile = users_data.find((obj) => obj.nickname.toLowerCase() === userNickname.toLowerCase()) ?
        users_data.find((obj) => obj.nickname.toLowerCase() === userNickname.toLowerCase())
        : defaultUser;
      dispatch({ type: 'SET_PROFILE', payload: userProfile });
    }
  }, [location.pathname]);

  React.useEffect(() => {
    const onScroll = (e) => {
      if (e.target.documentElement.scrollTop !== 0)
        dispatch({ type: "SET_SCROLL_VALUE", payload: e.target.documentElement.scrollTop })
      try {
        localStorage.setItem('scrollValue', JSON.stringify(appvalue.scrollValue));
      } catch (err) {
        return undefined;
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [appvalue.scrollValue]);

  React.useEffect(() => {
    try {
      localStorage.setItem('profile', JSON.stringify(appvalue.profile));
      localStorage.setItem('commentNewswareId', JSON.stringify(appvalue.commentNewswareId));
      localStorage.setItem('fullImages', JSON.stringify(appvalue.fullImages));
    } catch (err) {
      return undefined;
    }
  }, [appvalue.profile, appvalue.commentNewswareId, appvalue.fullImages]);

  React.useEffect(() => {
    localStorage.setItem('activeChat', JSON.stringify(appvalue.chatFilter));
    dispatch({ type: 'SET_ACTIVE_CHATS', payload: chat_data.filter((chat) => chat.chatName === appvalue.chatFilter) });
  }, [appvalue.chatFilter]);

  return (
    <div className="App">
      <mainContext.Provider
        value={{
          ...appvalue,
          location,
          navigate,
          Conversion
        }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/full_image" element={<FullMode imgs={appvalue.fullImages} />} />
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
