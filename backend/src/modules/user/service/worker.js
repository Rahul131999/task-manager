import { Worker } from 'bullmq';
import connection from '../../../services/redis.js';

const userWorker = new Worker(
  'userQueue',
  async (job) => {
    console.log('first')
    if (job.name === 'sendWelcomeEmail') {
      const { userId, username } = job.data;
      console.log(`Sending welcome email to user: ${username} (ID: ${userId})`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log('Email sent!');
    }
  },
  { connection }
);

userWorker.on('completed', job => {
  console.log(`Job ${job.id} completed`);
});

userWorker.on('error', (error) => {
  console.error('Error occurred in worker:', error);
});

userWorker.on('failed', (job, err) => {
  console.error(`Job with ID ${job.id} failed with error: ${err.message}`);
});

export default userWorker;
