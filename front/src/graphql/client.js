import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Set up the HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:5001/graphql', // Backend GraphQL endpoint
});

// Middleware to dynamically fetch the token for each request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // Fetch token from localStorage
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // Add token to Authorization header if available
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authLink and httpLink
  cache: new InMemoryCache(),
});

export default client;
