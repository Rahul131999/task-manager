import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../../graphql/queries';
import TaskItem from './TaskItem';

const TaskList = ({ currentUser }) => {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tasks = data.taskList.filter(
    (task) =>
      currentUser.role === 'admin' || task.assignedTo === currentUser.username
  );

  return (
    <div>
      <h2>{currentUser.role === 'admin' ? 'All Tasks' : 'My Tasks'}</h2>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
