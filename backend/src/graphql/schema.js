import { schemaComposer } from 'graphql-compose';
import UserTC from './types/UserTC.js';
import TaskTC from './types/TaskTC.js';
import LoginResponseTC from './types/LoginResponseTC.js'
import { register, login } from './resolvers/auth.js';
import { createTask, completeTask } from './resolvers/task.js';

// Define the root Query type
schemaComposer.Query.addFields({
  userById: UserTC.getResolver('findById'),
  taskById: TaskTC.getResolver('findById'),
  taskList: TaskTC.getResolver('findMany'),
  getUsers: UserTC.getResolver('findMany').addFilterArg({
    name: 'role',
    type: 'String',
    description: 'Filter users by role',
    query: (rawQuery, value) => {
      rawQuery.role = value;
    },
  }),
});

// Define the root Mutation type
schemaComposer.Mutation.addFields({
  register: {
    type: UserTC.getType(),
    args: { username: 'String!', password: 'String!', role: 'String!' },
    resolve: (_, args) => register(args),
  },
  login: {
    type: LoginResponseTC.getType() ,
    args: { username: 'String!', password: 'String!' },
    resolve: (_, args) => login(args),
  },
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
});

// Build and export the schema
export const schema = schemaComposer.buildSchema();
