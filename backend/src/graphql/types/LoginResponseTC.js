import UserTC from './UserTC.js';
import { schemaComposer } from 'graphql-compose';

const LoginResponseTC = schemaComposer.createObjectTC({
    name: 'LoginResponse',
    fields: {
      token: 'String!',
      user: UserTC.getType(),
    },
  });

  export default LoginResponseTC;
