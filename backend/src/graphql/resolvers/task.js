import Task from '../../models/Task.js';
import User from '../../models/User.js';

export const createTask = async ({ title, description, assignedTo }, user) => {
  if (user.role !== 'admin') throw new Error('Unauthorized');

  const assignedUser = await User.findOne({ username: assignedTo });
  if (!assignedUser) throw new Error('User not found')

  const task = new Task({
    title,
    description,
    assignedTo: assignedUser.username ,
    createdBy: user.id,
  });

  await task.save();
  return task;
};

export const completeTask = async ({ id }, user) => {
  const assignedUser = await User.findById(user.id);
  let task;
  if(assignedUser.role === "admin"){
    task = await Task.findById(id);
  }
  else{
    task = await Task.findOne({ _id: id, assignedTo: assignedUser.username });
  }
  if (!task) throw new Error('Task not found');

  task.status = 'completed';
  await task.save();
  return task;
};
