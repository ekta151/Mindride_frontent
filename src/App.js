import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import './App.css';

// Clear any existing tokens when the app starts
const clearExistingSession = () => {
  localStorage.removeItem('token');
};


function App() {
  // Clear any existing session when the app first loads
  useEffect(() => {
    clearExistingSession();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={ <Dashboard />}/>

        {/* Default Route - Always redirects to login */}
        <Route 
          path="/" 
          element={<Navigate to="/login" />} 
        />

        {/* Catch all other routes and redirect to login */}
        {/* <Route 
          path="*" 
          element={<Navigate to="/login" />} 
        /> */}
      </Routes>
    </Router>
  );
}

export default App;