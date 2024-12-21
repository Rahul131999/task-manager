import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK } from '../../graphql/mutations';
import { GET_USERS } from '../../graphql/queries';
import { GET_TASKS } from '../../graphql/queries';
import './TaskForm.css';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const { loading, error, data: usersData } = useQuery(GET_USERS);
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ variables: { title, description, assignedTo } });
    setTitle('');
    setDescription('');
    setAssignedTo('');
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-input"
        required
      />
      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="form-input"
        required
      >
        <option value="" disabled>
          Select User
        </option>
        {usersData.getUsers.map((user) => (
          <option key={user._id} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <button type="submit" className="primary-button">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
