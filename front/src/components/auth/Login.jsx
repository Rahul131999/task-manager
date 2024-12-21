import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../graphql/mutations';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    context: {
      headers: {
        'Bypass-Auth': 'true',
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { username, password } });
      const { token, user } = data.login;
      login(token, user);
      navigate(user.role === 'admin' ? '/admin' : '/user');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2 className="login-heading">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
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
          {error && <p className="error-message">Error: {error.message}</p>}
          <button type="submit" disabled={loading} className="primary-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="secondary-button"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
