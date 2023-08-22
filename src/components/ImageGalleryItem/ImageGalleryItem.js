import { Component } from 'react';
import css from './ImageGalerryItem.module.css';
import { Modal } from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { largeImageURL, webformatURL, user } = this.props.name;
    return (
      <>
        <img
          src={webformatURL}
          alt={user}
          className={css.ImageGalleryItemImage}
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <div>
              <img src={largeImageURL} alt={user} width="800" height="600" />
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
