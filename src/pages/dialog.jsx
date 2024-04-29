import React from 'react';

import { mainContext, userId } from '../App';

import DialogMessage from '../components/DialogMessage';



import '../css/Dialog.css';

const Dialog = () => {
    const {
        clickChat,
        getUser,
        myProfile,
        goBack,
        editMyProfile,
        Conversion,
        setChatActions,
        chatActionsOpen,
        setConfirmation,
        confirmationOpen,
        footType,
        setFooterType,
        changeMsgs,
        setChangeMsg,
        clickMsgRedactor,
        closedEditorMsg,
        editorMsg,
        msgText,
        replyDialogMsg,
        forwardedDialogMsgs,
        editedChats
    } = React.useContext(mainContext);

    const countConversation = clickChat.conversationName ? Conversion('count', clickChat.companionsId.length + 1) : null;
    const unreadText = document.createElement('p');
    unreadText.textContent = 'Новые сообщения';
    unreadText.className = 'first_unread_msg';

    function clearEditorMsgs(e) {
        if (e.target.classList.contains('dialog_container') && !editorMsg && changeMsgs.length) {
            closedEditorMsg();
        }
    };

    function isSpam() {
        return (!clickChat.conversationName &&
            !myProfile.subscriptions.includes(clickChat.companionsId[0]) &&
            clickChat.messages.length > 0 &&
            !clickChat.messages.find((message) => message.companionId === userId)
        );
    };

    function spamClick() {
        setConfirmation(
            `Вы уверены, что хотите заблокировать ${getUser(clickChat.companionsId[0]).nickname}?`,
            'blockUser',
            'Нет',
            'Да'
        );
    };

    function actionsMsgs(e) {
        if (e.target.getAttribute('name')) {
            switch (e.target.getAttribute('name')) {
                case 'delete':
                    setConfirmation(
                        `Вы уверены, что хотите удалить сообщение?`,
                        'deleteMsgs',
                        'Отмена',
                        'Удалить'
                    );
                    break;
                case 'msg_redactor':
                    clickMsgRedactor(changeMsgs[0].message)
                    setTimeout(() => {
                        if (msgText.current) {
                            msgText.current.click();
                        };
                    }, 0)
                    break;
                default:
                    return;
            }
        }
    }

    React.useEffect(() => {
        const dialogCt = document.querySelector('.dialog_container');
        const msgs = document.querySelectorAll('.dialog_message_box');
        const firstUnreadMsg = [...msgs].find((msg) => msg.dataset.status === 'unread' && +msg.dataset.messageCompanion !== userId);
        if (firstUnreadMsg) {
            dialogCt.insertBefore(unreadText, firstUnreadMsg);
        }
    }, [])

    React.useEffect(() => {
        const dialogCt = document.querySelector('.dialog_container');
        let counter = 10;
        const msgs = document.querySelectorAll('.dialog_message_box');
        const firstUnreadMsg = [...msgs].find((msg) => msg.dataset.status === 'unread' && +msg.dataset.messageCompanion !== userId);
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
        firstUnreadMsg ? firstUnreadMsg.scrollIntoView(false) : dialogCt.scrollIntoView(false);
    }, [clickChat.messages.length]);

    // React.useEffect(() => {
    //     function onScroll() {
    //         const unreadMsgs = clickChat.messages.filter((msg) => msg.status === 'unread');
    //         const myUnreadMsgs = unreadMsgs.filter((msg) => msg.companionId !== userId);
    //         if (myUnreadMsgs.length) {
    //             myUnreadMsgs.forEach((msg) => {
    //                 const msgTop = document.querySelector(`.dialog_message_box[data-message-id = "message-${msg.messageId}"]`).getBoundingClientRect().top;
    //                 const windowScreen = window.pageYOffset + document.documentElement.clientHeight;
    //                 console.log(`message-${msg.messageId} = `, msgTop);
    //                 console.log('win - ', windowScreen);
    //                 if (msgTop < windowScreen) {
    //                     const readChat = {
    //                         ...clickChat,
    //                         fullStatus: unreadMsgs.length ? 'unread' : 'read',
    //                         messages: clickChat.messages.map((mesg) => { return msg.messageId === mesg.messageId ? { ...mesg, status: 'read' } : mesg })
    //                     }
    //                     editedChats(readChat);
    //                 };

    //             });
    //         };
    //     };

    //     if (changeMsgs.length) {
    //         window.removeEventListener('scroll', onScroll);
    //     } else {
    //         window.addEventListener('scroll', onScroll);
    //     }

    //     return () => window.removeEventListener('scroll', onScroll);
    // }, [changeMsgs.length])

    React.useEffect(() => {
        if (!changeMsgs.length) {
            setFooterType('text');
        }
    }, [changeMsgs])

    return (
        <>
            {
                isSpam() && !changeMsgs.length && (
                    <button onClick={spamClick} className='spam_btn'>Это спам!</button>
                )
            }

            {
                changeMsgs.length > 0 && !replyDialogMsg && !forwardedDialogMsgs.length ? (
                    <div style={chatActionsOpen || confirmationOpen ? { filter: 'blur(7.5px)', pointerEvents: 'none' } : null} className="dialog_editor_msgs_header">
                        <svg onClick={closedEditorMsg} style={{ marginLeft: '16px' }} xmlns="http://www.w3.org/2000/svg" width="21" height="23" viewBox="0 0 21 23" fill="none">
                            <path d="M1.49149 0.433487C1.19894 0.140255 0.741727 0.15618 0.470285 0.469056C0.198842 0.781932 0.215955 1.27328 0.508509 1.56651L1.49149 0.433487ZM0.508509 1.56651L19.2537 20.3552L20.2367 19.2221L1.49149 0.433487L0.508509 1.56651Z" fill="#7F7D7D" />
                            <path d="M0.763392 19.4335C0.470838 19.7267 0.453724 20.2181 0.725167 20.5309C0.99661 20.8438 1.45382 20.8597 1.74637 20.5665L0.763392 19.4335ZM1.74637 20.5665L20.4915 1.77786L19.5086 0.644839L0.763392 19.4335L1.74637 20.5665Z" fill="#7F7D7D" />
                        </svg>
                        <p className='count_editor_msgs'>{changeMsgs.length}</p>
                        <ul onClick={actionsMsgs} className='editor_msg_items'>
                            {
                                changeMsgs.length === 1 && changeMsgs[0].companionId === userId && (
                                    <li name='msg_redactor'>
                                        <svg name='msg_redactor' xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                            <path name='msg_redactor' d="M20.5132 7.78219L15.1647 2.48904L16.9265 0.724658C17.409 0.241553 18.0017 0 18.7048 0C19.4078 0 20.0002 0.241553 20.4817 0.724658L22.2436 2.48904C22.726 2.97215 22.9777 3.55523 22.9987 4.2383C23.0197 4.92137 22.7889 5.50404 22.3065 5.9863L20.5132 7.78219ZM18.6884 9.6411L5.34853 23H0V17.6438L13.3399 4.28493L18.6884 9.6411Z" fill="#BABABA" />
                                        </svg>
                                    </li>
                                )
                            }
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7308 0H9.36277C7.38339 0 5.81539 0 4.58877 0.163674C3.32662 0.332698 2.30462 0.68786 1.498 1.48805C0.692462 2.2893 0.334923 3.30451 0.164769 4.55828C1.28379e-07 5.77781 0 7.33433 0 9.30056V15.7791C2.59962e-05 16.7348 0.343469 17.6592 0.968517 18.3858C1.59357 19.1124 2.45917 19.5935 3.40954 19.7426C3.55708 20.5599 3.84246 21.2573 4.41323 21.8254C5.06154 22.4694 5.87785 22.7454 6.84708 22.8759C7.78077 23 8.96862 23 10.4408 23H13.79C15.2622 23 16.45 23 17.3837 22.8759C18.3529 22.7454 19.1692 22.4694 19.8175 21.8254C20.4658 21.1814 20.7437 20.3705 20.8751 19.4077C21 18.4802 21 17.3003 21 15.8379V10.3714C21 8.90902 21 7.72907 20.8751 6.80158C20.7437 5.83879 20.4658 5.02791 19.8175 4.38391C19.2457 3.81693 18.5435 3.53344 17.7208 3.38688C17.5707 2.44283 17.0864 1.58298 16.3549 0.962082C15.6235 0.341187 14.6929 2.58234e-05 13.7308 0ZM16.0246 3.23177C15.8609 2.75679 15.5517 2.34457 15.1404 2.0528C14.7291 1.76104 14.2362 1.60435 13.7308 1.60465H9.42308C7.36939 1.60465 5.91123 1.60679 4.80308 1.75442C3.72077 1.89884 3.09615 2.17056 2.64062 2.62307C2.18508 3.07558 1.91154 3.69605 1.76615 4.77223C1.61754 5.87195 1.61538 7.32042 1.61538 9.36047V15.7791C1.61508 16.2811 1.77282 16.7707 2.06653 17.1793C2.36025 17.5879 2.77523 17.895 3.25338 18.0577C3.23077 17.4051 3.23077 16.667 3.23077 15.8379V10.3714C3.23077 8.90902 3.23077 7.72907 3.35677 6.80158C3.486 5.83879 3.766 5.02791 4.41323 4.38391C5.06154 3.73991 5.87785 3.46391 6.84708 3.33447C7.78077 3.2093 8.96862 3.2093 10.4408 3.2093H13.79C14.6246 3.2093 15.3677 3.2093 16.0246 3.23177ZM5.55477 5.52C5.85308 5.22367 6.27092 5.03112 7.06246 4.92521C7.87446 4.81716 8.95354 4.81502 10.4989 4.81502H13.7297C15.2751 4.81502 16.3531 4.81716 17.1672 4.92521C17.9577 5.03112 18.3755 5.22474 18.6738 5.52C18.9722 5.81633 19.166 6.2314 19.2726 7.01767C19.3814 7.82428 19.3835 8.89619 19.3835 10.4313V15.7801C19.3835 17.3153 19.3814 18.3861 19.2726 19.1948C19.166 19.98 18.9711 20.3951 18.6738 20.6914C18.3755 20.9878 17.9577 21.1803 17.1662 21.2862C16.3531 21.3943 15.2751 21.3964 13.7297 21.3964H10.4989C8.95354 21.3964 7.87446 21.3943 7.06139 21.2862C6.27092 21.1803 5.85308 20.9867 5.55477 20.6914C5.25646 20.3951 5.06262 19.98 4.956 19.1938C4.84723 18.3861 4.84508 17.3153 4.84508 15.7801V10.4313C4.84508 8.89619 4.84723 7.82428 4.956 7.0166C5.06262 6.2314 5.25754 5.81633 5.55477 5.52Z" fill="#A6A6A6" />
                                </svg>
                            </li>
                            <li name='delete'>
                                <svg name='delete' xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path name='delete' d="M5.43214 0.788203C5.64911 0.302813 6.09509 0 6.58125 0H11.4188C11.9049 0 12.3509 0.302813 12.5679 0.788203L12.8571 1.425H16.7143C17.4254 1.425 18 2.0618 18 2.85C18 3.6382 17.4254 4.275 16.7143 4.275H1.28571C0.574554 4.275 0 3.6382 0 2.85C0 2.0618 0.574554 1.425 1.28571 1.425H5.14286L5.43214 0.788203ZM1.28571 5.7H16.7143V19.95C16.7143 21.522 15.5612 22.8 14.1429 22.8H3.85714C2.43884 22.8 1.28571 21.522 1.28571 19.95V5.7ZM5.14286 8.55C4.78929 8.55 4.5 8.87062 4.5 9.2625V19.2375C4.5 19.6294 4.78929 19.95 5.14286 19.95C5.49643 19.95 5.78571 19.6294 5.78571 19.2375V9.2625C5.78571 8.87062 5.49643 8.55 5.14286 8.55ZM9 8.55C8.64643 8.55 8.35714 8.87062 8.35714 9.2625V19.2375C8.35714 19.6294 8.64643 19.95 9 19.95C9.35357 19.95 9.64286 19.6294 9.64286 19.2375V9.2625C9.64286 8.87062 9.35357 8.55 9 8.55ZM12.8571 8.55C12.5036 8.55 12.2143 8.87062 12.2143 9.2625V19.2375C12.2143 19.6294 12.5036 19.95 12.8571 19.95C13.2107 19.95 13.5 19.6294 13.5 19.2375V9.2625C13.5 8.87062 13.2107 8.55 12.8571 8.55Z" fill="#A6A6A6" />
                                </svg>
                            </li>
                        </ul>
                    </div>
                )
                    :
                    (
                        <div style={chatActionsOpen || confirmationOpen ? { filter: 'blur(7.5px)', pointerEvents: 'none' } : null} className="dialog_header">

                            <svg onClick={() => { goBack(); setChangeMsg(); }} className='dialog_back_arrow' xmlns="http://www.w3.org/2000/svg" width="24" height="17" viewBox="0 0 24 17" fill="none">
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

                                <p className="nickname_bottom_sign">{clickChat.conversationName ? `${countConversation} ${Conversion('conversation', clickChat.companionsId.length + 1)}` : !getUser(clickChat.companionsId[0]).online ? `Был(а) в сети ${Conversion('time', new Date(getUser(clickChat.companionsId[0]).lastTime))}` : ''}</p>
                            </div>

                            {
                                !clickChat.conversationName && footType !== 'block' ?
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
                    )
            }

            <div style={chatActionsOpen || confirmationOpen ? { filter: 'blur(7.5px)', pointerEvents: 'none' } : null} onClick={clearEditorMsgs} className="dialog_container">

                {
                    clickChat.messages.length === 0 && (
                        <h1 className='start_dialog'>Начните диалог!</h1>
                    )
                }

                {
                    clickChat.messages.map((message) => {
                        return <DialogMessage key={message.messageId} {...message} />
                    })
                }

                {
                    (replyDialogMsg || forwardedDialogMsgs.length > 0) && (
                        <div className={changeMsgs.length > 1 || forwardedDialogMsgs.length > 1 ? 'structured_message_box many_items' : 'structured_message_box one_item'}>
                            <p className="dialog_reply_sign">{replyDialogMsg ? 'Ответ на:' : 'Пересланные сообщения от:'}</p>
                            {changeMsgs.length < 2 && forwardedDialogMsgs.length < 2 ? (
                                <>
                                    <p className="dialog_reply_compinion_nickname">{replyDialogMsg ? getUser(changeMsgs[0].companionId).nickname : getUser(forwardedDialogMsgs[0].companionId).nickname}</p>
                                    <p className="dialog_reply_message">{replyDialogMsg ? Conversion('dialogReply', changeMsgs[0].message) : Conversion('dialogReply', forwardedDialogMsgs[0].message)}</p>
                                </>
                            ) :
                                (
                                    <p className="dialog_reply_sign">{replyDialogMsg ? Conversion('count', changeMsgs.length) : Conversion('count', forwardedDialogMsgs.length)} сообщения</p>
                                )
                            }
                            {
                                replyDialogMsg ? (
                                    <svg className="structured_message_icon" xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                                        <path d="M9.16667 3.46667V0L15 6.06667L9.16667 12.1333V8.58C5 8.58 2.08333 9.96667 0 13C0.833334 8.66667 3.33333 4.33333 9.16667 3.46667Z" fill="#7E52EE" />
                                    </svg>
                                ) :
                                    (
                                        <svg className="structured_message_icon" xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
                                            <path d="M5.97339 3.41337V0L0 5.97339L5.97339 11.9468V8.44808C10.2401 8.44808 13.2268 9.81343 15.3602 12.8001C14.5068 8.53342 11.9468 4.26671 5.97339 3.41337Z" fill="#7E52EE" />
                                        </svg>
                                    )
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
};
export default Dialog;