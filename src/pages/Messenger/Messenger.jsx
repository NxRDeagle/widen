import React from 'react';

import SearchInput from '../../global_components/search/SearchInput';

import { TabEditor, TabCategoryBtn, TabEditorList, Message } from './components/messenger_components';

import { mainContext } from '../../App'

import './css/Messenger.css';

const Messenger = () => {

    const { setOpenTabEditor,
        chatFilter,
        activeChats,
        chatActionsOpen,
        myProfile } = React.useContext(mainContext);

    const [messengerStates, setMessengerStates] = React.useState({
        openEditorBtn: false,
        isNewTab: false,
        categoryFilter: '',
        tabsName: [...Object.keys(activeChats)],
        activeTabChats: [],
        tabPosition: 0,
        isChangePosition: false,
        changeTabPosition: -1
    })

    const goToTabEditor = (filter) => {
        setTimeout(() => {
            switch (filter) {
                case 'management':
                    setMessengerStates({
                        ...messengerStates,
                        openEditorBtn: false,
                        activeTabChats: activeChats[chatFilter]
                    });
                    setOpenTabEditor();
                    break;
                case 'new':
                    setMessengerStates({
                        ...messengerStates,
                        openEditorBtn: false,
                        isNewTab: true,
                        tabsName: ['Название вкладки', ...messengerStates.tabsName],
                        tabPosition: 0
                    });
                    setOpenTabEditor();
                    break;
                default:
                    break;
            }
        }, 50);
    };

    React.useEffect(() => {
        setMessengerStates({
            ...messengerStates,
            tabsName: Object.keys(activeChats),
        });
    }, [myProfile.tabsName]);

    return (
        <>
            <TabEditor messengerStates={messengerStates} setMessengerStates={setMessengerStates} />

            <SearchInput/>

            <div style={chatActionsOpen ? { filter: 'blur(7.5px)', pointerEvents: 'none' } : null} className="search_category_box">
                {Object.keys(activeChats).map((item) => {
                    return (
                        <TabCategoryBtn
                            key={item}
                            name={item}
                            setMessengerStates={setMessengerStates}
                            messengerStates={messengerStates}
                        >
                            {item}
                        </TabCategoryBtn>
                    );
                })}
            </div>

            <TabEditorList
                className={messengerStates.openEditorBtn ? 'chat_search_btn_editor chat_search_btn_editor_active' : 'chat_search_btn_editor'}
                onClick={goToTabEditor}
            >
                Управлять вкладкой "{messengerStates.tabsName[messengerStates.tabPosition]}"
            </TabEditorList>

            <div className="chats_container">
                {activeChats[chatFilter].map((item) => {
                    return <Message key={chatFilter + item.chatId} {...item} />;
                })}
            </div>

        </>
    );
};
export default Messenger;
