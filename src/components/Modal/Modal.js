import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {

  const handlerClose = closeModal;

  useEffect(() => {
     const closeModal = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

      window.addEventListener('keydown', closeModal);
    

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [ onClose]);

  const clickToOverlay = evt => {
    if (evt.currentTarget !== evt.target) {
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={clickToOverlay}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
}
