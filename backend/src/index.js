import dotenv from 'dotenv';
import connectDB from './services/database.js';
import startApolloServer from './graphql/index.js';

dotenv.config();

await connectDB();

await startApolloServer();
