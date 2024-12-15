import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK } from '../../graphql/mutations';
import { GET_USERS } from '../../graphql/queries';
import { GET_TASKS } from '../../graphql/queries';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const { loading, error, data: usersData } = useQuery(GET_USERS); // Fetch users
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }], // Refetch tasks after creating
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
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
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
