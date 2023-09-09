import React from 'react';

import { mainContext, userId } from '../App';

import ChatActions from '../components/ChatActions';
import Confirmation from '../components/Confirmation';


import '../css/Dialog.css';

const Dialog = () => {
    const { clickChat, getUser, myProfile, goBack, editMyProfile, Conversion, setChatActions, chatActionsOpen, goToPreview, setConfirmation, confirmationOpen } = React.useContext(mainContext);

    const countConversation = clickChat.conversationName ? Conversion('count', clickChat.companionsId.length + 1) : null;

    function isSpam() {
        return (!clickChat.conversationName &&
            !myProfile.subscriptions.includes(clickChat.companionsId[0]) &&
            clickChat.messages.length > 0 &&
            !clickChat.messages.find((message) => message.companionId === userId)
        );
    }

    function spamClick() {
        setConfirmation(
            `Вы уверены, что хотите заблокировать ${getUser(clickChat.companionsId[0]).nickname}?`,
            'blockUser',
            'Нет',
            'Да'
        );
    }

    React.useEffect(() => {
        const dialogCt = document.querySelector('.dialog_container');
        let counter = 10;
        const msgs = document.querySelectorAll('.dialog_message_box');
        for (let i = 0; i < msgs.length; i++) {
            counter += Math.ceil((msgs[i].offsetHeight + 20) / (dialogCt.offsetHeight / 100));
            if (counter >= 80) {
                dialogCt.style.paddingTop = '120px';
                break;
            }
            else {
                dialogCt.style.paddingTop = `calc(100vh - ${counter}vh)`;
            }
        };
        dialogCt.scrollIntoView(false);
    });

    return (
        <>
            <ChatActions />

            <Confirmation />

            {
                isSpam() && (
                    <button onClick={spamClick} className='spam_btn'>Это спам!</button>
                )
            }

            <div style={chatActionsOpen || confirmationOpen ? { filter: 'blur(7.5px)', pointerEvents: 'none' } : null} className="dialog_header">

                <svg onClick={goBack} className='dialog_back_arrow' xmlns="http://www.w3.org/2000/svg" width="24" height="17" viewBox="0 0 24 17" fill="none">
                    <path d="M9.66904 0.457403C9.97723 0.762335 10.1252 1.1308 10.1128 1.56278C10.0995 1.99477 9.93871 2.36323 9.63052 2.66816L5.27739 6.97534H22.4588C22.8954 6.97534 23.2616 7.12171 23.5575 7.41444C23.8523 7.70616 23.9997 8.06801 23.9997 8.5C23.9997 8.93199 23.8523 9.29435 23.5575 9.58709C23.2616 9.87881 22.8954 10.0247 22.4588 10.0247H5.27739L9.66904 14.37C9.97723 14.6749 10.1313 15.0373 10.1313 15.457C10.1313 15.8758 9.97723 16.2377 9.66904 16.5426C9.36086 16.8475 8.99463 17 8.57036 17C8.14712 17 7.7814 16.8475 7.47322 16.5426L0.42346 9.56727C0.269365 9.4148 0.159958 9.24963 0.0952396 9.07175C0.0315475 8.89387 -0.000299454 8.70329 -0.000299454 8.5C-0.000299454 8.29671 0.0315475 8.10613 0.0952396 7.92825C0.159958 7.75038 0.269365 7.5852 0.42346 7.43274L7.51174 0.419287C7.79424 0.139765 8.14712 1.90735e-06 8.57036 1.90735e-06C8.99463 1.90735e-06 9.36086 0.15247 9.66904 0.457403Z" fill="#7E52EE" />
                </svg>

                <div className="dialog_user_box">
                    <div className="dialog_avatar_box">
                        <img
                            className="dialog_avatar_picture"
                            onClick={() => setChatActions(clickChat)}
                            src={clickChat.conversationAvatar ? clickChat.conversationAvatar : getUser(clickChat.companionsId[0]).avatar}
                            alt="user_avatar"
                        />
                        {
                            !clickChat.conversationName && getUser(clickChat.companionsId[0]).online && (
                                <svg className='icon_online' xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <circle cx="6" cy="6" r="6" fill="#7E52EE" />
                                </svg>
                            )
                        }
                    </div>

                    <p className="dialog_nickname">{clickChat.conversationName ? clickChat.conversationName : getUser(clickChat.companionsId[0]).nickname}</p>

                    <p className="nickname_bottom_sign">{clickChat.conversationName ? `Кол-во участников ${countConversation}` : !getUser(clickChat.companionsId[0]).online ? 'Был(а) в сети в 00:99' : '' }</p>
                </div>

                {
                    !clickChat.conversationName ?
                        myProfile.subscriptions.includes(clickChat.companionsId[0]) ?
                            (
                                <svg onClick={() => editMyProfile(clickChat.companionsId[0], 'subcriptions')} className='dialog_add_user' xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 30 26" fill="none">
                                    <path d="M21.7346 5.10222C21.7346 7.38401 19.9206 9.20444 17.7188 9.20444C15.5171 9.20444 13.7031 7.38401 13.7031 5.10222C13.7031 2.82044 15.5171 1 17.7188 1C19.9206 1 21.7346 2.82044 21.7346 5.10222Z" stroke="#7E52EE" stroke-width="2" />
                                    <path d="M13.5393 22.9599H27.3627C28.1987 21.826 29.8105 18.708 26.9147 16.1569C25.092 14.5511 20.5057 13.6058 18.5552 13.6058C16.6046 13.6058 12.2018 14.116 10.1955 16.1569M8.52358 11.0547L4.34381 22.9599L1 17.8577" stroke="#7E52EE" stroke-width="2" />
                                </svg>
                            )
                            :
                            (
                                <svg onClick={() => editMyProfile(clickChat.companionsId[0], 'subcriptions')} className='dialog_add_user' xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 30 26" fill="none">
                                    <path d="M21.4638 4.8675C21.4638 7.00334 19.7321 8.735 17.5957 8.735C15.4592 8.735 13.7275 7.00334 13.7275 4.8675C13.7275 2.73166 15.4592 1 17.5957 1C19.7321 1 21.4638 2.73166 21.4638 4.8675Z" stroke="#7E52EE" stroke-width="2" />
                                    <path d="M13.5388 21.9037H26.9554C27.7668 20.822 29.3311 17.8474 26.5206 15.4137C24.7515 13.8818 20.3002 12.9799 18.407 12.9799C16.5138 12.9799 12.2406 13.4667 10.2934 15.4137M13.5388 18.6587H7.04795M0.557129 18.6587H7.04795M7.04795 18.6587V11.3574M7.04795 18.6587V25.9599" stroke="#7E52EE" stroke-width="2" />
                                </svg>
                            )
                        :
                        null
                }
            </div>

            <div style={chatActionsOpen || confirmationOpen ? { filter: 'blur(7.5px)', pointerEvents: 'none' } : null} className="dialog_container">

                {
                    clickChat.messages.length === 0 && (
                        <h1 className='start_dialog'>Начните диалог!</h1>
                    )
                }

                {
                    clickChat.messages.map((message, index) => {
                        return (
                            <div style={message.status === 'unread' ? { boxShadow: '2px 0px 14px 0px #7E00B9' } : null} key={index} data-time={message.time} className={message.companionId === userId ? 'dialog_message_box your_message' : 'dialog_message_box user_message'}>
                                {
                                    clickChat.conversationName && message.companionId !== userId && (
                                        <img onClick={() => goToPreview(getUser(message.companionId))} className='companion_avatar' src={getUser(message.companionId).avatar} alt='companion' />
                                    )
                                }
                                <p className='dialog_message_text'>{message.message}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};
export default Dialog;