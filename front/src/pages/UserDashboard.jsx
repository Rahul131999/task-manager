import React, { useContext } from 'react';
import TaskList from '../components/tasks/TaskList';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.username}!</h1>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </header>
      <main className="dashboard-main">
        <TaskList currentUser={user} />
      </main>
    </div>
  );
};

export default UserDashboard;
