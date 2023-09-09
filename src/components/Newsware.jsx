import React from 'react';

import PostCard from './PostCard';
import CaseCard from './CaseCard';
import EventCard from './EventCard';

import { userId, mainContext } from '../App';

import '../css/Newsware.css';

export const NewswareContext = React.createContext();

const Newsware = (props) => {
  const { goToComments, Conversion, getUser } = React.useContext(mainContext);

  const {
    full = false,
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

  const [newswareStates, setNewswareStates] = React.useState({
    activeLike: stats.likes.includes(userId),
    activeFavorite: stats.favorites.includes(userId),
    isUseful: stats.useful.includes(userId),
    clickUseful: stats.likes.includes(userId) || stats.useful.includes(userId),
  });

  let statsCount = {};

  for (const key in stats) {
    statsCount[key] = Conversion('count', stats[key].length);
  }

  const userProfile = getUser(authorId);

  const CONTENT_LIMIT = 10;

  const onClickIcon = (icon) => {
    switch (icon) {
      case 'icon-like':
        stats.likes.includes(userId)
          ? (stats.likes = stats.likes.filter((obj) => {
              return obj !== userId;
            }))
          : stats.likes.push(userId);
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
        stats.favorites.includes(userId)
          ? (stats.favorites = stats.favorites.filter((obj) => {
              return obj !== userId;
            }))
          : stats.favorites.push(userId);
        setNewswareStates({
          ...newswareStates,
          activeFavorite: !newswareStates.activeFavorite,
        });
        break;
      case 'icon-useful':
        stats.useful.includes(userId)
          ? (stats.useful = stats.useful.filter((obj) => {
              return obj !== userId;
            }))
          : stats.useful.push(userId);
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

  switch (props.type) {
    case 'post':
      return (
        <NewswareContext.Provider
          value={{
            onClickIcon,
            statsCount,
            userProfile,
            CONTENT_LIMIT,
            full,
            newswareId,
            authorId,
            imgs,
            signImgs,
            geoposition,
            time,
            tags,
            newswareStates,
            setNewswareStates
          }}>
          <PostCard />
        </NewswareContext.Provider>
      );
    case 'case':
      return (
        <NewswareContext.Provider
          value={{
            onClickIcon,
            statsCount,
            userProfile,
            full,
            newswareId,
            authorId,
            imgs,
            signImgs,
            geoposition,
            time,
            tags,
            newswareStates,
            setNewswareStates
          }}>
          <CaseCard />
        </NewswareContext.Provider>
      );
    case 'event':
      return (
        <NewswareContext.Provider
          value={{
            onClickIcon,
            statsCount,
            userProfile,
            CONTENT_LIMIT,
            full,
            newswareId,
            authorId,
            imgs,
            signImgs,
            geoposition,
            time,
            tags,
            eventTags,
            newswareStates,
            setNewswareStates
          }}>
          <EventCard />
        </NewswareContext.Provider>
      );
    default:
      return null;
  }
};

export default Newsware;
