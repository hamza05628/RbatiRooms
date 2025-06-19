// src/components/WhatsAppModal.js
import React from 'react';

const WhatsAppModal = ({ isOpen, onClose, phoneNumber }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="modal-content bg-white p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Contact via WhatsApp</h3>
        <p className="text-lg">WhatsApp Number: {phoneNumber}</p>
        <button className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WhatsAppModal;
