import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';   
import { schema } from './schema.js';
import { authMiddleware } from '../middleware/auth.js';
import dotenv from 'dotenv';
import { createServer } from 'http';

dotenv.config();

const startApolloServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  // CORS middleware configuration
  app.use(cors({
    origin: process.env.FRONT_URL, // Frontend URL
    credentials: true, // Allow sending cookies or Authorization headers
  }));

  // Authentication middleware
  app.use(authMiddleware);

  // Initialize Apollo Server
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ user: req.user }),
  });

  // Start Apollo Server
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Start the HTTP server
  const port = process.env.PORT || 5001;
  httpServer.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}${apolloServer.graphqlPath}`);
  });
};

export default startApolloServer;
