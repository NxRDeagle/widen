import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Vacancies from '../pages/Vacancies';
import Messenger from '../pages/Messenger/Messenger';
import Forum from '../pages/Forum';
import Profile from '../pages/Profile/Profile';
import NotFound from '../pages/NotFound/NotFound';
import Comments from '../pages/Comments/Comments';
import FullMode from '../pages/FullMode';
import Complaint from '../pages/Complaint';
import Dialog from '../pages/Dialog';
import Authorisation from '../pages/Authorisation/Authorisation';

const Router = () => {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/comments" element={<Comments />} />
            {/* <Route path="/full_image" element={<FullMode imgs={appvalue.fullImages} index={appvalue.fullImgIndex} />} /> */}
            <Route path="/search" element={<Search />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/messenger" element={<Messenger />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/profile/:nickname" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/dialog" element={<Dialog />} />
            <Route path="/login" element={<Authorisation />} />
        </Routes>
    )
}

export default Router;