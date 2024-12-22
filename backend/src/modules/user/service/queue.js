import { Queue } from 'bullmq';
import connection from '../../../services/redis.js';

const userQueue = new Queue('userQueue', { connection });

export default userQueue;
