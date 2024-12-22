import { Worker } from 'bullmq';
import connection from '../../../services/redis.js';

const taskWorker = new Worker(
  'taskQueue',
  async (job) => {
    if (job.name === 'heavyComputationalTask') {
      const { task } = job.data;
      console.log(`Starting Heavy task --> ${task.title}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log('Task Finished');
    }
  },
  { connection }
);

taskWorker.on('completed', job => {
  console.log(`Task Job ${job.id} completed`);
});

taskWorker.on('error', (error) => {
  console.error('Error occurred in task worker:', error);
});

taskWorker.on('failed', (job, err) => {
  console.error(`Task Job with ID ${job.id} failed with error: ${err.message}`);
});

export default taskWorker;
