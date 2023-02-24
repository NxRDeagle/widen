import React from 'react';
import { Link } from 'react-router-dom';

import '../css/style.css';
import '../css/fontello.css';

import { mainContext } from '../App';

const Footer = () => {
  const { page, setPage } = React.useContext(mainContext);
  return (
    <footer className="foot_container">
      <ul
        className="nav_icon_items"
        onClick={(e) => {
          if (e.target.tagName !== 'I') {
            return;
          } else {
            setPage(e.target.closest('li').id);
          }
        }}>
        <Link to="/">
          <li id="home" className={page === 'home' ? 'icon_target' : ''}>
            <i className="icon-posts"></i>
          </li>
        </Link>
        <Link to="/friends">
          <li id="friends" className={page === 'friends' ? 'icon_target' : ''}>
            <i className="icon-friend"></i>
          </li>
        </Link>
        <Link to="/messenger">
          <li id="messenger" className={page === 'messenger' ? 'icon_target' : ''}>
            <i className="icon-messenger"></i>
          </li>
        </Link>
        <Link to="/help">
          <li id="help" className={page === 'help' ? 'icon_target' : ''}>
            <i className="icon-help"></i>
          </li>
        </Link>
        <Link to="/profile">
          <li id="profile" className={page === 'profile' ? 'icon_target' : ''}>
            <i className="icon-profile"></i>
          </li>
        </Link>
      </ul>
    </footer>
  );
};

export default Footer;
