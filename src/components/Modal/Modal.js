import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    console.log('Modal component Mount');
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  useEffect(() => {
    return () => {
      console.log('Modal component WillUnmount');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return createPortal(
    <div className="Overlay" onClick={handleBackDropClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
}
