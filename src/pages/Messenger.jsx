import React from 'react';

import Message from '../components/Message';
import TabEditor from '../components/TabEditor';
import ChatActions from '../components/ChatActions';
import Confirmation from '../components/Confirmation';

import { mainContext, userId } from '../App';

import '../css/Messenger.css';

const Messenger = () => {

  const { chatFilter, activeChats, setChatFilter, Conversion, chatActionsOpen, ColorClick } = React.useContext(mainContext);


  const [messengerStates, setMessengerStates] = React.useState({
    openEditorBtn: false,
    isOpenEditor: false,
    isNewTab: false,
    categoryFilter: '',
    tabsName: Object.keys(activeChats),
    activeTabChats: [],
    tabPosition: 0,
    isChangePosition: false,
    changeTabPosition: -1
  })

  let timeout = null;

  const tabStartHandler = (e) => {
    timeout = setTimeout(() => {
      setMessengerStates({
        ...messengerStates,
        openEditorBtn: true,
        tabPosition: messengerStates.tabsName.findIndex(item => item === e.target.getAttribute('name'))
      });
      setChatFilter(e.target.getAttribute('name'));
    }, 1000)
  }

  const tabEndHandler = () => {
    clearTimeout(timeout);
  }

  const goToTabEditor = (filter) => {
    setTimeout(() => {
      switch (filter) {
        case 'management':
          setMessengerStates({
            ...messengerStates,
            openEditorBtn: false,
            isOpenEditor: true,
            activeTabChats: activeChats[chatFilter]
          });
          break;
        case 'new':
          setMessengerStates({
            ...messengerStates,
            isOpenEditor: true,
            openEditorBtn: false,
            isNewTab: true,
            tabsName: ['Название вкладки', ...messengerStates.tabsName],
            tabPosition: 0
          })
          break;
        default:
          break;
      }
    }, 50);
  };

  return (
    <>

      <TabEditor messengerStates={messengerStates} setMessengerStates={setMessengerStates} />

      <ChatActions />

      <Confirmation
        states={messengerStates}
        setStates={setMessengerStates}
      />

      <div style={chatActionsOpen ? { filter: 'blur(7.5px)', pointerEvents: 'none' } : null} className="search_container">
        <div className="search_box">
          <i className="icon-search search_input"></i>
          <input type="text" id="global_search" placeholder="глобальный поиск" />
        </div>
      </div>

      <div style={chatActionsOpen ? { filter: 'blur(7.5px)', pointerEvents: 'none' } : null} className="search_filter">
        {Object.keys(activeChats).map((item) => {
          return (
            <button
              key={item}
              name={item}
              onClick={() => {
                setChatFilter(item);
                setMessengerStates({
                  ...messengerStates,
                  openEditorBtn: false
                })
              }}
              onTouchStart={tabStartHandler}
              onTouchEnd={tabEndHandler}
              onTouchMove={tabEndHandler}
              className={
                chatFilter === item
                  ? 'chat_search_filter_btn chat_filter_active'
                  : 'chat_search_filter_btn'
              }>
              {item}
              {activeChats[item].filter((chat) => chat.fullStatus === 'unread' && chat.messages[chat.messages.length - 1].companionId !== userId)
                .length ? (
                <div
                  className={
                    chatFilter === item
                      ? 'not_view_message chat_none_active'
                      : 'not_view_message chat_active'
                  }>
                  <p>
                    {
                      Conversion('chatUnreadCount',
                        activeChats[item].filter((chat) => chat.fullStatus === 'unread' && chat.messages[chat.messages.length - 1].companionId !== userId))
                    }
                  </p>
                </div>
              ) : null}
            </button>
          );
        })}
      </div>

      <div style={chatActionsOpen ? { filter: 'blur(7.5px)', pointerEvents: 'none' } : null} className={messengerStates.openEditorBtn ? 'chat_search_btn_editor chat_search_btn_editor_active' : 'chat_search_btn_editor'}>
        {
          chatFilter !== 'Все чаты' && (
            <>
              <p onTouchStart={(e) => ColorClick(e.target, 'chat_editor_sign')} onTouchEnd={(e) => ColorClick(e.target, 'chat_editor_sign')} onClick={() => goToTabEditor('management')} className='chat_editor_sign'>Управлять вкладкой "{messengerStates.tabsName[messengerStates.tabPosition]}"</p>
              <div className="line"></div>
            </>
          )
        }
        <p onTouchStart={(e) => ColorClick(e.target, 'chat_editor_sign')} onTouchEnd={(e) => ColorClick(e.target, 'chat_editor_sign')} onClick={() => goToTabEditor('new')} className='chat_editor_sign'>Создать новую вкладку</p>
      </div>

      <div style={chatActionsOpen ? { filter: 'blur(7.5px)', pointerEvents: 'none', overflow: 'hidden' } : null} className="chats_container">
        {activeChats[chatFilter].map((item) => {
          return <Message key={chatFilter+item.chatId} {...item} />;
        })}
      </div>

    </>
  );
};
export default Messenger;
