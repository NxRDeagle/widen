import React from "react"

//Компонент статистики пользователя
export const ProfileStatistics = ({ count, children, onClick }) => {
    return (
        <div onClick={onClick} className="preview_user_count" style={{ marginRight: '45px' }}>
            <p className="profile_count">{count}</p>
            <p className="profile_count_sign">{children}</p>
        </div>
    )
}

//Кнопки в профиле
export const ProfileBtn = ({ onClick, children }) => {
    return (
        <button onClick={onClick} className="btn_profile">{children}</button>
    )
}

//Иконки выбора отрисовки блоков в профиле
export const ProfileIcons = ({profileActiveIcon}) => {
    return (
        <>
            <li name='newsware' className={profileActiveIcon === 'newsware' ? 'profile_icon_box profile_icon_box_active' : 'profile_icon_box'}>
                <svg name='newsware' xmlns="http://www.w3.org/2000/svg" width="26" height="23" viewBox="0 0 26 23" fill="none">
                    <path name='newsware' d="M2.6 23C1.885 23 1.27313 22.75 0.7644 22.2499C0.2548 21.7491 0 21.1472 0 20.4444V2.55556C0 1.85278 0.2548 1.25094 0.7644 0.750055C1.27313 0.250018 1.885 0 2.6 0H23.4C24.115 0 24.7273 0.250018 25.2369 0.750055C25.7456 1.25094 26 1.85278 26 2.55556V20.4444C26 21.1472 25.7456 21.7491 25.2369 22.2499C24.7273 22.75 24.115 23 23.4 23H2.6ZM2.6 20.4444H23.4V11.9107V2.55556H2.6V20.4444Z" fill={profileActiveIcon === 'newsware' ? 'black' : '#BABABA'} />
                    <path name='newsware' d="M5.2 7.66667H21V5H5.2V7.66667Z" fill={profileActiveIcon === 'newsware' ? 'black' : '#BABABA'} />
                    <path name='newsware' d="M5.2 10.2222V12.7778H21V10.2222H5.2Z" fill={profileActiveIcon === 'newsware' ? 'black' : '#BABABA'} />
                    <path name='newsware' d="M5.2 15.3333V17.8889H21V15.3333H5.2Z" fill={profileActiveIcon === 'newsware' ? 'black' : '#BABABA'} />
                </svg>
            </li>
            <li name='record_creation' className={profileActiveIcon === 'record_creation' ? 'profile_icon_box profile_icon_box_active' : 'profile_icon_box'}>
                <svg name='record_creation' style={{ marginLeft: '6px' }} xmlns="http://www.w3.org/2000/svg" width="35" height="26" viewBox="0 0 35 26" fill="none">
                    <path name='record_creation' d="M5.2 20.8889H11.7V18.3333H5.2V20.8889ZM5.2 15.7778H11.7V13.2222H5.2V15.7778ZM5.2 10.6667H11.7V8.11111H5.2V10.6667ZM2.6 26C1.885 26 1.27313 25.75 0.7644 25.2499C0.2548 24.7491 0 24.1472 0 23.4444V5.55556C0 4.85278 0.2548 4.25094 0.7644 3.75006C1.27313 3.25002 1.885 3 2.6 3H23.4C24.115 3 24.7273 3.25002 25.2369 3.75006C25.7456 4.25094 26 4.85278 26 5.55556V23.4444C26 24.1472 25.7456 24.7491 25.2369 25.2499C24.7273 25.75 24.115 26 23.4 26H2.6ZM2.6 23.4444H23.4V14.9107V5.55556H2.6V23.4444Z" fill={profileActiveIcon === 'record_creation' ? 'black' : '#BABABA'} />
                    <line name='record_creation' x1="18.0541" y1="14.8358" x2="34.0541" y2="1.83583" stroke={profileActiveIcon === 'record_creation' ? 'black' : '#BABABA'} stroke-width="3" />
                </svg>
            </li>
            <li name='metric' className={profileActiveIcon === 'metric' ? 'profile_icon_box profile_icon_box_active' : 'profile_icon_box'}>
                <svg name='metric' xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                    <path name='metric' d="M13.6318 0V24.0001" stroke={profileActiveIcon === 'metric' ? 'black' : '#BABABA'} stroke-width="2" />
                    <path name='metric' d="M25 11.4336L0.999999 11.3682" stroke={profileActiveIcon === 'metric' ? 'black' : '#BABABA'} stroke-width="2" />
                    <path name='metric' d="M4.15816 11.3685C3.94763 8.42113 5.54764 2.52637 13.6319 2.52637" stroke={profileActiveIcon === 'metric' ? 'black' : '#BABABA'} stroke-width="2" />
                    <path name='metric' d="M13.6318 5.05251C15.7371 4.84198 19.9476 5.81041 19.9476 11.3683" stroke={profileActiveIcon === 'metric' ? 'black' : '#BABABA'} stroke-width="2" />
                    <path name='metric' d="M5.4209 11.3682C5.4209 14.3155 7.06301 20.2103 13.6315 20.2103" stroke={profileActiveIcon === 'metric' ? 'black' : '#BABABA'} stroke-width="2" />
                    <path name='metric' d="M19.7831 11.4785C19.957 13.5655 19.0527 17.7394 14.0439 17.7394" stroke={profileActiveIcon === 'metric' ? 'black' : '#BABABA'} stroke-width="2" />
                </svg>
            </li>
            <li name='achievements' className={profileActiveIcon === 'achievements' ? 'profile_icon_box profile_icon_box_active' : 'profile_icon_box'}>
                <svg name='achievements' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path name='achievements' d="M12.7255 1H5.5098V9.17778C5.5098 10.5059 5.89008 11.7983 6.59351 12.8605C7.29694 13.9228 8.28554 14.6977 9.41078 15.0688C9.41078 18.1461 6.20882 19.2385 4.60784 19.4V23.4889H12.7255M5.5098 3.04444H1V7.13333C1 9.69809 2.61541 11.2222 4.60784 11.2222H5.5098" stroke={profileActiveIcon === 'achievements' ? 'black' : '#BABABA'} stroke-width="2" />
                    <path name='achievements' d="M12.0005 1H19.2189V9.17818C19.2189 10.5064 18.8385 11.7988 18.1348 12.8611C17.4311 13.9235 16.4421 14.6984 15.3165 15.0695C15.3165 18.147 18.5196 19.2394 20.1212 19.4009V23.49H12.0005M19.2189 3.04455H23.7305V7.13364C23.7305 9.69852 22.1144 11.2227 20.1212 11.2227H19.2189" stroke={profileActiveIcon === 'achievements' ? 'black' : '#BABABA'} stroke-width="2" />
                </svg>
            </li>
        </>
    )
}