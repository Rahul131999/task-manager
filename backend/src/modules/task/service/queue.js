import { Queue } from 'bullmq';
import connection from '../../../services/redis.js';

const taskQueue = new Queue('taskQueue', { connection });

export default taskQueue;
