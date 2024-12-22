import User from '../User/model.js';
import Task from './model.js';
import { TaskTC } from './types.js';

const createTask = async ({ title, description, assignedTo }, user) => {
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

const completeTask = async ({ id }, user) => {
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

const taskResolvers = {
  queries: {
    taskById: TaskTC.getResolver('findById'),
    taskList: TaskTC.getResolver('findMany'),
  },
  mutations: {
    createTask: {
      type: TaskTC.getType(),
      args: { title: 'String!', description: 'String!', assignedTo: 'String!' },
      resolve: (_, args, { user }) => createTask(args, user),
    },
    completeTask: {
      type: TaskTC.getType(),
      args: { id: 'ID!' },
      resolve: (_, args, { user }) => completeTask(args, user),
    },
  },
};

export default taskResolvers;