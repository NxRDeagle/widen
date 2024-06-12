import './scss/modal.scss';
import { createPortal } from 'react-dom';

import Preview from './windows/preview/Preview';
import Confirmation from './windows/confirmation/Confirmation';
import ChatActions from './windows/chat_action/ChatActions';

import { mainContext } from '../../App';
import { useContext, useState, useEffect } from 'react';

export default function Modal() {
  const { setModal, modalOption } = useContext(mainContext);

  function closeModal() {
    setModal('modal');
    setTimeout(() => {
      setModal();
    }, 400);
  }

  const modal = document.getElementById('modal');

  return createPortal(
    <>
      {modalOption && (
        <div className="modal_container">
          <Preview onClose={closeModal} />
          {/* <Confirmation /> */}
          <ChatActions />
        </div>
      )}
    </>,
    modal,
  );
}
