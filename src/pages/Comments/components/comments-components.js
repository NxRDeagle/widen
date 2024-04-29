import { mainContext } from "../../../App";

import { getUser } from "../../../global_function/function";

import { defaultComment } from "../../../global-constants/constants";

import { useState, useContext} from "react";

import comments_data from '../../../data/comments_data.json';

//Шапка комментариев
export const HeaderComments = ({ onClick, children }) => {
    return (
        <header className="head_comments_container">
            <i className='icon_close' onClick={onClick}>
                <svg width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6H23M1 6L8 1M1 6L8 11" stroke="#7E52EE" />
                </svg>
            </i>
            <h1 className="comments_name">{children}</h1>
        </header>
    )
}

//Ответ
const Reply = ({ replyId }) => {
    const { Conversion, goToPreview } = useContext(mainContext);

    //Ответ
    const reply = comments_data.find((obj) => obj.commentId === replyId) || defaultComment;

    //Профиль комментатора
    const userProfile = getUser(reply.authorCommentId);

    //Кол-во лайков
    const likesCount = Conversion('count', reply.likes.length);

    return (
        <div
            className="reply_box"
        // onClick={() => {
        //     const block = document.querySelector('blockquote');
        //     setMessageText(`<a style='color:var(--color_active)'>${userProfile.nickname}</a>, `)
        //     block.innerHTML = `<a style='color:var(--color_active)'>${userProfile.nickname}</a>, `;
        //     block.focus();
        // }}
        >
            <img loading='lazy' className="reply_user_avatar" src={userProfile.avatar} alt="reply-avatar" onClick={() => goToPreview(userProfile)} />
            <div className="reply_text_box">
                <p className="reply_user_nickname">
                    {userProfile.nickname}
                </p>
                <p className="reply_text" dangerouslySetInnerHTML={{ __html: reply.text }}></p>
                <span className='time_reply_box'>
                    <p className='time' style={{ marginRight: '31px', fontSize: '8px' }}>{Conversion('time', new Date(reply.time))}</p>
                </span>
            </div>
            <div className='reply_like_box'>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M3.75 1C2.23125 1 1 2.14782 1 3.56365C1 6.12731 4.25 8.4579 6 9C7.75 8.4579 11 6.12731 11 3.56365C11 2.14782 9.76875 1 8.25 1C7.32 1 6.4975 1.43046 6 2.08932C5.74642 1.7526 5.40954 1.47779 5.01788 1.28818C4.62623 1.09856 4.19132 0.99971 3.75 1Z" 
                    fill="#7E52EE" 
                    stroke="#7E52EE" 
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" />
                </svg>
                <p className='likes_count'>{likesCount}</p>
            </div>
        </div>
    )
}

//Комментарий
export const Comment = ({ commentId }) => {

    const { Conversion, goToPreview } = useContext(mainContext);

    //Стейт открытия ответов
    const [replyWrap, setReplyWrap] = useState(false);

    //Комментарий
    const comment = comments_data.find((obj) => obj.commentId === commentId) || defaultComment;

    //Профиль комментатора
    const userProfile = getUser(comment.authorCommentId);

    //Кол-во лайков
    const likesCount = Conversion('count', comment.likes.length);

    //Кол-во ответов
    const replysCount = Conversion('count', comment.replies.length);

    // useEffect(() => {
    //     if (wrap) {
    //       if (document.querySelector('blockquote')) {
    //         document.querySelector('blockquote').innerHTML = `Ответить <a style='color:var(--color_active)'>${userProfile.nickname}</a>`;
    //       }
    //     }
    //     else {
    //       if (document.querySelector('blockquote')) {
    //         document.querySelector('blockquote').innerHTML = `Комментировать...`;
    //       }
    //     }
    //   // eslint-disable-next-line
    // }, [wrap])

    return (
        <>
            {
                !comment.isReply && (
                    <>
                        <div className="comment_box">
                            <img loading='lazy' className="comment_user_avatar" src={userProfile.avatar} alt="user-avatar" onClick={() => goToPreview(userProfile)} />
                            <div className="comment_text_box">
                                <p className="comment_user_nickname">
                                    {userProfile.nickname}
                                </p>
                                <p className="comment_text">{comment.text}</p>
                                <span className='time_reply_box'>
                                    <p className='time' style={{ marginRight: '31px' }}>{Conversion('time', new Date(comment.time))}</p>
                                    <p onClick={() => setReplyWrap(!replyWrap)} className='reply_sign'>Ответить</p>
                                </span>
                            </div>
                            <div className='comment_like_box'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
                                    <path d="M5.125 1C2.84688 1 1 2.72173 1 4.84548C1 8.69096 5.875 12.1869 8.5 13C11.125 12.1869 16 8.69096 16 4.84548C16 2.72173 14.1531 1 11.875 1C10.48 1 9.24625 1.64569 8.5 2.63398C8.11963 2.1289 7.61431 1.71669 7.02683 1.43226C6.43934 1.14784 5.78699 0.999565 5.125 1Z"
                                        fill="#7E52EE"
                                        stroke="#7E52EE"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                                <p className='likes_count'>{likesCount}</p>
                            </div>
                        </div>

                        {
                            comment.replies.length > 0 && (
                                <>
                                    <div onClick={() => setReplyWrap(!replyWrap)} className='unwrap_box'>
                                        <p className='unwrap_replys'>{replyWrap ? 'Скрыть ответы' : 'Показать ответы'}</p>
                                        <p className='replys_count'>({replysCount})</p>
                                        <i className={replyWrap ? 'unwrap_icon icon-down-open' : 'unwrap_icon icon-up-open'}></i>
                                    </div>

                                    <div className={replyWrap ? 'replys_box unwrap' : 'replys_box'}>
                                        {
                                            comment.replies.map((replyId) => {
                                                return <Reply key={replyId} replyId={replyId} />
                                            })
                                        }
                                    </div>
                                </>
                            )
                        }
                    </>

                )
            }
        </>
    )
}