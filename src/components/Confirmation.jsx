import '../css/Confirmation.css';
import React from 'react';

import { mainContext } from '../App';

const Confirmation = ({states = null, setStates = null}) => {

    const { confirmationOpen, setConfirmation, confirmSign, whatConfirm, deleteActiveChatsTab, clickChat, editedChats, setChatActions, myProfile, page, goBack, confirmationSecondOption, confirmationFirstOption } = React.useContext(mainContext);

    function secondChoise() {
        switch (whatConfirm) {
            case 'deleteTab':
                myProfile.tabsName = myProfile.tabsName.filter((tabName) => tabName !== states.tabsName[states.tabPosition]);
                deleteActiveChatsTab(states.tabsName[states.tabPosition]);
                setStates({
                    openEditorBtn: false,
                    isOpenEditor: false,
                    isNewTab: false,
                    categoryFilter: '',
                    tabsName: states.tabsName.filter((tabName) => tabName !== states.tabsName[states.tabPosition]),
                    activeTabChats: [],
                    tabPosition: 0,
                    isChangePosition: false,
                    changeTabPosition: -1,
                });
                setConfirmation();
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
                if(page === 'dialog'){
                    goBack();
                };
                break;
            default:
                break;
        }
    }

    return (
        <div className={confirmationOpen ? 'confirmation_container confirmation_container_active' : 'confirmation_container confirmation_container_none_active'}>
            <p className='confirmation_sign'>{confirmSign}</p>
            <div className='confirmation_btns_box'>
                <button onClick={() => setConfirmation()} className='confirmation_btn'>{confirmationFirstOption}</button>
                <button onClick={() => secondChoise()} className='confirmation_btn'>{confirmationSecondOption}</button>
            </div>
        </div>
    )
};

export default Confirmation;