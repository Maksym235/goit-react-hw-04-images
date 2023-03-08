import { useState } from 'react';
import {
  ImageGalleryItemSt,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({ img: { largeImageURL, id, webformatURL } }) {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(state => !state);
  };

  return (
    <ImageGalleryItemSt onClick={toggleModal} key={id}>
      <ImageGalleryItemImage src={webformatURL} alt="id" />
      {modalOpen && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={id} width="800" height="600" />
        </Modal>
      )}
    </ImageGalleryItemSt>
  );
}
