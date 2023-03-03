import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './css/style.css';
import './css/fontello.css';

import Home from './pages/Home';
import Search from './pages/Search';
import Friends from './pages/Friends';
import Messenger from './pages/Messenger';
import Help from './pages/Help';
import Profile from './pages/Profile';
import FullMode from './pages/FullMode';
import Comments from './pages/Comments';
import Preview from './components/Preview';
import NotFound from './pages/NotFound';

export const mainContext = React.createContext();

function App() {
  const location = useLocation();

  const defaultProfileSettings = {
    nickname: 'TEST',
    avatar: 'https://vraki.net/sites/default/files/inline/images/10_342.jpg',
    role: 'Дизайнер',
    subscriptions: '10',
    subs: '11k',
    idea: 'uri aliquam beatae a accusamus aliastium, neque quibusdam pariatur beatae minus expedita. Totam aliquid id impedit culpa.',
  };

  const [page, setPage] = React.useState(
    location.pathname === '/' ? 'home' : location.pathname.substring(1),
  );
  const [fullImages, setFullImages] = React.useState([
    'https://picturesofmaidenhead.files.wordpress.com/2019/01/image-not-found.jpg',
  ]);
  const [profile, setProfile] = React.useState({ ...defaultProfileSettings });
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
          <Route path="/friends" element={<Friends />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/full_image" element={<FullMode imgs={fullImages} />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/user_profile" element={<Preview {...profile} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </mainContext.Provider>
    </div>
  );
}

export default App;
