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

export const mainContext = React.createContext();

function App() {
  const location = useLocation();
  const [page, setPage] = React.useState(
    location.pathname === '/' ? 'home' : location.pathname.substring(1),
  );
  const [fullImages, setFullImages] = React.useState([
    'https://picturesofmaidenhead.files.wordpress.com/2019/01/image-not-found.jpg',
  ]);

  return (
    <div className="App">
      <mainContext.Provider value={{ page, setPage, fullImages, setFullImages }}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/full_image" element={<FullMode imgs={fullImages} />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </mainContext.Provider>
    </div>
  );
}

export default App;
