import React from 'react';

import '../css/Update.css';

class Update extends React.Component {
  state = {
    positionUpdate: 0,
    loaderOpacity: 0,
  };

  componentDidMount() {
    const element = document.querySelector('[name="upd"]');

    let screenX = null;
    let screenY = null;

    if (element !== null && element != undefined) {
      element.addEventListener('touchstart', (e) => {
        screenX = e.touches[0].screenX;
        screenY = e.touches[0].screenY;
      });

      element.addEventListener('touchmove', (e) => {
        if (Math.abs(screenY - e.touches[0].screenY) >= 20) {
          if (element.getBoundingClientRect().top >= 0) {
            if (this.state.positionUpdate < 150) {
              this.setState({ positionUpdate: this.state.positionUpdate + 5 });
              if (this.state.loaderOpacity < 1)
                this.setState({ loaderOpacity: this.state.loaderOpacity + 0.05 });
            }
          } else {
            if (this.state.positionUpdate !== 0) {
              this.setState({ positionUpdate: this.state.positionUpdate - 10 });
              if (this.state.loaderOpacity > 0)
                this.setState({ loaderOpacity: this.state.loaderOpacity - 0.1 });
            }
          }
        }
      });

      element.addEventListener('touchend', (e) => {
        this.setState({ positionUpdate: 0 });
        this.setState({ loaderOpacity: 0 });
      });
    }
  }

  render() {
    const { positionUpdate, loaderOpacity } = this.state;

    const updateStyle = {
      height: positionUpdate + 'px',
    };

    const loaderStyle = {
      opacity: loaderOpacity,
    };

    return (
      <div id="update" className="update_box" style={updateStyle}>
        <div className="loader" style={loaderStyle}></div>
      </div>
    );
  }
}

export default Update;
