import '../css/style.css';
import '../css/fontello.css';
import userSvg from '../img/user.svg';

const History = () => {
  return (
    <div className="history_card">
      <img className="user_icon" src={userSvg} alt="User Icon" />
      <div className="history_card_bottom"></div>
    </div>
  );
};

export default History;
