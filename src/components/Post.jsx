import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/style.css';
import '../css/fontello.css';

import { mainContext } from '../App';

const Post = ({ id, avatar, nickname, text, imgs, videos, stats = [0, 0, 0, 0] }) => {
  let { setFullImageSrc } = React.useContext(mainContext);
  const navigate = useNavigate();

  for (let i = 0; i < stats.length; i++) {
    if (stats[i] >= 1000000) {
      stats[i] = Math.floor(stats[i] / 1000000);
      stats[i] = stats[i].toString() + 'm';
    } else if (stats[i] >= 1000) {
      stats[i] = Math.floor(stats[i] / 1000);
      stats[i] = stats[i].toString() + 'k';
    }
  }
  const CONTENT_LIMIT = 10;
  const icons = ['icon-like', 'icon-comment', 'icon-repost', 'icon-flag'];

  const [activeIcons, setActiveIcons] = React.useState([]);

  const onClickIcon = (icon) => {
    if (activeIcons.includes(icon)) {
      setActiveIcons(activeIcons.filter((obj) => obj !== icon));
    } else {
      setActiveIcons([...activeIcons, icon]);
    }

    if (icon === 'icon-comment') {
      navigate('/comments');
    }
  };

  const goToFullMode = (path) => {
    setFullImageSrc(path);
    navigate('/full_image');
  };

  return (
    <div className="posts_container">
      <div className="post">
        <div className="author_post">
          <div className="avatar_author_post">
            {avatar ? (
              <img className="avatar_picture" src={avatar} alt="user avatar" />
            ) : (
              <i className="icon-profile avatar_anonim"></i>
            )}
          </div>
          <div className="author_nick">
            <p className="nickname">{nickname}</p>
          </div>
        </div>

        <div className="post_sign">
          {text ? <p className="post_text">{text}</p> : null}
          {imgs && imgs.length <= CONTENT_LIMIT
            ? imgs.map((path, index) => {
                return (
                  <img
                    key={index}
                    className="post_one_item"
                    src={path}
                    alt="img post"
                    onClick={() => goToFullMode(path)}
                  />
                );
              })
            : null}
          {videos && videos.length <= CONTENT_LIMIT
            ? videos.map((path, index) => {
                return (
                  <video
                    key={index}
                    controls
                    className="post_one_item"
                    src={path}
                    type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></video>
                );
              })
            : null}
        </div>

        <div
          className="post_icons"
          onClick={(e) => {
            if (e.target.tagName !== 'I') {
              return;
            } else {
              onClickIcon(e.target.className.split(' ')[0]);
            }
          }}>
          {icons.map((obj, index) => {
            return (
              <div key={index} className="post_icon_box">
                <i
                  className={
                    activeIcons.includes(obj)
                      ? `${obj} post_icon icon_target post_icon_animation`
                      : `${obj} post_icon`
                  }></i>
                <p className="post_count">{stats[index]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
