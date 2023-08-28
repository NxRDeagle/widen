import '../css/Messenger.css';

import React from 'react';

import users_data from '../data/users_data.json';
import chat_data from '../data/chat_data.json';

import { myProfile, mainContext } from '../App';

import Confirmation from './Confirmation';

const TabEditor = ({ messengerStates, setMessengerStates }) => {
  const { confirmationOpen, setConfirmationOpen } = React.useContext(mainContext);

  function getSubscribers(usersId) {
    let subscribers = [];
    usersId.forEach((userId) => {
      subscribers.push(users_data.find((user) => user.userId === userId));
    });
    return subscribers;
  }

  function getCompanion(companionId) {
    return users_data.find((user) => user.userId === companionId);
  }

  function getAllTabsChats() {
    let TabsChats = {};
    messengerStates.tabsName.forEach((tabName) => {
      if (tabName !== messengerStates.tabsName[messengerStates.tabPosition]) {
        TabsChats[tabName] = chat_data.filter((item) => item.tabsName.includes(tabName));
      }
    });
    return TabsChats;
  }

  function openCategory(category) {
    setMessengerStates({
      ...messengerStates,
      categoryFilter: messengerStates.categoryFilter === category ? '' : category,
    });
  }

  function addChat(chat) {
    setMessengerStates({
      ...messengerStates,
      activeTabChats: messengerStates.activeTabChats.includes(chat)
        ? messengerStates.activeTabChats.filter((item) => item.chatId !== chat.chatId)
        : [...messengerStates.activeTabChats, chat],
    });
  }

  function changeTabPosition(where) {
    setMessengerStates({
      ...messengerStates,
      changeTabPosition: messengerStates.changeTabPosition + where,
      tabPosition:
        messengerStates.changeTabPosition === messengerStates.tabPosition
          ? messengerStates.tabPosition + where
          : messengerStates.changeTabPosition + where === messengerStates.tabPosition
          ? messengerStates.tabPosition - where
          : messengerStates.tabPosition,
      tabsName: tabsNameSwap(
        messengerStates.tabsName,
        messengerStates.changeTabPosition,
        messengerStates.changeTabPosition + where,
      ),
    });
  }

  function tabsNameSwap(tabsName, a, b) {
    tabsName[a] = tabsName.splice(b, 1, tabsName[a])[0];
    return tabsName;
  }

  function clearChangeTab() {
    document.querySelectorAll('[data-tab-index]').forEach((tab) => {
      tab.classList.remove('tab_box_active');
    });
    document.querySelectorAll('[data-up-index]').forEach((arrowUp) => {
      arrowUp.classList.add('arrow_not_visible');
    });
    document.querySelectorAll('[data-down-index]').forEach((arrowDown) => {
      arrowDown.classList.add('arrow_not_visible');
    });
  }

  function applyTabEditor() {
    document.querySelector('[name="tab_name_input"]').value = '';
    setMessengerStates({
      openEditorBtn: false,
      isOpenEditor: false,
      isNewTab: false,
      categoryFilter: '',
      tabsName: myProfile.tabsName,
      activeTabChats: [],
      tabPosition: 0,
      isChangePosition: false,
      changeTabPosition: -1,
      confirmSign: '',
    });
  }

  function deleteTab() {
    setMessengerStates({
      ...messengerStates,
      confirmSign: `Удалить вкладку "${messengerStates.tabsName[messengerStates.tabPosition]}"?`,
      whatConfirm: 'deleteTab',
    });
    setConfirmationOpen();
  }

  function Archiving(chat) {
    setMessengerStates({
      ...messengerStates,
      clickChatId: chat.chatId,
      confirmSign: chat.conversationName
        ? `Перенести беседу "${chat.conversationName}" в архив?`
        : `Перенести чат c "${getCompanion(chat.companionsId[0]).nickname}" в архив?`,
      whatConfirm: 'archiveChat',
    });
    setConfirmationOpen();
  }

  function deleteChat(chat) {
    setMessengerStates({
      ...messengerStates,
      clickChatId: chat.chatId,
      confirmSign: chat.conversationName
        ? `Удалить беседу "${chat.conversationName}"?`
        : `Удалить чат c "${getCompanion(chat.companionsId[0]).nickname}"?`,
      whatConfirm: 'archiveChat',
    });
    setConfirmationOpen();
  }

  let timeout = null;

  const tabStartHandler = (e) => {
    timeout = setTimeout(() => {
      setMessengerStates({
        ...messengerStates,
        isChangePosition: true,
        changeTabPosition: +e.target.dataset.tabIndex,
      });
    }, 1000);
  };

  const tabEndHandler = () => {
    clearTimeout(timeout);
  };

  const tabsChats = getAllTabsChats();

  const subscribers = getSubscribers(myProfile.subscribers);

  const signTab = messengerStates.tabsName[messengerStates.tabPosition];

  React.useEffect(() => {
    const tabs = document.querySelectorAll('[data-tab-index]');
    const arrowsUp = document.querySelectorAll('[data-up-index]');
    const arrowsDown = document.querySelectorAll('[data-down-index]');
    clearChangeTab();
    if (messengerStates.isChangePosition) {
      tabs[messengerStates.changeTabPosition].classList.add('tab_box_active');
      if (messengerStates.changeTabPosition !== 0) {
        arrowsDown[messengerStates.changeTabPosition].classList.remove('arrow_not_visible');
      }
      if (messengerStates.changeTabPosition !== messengerStates.tabsName.length - 1) {
        arrowsUp[messengerStates.changeTabPosition].classList.remove('arrow_not_visible');
      }
    }
  }, [messengerStates.changeTabPosition]);

  return (
    <>
      <Confirmation
        firstOption="Нет"
        secondOption="Да"
        states={messengerStates}
        setStates={setMessengerStates}
      />

      <div
        style={
          confirmationOpen ? { filter: 'blur(7.5px)', width: '103%', overflowY: 'hidden' } : null
        }
        className={
          messengerStates.isOpenEditor
            ? 'tab_editor_container tab_editor_container_open'
            : 'tab_editor_container tab_editor_container_close'
        }>
        <svg
          onClick={() => {
            applyTabEditor();
          }}
          className="tab_editor_back"
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="17"
          viewBox="0 0 21 17"
          fill="none">
          <path
            d="M8.23742 1.27067C8.49999 1.55686 8.62602 1.90269 8.61551 2.30813C8.60414 2.71358 8.46717 3.0594 8.20461 3.3456L4.49593 7.38814H19.1337C19.5057 7.38814 19.8177 7.52551 20.0697 7.80026C20.3209 8.07406 20.4465 8.41368 20.4465 8.81912C20.4465 9.22457 20.3209 9.56467 20.0697 9.83942C19.8177 10.1132 19.5057 10.2501 19.1337 10.2501H4.49593L8.23742 14.3284C8.49999 14.6146 8.63127 14.9547 8.63127 15.3487C8.63127 15.7418 8.49999 16.0814 8.23742 16.3676C7.97486 16.6538 7.66285 16.7969 7.30139 16.7969C6.94081 16.7969 6.62924 16.6538 6.36668 16.3676L0.36059 9.82081C0.229309 9.67771 0.136097 9.52269 0.0809593 9.35574C0.0266972 9.18879 -0.000434875 9.00992 -0.000434875 8.81912C-0.000434875 8.62832 0.0266972 8.44945 0.0809593 8.2825C0.136097 8.11555 0.229309 7.96053 0.36059 7.81743L6.3995 1.23489C6.64018 0.972544 6.94081 0.841368 7.30139 0.841368C7.66285 0.841368 7.97486 0.984468 8.23742 1.27067Z"
            fill="#BABABA"
          />
        </svg>
        <button
          onClick={() => (myProfile.tabsName = messengerStates.tabsName)}
          className="tab_editor_ready_btn">
          Готово
        </button>
        <input
          onChange={(e) => {
            setMessengerStates({
              ...messengerStates,
              tabsName: messengerStates.tabsName.map((item, index) => {
                return index === messengerStates.tabPosition
                  ? e.target.value
                    ? e.target.value
                    : 'Название вкладки'
                  : item;
              }),
            });
          }}
          name="tab_name_input"
          className="tab_name"
          type="text"
          placeholder={signTab}
        />

        {!messengerStates.isNewTab && (
          <div className="chats_in_tab_container">
            <p className="chats_in_tab_sign">Чаты</p>
            {messengerStates.activeTabChats.map((item) => {
              return (
                <div key={item.chatId} className="add_chat_box">
                  <img
                    className="add_chat_avatar"
                    src={
                      item.conversationAvatar
                        ? item.conversationAvatar
                        : getCompanion(item.companionsId[0]).avatar
                    }
                    alt="avatar"></img>
                  <p className="add_chat_nickname">
                    {item.conversationName
                      ? item.conversationName
                      : getCompanion(item.companionsId[0]).nickname}
                  </p>
                  <button onClick={() => Archiving(item)} className="archive_btn">
                    Архивировать
                  </button>
                  <div onClick={() => deleteChat(item)} className="delete_chat_box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none">
                      <path
                        d="M9.25 19C8.8375 19 8.48425 18.8584 8.19025 18.5753C7.89625 18.2922 7.7495 17.9523 7.75 17.5556V8.16667H7V6.72222H10.75V6H15.25V6.72222H19V8.16667H18.25V17.5556C18.25 17.9528 18.103 18.2929 17.809 18.5761C17.515 18.8592 17.162 19.0005 16.75 19H9.25ZM16.75 8.16667H9.25V17.5556H16.75V8.16667ZM10.75 16.1111H12.25V9.61111H10.75V16.1111ZM13.75 16.1111H15.25V9.61111H13.75V16.1111Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div
          style={messengerStates.isNewTab ? { marginTop: '200px' } : { marginTop: '10px' }}
          className="add_chat_container">
          <p className="add_chat_sign">Добавить чаты</p>

          <div
            onClick={() => {
              openCategory('Подписчики');
            }}
            className="chat_category_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="19"
              viewBox="0 0 24 19"
              fill="none">
              <path
                d="M9.5 9.5C8.19375 9.5 7.07552 9.0349 6.14531 8.10469C5.2151 7.17448 4.75 6.05625 4.75 4.75C4.75 3.44375 5.2151 2.32552 6.14531 1.39531C7.07552 0.465104 8.19375 0 9.5 0C10.8062 0 11.9245 0.465104 12.8547 1.39531C13.7849 2.32552 14.25 3.44375 14.25 4.75C14.25 6.05625 13.7849 7.17448 12.8547 8.10469C11.9245 9.0349 10.8062 9.5 9.5 9.5ZM0 19V15.675C0 15.0021 0.173375 14.3834 0.520125 13.8189C0.866875 13.2545 1.32683 12.8242 1.9 12.5281C3.12708 11.9146 4.37396 11.4542 5.64062 11.1471C6.90729 10.8399 8.19375 10.6867 9.5 10.6875C10.8062 10.6875 12.0927 10.8411 13.3594 11.1482C14.626 11.4554 15.8729 11.9154 17.1 12.5281C17.674 12.825 18.1343 13.2557 18.4811 13.8201C18.8278 14.3846 19.0008 15.0029 19 15.675V19H0ZM2.375 16.625H16.625V15.675C16.625 15.4573 16.5704 15.2594 16.4611 15.0813C16.3519 14.9031 16.2086 14.7646 16.0312 14.6656C14.9625 14.1313 13.8839 13.7307 12.7953 13.4639C11.7068 13.1971 10.6083 13.0633 9.5 13.0625C8.39167 13.0625 7.29323 13.1963 6.20469 13.4639C5.11615 13.7315 4.0375 14.132 2.96875 14.6656C2.79062 14.7646 2.64694 14.9031 2.53769 15.0813C2.42844 15.2594 2.37421 15.4573 2.375 15.675V16.625ZM9.5 7.125C10.1531 7.125 10.7124 6.89225 11.1779 6.42675C11.6434 5.96125 11.8758 5.40233 11.875 4.75C11.875 4.09688 11.6422 3.53756 11.1767 3.07206C10.7112 2.60656 10.1523 2.37421 9.5 2.375C8.84687 2.375 8.28756 2.60775 7.82206 3.07325C7.35656 3.53875 7.12421 4.09767 7.125 4.75C7.125 5.40312 7.35775 5.96244 7.82325 6.42794C8.28875 6.89344 8.84767 7.12579 9.5 7.125Z"
                fill="black"
              />
            </svg>
            <p className="chat_category_sign">Подписчики</p>
            <div
              className={
                messengerStates.categoryFilter === 'Подписчики'
                  ? 'chat_category_triangle_left chat_category_triangle_bottom'
                  : 'chat_category_triangle_left'
              }></div>
          </div>

          <div
            className={
              messengerStates.categoryFilter === 'Подписчики'
                ? 'chat_category_add_chats_box chat_category_add_chats_box_open'
                : 'chat_category_add_chats_box'
            }>
            {subscribers.map((subscriber) => {
              return (
                <div key={subscriber.userId} className="add_chat_box">
                  <img className="add_chat_avatar" src={subscriber.avatar} alt="avatar"></img>
                  <p className="add_chat_nickname">{subscriber.nickname}</p>
                  <div onClick={(e) => addChat(e)} className="add_chat_check_box"></div>
                </div>
              );
            })}
          </div>

          <div className="chat_category_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none">
              <path
                d="M4 20C3.45 20 2.979 19.804 2.587 19.412C2.195 19.02 1.99934 18.5493 2 18V6C2 5.45 2.196 4.979 2.588 4.587C2.98 4.195 3.45067 3.99934 4 4H9.175C9.44167 4 9.696 4.05 9.938 4.15C10.18 4.25 10.3923 4.39167 10.575 4.575L12 6H20C20.55 6 21.021 6.196 21.413 6.588C21.805 6.98 22.0007 7.45067 22 8H11.175L9.175 6H4V18L5.975 11.425C6.10834 10.9917 6.35433 10.6457 6.713 10.387C7.07167 10.1283 7.46734 9.99934 7.9 10H20.8C21.4833 10 22.021 10.271 22.413 10.813C22.805 11.355 22.909 11.9423 22.725 12.575L20.925 18.575C20.7917 19.0083 20.5457 19.3543 20.187 19.613C19.8283 19.8717 19.4327 20.0007 19 20H4ZM6.1 18H19L20.8 12H7.9L6.1 18Z"
                fill="black"
              />
            </svg>
            <p className="chat_category_sign">Из других вкладок</p>
          </div>

          {Object.keys(tabsChats).map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  onClick={() => openCategory(item)}
                  className="chat_category_box_mini">
                  <p className="chat_category_sign_mini">{item}</p>
                  <div
                    className={
                      messengerStates.categoryFilter === item
                        ? 'chat_category_triangle_left chat_category_triangle_bottom'
                        : 'chat_category_triangle_left'
                    }></div>
                </div>
                <div
                  className={
                    messengerStates.categoryFilter === item
                      ? 'chat_category_add_chats_box chat_category_add_chats_box_open'
                      : 'chat_category_add_chats_box'
                  }>
                  {tabsChats[item].map((item) => {
                    return (
                      <div key={item.chatId} className="add_chat_box">
                        <img
                          className="add_chat_avatar"
                          src={
                            item.conversationAvatar
                              ? item.conversationAvatar
                              : getCompanion(item.companionsId[0]).avatar
                          }
                          alt="avatar"></img>
                        <p className="add_chat_nickname">
                          {item.conversationName
                            ? item.conversationName
                            : getCompanion(item.companionsId[0]).nickname}
                        </p>
                        <div
                          onClick={() => addChat(item)}
                          className={
                            messengerStates.activeTabChats.includes(item)
                              ? 'add_chat_check_box add_chat_check_box_active'
                              : 'add_chat_check_box'
                          }></div>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>

        <h1 className="tab_editor_sign">Расположение относительно других вкладок</h1>
        <p className="tap_editor_paragraph">
          (После долгого нажатия перетащите вкладку в нужное место)
        </p>

        <div className="tab_location_box">
          {messengerStates.tabsName.map((item, index) => {
            return (
              <>
                <svg
                  onClick={() => changeTabPosition(-1)}
                  className="arrow_not_visible"
                  data-down-index={index}
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="13"
                  viewBox="0 0 7 13"
                  fill="none">
                  <path
                    d="M6.81166 5.2374C6.6861 5.40433 6.53438 5.48446 6.3565 5.47778C6.17862 5.47055 6.0269 5.38347 5.90134 5.21653L4.1278 2.85859L4.1278 12.1652C4.1278 12.4017 4.06753 12.6 3.94699 12.7603C3.82687 12.92 3.67788 12.9998 3.5 12.9998C3.32212 12.9998 3.17291 12.92 3.05238 12.7603C2.93226 12.6 2.8722 12.4017 2.8722 12.1652L2.8722 2.85859L1.08296 5.2374C0.957398 5.40433 0.80819 5.4878 0.635335 5.4878C0.462899 5.4878 0.313901 5.40433 0.18834 5.2374C0.0627795 5.07046 -5.98719e-07 4.87209 -5.98719e-07 4.64228C-5.98719e-07 4.41302 0.0627795 4.21493 0.18834 4.04799L3.06054 0.229374C3.12332 0.145906 3.19133 0.0866432 3.26457 0.0515871C3.33782 0.0170879 3.41629 -0.000162125 3.5 -0.000162125C3.58371 -0.000162125 3.66218 0.0170879 3.73543 0.0515871C3.80867 0.0866432 3.87668 0.145906 3.93946 0.229374L6.82735 4.06886C6.94245 4.22188 7 4.41302 7 4.64228C7 4.87209 6.93722 5.07046 6.81166 5.2374Z"
                    fill="#BABABA"
                  />
                </svg>
                <div
                  key={index}
                  data-tab-index={index}
                  className={messengerStates.isChangePosition ? 'tab_box tab_box_shake' : 'tab_box'}
                  onTouchStart={tabStartHandler}
                  onTouchEnd={tabEndHandler}
                  onTouchMove={tabEndHandler}>
                  {item}
                </div>
                <svg
                  onClick={() => changeTabPosition(1)}
                  className="arrow_not_visible"
                  data-up-index={index}
                  style={{ marginBottom: '21px' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="13"
                  viewBox="0 0 7 13"
                  fill="none">
                  <path
                    d="M0.188342 7.7626C0.313902 7.59567 0.465622 7.51554 0.643499 7.52222C0.821377 7.52945 0.973095 7.61653 1.09866 7.78347L2.8722 10.1414L2.8722 0.834833C2.8722 0.598343 2.93247 0.39997 3.05301 0.239713C3.17313 0.0800127 3.32212 0.000162385 3.5 0.000162385C3.67788 0.000162385 3.82709 0.0800127 3.94762 0.239713C4.06774 0.39997 4.1278 0.598343 4.1278 0.834833L4.1278 10.1414L5.91704 7.7626C6.0426 7.59567 6.19181 7.5122 6.36466 7.5122C6.5371 7.5122 6.6861 7.59567 6.81166 7.7626C6.93722 7.92954 7 8.12791 7 8.35772C7 8.58698 6.93722 8.78507 6.81166 8.95201L3.93946 12.7706C3.87668 12.8541 3.80867 12.9134 3.73543 12.9484C3.66218 12.9829 3.58371 13.0002 3.5 13.0002C3.41629 13.0002 3.33782 12.9829 3.26457 12.9484C3.19133 12.9134 3.12332 12.8541 3.06054 12.7706L0.172647 8.93114C0.05755 8.77812 4.76837e-07 8.58698 4.76837e-07 8.35772C4.76837e-07 8.12791 0.0627813 7.92954 0.188342 7.7626Z"
                    fill="#BABABA"
                  />
                </svg>
              </>
            );
          })}
          {messengerStates.isChangePosition && (
            <button
              onClick={() => {
                clearChangeTab();
                setMessengerStates({
                  ...messengerStates,
                  isChangePosition: false,
                });
              }}
              className="apply_change_position">
              Применить
            </button>
          )}

          {!messengerStates.isNewTab && (
            <button onClick={() => deleteTab()} className="drop_tab_btn">
              Удалить вкладку "{signTab}"
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TabEditor;
