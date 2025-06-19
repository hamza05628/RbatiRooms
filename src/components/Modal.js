// src/components/Modal.js

import React from 'react';
import './ListingsModal.css'; // Import your CSS for modal styling

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
