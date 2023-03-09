import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../css/style.css';
import '../css/fontello.css';
import defaultPostPng from '../img/default_post.png';

import { mainContext } from '../App';

import user_data from '../data/user_data.json';

const Post = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const profile = user_data.find((obj) => obj.nickname === props.nickname);

  let { setFullImages, setCommentPostId, setProfile } = React.useContext(mainContext);

  let stats = !props.stats ? [0, 0, 0, 0] : props.stats;

  const firstImgSrc = props.imgs ? props.imgs[0] : defaultPostPng;

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

  const [fullPost, setFullPost] = React.useState(location.pathname === '/comments' ? true : false);

  const goToComments = () => {
    setCommentPostId(props.id);
    navigate('/comments');
  };

  const onClickIcon = (icon) => {
    if (activeIcons.includes(icon)) {
      setActiveIcons(activeIcons.filter((obj) => obj !== icon));
    } else {
      setActiveIcons([...activeIcons, icon]);
    }

    if (icon === 'icon-comment') {
      goToComments();
    }
  };

  const goToFullMode = (imgs, firstImg) => {
    if (imgs.length > 1)
      imgs.sort(function (x, y) {
        return x === firstImg ? -1 : y === firstImg ? 1 : 0;
      });
    setFullImages(imgs);
    navigate('/full_image');
  };

  const goToPreview = () => {
    setProfile(profile);
    navigate('/preview_user_profile');
  };

  const goToProfile = () => {
    navigate(`/user_profile/${profile.nickname}`);
  };

  return (
    <div className="posts_container">
      <div className={location.pathname === '/comments' ? 'post open_post' : 'post'}>
        {!fullPost ? (
          <div className="author_post">
            <div className="avatar_author_post">
              {profile.avatar ? (
                <img
                  className="avatar_picture"
                  src={profile.avatar}
                  alt="user avatar"
                  onClick={goToPreview}
                />
              ) : (
                <i className="icon-profile avatar_anonim" onClick={goToPreview}></i>
              )}
            </div>
            <div className="author_nick">
              <p className="nickname" onClick={goToPreview}>
                {profile.nickname}
              </p>
            </div>
          </div>
        ) : (
          <div className="user_history_box" style={{ marginTop: '11px', alignItems: 'center' }}>
            <div className="user_history_avatar">
              {profile.avatar ? (
                <img
                  className="avatar_picture"
                  src={profile.avatar}
                  alt="user avatar"
                  onClick={goToProfile}
                />
              ) : (
                <i className="icon-profile none_picture" onClick={goToProfile}></i>
              )}
            </div>

            <p className="user_history_nickname">{profile.nickname}</p>
          </div>
        )}

        <div className="post_sign">
          {props.signImgs ? <p className="post_text">{props.signImgs[0]}</p> : null}

          <img
            className="post_one_item"
            src={firstImgSrc}
            alt="Post picture"
            onClick={() => {
              fullPost
                ? goToFullMode(props.imgs ? props.imgs : [firstImgSrc], firstImgSrc)
                : goToComments();
            }}
          />

          {fullPost ? (
            <>
              {props.imgs && props.imgs.length <= CONTENT_LIMIT
                ? props.imgs.map((path, index) => {
                    if (index !== 0)
                      return (
                        <div key={index}>
                          {props.signImgs[index] ? (
                            <p className="post_text">{props.signImgs[index]}</p>
                          ) : null}
                          <img
                            className="post_one_item"
                            src={path}
                            alt="img post"
                            onClick={() => goToFullMode(props.imgs, path)}
                          />
                        </div>
                      );
                  })
                : null}
              {props.videos && props.videos.length <= CONTENT_LIMIT
                ? props.videos.map((path, index) => {
                    return (
                      <div key={index}>
                        {props.signVideos[index] ? (
                          <p className="post_text">{props.signVideos[index]}</p>
                        ) : null}
                        <video
                          key={index}
                          controls
                          className="post_one_item"
                          src={path}
                          type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></video>
                      </div>
                    );
                  })
                : null}
            </>
          ) : null}
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
