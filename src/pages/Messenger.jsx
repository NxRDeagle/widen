import React from 'react';

import Footer from '../components/Footer';
import Message from '../components/Message';
import TabEditor from '../components/TabEditor';

import { myProfile, mainContext, userId } from '../App';

import chat_data from '../data/chat_data.json';

import '../css/Messenger.css';

const Messenger = () => {

  const { chatFilter, activeChats, setChatFilter, Conversion } = React.useContext(mainContext);

  const [messengerStates, setMessengerStates] = React.useState({
    openEditorBtn: false,
    isOpenEditor: false,
    isNewTab: false,
    categoryFilter: '',
    tabsName: myProfile.tabsName,
    activeTabChats: [],
    tabPosition: 0,
    isChangePosition: false,
    changeTabPosition: -1,
    clickChatId: -1,
    confirmSign: '',
    whatConfirm: ''
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

  const goToTabEditor = (e, filter) => {
    e.target.style.backgroundColor = '#BABABA';
    setTimeout(() => {
      switch (filter) {
        case 'management':
          setMessengerStates({
            ...messengerStates,
            openEditorBtn: false,
            isOpenEditor: true,
            activeTabChats: chat_data.filter((chat) => chat.tabsName.includes(messengerStates.tabsName[messengerStates.tabPosition]))
          });
          break;
        case 'new':
          setMessengerStates({
            ...messengerStates,
            isOpenEditor: true,
            openEditorBtn: false,
            isNewTab: true,
            tabsName: [...messengerStates.tabsName, 'Название вкладки'],
            tabPosition: messengerStates.tabsName.length
          })
          break;
        default:
          break;
      }
      e.target.style.backgroundColor = "white";
    }, 50);
  }

  return (
    <>

      <TabEditor messengerStates={messengerStates} setMessengerStates={setMessengerStates} />

      <div className="search_container">
        <div className="search_box">
          <i className="icon-search search_input"></i>
          <input type="text" id="global_search" placeholder="глобальный поиск" />
        </div>
      </div>

      <div className="search_filter">
        {myProfile.tabsName.map((item, index) => {
          return (
            <button
              key={index}
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
              {chat_data.filter((chat) => chat.tabsName.includes(item) && chat.fullStatus === 'unread' && chat.messages[chat.messages.length - 1].companionId !== userId)
                .length ? (
                <div
                  className={
                    chatFilter === item
                      ? 'not_view_message chat_none_active'
                      : 'not_view_message chat_active'
                  }>
                  <p>
                    {
                      Conversion('chatUnreadCount', chat_data.filter(
                        (chat) => chat.tabsName.includes(item) && chat.fullStatus === 'unread' && chat.messages[chat.messages.length - 1].companionId !== userId
                      ))
                    }
                  </p>
                </div>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className={messengerStates.openEditorBtn ? 'chat_search_btn_editor chat_search_btn_editor_active' : 'chat_search_btn_editor'}>
        <p onClick={(e) => goToTabEditor(e, 'management')} className='chat_editor_sign'>Управлять вкладкой "{messengerStates.tabsName[messengerStates.tabPosition]}"</p>
        <div className="line"></div>
        <p onClick={(e) => goToTabEditor(e, 'new')} className='chat_editor_sign'>Создать новую вкладку</p>
      </div>

      <div className="chats_container">
        {activeChats.map((item) => {
          return <Message key={item.chatId} {...item} />;
        })}
      </div>

      <Footer />
    </>
  );
};
export default Messenger;
