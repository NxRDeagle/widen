import React from 'react';

import PostCard from './PostCard';
import CaseCard from './CaseCard';
import EventCard from './EventCard';

import { userId, defaultUser, myProfile, mainContext } from '../App';

import users_data from '../data/users_data.json';

import '../css/Newsware.css';

export const NewswareContext = React.createContext();

const Newsware = (props) => {

  const {
    goToComments,
    Conversion
  } = React.useContext(mainContext);

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
    },
    geoposition = 'Тридевятое царство',
    time = new Date(),
    tags = [],
    eventTags = {}
  } = props;

  const [newswareStates, setNewswareStates] = React.useState({
    activeLike: stats.likes.includes(userId) ? true : false,
    activeFavorite: stats.favorites.includes(userId) ? true : false,
    isSub: myProfile.subscriptions.includes(authorId),
    isInterested: false //Обдумать
  });

  let statsCount = {};

  for (const key in stats) {
    statsCount[key] = Conversion('count', stats[key].length);
  }

  const profile = users_data.find((obj) => obj.userId === authorId)
    ? users_data.find((obj) => obj.userId === authorId)
    : defaultUser;

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
      case 'icon-interest':
        setNewswareStates({
          ...newswareStates,
          isInterested: !newswareStates.isInterested,
        });
        break;
      default:
        return;
    }
  };

  const onClickSub = () => {
    setNewswareStates({
      ...newswareStates,
      isSub: !newswareStates.isSub
    });
    myProfile.subscriptions.includes(authorId) ?
      myProfile.subscriptions = myProfile.subscriptions.filter((obj) => { return obj !== authorId; })
      :
      myProfile.subscriptions.push(authorId);
  }

  switch (props.type) {
    case 'post':
      return (
        <NewswareContext.Provider
          value={{
            onClickIcon,
            statsCount,
            profile,
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
            onClickSub
          }}
        >
          <PostCard />
        </NewswareContext.Provider>
      )
    case 'case':
      return (
        <NewswareContext.Provider
          value={{
            onClickIcon,
            statsCount,
            profile,
            full,
            newswareId,
            authorId,
            imgs,
            signImgs,
            geoposition,
            time,
            tags,
            newswareStates,
            onClickSub
          }}
        >
          <CaseCard />
        </NewswareContext.Provider>
      )
    case 'event':
      return (
        <NewswareContext.Provider
          value={{
            onClickIcon,
            statsCount,
            profile,
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
            onClickSub
          }}
        >
          <EventCard />
        </NewswareContext.Provider>
      )
    default:
      return null;
  }
};

export default Newsware;
