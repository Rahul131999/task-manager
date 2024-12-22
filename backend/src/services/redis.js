import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null,
});

connection.on('connect', () => {
    console.log('🚀 Redis connected successfully');
  });

connection.on('error', (error) => {
    console.error('Redis error', error);
  });


export default connection;
