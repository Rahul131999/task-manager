import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); 

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    context: {
      headers: {
        'Bypass-Auth': 'true',
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({
        variables: { username, password, role },
      });
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h2 className="register-heading">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className="error-message">Error: {error.message}</p>}
          <button type="submit" disabled={loading} className="primary-button">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="secondary-button"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
