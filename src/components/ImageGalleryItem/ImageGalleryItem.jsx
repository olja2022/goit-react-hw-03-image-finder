import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;

    return (
      <li className="ImageGalleryItem" onClick={() => this.toggleModal()}>
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={`small img of ${tags}`}
          width="300"
        />

        {}
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={`big img of ${tags}`} />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.ptopType = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
