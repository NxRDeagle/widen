import "./scss/post_card.scss";
import { Conversion } from "../../../../global_function/function";

//Карточка поста
export default function PostCard(newsware) {
    //Разберём на необходимые элменты
    const {
        full,
        avatar,
        nickname,
        preview_text = '',
        preview_image = '',
        media = [],
        geoposition = '',
        tags = []
    } = newsware;

    const previewText = Conversion('previewSign', preview_text);

    return (
        <div className="post-box">
            <div className={`post-box_header-box${full ? "--full" : ""}`}>
                <div className="post-box_header-box_avatar-box">
                    <img src={avatar} alt='avatar' />
                </div>
                <div className="post-box_header-box_author-box">
                    <p className="post-box_header-box_author-box__nickname">{nickname}</p>
                    <p className="post-box_header-box_author-box__geolocation">
                        <svg style={{ marginRight: '2px' }} xmlns="http://www.w3.org/2000/svg" width="8" height="11" viewBox="0 0 8 11" fill="none">
                            <path d="M4 5.24012C4.275 5.24012 4.5105 5.13742 4.7065 4.932C4.90217 4.72694 5 4.48031 5 4.1921C5 3.90389 4.90217 3.65708 4.7065 3.45167C4.5105 3.24661 4.275 3.14407 4 3.14407C3.725 3.14407 3.48967 3.24661 3.294 3.45167C3.098 3.65708 3 3.90389 3 4.1921C3 4.48031 3.098 4.72694 3.294 4.932C3.48967 5.13742 3.725 5.24012 4 5.24012ZM4 9.09161C5.01667 8.11346 5.77083 7.22473 6.2625 6.42544C6.75417 5.62649 7 4.91698 7 4.2969C7 3.34495 6.71033 2.56539 6.131 1.95823C5.552 1.35143 4.84167 1.04802 4 1.04802C3.15833 1.04802 2.44783 1.35143 1.8685 1.95823C1.2895 2.56539 1 3.34495 1 4.2969C1 4.91698 1.24583 5.62649 1.7375 6.42544C2.22917 7.22473 2.98333 8.11346 4 9.09161ZM4 10.2837C3.93333 10.2837 3.86667 10.2706 3.8 10.2444C3.73333 10.2182 3.675 10.1833 3.625 10.1396C2.40833 9.01301 1.5 7.96726 0.9 7.00238C0.3 6.03715 0 5.13532 0 4.2969C0 2.98687 0.402167 1.94321 1.2065 1.16593C2.0105 0.388642 2.94167 0 4 0C5.05833 0 5.9895 0.388642 6.7935 1.16593C7.59783 1.94321 8 2.98687 8 4.2969C8 5.13532 7.7 6.03715 7.1 7.00238C6.5 7.96726 5.59167 9.01301 4.375 10.1396C4.325 10.1833 4.26667 10.2182 4.2 10.2444C4.13333 10.2706 4.06667 10.2837 4 10.2837Z" fill="#888888" />
                        </svg>
                        {geoposition}
                    </p>
                </div>
            </div>
            {
                full ?
                    (
                        <>
                            {
                                media.map((m, idx) => {
                                    return (
                                        <>
                                            {
                                                m.type === 'text' && <p key={idx} className="post-box__text">{m.content}</p>
                                            }
                                            {
                                                m.type === 'image' &&
                                                <div className="post-box_media-image-box">
                                                    <img loading='lazy' key={idx} src={m.content} alt='media' />
                                                </div>
                                            }
                                        </>
                                    )
                                })
                            }
                        </>
                    )
                    :
                    (
                        <>
                            <p className="post-box__text">
                                {previewText.sign}
                                {previewText.large && <span className="post-box__text--wrap">Развернуть</span>}
                            </p>
                            <div className="post-box_media-image-box">
                                <img src={preview_image} alt='media' />
                            </div>
                        </>
                    )
            }
        </div>
    )
}