import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../graphql/mutations';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>Error: {error.message}</p>}
      </form>
      <button type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? 'Logging in...' : 'Login'}
      </button>
      <button type="submit" onClick={()=>{navigate('/register')}}>
          Register
      </button>
    </div>
  );
};

export default Login;
