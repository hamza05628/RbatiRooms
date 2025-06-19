import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import api from '../utils/api';

const socket = io('http://localhost:5000');

const Chat = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();

    socket.emit('join conversation', conversationId);

    socket.on('new message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('new message');
    };
  }, [conversationId]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/${conversationId}`);
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const res = await api.post('/messages', {
        conversationId,
        content: newMessage,
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <div>
        {messages.map((msg) => (
          <p key={msg._id}>
            <strong>{msg.sender.username}</strong>: {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
