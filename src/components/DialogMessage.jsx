import React from "react";

import { mainContext, userId } from '../App';

const DialogMessage = (message) => {
    
    const {
        clickChat,
        getUser,
        Conversion,
        goToPreview,
        changeMsgs,
        setChangeMsg,
        messageText,
        editorMsg
    } = React.useContext(mainContext);

    function scrollToReply(replyId) {
        const msg = document.querySelector(`[data-message-id="message-${replyId}"]`);
        if (msg) {
            msg.scrollIntoView({ block: 'center', behavior: 'smooth' });
            msg.style.animation = 'scrollMsg .5s infinite';
            setTimeout(() => {
                msg.style.animation = 'none';
            }, 2000)
        }
    }



    function structureDialogMessage() {
        if (message.replies.length) {
            return (
                <div className="dialog_reply_container">
                    {
                        message.replies.map((reply) => {
                            return (
                                <div key={reply.messageId} onClick={() => scrollToReply(reply.messageId)} className="dialog_reply_box">
                                    <p className="dialog_reply_sign">Ответ на:</p>
                                    <p className="dialog_reply_compinion_nickname">{getUser(reply.companionId).nickname}</p>
                                    <p className="dialog_reply_message">{Conversion('dialogReply', reply.message)}</p>
                                    <svg className="dialog_reply_icon" xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                                        <path d="M9.16667 3.46667V0L15 6.06667L9.16667 12.1333V8.58C5 8.58 2.08333 9.96667 0 13C0.833334 8.66667 3.33333 4.33333 9.16667 3.46667Z" fill="#7E52EE" />
                                    </svg>
                                </div>
                            )
                        })
                    }
                    <p className='dialog_message_text'>{changeMsgs.length > 0 ? changeMsgs[0].messageId === message.messageId && editorMsg ? messageText : message.message : message.message}</p>
                </div>
            )
        }
        else if (message.transplanted.length) {
            return (
                <div className="dialog_forwarded_container">
                    {message.transplanted.map((transplant) => {
                        return (
                            <div onClick={() => goToPreview(getUser(transplant.companionId))} key={transplant.messageId} className="dialog_forwarded_box">
                                <p className="dialog_forwarded_sign">Пересланное сообщение от:</p>
                                <p className="dialog_forwarded_compinion_nickname">{getUser(transplant.companionId).nickname}</p>
                                <p className="dialog_forwarded_message">{transplant.message}</p>
                                <svg className="dialog_forwarded_icon" xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
                                    <path d="M5.97339 3.41337V0L0 5.97339L5.97339 11.9468V8.44808C10.2401 8.44808 13.2268 9.81343 15.3602 12.8001C14.5068 8.53342 11.9468 4.26671 5.97339 3.41337Z" fill="#7E52EE" />
                                </svg>
                            </div>
                        )
                    })}
                    <p className='dialog_message_text'>{changeMsgs.length > 0 ? changeMsgs[0].messageId === message.messageId && editorMsg ? messageText : message.message : message.message}</p>
                </div>
            )
        }
        return <p className='dialog_message_text'>{changeMsgs.length > 0 ? changeMsgs[0].messageId === message.messageId && editorMsg ? messageText : message.message : message.message}</p>
    }

    function msgClick() {
        if (changeMsgs.length && !editorMsg) {
            setChangeMsg(message);
        };
    };

    let timeout = null;

    function startHandlerMessage() {
        if (!changeMsgs.length) {
            timeout = setTimeout(() => {
                setChangeMsg(message);
            }, 1000)
        } else {
            return;
        }
    };

    function endHandlerMessage() {
        clearTimeout(timeout);
    };

    return (
        <div
            style={message.status === 'unread' ? { boxShadow: '2px 0px 14px 0px #7E00B9' } : null}
            key={message.messageId}
            data-message-id={`message-${message.messageId}`}
            data-time={message.edited ? `Ред. ${Conversion('time', new Date(message.time))}` : Conversion('time', new Date(message.time))}
            data-status={message.status}
            data-message-companion={message.companionId}
            className={
                message.companionId === userId ?
                    changeMsgs.find((changeMsg) => changeMsg.messageId === message.messageId) ? 'dialog_message_box_shake dialog_message_box your_message' :
                        'dialog_message_box your_message'
                    :
                    changeMsgs.find((changeMsg) => changeMsg.messageId === message.messageId) ? 'dialog_message_box_shake dialog_message_box user_message' :
                        'dialog_message_box user_message'
            }
            onTouchStart={startHandlerMessage}
            onTouchMove={endHandlerMessage}
            onTouchEnd={endHandlerMessage}
            onClick={msgClick}
        >
            {
                clickChat.conversationName && message.companionId !== userId && (
                    <img onClick={(e) => changeMsgs.length ? e.preventDefault() : goToPreview(getUser(message.companionId))} className='companion_avatar' src={getUser(message.companionId).avatar} alt='companion' />
                )
            }

            {
                structureDialogMessage()
            }

        </div>
    )
};

export default DialogMessage;