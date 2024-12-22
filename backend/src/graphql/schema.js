import { schemaComposer } from 'graphql-compose';
import userResolvers from '../modules/User/index.js';
import taskResolvers from '../modules/Task/index.js';

// Add User Queries and Mutations
schemaComposer.Query.addFields({
  ...userResolvers.queries,
  ...taskResolvers.queries,
});

schemaComposer.Mutation.addFields({
  ...userResolvers.mutations,
  ...taskResolvers.mutations,
});

export const schema = schemaComposer.buildSchema();
