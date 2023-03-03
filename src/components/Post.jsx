import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../css/style.css';
import '../css/fontello.css';

import { mainContext } from '../App';

const Post = (props) => {
  let stats;
  !props.stats ? (stats = [0, 0, 0, 0]) : (stats = props.stats);
  let { setFullImages, setProfile, profile, setCommentPostId } = React.useContext(mainContext);

  const navigate = useNavigate();
  const location = useLocation();

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
      setCommentPostId(props.id);
      navigate('/comments');
    }
  };

  const goToFullMode = (imgs, firstImg) => {
    imgs.sort(function (x, y) {
      return x === firstImg ? -1 : y === firstImg ? 1 : 0;
    });
    setFullImages(imgs);
    navigate('/full_image');
  };

  const goToUserProfile = () => {
    if (!props.avatar)
      props.avatar = 'https://rutensil.com/uploads/egiocMMHeJxW8ZDVer7lMv-xw7ReN-vH.jpeg';
    setProfile({
      ...profile,
      nickname: props.nickname,
      avatar: props.avatar,
      subscriptions: props.subscriptions,
      subscribers: props.subscribers,
      idea: props.idea,
    });
    navigate('/user_profile');
  };

  return (
    <div className="posts_container">
      <div className={location.pathname === '/comments' ? 'post open_post' : 'post'}>
        <div className="author_post">
          <div className="avatar_author_post">
            {props.avatar ? (
              <img
                className="avatar_picture"
                src={props.avatar}
                alt="user avatar"
                onClick={goToUserProfile}
              />
            ) : (
              <i className="icon-profile avatar_anonim"></i>
            )}
          </div>
          <div className="author_nick">
            <p className="nickname" onClick={goToUserProfile}>
              {props.nickname}
            </p>
          </div>
        </div>

        <div className="post_sign">
          {props.text ? <p className="post_text">{props.text}</p> : null}
          {props.imgs && props.imgs.length <= CONTENT_LIMIT
            ? props.imgs.map((path, index) => {
                return (
                  <img
                    key={index}
                    className="post_one_item"
                    src={path}
                    alt="img post"
                    onClick={() => goToFullMode(props.imgs, path)}
                  />
                );
              })
            : null}
          {props.videos && props.videos.length <= CONTENT_LIMIT
            ? props.videos.map((path, index) => {
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

        {location.pathname !== '/comments' && (
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
        )}
      </div>
    </div>
  );
};

export default Post;
