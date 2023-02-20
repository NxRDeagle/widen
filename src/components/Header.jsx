import '../css/style.css';
import '../css/fontello.css';
import logoPng from '../img/logo.png';

import History from './History';

const Header = () => {
  return (
    <header className="head_container">
      <div className="logo_box">
        <img className="logo" src={logoPng} alt="logo" />
        <i className="icon-search search"></i>
      </div>
      <div className="history_box">
        {<History />}
        {<History />}
        {<History />}
      </div>
      <div className="line"></div>
    </header>
  );
};

export default Header;
