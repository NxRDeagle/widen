import '../css/style.css';
import '../css/fontello.css';

const History = ({ isView, avatar, nickname = 'ANONIM' }) => {
  return (
    <div className="user_history_box">
      <div className={isView ? 'view' : 'not_view'}>
        <div className="user_history_avatar">
          {avatar ? (
            <img className="avatar_picture" src={avatar} />
          ) : (
            <i className="icon-profile none_picture"></i>
          )}
        </div>
      </div>
      <p className="user_history_nickname">{nickname}</p>
    </div>
  );
};

export default History;
