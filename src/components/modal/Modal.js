import React from 'react';
import './Modal.css'; // Add custom styles for modal
import closeIcon from '../../assets/images/close.svg';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render modal if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <button className="close-btn" style ={{
          position: 'absolute',
          top: '0',
          cursor: 'pointer',
          fontSize: '1.5rem',
          border: 'none',
          height: '30px',
          width: '30px',
          color: 'red',
          borderRadius: '50%',
        }} onClick={onClose}><img src={closeIcon}/></button>
        <div className='modal-content-wrapper'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
