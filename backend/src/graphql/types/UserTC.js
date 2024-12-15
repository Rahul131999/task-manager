import { composeWithMongoose } from 'graphql-compose-mongoose';
import User from '../../models/User.js';

const UserTC = composeWithMongoose(User);

export default UserTC;
