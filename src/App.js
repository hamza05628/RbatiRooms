import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingsOffres from './pages/ListingsOffres';  
import ListingsDemandes from './pages/ListingsDemandes'; 
import ListingDetail from './pages/ListingDetail'; 
import Profile from './pages/Profile';
import Login from './components/Login';  
import Register from './components/Register';  
import CreateOffre from './pages/CreateOffre';  
import CreateDemande from './pages/CreateDemande';  
import EditOffre from './pages/EditOffre';  
import EditDemande from './pages/EditDemande';  
import PrivateRoute from './components/PrivateRoute'; 
import Chat from './pages/Chat'; 
import Conversations from './pages/Conversations'; 
import Contact from './components/Contact';
import About from './components/About';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/offres" element={<ListingsOffres />} />
          <Route path="/listings/demandes" element={<ListingsDemandes />} />
          <Route path="/listings/offres/:id" element={<ListingDetail />} />
          <Route path="/listings/demandes/:id" element={<ListingDetail />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/about" element={<About/>}></Route>

          {/* Ensure Specific Edit Routes Come First */}
          <Route path="/edit-listing/offres/:id" element={<PrivateRoute><EditOffre /></PrivateRoute>} />
          <Route path="/edit-listing/demandes/:id" element={<PrivateRoute><EditDemande /></PrivateRoute>} />

          {/* Private Route for Create Listings */}
          <Route path="/create-listing/offres" element={<PrivateRoute><CreateOffre /></PrivateRoute>} />
          <Route path="/create-listing/demandes" element={<PrivateRoute><CreateDemande /></PrivateRoute>} />
          
          {/* Private Routes for User Profile and Chat */}
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/conversations" element={<PrivateRoute><Conversations /></PrivateRoute>} />
          <Route path="/messages/:conversationId" element={<PrivateRoute><Chat /></PrivateRoute>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
