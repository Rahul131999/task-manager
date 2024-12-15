import { composeWithMongoose } from 'graphql-compose-mongoose';
import Task from '../../models/Task.js';

const TaskTC = composeWithMongoose(Task);

export default TaskTC;
