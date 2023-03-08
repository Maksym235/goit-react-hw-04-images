import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  // const [domReady, setDomReady] = useState(false);
  useEffect(() => {
    // setDomReady(true);
    window.addEventListener('keydown', evt => {
      console.log(evt.code);
      if (evt.code === 'Escape') {
        onClose();
      }
    });

    return () => {
      window.removeEventListener('keydown', evt => {
        if (evt.code === 'Escape') {
          onClose();
        }
      });
    };
  }, [onClose]);
  // componentDidMount() {
  //   window.addEventListener('keydown', this.closeModal);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.closeModal);
  // }

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
