import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';

import { mainContext, defaultUser } from '../App';

import users_data from '../data/users_data.json';
import chat_data from '../data/chat_data.json';

import '../css/Dialog.css';

const Dialog = () => {
  const { dialogInfo } = React.useContext(mainContext);

  const { nickname, conversation_name, conversation_avatar } = dialogInfo;

  const [isConversation, setIsConversation] = React.useState(
    dialogInfo.conversation_name ? true : false,
  );
  const conversationCount = chat_data.find(
    (obj) => obj.conversationName.toLowerCase() === conversation_name.toLowerCase(),
  ).companionsId.length;

  const userProfile = users_data.find(
    (obj) => obj.nickname.toLowerCase() === nickname.toLowerCase(),
  )
    ? users_data.find((obj) => obj.nickname.toLowerCase() === nickname.toLowerCase())
    : setIsConversation(true);

  return (
    <>
      <div className="dialog_container">
        <div className="dialog_header">
          <Link to="/messenger">
            <svg
              className="arrow_left"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="17"
              viewBox="0 0 24 17"
              fill="none">
              <path
                d="M9.66904 0.457403C9.97723 0.762335 10.1252 1.1308 10.1128 1.56278C10.0995 1.99477 9.93871 2.36323 9.63052 2.66816L5.27739 6.97534H22.4588C22.8954 6.97534 23.2616 7.12171 23.5575 7.41444C23.8523 7.70616 23.9997 8.06801 23.9997 8.5C23.9997 8.93199 23.8523 9.29435 23.5575 9.58709C23.2616 9.87881 22.8954 10.0247 22.4588 10.0247H5.27739L9.66904 14.37C9.97723 14.6749 10.1313 15.0373 10.1313 15.457C10.1313 15.8758 9.97723 16.2377 9.66904 16.5426C9.36086 16.8475 8.99463 17 8.57036 17C8.14712 17 7.7814 16.8475 7.47322 16.5426L0.42346 9.56727C0.269365 9.4148 0.159958 9.24963 0.0952396 9.07175C0.0315475 8.89387 -0.000299454 8.70329 -0.000299454 8.5C-0.000299454 8.29671 0.0315475 8.10613 0.0952396 7.92825C0.159958 7.75038 0.269365 7.5852 0.42346 7.43274L7.51174 0.419287C7.79424 0.139765 8.14712 1.90735e-06 8.57036 1.90735e-06C8.99463 1.90735e-06 9.36086 0.15247 9.66904 0.457403Z"
                fill="#7E52EE"
              />
            </svg>
          </Link>

          <div className="dialog_user_container">
            <div className="dialog_avatar_div">
              <img
                className="avatar_picture"
                id="dialog_avatar"
                src={isConversation ? conversation_avatar : userProfile.avatar}
                alt="user_avatar"
              />
              {!isConversation && (
                <svg
                  className="online_icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none">
                  <circle cx="6" cy="6" r="6" fill="#7E52EE" />
                </svg>
              )}
            </div>
            <p className="dialog_user_nickname">
              {isConversation ? conversation_name : userProfile.nickname}
            </p>
            {isConversation ? (
              <p className="last_online_sign">{conversationCount} участников</p>
            ) : (
              <p className="last_online_sign">Был(а) в сети в 00:99</p>
            )}
          </div>

          {!isConversation && (
            <svg
              className="add_user"
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="26"
              viewBox="0 0 29 26"
              fill="none">
              <path
                d="M21.3372 4.86755C21.3372 7.00354 19.6056 8.7351 17.4696 8.7351C15.3336 8.7351 13.6021 7.00354 13.6021 4.86755C13.6021 2.73156 15.3336 1 17.4696 1C19.6056 1 21.3372 2.73156 21.3372 4.86755Z"
                stroke="#7E52EE"
                strokeWidth="2"
              />
              <path
                d="M13.4132 21.9038H26.8283C27.6396 20.8221 29.2038 17.8475 26.3936 15.4137C24.6247 13.8818 20.1739 12.9799 18.2809 12.9799C16.3879 12.9799 12.1152 13.4667 10.1682 15.4137M13.4132 18.6587H6.92317M0.433105 18.6587H6.92317M6.92317 18.6587V11.3574M6.92317 18.6587V25.9601"
                stroke="#7E52EE"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
        <div className="dialog_container_inner"></div>
      </div>
      <Footer message={true} />
    </>
  );
};
export default Dialog;
