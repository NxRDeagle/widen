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
    let screenX = null;
    let screenY = null;

    document.body.addEventListener('touchstart', (e) => {
      screenX = e.touches[0].screenX;
      screenY = e.touches[0].screenY;
    });

    document.body.addEventListener('touchmove', (e) => {
      if (Math.abs(screenY - e.touches[0].screenY) >= 20) {
        if (window.scrollY === 0) {
          if (this.state.positionUpdate < 150) {
            this.setState({ positionUpdate: this.state.positionUpdate + 5 });
            if (this.state.loaderOpacity < 1)
              this.setState({ loaderOpacity: this.state.loaderOpacity + 0.05 });
            if (this.state.loaderWidth < 25) {
              this.setState({ loaderWidth: this.state.loaderWidth + 1 });
              this.setState({ loaderHeight: this.state.loaderHeight + 1 });
            }
          }
        } else {
          if (this.state.positionUpdate !== 0) {
            this.setState({ positionUpdate: this.state.positionUpdate - 10 });
            if (this.state.loaderOpacity > 0)
              this.setState({ loaderOpacity: this.state.loaderOpacity - 0.08 });
            if (this.state.loaderWidth > 0) {
              this.setState({ loaderWidth: this.state.loaderWidth - 2 });
              this.setState({ loaderHeight: this.state.loaderHeight - 2 });
            }
          }
        }
      }
    });

    document.body.addEventListener('touchend', (e) => {
      this.setState({ positionUpdate: 0 });
      this.setState({ loaderOpacity: 0 });
      this.setState({ loaderWidth: 0 });
      this.setState({ loaderHeight: 0 });
    });
  }

  render() {
    const { positionUpdate, loaderOpacity, loaderHeight, loaderWidth } = this.state;

    const updateStyle = {
      height: positionUpdate + 'px',
    };

    const loaderStyle = {
      opacity: loaderOpacity,
      width: loaderWidth + 'px',
      height: loaderHeight + 'px',
    };

    return (
      <div id="update" className="update_box" style={updateStyle}>
        <div className="loader" style={loaderStyle}></div>
      </div>
    );
  }
}

export default Update;
