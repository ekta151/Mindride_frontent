import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the registration logic here
    axios.post('http://localhost:5000/register', { email, password })
      .then((response) => {
        console.log('Registration successful:', response.data);
        // Handle successful registration here (e.g., redirect to login page)
      })
      .catch((error) => {
        console.error('Error registering:', error);
        // Handle registration error here (e.g., show error message)
      });
  };

  return (
    <div className="container">
      <h2 className="my-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <div className="mt-3">
        <Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default Registration;
