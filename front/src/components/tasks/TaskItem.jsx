import React from 'react';
import { useMutation } from '@apollo/client';
import { COMPLETE_TASK } from '../../graphql/mutations';
import { GET_TASKS } from '../../graphql/queries';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  const [completeTask] = useMutation(COMPLETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleComplete = async () => {
    await completeTask({ variables: { id: task._id } });
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: <strong>{task.status}</strong></p>
      <p>Assigned to: {task.assignedTo}</p>
      {task.status === 'pending' && (
        <button className="complete-button" onClick={handleComplete}>
          Mark as Completed
        </button>
      )}
    </div>
  );
};

export default TaskItem;
