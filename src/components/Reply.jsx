import React from 'react';

import '../css/Reply.css';

import { mainContext, defaultUser, defaultComment } from '../App';

import users_data from '../data/users_data.json';
import comments_data from '../data/comments_data.json';

const Reply = ({ replyId, authorReplyId }) => {

    const {Conversion, setMessageText, goToPreview } = React.useContext(mainContext);

    const reply = comments_data.find((obj) => obj.commentId === replyId) ? comments_data.find((obj) => obj.commentId === replyId) : defaultComment;
    let profile = users_data.find((obj) => obj.userId === authorReplyId) ? users_data.find((obj) => obj.userId === authorReplyId) : defaultUser;
    const likesCount = Conversion('count', reply.likes.length);

    React.useEffect(() => {
        if (document.querySelectorAll('.reply_text')) {
            document.querySelectorAll('.reply_text').forEach((item) => {
                const authorReplyId = +item.id.split('_')[3];
                item.innerHTML = comments_data.find((obj) => obj.authorCommentId === authorReplyId).text;
            });
        }
    }, [])

    return (
        <div
            className="reply_box"
            onClick={() => {
                const block = document.querySelector('blockquote');
                setMessageText(`<a style='color:var(--color_active)'>${profile.nickname}</a>, `)
                block.innerHTML = `<a style='color:var(--color_active)'>${profile.nickname}</a>, `;
                block.focus();
            }}
        >
            <div className="reply_user_avatar_box">
                <img className="avatar_picture" src={profile.avatar} alt="User Avatar" onClick={()=>goToPreview(profile)} />
            </div>
            <div className="reply_text_box">
                <p className="reply_user_nickname">
                    {profile.nickname}
                </p>
                <p
                    id={`reply_author_id_${reply.authorCommentId}`}
                    onClick={(e) => {
                        if (e.target.tagName === 'A') {
                            profile = users_data.find((obj) => obj.nickname === e.target.textContent);
                            goToPreview(profile);
                        }
                    }}
                    className="reply_text"
                >

                </p>
                <span className='time_reply_box'>
                    <p className='time' style={{ marginRight: '31px', fontSize: '8px' }}>число месяц в время</p>
                </span>
            </div>
            <div className='reply_like_box'>
                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.575 1C2.60063 1 1 2.62303 1 4.62505C1 8.25009 5.225 11.5456 7.5 12.3121C9.775 11.5456 14 8.25009 14 4.62505C14 2.62303 12.3994 1 10.425 1C9.216 1 8.14675 1.60868 7.5 2.54032C7.17035 2.06418 6.7324 1.67561 6.22325 1.40748C5.71409 1.13936 5.14872 0.99959 4.575 1Z" fill="white" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className='likes_count'>{likesCount}</p>
            </div>
        </div>
    );
}

export default Reply;