import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../css/style.css';
import '../css/fontello.css';

import { mainContext } from '../App';

const Footer = () => {
  const location = useLocation();
  const { page, setPage } = React.useContext(mainContext);

  return (
    <footer
      className={
        location.pathname === '/preview_user_profile'
          ? 'foot_notview foot_container'
          : 'foot_container'
      }>
      <ul
        className="nav_icon_items"
        onClick={(e) => {
          if (
            e.target.tagName !== 'I' &&
            e.target.tagName !== 'SVG' &&
            e.target.tagName !== 'PATH' &&
            console.log(`help page has been opened [${e.target.tagName}]`)
          ) {
            return;
          } else {
            setPage(e.target.closest('li').id);
          }
        }}>
        <Link to="/">
          <li
            id="home"
            className={page === 'home' ? 'icon_target' : ''}
            onClick={() => {
              if (location.pathname === '/') window.scrollTo(0, 0);
            }}>
            <i className="icon-posts"></i>
          </li>
        </Link>
        <Link to="/vacancies">
          <li id="vacancies" className={page === 'vacancies' ? 'icon_target' : ''}>
            <i className="icon-vacancies"></i>
          </li>
        </Link>
        <Link to="/messenger">
          <li id="messenger" className={page === 'messenger' ? 'icon_target' : ''}>
            <i className="icon-messenger"></i>
          </li>
        </Link>
        <Link to="/help">
          <li id="help" className={page === 'help' ? 'icon_target' : ''}>
            <i>
              <svg width="35" height="25" viewBox="0 0 35 25" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.6889 17.9241C16.3571 17.9622 16.0235 17.9813 15.6896 17.9812H10.5V22.3214C10.5 22.3214 9.79475 22.1759 8.75 21.7652C5.76275 20.5929 0 17.2589 0 8.99107C0 4.02679 3.9445 0 8.81125 0H15.6888C19.9342 0 23.4789 3.06339 24.3136 7.14286H27.9519C29.8212 7.14309 31.6139 7.90102 32.9357 9.24991C34.2575 10.5988 35 12.4282 35 14.3357C35 20.8348 29.9005 23.5232 27.125 24.5045C26.0881 24.8714 25.375 25 25.375 25V21.5277H22.799C21.5599 21.5288 20.3424 21.1961 19.2696 20.5634C18.1967 19.9307 17.3065 19.0203 16.6889 17.9241ZM8.75 16.1955V19.8339C7.87811 19.4438 7.04874 18.9614 6.2755 18.3946C4.00925 16.7223 1.75 13.8875 1.75 8.99018C1.75023 7.07935 2.49429 5.24687 3.8185 3.8958C5.14272 2.54473 6.93864 1.78571 8.81125 1.78571H15.6888C17.4898 1.78574 19.2229 2.48806 20.5332 3.74897C21.8435 5.00987 22.6322 6.73406 22.7378 8.56875C22.6753 9.80484 22.3629 11.0144 21.8202 12.1213C21.2775 13.2283 20.5162 14.2087 19.5842 15.0009C18.4298 15.782 17.0748 16.1976 15.6896 16.1955H8.75ZM20.6281 16.4366C20.0258 16.9402 19.3708 17.3744 18.6751 17.7312C19.1715 18.3597 19.7996 18.8665 20.5133 19.2145C21.227 19.5625 22.008 19.7427 22.799 19.742H27.125V22.6C27.8662 22.3032 28.5788 21.937 29.2539 21.5063C31.325 20.1714 33.25 18.0036 33.25 14.3357C33.25 12.9018 32.6918 11.5266 31.6983 10.5126C30.7047 9.49859 29.3571 8.92881 27.9519 8.92857H24.5V8.99107C24.5 12.0884 22.9644 14.8196 20.6281 16.4366Z"
                  fill="black"
                />
                <path
                  d="M10.821 10.841C10.821 10.5377 10.8687 10.269 10.964 10.035C11.068 9.801 11.1937 9.593 11.341 9.411C11.497 9.229 11.6617 9.06 11.835 8.904C12.0083 8.748 12.1687 8.60067 12.316 8.462C12.472 8.31467 12.5977 8.163 12.693 8.007C12.797 7.851 12.849 7.67767 12.849 7.487C12.849 7.175 12.719 6.92367 12.459 6.733C12.2077 6.54233 11.8697 6.447 11.445 6.447C11.0377 6.447 10.6737 6.53367 10.353 6.707C10.0323 6.87167 9.768 7.10567 9.56 7.409L7.987 6.486C8.33367 5.95733 8.81467 5.537 9.43 5.225C10.0453 4.90433 10.7907 4.744 11.666 4.744C12.316 4.744 12.888 4.83933 13.382 5.03C13.876 5.212 14.2617 5.48067 14.539 5.836C14.825 6.19133 14.968 6.629 14.968 7.149C14.968 7.487 14.916 7.786 14.812 8.046C14.708 8.306 14.5737 8.53133 14.409 8.722C14.2443 8.91267 14.0667 9.09033 13.876 9.255C13.694 9.41967 13.5207 9.58 13.356 9.736C13.1913 9.892 13.0527 10.0567 12.94 10.23C12.836 10.4033 12.784 10.607 12.784 10.841H10.821ZM11.809 14.104C11.445 14.104 11.146 13.987 10.912 13.753C10.678 13.519 10.561 13.2417 10.561 12.921C10.561 12.5917 10.678 12.3187 10.912 12.102C11.146 11.8767 11.445 11.764 11.809 11.764C12.1817 11.764 12.4807 11.8767 12.706 12.102C12.94 12.3187 13.057 12.5917 13.057 12.921C13.057 13.2417 12.94 13.519 12.706 13.753C12.4807 13.987 12.1817 14.104 11.809 14.104Z"
                  fill="black"
                />
              </svg>
            </i>
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
