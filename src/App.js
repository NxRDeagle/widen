import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './css/App.css';
import './css/fontello.css';

import Home from './pages/Home';
import Search from './pages/Search';
import Vacancies from './pages/Vacancies';
import Messenger from './pages/Messenger';
import Help from './pages/Help';
import Profile from './pages/Profile';
import FullMode from './pages/FullMode';
import Comments from './pages/Comments';
import Preview from './pages/Preview';
import NotFound from './pages/NotFound';
import UserProfile from './pages/UserProfile';
import Input from './pages/Input';

export const mainContext = React.createContext();

export const userLogin = 'pupa_online';

function App() {
  const location = useLocation();

  const [currentFilter, setCurrentFilter] = React.useState('all');

  const savedScroll = localStorage.getItem('scrollValue');
  const savedProfile = localStorage.getItem('profile');
  const savedCommentPostId = localStorage.getItem('commentPostId');
  const savedFullImages = localStorage.getItem('fullImages');

  const [page, setPage] = React.useState(
    location.pathname === '/' ? 'home' : location.pathname.substring(1),
  );

  const [fullImages, setFullImages] = React.useState(
    savedFullImages === null
      ? ['https://picturesofmaidenhead.files.wordpress.com/2019/01/image-not-found.jpg']
      : JSON.parse(savedFullImages),
  );

  const [commentPostId, setCommentPostId] = React.useState(
    savedCommentPostId === null ? 0 : JSON.parse(savedCommentPostId),
  );

  const [profile, setProfile] = React.useState(
    savedProfile === null ? {} : JSON.parse(savedProfile),
  );

  React.useEffect(() => {
    try {
      const savedProfile = JSON.stringify(profile);
      localStorage.setItem('profile', savedProfile);
      const savedCommentPostId = JSON.stringify(commentPostId);
      localStorage.setItem('commentPostId', savedCommentPostId);
      const savedFullImages = JSON.stringify(fullImages);
      localStorage.setItem('fullImages', savedFullImages);
    } catch (err) {
      return undefined;
    }
  }, [profile, commentPostId, fullImages]);

  const [scrollValue, setScrollValue] = React.useState(
    savedScroll === null ? 0 : JSON.parse(savedScroll),
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
    if (
      location.pathname !== '/preview_user_profile' &&
      location.pathname !== '/comments' &&
      location.pathname !== '/full_image'
    )
      setLoc(location.pathname);
  }, [location.pathname]);

  const [loc, setLoc] = React.useState('/');

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
          commentPostId,
          setCommentPostId,
          currentFilter,
          setCurrentFilter,
          loc,
          setLoc,
        }}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile nickname={userLogin} />} />
          <Route path="/full_image" element={<FullMode imgs={fullImages} />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/preview_user_profile" element={<Preview {...profile} />} />
          <Route path="/user_profile/:nickname" element={<UserProfile />} />
          <Route path="/input" element={<Input />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </mainContext.Provider>
    </div>
  );
}

export default App;
