import React from 'react';

import '../css/Update.css';

class Update extends React.Component {
  state = {
    positionUpdate: 0,
    loaderOpacity: 0,
    loaderWidth: 0,
    loaderHeight: 0,
  };

  componentDidMount() {
    const element = document.querySelector('[name="upd"]');
    const profileAvatar = document.querySelector('.profile_avatar') ? document.querySelector('.profile_avatar') : null;

    let screenY = null;
    let clientTop = null;
    let avatarHeight = null;
    let avatarWidth = null;

    if (element !== null && element !== undefined) {
      element.addEventListener('touchstart', (e) => {
        screenY = e.touches[0].screenY;
        clientTop = e.target.getBoundingClientRect().y;
        avatarHeight = 121;
        avatarWidth = 121;
      });

      element.addEventListener('touchmove', (e) => {
        if (Math.abs(screenY - e.touches[0].screenY) >= 20) {
          if (
            e.target.getBoundingClientRect().y >= clientTop &&
            e.target.getBoundingClientRect().y >= 0
          ) {
            if (this.state.positionUpdate < 150) {
              this.setState({ positionUpdate: this.state.positionUpdate + 5 });
              if (this.state.loaderOpacity < 1)
                this.setState({ loaderOpacity: this.state.loaderOpacity + 0.05 });
              if (this.state.loaderWidth < 25) {
                this.setState({ loaderWidth: this.state.loaderWidth + 1 });
                this.setState({ loaderHeight: this.state.loaderHeight + 1 });
              }
              if (avatarHeight >= 90 && profileAvatar) {
                avatarHeight -= 1;
                avatarWidth -= 1;
                profileAvatar.style.width = avatarWidth + 'px';
                profileAvatar.style.height = avatarHeight + 'px';
              }
              clientTop = e.target.getBoundingClientRect().y;
            }
          }
          if (e.target.getBoundingClientRect().y < clientTop) {
            if (this.state.positionUpdate > 0) {
              this.setState({ positionUpdate: this.state.positionUpdate - 10 });
              if (this.state.loaderOpacity > 0)
                this.setState({ loaderOpacity: this.state.loaderOpacity - 0.1 });
              if (this.state.loaderWidth > 0) {
                this.setState({ loaderWidth: this.state.loaderWidth - 2 });
                this.setState({ loaderHeight: this.state.loaderHeight - 2 });
              }
              if (avatarHeight <= 121 && profileAvatar) {
                avatarHeight += 2;
                avatarWidth += 2;
                profileAvatar.style.width = avatarWidth + 'px';
                profileAvatar.style.height = avatarHeight + 'px';
              }
              clientTop = e.target.getBoundingClientRect().y;
            }
          }
        }
      });

      element.addEventListener('touchend', () => {
        this.setState({ positionUpdate: 0 });
        if (profileAvatar) {
          avatarHeight = 121;
          avatarWidth = 121;
          profileAvatar.style.width = avatarWidth + 'px';
          profileAvatar.style.height = avatarHeight + 'px';
        }
      });
    }
  }

  render() {
    const { positionUpdate } = this.state;

    const updateStyle = {
      height: positionUpdate + 'px',
    };

    return (
      <div id="update" className="update_box" style={updateStyle}>
      </div>
    );
  }
}

export default Update;
