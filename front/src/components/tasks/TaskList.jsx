import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../../graphql/queries';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ currentUser }) => {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let tasks = data.taskList.filter(
    (task) =>
      currentUser.role === 'admin' || task.assignedTo === currentUser.username
  );

  tasks = tasks.reverse()

  return (
    <div className="task-list-container">
      <h2>{currentUser.role === 'admin' ? 'All Tasks' : 'My Tasks'}</h2>
      <div className="task-card-grid">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
