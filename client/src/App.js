import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/userContext'; // Ensure proper import
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Contact from './components/Contact';
import Services from './components/Services';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './Layout';

import axios from 'axios';
// import './App.css'

axios.defaults.baseURL = 'https://sample-auth.onrender.com';
axios.defaults.withCredentials = true;

const App = () => {

  return (
    <UserContextProvider> {/* Wrap the entire app */}
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>

            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            {/* <Route path="*" element={<Navigate to="/" />} /> Redirect unknown routes to home */}
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
