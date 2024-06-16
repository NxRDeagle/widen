import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Newsware from '../../global_components/newsware/Newsware';

import { HeaderComments, Comment } from './components/comments-components';

import './scss/Comments.scss';

import { mainContext, defaultPost, userId } from '../../App';
import newsware_data from '../../data/newsware_data.json';

const Comments = () => {
  const [getParams, x] = useSearchParams();

  const { Conversion, goBack } = useContext(mainContext);

  //Достаём нужную новость, которая развернулась
  const newsware =
    newsware_data.find((obj) => obj.id === +getParams.get('newsware')) || defaultPost;

  //Кол-во комментов
  const commentsCount = Conversion('count', newsware.stats.comments.length);
  //Правильное склонение комментариев
  const commentsSign = Conversion('comments', newsware.stats.comments.length);

  //Если развернули новость, то она становится просмотренной
  useEffect(() => {
    if (!newsware.stats.views.includes(userId)) {
      newsware.stats.views.push(userId);
    }
  }, []);

  return (
    <>
      <HeaderComments onClick={goBack}>Запись</HeaderComments>
      <div id="comments" className="comments_container">
        <Newsware {...newsware} full={true} />
        <div className="comments_box">
          <p className="count_comments">
            {commentsCount} {commentsSign}
          </p>
          {newsware.stats.comments.length > 0 &&
            newsware.stats.comments.map((commentId) => {
              return <Comment key={commentId} commentId={commentId} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Comments;
