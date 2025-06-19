import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Ensure this path is correct

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show the success message immediately
    setModalMessage('Message sent successfully!'); // Set the message for modal
    setModalOpen(true); // Open the modal

    try {
      // Send a POST request to your backend API to send the email
      await axios.post('http://localhost:5000/api/contact/send-email', formData);
    } catch (error) {
      console.error('Error sending message:', error);
      // Set an error message if the sending fails
      setModalMessage('Failed to send the message. Please try again later.');
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="flex flex-col lg:flex-row items-start justify-between space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Google Map for Rabat */}
        <div className="w-full lg:w-1/2 h-[600px] lg:h-[450px]">
          <iframe
            title="Google Map Rabat"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106040.62768878922!2d-6.923406206168671!3d34.02088234769619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76c2d01fb7eb5%3A0x916d90ffdd364891!2sRabat%2C%20Morocco!5e0!3m2!1sen!2sma!4v1632935258956!5m2!1sen!2sma"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen=""
            loading="lazy"
            style={{ borderRadius: '10px' }}
          ></iframe>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-6"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="w-full p-3 border rounded-lg"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-3 border rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="w-full p-3 border rounded-lg"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>

      {/* Modal for Success/Error Message */}
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-4">Notification</h2>
        <p>{modalMessage}</p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>

    </div>
  );
}

export default Contact;
