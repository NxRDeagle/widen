import React, { useState, useEffect } from 'react';

import Footer from '../components/Footer';
import Message from '../components/Message';

import chat_data from '../data/chat_data.json'

import '../css/Messenger.css';

const Messenger = () => {

  const [chatFilter, setChatFilter] = useState(0);

  /*После подключения базы данных будут меняться динамично переменные unread, поэтому они в State*/

  const [chatState, setChatState] = useState({
    activeChats: [],
    unreadColleague: chat_data.filter(chat => chat.colleague && chat.fullstatus === "unread").length,
    unreadСustomers: chat_data.filter(chat => !chat.colleague && chat.fullstatus === "unread").length
  })

  useEffect(() => {
    chatFilter === 0 ?
      setChatState({
        ...chatState,
        activeChats: chat_data.filter(chat => chat.colleague)
      })
      : setChatState({
        ...chatState,
        activeChats: chat_data.filter(chat => !chat.colleague)
      });
  }, [chatFilter])


  return (
    <>

      <div className="search_container">
        <div className="search_box">
          <i className="icon-search search_input"></i>
          <input type="text" id="global_search" placeholder="глобальный поиск" />
        </div>
      </div>

      <div className="search_filter">
        <button
          onClick={() => {
            setChatFilter(0);
          }}
          className={chatFilter === 0 ? "chat_search_filter_btn chat_filter_active" : "chat_search_filter_btn"}
        >
          Коллеги
          {
            chatState.unreadColleague > 0 ?
              <div className={chatFilter === 0 ? "not_view_message chat_none_active" : "not_view_message chat_active"}>
                <p>{chatState.unreadColleague}</p>
              </div>
              :
              null
          }
        </button>
        <button
          onClick={() => {
            setChatFilter(1);
          }}
          className={chatFilter === 1 ? "chat_search_filter_btn chat_filter_active" : "chat_search_filter_btn"}
        >
          Заказчики
          {chatState.unreadСustomers > 0 ?
            <div className={chatFilter === 1 ? "not_view_message chat_none_active" : "not_view_message chat_active"}>
              <p>{chatState.unreadСustomers}</p>
            </div>
            :
            null
          }
        </button>
      </div>

      <div className="chats_container">
        {chatState.activeChats.map((item)=>{
          return <Message key={item.id} {...item} />
        })}
      </div>


      <Footer />
    </>
  );
};
export default Messenger;
