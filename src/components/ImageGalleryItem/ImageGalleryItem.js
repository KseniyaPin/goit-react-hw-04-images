import { useState } from 'react';
import css from './ImageGalerryItem.module.css';
import Modal from '../Modal/Modal';

export default function ImageGalleryItem({ nameSearch }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { largeImageURL, webformatURL, user } = nameSearch;
  return (
    <>
      <img
        src={webformatURL}
        alt={user}
        className={css.ImageGalleryItemImage}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <div>
            <img src={largeImageURL} alt={user} width="800" height="600" />
          </div>
        </Modal>
      )}
    </>
  );
}
