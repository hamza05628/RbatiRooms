import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/user');
      setProfile(res.data);
    } catch (error) {
      console.error('Error fetching profile', error);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p>Email: {profile.email}</p>
      <button
        className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
