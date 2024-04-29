import users_data from '../data/users_data.json';
import newsware_data from '../data/newsware_data.json'

import { legacy_createStore as createStore } from 'redux'
import { useDispatch } from 'react-redux';



import { useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { reducer } from '../reducer';

import { getAllActiveChats } from '../global_function/function';

import { defaultUser, defaultChat } from '../global-constants/constants';

export function GlobalStates() {

    const location = useLocation();
    const navigate = useNavigate();

    //Глобальные стейты приложения
    const appState = {
        currentNewswareFilter: 'all',
        isNewswareFilterOpen: false,
        modalOption: null,
        footType: 'navigation',
        page: 'login',
        activeLoginBox: 'login',
        fullImages: [''],
        fullImgIndex: 0,
        myProfile: users_data.find((obj) => obj.userId === 1) ? users_data.find((obj) => obj.userId === 1) : defaultUser,
        userProfile: localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : defaultUser,
        messageText: '',
        userProfileNewswareItems: [],
        profileActiveIcon: 'newsware',
        chatFilter: localStorage.getItem('activeChat') ? JSON.parse(localStorage.getItem('activeChat')) : 'Все чаты',
        activeChats: getAllActiveChats(),
        activeGlobalSearch: localStorage.getItem('activeGlobalSearch') ? JSON.parse(localStorage.getItem('activeGlobalSearch')) : 'globalCase',
        globalPosts: newsware_data,
        globalCases: newsware_data,
        globalRisingStars: users_data,
        globalSharks: users_data,
        globalEvents: newsware_data,
        globalFilters: {
            tags: [],
            forms: [],
            formats: [],
            cities: []
        },
        openTabEditor: false,
        clickChat: localStorage.getItem('clickChat') ? JSON.parse(localStorage.getItem('clickChat')) : defaultChat,
        changeMsgs: [],
        editorMsg: false,
        replyDialogMsg: false,
        forwardedDialogMsgs: []
    };

    //Создание Рудюсера(оброботчика всех стейтов)
    const [appvalue, dispatch] = useReducer(reducer, appState);

    //Подключаем Redux
    // const appvalue = createStore(reducer, appState);
    // const dispatch = useDispatch();

    //Функция для изменения стейтов

    //Открытие модального окна
    appvalue.setModal = (option = null) => {
        dispatch({ type: 'SET_MODAL', payload: { option: option } })
    }

    //Нажатие на фильтр на главное странице(Выбор, что показать пост, кейс и т.п)
    appvalue.onClickHeaderFilter = (filter = 'all') => {
        dispatch({ type: 'CLICK_HEADER_FILTER', payload: filter });
    };

    //Открытие и закрытие фильтра на главной странице
    appvalue.setIsNewswareFilterOpen = () => {
        dispatch({ type: 'SET_NEWSWARE_FILTER_OPEN' });
    };

    //Функция открытия Preview
    appvalue.goToPreview = (userProfile = defaultUser) => {
        dispatch({ type: 'SET_USER_PROFILE', payload: userProfile });
        if (appvalue.myProfile.viewUsers.find((obj) => obj === userProfile.userId)
            || userProfile.userId === appvalue.myProfile.userId) {
            navigate(`/profile/${userProfile.nickname}`);
        } else {
            appvalue.setModal('preview');
        }
    }

    //Функция перехода в Profile
    appvalue.goToProfile = (userProfile = defaultUser) => {
        appvalue.editMyProfile(userProfile.userId, 'viewUsers');
        navigate(`/profile/${userProfile.nickname}`);
    }

    //Изменение полей своего профиля
    appvalue.editMyProfile = (itemId = 0, actionWithMyProfile = '') => {
        switch (actionWithMyProfile) {
            case 'subcriptions':
                dispatch({
                    type: 'EDIT_MY_PROFILE', payload: {
                        ...appvalue.myProfile,
                        subscriptions: appvalue.myProfile.subscriptions.includes(itemId) ?
                            appvalue.myProfile.subscriptions.filter((subscription) => subscription !== itemId) :
                            [...appvalue.myProfile.subscriptions, itemId]
                    }
                });
                break;
            case 'viewUsers':
                if (!appvalue.myProfile.viewUsers.includes(itemId)) {
                    appvalue.myProfile.viewUsers.push(itemId)
                };
                break;
            default:
                return;
        }
    };

    //Переход на страницу комментариев
    appvalue.goToComments = (newswareId = 0) => {
        navigate(`/comments?newsware=${newswareId}`);
    };

    //Переход на страницу глобального поиска и запоминание филтров по тегам
    appvalue.clickGlobalFilter = (globalSearchName = 'globalCase', filterSign = '', objGlobalFilter = 'tag') => {
        appvalue.setActiveGlobalSearch(globalSearchName);
        switch (objGlobalFilter) {
            case 'tag':
                if (!appvalue.globalFilters.tags.includes(filterSign)) {
                    appvalue.globalFilters.tags.push(filterSign);
                };
                break;
            case 'form':
                if (!appvalue.globalFilters.forms.includes(filterSign)) {
                    appvalue.globalFilters.forms.push(filterSign);
                };
                break;
            case 'format':
                if (!appvalue.globalFilters.formats.includes(filterSign)) {
                    appvalue.globalFilters.formats.push(filterSign);
                };
                break;
            case 'city':
                if (!appvalue.globalFilters.cities.includes(filterSign)) {
                    appvalue.globalFilters.cities.push(filterSign);
                };
                break;
            default:
                return;
        };
        navigate("/search");
    };

    //Возвращение на страницу назад
    appvalue.goBack = () => {
        navigate(-1);
    };

    //Установление окон на странице авторизации
    appvalue.setLoginBox = (boxName = 'login') => {
        dispatch({ type: 'SET_LOGIN_BOX', payload: boxName })
    }

    //Удаление всех тегов в глобальном поиске
    appvalue.dropGlobalFilters = () => {
        dispatch({ type: 'CLEAR_GLOBAL_FILTERS' });
    };

    //Удаление тега определённой категории(теги, формат, формы и т.д) из глобального поиска
    appvalue.dropGlobalFilter = (category = '', globalFilter = '') => {
        dispatch({ type: "DROP_GLOBAL_FILTER", payload: { category: category, globalFilter: globalFilter } });
    };

    //Добавление фильтра нужной категории в глобальном поиске
    appvalue.addGlobalFilter = (category = '', globalFilter = '') => {
        dispatch({ type: "ADD_GLOBAL_FILTER", payload: { category: category, globalFilter: globalFilter } });
    };

    //Выбираем какой будем отображать блок в профиле
    appvalue.setProfileActiveIcon = (profileActiveIcon = 'newsware') => {
        dispatch({ type: 'SET_PROFILE_ACTIVE_ICON', payload: profileActiveIcon })
    };

    //Новостная лента внутри профиля
    appvalue.setUserProfileNewsware = (newswareItems = []) => {
        dispatch({ type: 'SET_USER_PROFILE_NEWSWARE', payload: newswareItems });
    };

    //Открытие редактора вкладок
    appvalue.setOpenTabEditor = () => {
        dispatch({ type: 'SET_OPEN_TAB_EDITOR' })
    }

    //Выбор вкладки в глобальном поиске
    appvalue.setActiveGlobalSearch = (globalSearchName = 'globalCase') => {
        localStorage.setItem('activeGlobalSearch', JSON.stringify(globalSearchName));
        dispatch({ type: 'SET_ACTIVE_GLOBAL_SEARCH', payload: globalSearchName });
    };


    //Действия по нажатию кнопки готово в редакторе вкладок
    appvalue.alreadyTabEditor = (tabsName = 'Все чаты', activeTab = 'Все чаты', activeChatsTab = []) => {
        const newActiveChats = {};
        tabsName.forEach((tabName) => {
            newActiveChats[tabName] = tabName === activeTab ?
                activeChatsTab :
                appvalue.activeChats[tabName] ?
                    appvalue.activeChats[tabName] :
                    [];
        });
        dispatch({ type: 'EDITED_CHATS', payload: newActiveChats });
        appvalue.setChatFilter(activeTab);
    };

    //Выбор названия вкладки
    appvalue.setChatFilter = (filter = 'Все чаты') => {
        dispatch({ type: 'SET_CHAT_FILTER', payload: filter });
    };

    //Выбор чата
    appvalue.setClickChat = (clickChat = defaultChat) => {
        if (clickChat) {
            localStorage.setItem('clickChat', JSON.stringify(clickChat));
            dispatch({ type: 'SET_CLICK_CHAT', payload: clickChat });
        };
    };


    appvalue.setFooterType = (type = 'navigation') => {
        dispatch({ type: 'SET_FOOTER_TYPE', payload: type })
    };


    appvalue.setMessageText = (text = '') => {
        dispatch({ type: 'SET_MESSAGE_TEXT', payload: text });
    };

    appvalue.goToFullMode = (imgs = [], index = 0) => {
        dispatch({ type: 'SET_FULL_IMGS', payload: { imgs: imgs, index: index } });
        navigate('/full_image');
    };


    appvalue.goHome = () => {
        navigate('/');
    };

    appvalue.goInput = () => {
        navigate('/login');
    };


    appvalue.setChatActions = () => {
        dispatch({ type: 'SET_CHAT_ACTIONS' })
    };

    appvalue.deleteActiveChatsTab = (tabName = 'Все чаты') => {
        delete appvalue.activeChats[tabName];
        appvalue.setChatFilter();
    };


    appvalue.editedChats = (newChat = defaultChat, clickChatId = appvalue.clickChat.chatId) => {
        appvalue.setClickChat(newChat);
        const newActiveChats = {};
        Object.keys(appvalue.activeChats).forEach((tabName) => {
            if (newChat) {
                newActiveChats[tabName] = appvalue.activeChats[tabName].map((chat) => {
                    return chat.chatId === clickChatId ? newChat : chat;
                });
            } else {
                newActiveChats[tabName] = appvalue.activeChats[tabName].filter((chat) => {
                    return chat.chatId !== clickChatId;
                });
            }
        });
        dispatch({ type: 'EDITED_CHATS', payload: newActiveChats });
    };


    appvalue.setChangeMsg = (msg = null) => {
        msg ? dispatch({ type: 'SET_CHANGE_MSG', payload: msg }) : appvalue.changeMsgs.length = 0;
    };

    appvalue.deleteMessages = () => {
        const newClickChat = { ...appvalue.clickChat };
        appvalue.changeMsgs.forEach((changeMsg) => newClickChat.messages = newClickChat.messages.filter((message) => message.messageId !== changeMsg.messageId))
        dispatch({ type: 'DELETE_MESSAGES', payload: newClickChat });
        appvalue.editedChats(newClickChat, newClickChat.chatId)
        appvalue.setFooterType('text');
    };

    appvalue.clickMsgRedactor = (messageText = '') => {
        dispatch({ type: 'CLICK_MSG_REDACTOR', payload: messageText });
    };

    appvalue.closedEditorMsg = () => {
        dispatch({ type: 'CLOSED_EDITOR_MSG' });
    };

    appvalue.redactorMessage = () => {
        const newClickChat = { ...appvalue.clickChat };
        newClickChat.messages = newClickChat.messages.map((message) => { return message.messageId !== appvalue.changeMsgs[0].messageId ? message : { ...message, message: appvalue.messageText, edited: true } });
        dispatch({ type: 'REDACTOR_MESSAGE', payload: newClickChat });
        appvalue.editedChats(newClickChat, newClickChat.chatId);
        document.querySelector('blockquote').textContent = '';
    };

    appvalue.setReplyDialogMsg = () => {
        dispatch({ type: 'SET_REPLY_DIALOG_MSG', payload: true });
    };

    appvalue.setForwardedDialogMsg = () => {
        navigate('/messenger');
        dispatch({ type: 'SET_FORWARDED_DIALOG_MSG' });
    }


    return {
        dispatch,
        appvalue
    }


}
