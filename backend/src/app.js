import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';   
import { schema } from './graphql/schema.js';
import { authMiddleware } from './middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONT_URL, // Frontend URL
    credentials: true, // Allow sending cookies or Authorization headers
  }));

app.use(authMiddleware);

const apolloServer = new ApolloServer({ schema, context: ({ req }) => ({ user: req.user }) });

await apolloServer.start();
apolloServer.applyMiddleware({ app });

export default app;
