import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import User from './model.js';

const UserTC = composeWithMongoose(User);

const LoginResponseTC = schemaComposer.createObjectTC({
  name: 'LoginResponse',
  fields: {
    token: 'String!',
    user: UserTC.getType(),
  },
});

export { UserTC, LoginResponseTC };
