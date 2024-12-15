import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async ({ username, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  return user;
};

export const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Invalid username or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid username or password');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};
