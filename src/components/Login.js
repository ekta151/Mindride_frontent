import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the login logic here
    axios.post('http://localhost:5000/login', { email, password })
      .then((response) => {
        console.log('Login successful:', response.data);
        // Handle successful login here (e.g., redirect to dashboard)
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        // Handle login error here (e.g., show error message)
      });
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="container">
      <h2 className="my-4">Login</h2>
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
        <div className="my-2">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <div className="my-2">
          <Link to="/Registration">Register</Link>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
