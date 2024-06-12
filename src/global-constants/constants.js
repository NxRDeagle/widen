import defaultAvatar from '../img/defaultAvatar.png';
import bg1 from '../img/spheres/bg1.jpg';
import bg2 from '../img/spheres/bg2.jpg';
import bg3 from '../img/spheres/bg3.jpg';
import bg4 from '../img/spheres/bg4.jpg';
import bg5 from '../img/spheres/bg5.jpg';

import interest_data from '../data/interest_data.json';
import russian_cities from '../data/russian_cities.json';

export const defaultUser = {
    userId: 0,
    avatar: defaultAvatar,
    background:
        'https://phonoteka.org/uploads/posts/2021-04/thumbs/1618498711_49-phonoteka_org-p-fioletovii-fon-v-stime-50.png',
    nickname: 'Undefind_Star',
    firstName: 'Потерянная',
    lastName: 'Звёздочка',
    subscribers: [],
    subscriptions: [],
    viewUsers: [],
    role: 'Неизвестна',
    softSkills: [],
    status: 'offline',
    idea: 'Найтись в этом мире',
    who: 'professional',
    achievements: [],
    notification: 'false',
    interests: [],
    lastTime: '',
    tabsName: ['Все чаты'],
};

export const defaultPost = {
    postId: 0,
    type: 'post',
    authorId: 0,
    stats: {
        likes: [],
        comments: [],
        favorites: [],
        reposts: [],
        views: [],
    },
    imgs: ['https://fikiwiki.com/uploads/posts/2022-02/1645041619_8-fikiwiki-com-p-ya-v-shoke-prikolnie-kartinki-9.jpg'],
    signImgs: ['Пост не найден :('],
    geoposition: '',
    time: '',
};

export const defaultChat = {
    chatId: 0,
    companionsId: [],
    tabsName: [],
    conversationName: "",
    conversationAvatar: "",
    fullStatus: '',
    messages: [],
};

export const defaultComment = {
    commentId: 0,
    authorCommentId: 0,
    text: 'Комментарий не найден :(',
    likes: [],
    replies: [],
    time: '',
    isReply: false,
};

//Цвета интересов
const bgs = []
const bgarray = [bg1, bg2, bg3, bg4, bg5];
for (let i = 0; i < 28; i++) {
    bgarray.sort(() => Math.random() - 0.5);
    bgs.push(bgarray[i % 4])
}
export default bgs;

//Датасет из категорий для фильтра мероприятий
export const eventDataSet = [
    {
        code: 'tags',
        name: 'Направление',
        value: interest_data.map(i => i.name)
    },
    {
        code: 'forms',
        name: 'Форма участия',
        value: ['Платная', 'Бесплатная', 'Волонтерство']
    },
    {
        code: 'formats',
        name: 'Формат',
        value: ['Онлайн', 'Офлайн']
    },
    {
        code: 'cities',
        name: 'Город',
        value: russian_cities.map(c => c.name)
    }
]

//Датасет для кнопок выбора статуса в партнёрствах
export const partenrshipBtns = [
    {
        code: 'opened',
        name: 'Открыты',
        count: 0
    },
    {
        code: 'in_process',
        name: 'В процессе',
        count: 0
    },
    {
        code: 'closed',
        name: 'Закрыты',
        count: 0
    },
    
]