import React from 'react';

import { mainContext, userId } from '../App';

const Confirmation = () => {

    const { setOpenTabEditor,
        chatFilter,
        confirmationOpen,
        setConfirmation,
        confirmSign,
        whatConfirm,
        deleteActiveChatsTab,
        clickChat,
        editedChats,
        setChatActions,
        myProfile,
        page,
        goBack,
        confirmationSecondOption,
        confirmationFirstOption,
        changeMsgs,
        getUser,
        deleteMessages } = React.useContext(mainContext);

    function secondChoise() {
        switch (whatConfirm) {
            case 'deleteTab':
                myProfile.tabsName = myProfile.tabsName.filter((tabName) => tabName !== chatFilter);
                deleteActiveChatsTab(chatFilter);
                setConfirmation();
                setOpenTabEditor();
                break;
            case 'clearHistory':
                editedChats({
                    ...clickChat,
                    messages: [],
                    fullStatus: 'read'
                });
                setConfirmation();
                setChatActions();
                break;
            case 'archiveChat':
                setConfirmation();
                break;
            case 'deleteChat':
                editedChats(null);
                setConfirmation();
                setChatActions();
                if (page === 'dialog') {
                    goBack();
                };
                break;
            case 'deleteMsgs':
                deleteMessages();
                setConfirmation();
                break;
            default:
                break;
        }
    }

    return (
        <div className={confirmationOpen ? 'confirmation_container' : 'confirmation_container confirmation_container_none_active'}>
            <p className='confirmation_sign'>{confirmSign}</p>
            {
                !changeMsgs.find((changeMsg) => changeMsg.companionId !== userId) && changeMsgs.length > 0 &&
                (
                    <div className='confirmation_user_deletion_box'>
                        <input type='checkbox' className='user_deletion_checkbox' />
                        <p className='user_deletion_nickname'>Удалить у {clickChat.conversationName ? 'всех' : getUser(clickChat.companionsId[0]).nickname}</p>
                    </div>
                )
            }
            <div className='confirmation_btns_box'>
                <button onClick={() => setConfirmation()} className='confirmation_btn'>{confirmationFirstOption}</button>
                <button onClick={() => secondChoise()} className='confirmation_btn'>{confirmationSecondOption}</button>
            </div>
        </div>
    )
};

export default Confirmation;