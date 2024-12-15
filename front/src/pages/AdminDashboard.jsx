import React, { useContext } from 'react';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import { AuthContext } from '../context/AuthContext';


const AdminDashboard = () => {
  const { user,logout } = useContext(AuthContext);


  return (
    <div>
      <h1>Welcome Admin, {user?.username}!</h1>
      <button onClick={()=>{logout()}}>Logout</button>
      <TaskForm />
      <TaskList currentUser={user} />
    </div>
  );
};

export default AdminDashboard;
