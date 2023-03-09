import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './css/style.css';
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

export const mainContext = React.createContext();

function App() {
  const location = useLocation();

  const [page, setPage] = React.useState(
    location.pathname === '/' ? 'home' : location.pathname.substring(1),
  );
  const [fullImages, setFullImages] = React.useState([
    'https://picturesofmaidenhead.files.wordpress.com/2019/01/image-not-found.jpg',
  ]);
  const [profile, setProfile] = React.useState({});
  const [commentPostId, setCommentPostId] = React.useState(0);

  const savedScroll = localStorage.getItem('scrollValue');
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
  }, [location.pathname]);

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
        }}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/full_image" element={<FullMode imgs={fullImages} />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/preview_user_profile" element={<Preview {...profile} />} />
          <Route path="/user_profile/:nickname" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </mainContext.Provider>
    </div>
  );
}

export default App;
