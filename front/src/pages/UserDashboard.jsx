import React, { useContext } from 'react';
import TaskList from '../components/tasks/TaskList';
import { AuthContext } from '../context/AuthContext';

const UserDashboard = () => {
  const { user,logout } = useContext(AuthContext);
  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
      <button onClick={()=>{logout()}}>Logout</button>
      <TaskList currentUser={user} />
    </div>
  );
};

export default UserDashboard;
