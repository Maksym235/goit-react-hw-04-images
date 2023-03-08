import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children, show }) {
  const closeModal = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handlerClose = closeModal;

  useEffect(() => {
    if (show) {
      window.addEventListener('keydown', handlerClose);
    }

    return () => {
      window.removeEventListener('keydown', handlerClose);
    };
  }, [show, handlerClose]);

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
