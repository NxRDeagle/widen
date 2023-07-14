import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Header.css';
import addHistory from '../img/addHistory.svg';

import { mainContext } from '../App';

import History from './History';

const Header = () => {
  const { isNewswareFilterOpen, location, onClickHeaderFilter, setIsNewswareFilterOpen } =
    React.useContext(mainContext);

  return (
    <header className="head_container">
      <div className="logo_box">
        <div className="logo_item">
          <svg
            width="113"
            height="29"
            viewBox="0 0 113 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.99 11.45H15.07V15.35H4.99V11.45ZM5.35 23H0.49V2H16.36V5.9H5.35V23ZM19.3202 23V0.739999H24.0002V23H19.3202ZM28.3436 23V0.739999H33.0236V23H28.3436ZM44.177 23.24C42.837 23.24 41.637 22.98 40.577 22.46C39.537 21.94 38.727 21.15 38.147 20.09C37.567 19.01 37.277 17.64 37.277 15.98V6.86H41.957V15.29C41.957 16.63 42.237 17.62 42.797 18.26C43.377 18.88 44.187 19.19 45.227 19.19C45.947 19.19 46.587 19.04 47.147 18.74C47.707 18.42 48.147 17.94 48.467 17.3C48.787 16.64 48.947 15.82 48.947 14.84V6.86H53.627V23H49.187V18.56L49.997 19.85C49.457 20.97 48.657 21.82 47.597 22.4C46.557 22.96 45.417 23.24 44.177 23.24ZM67.5027 23.24C66.1427 23.24 64.9527 22.94 63.9327 22.34C62.9127 21.74 62.1127 20.83 61.5327 19.61C60.9727 18.37 60.6927 16.81 60.6927 14.93C60.6927 13.03 60.9627 11.47 61.5027 10.25C62.0427 9.03 62.8227 8.12 63.8427 7.52C64.8627 6.92 66.0827 6.62 67.5027 6.62C69.0227 6.62 70.3827 6.97 71.5827 7.67C72.8027 8.35 73.7627 9.31 74.4627 10.55C75.1827 11.79 75.5427 13.25 75.5427 14.93C75.5427 16.63 75.1827 18.1 74.4627 19.34C73.7627 20.58 72.8027 21.54 71.5827 22.22C70.3827 22.9 69.0227 23.24 67.5027 23.24ZM57.9627 28.82V6.86H62.4327V10.16L62.3427 14.96L62.6427 19.73V28.82H57.9627ZM66.6927 19.4C67.4727 19.4 68.1627 19.22 68.7627 18.86C69.3827 18.5 69.8727 17.99 70.2327 17.33C70.6127 16.65 70.8027 15.85 70.8027 14.93C70.8027 13.99 70.6127 13.19 70.2327 12.53C69.8727 11.87 69.3827 11.36 68.7627 11C68.1627 10.64 67.4727 10.46 66.6927 10.46C65.9127 10.46 65.2127 10.64 64.5927 11C63.9727 11.36 63.4827 11.87 63.1227 12.53C62.7627 13.19 62.5827 13.99 62.5827 14.93C62.5827 15.85 62.7627 16.65 63.1227 17.33C63.4827 17.99 63.9727 18.5 64.5927 18.86C65.2127 19.22 65.9127 19.4 66.6927 19.4ZM88.2156 23.24C86.8556 23.24 85.6656 22.94 84.6456 22.34C83.6256 21.74 82.8256 20.83 82.2456 19.61C81.6856 18.37 81.4056 16.81 81.4056 14.93C81.4056 13.03 81.6756 11.47 82.2156 10.25C82.7556 9.03 83.5356 8.12 84.5556 7.52C85.5756 6.92 86.7956 6.62 88.2156 6.62C89.7356 6.62 91.0956 6.97 92.2956 7.67C93.5156 8.35 94.4756 9.31 95.1756 10.55C95.8956 11.79 96.2556 13.25 96.2556 14.93C96.2556 16.63 95.8956 18.1 95.1756 19.34C94.4756 20.58 93.5156 21.54 92.2956 22.22C91.0956 22.9 89.7356 23.24 88.2156 23.24ZM78.6756 28.82V6.86H83.1456V10.16L83.0556 14.96L83.3556 19.73V28.82H78.6756ZM87.4056 19.4C88.1856 19.4 88.8756 19.22 89.4756 18.86C90.0956 18.5 90.5856 17.99 90.9456 17.33C91.3256 16.65 91.5156 15.85 91.5156 14.93C91.5156 13.99 91.3256 13.19 90.9456 12.53C90.5856 11.87 90.0956 11.36 89.4756 11C88.8756 10.64 88.1856 10.46 87.4056 10.46C86.6256 10.46 85.9256 10.64 85.3056 11C84.6856 11.36 84.1956 11.87 83.8356 12.53C83.4756 13.19 83.2956 13.99 83.2956 14.93C83.2956 15.85 83.4756 16.65 83.8356 17.33C84.1956 17.99 84.6856 18.5 85.3056 18.86C85.9256 19.22 86.6256 19.4 87.4056 19.4ZM104.819 23.24C103.439 23.24 102.109 23.08 100.829 22.76C99.5685 22.42 98.5685 22 97.8285 21.5L99.3885 18.14C100.129 18.6 100.999 18.98 101.999 19.28C103.019 19.56 104.019 19.7 104.999 19.7C106.079 19.7 106.839 19.57 107.279 19.31C107.739 19.05 107.969 18.69 107.969 18.23C107.969 17.85 107.789 17.57 107.429 17.39C107.089 17.19 106.629 17.04 106.049 16.94C105.469 16.84 104.829 16.74 104.129 16.64C103.449 16.54 102.759 16.41 102.059 16.25C101.359 16.07 100.719 15.81 100.139 15.47C99.5585 15.13 99.0885 14.67 98.7285 14.09C98.3885 13.51 98.2185 12.76 98.2185 11.84C98.2185 10.82 98.5085 9.92 99.0885 9.14C99.6885 8.36 100.549 7.75 101.669 7.31C102.789 6.85 104.129 6.62 105.689 6.62C106.789 6.62 107.909 6.74 109.049 6.98C110.189 7.22 111.139 7.57 111.899 8.03L110.339 11.36C109.559 10.9 108.769 10.59 107.969 10.43C107.189 10.25 106.429 10.16 105.689 10.16C104.649 10.16 103.889 10.3 103.409 10.58C102.929 10.86 102.689 11.22 102.689 11.66C102.689 12.06 102.859 12.36 103.199 12.56C103.559 12.76 104.029 12.92 104.609 13.04C105.189 13.16 105.819 13.27 106.499 13.37C107.199 13.45 107.899 13.58 108.599 13.76C109.299 13.94 109.929 14.2 110.489 14.54C111.069 14.86 111.539 15.31 111.899 15.89C112.259 16.45 112.439 17.19 112.439 18.11C112.439 19.11 112.139 20 111.539 20.78C110.939 21.54 110.069 22.14 108.929 22.58C107.809 23.02 106.439 23.24 104.819 23.24Z"
              fill="black"
            />
          </svg>
          <i
            className={isNewswareFilterOpen ? 'icon-down-open' : 'icon-up-open'}
            onClick={() => {
              setIsNewswareFilterOpen();
            }}></i>
        </div>
        <div
          className={
            isNewswareFilterOpen ? 'filter_post_box filter_post_box_open' : 'filter_post_box'
          }>
          <div onClick={() => onClickHeaderFilter('case')} className="filter_post_item">
            <p>Кейсы</p>
            <div className="filter_line"></div>
          </div>
          <div onClick={() => onClickHeaderFilter('post')} className="filter_post_item">
            <p>Посты</p>
            <div className="filter_line"></div>
          </div>
          <div onClick={() => onClickHeaderFilter('all')} className="filter_post_item">
            <p>Всё вместе</p>
          </div>
        </div>

        {location.pathname !== '/search' ? (
          <Link className="icon-search search" to="/search">
            <i></i>
          </Link>
        ) : (
          <i className="icon-search search"></i>
        )}
      </div>
      <div className="history_container">
        <div className="user_history_box">
          <div className="user_history_add">
            <img src={addHistory} alt="Add History" />
            {/* <span className="line_plus_horizontal"></span>
            <span className="line_plus_vertical"></span> */}
          </div>
        </div>
        {[...new Array(15)].map((_, index) => {
          return <History key={index} />;
        })}
      </div>
      <div className="line"></div>
    </header>
  );
};

export default Header;
