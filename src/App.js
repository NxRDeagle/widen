import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultAvatar from '../src/img/defaultAvatar.png';
import users_data from '../src/data/users_data.json';
import chat_data from '../src/data/chat_data.json';
import newsware_data from '../src/data/newsware_data.json';

import { GlobalStates } from './global_states/global_states';

import Modal from './global_components/modals/Modal';

import './css/App.css';
import './css/fontello.css';

import Router from './page_routes/Router';



import Footer from './components/Footer';
import ChatActions from './components/ChatActions';



localStorage.clear();

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
  const scrollValues = React.useRef(sessionStorage.getItem('scrollValue') ? JSON.parse(sessionStorage.getItem('scrollValue')) : []);
  const msgText = React.useRef(null);

  //Достаём работу с глобальными состояниями
  const globalStates = GlobalStates();
  const appvalue = globalStates.appvalue;
  const dispatch = globalStates.dispatch;


  //Статические функции приложения

  function currentTime(time) {
    if (time < 10) {
      return `0${time}`;
    }
    else {
      return time;
    }
  }


  function howLongHasItBeen(dispatchDate) {
    let nowDate = new Date();
    let howLong = {};
    howLong['inSeconds'] = Math.floor((nowDate.getTime() - dispatchDate.getTime()) / 1000);
    howLong['inMinutes'] = Math.floor((nowDate.getTime() - dispatchDate.getTime()) / 60000);
    if (howLong['inMinutes']) {
      howLong['inHours'] = Math.floor((nowDate.getTime() - dispatchDate.getTime()) / 3600000);
      if (howLong['inHours']) {
        howLong['inDays'] = Math.floor((nowDate.getTime() - dispatchDate.getTime()) / 86400000);
        if (howLong['inDays']) {
          howLong['inMonths'] = (nowDate.getMonth() + 12 * nowDate.getFullYear()) - (dispatchDate.getMonth() + 12 * dispatchDate.getFullYear());
          if (howLong['inMonths']) {
            howLong['inYears'] = nowDate.getFullYear() - dispatchDate.getFullYear();
            if (howLong['inYears']) {
              return howLong;
            }
            else {
              delete howLong['inYears'];
            }
          }
          else {
            delete howLong['inMonths'];
          }
        }
        else {
          delete howLong['inDays'];
        }
      }
      else {
        delete howLong['inHours'];
      }
    }
    else {
      delete howLong['inMinutes'];
    }
    return howLong;
  };

  function getSignMonth(monthNumber) {
    switch (monthNumber) {
      case 0:
        return 'янв.';
      case 1:
        return 'фев.';
      case 2:
        return 'мар.';
      case 3:
        return 'апр.';
      case 4:
        return 'мая';
      case 5:
        return 'июн.';
      case 6:
        return 'июл.';
      case 7:
        return 'авг.';
      case 8:
        return 'сен.';
      case 9:
        return 'окт.';
      case 10:
        return 'нояб.';
      case 11:
        return 'дек.';
      default:
        return;
    }
  };

  function Conversion(type, stats) {
    let element = null;
    switch (type) {
      case 'count':
        element =
          stats >= 1000000
            ? ((Math.floor((stats / 1000000) * 10) / 10) + 'm').replace('.', ',')
            : stats >= 1000
              ? ((Math.floor((stats / 1000) * 10) / 10) + 'k').replace('.', ',')
              : stats;
        break;
      case 'comments':
        element =
          stats % 10 === 1 && stats % 100 !== 1
            ? 'комментарий'
            : stats % 10 === 0 || stats % 10 >= 5 || stats % 100 === 1
              ? 'комментариев'
              : 'комментария';
        break;
      case 'conversation':
        element =
          stats % 10 === 1 && stats % 100 !== 1
            ? 'участник'
            : stats % 10 === 0 || stats % 10 >= 5 || stats % 100 === 1
              ? 'участников'
              : 'участника';
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
      case 'time':
        let howLong = howLongHasItBeen(stats);
        if (Object.keys(howLong).length === 6) {
          element = appvalue.page === 'messenger' ? `${stats.getFullYear()}г.` :
            `${stats.getDate()}${getSignMonth(stats.getMonth())} ${stats.getFullYear()}г. в ${currentTime(stats.getHours())}:${currentTime(stats.getMinutes())}`;
        }
        else if (Object.keys(howLong).length === 5) {
          element = appvalue.page === 'messenger' ? `${howLong['inMonths']}мес.` :
            `${stats.getDate()}${getSignMonth(stats.getMonth())} в ${currentTime(stats.getHours())}:${currentTime(stats.getMinutes())}`;
        }
        else if (Object.keys(howLong).length === 4) {
          element = appvalue.page === 'messenger' ? `${howLong['inDays']}д.` :
            `${stats.getDate()}${getSignMonth(stats.getMonth())} в ${currentTime(stats.getHours())}:${currentTime(stats.getMinutes())}`;
        }
        else if (Object.keys(howLong).length > 1) {
          element = `${currentTime(stats.getHours())}:${currentTime(stats.getMinutes())}`;
        }
        else {
          element = appvalue.page === 'messenger' ? element = `${howLong['inSeconds']}с.` : element = `${howLong['inSeconds']}сек. назад`;
        }
        break;
      case 'dialogReply':
        element = stats.length > 200 ? stats.substr(0, 197) + '...' : stats;
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

  /*Эффекты приложения*/

  React.useEffect(() => {

    appvalue.setFooterType(['/dialog', '/comments'].includes(location.pathname) ? 'text' : 'navigation');

    if (location.pathname !== '/dialog') {

      let scrollValue = scrollValues.current.find((scrollValue) => scrollValue.pathname === location.pathname);

      console.log(scrollValue);

      if (scrollValue) {
        window.scrollTo(0, scrollValue.scroll);
      } else {
        scrollValues.current.push({
          pathname: location.pathname,
          scroll: 0
        });
        window.scrollTo(0, 0);
      }
    }

    dispatch({ type: 'CHANGE_PAGE', payload: location.pathname === '/' ? 'home' : location.pathname.substring(1) });
    if (location.pathname.includes('profile')) {
      const userNickname = location.pathname.split('/')[2];
      const userProfile = users_data.find((obj) => obj.nickname === userNickname) ?
        users_data.find((obj) => obj.nickname === userNickname)
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
        sessionStorage.setItem('scrollValue', JSON.stringify(scrollValues.current));
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
          getUser,
          msgText
        }}>
        <Modal />
        <Router />
        {
          !['/login', '/full_image'].includes(location.pathname) && (
            <Footer />
          )
        }
      </mainContext.Provider>
    </>
  );
}

export default App;
