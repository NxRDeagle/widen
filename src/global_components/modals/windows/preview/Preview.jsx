import { mainContext } from "../../../../App"
import { useContext } from "react";

import './css/Preview.css';

export default function Preview({ onClose, currentModal }) {

    const {
        userProfile,
        Conversion,
        modalOption,
        goToProfile,
        setModal } = useContext(mainContext);

    const subsriptions = Conversion('count', userProfile.subscribers.length);
    const subscribers = Conversion('count', userProfile.subscribers.length);

    function handleClick() {
        setModal();
        goToProfile(userProfile);
    }

    return (
        <div
            className={modalOption === 'preview' ? "preview_box preview_box_open" : "preview_box preview_box_close"}
            style={userProfile.background ? { backgroundImage: `url(${userProfile.background})` } : { backgroundColor: "#7e52ee" }}
        >
            <img onClick={handleClick} className="preview_avatar" src={userProfile.avatar} alt='avatar' />
            <div className="preview_nickname_box">
                <p className="preview_nickname">{userProfile.nickname}</p>
                <p className="preview_role">{userProfile.role}</p>
            </div>
            <div className="preview_status_container">
                <div className="preview_status_box">
                    <div className="preview_status_item">
                        <p className="preview_status_count">{subsriptions}</p>
                        <p className="preview_status_sign">Подписки</p>
                    </div>
                    <div className="preview_status_item">
                        <p className="preview_status_count">{subscribers}</p>
                        <p className="preview_status_sign">Подписчики</p>
                    </div>
                </div>
                <p className="preview_about">Идея: {Conversion('previewIdea', userProfile.idea)}</p>
            </div>
            <svg onClick={onClose} className="preview_close" xmlns="http://www.w3.org/2000/svg" width="15" height="21" viewBox="0 0 15 21" fill="none">
                <path d="M14.3137 8.24053C14.0533 8.50531 13.7371 8.63403 13.3651 8.62668C12.9931 8.61846 12.6747 8.48419 12.4099 8.22386L8.66986 4.54679L8.79407 19.1841C8.79723 19.556 8.67385 19.8691 8.42394 20.1233C8.1749 20.3766 7.8644 20.5048 7.49245 20.508C7.12051 20.5111 6.80744 20.3882 6.55326 20.1391C6.29995 19.8892 6.17171 19.5783 6.16856 19.2063L6.04434 4.56907L2.33473 8.34218C2.07441 8.60696 1.76352 8.74089 1.40207 8.74395C1.0415 8.74701 0.728828 8.61838 0.464048 8.35806C0.199269 8.09773 0.0653455 7.78685 0.0622782 7.4254C0.0592184 7.06483 0.18785 6.75216 0.448174 6.48738L6.40308 0.43054C6.53324 0.29815 6.67467 0.203734 6.82735 0.147299C6.98005 0.0917389 7.14391 0.0632153 7.31895 0.06173C7.49398 0.0602446 7.65831 0.0859832 7.81192 0.138944C7.96555 0.19278 8.10855 0.284782 8.24094 0.414944L14.3309 6.40239C14.5736 6.64102 14.6965 6.94062 14.6995 7.30119C14.7026 7.66264 14.574 7.97575 14.3137 8.24053Z" fill="white" />
            </svg>
        </div>
    )
}