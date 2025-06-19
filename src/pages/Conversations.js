// src/components/Conversations.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await api.get('/conversations');
      setConversations(res.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching conversations.');
      setLoading(false);
    }
  };

  if (loading) return <p>Loading conversations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Your Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul className="space-y-4">
          {conversations.map((conversation) => (
            <li key={conversation._id} className="bg-white p-4 shadow rounded">
              <Link to={`/messages/${conversation._id}`} className="text-blue-500 hover:underline">
                Chat with: {conversation.participants.map((p) => p.username).join(', ')}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Conversations;
