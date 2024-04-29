import { useEffect, useContext } from 'react';

import { mainContext } from '../../../App';

import { getUser, Conversion, ColorClick } from '../../../global_function/function';


//Компонент редактора вкладок
export function TabEditor({ messengerStates, setMessengerStates }) {

    const {
        setConfirmation,
        activeChats,
        alreadyTabEditor,
        openTabEditor,
        setOpenTabEditor } = useContext(mainContext);

    function getAllTabsChats() {
        let TabsChats = {};
        messengerStates.tabsName.forEach((tabName) => {
            if (tabName !== messengerStates.tabsName[messengerStates.tabPosition]) {
                TabsChats[tabName] = activeChats[tabName];
            }
        })
        return TabsChats;
    };

    function openCategory(category) {
        setMessengerStates({
            ...messengerStates,
            categoryFilter: messengerStates.categoryFilter === category ? '' : category
        })
    };

    function addChat(chat) {
        setMessengerStates({
            ...messengerStates,
            activeTabChats: messengerStates.activeTabChats.includes(chat) ?
                messengerStates.activeTabChats.filter((activeTabChat) => activeTabChat !== chat) : [...messengerStates.activeTabChats, chat]
        })
    };

    function changeTabPosition(where) {
        setMessengerStates({
            ...messengerStates,
            changeTabPosition: messengerStates.changeTabPosition + where,
            tabPosition: messengerStates.changeTabPosition === messengerStates.tabPosition ?
                messengerStates.tabPosition + where : messengerStates.changeTabPosition + where === messengerStates.tabPosition ?
                    messengerStates.tabPosition - where : messengerStates.tabPosition,
            tabsName: tabsNameSwap(messengerStates.tabsName, messengerStates.changeTabPosition, messengerStates.changeTabPosition + where)
        })
    };

    function tabsNameSwap(tabsName, a, b) {
        tabsName[a] = tabsName.splice(b, 1, tabsName[a])[0];
        return tabsName;
    };

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
    };

    function TabEditorBack() {
        document.querySelector('[name="tab_name_input"]').value = '';
        setMessengerStates({
            openEditorBtn: false,
            isNewTab: false,
            categoryFilter: '',
            tabsName: Object.keys(activeChats),
            activeTabChats: [],
            tabPosition: 0,
            isChangePosition: false,
            changeTabPosition: -1,
        });
        setOpenTabEditor();
    };

    function TabAction(confirmSign = '', whatConfirm = '') {
        setConfirmation(confirmSign, whatConfirm, 'Нет', 'Да');
    };

    let timeout = null;

    const tabStartHandler = (e) => {
        timeout = setTimeout(() => {
            setMessengerStates({
                ...messengerStates,
                isChangePosition: true,
                changeTabPosition: +e.target.dataset.tabIndex
            });
        }, 1000)
    }

    const tabEndHandler = () => {
        clearTimeout(timeout);
    }


    const tabsChats = getAllTabsChats();

    const signTab = messengerStates.tabsName[messengerStates.tabPosition];


    useEffect(() => {
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
    }, [messengerStates.changeTabPosition])

    return (
        <>
            <div className={openTabEditor ? "tab_editor_container" : "tab_editor_container tab_editor_container_close"}>

                <svg onClick={() => { TabEditorBack() }} className='tab_editor_back' xmlns="http://www.w3.org/2000/svg" width="21" height="17" viewBox="0 0 21 17" fill="none">
                    <path d="M8.23742 1.27067C8.49999 1.55686 8.62602 1.90269 8.61551 2.30813C8.60414 2.71358 8.46717 3.0594 8.20461 3.3456L4.49593 7.38814H19.1337C19.5057 7.38814 19.8177 7.52551 20.0697 7.80026C20.3209 8.07406 20.4465 8.41368 20.4465 8.81912C20.4465 9.22457 20.3209 9.56467 20.0697 9.83942C19.8177 10.1132 19.5057 10.2501 19.1337 10.2501H4.49593L8.23742 14.3284C8.49999 14.6146 8.63127 14.9547 8.63127 15.3487C8.63127 15.7418 8.49999 16.0814 8.23742 16.3676C7.97486 16.6538 7.66285 16.7969 7.30139 16.7969C6.94081 16.7969 6.62924 16.6538 6.36668 16.3676L0.36059 9.82081C0.229309 9.67771 0.136097 9.52269 0.0809593 9.35574C0.0266972 9.18879 -0.000434875 9.00992 -0.000434875 8.81912C-0.000434875 8.62832 0.0266972 8.44945 0.0809593 8.2825C0.136097 8.11555 0.229309 7.96053 0.36059 7.81743L6.3995 1.23489C6.64018 0.972544 6.94081 0.841368 7.30139 0.841368C7.66285 0.841368 7.97486 0.984468 8.23742 1.27067Z" fill="#BABABA" />
                </svg>
                <button onClick={() => alreadyTabEditor(messengerStates.tabsName, messengerStates.tabsName[messengerStates.tabPosition], messengerStates.activeTabChats)} className="tab_editor_ready_btn">Готово</button>
                <input
                    onChange={(e) => {
                        setMessengerStates({
                            ...messengerStates,
                            tabsName: messengerStates.tabsName.map((item, index) => { return index === messengerStates.tabPosition ? e.target.value ? e.target.value : 'Название вкладки' : item })
                        })
                    }}
                    name='tab_name_input'
                    className='tab_name'
                    type='text'
                    placeholder={signTab}
                />

                {
                    messengerStates.activeTabChats.length > 0 && (
                        <div className='chats_in_tab_container'>
                            <p className='chats_in_tab_sign'>Чаты</p>
                            {
                                messengerStates.activeTabChats.map((item) => {
                                    return (
                                        <div key={item.chatId} className='add_chat_box'>
                                            <img loading='lazy' className='add_chat_avatar' src={item.conversationAvatar ? item.conversationAvatar : getUser(item.companionsId[0]).avatar} alt='avatar'></img>
                                            <p className='add_chat_nickname'>{item.conversationName ? item.conversationName : getUser(item.companionsId[0]).nickname}</p>
                                            <div
                                                onClick={() => addChat(item)}
                                                className='delete_chat_box'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                    <path d="M9.25 19C8.8375 19 8.48425 18.8584 8.19025 18.5753C7.89625 18.2922 7.7495 17.9523 7.75 17.5556V8.16667H7V6.72222H10.75V6H15.25V6.72222H19V8.16667H18.25V17.5556C18.25 17.9528 18.103 18.2929 17.809 18.5761C17.515 18.8592 17.162 19.0005 16.75 19H9.25ZM16.75 8.16667H9.25V17.5556H16.75V8.16667ZM10.75 16.1111H12.25V9.61111H10.75V16.1111ZM13.75 16.1111H15.25V9.61111H13.75V16.1111Z" fill="black" />
                                                </svg>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }

                <div style={!messengerStates.activeTabChats.length ? { marginTop: '200px' } : { marginTop: '10px' }} className='add_chat_container'>
                    <p className='add_chat_sign'>Добавить чаты</p>

                    <div className='chat_category_box'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 20C3.45 20 2.979 19.804 2.587 19.412C2.195 19.02 1.99934 18.5493 2 18V6C2 5.45 2.196 4.979 2.588 4.587C2.98 4.195 3.45067 3.99934 4 4H9.175C9.44167 4 9.696 4.05 9.938 4.15C10.18 4.25 10.3923 4.39167 10.575 4.575L12 6H20C20.55 6 21.021 6.196 21.413 6.588C21.805 6.98 22.0007 7.45067 22 8H11.175L9.175 6H4V18L5.975 11.425C6.10834 10.9917 6.35433 10.6457 6.713 10.387C7.07167 10.1283 7.46734 9.99934 7.9 10H20.8C21.4833 10 22.021 10.271 22.413 10.813C22.805 11.355 22.909 11.9423 22.725 12.575L20.925 18.575C20.7917 19.0083 20.5457 19.3543 20.187 19.613C19.8283 19.8717 19.4327 20.0007 19 20H4ZM6.1 18H19L20.8 12H7.9L6.1 18Z" fill="black" />
                        </svg>
                        <p className='chat_category_sign'>Из других вкладок</p>
                    </div>

                    {
                        Object.keys(tabsChats).map((item) => {
                            return (
                                <>
                                    <div key={item} onClick={() => openCategory(item)} className='chat_category_box_mini'>
                                        <p className='chat_category_sign_mini'>{item}</p>
                                        <div className={messengerStates.categoryFilter === item ? 'chat_category_triangle_left chat_category_triangle_bottom' : 'chat_category_triangle_left'}></div>
                                    </div>
                                    <div className={messengerStates.categoryFilter === item ? 'chat_category_add_chats_box chat_category_add_chats_box_open' : 'chat_category_add_chats_box'}>
                                        {
                                            tabsChats[item].map((item) => {
                                                return (
                                                    <div key={item.chatId} className='add_chat_box'>
                                                        <img loading='lazy' className='add_chat_avatar' src={item.conversationAvatar ? item.conversationAvatar : getUser(item.companionsId[0]).avatar} alt='avatar'></img>
                                                        <p className='add_chat_nickname'>{item.conversationName ? item.conversationName : getUser(item.companionsId[0]).nickname}</p>
                                                        <div onClick={() => addChat(item)} className={messengerStates.activeTabChats.includes(item) ? 'add_chat_check_box add_chat_check_box_active' : 'add_chat_check_box'}></div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            )
                        })
                    }
                </div>

                <h1 className='tab_editor_sign'>Расположение относительно других вкладок</h1>
                <p className='tap_editor_paragraph'>(После долгого нажатия перетащите вкладку в нужное место)</p>

                <div className='tab_location_box'>
                    {
                        messengerStates.tabsName.map((item, index) => {
                            return (
                                <>
                                    <svg onClick={() => changeTabPosition(-1)} className='arrow_not_visible' data-down-index={index} xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
                                        <path d="M6.81166 5.2374C6.6861 5.40433 6.53438 5.48446 6.3565 5.47778C6.17862 5.47055 6.0269 5.38347 5.90134 5.21653L4.1278 2.85859L4.1278 12.1652C4.1278 12.4017 4.06753 12.6 3.94699 12.7603C3.82687 12.92 3.67788 12.9998 3.5 12.9998C3.32212 12.9998 3.17291 12.92 3.05238 12.7603C2.93226 12.6 2.8722 12.4017 2.8722 12.1652L2.8722 2.85859L1.08296 5.2374C0.957398 5.40433 0.80819 5.4878 0.635335 5.4878C0.462899 5.4878 0.313901 5.40433 0.18834 5.2374C0.0627795 5.07046 -5.98719e-07 4.87209 -5.98719e-07 4.64228C-5.98719e-07 4.41302 0.0627795 4.21493 0.18834 4.04799L3.06054 0.229374C3.12332 0.145906 3.19133 0.0866432 3.26457 0.0515871C3.33782 0.0170879 3.41629 -0.000162125 3.5 -0.000162125C3.58371 -0.000162125 3.66218 0.0170879 3.73543 0.0515871C3.80867 0.0866432 3.87668 0.145906 3.93946 0.229374L6.82735 4.06886C6.94245 4.22188 7 4.41302 7 4.64228C7 4.87209 6.93722 5.07046 6.81166 5.2374Z" fill="#BABABA" />
                                    </svg>
                                    <div
                                        key={item}
                                        data-tab-index={index}
                                        className={messengerStates.isChangePosition ? 'tab_box tab_box_shake' : 'tab_box'}
                                        onTouchStart={tabStartHandler}
                                        onTouchEnd={tabEndHandler}
                                        onTouchMove={tabEndHandler}
                                    >
                                        {item}
                                    </div>
                                    <svg onClick={() => changeTabPosition(1)} className='arrow_not_visible' data-up-index={index} style={{ marginBottom: '21px' }} xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
                                        <path d="M0.188342 7.7626C0.313902 7.59567 0.465622 7.51554 0.643499 7.52222C0.821377 7.52945 0.973095 7.61653 1.09866 7.78347L2.8722 10.1414L2.8722 0.834833C2.8722 0.598343 2.93247 0.39997 3.05301 0.239713C3.17313 0.0800127 3.32212 0.000162385 3.5 0.000162385C3.67788 0.000162385 3.82709 0.0800127 3.94762 0.239713C4.06774 0.39997 4.1278 0.598343 4.1278 0.834833L4.1278 10.1414L5.91704 7.7626C6.0426 7.59567 6.19181 7.5122 6.36466 7.5122C6.5371 7.5122 6.6861 7.59567 6.81166 7.7626C6.93722 7.92954 7 8.12791 7 8.35772C7 8.58698 6.93722 8.78507 6.81166 8.95201L3.93946 12.7706C3.87668 12.8541 3.80867 12.9134 3.73543 12.9484C3.66218 12.9829 3.58371 13.0002 3.5 13.0002C3.41629 13.0002 3.33782 12.9829 3.26457 12.9484C3.19133 12.9134 3.12332 12.8541 3.06054 12.7706L0.172647 8.93114C0.05755 8.77812 4.76837e-07 8.58698 4.76837e-07 8.35772C4.76837e-07 8.12791 0.0627813 7.92954 0.188342 7.7626Z" fill="#BABABA" />
                                    </svg>
                                </>
                            )
                        })
                    }
                    {
                        messengerStates.isChangePosition && (
                            <button onClick={() => {
                                clearChangeTab();
                                setMessengerStates({
                                    ...messengerStates,
                                    isChangePosition: false
                                })
                            }}
                                className='apply_change_position'
                            >
                                Применить
                            </button>
                        )
                    }

                    {
                        !messengerStates.isNewTab && (
                            <button onClick={() => TabAction(`Удалить вкладку "${signTab}"?`, 'deleteTab')} className='drop_tab_btn'>Удалить вкладку "{signTab}"</button>
                        )
                    }
                </div>
            </div>
        </>
    )
}


//Кнопка выбора вкладки
export function TabCategoryBtn({ children, name, setMessengerStates, messengerStates }) {

    const { setChatFilter, chatFilter, activeChats, myProfile } = useContext(mainContext);

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

    return (
        <button
            name={name}
            onClick={() => {
                setChatFilter(children);
                setMessengerStates({
                    ...messengerStates,
                    openEditorBtn: false
                })
            }}
            onTouchStart={tabStartHandler}
            onTouchEnd={tabEndHandler}
            onTouchMove={tabEndHandler}
            className={
                chatFilter === children
                    ? 'chat_search_filter_btn chat_filter_active'
                    : 'chat_search_filter_btn'
            }
        >
            {children}
            {activeChats[children].filter((chat) => ((chat.fullStatus === 'unread' && chat.messages[chat.messages.length - 1].companionId !== myProfile.userId) || chat.flagUnRead))
                .length > 0 && (
                    <div
                        className={
                            chatFilter === children
                                ? 'not_view_message chat_none_active'
                                : 'not_view_message chat_active'
                        }>
                        <p>
                            {
                                Conversion('chatUnreadCount',
                                    activeChats[children].filter((chat) => ((chat.fullStatus === 'unread' && chat.messages[chat.messages.length - 1].companionId !== myProfile.userId) || chat.flagUnRead)))
                            }
                        </p>
                    </div>
                )}
        </button>
    )
}

//Выбор редактирования вкладок
export function TabEditorList({ className, onClick, children }) {

    const { chatFilter } = useContext(mainContext);

    function handleTouch(e) {
        ColorClick(e.target, 'chat_editor_sign');
    }

    return (
        <ul data-height={chatFilter === 'Все чаты' ? 45 : 90} className={className}>
            {
                chatFilter !== 'Все чаты' && (
                    <li onTouchStart={handleTouch} onTouchEnd={handleTouch} onClick={() => onClick('management')} className='chat_editor_sign'>{children}</li>
                )
            }
            <li onTouchStart={handleTouch} onTouchEnd={handleTouch} onClick={() => onClick('new')} className='chat_editor_sign'>Создать новую вкладку</li>
        </ul>
    )
}

//Сообщение 
export function Message(props) {

    const { messages, conversationAvatar, conversationName, companionsId, flagUnRead } = props;

    const { setChatActions,
        setClickChat,
        navigate,
        myProfile } = useContext(mainContext);

    /*Объект последнего сообщения*/
    const Message = messages.length ? messages[messages.length - 1] : {
        companionId: 1,
        message: conversationName ? "Начните беседу" : "Начните чат",
        status: "read",
        time: "14:12"
    };

    const countUnread = Conversion('chatUnreadCount', messages.filter((item) => item.status === 'unread'));
    const companion = getUser(Message.companionId === myProfile.userId ? companionsId[0] : Message.companionId);


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

    const chatMoveHandler = () => {
        clearTimeout(timeout);
    };

    const goToDialog = (chat) => {
        setClickChat(chat);
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
                    data-content={Message.companionId === myProfile.userId ? 'Вы: ' : `${companion.nickname}: `}
                    className={
                        (Message.companionId === myProfile.userId || conversationName) && messages.length ? 'chat_user_message whose_message' : 'chat_user_message'
                    }>
                    {Conversion('chatText', Message.message)}
                </p>
            </div>

            {
                messages.length > 0 && (
                    <div className="chat_status_box">

                        {flagUnRead ? <div className='flag_unread_box'></div> : null}

                        {Message.companionId !== myProfile.userId && Message.status === 'read' && !flagUnRead ? <div></div> : null}

                        {Message.companionId !== myProfile.userId && Message.status === 'unread' && !flagUnRead ? (
                            <div className="not_view_message chat_active">
                                <p>{countUnread}</p>
                            </div>
                        ) : null}

                        {Message.companionId === myProfile.userId && Message.status === 'unread' && !flagUnRead ? (
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

                        {Message.companionId === myProfile.userId && Message.status === 'read' && !flagUnRead ? (
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
                        <p className="time">{Conversion('time', new Date(Message.time), 'messenger')}</p>
                    </div>
                )
            }
        </div>
    );
}