import { useContext, createContext, useState } from 'react';

import { Conversion, OtherGlobalFilterHandler, EventGlobalFilterHandler, getUser } from '../../global_function/function';

import { AuthorNewsware, PostCard, EventCard, CaseCard, NewswareIcons, Tags } from './components/newsware_components';

import { mainContext } from '../../App';

import './css/Newsware.css';

export const NewswareContext = createContext();

const Newsware = (props) => {
    const { page,
        myProfile,
        goToComments,
        globalFilters,
        clickGlobalFilter } = useContext(mainContext);

    const {
        full = false,
        type = 'post',
        newswareId = 0,
        authorId = 0,
        imgs = [
            'https://fikiwiki.com/uploads/posts/2022-02/1645041619_8-fikiwiki-com-p-ya-v-shoke-prikolnie-kartinki-9.jpg',
        ],
        signImgs = ['Пост не найден :('],
        stats = {
            likes: [],
            comments: [],
            favorites: [],
            reposts: [],
            views: [],
            useful: [],
        },
        geoposition = 'Тридевятое царство',
        time = new Date(),
        tags = [],
        eventTags = {},
    } = props;

    //Стейты для статистики новостной ленты
    const [newswareStates, setNewswareStates] = useState({
        activeLike: stats.likes.includes(myProfile.userId),
        activeFavorite: stats.favorites.includes(myProfile.userId),
        isUseful: stats.useful.includes(myProfile.userId),
        clickUseful: stats.likes.includes(myProfile.userId) || stats.useful.includes(myProfile.userId),
    });

    let statsCount = {};

    for (const key in stats) {
        statsCount[key] = Conversion('count', stats[key].length);
    }

    //Получение автора новости
    const userProfile = getUser(authorId);

    //Изменение статистики новости
    const onClickIcon = (icon) => {
        switch (icon) {
            case 'icon-like':
                stats.likes.includes(myProfile.userId)
                    ? (stats.likes = stats.likes.filter((obj) => {
                        return obj !== myProfile.userId;
                    }))
                    : stats.likes.push(myProfile.userId);
                setNewswareStates({
                    ...newswareStates,
                    activeLike: !newswareStates.activeLike,
                });
                break;
            case 'icon-comment':
                goToComments(newswareId);
                break;
            case 'icon-repost':
                break;
            case 'icon-flag':
                stats.favorites.includes(myProfile.userId)
                    ? (stats.favorites = stats.favorites.filter((obj) => {
                        return obj !== myProfile.userId;
                    }))
                    : stats.favorites.push(myProfile.userId);
                setNewswareStates({
                    ...newswareStates,
                    activeFavorite: !newswareStates.activeFavorite,
                });
                break;
            case 'icon-useful':
                stats.useful.includes(myProfile.userId)
                    ? (stats.useful = stats.useful.filter((obj) => {
                        return obj !== myProfile.userId;
                    }))
                    : stats.useful.push(myProfile.userId);
                setNewswareStates({
                    ...newswareStates,
                    isUseful: !newswareStates.isUseful,
                });
                setTimeout(() => {
                    setNewswareStates({
                        ...newswareStates,
                        clickUseful: true,
                    });
                }, 500);
                break;
            default:
                return;
        }
    };

    return (
        <>
            {
                (
                    OtherGlobalFilterHandler(tags, globalFilters.tags) ||
                    EventGlobalFilterHandler(eventTags, globalFilters)
                )
                &&
                (
                    <div className={full ? 'newsware_item open_newsware_item' : 'newsware_item'}>
                        <AuthorNewsware full={full} userProfile={userProfile} geoposition={geoposition}></AuthorNewsware>
                        {
                            type === 'post' && (
                                <PostCard newswareId={newswareId} signImgs={signImgs} imgs={imgs} full={full}></PostCard>
                            )
                        }
                        {
                            type === 'event' && (
                                <EventCard newswareId={newswareId} signImgs={signImgs} imgs={imgs} full={full}></EventCard>
                            )
                        }
                        {
                            type === 'case' && (
                                <CaseCard userProfile={userProfile} newswareId={newswareId} signImgs={signImgs} imgs={imgs} full={full}></CaseCard>
                            )
                        }

                        {
                            full && (
                                <>
                                    {
                                        type === 'event' ?
                                            (
                                                <>
                                                    <div className="event_tags_box">
                                                        <p className="event_category">Направление:</p>
                                                        {eventTags.tags.map((item, index) => {
                                                            return (
                                                                <Tags key={index} onClick={(e) => clickGlobalFilter('globalEvent', e.target.textContent, 'tag')}>
                                                                    {item}
                                                                </Tags>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="event_tags_box">
                                                        <p className="event_category">Форма участия:</p>
                                                        {eventTags.forms.map((item, index) => {
                                                            return (
                                                                <Tags key={index} onClick={(e) => clickGlobalFilter('globalEvent', e.target.textContent, 'tag')}>
                                                                    {item}
                                                                </Tags>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="event_tags_box">
                                                        <p className="event_category">Формат:</p>
                                                        {eventTags.formats.map((item, index) => {
                                                            return (
                                                                <Tags key={index} onClick={(e) => clickGlobalFilter('globalEvent', e.target.textContent, 'tag')}>
                                                                    {item}
                                                                </Tags>
                                                            )
                                                        })}
                                                    </div>
                                                    <div style={{ marginBottom: '20px' }} className="event_tags_box">
                                                        <p className="event_category">Город:</p>
                                                        {eventTags.cities.map((item, index) => {
                                                            return (
                                                                <Tags key={index} onClick={(e) => clickGlobalFilter('globalEvent', e.target.textContent, 'tag')}>
                                                                    {item}
                                                                </Tags>
                                                            )
                                                        })}
                                                    </div>
                                                </>
                                            )
                                            :
                                            (
                                                <div className='tags_box'>
                                                    {tags.map((item, index) => {
                                                        return (
                                                            <Tags key={index} onClick={(e) => clickGlobalFilter('globalEvent', e.target.textContent, 'tag')}>
                                                                {item}
                                                            </Tags>
                                                        );
                                                    })}
                                                </div>
                                            )
                                    }
                                </>
                            )
                        }

                        <div
                            className="newsware_icons"
                            onClick={(e) => {
                                if (!e.target.getAttribute('name')) {
                                    return;
                                } else {
                                    onClickIcon(e.target.getAttribute('name').split(' ')[0]);
                                }
                            }}
                        >
                            <NewswareIcons full={full} newswareStates={newswareStates} setNewswareStates={setNewswareStates} stats={stats}></NewswareIcons>
                        </div>

                        <p className="newsware_time">{Conversion('time', new Date(time), page)}</p>
                    </div>
                )
            }
        </>
    )
};

export default Newsware;