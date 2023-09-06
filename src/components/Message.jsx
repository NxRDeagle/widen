import users_data from '../data/users_data.json';
import React from 'react';

import { defaultUser, mainContext, userId } from '../App';

const Message = (props) => {
  const { messages, conversationAvatar, conversationName, companionsId } = props;

  const { Conversion, setDialogInfo, navigate } = React.useContext(mainContext);

  /*Объект последнего сообщения*/
  const Message = messages.length
    ? messages[messages.length - 1]
    : {
        companionId: 1,
        message: conversationName ? 'Начните беседу' : 'Начните чат',
        status: 'read',
        time: '14:12',
      };

  const countUnread = Conversion(
    'chatUnreadCount',
    messages.filter((item) => item.status === 'unread'),
  );
  const companion = users_data.find(
    (obj) =>
      obj.userId === (Message.companionId === userId ? companionsId[0] : Message.companionId),
  )
    ? users_data.find(
        (obj) =>
          obj.userId === (Message.companionId === userId ? companionsId[0] : Message.companionId),
      )
    : defaultUser;

  const goToDialog = () => {
    setDialogInfo(companion.nickname, conversationName, conversationAvatar);
    navigate('/dialog');
  };

  return (
    <div
      className="chat_box"
      onClick={() => {
        goToDialog();
      }}>
      <div className="chat_user_avatar_box">
        <img
          className="avatar_picture"
          src={conversationAvatar ? conversationAvatar : companion.avatar}
          alt={conversationName ? conversationName : companion.nickname}
        />
      </div>

      <div className="chat_user_sign_box">
        <p className="chat_user_nickname">
          {conversationName ? conversationName : companion.nickname}
        </p>
        <p
          data-content={Message.companionId === userId ? 'Вы: ' : `${companion.nickname}: `}
          className={
            (Message.companionId === userId || conversationName) && messages.length
              ? 'chat_user_message whose_message'
              : 'chat_user_message'
          }>
          {Conversion('chatText', Message.message)}
        </p>
      </div>

      {messages.length > 0 && (
        <div className="chat_status_box">
          {Message.companionId !== userId && Message.status === 'read' ? <div></div> : null}

          {Message.companionId !== userId && Message.status === 'unread' ? (
            <div className="not_view_message chat_active">
              <p>{countUnread}</p>
            </div>
          ) : null}

          {Message.companionId === userId && Message.status === 'unread' ? (
            <svg
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 0.775862L3.76814 10L0 5.18966L0.608856 4.41379L3.76814 8.43103L10.3911 0L11 0.775862Z"
                fill="#7E52EE"
              />
            </svg>
          ) : null}

          {Message.companionId === userId && Message.status === 'read' ? (
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 0.775862L8.76814 10L5 5.18966L5.60886 4.41379L8.76814 8.43103L15.3911 0L16 0.775862Z"
                fill="#7E52EE"
              />
              <path
                d="M11 0.775862L3.76814 10L0 5.18966L0.608856 4.41379L3.76814 8.43103L10.3911 0L11 0.775862Z"
                fill="#7E52EE"
              />
            </svg>
          ) : null}
          <p className="time">{Message.time}</p>
        </div>
      )}
    </div>
  );
};

export default Message;
