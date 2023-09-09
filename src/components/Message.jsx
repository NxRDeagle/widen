
import React from 'react';

import {mainContext, userId } from '../App';

const Message = (props) => {
  const { messages, conversationAvatar, conversationName, companionsId, flagUnRead } = props;

  const { Conversion, setChatActions, ColorClick, getUser, setClickChat, navigate, editedChats} = React.useContext(mainContext);

  /*Объект последнего сообщения*/
  const Message = messages.length ? messages[messages.length - 1] : {
    companionId: 1,
    message: conversationName ? "Начните беседу" : "Начните чат",
    status: "read",
    time: "14:12"
  };

  const countUnread = Conversion('chatUnreadCount', messages.filter((item) => item.status === 'unread'));
  const companion = getUser(Message.companionId === userId ? companionsId[0] : Message.companionId);


  let timeout = null;

  const chatStartHandler = (e) => {
    ColorClick(e.target, 'chat_box');
    timeout = setTimeout(() => {
      setClickChat(props)
      setChatActions();
    }, 1000)
  };

  const chatEndHandler = (e) => {
    ColorClick(e.target, 'chat_box');
    clearTimeout(timeout);
  };

  const chatMoveHandler = ()=>{
    clearTimeout(timeout);
  };

  const goToDialog = (chat) => {
    const readChat = {
      ...chat,
      messages: chat.messages.map((message) => {return message.companionId !== userId && message.status === 'unread' ? {...message, status:'read'} : message}),
      fullStatus: chat.messages.find((message) => message.status === 'unread' && message.companionId === userId) ? 'unread' : 'read',
      flagUnRead: false
    };
    setClickChat(readChat);
    editedChats(readChat, readChat.chatId);
    navigate('/dialog');
  };

  return (
    <div
      className="chat_box"
      onTouchStart={chatStartHandler}
      onTouchEnd={chatEndHandler}
      onTouchMove={chatMoveHandler}
      onClick={() => goToDialog(props)}
    >

      <div className="chat_user_avatar_box">
        <img loading='lazy' className="avatar_picture" src={conversationAvatar ? conversationAvatar : companion.avatar} alt={conversationName ? conversationName : companion.nickname} />
      </div>

      <div className="chat_user_sign_box">
        <p className="chat_user_nickname">{conversationName ? conversationName : companion.nickname}</p>
        <p
          data-content={Message.companionId === userId ? 'Вы: ' : `${companion.nickname}: `}
          className={
            (Message.companionId === userId || conversationName) && messages.length ? 'chat_user_message whose_message' : 'chat_user_message'
          }>
          {Conversion('chatText', Message.message)}
        </p>
      </div>

      {
        messages.length > 0 && (
          <div className="chat_status_box">

            {flagUnRead ? <div className='flag_unread_box'></div> : null}

            {Message.companionId !== userId && Message.status === 'read' && !flagUnRead ? <div></div> : null}

            {Message.companionId !== userId && Message.status === 'unread' && !flagUnRead ? (
              <div className="not_view_message chat_active">
                <p>{countUnread}</p>
              </div>
            ) : null}

            {Message.companionId === userId && Message.status === 'unread' && !flagUnRead ? (
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

            {Message.companionId === userId && Message.status === 'read' && !flagUnRead ? (
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
        )
      }
    </div>
  );
};

export default Message;
