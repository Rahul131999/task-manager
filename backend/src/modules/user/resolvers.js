import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './model.js';
import { UserTC, LoginResponseTC } from './types.js';
import userQueue from './service/queue.js';

const register = async ({ username, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  await userQueue.add('sendWelcomeEmail', { userId: user._id, username });
  return user;
};

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Invalid username or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid username or password');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};

const userResolvers = {
  queries: {
    userById: UserTC.getResolver('findById'),
    getUsers: UserTC.getResolver('findMany').addFilterArg({
      name: 'role',
      type: 'String',
      description: 'Filter users by role',
      query: (rawQuery, value) => {
        rawQuery.role = value;
      },
    }),
  },
  mutations: {
    register: {
      type: UserTC.getType(),
      args: { username: 'String!', password: 'String!', role: 'String!' },
      resolve: (_, args) => register(args),
    },
    login: {
      type: LoginResponseTC.getType(),
      args: { username: 'String!', password: 'String!' },
      resolve: (_, args) => login(args),
    },
  },
};

export default userResolvers;
