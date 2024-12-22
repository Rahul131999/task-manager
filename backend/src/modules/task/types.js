import { composeWithMongoose } from 'graphql-compose-mongoose';
import Task from './model.js';

const TaskTC = composeWithMongoose(Task);

export { TaskTC };
