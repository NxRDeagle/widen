import React from "react";

import './css/Update.css';

export default class ProfileUpdate extends React.Component {

    state = {
        positionUpdate: 0,
    };

    componentDidMount() {
        const element = document.querySelector('[name="upd"]');
        const profileAvatar = document.querySelector('.profile_avatar') ? document.querySelector('.profile_avatar') : null;
        const profileStatus = document.querySelector('.profile_status') ? document.querySelector('.profile_status') : null;

        let screenY = null;
        let clientTop = null;
        let avatarHeight = null;
        let avatarWidth = null;
        let statusOpacity = null;

        if (element !== null && element !== undefined) {
            element.addEventListener('touchstart', (e) => {
                screenY = e.touches[0].screenY;
                clientTop = e.target.getBoundingClientRect().y;
                avatarHeight = 121;
                avatarWidth = 121;
                statusOpacity = 1;
            });

            element.addEventListener('touchmove', (e) => {
                if (Math.abs(screenY - e.touches[0].screenY) >= 20) {
                    if (
                        e.target.getBoundingClientRect().y >= clientTop &&
                        e.target.getBoundingClientRect().y >= 0
                    ) {
                        if (this.state.positionUpdate < 150) {
                            this.setState({ positionUpdate: this.state.positionUpdate + 5 });
                            if (avatarHeight >= 90 && profileAvatar && profileStatus) {
                                avatarHeight -= 1;
                                avatarWidth -= 1;
                                statusOpacity -= 0.05;
                                profileAvatar.style.width = avatarWidth + 'px';
                                profileAvatar.style.height = avatarHeight + 'px';
                                profileStatus.style.opacity = statusOpacity;
                            }
                            clientTop = e.target.getBoundingClientRect().y;
                        }
                    }
                    if (e.target.getBoundingClientRect().y < clientTop) {
                        if (this.state.positionUpdate > 0) {
                            this.setState({ positionUpdate: this.state.positionUpdate - 10 });
                            if (avatarHeight <= 121 && profileAvatar) {
                                avatarHeight += 2;
                                avatarWidth += 2;
                                statusOpacity += 0.1;
                                profileAvatar.style.width = avatarWidth + 'px';
                                profileAvatar.style.height = avatarHeight + 'px';
                                profileStatus.style.opacity = statusOpacity;
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
                    statusOpacity = 1;
                    profileAvatar.style.width = avatarWidth + 'px';
                    profileAvatar.style.height = avatarHeight + 'px';
                    profileStatus.style.opacity = statusOpacity;
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