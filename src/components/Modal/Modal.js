import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    console.log('Modal component Mount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  componentWillUnmount() {
    console.log('Modal component WillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackDropClick}>
        <div className="Modal">
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}
