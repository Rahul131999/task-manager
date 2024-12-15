import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';
import { useNavigate } from 'react-router-dom';

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
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      </form>
      <button type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      <button type="submit" onClick={()=>{navigate('/')}}>
          Login
      </button>
    </div>
  );
};

export default Register;
