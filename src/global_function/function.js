import users_data from '../data/users_data.json';
import chat_data from '../data/chat_data.json';

import { defaultUser } from '../global-constants/constants';


//Функция корректировки времени
function currentTime(time) {
    if (time < 10) {
        return `0${time}`;
    }
    else {
        return time;
    }
}


//Функция просчёта времени от текущего (сколько прошло в сек мин часах днях мес и годах)
function howLongHasItBeen(dispatchDate) {
    let nowDate = new Date();
    let howLong = {};
    howLong['inSeconds'] = Math.floor((nowDate.getTime() - dispatchDate.getTime()) / 1000);
    howLong['inMinutes'] = Math.floor((nowDate.getTime() - dispatchDate.getTime()) / 60000);
    if (howLong['inMinutes']) {
        howLong['inHours'] = Math.floor((nowDate.getTime() - dispatchDate.getTime()) / 3600000);
        if (howLong['inHours']) {
            howLong['inDays'] = Math.floor((nowDate.getTime() - dispatchDate.getTime()) / 86400000);
            if (howLong['inDays']) {
                howLong['inMonths'] = (nowDate.getMonth() + 12 * nowDate.getFullYear()) - (dispatchDate.getMonth() + 12 * dispatchDate.getFullYear());
                if (howLong['inMonths']) {
                    howLong['inYears'] = nowDate.getFullYear() - dispatchDate.getFullYear();
                    if (howLong['inYears']) {
                        return howLong;
                    }
                    else {
                        delete howLong['inYears'];
                    }
                }
                else {
                    delete howLong['inMonths'];
                }
            }
            else {
                delete howLong['inDays'];
            }
        }
        else {
            delete howLong['inHours'];
        }
    }
    else {
        delete howLong['inMinutes'];
    }
    return howLong;
};

//Функция получения месяца в текстовом виде
function getSignMonth(monthNumber) {
    switch (monthNumber) {
        case 0:
            return 'янв.';
        case 1:
            return 'фев.';
        case 2:
            return 'мар.';
        case 3:
            return 'апр.';
        case 4:
            return 'мая';
        case 5:
            return 'июн.';
        case 6:
            return 'июл.';
        case 7:
            return 'авг.';
        case 8:
            return 'сен.';
        case 9:
            return 'окт.';
        case 10:
            return 'нояб.';
        case 11:
            return 'дек.';
        default:
            return;
    }
};

//Функция конвертации
export function Conversion(type, stats, page = '') {
    let element = null;
    switch (type) {
        //Числовой тип 1_000_000 1М и т.д
        case 'count':
            element =
                stats >= 1000000
                    ? ((Math.floor((stats / 1000000) * 10) / 10) + 'm').replace('.', ',')
                    : stats >= 1000
                        ? ((Math.floor((stats / 1000) * 10) / 10) + 'k').replace('.', ',')
                        : stats;
            break;
        //Правильное скланение слова комментриев
        case 'comments':
            element =
                stats % 10 === 1 && stats % 100 !== 1
                    ? 'комментарий'
                    : stats % 10 === 0 || stats % 10 >= 5 || stats % 100 === 1
                        ? 'комментариев'
                        : 'комментария';
            break;
        //Правильное скланение слова участники
        case 'conversation':
            element =
                stats % 10 === 1 && stats % 100 !== 1
                    ? 'участник'
                    : stats % 10 === 0 || stats % 10 >= 5 || stats % 100 === 1
                        ? 'участников'
                        : 'участника';
            break;
        //Ограничение кол-ва символов в поле идея в превью пользователя
        case 'previewIdea':
            element = stats.length > 200 ? stats.substr(0, 200) + '...' : stats;
            break;
        //Ограничение кол-во символов в поле чата(когда отображаются все чаты во вкладке)
        case 'chatText':
            element = stats.length > 25 ? stats.substr(0, 22) + '...' : stats;
            break;
        //Ограничение кол-ва символов в поле идея в профиле
        case 'profileIdea':
            element = stats.length > 180;
            break;
        //Ограничение кол-ва символов в новостной ленте (в тексте)
        case 'previewSign':
            element = {
                large: stats.length > 180,
                sign: stats.length > 180 ? stats.substr(0, 177) + '...' : stats
            };
            break;
        //Конвертация количества непрочитанных сообщений
        case 'chatUnreadCount':
            element = stats.length > 100 ? '100+' : stats.length;
            break;
        //Конвертация времени
        case 'time':
            let howLong = howLongHasItBeen(stats);
            if (Object.keys(howLong).length === 6) {
                element = page === 'messenger' ? `${stats.getFullYear()}г.` :
                    `${stats.getDate()}${getSignMonth(stats.getMonth())} ${stats.getFullYear()}г. в ${currentTime(stats.getHours())}:${currentTime(stats.getMinutes())}`;
            }
            else if (Object.keys(howLong).length === 5) {
                element = page === 'messenger' ? `${howLong['inMonths']}мес.` :
                    `${stats.getDate()}${getSignMonth(stats.getMonth())} в ${currentTime(stats.getHours())}:${currentTime(stats.getMinutes())}`;
            }
            else if (Object.keys(howLong).length === 4) {
                element = page === 'messenger' ? `${howLong['inDays']}д.` :
                    `${stats.getDate()}${getSignMonth(stats.getMonth())} в ${currentTime(stats.getHours())}:${currentTime(stats.getMinutes())}`;
            }
            else if (Object.keys(howLong).length > 1) {
                element = `${currentTime(stats.getHours())}:${currentTime(stats.getMinutes())}`;
            }
            else {
                element = page === 'messenger' ? element = `${howLong['inSeconds']}с.` : element = `${howLong['inSeconds']}сек. назад`;
            }
            break;
        case 'dialogReply':
            element = stats.length > 200 ? stats.substr(0, 197) + '...' : stats;
            break;
        default:
            return element;
    }
    return element;
}

//Фильтр по тегам, кроме мероприятий
export function OtherGlobalFilterHandler(tags, tagsFilter) {
    if (!tagsFilter.length) {
        return true;
    }
    for (let tag of tagsFilter) {
        if (tags.includes(tag)) {
            return true;
        }
    }
    return false;
}

//Фильтр по тегам мероприятий
export function EventGlobalFilterHandler(eventTags, globalFilters) {
    for (const [key, value] of Object.entries(globalFilters)) {
        if (!value.length) {
            continue;
        }
        else {
            for (let index = 0; index < eventTags[key].length; index++) {
                if (value.includes(eventTags[key][index])) {
                    break;
                }
                if (index === eventTags[key].length - 1) {
                    return false;
                }
            }
        }
    }
    return true;
};

//Функция изменения цвета по нажатию
export function ColorClick(element, classElement) {
    element.classList.contains(classElement) ?
        element.classList.toggle('color_click') :
        element.closest(`.${classElement}`).classList.toggle('color_click')
};

//Достаём все активные чаты
export function getAllActiveChats() {
    const activeChats = {};
    (users_data.find((obj) => obj.userId === 1) || defaultUser)
        .tabsName.forEach((tabName) => activeChats[tabName] = chat_data.filter((chat) => chat.tabsName.includes(tabName)));
    activeChats['Все чаты'] = chat_data;
    return activeChats;
};

//Функция получения пользователя по id
export function getUser(userId) {
    return users_data.find((user) => user.userId === userId) || defaultUser;
};