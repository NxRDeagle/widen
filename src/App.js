import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import Complaint from './pages/Complaint';
import Footer from './components/Footer';
import Dialog from './pages/Dialog';

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
  subscriptions: [],
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
  tabsName: ['Все чаты'],
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
  companionsId: [],
  tabsName: [],
  conversationName: "",
  conversationAvatar: "",
  fullStatus: '',
  messages: [],
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


function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const scrollValues = React.useRef(localStorage.getItem('scrollValue') ? JSON.parse(localStorage.getItem('scrollValue')) : []);


  //Статические функции приложения

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
          stats % 10 === 1 && stats % 100 !== 11
            ? 'комментарий'
            : stats % 10 === 0 || stats % 10 >= 5 || stats % 100 === 11
              ? 'комментариев'
              : 'комментария';
        break;
      case 'previewIdea':
        element = stats.length > 200 ? stats.substr(0, 200) + '...' : stats;
        break;
      case 'chatText':
        element = stats.length > 25 ? stats.substr(0, 22) + '...' : stats;
        break;
      case 'profileIdea':
        element = stats.length > 180;
        break;
      case 'previewSign':
        element = {
          large: stats.length > 180,
          sign: stats.length > 180 ? stats.substr(0, 177) + '...' : stats
        };
        break;
      case 'chatUnreadCount':
        element = stats.length > 100 ? '100+' : stats.length;
        break;
      default:
        return element;
    }
    return element;
  }

  function OtherGlobalFilterHandler(tags, tagsFilter) {
    if (!tagsFilter.length) {
      return true;
    }
    for (let tag of tagsFilter) {
      if (tags.includes(tag)) {
        return true;
      }
    }
    return false;
  }

  function EventGlobalFilterHandler(eventTags, globalFilters) {
    for (const [key, value] of Object.entries(globalFilters)) {
      if (!value.length) {
        continue;
      }
      else {
        for (let index = 0; index < eventTags[key].length; index++) {
          if (value.includes(eventTags[key][index])) {
            break;
          }
          if (index === eventTags[key].length - 1) {
            return false;
          }
        }
      }
    }
    return true;
  };

  function ColorClick(element, classElement) {
    element.classList.contains(classElement) ?
      element.classList.toggle('color_click') :
      element.closest(`.${classElement}`).classList.toggle('color_click')
  };

  function getAllActiveChats() {
    const activeChats = {};
    (users_data.find((obj) => obj.userId === userId) ? users_data.find((obj) => obj.userId === userId) : defaultUser)
      .tabsName.forEach((tabName) => activeChats[tabName] = chat_data.filter((chat) => chat.tabsName.includes(tabName)));
    activeChats['Все чаты'] = chat_data;
    return activeChats;
  };

  function getUser(userId) {
    return users_data.find((user) => user.userId === userId) ? users_data.find((user) => user.userId === userId) : defaultUser;
  };


  /*Стейты Приложения*/

  const appState = {
    currentNewswareFilter: 'all',
    isNewswareFilterOpen: false,
    page: location.pathname === '/' ? 'home' : location.pathname.substring(1),
    fullImages: [''],
    fullImgIndex: 0,
    commentNewswareId: localStorage.getItem('commentNewswareId') ? JSON.parse(localStorage.getItem('commentNewswareId')) : 0,
    myProfile: users_data.find((obj) => obj.userId === userId) ? users_data.find((obj) => obj.userId === userId) : defaultUser,
    userProfile: localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : defaultUser,
    messageText: '',
    userProfileNewswareItems: [],
    chatFilter: localStorage.getItem('activeChat') ? JSON.parse(localStorage.getItem('activeChat')) : 'Все чаты',
    activeChats: getAllActiveChats(),
    activeGlobalSearch: localStorage.getItem('activeGlobalSearch') ? JSON.parse(localStorage.getItem('activeGlobalSearch')) : 'globalCase',
    globalPosts: [],
    globalCases: [],
    globalRisingStars: [],
    globalSharks: [],
    globalEvents: [],
    globalFilters: {
      tags: [],
      forms: [],
      formats: [],
      cities: []
    },
    confirmationOpen: false,
    confirmSign: '',
    whatConfirm: '',
    confirmationFirstOption: '',
    confirmationSecondOption: '',
    clickChat: localStorage.getItem('clickChat') ? JSON.parse(localStorage.getItem('clickChat')) : defaultChat,
    chatActionsOpen: false
  };


  const [appvalue, dispatch] = React.useReducer(reducer, appState);

  appvalue.onClickHeaderFilter = (filter = 'all') => {
    dispatch({ type: 'CLICK_HEADER_FILTER', payload: filter });
  };

  appvalue.setIsNewswareFilterOpen = () => {
    dispatch({ type: 'SET_NEWSWARE_FILTER_OPEN' });
  };

  appvalue.setMessageText = (text = '') => {
    dispatch({ type: 'SET_MESSAGE_TEXT', payload: text });
  };

  appvalue.goToComments = (newswareId = 0) => {
    dispatch({ type: 'GO_TO_COMMENTS', payload: newswareId });
    navigate('/comments');
  };

  appvalue.goToFullMode = (imgs = [], index = 0) => {
    dispatch({ type: 'SET_FULL_IMGS', payload: { imgs: imgs, index: index } });
    navigate('/full_image');
  };

  appvalue.goToPreview = (userProfile = defaultUser) => {
    dispatch({ type: 'SET_PROFILE', payload: userProfile });
    if (
      appvalue.myProfile.viewUsers.find((obj) => obj === userProfile.userId)
      || userProfile.userId === userId
      || location.pathname === 'preview'
      || appvalue.myProfile.subscriptions.find((obj) => obj === userProfile.userId)
    ) {
      appvalue.goToProfile(userProfile);
    } else {
      if (
        location.pathname !== `/user_profile/${userProfile.nickname}` &&
        location.pathname !== '/profile'
      ) {
        navigate('/preview');
      }
    }
  };

  appvalue.goToProfile = (userProfile = defaultUser) => {
    appvalue.editMyProfile(userProfile.userId, 'viewUsers');
    userProfile.userId !== userId
      ? navigate(`/user_profile/${userProfile.nickname}`)
      : navigate('/profile');
  };

  appvalue.goBack = () => {
    navigate(-1);
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

  appvalue.setUserProfileNewsware = (newswareItems = []) => {
    dispatch({ type: 'SET_USER_PROFILE_NEWSWARE', payload: newswareItems });
  };

  appvalue.setChatFilter = (filter = 'Все чаты') => {
    dispatch({ type: 'SET_CHAT_FILTER', payload: filter });
  };

  appvalue.setActiveGlobalSearch = (globalSearchName = 'globalCase') => {
    localStorage.setItem('activeGlobalSearch', JSON.stringify(globalSearchName));
    dispatch({ type: 'SET_ACTIVE_GLOBAL_SEARCH', payload: globalSearchName });
  };

  appvalue.clickGlobalFilter = (globalSearchName = 'globalCase', filterSign = '', objGlobalFilter = 'tag') => {
    appvalue.setActiveGlobalSearch(globalSearchName);
    switch (objGlobalFilter) {
      case 'tag':
        if (!appvalue.globalFilters.tags.includes(filterSign)) {
          appvalue.globalFilters.tags.push(filterSign);
        };
        break;
      case 'form':
        if (!appvalue.globalFilters.forms.includes(filterSign)) {
          appvalue.globalFilters.forms.push(filterSign);
        };
        break;
      case 'format':
        if (!appvalue.globalFilters.formats.includes(filterSign)) {
          appvalue.globalFilters.formats.push(filterSign);
        };
        break;
      case 'city':
        if (!appvalue.globalFilters.cities.includes(filterSign)) {
          appvalue.globalFilters.cities.push(filterSign);
        };
        break;
      default:
        return;
    };
    navigate("/search");
  };

  appvalue.addGlobalFilter = (category = '', globalFilter = '') => {
    dispatch({ type: "ADD_GLOBAL_FILTER", payload: { category: category, globalFilter: globalFilter } });
  };

  appvalue.dropGlobalFilter = (category = '', globalFilter = '') => {
    dispatch({ type: "DROP_GLOBAL_FILTER", payload: { category: category, globalFilter: globalFilter } });
  };

  appvalue.dropGlobalFilters = () => {
    dispatch({ type: 'CLEAR_GLOBAL_FILTERS' });
  };

  appvalue.setConfirmation = (confirmSign = '', whatConfirm = '', confirmationFirstOption = '', confirmationSecondOption = '' ) => {
    dispatch({ type: 'SET_CONFIRMATION_OPEN', payload: { confirmSign: confirmSign, whatConfirm: whatConfirm, confirmationFirstOption: confirmationFirstOption, confirmationSecondOption: confirmationSecondOption } });
  };

  appvalue.setClickChat = (clickChat = defaultChat) => {
    localStorage.setItem('clickChat', JSON.stringify(clickChat));
    dispatch({ type: 'SET_CLICK_CHAT', payload: clickChat });
  };

  appvalue.setChatActions = () => {
    dispatch({ type: 'SET_CHAT_ACTIONS'})
  };

  appvalue.deleteActiveChatsTab = (tabName = 'Все чаты') => {
    delete appvalue.activeChats[tabName];
    appvalue.setChatFilter();
  };

  appvalue.alreadyTabEditor = (tabsName = 'Все чаты', activeTab = 'Все чаты', activeChatsTab = []) => {
    const newActiveChats = {};
    tabsName.forEach((tabName) => {
      newActiveChats[tabName] = tabName === activeTab ?
        activeChatsTab :
        appvalue.activeChats[tabName] ?
          appvalue.activeChats[tabName] :
          [];
    });
    dispatch({ type: 'EDITED_CHATS', payload: newActiveChats });
    appvalue.setChatFilter(activeTab);
  };

  appvalue.editedChats = (newChat = defaultChat, clickChatId = appvalue.clickChat.chatId ) => {
    appvalue.setClickChat(newChat);
    const newActiveChats = {};
    Object.keys(appvalue.activeChats).forEach((tabName) => {
      if (newChat) {
        newActiveChats[tabName] = appvalue.activeChats[tabName].map((chat) => {
          return chat.chatId === clickChatId ? newChat : chat;
        });
      } else {
        newActiveChats[tabName] = appvalue.activeChats[tabName].filter((chat) => {
          return chat.chatId !== clickChatId;
        });
      }
    });
    dispatch({ type: 'EDITED_CHATS', payload: newActiveChats });
  };

  appvalue.editMyProfile = (itemId = 0, actionWithMyProfile = '') => {
    switch (actionWithMyProfile) {
      case 'subcriptions':
        dispatch({
          type: 'EDIT_MY_PROFILE', payload: {
            ...appvalue.myProfile,
            subscriptions: appvalue.myProfile.subscriptions.includes(itemId) ?
              appvalue.myProfile.subscriptions.filter((subscription) => subscription !== itemId) :
              [...appvalue.myProfile.subscriptions, itemId]
          }
        });
        break;
      case 'viewUsers':
        if (!appvalue.myProfile.viewUsers.includes(itemId)) {
          appvalue.myProfile.viewUsers.push(itemId)
        };
        break;
      default:
        return;
    }
  };



  /*Эффекты приложения*/

  React.useEffect(() => {

    let scrollValue = scrollValues.current.find((scrollValue) => scrollValue.pathname === location.pathname);

    if (scrollValue) {
      window.scrollTo(0, +scrollValue.scroll);
    } else {
      scrollValues.current.push({
        pathname: location.pathname,
        scroll: 0
      });
      window.scrollTo(0, 0);
    }

    dispatch({ type: 'CHANGE_PAGE', payload: location.pathname === '/' ? 'home' : location.pathname.substring(1) });
    if (location.pathname.includes('user_profile')) {
      const userNickname = location.pathname.split('/')[2];
      const userProfile = users_data.find((obj) => obj.nickname.toLowerCase() === userNickname.toLowerCase()) ?
        users_data.find((obj) => obj.nickname.toLowerCase() === userNickname.toLowerCase())
        : defaultUser;
      dispatch({ type: 'SET_PROFILE', payload: userProfile });
    };
    if (location.pathname === '/') {
      dispatch({ type: 'CLEAR_GLOBAL_FILTERS' });
    };
  }, [location.pathname]);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.scrollY !== 0) {
        scrollValues.current = scrollValues.current.map(((scrollValue) => { return scrollValue.pathname === location.pathname ? { ...scrollValue, scroll: +window.scrollY } : scrollValue }))
      };
      try {
        localStorage.setItem('scrollValue', JSON.stringify(scrollValues.current));
      } catch (err) {
        return undefined;
      };
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollValues.current]);

  React.useEffect(() => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(appvalue.userProfile));
      localStorage.setItem('commentNewswareId', JSON.stringify(appvalue.commentNewswareId));
      localStorage.setItem('fullImages', JSON.stringify(appvalue.fullImages));
    } catch (err) {
      return undefined;
    }
  }, [appvalue.userProfile, appvalue.commentNewswareId, appvalue.fullImages]);

  React.useEffect(() => {
    localStorage.setItem('activeChat', JSON.stringify(appvalue.chatFilter));
  }, [appvalue.chatFilter]);

  return (
    <>
      <mainContext.Provider
        value={{
          ...appvalue,
          location,
          navigate,
          Conversion,
          OtherGlobalFilterHandler,
          EventGlobalFilterHandler,
          ColorClick,
          getUser
        }}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/full_image" element={<FullMode imgs={appvalue.fullImages} index={appvalue.fullImgIndex} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user_profile/:nickname" element={<UserProfile />} />
          <Route path="/input" element={<Input />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/dialog" element={<Dialog />} />
        </Routes>
        {
          !['/input', '/full_image'].includes(location.pathname) && (
            <Footer />
          )
        }
      </mainContext.Provider>
    </>
  );
}

export default App;
