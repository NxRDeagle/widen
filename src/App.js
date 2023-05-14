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
import NotFound from './pages/NotFound';
import UserProfile from './pages/UserProfile';
import Input from './pages/Input';

import ChooseInterest from './pages/ChooseInterest';
import WhoAreYou from './pages/WhoAreYou';
import MoreInterests from './pages/MoreInterests';
import Start from './pages/Start';

export const mainContext = React.createContext();

export const userLogin = 'pupa_online';

function App() {
  const location = useLocation();

  const [currentFilter, setCurrentFilter] = React.useState('all');

  const [local, setLocal] = React.useState({
    savedScroll: localStorage.getItem('scrollValue'),
    savedProfile: localStorage.getItem('profile'),
    savedCommentPostId: localStorage.getItem('commentPostId'),
  });

  const [page, setPage] = React.useState(
    location.pathname === '/' ? 'home' : location.pathname.substring(1),
  );

  const [fullImages, setFullImages] = React.useState(['']);

  const [commentPostId, setCommentPostId] = React.useState(
    local.savedCommentPostId === null ? 0 : JSON.parse(local.savedCommentPostId),
  );

  const [profile, setProfile] = React.useState(
    local.savedProfile === null ? {} : JSON.parse(local.savedProfile),
  );

  const [stateFull, setStateFull] = React.useState({
    openComments: false,
    openPreview: false,
    openImage: false,
  });

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
  }, [stateFull.openComments, stateFull.openPreview, stateFull.openImage]);

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
          stateFull,
          setStateFull,
        }}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile nickname={userLogin} />} />
          <Route path="/user_profile/:nickname" element={<UserProfile />} />
          <Route path="/input" element={<Input />} />
          <Route path="/1" element={<ChooseInterest />} />
          <Route path="/2" element={<WhoAreYou />} />
          <Route path="/3" element={<MoreInterests />} />
          <Route path="/4" element={<Start />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </mainContext.Provider>
    </div>
  );
}

export default App;
