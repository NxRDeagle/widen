import '../css/Confirmation.css';
import React from 'react';

import { mainContext } from '../App';

const Confirmation = ({ firstOption, secondOption, states, setStates }) => {

    const { confirmationOpen, setConfirmationOpen } = React.useContext(mainContext);

    function secondChoise() {
        switch (states.whatConfirm) {
            case 'deleteTab':
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
                    clickChatId: -1,
                    confirmSign: '',
                    whatConfirm: ''
                });
                setConfirmationOpen();
                break;
            case 'archiveChat':
                setStates({
                    ...states,
                    activeTabChats: states.activeTabChats.filter((activeTabChat) => activeTabChat.chatId !== states.clickChatId)
                });
                setConfirmationOpen();
                break;
            case 'deleteChat':
                setStates({
                    ...states,
                    activeTabChats: states.activeTabChats.filter((activeTabChat) => activeTabChat.chatId !== states.clickChatId)
                });
                setConfirmationOpen();
                break;
            default:
                break;
        }
    }

    return (
        <div className={confirmationOpen ? 'confirmation_container confirmation_container_active' : 'confirmation_container confirmation_container_none_active'}>
            <p className='confirmation_sign'>{states.confirmSign}</p>
            <div className='confirmation_btns_box'>
                <button onClick={() => setConfirmationOpen()} className='confirmation_btn'>{firstOption}</button>
                <button onClick={() => secondChoise()} className='confirmation_btn'>{secondOption}</button>
            </div>
        </div>
    )
};

export default Confirmation;