import React, { useContext } from 'react';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome Admin, {user?.username}!</h1>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </header>
      <main className="dashboard-main">
        <TaskForm />
        <TaskList currentUser={user} />
      </main>
    </div>
  );
};

export default AdminDashboard;
